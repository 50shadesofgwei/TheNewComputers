import { IMAGE, MissionImage } from '../MissionImage'
import { TermPeek } from '../TermPeek'

/** Standalone draft — formerly mission PT—02. Not mounted in App. */
export function WhatAreQuantumComputersGoodFor() {
  return (
    <>
      <section className="chapter black chapter-pt02" id="article-what-are-quantum-computers-good-for">
        <div className="chapter-copy">
          <p className="meta">PT—02/ 05</p>
          <p className="chapter-kicker">
            A quantum algorithm had, out of the blue, solved what was previously
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
            The classical world was shown to contain patterns only visible
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
            simulations very effectively using approximation algorithms;{' '}
            <TermPeek
              term="Walter Kohn"
              title="Walter Kohn"
              imageName={IMAGE.figWalterKohn.name}
              imageWidth={IMAGE.figWalterKohn.width}
              imageHeight={IMAGE.figWalterKohn.height}
              imageAlt="Walter Kohn at the Lindau Nobel Laureate Meeting, 2012"
            >
              Austrian-American theoretical physicist (1923–2016). Shared the 1998
              Nobel Prize in Chemistry for developing density-functional theory,
              which made accurate electronic-structure calculations practical for
              many materials.
            </TermPeek>{' '}
            was awarded half of the 1998 Nobel Prize in Chemistry for such
            work. But in complex materials, so called "strongly correlated"
            systems where many electrons all become entangled, these
            approximations begin to fail.
          </p>

          <p>So what's the difference?</p>

          <p>
            Strongly correlated materials resist the usual classical
            approximations because their unusual properties arise from the same
            complex interactions that the classical approximations ignore.
          </p>

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
              calling this out.
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

            <p>
              So what might they <em>actually</em> be good for?
            </p>
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
            the strongest research magnets on earth; newer high-temperature
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
            structure.
          </p>

          <p>
            The prize, then, is not to replace all silicon computers, nor is it to
            'access parallel universes'... whatever that means. As the first man to
            discover fire, the first man in space and the first man to split the
            atom all knew, the ultimate prize is to understand and control matter
            itself.
          </p>
        </div>
      </article>
    </>
  )
}
