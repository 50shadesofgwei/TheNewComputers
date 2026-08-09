import { IMAGE, MissionImage } from '../MissionImage'
import { TermPeek } from '../TermPeek'

/** Standalone draft — formerly mission PT—06. Not mounted in App. */
export function ThePeople() {
  return (
    <>
      <section className="chapter black" id="article-the-people">
        <div className="chapter-copy">
          <p className="meta">PT—06/ 07</p>
          <p className="chapter-kicker">
            The mission attracts missionaries.
          </p>
          <h2 className="chapter-title">The People</h2>
        </div>
        <div className="chapter-media">
          <MissionImage
            {...IMAGE.figPeople}
            alt="Engineers huddled around a mission-control console"
          />
          <span className="part-tag">PT—6</span>
          <p className="chapter-caption chapter-caption-inv">
            <strong>[FIG.9]</strong>
            <span>Mission Control, Houston</span>
            <span>Flight controllers around Glynn Lunney’s console — 1970</span>
          </p>
        </div>
      </section>

      <article className="prose prose-layout-center">
        <div className="prose-inner">
          <h2 className="prose-display">
            6. The People
          </h2>

          <p className="note">Work in progress</p>

          <p>
            Quantum computing is already home to some of the brightest and
            hardest-working individuals in the industry today; about a third of
            roles in the field require a PhD
            <sup className="cite">
              <a href="https://chicagoquantum.org/degreereports">13</a>
            </sup>
            {' '}
            — compared to about 6% of roles in artificial intelligence
            <sup className="cite">
              <a href="https://cset.georgetown.edu/wp-content/uploads/CSET-US-Demand-for-AI-Related-Talent.pdf">
                15
              </a>
            </sup>
            . Clearly then, intelligence and hard work alone are not what separates a successful enterprise from an
            unsuccessful one. So what is?
          </p>

          <p>
            If we assume everyone to be smart and hard-working, and everyone has
            the same 24 hours in a day, what is it exactly that differentiates
            those who go on to revolutionise industries? What precise behaviour
            patterns, what specific cultural values facilitate innovation?
          </p>

          <p>
            And not cultural values in the arid “diversity is our
            greatest strength” sense; but rather who shows up, what is their
            outlook on the world, and what behaviours are they willing to accept from one
            another?
          </p>

          <p>
            Lockheed’s{' '}
            <TermPeek
              term="Skunk Works"
              title="Skunk Works"
              wide
              imageName={IMAGE.figSkunkworks.name}
              imageWidth={IMAGE.figSkunkworks.width}
              imageHeight={IMAGE.figSkunkworks.height}
              imageAlt="Lockheed SR-71 Blackbird in flight over high desert"
            >
              Lockheed Martin’s advanced projects division, founded by Kelly
              Johnson in 1943. Small teams, minimal oversight and fourteen rules
              of its own took the SR-71 Blackbird from idea to rollout in four
              years. Sixty years later, it is still the fastest manned plane
              ever built.
            </TermPeek>{' '}
            designed the U-2 and the SR-71 with a few dozen engineers. Kelly
            Johnson wrote the operating philosophy down as fourteen rules
            <sup className="cite">
              <a href="https://lockheedmartin.com/content/dam/lockheed-martin/aero/photo/skunkworks/kellys-14-rules.pdf">
                16
              </a>
            </sup>
            : small teams, almost no outsiders, authority to test your own
            hardware, pay for performance rather than headcount.
          </p>

          <p>
            Those rules are <em>memes</em> in the original sense: small and sticky units of
            culture that copy themselves from person to person and quietly decide
            how the work gets done.
          </p>

          <p>
            Every organisation runs on memes, whether they're decided
            consciously or otherwise.
          </p>

          <p>These are ours.</p>

          <div className="meme-band">
            <div className="meme-row" aria-label="Our memes">
              <div className="meme-card">
                <div className="meme-card-art" aria-hidden="true" />
                <p className="meme-card-title">Whole-Board Vision</p>
              </div>
              <div className="meme-card">
                <div className="meme-card-art" aria-hidden="true" />
                <p className="meme-card-title">Flash-Mob the Bottleneck</p>
              </div>
              <div className="meme-card">
                <div className="meme-card-art" aria-hidden="true" />
                <p className="meme-card-title">Question Every Requirement</p>
              </div>
              <div className="meme-card">
                <div className="meme-card-art" aria-hidden="true" />
                <p className="meme-card-title">When? Now!</p>
              </div>
              <div className="meme-card">
                <div className="meme-card-art" aria-hidden="true" />
                <p className="meme-card-title">Optimise for Boldness</p>
              </div>
            </div>
          </div>

          <h3>Whole-Board Vision</h3>
          <p className="meme-subhead">
            Delete, delete, delete… The best part is no part.
          </p>

          <figure className="figure figure-xs figure-center">
            <MissionImage
              {...IMAGE.figTeleportation}
              alt="A densely cabled quantum optics teleportation experiment on an optical table"
            />
            <figcaption className="figure-caption-quote">
              <strong>[FIG.10]</strong>
              <span>
                “The cardinal sin of the computing industry is the creation of
                complexity.” — Larry Ellison
                <sup className="cite">
                  <a href="https://www.forbes.com/sites/oracle/2014/10/09/complex-business-challenges-require-simple-tech-solutions/">
                    14
                  </a>
                </sup>
              </span>
            </figcaption>
          </figure>

          <p>
            [They Muddy the Waters, to Make Them Look Deep] Far too much
            complexity theatre, make things easier not harder. Getting stuff done
            has to be more important than looking clever.
          </p>

          <h3>Flash-Mob the Bottleneck</h3>
          <p className="meme-subhead">
            Are we cleaning our room when the exam is tomorrow?
          </p>

          <p>
            A child has an exam tomorrow. He knows he should study, but he
            doesn’t know where to begin; maybe he is missing a textbook, or
            waiting for a friend who said they’d come over to study, or some
            other entirely plausible reason. So instead, he cleans his room; he
            works hard and does a beautiful job. By the end, his shirts are
            neatly ironed, his bed is made, and he feels justifiably proud of
            himself… then he fails the exam.
          </p>

          <p className="quote-italic">
            Always identify and attack the biggest limiter.{' '}
            <strong>Don’t spread effort across secondary problems.</strong>{' '}
            Laser in on the single constraint that, if removed, would unlock
            everything downstream.
            <sup className="cite">
              <a href="https://futureblind.com/p/atoms-are-cheap-process-is-pricey">
                9
              </a>
            </sup>
          </p>

          <p>
            When a NASA manager visited SpaceX, he observed that any time a
            system-level bottleneck was identified, it “looked like a flash
            mob” in the hallway
            <sup className="cite">
              <a href="https://futureblind.com/p/atoms-are-cheap-process-is-pricey">
                9
              </a>
            </sup>
            .{' '}
            <strong>
              System-level bottlenecks are allocated disproportionate resources
              until they are solved.
            </strong>
          </p>

          <h3>Question Every Requirement</h3>
          <p className="meme-subhead">
            Requirements from smart people are the most dangerous, because
            nobody thinks to question them.
          </p>
          <p>
            [Need people who are willing to question experts]
          </p>

          <h3>When? Now!</h3>
          <p className="meme-subhead">Speed Kills</p>

          <h3>Optimise for Boldness</h3>
          <p className="meme-subhead">The Mission Attracts Missionaries</p>
          <p>
            [Ten rough versions you’ll blow up, not one polished version you’re
            afraid to break. Timidity dressed as prudence.]
          </p>
        </div>
      </article>
    </>
  )
}
