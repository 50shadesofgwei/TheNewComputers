import { useEffect } from 'react'
import Lenis from 'lenis'
import { CHAPTER_IMAGES, IMAGE, MissionImage } from './MissionImage'
import { OmitList } from './OmitList'
import { TermPeek } from './TermPeek'
import './App.css'

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
        Out of the Lab — PT.00–07
      </aside>

      <section className="hero" id="pt-00">
        <p className="hero-part">
          PT—00/
          <span>07</span>
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
          <p className="meta">PT—01/ 07</p>
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
            room; futuristic looking computers buried inside room-sized golden
            chandeliers on one hand, and on the other, fuzzy and opaque
            explanations of their supposed practical utility. Shor's algorithm
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
            requirements for large-scale applications such as chemical simulation
            or cryptanalysis.
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
            specialised, and knowledge so hopelessly siloed across sub-fields,
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
            Consider the Laser Race between American laboratories in the late
            50s. In 1958, researchers at Bell Labs proposed a
            machine that could amplify light into a narrow, high-powered beam; two
            years later in 1960, an American physicist named Theodore Maiman
            turned the idea into the first working laser. By 1962, lasers had been
            built from ruby crystals, gases and semiconductors - a single proposal
            had turned into a proliferation of working machines in just four
            years.
          </p>

          <p>
            Fairchild Semiconductor moved at a similar pace. Founded in 1957, it
            developed the planar process, placed several electronic components and
            their connections onto a single piece of silicon - the integrated
            circuit - and began selling the resulting chips within four years.
          </p>

          <p>
            Why can’t incumbent computer manufacturers simply do the same?
            Leading QC companies are home to some of the world’s most brilliant
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

      <section className="chapter black" id="pt-02" data-chapter-index="1">
        <div className="chapter-copy">
          <p className="meta">PT—02/ 07</p>
          <p className="chapter-kicker">
            The New Computers had, out of the blue, solved what was previously
            thought to be an intractable problem.
          </p>
          <h2 className="chapter-title">What Are Quantum Computers Good For, Anyway?</h2>
        </div>
        <div className="chapter-media">
          <MissionImage
            {...IMAGE.fig001}
            alt="Richard Feynman at a blackboard"
          />
          <span className="part-tag">PT—2</span>
          <p className="chapter-caption chapter-caption-inv">
            <strong>[FIG.3]</strong>
            <span>Richard Feynman</span>
            <span>Simulating physics with computers — 1981</span>
          </p>
        </div>
      </section>

      <article className="prose prose-layout-end">
        <div className="prose-inner">
          <h2 className="prose-display">
            2. What Are Quantum Computers Good For, Anyway?
          </h2>

          <p>
            In 1981, Richard Feynman - frustrated at the difficulty that classical
            computers faced in trying to simulate quantum mechanical problems -
            hypothesised a computer that had quantum mechanics built directly into
            the machine.
          </p>

          <p>
            This was the nucleus of the idea; that in order to simulate quantum
            mechanics, one would need a quantum-mechanical calculator.
          </p>

          <p>
            Fast-forward 40 years and some unexpected results popped up along the
            way. In 1994 an American computer scientist named Peter Shor
            discovered that integer factorisation, a problem considered classically
            intractable, was in fact solvable by an algorithm that could only be
            run on a quantum computer. This was somewhat unexpected, as far as
            Feynman's original hypothesis was concerned; a machine for simulating
            physics had suddenly cracked a mathematical problem.
          </p>

          <p className="pull">
            The classical world was again proven to contain patterns only visible
            through the lens of quantum mechanics.
          </p>

          <p>
            For all the attention paid to codebreaking, however, the most
            consequential application may still be the one Feynman first
            imagined: simulating matter.
          </p>

          <p>
            The efficiency of a solar cell, the capacity of a battery, the
            strength of a magnet and the temperature at which a superconductor
            works are all downstream of the behaviour of the particles that make
            them up.{' '}
            <strong>
              Where we can predict that behaviour accurately, we can design new
              materials around the properties we want them to possess.
            </strong>
          </p>

          <p>
            For many types of materials, classical algorithms can compute
            simulations very effectively using approximation algorithms; Walter
            Kohn was awarded half of the 1998 Nobel Prize in Chemistry for such
            work. But in complex materials, so called "strongly correlated"
            systems where many electrons all become entangled, these
            approximations begin to fail.
          </p>

          <p>So what's the difference?</p>

          <p>
            Normally, classical methods make the calculation manageable by
            replacing the full web of electron interactions with a simpler, less
            computationally demanding approximation of how each electron
            behaves.
          </p>

          <p>
            In strongly correlated materials, however, those interactions are
            what produce the material’s unusual properties, so simplifying them
            away also removes the phenomenon we are trying to explain.
          </p>

          <aside className="exposit">
            <div className="exposit-inner">
              <p>
                Say we have 100 electron spins, each of which can be measured as
                up or down. Together, they have 2<sup>100</sup> possible
                configurations. Their collective quantum state can extend across
                many of these configurations at once.
              </p>

              <p>
                To reproduce this exactly, a classical computer must keep a
                separate record of every configuration and how it contributes to
                the whole. As the electrons interact, it must continually
                recalculate this exponentially large record.{' '}
                <strong>
                  The choice becomes: approximate it badly, or track an
                  exponentially growing amount of information.
                </strong>
              </p>

              <p>
                If we have 100 qubits, and every one of them is entangled with
                every other one, then the total number of possible configurations
                that this system can be in is, again, 2<sup>100</sup>.
              </p>

              <p>
                <strong>But notice here that it only took 100 qubits</strong>.
              </p>
            </div>
          </aside>

          <p>
            This is the general class of problem for which these machines were
            originally conceived; highly entangled systems that classical computers
            cannot efficiently simulate. Of course scientists
            will still have to test the results in the lab, but the direction of
            physical experimentation is made less blind by eliminating bad
            candidates before they are synthesised.
          </p>

          <figure className="figure figure-tall figure-center">
            <MissionImage
              {...IMAGE.figIbm}
              alt="IBM quantum computer dilution refrigerator"
            />
            <figcaption>
              <strong>[FIG.4]</strong>
              <span>IBM Quantum System</span>
              <span>Cryogenic dilution refrigerator</span>
            </figcaption>
          </figure>

          <div className="prose-band prose-band-start">
            <p>
              Equally important as knowing what a quantum computer does is to know what it does{' '}
              <em>not</em> do. Much talk is heard surrounding supposed quantum improvements to
              financial portfolio planning and general optimisation problems;
              claims around quantum impact in machine learning remain speculative
              at best.
            </p>

            <p>
              And to give the critics their due, they're absolutely justified in
              calling this out. There are a lot of exaggerations, half-truths, and
              hype that is totally ungrounded in reality.
            </p>

            <p>
              Some of the more uniquely egregious bullshit levied by the
              industry's less scrupulous commentators includes Michio Kaku's claim
              that "quantum computers will make cancer as harmless as the common
              cold"
              <sup className="cite">
                <a href="https://www.businesswire.com/news/home/20221014005367/en/Cancer-to-Be-Treated-as-Easily-as-Common-Cold-When-Humans-Crack-Quantum-Computing">
                2
              </a>
              </sup>
              , the Google announcement that "quantum computers lend credence to
              the existence of parallel universes"
              <sup className="cite">
                <a href="https://blog.google/technology/research/google-willow-quantum-chip/">
                3
              </a>
              </sup>
              , and that "As quantum AI technology advances, life expectancy will
              increase faster, eventually reaching a point where we gain a year of
              life expectancy each year."
              <sup className="cite">
                <a href="https://millenniumprize.org/news-articles/news/mtp-forum-speaker-interview-quantum-computing-will-enable-us-to-live-longer-healthier-lives-free-from-the-limitations-humans-have-always-faced/">
                4
              </a>
              </sup>
            </p>

            <p>
              All this, yet the largest number factored by a quantum computer
              remains 35
              <sup className="cite">
                <a href="https://juser.fz-juelich.de/record/1042431/files/NIC_2025_Willsch.pdf">
                1
              </a>
              </sup>
              .
            </p>

            <p>So what might they actually be good for?</p>
          </div>

          <figure className="figure">
            <MissionImage
              {...IMAGE.figCondensed}
              alt="Nematic quantum Hall liquid — Condensed Matter Simulations, University of Princeton"
            />
            <figcaption>
              <strong>[FIG.5]</strong>
              <span>Condensed Matter Simulations, University of Princeton</span>
              <span>
                Electron wavefunctions on Bismuth (
                <span className="nuclide" aria-label="Bismuth, atomic number 83">
                  <sub className="nuclide-z">83</sub>Bi
                </span>
                )
              </span>
            </figcaption>
          </figure>

          <p>High-temperature superconductors are one relevant case.</p>

          <p>
            Those in tech circles may recall the stir caused in 2023 when a group
            of South Korean scientists went viral over their claim to have
            discovered a room-temperature superconductor. Independent replication
            later proved that this was not the case, but for a brief moment, their
            Nobel Prize and place in the annals of history seemed secured.
          </p>

          <p>
            Superconductors already make MRI scanners, particle accelerators and
            the strongest research magnets possible; newer high-temperature
            materials are being developed for compact fusion reactors,
            higher-capacity power cables and lighter, more powerful motors. The
            problem is that even “high-temperature” superconductors must be kept
            cryogenic;{' '}
            <strong>
              a material that worked at ordinary temperatures and pressures would
              remove one of the main barriers to their widespread use.
            </strong>
          </p>

          <p>
            The best candidates we have for high-temperature superconductors
            today —{' '}
            <TermPeek
              term="cuprates"
              imageName={IMAGE.figCuprate.name}
              imageWidth={IMAGE.figCuprate.width}
              imageHeight={IMAGE.figCuprate.height}
              imageAlt="Crystal structure of the cuprate superconductor YBa2Cu3O7"
              title="Cuprates"
            >
              Copper-oxide ceramics whose layered planes host the highest-temperature
              superconductivity yet found at ambient pressure. Pictured: the crystal
              structure of YBa₂Cu₃O₇.
            </TermPeek>
            {' '}
            — just so happen to have this same strongly-correlated electron
            structure. This is exactly the kind of simulation problem that quantum
            computers are made for.
          </p>

          <p>
            Of course, none of this is guaranteed. Classical simulation will
            continue to improve. Useful quantum algorithms will demand machines
            far larger and more reliable than those available today. Quantum
            computers will, in all likelihood, be useless for almost everything we
            currently use computers for. They do not need to replace classical
            computation, any more than aeroplanes needed to replace bicycles: an
            aeroplane is transformative for getting across an ocean and useless
            for a
            trip to the shops. A small number of calculations currently beyond our
            reach will transform cryptography, energy, materials science and
            industrial chemistry.
          </p>

          <p>
            The prize, then, is not to replace all silicon computers, nor is it to
            'access parallel universes', whatever that means. As the first man to
            discover fire, the first man in space and the first man to split the
            atom all knew, the ultimate prize is to understand and control matter
            itself.
          </p>
        </div>
      </article>

      <section className="chapter steel" id="pt-03" data-chapter-index="2">
        <div className="chapter-copy">
          <p className="meta">PT—03/ 07</p>
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
          <span className="part-tag">PT—3</span>
        </div>
      </section>

      <article className="prose prose-layout-start prose-close-bridge">
        <div className="prose-inner">
          <h2 className="prose-display">
            3. How Did We Get Here?
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
              <strong>[FIG.6]</strong>
              <span>Ultracold-atom optical table — UQUAM / MPQ</span>
              <span>© Immanuel Bloch — European Commission</span>
            </figcaption>
          </figure>

          <p>
            The journey began as a sequence of experiments conducted in
            University physics departments all over the world.
          </p>

          <p>
            Not long after Peter Shor's discovery of his eponymous prime
            factorisation algorithm, researchers at NIST demonstrated the first
            quantum logic gate using a beryllium ion suspended in an electric
            field; in 1998, researchers at Oxford used the magnetic properties of
            atoms to execute one of the first complete quantum algorithms on a
            two-qubit system.
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
            And it's no surprise; none of this was required to substantiate the
            scientific claim.
          </p>

          <p>
            This distinction is written into the way academic research is
            assessed. In 2023, a House of Commons inquiry found that publication
            in a journal was the expected outcome of almost all academic research
            in Britain. The standard academic CV, the committee was told,
            consisted principally of publications, grants and invitations to
            speak, while the Research Excellence Framework assessed published
            work according to its “originality, significance and rigour.”
          </p>

          <p className="pull pull-sm pull-end">
            Assembly time, fabrication yield, supplier qualification, maintenance
            hours and unit cost appear nowhere in the scorecard.
          </p>

          <p>
            <strong>
              And in all fairness, it's hard to imagine this having come about
              any other way.
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

          <p>We can here look to the past for historical examples.</p>

          <div className="history-cases">
            <div className="history-cases-col history-cases-col--start">
              <article className="history-case">
                <div className="history-case-banner">
                  <MissionImage
                    {...IMAGE.figHaberBosch}
                    alt="BASF Oppau works, 1914 — Otto Bollhagen"
                  />
                </div>
                <div className="history-case-body">
                  <p className="meta">Haber–Bosch</p>
                  <p>
                    In 1909, Fritz Haber demonstrated a laboratory apparatus
                    which produced around 100 cubic centimetres of ammonia. Carl
                    Bosch was then assigned the considerably larger task of
                    turning it into an industrial process. Doing so required new
                    catalysts, new methods of producing pure gases and
                    high-pressure reactors made from steels which would not
                    split apart after hydrogen penetrated them. The first plant
                    opened four years later with an annual capacity of 8,700
                    tonnes. Haber had established the chemistry, Bosch and his
                    team invented the industrial machinery surrounding it.
                  </p>
                </div>
              </article>

              <article className="history-case">
                <div className="history-case-banner">
                  <MissionImage
                    {...IMAGE.figPlanar}
                    alt="Silicon wafer patterned with integrated circuits"
                  />
                </div>
                <div className="history-case-body">
                  <p className="meta">Planar process</p>
                  <p>
                    The same distinction appears in computing itself. The
                    transistor was demonstrated at Bell Labs in 1947, but early
                    devices remained difficult to manufacture reliably. Twelve
                    years later, Fairchild found a way to make them the same way
                    every time, and at scale. Fairchild commercialised the first
                    planar transistor in 1960, and the process became the
                    manufacturing basis of what we now know as the microchip.
                  </p>
                </div>
              </article>
            </div>

            <div className="history-cases-col history-cases-col--end">
              <article className="history-case">
                <div className="history-case-banner">
                  <MissionImage
                    {...IMAGE.figPenicillin}
                    alt="Penicillin production flasks, England, 1943"
                  />
                </div>
                <div className="history-case-body">
                  <p className="meta">Penicillin</p>
                  <p>
                    Penicillin followed much the same pattern. Fleming
                    discovered it in 1928, and the Oxford team established its
                    therapeutic value in 1941, but the drug was still being
                    produced in one-litre flasks at yields below one per cent.
                    American chemists and engineers developed better mould
                    strains, culture media, purification methods and submerged
                    fermentation tanks. Between 1943 and 1945, American
                    production rose from 21 billion units to more than 6.8
                    trillion, while yields increased to between 80 and 90 per
                    cent.
                  </p>
                </div>
              </article>
            </div>
          </div>

          <p className="pull">
            The pattern is the same in all cases; scientific innovation is
            followed by mass manufacture.
          </p>

          <div className="pattern-coda">
            <p>
              Quantum computing is now entering its version of this transition.
              The National Academies described the field’s greatest challenge in
              2019 as moving “from an understanding of the basic science to the
              creation of useful devices.” Unluckily for the budding researcher,
              this is a significantly less glamorous process than finding the one
              great scientific breakthrough. Luckily, however, we already
              have a role model whom we can follow: every other technological industry in
              existence.
            </p>
          </div>

          <div className="pattern-bridge">
            <p className="pull pull-sm pull-echo">
              Innovation is followed by manufacture.
            </p>
          </div>
        </div>
      </article>

      <section className="chapter black" id="pt-04" data-chapter-index="3">
        <div className="chapter-copy">
          <p className="meta">PT—04/ 07</p>
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
          <span className="part-tag">PT—4</span>
        </div>
      </section>

      <article className="prose prose-layout-end">
        <div className="prose-inner">
          <h2 className="prose-display">
            4. The Industry Today
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

          <p>Why so much? Why so slow? Let's not jump to any conclusions.</p>

          <p>
            Laser companies are stuck between a rock and a hard place. All orders
            are bespoke; the laser system for a Strontium-based quantum computer
            might have little in common with the laser system for a Calcium-based
            atom physics experiment, and who's to say what the next order will be?
          </p>

          <p className="pull pull-sm">
            High unit cost and long lead times are the predictable result of
            producing highly specialised equipment in small volumes.
          </p>

          <p>
            Fragment the demand that way and economies of scale never appear. A
            manufacturer serving several dozen laboratories, split across several
            dozen incompatible wavelengths, cannot amortise an automated
            production line, while a quantum company working against the available
            catalogue gives the supplier little reason to redesign it. Long lead
            times, high prices and by-hand integration then appear to be intrinsic
            properties of the technology rather than consequences of the volumes
            and production methods being used.
          </p>

          <p>
            More money thrown around in grants is unlikely to solve the problem.
            It would be foolish to assume that the difficulty is one of being
            insufficiently clever to use the toolkit we have; the sharper question
            is whether the toolkit itself is up to the task.
          </p>

        </div>
      </article>

      <section className="chapter ink chapter-fit" id="pt-05" data-chapter-index="4">
        {/* Media first so copy can wrap around the uncropped illustration */}
        <div className="chapter-media">
          <MissionImage
            {...IMAGE.fig003}
            alt="Evolution of the Raptor engine from version 1 to 3"
          />
          <span className="part-tag">PT—5</span>
        </div>
        <div className="chapter-copy">
          <p className="meta">PT—05/ 07</p>
          <p className="chapter-kicker chapter-kicker-list">
            1. The Idiot Index
            <br />
            2. Question Every Requirement
            <br />
            3. Standardisation of Components
            <br />
            4. Vertical Integration
            <br />
            5. Increase Iteration Speed
          </p>
          <h2 className="chapter-title">Cutting the Gordian Knot</h2>
        </div>
      </section>

      <article className="prose prose-layout-start">
        <div className="prose-inner">
          <h2 className="prose-display">
            5. Cutting the Gordian Knot
          </h2>

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

          <blockquote className="quote-plain">
            <p>
              What is a rocket made of? Aerospace-grade aluminum alloys, plus some
              titanium, copper, and carbon fiber. And then I asked, what is the
              value of those materials on the commodity market? It turned out that
              the materials cost of a rocket was around 2 percent of the typical
              price—which is a crazy ratio for a large mechanical product.
              <sup className="cite">
                <a href="https://www.wired.com/2012/10/ff-elon-musk-qa/">8</a>
              </sup>
            </p>
            <p>
              Two percent. Your car’s raw materials are maybe 20-30% of sticker
              price. Consumer electronics are similar. But rockets? Ninety-eight
              cents of every dollar was going somewhere other than what it was
              made of. Where? Three places, it seems. Supplier markups stacking
              through contract layers, each tier adding 15-30% margin. Custom
              designs that couldn’t achieve manufacturing scale. Expendable
              hardware thrown away after every flight. None of these are laws of
              physics. Traditional aerospace treated high costs as fixed
              constraints. But what if you treated them as variables? How do you
              actually capture that 98%?
              <sup className="cite">
                <a href="https://futureblind.com/p/atoms-are-cheap-process-is-pricey">
                9
              </a>
              </sup>
            </p>
          </blockquote>

          <p>
            The similarities are striking. The negative feedback loop is identical in both
            cases: low volumes keep components bespoke; bespoke
            production offers little incentive for suppliers to overhaul their
            methods; prices remain high and lead times long; and low volumes
            persist. In one case, the scarce unit is a launch. In the other, it is
            a quantum computer.
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

          <figure className="figure">
            <MissionImage
              {...IMAGE.fig002}
              alt="Engineers examining hardware wreckage"
            />
            <figcaption>
              <strong>[FIG.7]</strong>
              <span>Hardware-rich iteration</span>
              <span>Fail visibly, learn quickly</span>
            </figcaption>
          </figure>

          <h3>1. The Idiot Index</h3>

          <blockquote>
            Musk eventually named this the "idiot index": the ratio of the actual
            cost of a part to the cost of its raw materials. “If the ratio is
            high,” he says, “you’re an idiot.”
          </blockquote>

          <p>
            A classical computer is made from a laundry list of component parts.
            GPUs, CPUs, cooling systems, et cetera. A quantum computer is much the
            same; high-precision lasers, vacuum systems, single-photon detectors,
            and more.
          </p>

          <blockquote>
            Consider the Falcon 1 actuator. A vendor quoted $120,000 and eighteen months of development
            time. SpaceX
            engineer Steve Davis built it in-house in nine months for $3,900
            <sup className="cite">
              <a href="https://www.vice.com/en/article/how-elon-musk-willed-spacex-into-making-the-cheapest-rockets-ever-created/">
                10
              </a>
            </sup>
            .
          </blockquote>

          <p>
            Each of these component parts can be assigned it's own idiot index; a
            high value is a flashing light pointing to a poorly optimised
            manufacturing process. Values for ultra-precision components will of
            course be higher than those for parts with lower precision
            requirements, but this only indicates a higher cost floor; it says
            nothing about how far the current machinery is above it.
          </p>

          <p>
            Knowing where the manufacturing inefficiencies are hiding is only half
            the problem, however. Fixing them is more difficult, especially so
            with quantum hardware.
          </p>

          <h3>2. Question Every Requirement</h3>

          <blockquote>
            Junior engineers are explicitly told that requirements from "smart
            people" are the most dangerous, because nobody thinks to question
            them.
          </blockquote>

          <p>
            A high idiot index identifies an expensive component; the knee-jerk
            response is ask how the component can be manufactured more cheaply,
            but the more astute question is to ask whether it needs to exist at
            all. Get rid of the part entirely and the idiot index falls to 0.
          </p>

          <blockquote>
            <p>Delete, delete, delete... the best part is no part - the best
            process is no process.</p>
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
              wafer. The workhorse tool for fabricating compound-semiconductor
              lasers and related devices.
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

          <h3>3. Standardisation of Components</h3>

          <blockquote>The only way to get volume is to standardise.</blockquote>

          <p>
            Go to any quantum hardware supplier right now, be it lasers, vacuum
            chambers or semiconductor fabs, and you will inevitably see the words
            'request a quotation' in place of a price tag. Why is this? Are
            suppliers being secretive, or do they genuinely not know?
          </p>

          <blockquote className="quote-plain">
            <p>
              The existing approach was bespoke vehicles per mission.{' '}
              <strong>
                SpaceX bet the opposite: that cost savings from standardisation
                would exceed the value of customisation.
              </strong>{' '}
              Yes, customers wanted custom solutions. But they wanted low prices
              even more. Force them to choose, and they’d adapt.
            </p>
          </blockquote>

          <p>
            It's the latter, of course, but let's not be too quick to point
            fingers: it's the same low-volume-differing-requirements problem again.
            One company chooses calcium ions; another chooses barium. Even two
            barium systems might have different requirements if different isotopes
            are used.
          </p>

          <p>
            Economies of scale only come from making the same design repeatedly;
            fragmented demand denies suppliers the opportunity to drive their
            costs down and their production rates up.
          </p>

          <h3>4. Vertical Integration</h3>

          <blockquote className="quote-plain">
            <p>
              If materials are cheap and the tax is all process and overhead, you
              need to control the process to capture the savings.{' '}
              <strong>
                You can’t negotiate your way to 10x cost reduction with suppliers
                who have profits baked in at every tier.
              </strong>{' '}
              By building 80% of its hardware internally, SpaceX collapsed the
              traditional aerospace stack.
            </p>
          </blockquote>

          <p className="pull">
            Vertical integration gives manufacturers the freedom to cut everything
            that is not absolutely critical to building better computers.
          </p>

          <p>
            In practical terms, vertical integration means avoiding the time cost
            and incurred margins of outsourcing components. But it comes with a
            cost. Fixed costs, specifically. Bringing the machines in-house isn't
            cheap, and incurs a lot of complexity in the short term. In fact, if
            the goal is to build a single computer, it doesn't make much sense to
            bring the manufacturing in-house at all.
          </p>

          <h3>5. Increase Iteration Speed</h3>

          <p>
            The idiot index identifies where manufacturing optimisations can be
            made, vertical integration gives the control needed to implement them,
            and standardising the components unlocks the economies of scale needed
            to make them cheap.
          </p>

          <p>
            But internalising all these manufacturing processes internalises the
            maintenance costs, not to mention the price of the machines themselves.
            The factory loses money every second that these machines aren't
            producing something valuable. Iteration speed is what makes the whole
            process profitable - new ideas can be tested cheaply, quickly, and the
            manufacturers needn't be precious about whether an idea is likely to
            work or not. The whole design process gets flipped on its head; instead
            of having to meticulously plan out what ideas get to go in the new
            design before starting manufacture, ideas can be tried cheaply and
            quickly. If they don't work, the time and financial loss is minimal.
          </p>

          <blockquote>
            Traditional aerospace builds few prototypes, each one expensive and
            near-flight-ready. SpaceX builds many cheaper prototypes. They’d
            rather have ten rough versions to blow up than one polished version
            they’re afraid to break.
          </blockquote>

          <p>
            The total number of computers produced by the 5 largest quantum
            computing companies over the past 10 years is [X]. That's an average
            of 1 new machine every [X.Y] years.
          </p>

          <blockquote>
            A high production rate solves many ills. Any given technology
            development is “How many iterations do you have? And what’s your time
            and progress between iterations?” So if you have a high production
            rate, you can have a lot of iterations. You can try lots of different
            things... If you have a small number of engines, then you have to be
            much more conservative because you can’t risk blowing them up.
          </blockquote>

          <blockquote>
            Vertical integration really helps enable this. When you own the
            factory, you can build fast without waiting on vendors. When you own
            3D printing capability, you can produce parts on an ad-hoc basis. When
            you can manufacture Raptor engines at high volume, losing one to a
            test failure doesn’t set you back months.
          </blockquote>

          <figure className="figure">
            <MissionImage
              {...IMAGE.fig003}
              alt="Evolution of the Raptor engine from version 1 to 3"
            />
            <figcaption>
              <strong>[FIG.8]</strong>
              <span>Evolution of the Raptor engine, from version 1 to 3</span>
              <span>Simplify, simplify, simplify!</span>
            </figcaption>
          </figure>

          <p>
            All these parts came together in a way that was mutually reinforcing;
            first-principles engineering identified manufacturing optimisations,
            vertical integration let those optimisations happen, and
            standardisation allowed the volume to make that control profitable.
          </p>

          <p className="pull pull-sm">
            1. The Idiot Index
            <br />
            2. Question Every Requirement
            <br />
            3. Standardisation of Components
            <br />
            4. Vertical Integration
            <br />
            5. Increase Iteration Speed
          </p>
        </div>
      </article>

      <section className="chapter black" id="pt-06" data-chapter-index="5">
        <div className="chapter-copy">
          <p className="meta">PT—06/ 07</p>
          <p className="chapter-kicker">
            Declare War on Complexity. Tip-of-the-Spear Focus. Question Every
            Requirement. Scrappiness. Fail Visibly and Fail Often.
          </p>
          <h2 className="chapter-title">The People</h2>
        </div>
        <div className="chapter-media">
          <MissionImage
            {...IMAGE.fig002}
            alt="Hardware failure analysis in an industrial hangar"
          />
          <span className="part-tag">PT—6</span>
        </div>
      </section>

      <article className="prose prose-layout-center">
        <div className="prose-inner">
          <h2 className="prose-display">
            6. The People
          </h2>

          <p className="note">
            [I like the meme idea. It's a lot less 'we want the hardest working
            people' and a lot more specific. What are my memes?]
          </p>

          <p>
            <strong>Declare War on Complexity</strong>
            <br />
            [They Muddy the Waters, to Make Them Look Deep] Far too much
            complexity theatre, make things easier not harder. Getting stuff done
            has to be more important than looking clever.
          </p>

          <p>
            <strong>Tip-of-the-Spear Focus</strong>
            <br />
            [Does this get us closer to Mars? If not, let's skip for now.]
          </p>

          <p>
            <strong>Question Every Requirement</strong>
            <br />
            [Need people who are willing to question experts]
          </p>

          <p>
            <strong>Scrappiness</strong>
          </p>

          <p>
            <strong>Fail Visibly and Fail Often</strong>
          </p>
        </div>
      </article>

      <section className="cta" id="pt-07">
        <p className="meta">PT—07/ 07</p>
        <h2>7. Join Us</h2>
        <p>[Some call to action]</p>
      </section>
    </div>
  )
}

export default App
