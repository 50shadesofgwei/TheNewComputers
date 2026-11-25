# Out of the Lab and Into the Factory

PT—00/ 05

# Out of the Lab and Into the Factory

The New Computers, and the Mission for Quantum Hardware

![Fifth Solvay Conference on Physics, 1927](https://www.thenewcomputers.com/images/fig-000.jpg)

 PT—1

**[FIG.1]** Solvay Conference — 1927 The founders of quantum theory

PT—01/ 05

## Introduction

Special thanks to [John Martinis](https://www.nobelprize.org/prizes/physics/2025/martinis/facts/), [Florian Schreck](https://www.strontiumbec.com/), and [Dylan Sabulsky](https://scholar.google.co.uk/citations?user=5faRM7kAAAAJ&hl=en&oi=ao), out of whose detailed correspondence has this vision been formed.

## 1. Introduction

Quantum computing is at risk of becoming an embarrassing footnote in the history of technology.

If you've spent time around the field, you know the elephant in the room; on the one hand, futuristic looking computers the size of entire rooms, and on the other, fuzzy and opaque explanations of their supposed practical utility. Shor's algorithm

![Peter Shor at the Dirac Medal Award Ceremony, 2017](https://www.thenewcomputers.com/images/fig-peter-shor.jpg)

 **Shor's algorithm, 1994** An algorithm native to quantum computers that finds the largest prime factors of a given number exponentially faster than classical computers. Discovered and proposed by American mathematician Peter Shor. (famous for the threat it poses to modern day encryption systems) has been known since 1994, yet over 3 decades later the largest number it has ever factored is 35. And that was 7 years ago^[1](https://juser.fz-juelich.de/record/1042431/files/NIC_2025_Willsch.pdf).

In that same timeframe, the world was introduced to reusable rockets, self-driving cars, mass-market artificial intelligence and implantable brain–computer interfaces. It is by no means obvious that these fields are any less technically demanding than quantum computing.

Progress in other fields has been exponential, while quantum processing power has barely changed. Why?

The lack of external accountability made the industry complacent.

To say that quantum computing has made *no* progress would be too harsh; some of the world's most gifted scientists have produced extraordinary results controlling individual atoms, photons, electrons and superconducting circuits. But the field is so specialised, and knowledge so hopelessly siloed between sub-fields, that almost nobody can practically judge the aggregate progress.

Those allocating capital are left with no choice but to let companies mark their own homework.

![Theodore Maiman with the first working laser](https://www.thenewcomputers.com/images/fig-laser.jpg)

**[FIG.2]** Theodore Maiman First working laser — 1960

There is a better way.

Lasers moved from an unproven proposal to product in 4 years^[2](https://www.photonics.com/LinearChart.aspx?ChartID=2).
The SR-71 Blackbird went from idea to test flight in a similar time frame^[3](https://www.lockheedmartin.com/en-us/news/features/history/blackbird.html).
Why can’t incumbent computer manufacturers simply do the same?

Leading quantum companies are home to some of the world’s most brilliant scientists and engineers, but their industrial infrastructure and manufacturing supply chains were conceived of and constructed in a different century.

Physically speaking, the supply chain that a quantum computer depends upon consists of semiconductor fabs, lasers, chemical epitaxy, packaging, control electronics and either cryogenics or ultra-high vacuum systems.

Someone has to be responsible for physically making these components, and the capability to do so is scattered across a small number of specialist suppliers and often between jurisdictions. Even the largest companies control only a small part of this chain, and any new part or process incurs lead times measured in months or even years.

This traps companies in a simple loop:

> Long lead times mean few builds, having few builds forces years' worth of upgrades into each machine, more improvements per build demands yet more planning and de-risking, and the next build takes even longer.

We at Pathfinder are developing quantum computers in a new way, but we are only one company. If quantum computing is ever to be more than a mere embarrassing technological footnote, the entire industry must escape from academia’s bureaucratic overhang, slash development costs and lead times, and start building complete systems instead of ever-narrower pieces of them.

PT—02/ 05

Quantum Computing inherited an institutional model designed to produce demonstrations over products.

## How Did We Get Here?

![Atomic physics experiment — University of Amsterdam](https://www.thenewcomputers.com/images/uva-atomic-01.jpg)

 PT—2

## 2. How Did We Get Here?

Quantum Computing inherited an institutional model designed to produce demonstrations over products.

![Crowded optical bench with lasers, mirrors, and cabling](https://www.thenewcomputers.com/images/fig-optical-bench.jpg)

**[FIG.3]** Ultracold-atom optical table — UQUAM / MPQ © Immanuel Bloch — European Commission

The journey began as a sequence of experiments conducted in University physics departments all over the world.

Not long after Peter Shor’s discovery of his eponymous prime factorisation algorithm, researchers at NIST demonstrated the world’s first quantum logic operation. In 1998, a team from Oxford ran one of the first complete quantum algorithms on a two-qubit machine.

These first computers were not products in the way one may think of an iPhone or a Tesla - that is, mass-produced factory-line items - rather they were one-off experimental setups assembled by hand. Many of these experiments were built as PhD projects and postdoctoral research, and with that came academic incentive structures, timelines, and purchasing habits.

Take the NIST experiment described above. The first quantum logic gate was reported in a four-page paper

![First page of Monroe et al., Demonstration of a Fundamental Quantum Logic Gate, Physical Review Letters, 1995](https://www.thenewcomputers.com/images/fig-nist-paper.jpg)

 **Monroe et al., 1995** Phys. Rev. Lett. 75, 4714 — the NIST demonstration of a controlled-NOT gate on a single trapped beryllium ion. Four pages of states, pulses, results and error sources. containing the atomic states used, the laser-pulse sequence, the measured result and the sources of error.

Notice, however, what was left out.

- Bill of materials — not included

- Assembly time — not included

- Supplier list — not included

- Maintenance procedure — not included

- Account of the earlier versions which failed — not included

**None of this was required to substantiate the scientific claim.**

This distinction is written into the way academic research is assessed. In 2023, a House of Commons inquiry found that publication in a journal was the expected outcome of almost all academic research in Britain^[13](https://publications.parliament.uk/pa/cm5803/cmselect/cmsctech/101/report.html). The standard academic CV, the committee was told, consisted principally of publications, grants and invitations to speak, while the Research Excellence Framework assessed published work according to its “originality, significance and rigour.”

Assembly time and fabrication yield appear nowhere in the scorecard.

**...But it couldn’t have happened any other way.**

Before the question of mass-manufacturing a quantum computer made any sense to ask, Wolfgang Paul

![Portrait of Wolfgang Paul](https://www.thenewcomputers.com/images/fig-wolfgang-paul.jpg)

 **Wolfgang Paul, 1913–1993** German physicist who invented the Paul trap — using oscillating electric fields to confine charged particles in free space. Shared the 1989 Nobel Prize in Physics for this work, which became the foundation of trapped-ion quantum computing. first had to discover that oscillating electric fields could confine ions in free space. David Wineland

![Portrait of David Wineland](https://www.thenewcomputers.com/images/fig-david-wineland.jpg)

 **David Wineland, b. 1944** American physicist at NIST whose group showed that trapped ions could be laser-cooled nearly to rest. Shared the 2012 Nobel Prize in Physics; his laboratory later demonstrated the first quantum logic gate on a single ion. ’s 1978 group in Colorado had to prove that trapped ions could be cooled using laser light. Only after another seventeen years of work did the first quantum logic gate follow.

Without the work done by these pioneers, the industry would never have gotten started. The early emphasis on proving isolated pieces of the machine was entirely appropriate, because nobody yet knew whether those pieces could be made to work at all.

Thirty years of experiments later and many of these early doubts have been allayed: quantum logic gates are now routine, processors with more than a thousand physical qubits have been built, and error-corrected logical qubits have begun to improve as more physical qubits are added.

...But what makes a good prototype isn't always what makes a good product.

Innovation is followed by manufacture, and quantum computing is now beginning this transition for itself. The National Academies described the field’s greatest challenge in 2019 as moving “from an understanding of the basic science to the creation of useful devices.”

Unluckily for the budding researcher, this is a significantly less glamorous process than finding the one great scientific breakthrough. Luckily, however, we already have a role model whom we can follow: every other technological industry in existence.

Innovation is followed by manufacture.

PT—03/ 05

 High unit cost and long lead times are the predictable result of producing highly specialised equipment in small volumes.

## The Industry Today

![Optical table atomic physics experiment — University of Amsterdam](https://www.thenewcomputers.com/images/uva-atomic-02.jpg)

 PT—3

## 3. The Industry Today

Now, more than 30 years later, the technology attracts industrial quantities of capital. In 2025 alone, companies across quantum computing, sensing and communications raised $4.9 billion^[5](https://quantumconsortium.org/publication/2026-state-of-the-global-quantum-industry-report/) in venture capital, while governments announced another $12.7 billion^[5](https://quantumconsortium.org/publication/2026-state-of-the-global-quantum-industry-report/) in funding commitments. The Quantum Economic Development Consortium counted 556^[5](https://quantumconsortium.org/publication/2026-state-of-the-global-quantum-industry-report/) specialist companies operating worldwide.

Despite this, The MIT Quantum Index identified that the number of companies developing an announced, prototype or commercial quantum processor in 2025 was fewer than eighty^[6](https://qir.mit.edu/wp-content/uploads/2025/06/MIT-QIR-2025.pdf). Only around two dozen^[6](https://qir.mit.edu/wp-content/uploads/2025/06/MIT-QIR-2025.pdf) offered one commercially. Hundreds of companies, billions of dollars and several national programmes therefore depend upon **fewer than one hundred organisations attempting to build the central machine^[6](https://qir.mit.edu/wp-content/uploads/2025/06/MIT-QIR-2025.pdf).**

Those manufacturers, in turn, depend upon a supply chain still organised around individual scientific experiments.

In 2023 the National Quantum Computing Centre bought two strontium-ion laser suites from TOPTICA for £640,810^[7](https://www.sell2wales.gov.wales/search/show/search_view.aspx?ID=NOV457942). Each contained eight lasers, together with the control electronics, frequency-locking equipment, optical fibres, software and rack required to operate them. The contract allowed nine months between order and delivery.

Why so much? Why so slow?

Laser companies are stuck between a rock and a hard place. All orders are bespoke; the laser system for a Strontium-based quantum computer might have little in common with the laser system for a Calcium-based atom physics experiment, and who’s to say what the next order will be?

High unit cost and long lead times are the predictable result of producing highly specialised equipment in small volumes.

Fragment the demand that way and economies of scale never appear. A manufacturer serving several dozen laboratories, all of whom have different requirements, cannot amortise an automated production line, while a quantum company working against the available catalogue gives the supplier little reason to redesign it. Long lead times, high prices and by-hand integration then appear to be intrinsic properties of the technology rather than consequences of the production methods being used.

More money thrown around in grants is unlikely to solve the problem. It would be foolish to assume that the difficulty is one of being insufficiently clever to use the toolkit we have; the sharper question is whether the toolkit itself is up to the task.

![Drone photo of Intel Fab 9 under construction in Rio Rancho, New Mexico, January 2024](https://www.thenewcomputers.com/images/fig-gordian-v2.jpg)

 PT—4

**[FIG.5]** Intel Fab 9 — Rio Rancho, New Mexico Advanced packaging facility, January 2024

PT—04/ 05

1. The Idiot Index
2. Question Every Requirement
3. Standardised Components
4. Vertical Integration
5. Increase Iteration Speed

## Cutting the Gordian Knot

## 4. Cutting the Gordian Knot

 1. The Idiot Index 2. Question Every Requirement 3. Standardised Components 4. Vertical Integration 5. Increase Iteration Speed

Junior engineers are explicitly told that requirements from "smart people" are the most dangerous, because nobody thinks to question them.

Is there any historical precedent for having solved these problems?

As it turns out there is. SpaceX is the most relevant example, despite aerospace engineering and quantum hardware not having much in common at first glance.

> What is a rocket made of? Aerospace-grade aluminum alloys, plus some titanium, copper, and carbon fiber. And then I asked, what is the value of those materials on the commodity market? It turned out that the materials cost of a rocket was around 2 percent of the typical price—which is a crazy ratio for a large mechanical product. 8 Two percent . Your car’s raw materials are maybe 20-30% of sticker price. Consumer electronics are similar. But rockets? Ninety-eight cents of every dollar was going somewhere other than what it was made of. Where? Three places, it seems. Supplier markups stacking through contract layers, each tier adding 15-30% margin. Custom designs that couldn’t achieve manufacturing scale. Expendable hardware thrown away after every flight. None of these are the laws of physics. Traditional aerospace treated high costs as fixed constraints. But what if you treated them as variables? How do you actually capture that 98%? 9

The negative feedback loop is the same in both cases: low volumes keep components bespoke; bespoke production offers little incentive for production overhaul; prices remain high and lead times long; and low volumes persist. In one case, the scarce unit is a launch. In the other, it is a computer.

It's the same problem, and it has been solved before.

Quantum hardware comes with its own constraints: unsettled architectures, extreme tolerances and components produced in tiny volumes. So is the resemblance merely superficial, or does quantum computing face the same underlying supply-chain problem that SpaceX confronted? If it does, what were the specific practices, manufacturing strategy and organisational principles that allowed SpaceX to break the cycle, and which of them could work here?

![Engineers examining hardware wreckage](https://www.thenewcomputers.com/images/fig-002.jpg)

**[FIG.6]** Early SpaceX Launch site, 2006 Debris of the Falcon 1 launch

### 1. The Idiot Index

Musk eventually named this the “idiot index”: the ratio of the actual cost of a part to the cost of its raw materials. “If the ratio is high,” he says, “you’re an idiot.”

A classical computer is constructed from specific component parts: GPUs, CPUs, cooling systems, et cetera. A quantum computer is much the same; high-precision lasers, vacuum systems, single-photon detectors, and more.

> Consider the Falcon 1 actuator. A vendor quoted $120,000 and eighteen months of development time. SpaceX engineer Steve Davis built it in-house in nine months for $3,900 10 .

Each of these component parts can be assigned it’s own idiot index; a high value is a flashing light pointing to a poorly optimised manufacturing process. Values for ultra-precision components will be higher than those for parts with lower precision requirements, but this only indicates a higher cost floor; it says nothing about how far the current machinery is above it.

![Idiot index estimates for eight quantum computing components: vacuum chamber 25×, dilution fridge 7×, ECDL 30×, optical mount 50×, SPAD module 60×, acousto-optic modulator 45×, RF control system 50×, MOCVD reactor 20×](https://www.thenewcomputers.com/images/fig-idiot-index.jpg)

### 2. Question Every Requirement

Junior engineers are explicitly told that requirements from “smart people” are the most dangerous, because nobody thinks to question them.

A high idiot index identifies an expensive component; the knee-jerk response is ask how the component can be manufactured more cheaply, but **the more astute question is to ask whether it needs to exist at all**. Get rid of the part entirely, and the idiot index falls to 0.

> Delete, delete, delete... the best part is no part - the best process is no process.

The same exercise can be carried into the quantum supply chain. Commercial MOCVD reactors

![Commercial MOCVD reactor used for epitaxial semiconductor growth](https://www.thenewcomputers.com/images/fig-mocvd.jpg)

 **MOCVD Reactor** Metal-organic chemical vapour deposition — a machine that grows thin semiconductor layers by flowing precursor gases over a heated wafer. are designed to grow semiconductor layers of all different chemical makeups and sizes, all with fully automated handling.

How much of the cost and complexity of the machine could be reduced if the requirement to fit multiple designs was removed? A refurbished second-hand reactor cost Glasgow University £165,000 in 2017^[11](https://www.publiccontractsscotland.gov.uk/search/show/search_view.aspx?ID=JUL290649), while high-capacity commercial systems have historically cost millions^[12](https://www.digitimes.com/news/a20130416PD214.html).

### 3. Standardised Components

The existing approach was bespoke vehicles per mission. **SpaceX bet the opposite: that cost savings from standardisation would exceed the value of customisation.** Yes, customers wanted custom solutions. But they wanted low prices even more. Force them to choose, and they’d adapt.

Go to any quantum hardware supplier right now, be it lasers, vacuum chambers or semiconductor fabs, and you will inevitably see the words ‘request a quotation’ in place of a price tag. Why is this? Are suppliers being secretive, or do they genuinely not know?

![Two ways to buy the same laser: a long request-a-quotation specification form, or a listed price with a five-day delivery and a buy button](https://www.thenewcomputers.com/images/fig-laser-quote.jpg)

It’s the latter, of course: it’s the same low-volume-differing-requirements problem again. **Economies of scale only emerge from making the same design in bulk; fragmented demand denies suppliers the opportunity to do so.**

### 4. Vertical Integration

Vertical integration gives manufacturers the freedom to cut everything that is not absolutely critical to building better computers.

This means avoiding the time cost and incurred margins of outsourcing components, but it comes with costs of its own. Fixed costs, specifically. Bringing the machines in-house isn’t cheap, and incurs a lot of complexity in the short term. In fact, if the goal is to build a single computer, it doesn’t make much sense to bring the manufacturing in-house at all.

> If materials are cheap and the tax is all process and overhead, you need to control the process to capture the savings. You can’t negotiate your way to a 10x cost reduction with suppliers who have profits baked in at every tier. By building 80% of its hardware internally, SpaceX collapsed the traditional aerospace stack.

### 5. Increase Iteration Speed

Traditional aerospace builds few prototypes, each one expensive and near-flight-ready. SpaceX builds many cheaper prototypes. **They’d rather have ten rough versions to blow up than one polished version they’re afraid to break.**

The idiot index identifies where manufacturing optimisations can be made, vertical integration gives the control needed to implement them, and standardising the components unlocks the economies of scale needed to make them cheap.

But internalising all these manufacturing processes internalises the maintenance costs, not to mention the price of the machines themselves. The factory loses money every second that these machines aren’t producing something valuable. Iteration speed is what makes the whole process profitable - new ideas can be tested cheaply, quickly, and the manufacturers needn’t be precious about whether an idea is likely to work or not. The whole design process gets flipped on its head; instead of having to meticulously plan out what ideas get to go in the new design before starting manufacture, ideas can be tested cheaply and quickly. If they don’t work, the time and financial loss is minimal.

![Evolution of the Raptor engine from version 1 to 3](https://www.thenewcomputers.com/images/fig-003.jpg)

**[FIG.7]** Evolution of the Raptor engine, from version 1 to 3 Simplify, simplify, simplify!

All these parts came together in a way that was mutually reinforcing; first-principles engineering identified manufacturing optimisations, vertical integration let those optimisations happen, standardisation facilitated the high production rate that led to so many test flights.

 1. The Idiot Index 2. Question Every Requirement 3. Standardised Components 4. Vertical Integration 5. Increase Iteration Speed

![The Traitorous Eight at Fairchild Semiconductor, 1960](https://www.thenewcomputers.com/images/fig-noyce.jpg)

**[FIG.8]** The Traitorous Eight Fairchild Semiconductor, 1960

PT—05/ 05

## The Window

## 5. The Window

In every new industry, there is a short window where a small handful of people decide the shape of the coming decades.

![Steve Wozniak seated at an Apple II keyboard while Steve Jobs works on an open machine beside him](https://www.thenewcomputers.com/images/fig-jobs-woz.jpg)

**[FIG.9]** Steve Wozniak and Steve Jobs Apple Computer, Cupertino — 1977

At the dawn of every major technology, there was a short window in which the work of a few people decided how the field would take shape for decades to come. Jobs and Wozniak in the seventies, Bezos and Page in the nineties, OpenAI and Anthropic today. Tomorrow, the window for quantum computing will close, but who closes it remains to be seen.

Pathfinder is looking for a technical cofounder. An engineer with the talent and the nerve to hack together quantum computers from scratch.

## Join Us

[Learn more](https://www.thenewcomputers.com/join)
[jonathan@pathfinderquantum.com](mailto:jonathan@pathfinderquantum.com)

- 1. Willsch, D., et al. “The State of Factoring on Quantum Computers.” NIC Symposium 2025. [https://juser.fz-juelich.de/record/1042431/files/NIC_2025_Willsch.pdf](https://juser.fz-juelich.de/record/1042431/files/NIC_2025_Willsch.pdf)

- 2. “History of the Laser.” Photonics.com. [https://www.photonics.com/LinearChart.aspx?ChartID=2](https://www.photonics.com/LinearChart.aspx?ChartID=2)

- 3. “Fastest Plane in History: The Blackbird.” Lockheed Martin. [https://www.lockheedmartin.com/en-us/news/features/history/blackbird.html](https://www.lockheedmartin.com/en-us/news/features/history/blackbird.html)

- 5. “2026 State of the Global Quantum Industry Report.” Quantum Economic Development Consortium. [https://quantumconsortium.org/publication/2026-state-of-the-global-quantum-industry-report/](https://quantumconsortium.org/publication/2026-state-of-the-global-quantum-industry-report/)

- 6. “Quantum Index Report 2025.” MIT Initiative on the Digital Economy. [https://qir.mit.edu/wp-content/uploads/2025/06/MIT-QIR-2025.pdf](https://qir.mit.edu/wp-content/uploads/2025/06/MIT-QIR-2025.pdf)

- 7. National Quantum Computing Centre. TOPTICA strontium-ion laser suites contract notice. Sell2Wales, November 2023. [https://www.sell2wales.gov.wales/search/show/search_view.aspx?ID=NOV457942](https://www.sell2wales.gov.wales/search/show/search_view.aspx?ID=NOV457942)

- 8. “Elon Musk’s Mission to Mars.” Wired, October 2012. [https://www.wired.com/2012/10/ff-elon-musk-qa/](https://www.wired.com/2012/10/ff-elon-musk-qa/)

- 9. “Atoms Are Cheap, Process Is Pricey.” Future Blind. [https://futureblind.com/p/atoms-are-cheap-process-is-pricey](https://futureblind.com/p/atoms-are-cheap-process-is-pricey)

- 10. Vance, A. “How Elon Musk Willed SpaceX into Making the Cheapest Rockets Ever Created.” Vice, 2015. [https://www.vice.com/en/article/how-elon-musk-willed-spacex-into-making-the-cheapest-rockets-ever-created/](https://www.vice.com/en/article/how-elon-musk-willed-spacex-into-making-the-cheapest-rockets-ever-created/)

- 11. University of Glasgow. Refurbished MOCVD reactor contract notice. Public Contracts Scotland, July 2017. [https://www.publiccontractsscotland.gov.uk/search/show/search_view.aspx?ID=JUL290649](https://www.publiccontractsscotland.gov.uk/search/show/search_view.aspx?ID=JUL290649)

- 12. “Aixtron ships MOCVD tool to Russian research institute.” DigiTimes, April 2013. [https://www.digitimes.com/news/a20130416PD214.html](https://www.digitimes.com/news/a20130416PD214.html)

- 13. House of Commons Science and Technology Committee. “Reproducibility and Research Integrity.” 2023. [https://publications.parliament.uk/pa/cm5803/cmselect/cmsctech/101/report.html](https://publications.parliament.uk/pa/cm5803/cmselect/cmsctech/101/report.html)
