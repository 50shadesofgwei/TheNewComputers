import { useEffect } from 'react'
import Lenis from 'lenis'
import { CHAPTER_IMAGES, IMAGE, MissionImage } from './MissionImage'
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
            been known since 1994, yet nearly 3 decades later the largest number
            ever factored using Shor's method is 21. And that was 14 years ago.
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
            Tens of thousands of PhDs will have to decide that there is more to a
            career than chasing citations and ill-paid postdoc positions. The
            effort needs true ingenuity across nanofabrication, photonics,
            specialised hardware manufacturing, and hundreds of other foundational
            areas.{' '}
            <strong>
              The new generation must part with the assumption that the imminent
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

          <p className="pull">A Quantum Computer can encode this problem natively.</p>

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
                that this system can be in is, again, 2<sup>100</sup>.{' '}
                <strong>But notice here that it only took 100 qubits</strong>.
              </p>
            </div>
          </aside>

          <p>
            This is the general class of problem for which these machines were
            originally conceived; quantum-mechanical systems whose exact evolution
            requires a classical computer to manipulate an exponentially growing
            wavefunction, but whose relevant properties may be extracted more
            efficiently from a controlled quantum simulation. Of course scientists
            will still have to test the results in the lab, but the direction of
            physical experimentation is made less blind by eliminating bad
            candidates before they are synthesised, using the patterns that
            classical models alone cannot uncover.
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
              Equally important as knowing what a QC does is to know what it does{' '}
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
                  1
                </a>
              </sup>
              , the Google announcement that "quantum computers lend credence to
              the existence of parallel universes"
              <sup className="cite">
                <a href="https://blog.google/technology/research/google-willow-quantum-chip/">
                  2
                </a>
              </sup>
              , and that "As quantum AI technology advances, life expectancy will
              increase faster, eventually reaching a point where we gain a year of
              life expectancy each year."
              <sup className="cite">
                <a href="https://millenniumprize.org/news-articles/news/mtp-forum-speaker-interview-quantum-computing-will-enable-us-to-live-longer-healthier-lives-free-from-the-limitations-humans-have-always-faced/">
                  3
                </a>
              </sup>
            </p>

            <p>
              All this, yet the largest number factored by a quantum computer
              remains 21.
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
            cryogenic. A material that worked at ordinary temperatures and
            pressures would remove one of the main barriers to their widespread
            use.
          </p>

          <p>
            Finding one is partly a many-body electron problem. In cuprates, the
            best-known high-temperature superconductors, the behaviour of each
            electron depends upon that of many others, and the number of
            collective states a classical computer must track grows exponentially
            with the size of the simulation. A quantum computer can encode those
            correlations directly in qubits, offering a possible route to
            understanding why these materials superconduct and how to design
            better ones.
          </p>

          <p>
            Of course, none of this is guaranteed. Classical simulation will
            continue to improve. Useful quantum algorithms will demand machines
            far larger and more reliable than those available today. Quantum
            computers will, in all likelihood, be useless for almost everything we
            currently use computers for. They do not need to replace classical
            computation, any more than aeroplanes needed to replace bicycles: a
            747 is transformative for getting across an ocean and useless for a
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

      <article className="prose prose-layout-start">
        <div className="prose-inner">
          <h2 className="prose-display">
            3. How Did We Get Here?
          </h2>

          <p className="pull pull-xl">
            Quantum Computing inherited an institutional model designed to
            produce demonstrations over products.
          </p>

          <p>
            Quantum computing began as a sequence of experiments conducted in
            University physics departments all over the world.
          </p>

          <p>
            Not long after Peter Shor's discovery of his eponymous prime
            factorisation algorithm, researchers at NIST demonstrated the first
            quantum logic gate using a beryllium ion suspended in an electric
            field; in 1998, researchers at Oxford used the nuclear spins of
            molecules [inside an NMR spectrometer] to execute one of the first
            complete quantum algorithms on a two-qubit system.
          </p>

          <p>
            These first computers were not products in the way one may think of
            an iPhone or a Tesla - that is, mass-produced factory-line items -
            rather they were one-off experimental setups assembled by hand. Many
            of these experiments were built as PhD projects and postdoctoral
            research, and with that comes the incentive structures, timelines,
            and hardware supplier choices of the academic system.
          </p>

          <p>
            Take the NIST experiment described above. The first quantum logic
            gate was reported in a four-page paper containing the atomic states
            used, the laser-pulse sequence, the measured result and the sources
            of error. It contained no bill of materials, assembly time, supplier
            list, maintenance procedure or account of the earlier versions which
            failed. None of this was required to substantiate the scientific
            claim. (1)
          </p>

          <p>
            This distinction is written into the way academic research is
            assessed. In 2023, a House of Commons inquiry found that publication
            in a journal was the expected outcome of almost all academic research
            in Britain. The standard academic CV, the committee was told,
            consisted principally of publications, grants and invitations to
            speak, while the Research Excellence Framework assessed published
            work according to its “originality, significance and rigour.”
            Assembly time, fabrication yield, supplier qualification, maintenance
            hours and unit cost appear nowhere in the scorecard. A physicist may
            halve any of them without having produced an original scientific
            result, even though they determine whether the apparatus can be built
            once or a thousand times. (2)
          </p>

          <p>
            And in all fairness, it is hard to imagine this having come about any
            other way. Before the question of mass-manufacturing a quantum
            computer made any sense to ask, Wolfgang Paul first had to discover
            that oscillating electric fields could confine ions in free space.
            David Wineland’s 1978 group in Colorado had to prove that trapped ions
            could be cooled using laser light. Only after another seventeen years
            of work did the first quantum logic gate follow. (Wolfgang Paul, NIST
            history)
          </p>

          <p>
            Without the work done by these pioneers, the industry would never
            have gotten started. The early emphasis on proving isolated pieces of
            the machine was entirely appropriate, because nobody yet knew whether
            those pieces could be made to work at all.
          </p>

          <p>
            The doubts surrounding them were considerable. In 1995, the IBM
            physicist Rolf Landauer argued that imperfect machinery and
            environmental noise would cause the probability of a reliable result
            to fall exponentially as a computation became longer. He was
            particularly sceptical that error correction would help, since the
            machinery performing the correction would itself contain errors.
            (Wired, 1995)
          </p>

          <p>
            Thirty years of experiments have answered at least part of this
            objection. Quantum logic gates are now routine; processors containing
            more than a thousand physical qubits have been constructed; and in
            2024 Google demonstrated a logical quantum memory whose error rate
            fell as more physical qubits were added. (IBM Condor, Google’s
            error-correction result)
          </p>

          <p>
            The criticism has consequently changed in emphasis. When Jensen Huang
            was asked in 2025 when “very useful quantum computers” might arrive,
            he placed the likely date somewhere between fifteen and thirty years
            away. The machine was no longer dismissed as physically impossible; it
            was merely assigned to the indefinite technological future. (Huang’s
            remarks)
          </p>

          <p>
            There is, however, another remark from Landauer’s 1995 interview
            which has aged rather better. “When you try to take something out of
            a laboratory and into mass production, the vast majority of
            prototechnologies turn out not to work.”
          </p>

          <p>
            This transition has appeared throughout industrial history. In 1909,
            Fritz Haber demonstrated a laboratory apparatus which produced around
            100 cubic centimetres of ammonia. Carl Bosch was then assigned the
            considerably larger task of turning it into an industrial process.
            Doing so required new catalysts, new methods of producing pure gases
            and high-pressure reactors made from steels which would not split
            apart after hydrogen penetrated them. The first plant opened four
            years later with an annual capacity of 8,700 tonnes. Haber had
            established the chemistry; Bosch and his team had to invent much of
            the industrial machinery surrounding it. (American Chemical Society,
            BASF history)
          </p>

          <p>
            Penicillin followed much the same pattern. Fleming discovered it in
            1928, and the Oxford team established its therapeutic value in 1941,
            but the drug was still being produced in one-litre flasks at yields
            below one per cent. American chemists and engineers developed better
            mould strains, culture media, purification methods and submerged
            fermentation tanks. Between 1943 and 1945, American production rose
            from 21 billion units to more than 6.8 trillion, while yields
            increased to between 80 and 90 per cent. The scientific discovery had
            existed for more than a decade; the production process made it
            medicine. (American Chemical Society)
          </p>

          <p>
            The same distinction appears in computing itself. The transistor was
            demonstrated at Bell Labs in 1947, but early devices remained
            difficult to manufacture reliably. The planar process, developed at
            Fairchild twelve years later, protected the transistor junction
            beneath silicon dioxide and allowed components to be fabricated
            photographically from one side of a wafer. Fairchild commercialised
            the first planar transistor in 1960, and the process became the
            manufacturing basis of what we now know as the microchip. (Computer
            History Museum)
          </p>

          <p className="pull">
            The pattern is the same in all cases; scientific innovation [lays the
            groundwork] and mass manufacture brings it to market.
          </p>

          <p>
            Quantum computing is now entering its version of this transition. The
            National Academies described the field’s greatest challenge in 2019
            as moving “from an understanding of the basic science to the creation
            of useful devices.” At this stage, industrialisation begins with the
            experimental process itself: reducing the cost and time required to
            build each generation, documenting what was previously tacit,
            increasing component yield, removing hand-alignment steps and
            developing equipment which allows designs to be tested repeatedly
            rather than reconstructed from scratch. (National Academies)
          </p>

          <p className="note">
            [We do not yet know which quantum architecture will ultimately be
            manufactured in volume. The rate at which competing architectures can
            be built, tested and improved will help determine the answer.]
          </p>
        </div>
      </article>

      <section className="chapter black" id="pt-04" data-chapter-index="3">
        <div className="chapter-copy">
          <p className="meta">PT—04/ 07</p>
          <p className="chapter-kicker">
            High unit cost and long lead times are the predictable result of
            producing highly specialised equipment in small volumes.
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
            quantities of money. In 2025 alone, companies across quantum
            computing, sensing and communications raised $4.9 billion in venture
            capital, while governments announced another $12.7 billion in funding
            commitments. The Quantum Economic Development Consortium counted 556
            specialist companies operating worldwide. (QED-C)
          </p>

          <p>
            Despite this, The MIT Quantum Index identified that the number of
            companies developing an announced, prototype or commercial quantum
            processor in 2025 was fewer than eighty. Only around two dozen offered
            one commercially. Hundreds of companies, billions of dollars and
            several national programmes therefore depend upon fewer than one
            hundred organisations attempting to build the central machine. (MIT
            Quantum Index)
          </p>

          <p>
            Those manufacturers, in turn, depend upon a supply chain still
            organised around individual scientific experiments.
          </p>

          <div className="figure-pair">
            <figure className="figure">
              <MissionImage
                {...IMAGE.uva01}
                alt="Trapped-ion laboratory rack, cables and oscilloscope — University of Amsterdam"
              />
              <figcaption>
                <strong>[FIG. UVA—1]</strong>
                <span>University of Amsterdam</span>
                <span>Atomic physics experiment</span>
              </figcaption>
            </figure>
            <figure className="figure">
              <MissionImage
                {...IMAGE.uva02}
                alt="Optical table with Nexus modules and laser optics — University of Amsterdam"
              />
              <figcaption>
                <strong>[FIG. UVA—2]</strong>
                <span>University of Amsterdam</span>
                <span>Atomic physics experiment</span>
              </figcaption>
            </figure>
          </div>

          <p>
            In 2023, the National Quantum Computing Centre bought two
            strontium-ion laser suites from Toptica for £640,810. Each contained
            eight lasers, together with the control electronics, frequency-locking
            equipment, optical fibres, software and rack required to operate them.
            The contract allowed nine months between order and delivery. A
            trapped-ion programme could therefore spend more than half a million
            pounds and most of a year obtaining one optical subsystem before a
            single ion had been trapped. (contract value, UKRI specification)
          </p>

          <p>Why so much? Why so slow? [Let's not be too quick to judge].</p>

          <p>
            A manufacturer serving several dozen laboratories cannot amortise an
            automated production line across millions of units, while a quantum
            company working against the available catalogue gives the supplier
            little reason to redesign it. Long lead times, high prices and by-hand
            integration then appear to be intrinsic properties of the technology
            rather than consequences of the volumes and production methods being
            used.
          </p>

          <p>
            More money thrown around in grants and undifferentiated companies is
            unlikely to solve the problem; the problem is not that we are
            insufficiently smart to use the toolkit we have, the problem is that
            the toolkit itself is not up to the task.
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

          <p>Is there any historical precedent for having solved these problems?</p>

          <p>
            As it turns out there is. SpaceX is the most relevant example, despite
            aerospace engineering and quantum hardware not having much in common
            at first glance.
          </p>

          <p>
            What is a rocket made of? Aerospace-grade aluminum alloys, plus some
            titanium, copper, and carbon fiber. And then I asked, what is the
            value of those materials on the commodity market? It turned out that
            the materials cost of a rocket was around 2 percent of the typical
            price—which is a crazy ratio for a large mechanical product.
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
          </p>

          <p>
            The similarities are striking - the parts themselves may be different
            but the negative feedback loop of few launches -&gt; bespoke components
            -&gt; no profit incentive for production overhaul -&gt; high prices and long
            lead times -&gt; few launches is the same in both cases. Replace
            'launches' with 'computers' and the line still holds.
          </p>

          <p className="pull pull-xl">
            It's the same problem, and it has been solved before.
          </p>

          <p>But how?</p>

          <figure className="figure">
            <MissionImage
              {...IMAGE.fig002}
              alt="Engineers examining hardware wreckage"
            />
            <figcaption>
              <strong>[FIG.6]</strong>
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
            Consider the Falcon 1 actuator. A vendor quoted $120,000 and eighteen
            months of development. SpaceX’s engineers built it for $3,900 by
            summer. [Source Needed]
          </blockquote>

          <p>
            Each of these component parts can be assigned it's own idiot index; a
            high value is a flashing light pointing to a poorly optimised
            manufacturing process. Values for nanofabricated parts will be
            necessarily be higher than those for macro-level parts, but defaulting
            to the assumption that there are no 10x, 100x cost reductions possible
            only guarantees that none will be found.
          </p>

          <blockquote>
            The avionics example is instructive. Rather than buy
            radiation-hardened processors at $200,000 each, SpaceX used
            triple-redundant commercial processors totalling $2,000.
          </blockquote>

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
            Falcon 9’s grid fins were originally designed to fold, like
            traditional aerospace grid fins. The folding mechanism reduced drag
            during ascent, which seemed obviously necessary. SpaceX questioned
            whether it was worth the mass and complexity. Simulations showed fixed
            fins were acceptable, so they deleted the mechanism entirely. Delete,
            delete, delete... the best part is no part.
          </blockquote>

          <p className="note">
            [Something here about MOCVD Epitaxy, its my understanding that the
            machines that fabricate III-V semiconductors are designed to
            accommodate orders for many different kinds of III-V materials. How
            many additional component parts are required to accommodate the
            additional materials? How much system complexity does this add? How
            much would it cost to build a single-material reactor MOCVD reactor
            in-house?]
          </p>

          <h3>3. Standardisation of Components</h3>

          <blockquote>The only way to get volume is to standardise.</blockquote>

          <p>
            Go to any quantum hardware supplier right now, be it lasers, vacuum
            chambers or semiconductor fabs, and you will inevitably see the words
            'request a quotation' in place of a price tag. Why is this? Are
            suppliers being secretive, or do they genuinely not know?
          </p>

          <blockquote>
            The existing approach was bespoke vehicles per mission. Custom
            adapters, mission-specific modifications, multiple vehicle families.
            This optimises each mission at the expense of manufacturing scale.
            SpaceX bet the opposite: that cost savings from standardisation would
            exceed the value of customisation. Yes, customers wanted custom
            solutions. But they wanted low prices even more. Force them to choose,
            and they’d adapt.
          </blockquote>

          <p>
            It's the latter, of course, but let's not be too hasty in [explanation
            of how the current model is 'let the customer tell us what they want
            and itll be different each time'. Maybe one start up wants to use
            Barium for their ion species. Another wants to use Calcium. Maybe one
            more wants to use different energy levels within Barium. All of these
            require different laser frequencies, linewidths, and powers. It's like
            the aerospace industry was before, "tell us what you want and we'll
            make it".]
          </p>

          <p className="note">
            [In any manufacturing process there are economies of scale that are
            only unlocked at production levels of 1000s of units.]
          </p>

          <h3>4. Vertical Integration</h3>

          <blockquote>
            If materials are cheap and the tax is all process and overhead, you
            need to control the process to capture the savings. You can’t
            negotiate your way to 10x cost reduction with suppliers who have
            profits baked in at every tier. So SpaceX became its own supplier. By
            building 80% of its hardware internally - engines, structures,
            avionics, software, and key ground systems - SpaceX collapsed the
            traditional aerospace stack. They outsource raw materials and
            commodity parts, and make everything else themselves.
          </blockquote>

          <p className="note">
            [Why is vertical integration important here? Reduction of margin,
            reduction of lead times. Vertical integration provides the control to
            eliminate the waste that the first-principles analysis uncovers. I see
            the idea in my head, current machines are dependent on stringing many
            small parts of other businesses together. Vertical integration here is
            taking all of those small parts together and moving them into a single
            process. Let's make the examples concrete though, which specific parts
            are dependent upon external manufacturing? PIC, for sure. Semiconductor
            fab. The lasers themselves, too. These are the ones I have a handle
            on, so we can start there. How do I link it up? The ]
          </p>

          <p>
            Today, the industry leans heavily towards horizontal integration for
            manufacturing. [Insert some statistics to back this up.] Recent
            efforts towards putting quantum computation on-chip [source] has
            helped eliminate [some specific bad thing about the old integration
            process], but has introduced a whole new set of dependencies [I'm on
            about semiconductor manufacturing here].
          </p>

          <p>
            The manufacturing processes and supply chain used to build today's
            QPUs were designed in a different century, by engineers who had
            likely never heard of quantum computing.
          </p>

          <p className="pull">
            Vertical integration gives manufacturers the freedom to cut everything
            that is not absolutely critical to building better computers.
          </p>

          <p>
            But it comes with a cost. Fixed costs, specifically. Bringing the
            machines in-house isn't cheap, and incurs a lot of complexity in the
            short term. In fact, if the goal is to build a single computer, it
            doesn't make much sense to bring the manufacturing in-house at all.
          </p>

          <h3>5. Increase Iteration Speed</h3>

          <p className="note">[Anddddd what the fuck for this, then.]</p>

          <blockquote>
            Traditional aerospace builds few prototypes, each one expensive and
            near-flight-ready. SpaceX builds many cheaper prototypes:
            hardware-rich fleets of test articles. They’d rather have ten rough
            versions to blow up than one polished version they’re afraid to break.
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
              <strong>[FIG.7]</strong>
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
            [I think I have a real advantage here, because anyone who's been
            through the academic wringer will have had more than their fair share
            of DEI meetings and wokeness thrust upon them. The largest failing of
            the woke ideology is that it suppresses the rough-around-the-edges
            hero type. It doesn't do well with breaking rules. Obviously I can't
            say any of this directly, so this is gonna take some manoeuvring.]
          </p>

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
