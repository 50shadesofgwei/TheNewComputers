import { useEffect } from 'react'
import Lenis from 'lenis'
import { CtaPitch } from './CtaPitch'
import { CHAPTER_IMAGES, IMAGE, MissionImage } from './MissionImage'
import { OmitList } from './OmitList'
import { TermPeek } from './TermPeek'
import { TypewriterLines } from './TypewriterLines'
import { TypewriterQuote } from './TypewriterQuote'
import './App.css'

const KNOT_PRINCIPLES = [
  '1. The Idiot Index',
  '2. Question Every Requirement',
  '3. Standardised Components',
  '4. Vertical Integration',
  '5. Increase Iteration Speed',
] as const

const SOURCES: { n: number; text: string; href: string }[] = [
  {
    n: 1,
    text: 'Willsch, D., et al. “The State of Factoring on Quantum Computers.” NIC Symposium 2025.',
    href: 'https://juser.fz-juelich.de/record/1042431/files/NIC_2025_Willsch.pdf',
  },
  {
    n: 2,
    text: '“History of the Laser.” Photonics.com.',
    href: 'https://www.photonics.com/LinearChart.aspx?ChartID=2',
  },
  {
    n: 3,
    text: '“Fastest Plane in History: The Blackbird.” Lockheed Martin.',
    href: 'https://www.lockheedmartin.com/en-us/news/features/history/blackbird.html',
  },
  {
    n: 5,
    text: '“2026 State of the Global Quantum Industry Report.” Quantum Economic Development Consortium.',
    href: 'https://quantumconsortium.org/publication/2026-state-of-the-global-quantum-industry-report/',
  },
  {
    n: 6,
    text: '“Quantum Index Report 2025.” MIT Initiative on the Digital Economy.',
    href: 'https://qir.mit.edu/wp-content/uploads/2025/06/MIT-QIR-2025.pdf',
  },
  {
    n: 7,
    text: 'National Quantum Computing Centre. TOPTICA strontium-ion laser suites contract notice. Sell2Wales, November 2023.',
    href: 'https://www.sell2wales.gov.wales/search/show/search_view.aspx?ID=NOV457942',
  },
  {
    n: 8,
    text: '“Elon Musk’s Mission to Mars.” Wired, October 2012.',
    href: 'https://www.wired.com/2012/10/ff-elon-musk-qa/',
  },
  {
    n: 9,
    text: '“Atoms Are Cheap, Process Is Pricey.” Future Blind.',
    href: 'https://futureblind.com/p/atoms-are-cheap-process-is-pricey',
  },
  {
    n: 10,
    text: 'Vance, A. “How Elon Musk Willed SpaceX into Making the Cheapest Rockets Ever Created.” Vice, 2015.',
    href: 'https://www.vice.com/en/article/how-elon-musk-willed-spacex-into-making-the-cheapest-rockets-ever-created/',
  },
  {
    n: 11,
    text: 'University of Glasgow. Refurbished MOCVD reactor contract notice. Public Contracts Scotland, July 2017.',
    href: 'https://www.publiccontractsscotland.gov.uk/search/show/search_view.aspx?ID=JUL290649',
  },
  {
    n: 12,
    text: '“Aixtron ships MOCVD tool to Russian research institute.” DigiTimes, April 2013.',
    href: 'https://www.digitimes.com/news/a20130416PD214.html',
  },
  {
    n: 13,
    text: 'House of Commons Science and Technology Committee. “Reproducibility and Research Integrity.” 2023.',
    href: 'https://publications.parliament.uk/pa/cm5803/cmselect/cmsctech/101/report.html',
  },
]

function App() {
  useEffect(() => {
    // Lerp (not duration/easing): duration mode restarts a timed curve on every
    // wheel tick, which reads as hitchy / low-FPS. Lerp continuously chases.
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      syncTouch: false,
    })

    return () => {
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    const warm = new Set<string>()
    const decode = (href: string) => {
      const img = new Image()
      img.decoding = 'async'
      img.src = href
      return img.decode?.() ?? Promise.resolve()
    }

    const preload = (name: string | undefined) => {
      if (!name || warm.has(name)) return
      warm.add(name)
      // Prefer AVIF (what <picture> picks); fall back to JPEG if unsupported.
      void decode(`/images/${name}.avif`).catch(() =>
        decode(`/images/${name}.jpg`).catch(() => {}),
      )
    }

    // First chapter is near the fold — warm it + the next one immediately.
    preload(CHAPTER_IMAGES[0])
    preload(CHAPTER_IMAGES[1])

    const chapters = document.querySelectorAll<HTMLElement>('[data-chapter-index]')
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const idx = Number(entry.target.getAttribute('data-chapter-index'))
          if (Number.isNaN(idx)) continue
          preload(CHAPTER_IMAGES[idx])
          preload(CHAPTER_IMAGES[idx + 1])
          preload(CHAPTER_IMAGES[idx + 2])
        }
      },
      { rootMargin: '120% 0px', threshold: 0 },
    )

    chapters.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="mission">
      <header className="topbar meta">
        <span>Mission Doc.</span>
        <span>The New Computers</span>
      </header>

      <aside className="chapter-rail meta" aria-hidden="true">
        Out of the Lab — PT.00–05
      </aside>

      <section className="hero" id="pt-00">
        <p className="hero-part">
          PT—00/
          <span>05</span>
        </p>
        <div className="hero-main">
          <h1>Out of the Lab and Into the Factory</h1>
          <div className="hero-lede">
            <p>The New Computers, and the Mission for Quantum Hardware</p>
          </div>
        </div>
        <a className="scroll-cue" href="#pt-01" aria-label="Scroll down" />
      </section>

      <section className="chapter sand chapter-fit" id="pt-01" data-chapter-index="0">
        <div className="chapter-media">
          <MissionImage
            {...IMAGE.fig000}
            priority
            alt="Fifth Solvay Conference on Physics, 1927"
          />
          <span className="part-tag">PT—1</span>
          <p className="chapter-caption">
            <strong>[FIG.1]</strong>
            <span>Solvay Conference — 1927</span>
            <span>The founders of quantum theory</span>
          </p>
        </div>
        <div className="chapter-copy">
          <p className="meta">PT—01/ 05</p>
          <h2 className="chapter-title">Introduction</h2>
        </div>
      </section>

      <article className="prose prose-layout-center">
        <div className="prose-inner">
          <h2 className="prose-display">
            1. Introduction
          </h2>

          <p className="emph">
            Quantum computing is at risk of becoming an embarrassing footnote in
            the history of technology.
          </p>

          <p>
            If you've spent time around the field, you know the elephant in the
            room; futuristic looking computers the size of entire rooms on one
            hand, and on the other, fuzzy and opaque
            explanations of their supposed practical utility.{' '}
            <TermPeek
              term="Shor's algorithm"
              title="Shor's algorithm, 1994"
              imageName={IMAGE.figPeterShor.name}
              imageWidth={IMAGE.figPeterShor.width}
              imageHeight={IMAGE.figPeterShor.height}
              imageAlt="Peter Shor at the Dirac Medal Award Ceremony, 2017"
            >
              An algorithm native to quantum computers that finds the largest
              prime factors of a given number exponentially faster than classical
              computers. Discovered and proposed by American mathematician
              Peter Shor.
            </TermPeek>{' '}
            (famous for the threat it poses to modern day encryption systems) has
            been known since 1994, yet over 3 decades later the largest number
            ever factored using Shor's method is 35. And that was 7 years ago
            <sup className="cite">
              <a href="https://juser.fz-juelich.de/record/1042431/files/NIC_2025_Willsch.pdf">
                1
              </a>
            </sup>
            .
          </p>

          <p>
            Since that time, governments worldwide have announced more than $65.9
            billion for quantum science and technology, while quantum-technology
            startups raised $12.6 billion in 2025 alone, more than 90% of it for
            quantum computing. By then, two dozen manufacturers were commercially
            offering more than 40 quantum processors, yet none met the
            requirements for large-scale applications.
          </p>

          <p>
            In that same timeframe, the world was introduced to reusable rockets,
            self-driving cars, mass-market artificial intelligence and implantable
            brain–computer interfaces. It is by no means obvious that these fields
            are any less technically demanding than quantum computing.
          </p>

          <p>
            Progress in other fields has been exponential, while quantum
            processing power has barely changed. Why?
          </p>

          <p className="pull pull-sm pull-inline">
            The lack of external accountability made the industry complacent.
          </p>

          <p>
            To say that quantum computing has made <em>no</em> progress would be
            too harsh; some of the world's most gifted scientists have produced
            extraordinary results controlling individual atoms, photons,
            electrons and superconducting circuits. But the field is so
            specialised, and knowledge so hopelessly siloed between sub-fields,
            that almost nobody can practically judge the aggregate progress.
          </p>

          <p className="emph">
            Those allocating capital are left with no choice but to let companies
            mark their own homework.
          </p>

          <figure className="figure">
            <MissionImage
              {...IMAGE.figLaser}
              alt="Theodore Maiman with the first working laser"
            />
            <figcaption>
              <strong>[FIG.2]</strong>
              <span>Theodore Maiman</span>
              <span>First working laser — 1960</span>
            </figcaption>
          </figure>

          <p className="pull">There is a better way.</p>

          <p>
            Lasers moved from an unproven proposal to product in 4 years
            <sup className="cite">
              <a href="https://www.photonics.com/LinearChart.aspx?ChartID=2">
                2
              </a>
            </sup>
            .
            <br />
            The SR-71 Blackbird went from idea to test flight in a similar time
            frame
            <sup className="cite">
              <a href="https://www.lockheedmartin.com/en-us/news/features/history/blackbird.html">
                3
              </a>
            </sup>
            .
            <br />
            Why can’t incumbent computer manufacturers simply do the same?
          </p>

          <p>
            Leading quantum companies are home to some of the world’s most brilliant
            scientists and engineers, but their industrial infrastructure and
            manufacturing supply chains were conceived of and constructed in a
            different century.
          </p>

          <p>
            Physically speaking, the supply chain that a quantum computer depends
            upon consists of semiconductor fabs, lasers, chemical epitaxy,
            packaging, control electronics and either cryogenics or ultra-high
            vacuum systems.
          </p>

          <p>
            Someone has to be responsible for physically making these components,
            and the capability to do so is scattered across a small number of
            specialist suppliers and often between jurisdictions. Even the largest
            companies control only a small part of this chain, and any new part or
            process incurs lead times measured in months or even years.
          </p>

          <p>This traps companies in a simple loop:</p>

          <blockquote>
            Long lead times mean few builds, having few builds forces years' worth
            of upgrades into each machine, more improvements per build demands yet
            more planning and de-risking, and the next build takes even longer.
          </blockquote>

          <p>
            The leading companies do iterate, and it would be unfair to say
            otherwise. They fabricate new chips, improve gate fidelities and
            upgrade their systems constantly, and several have begun bringing
            fabrication in-house. These investments will shorten the chip cycle;
            the complete computer still passes through epitaxial growth,
            packaging, lasers, control electronics, cryogenics/vacuum, assembly
            and testing, and the pace of the whole machine remains governed by
            whichever stage moves slowest.
          </p>

          <p>
            We at Pathfinder are developing quantum computers in a new way, but we
            are only one company. If quantum computing is to be taken seriously as
            a frontier technology and break free from the bureaucratic overhang of
            academia, the excessive development costs and lead times, and the
            claustrophobically narrow specialisation that has so neutered the
            previous generation's brightest and best, the change must be
            industry-wide.
          </p>

          <p>
            <strong>
              We reject the assumption that the imminent
              arrival of fault-tolerant computers is a foregone conclusion.
            </strong>
          </p>
        </div>
      </article>


      <section className="chapter steel" id="pt-02" data-chapter-index="1">
        <div className="chapter-copy">
          <p className="meta">PT—02/ 05</p>
          <p className="chapter-kicker">
            Quantum Computing inherited an institutional model designed to
            produce demonstrations over products.
          </p>
          <h2 className="chapter-title">How Did We Get Here?</h2>
        </div>
        <div className="chapter-media">
          <MissionImage
            {...IMAGE.uva01}
            alt="Atomic physics experiment — University of Amsterdam"
          />
          <span className="part-tag">PT—2</span>
        </div>
      </section>

      <article className="prose prose-layout-start prose-close-bridge">
        <div className="prose-inner">
          <h2 className="prose-display">
            2. How Did We Get Here?
          </h2>

          <p className="pull pull-xl">
            Quantum Computing inherited an institutional model designed to
            produce demonstrations over products.
          </p>

          <figure className="figure figure-sm figure-center">
            <MissionImage
              {...IMAGE.figOpticalBench}
              alt="Crowded optical bench with lasers, mirrors, and cabling"
            />
            <figcaption>
              <strong>[FIG.3]</strong>
              <span>Ultracold-atom optical table — UQUAM / MPQ</span>
              <span>© Immanuel Bloch — European Commission</span>
            </figcaption>
          </figure>

          <p>
            The journey began as a sequence of experiments conducted in
            University physics departments all over the world.
          </p>

          <p>
            Not long after Peter Shor&rsquo;s discovery of his eponymous prime
            factorisation algorithm, researchers at NIST demonstrated the
            world&rsquo;s first quantum logic operation. In 1998, a team from Oxford
            ran one of the first complete quantum algorithms on a two-qubit
            machine.
          </p>

          <p>
            These first computers were not products in the way one may think of
            an iPhone or a Tesla - that is, mass-produced factory-line items -
            rather they were one-off experimental setups assembled by hand. Many
            of these experiments were built as PhD projects and postdoctoral
            research, and with that came academic incentive structures,
            timelines, and purchasing habits.
          </p>

          <p>
            Take the NIST experiment described above. The first quantum logic
            gate was reported in a{' '}
            <TermPeek
              term="four-page paper"
              imageName={IMAGE.figNistPaper.name}
              imageWidth={IMAGE.figNistPaper.width}
              imageHeight={IMAGE.figNistPaper.height}
              imageAlt="First page of Monroe et al., Demonstration of a Fundamental Quantum Logic Gate, Physical Review Letters, 1995"
              title="Monroe et al., 1995"
              wide
            >
              Phys. Rev. Lett. 75, 4714 — the NIST demonstration of a controlled-NOT
              gate on a single trapped beryllium ion. Four pages of states, pulses,
              results and error sources.
            </TermPeek>{' '}
            containing the atomic states used, the laser-pulse sequence, the
            measured result and the sources of error.
          </p>

          <p className="pull pull-sm">
            Notice, however, what was left out.
          </p>

          <OmitList />

          <p>
            <strong>
              None of this was required to substantiate the scientific claim.
            </strong>
          </p>

          <p>
            This distinction is written into the way academic research is
            assessed. In 2023, a House of Commons inquiry found that publication
            in a journal was the expected outcome of almost all academic research
            in Britain
            <sup className="cite">
              <a href="https://publications.parliament.uk/pa/cm5803/cmselect/cmsctech/101/report.html">
                13
              </a>
            </sup>
            . The standard academic CV, the committee was told, consisted
            principally of publications, grants and invitations to speak, while
            the Research Excellence Framework assessed published work according
            to its &ldquo;originality, significance and rigour.&rdquo;
          </p>

          <p className="pull pull-sm pull-end">
            Assembly time, fabrication yield, supplier qualification, maintenance
            hours and unit cost appear nowhere in the scorecard.
          </p>

          <p>
            <strong>
              ...But it couldn&rsquo;t have happened any other way.
            </strong>
          </p>

          <p>
            Before the question of mass-manufacturing a quantum computer made any
            sense to ask,{' '}
            <TermPeek
              term="Wolfgang Paul"
              imageName={IMAGE.figWolfgangPaul.name}
              imageWidth={IMAGE.figWolfgangPaul.width}
              imageHeight={IMAGE.figWolfgangPaul.height}
              imageAlt="Portrait of Wolfgang Paul"
              title="Wolfgang Paul, 1913–1993"
            >
              German physicist who invented the Paul trap — using oscillating
              electric fields to confine charged particles in free space. Shared
              the 1989 Nobel Prize in Physics for this work, which became the
              foundation of trapped-ion quantum computing.
            </TermPeek>{' '}
            first had to discover that oscillating electric fields could confine
            ions in free space.{' '}
            <TermPeek
              term="David Wineland"
              imageName={IMAGE.figDavidWineland.name}
              imageWidth={IMAGE.figDavidWineland.width}
              imageHeight={IMAGE.figDavidWineland.height}
              imageAlt="Portrait of David Wineland"
              title="David Wineland, b. 1944"
            >
              American physicist at NIST whose group showed that trapped ions
              could be laser-cooled nearly to rest. Shared the 2012 Nobel Prize
              in Physics; his laboratory later demonstrated the first quantum
              logic gate on a single ion.
            </TermPeek>
            ’s 1978 group in Colorado had to prove that trapped ions could be
            cooled using laser light. Only after another seventeen years of work
            did the first quantum logic gate follow.
          </p>

          <p>
            Without the work done by these pioneers, the industry would never
            have gotten started. The early emphasis on proving isolated pieces of
            the machine was entirely appropriate, because nobody yet knew whether
            those pieces could be made to work at all.
          </p>

          <p>
            Thirty years of experiments later and many of these early doubts have
            been allayed: quantum logic gates are now routine, processors with
            more than a thousand physical qubits have been built, and
            error-corrected logical qubits have begun to improve as more physical
            qubits are added.
          </p>

          <p className="pull pull-sm">
            ...But what makes a good prototype isn't always what makes a good product.
          </p>

          <div className="pattern-coda">
            <p>
              Innovation is followed by manufacture, and quantum computing is
              now beginning this transition for itself.
              The National Academies described the field’s greatest challenge in
              2019 as moving “from an understanding of the basic science to the
              creation of useful devices.”
            </p>
            <p>
              Unluckily for the budding researcher, this is a significantly less
              glamorous process than finding the one great scientific
              breakthrough. Luckily, however, we already have a role model whom
              we can follow: every other technological industry in existence.
            </p>
          </div>

          <div className="pattern-bridge">
            <p className="pull pull-sm pull-echo">
              Innovation is followed by manufacture.
            </p>
          </div>
        </div>
      </article>

      <section className="chapter black" id="pt-03" data-chapter-index="2">
        <div className="chapter-copy">
          <p className="meta">PT—03/ 05</p>
          <p className="chapter-kicker">
            <span className="kicker-stress">High unit cost</span> and{' '}
            <span className="kicker-stress">long lead times</span> are the
            predictable result of producing highly specialised equipment in
            small volumes.
          </p>
          <h2 className="chapter-title">The Industry Today</h2>
        </div>
        <div className="chapter-media">
          <MissionImage
            {...IMAGE.uva02}
            alt="Optical table atomic physics experiment — University of Amsterdam"
          />
          <span className="part-tag">PT—3</span>
        </div>
      </section>

      <article className="prose prose-layout-end">
        <div className="prose-inner">
          <h2 className="prose-display">
            3. The Industry Today
          </h2>

          <p>
            Now, more than 30 years later, the technology attracts industrial
            quantities of capital. In 2025 alone, companies across quantum
            computing, sensing and communications raised $4.9 billion
            <sup className="cite">
              <a href="https://quantumconsortium.org/publication/2026-state-of-the-global-quantum-industry-report/">
                5
              </a>
            </sup>{' '}
            in venture capital, while governments announced another $12.7 billion
            <sup className="cite">
              <a href="https://quantumconsortium.org/publication/2026-state-of-the-global-quantum-industry-report/">
                5
              </a>
            </sup>{' '}
            in funding commitments. The Quantum Economic Development Consortium
            counted 556
            <sup className="cite">
              <a href="https://quantumconsortium.org/publication/2026-state-of-the-global-quantum-industry-report/">
                5
              </a>
            </sup>{' '}
            specialist companies operating worldwide.
          </p>

          <p>
            Despite this, The MIT Quantum Index identified that the number of
            companies developing an announced, prototype or commercial quantum
            processor in 2025 was fewer than eighty
            <sup className="cite">
              <a href="https://qir.mit.edu/wp-content/uploads/2025/06/MIT-QIR-2025.pdf">
                6
              </a>
            </sup>
            . Only around two dozen
            <sup className="cite">
              <a href="https://qir.mit.edu/wp-content/uploads/2025/06/MIT-QIR-2025.pdf">
                6
              </a>
            </sup>{' '}
            offered one commercially. Hundreds of companies, billions of dollars
            and several national programmes therefore depend upon{' '}
            <strong>
              fewer than one hundred organisations attempting to build the
              central machine
              <sup className="cite">
                <a href="https://qir.mit.edu/wp-content/uploads/2025/06/MIT-QIR-2025.pdf">
                6
              </a>
              </sup>
              .
            </strong>
          </p>

          <p>
            Those manufacturers, in turn, depend upon a supply chain still
            organised around individual scientific experiments.
          </p>

          <p>
            In 2023 the National Quantum Computing Centre bought two
            strontium-ion laser suites from TOPTICA for £640,810
            <sup className="cite">
              <a href="https://www.sell2wales.gov.wales/search/show/search_view.aspx?ID=NOV457942">
                7
              </a>
            </sup>
            . Each contained eight lasers, together with the control electronics,
            frequency-locking equipment, optical fibres, software and rack
            required to operate them. The contract allowed nine months between
            order and delivery.
          </p>

          <p>Why so much? Why so slow?</p>

          <p>
            Laser companies are stuck
            between a rock and a hard place. All orders are bespoke; the laser
            system for a Strontium-based quantum computer might have little in
            common with the laser system for a Calcium-based atom physics
            experiment, and who&rsquo;s to say what the next order will be?
          </p>

          <p className="pull pull-sm">
            High unit cost and long lead times are the predictable result of
            producing highly specialised equipment in small volumes.
          </p>

          <p>
            Fragment the demand that way and economies of scale never appear. A
            manufacturer serving several dozen laboratories, all of whom have
            different requirements, cannot amortise an automated
            production line, while a quantum company working against the available
            catalogue gives the supplier little reason to redesign it. Long lead
            times, high prices and by-hand integration then appear to be intrinsic
            properties of the technology rather than consequences of the
            production methods being used.
          </p>

          <p>
            More money thrown around in grants is unlikely to solve the problem.
            It would be foolish to assume that the difficulty is one of being
            insufficiently clever to use the toolkit we have; the sharper question
            is whether the toolkit itself is up to the task.
          </p>

        </div>
      </article>

      <section className="chapter ink chapter-fit" id="pt-04" data-chapter-index="3">
        {/* Media first so copy can wrap around the uncropped illustration */}
        <div className="chapter-media">
          <MissionImage
            {...IMAGE.figGordianV2}
            alt="Drone photo of Intel Fab 9 under construction in Rio Rancho, New Mexico, January 2024"
          />
          <span className="part-tag">PT—4</span>
          <p className="chapter-caption">
            <strong>[FIG.4]</strong>
            <span>Intel Fab 9 — Rio Rancho, New Mexico</span>
            <span>Advanced packaging facility, January 2024</span>
          </p>
        </div>
        <div className="chapter-copy">
          <p className="meta">PT—04/ 05</p>
          <p className="chapter-kicker chapter-kicker-list">
            1. The Idiot Index
            <br />
            2. Question Every Requirement
            <br />
            3. Standardised Components
            <br />
            4. Vertical Integration
            <br />
            5. Increase Iteration Speed
          </p>
          <h2 className="chapter-title">Cutting the Gordian Knot</h2>
        </div>
      </section>

      <article className="prose prose-layout-start prose-knot">
        <div className="prose-inner">
          <h2 className="prose-display">
            4. Cutting the Gordian Knot
          </h2>

          <TypewriterLines lines={[...KNOT_PRINCIPLES]} />

          <p className="pull pull-sm">
            Junior engineers are explicitly told that requirements from "smart
            people" are the most dangerous, because nobody thinks to question them.
          </p>

          <p>Is there any historical precedent for having solved these problems?</p>

          <p>
            As it turns out there is. SpaceX is the most relevant example, despite
            aerospace engineering and quantum hardware not having much in common
            at first glance.
          </p>

          <TypewriterQuote
            plain
            paragraphs={[
              {
                text: 'What is a rocket made of? Aerospace-grade aluminum alloys, plus some titanium, copper, and carbon fiber. And then I asked, what is the value of those materials on the commodity market? It turned out that the materials cost of a rocket was around 2 percent of the typical price—which is a crazy ratio for a large mechanical product.',
                citeHref: 'https://www.wired.com/2012/10/ff-elon-musk-qa/',
                citeN: '8',
              },
              {
                parts: [
                  { text: 'Two percent', strong: true },
                  {
                    text: ". Your car’s raw materials are maybe 20-30% of sticker price. Consumer electronics are similar. But rockets? Ninety-eight cents of every dollar was going somewhere other than what it was made of. Where? Three places, it seems. Supplier markups stacking through contract layers, each tier adding 15-30% margin. Custom designs that couldn’t achieve manufacturing scale. Expendable hardware thrown away after every flight. None of these are the laws of physics. Traditional aerospace treated high costs as fixed constraints. But what if you treated them as variables? How do you actually capture that 98%?",
                    citeHref:
                      'https://futureblind.com/p/atoms-are-cheap-process-is-pricey',
                    citeN: '9',
                  },
                ],
              },
            ]}
          />

          <p>
            The negative feedback loop is the same in both
            cases: low volumes keep components bespoke; bespoke
            production offers little incentive for production overhaul; prices
            remain high and lead times long; and low volumes
            persist. In one case, the scarce unit is a launch. In the other, it is
            a computer.
          </p>

          <p className="pull pull-xl">
            It's the same problem, and it has been solved before.
          </p>

          <p>
            Quantum hardware comes with its own constraints: unsettled
            architectures, extreme tolerances and components produced in tiny
            volumes. So is the resemblance merely superficial, or does quantum
            computing face the same underlying supply-chain problem that SpaceX
            confronted? If it does, what were the specific practices,
            manufacturing strategy and organisational principles that allowed
            SpaceX to break the cycle, and which of them could work here?
          </p>

          <figure className="figure figure-sm">
            <MissionImage
              {...IMAGE.fig002}
              alt="Engineers examining hardware wreckage"
            />
            <figcaption>
              <strong>[FIG.5]</strong>
              <span>Early SpaceX Launch site, 2006</span>
              <span>Debris of the Falcon 1 launch</span>
            </figcaption>
          </figure>

          <h3 className="knot-title">1. The Idiot Index</h3>

          <p className="meme-subhead meme-subhead-center">
            Musk eventually named this the &ldquo;idiot index&rdquo;: the ratio
            of the actual cost of a part to the cost of its raw materials.
            &ldquo;If the ratio is high,&rdquo; he says, &ldquo;you&rsquo;re an
            idiot.&rdquo;
          </p>

          <p>
            A classical computer is constructed from specific component parts:
            GPUs, CPUs, cooling systems, et cetera. A quantum computer is much the
            same; high-precision lasers, vacuum systems, single-photon detectors,
            and more.
          </p>

          <blockquote className="quote-plain knot-quote">
            <p>
              Consider the Falcon 1 actuator. A vendor quoted $120,000 and eighteen
              months of development time.{' '}
              <strong>
                SpaceX engineer Steve Davis built it in-house in nine months for
                $3,900
                <sup className="cite">
                  <a href="https://www.vice.com/en/article/how-elon-musk-willed-spacex-into-making-the-cheapest-rockets-ever-created/">
                    10
                  </a>
                </sup>
                .
              </strong>
            </p>
          </blockquote>

          <p>
            Each of these component parts can be assigned it&rsquo;s own idiot
            index; a high value is a flashing light pointing to a poorly optimised
            manufacturing process. Values for ultra-precision components will be
            higher than those for parts with lower precision
            requirements, but this only indicates a higher cost floor; it says
            nothing about how far the current machinery is above it.
          </p>

          <h3 className="knot-title">2. Question Every Requirement</h3>

          <p className="meme-subhead meme-subhead-center">
            Junior engineers are explicitly told that requirements from
            &ldquo;smart people&rdquo; are the most dangerous, because nobody
            thinks to question them.
          </p>

          <p>
            A high idiot index identifies an expensive component; the knee-jerk
            response is ask how the component can be manufactured more cheaply,
            but{' '}
            <strong>
              the more astute question is to ask whether it needs to exist at
              all
            </strong>
            . Get rid of the part entirely, and the idiot index falls to 0.
          </p>

          <blockquote className="knot-quote">
            <p>
              Delete, delete, delete... the best part is no part - the best process
              is no process.
            </p>
          </blockquote>

          <p>
            The same exercise can be carried into the quantum supply chain.
            Commercial{' '}
            <TermPeek
              term="MOCVD reactors"
              title="MOCVD Reactor"
              wide
              imageName={IMAGE.figMocvd.name}
              imageWidth={IMAGE.figMocvd.width}
              imageHeight={IMAGE.figMocvd.height}
              imageAlt="Commercial MOCVD reactor used for epitaxial semiconductor growth"
            >
              Metal-organic chemical vapour deposition — a machine that grows
              thin semiconductor layers by flowing precursor gases over a heated
              wafer.
            </TermPeek>{' '}
            are designed to grow semiconductor layers of all different chemical
            makeups and sizes, all with fully automated handling.
          </p>

          <p>
            How much of the cost and complexity of the machine could be reduced
            if the requirement to fit multiple designs was removed? A
            refurbished second-hand reactor cost Glasgow University £165,000 in
            2017
            <sup className="cite">
              <a href="https://www.publiccontractsscotland.gov.uk/search/show/search_view.aspx?ID=JUL290649">
                11
              </a>
            </sup>
            , while high-capacity commercial systems have historically cost
            millions
            <sup className="cite">
              <a href="https://www.digitimes.com/news/a20130416PD214.html">12</a>
            </sup>
            .
          </p>

          <h3 className="knot-title">3. Standardised Components</h3>

          <p className="meme-subhead meme-subhead-center">
            The existing approach was bespoke vehicles per mission.{' '}
            <strong>
              SpaceX bet the opposite: that cost savings from standardisation
              would exceed the value of customisation.
            </strong>{' '}
            Yes, customers wanted custom solutions. But they wanted low prices
            even more. Force them to choose, and they&rsquo;d adapt.
          </p>

          <p>
            Go to any quantum hardware supplier right now, be it lasers, vacuum
            chambers or semiconductor fabs, and you will inevitably see the words
            &lsquo;request a quotation&rsquo; in place of a price tag. Why is this?
            Are suppliers being secretive, or do they genuinely not know?
          </p>

          <p>
            It&rsquo;s the latter, of course: it&rsquo;s the same
            low-volume-differing-requirements problem again.{' '}
            <strong>
              Economies of scale only emerge from making the same design in bulk;
              fragmented demand denies suppliers the opportunity to do so.
            </strong>
          </p>

          <h3 className="knot-title">4. Vertical Integration</h3>

          <p className="pull">
            Vertical integration gives manufacturers the freedom to cut everything
            that is not absolutely critical to building better computers.
          </p>

          <p>
            This means avoiding the time cost
            and incurred margins of outsourcing components, but it comes with
            costs of its own. Fixed costs, specifically. Bringing the machines
            in-house
            isn&rsquo;t cheap, and incurs a lot of complexity in the short term.
            In fact, if the goal is to build a single computer, it doesn&rsquo;t
            make much sense to bring the manufacturing in-house at all.
          </p>

          <blockquote className="quote-plain knot-quote">
            <p>
              If materials are cheap and the tax is all process and overhead, you
              need to control the process to capture the savings.{' '}
              <strong>
                You can&rsquo;t negotiate your way to a 10x cost reduction with
                suppliers who have profits baked in at every tier.
              </strong>{' '}
              By building 80% of its hardware internally, SpaceX collapsed the
              traditional aerospace stack.
            </p>
          </blockquote>

          <h3 className="knot-title">5. Increase Iteration Speed</h3>

          <p className="meme-subhead meme-subhead-center">
            Traditional aerospace builds few prototypes, each one expensive and
            near-flight-ready. SpaceX builds many cheaper prototypes.{' '}
            <strong>
              They&rsquo;d rather have ten rough versions to blow up than one
              polished version they&rsquo;re afraid to break.
            </strong>
          </p>

          <p>
            The idiot index identifies where manufacturing optimisations can be
            made, vertical integration gives the control needed to implement them,
            and standardising the components unlocks the economies of scale needed
            to make them cheap.
          </p>

          <p>
            But internalising all these manufacturing processes internalises the
            maintenance costs, not to mention the price of the machines themselves.
            The factory loses money every second that these machines aren&rsquo;t
            producing something valuable. Iteration speed is what makes the whole
            process profitable - new ideas can be tested cheaply, quickly, and the
            manufacturers needn&rsquo;t be precious about whether an idea is likely
            to work or not. The whole design process gets flipped on its head;
            instead of having to meticulously plan out what ideas get to go in the
            new design before starting manufacture, ideas can be tested cheaply and
            quickly. If they don&rsquo;t work, the time and financial loss is
            minimal.
          </p>

          <figure className="figure">
            <MissionImage
              {...IMAGE.fig003}
              alt="Evolution of the Raptor engine from version 1 to 3"
            />
            <figcaption>
              <strong>[FIG.6]</strong>
              <span>Evolution of the Raptor engine, from version 1 to 3</span>
              <span>Simplify, simplify, simplify!</span>
            </figcaption>
          </figure>

          <p>
            All these parts came together in a way that was mutually reinforcing;
            first-principles engineering identified manufacturing optimisations,
            vertical integration let those optimisations happen, standardisation
            facilitated the high production rate that led to so many test
            flights.
          </p>

          <TypewriterLines lines={[...KNOT_PRINCIPLES]} />
        </div>
      </article>

      <section className="cta cta-splash" id="pt-05">
        <figure className="cta-media">
          <MissionImage
            {...IMAGE.figNoyce}
            alt="The Traitorous Eight at Fairchild Semiconductor, 1960"
          />
          <figcaption>
            <strong>[FIG.7]</strong>
            <span>The Traitorous Eight</span>
            <span>Fairchild Semiconductor, 1960</span>
          </figcaption>
        </figure>
        <div className="cta-head">
          <p className="meta">PT—05/ 05</p>
          <h2>Join Us</h2>
        </div>
      </section>

      <CtaPitch
        lines={[
          'Pathfinder is looking for a technical cofounder.',
          'An engineer or physicist prepared to spend the next decade hacking together the quantum production line from scratch.',
        ]}
      />

      <section className="sources" aria-label="Sources">
        <ol className="sources-list">
          {SOURCES.map((source) => (
            <li key={source.n}>
              <span className="sources-n">{source.n}.</span>{' '}
              {source.text}{' '}
              <a href={source.href} target="_blank" rel="noreferrer">
                {source.href}
              </a>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}

export default App
