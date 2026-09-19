import { useEffect } from 'react'
import Lenis from 'lenis'
import './App.css'
import './Spec.css'

export default function DiamondQpu() {
  useEffect(() => {
    document.title = 'Diamond QPU — Cheap Quantum Computers'
  }, [])

  useEffect(() => {
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

  return (
    <div className="mission spec-page">
      <header className="topbar meta">
        <a href="/blueprints">Blueprints</a>
        <a href="/">The New Computers</a>
      </header>

      <aside className="chapter-rail meta" aria-hidden="true">
        Diamond QPU — v2.1
      </aside>

      <section className="hero">
        <p className="hero-part">
          v2.1 ·
          <span> ODMR</span>
        </p>
        <div className="hero-main">
          <h1>Diamond QPU</h1>
          <div className="hero-lede">
            <p>
              Optically detected magnetic resonance. A complete, small-scale
              quantum computer built on an NV-centre electron and nearby nuclear
              qubits in diamond.
            </p>
          </div>
        </div>
        <a className="scroll-cue" href="#spec-body" aria-label="Scroll down" />
      </section>

      <article className="prose prose-layout-start spec" id="spec-body">
        <div className="prose-inner">
          <p>
            Designed as a compact tabletop system for a conventional lab without
            extensive infrastructure.{' '}
            <strong>
              Our chief objective is to manufacture a complete quantum computer
              as quickly and cost-effectively as possible.
            </strong>
          </p>

      <section>
        <h2>System architecture</h2>
        <p>
          Qubits are housed in a 4x4x0.5&nbsp;mm diamond plate, with an NV depth
          ~100 nanometers. Pauli X, Y, Z and entangling gates are driven by
          microwave and RF pulses applied to the various spins.
        </p>
      </section>

      <section>
        <h2>1. Diamond register</h2>
        <p>
          The register is housed in a 4 x 4 x 0.5&nbsp;mm synthetic diamond
          plate, sourced from Diatope in Germany. Target NV depth is
          approximately 100&nbsp;nm below the diamond surface.
        </p>
        <p>
          A ⟨111⟩ crystal orientation is preferred because it simplifies the
          optical geometry for an appropriately oriented NV, but it is not a
          hard requirement if it materially increases cost or manufacturing
          difficulty.
        </p>
        <p>
          The desired register contains a nitrogen vacancy surrounded by eight
          sufficiently strongly coupled <sup>13</sup>C nuclear spins.
        </p>
        <p>
          Increasing <sup>13</sup>C abundance increases the probability of
          obtaining a useful nuclear register, while also increasing the
          surrounding spin bath (reducing electron-spin coherence time). The
          final isotopic composition will be selected from experimental data
          rather than assumed in advance.
        </p>
      </section>

      <section>
        <h2>2. NV creation and characterisation</h2>
        <p>
          The diamond is implanted with <sup>14</sup>N and annealed by Diatope,
          who also handle characterisation.
        </p>
        <p>The diamond is then characterized to identify an NV with:</p>
        <p>
          <strong>Stable fluorescence:</strong> the NV must remain predominantly
          in the NV<sup>−</sup> charge state and produce a repeatable
          fluorescence count rate under repeated 532&nbsp;nm excitation, without
          significant blinking or charge-state switching. The acceptance
          threshold will be set from measured photon-count statistics during
          characterization.
        </p>
        <p>
          <strong>Electron coherence:</strong> we target Hahn-echo T<sub>2</sub>{' '}
          ≳ 1&nbsp;ms, comparable to the ~1.18&nbsp;ms electron-spin coherence
          demonstrated in similar NV registers in the literature. Note that at
          our target ~100&nbsp;nm depth, this is a prospective lower bound and
          may be far higher.
        </p>
        <p>
          <strong>Individually addressable hyperfine couplings:</strong> resonant
          frequencies of the in-register <sup>13</sup>C spins must be
          sufficiently isolated such that driving one nuclear spin does not
          rotate another. Our engineering target is ≥99.9% fidelity for a
          single-qubit Bloch rotation, corresponding to ≤10<sup>−3</sup> total
          error from crosstalk and control imperfections.
        </p>
        <p>
          The NV&rsquo;s physical position on the plate must be compatible with
          optical access and metallisation; it cannot be too far away from the
          centre of the plate.
        </p>
      </section>

      <section>
        <h2>3. MW/RF Antenna</h2>
        <p>
          Lithographically-patterned Ti/Au MW/RF rails are fabricated directly
          onto the diamond to drive signals to the nuclear spins.
        </p>
        <p>
          A thin titanium adhesion layer, initially targeting ~7–20&nbsp;nm, is
          deposited beneath ~150–200&nbsp;nm of gold. These thicknesses are
          chosen because they match published Ti/Au metallisation figures in
          published NV-centre experiments; we would like to avoid reinventing
          the wheel until final figures and geometry are fixed after simulation
          and fabrication review are complete.
        </p>
      </section>

      <section>
        <h2>4. Static magnetic field</h2>
        <p>
          A static magnetic field of approximately 40&nbsp;mT is applied along
          the selected NV axis. This follows the architecture used in closely
          related Delft multi-spin NV experiments, which operate at
          approximately 403–404&nbsp;G.
        </p>
        <p>
          The field is generated using a permanent neodymium magnet mounted
          outside the cryostat on a precision translation stage. Delft uses
          essentially this arrangement with a temperature-stabilized permanent
          magnet on a piezo stage.
        </p>
        <p>
          Alignment is performed by recording the NV&rsquo;s ODMR spectrum while
          adjusting the magnet position and minimising the magnetic-field
          component transverse to the NV axis. Similar NV experiments have used
          this procedure to reduce residual transverse fields below 50&nbsp;µT.
        </p>
        <p>
          Permanent magnets change field strength with temperature, so the
          magnet is temperature stabilized to prevent resonance frequencies
          drifting during operation. The exact setpoint will be chosen after the
          measurement of magnetic-field drift vs magnet temperature; we will
          then regulate the magnet with a temperature sensor, heater and PID
          controller.
        </p>
        <p>
          The external neodymium magnet is temperature-stabilized using an RS
          PRO 4-wire Class A PT100 sensor mounted in thermal contact with the
          magnet holder, an RS PRO 50 x 50&nbsp;mm, 3.75&nbsp;W silicone heater
          pad attached to the holder, and an RS PRO ET2011 PID controller. The
          heater is powered from a MEAN WELL HDR-15-12 12&nbsp;V, 15&nbsp;W
          supply.
        </p>
      </section>

      <section>
        <h2>5. Cryogenic and Optical Environment</h2>
        <p>
          The diamond is operated inside a Montana Instruments CryoAdvance 50
          fitted with the H05 Cryo-Optic module. Montana&rsquo;s 50&nbsp;mm
          Cryo-Optic platform is specifically designed for high-NA microscopy at
          cryogenic temperature and provides a 53&nbsp;mm x 63&nbsp;mm sample
          space, 3.7–350&nbsp;K operating range, &lt;10&nbsp;mK
          sample-temperature stability and &lt;5&nbsp;nm platform vibration.
          Typical cooldown to 4.2&nbsp;K is approximately 3–5 hours. Pricing and
          delivery time are quote-only from Montana.
        </p>
        <p>
          The Cryo-Optic includes a vacuum-compatible Zeiss LD EC
          Epiplan-Neofluar 100x/0.90 objective with a 1.0&nbsp;mm working
          distance. The objective sits inside the evacuated sample space and we
          position the diamond at the objective&rsquo;s nominal ~1&nbsp;mm
          working distance.
        </p>
        <p>
          Sample positioning is handled by Montana&rsquo;s Rook three-axis
          cryogenic nanopositioner. The packaged diamond is mounted onto the
          Rook inside the CryoAdvance and this allows XYZ motion of the diamond
          relative to the fixed Cryo-Optic objective. Note that the NV must
          first be located and placed directly underneath the objective, and
          also that the Rook is directly compatible with the CryoAdvance 50.
        </p>
        <p>
          For the sample electrical interface, we use Montana&rsquo;s Dual RF
          Sample Mount / Dual RF feedthrough configuration. One RF line carries
          the combined microwave and nuclear-spin RF signal from the external
          diplexer to the on-diamond Ti/Au stripline; the second line is
          retained as a spare/debug channel. Montana lists both Dual RF
          interfacing and the Dual RF Sample Mount as standard CryoAdvance 50
          options.
        </p>
        <p>
          The cryostat housing will be ordered using Montana&rsquo;s Diamond NV
          Center Housing configuration. This modifies the vacuum housing and
          radiation shield specifically to allow an external permanent magnet to
          approach the sample at a requested angle relative to the Cryo-Optic
          while retaining the cryogenic nanopositioner and RF/DC feedthroughs.
          This removes the need for us to design the magnet/cryostat mechanical
          interface ourselves.
        </p>
        <p>
          The CryoAdvance 50, H05 Cryo-Optic, Rook, Diamond NV Center Housing
          and Dual RF hardware should be purchased as one configured Montana
          system, rather than sourcing and integrating those cryogenic
          subsystems independently. Montana does not publish pricing or delivery
          times for this configuration, so both are TBD for the time being.
        </p>
      </section>

      <section>
        <h2>6. Electronic control</h2>
        <p>
          The central control system is an RFSoC4x2 frequency generation module,
          running QICK-DAWG as the control software. &lsquo;Frequency
          generation&rsquo; here encompasses deterministic pulse sequencing,
          waveform generation, experiment timing and also synchronization with
          the optical system.
        </p>
        <p>
          The RFSoC4x2 generates the microwave waveform and controls experiment
          timing. A separate DC-coupled arbitrary waveform generator (AWG),
          specified across 0.1–10&nbsp;MHz, generates the nuclear-control
          waveforms. The instruments share a compatible frequency reference, and
          an RFSoC hardware trigger starts the preloaded AWG sequence with
          repeatable timing and phase. The AWG model remains TBD.
        </p>
        <p>
          The software must be capable of specifying commands of the form:
        </p>
        <p>
          At <strong>t = 124&nbsp;ns</strong>, execute:
        </p>
        <table>
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Frequency</td>
              <td>2.873421 GHz</td>
            </tr>
            <tr>
              <td>Phase</td>
              <td>37°</td>
            </tr>
            <tr>
              <td>Envelope</td>
              <td>Square</td>
            </tr>
            <tr>
              <td>Duration</td>
              <td>32 ns</td>
            </tr>
          </tbody>
        </table>
        <p>
          alongside synchronized optical and detector operations.
        </p>
        <p>
          The control stack coordinates the complete experimental sequence from
          microwave and RF frequency, phase, amplitude, pulse shape and
          duration; delays between pulses; AOM timing; photon-counting windows;
          and the number and timing of repeated experimental shots.
        </p>
      </section>

      <section>
        <h2>7. Microwave and RF chain</h2>
        <p>
          The two electrical control paths begin separately, before being merged
          at the diplexer and addressed together.
        </p>

        <h3>Microwave path</h3>
        <figure className="figure figure-center spec-figure">
          <img
            src="/images/mw-flow.png"
            alt="Microwave path from the RFSoC 4x2 through the amplifier, switch and diplexer to the cryostat RF feedthrough."
          />
        </figure>
        <p>
          The microwave path controls the NV electron spin. At zero magnetic
          field the NV electron transition sits at approximately 2.87&nbsp;GHz,
          but with the ~40&nbsp;mT bias field the lower Zeeman branch moves to
          approximately 1.75&nbsp;GHz. Therefore, this is the transition we
          drive.
        </p>
        <p>
          The RFSoC4x2 generates the ~1.75&nbsp;GHz waveform directly, with
          control over frequency, phase, amplitude and pulse timing. No separate
          microwave up-conversion stage is required because this frequency sits
          within the RFSoC output range.
        </p>
        <p>
          In order to suppress DAC images and out-of-band noise before
          amplification, the signal is then passed through a band-pass filter
          (Mini-Circuits VBFZ-1690-S+).
        </p>
        <p>
          The now-filtered signal is sent to the microwave amplifier
          (Mini-Circuits ZHL-1724HLN+), which provides approximately 36&nbsp;dB
          of gain and can deliver roughly +26&nbsp;dBm (0.4&nbsp;W) before 1&nbsp;dB
          compression across 1.7–2.4&nbsp;GHz. The drive amplitude is calibrated
          until the NV reaches our target ~5–10&nbsp;MHz electron Rabi
          frequency. The required amplifier output therefore depends on the
          measured losses through the downstream switch, diplexer, coax and
          on-diamond stripline.
        </p>
        <p>
          After amplification, the signal passes through a microwave switch
          (Mini-Circuits ZFSWA2-63DR+). The switch is opened only during
          microwave pulses which prevents broadband amplifier noise from
          continuously reaching the NV during free-evolution periods.
        </p>
        <p>
          The microwave signal is then sent into the high-frequency port of the
          diplexer (Mini-Circuits ZDPLX-2150-S+). The nuclear-spin RF path
          enters the low-frequency port of the same diplexer, and both RF+MW
          share a single line from this point onwards.
        </p>
        <p>
          The combined signal then passes through a DC block (Mini-Circuits
          BLK-89-S+) to prevent unwanted DC offsets from reaching the diamond
          while allowing both the nuclear-control signals and the ~1.75&nbsp;GHz
          electron-control signal to pass.
        </p>

        <h3>RF path</h3>
        <figure className="figure figure-center spec-figure">
          <img
            src="/images/rf-flow.png"
            alt="RF path from the RFSoC 4x2 through the switch, amplifier, low-pass filter and diplexer to the cryostat feedthrough."
          />
        </figure>
        <p>
          The RF path controls the intrinsic <sup>14</sup>N spin and the nearby{' '}
          <sup>13</sup>C nuclear spins. We expect to operate primarily from
          roughly hundreds of kHz to a few MHz.
        </p>
        <p>
          The external AWG generates the nuclear-control waveforms with
          programmable frequency, phase, amplitude and envelope. Its output
          passes through the Mini-Circuits ZASWA2-50DR-FA RF switch, followed by
          the RF amplifier, low-pass filter and diplexer. The amplifier and
          filter must cover the complete measured nuclear-control band.
        </p>
        <p>
          The switched signal is then passed through an RF amplifier; the exact
          amplifier remains TBD until we simulate the stripline and measure the
          RF field required at the NV. The selection criterion is the power
          required to reach our target nuclear Rabi rates without exceeding the
          thermal or power-handling limits of the diplexer, feedthrough or
          stripline.
        </p>
        <p>
          After amplification, the signal also passes through a low-pass filter
          to remove DAC images and higher-frequency amplifier noise while
          preserving the nuclear-control band. The exact filter cutoff remains
          TBD until the complete measured <sup>14</sup>N/<sup>13</sup>C
          frequency range is known.
        </p>
        <p>
          The conditioned RF signal is then connected to the low-frequency port
          of the Mini-Circuits ZDPLX-2150-S+ diplexer. This port covers DC–10
          MHz.{' '}
          <a
            href="https://www.minicircuits.com/WebStore/dashboard.html?model=ZDPLX-2150-S%2B"
            target="_blank"
            rel="noreferrer"
          >
            Manufacturer specification
          </a>
          .
        </p>
      </section>

      <section>
        <h2>8. Optical Excitation</h2>
        <p>
          532&nbsp;nm excitation provides charge repumping; independently gated,
          frequency-stabilized 637&nbsp;nm excitation provides resonant spin
          preparation and readout.
        </p>

        <h3>532 nm path</h3>
        <p>
          The 532&nbsp;nm light comes from a Novanta GEM 532 laser in the
          100&nbsp;mW configuration, driven by an SMD12 controller. The GEM
          produces a ~0.9&nbsp;mm diameter TEM<sub>00</sub> beam with M² &lt;
          1.1.
        </p>
        <p>
          The beam first passes through a Thorlabs NDC-25C-4M variable
          neutral-density filter for 0–4 OD of attenuation so that the optical
          power reaching the diamond can be calibrated without changing the rest
          of the beam path.
        </p>
        <p>
          A Thorlabs AC254-250-A, 250&nbsp;mm focal-length achromatic lens then
          focuses the ~0.9&nbsp;mm GEM output to approximately 200&nbsp;µm
          diameter inside the AOM. This focal length follows directly from the
          measured GEM beam diameter and Gaussian-beam propagation rather than
          being an arbitrary choice.
        </p>
        <p>
          Optical gating is provided by a G&amp;H AOMO 3080-125 (P/N
          97-01598-01) driven at 80&nbsp;MHz by a G&amp;H 1080AF-DINA-1.0 (P/N
          97-02910-08). At a 200&nbsp;µm beam diameter, the AOM provides
          approximately 80% first-order diffraction efficiency and a 34&nbsp;ns
          optical rise time. The RF driver itself switches in approximately
          12&nbsp;ns, so the AOM crystal rather than the driver sets the overall
          optical switching speed.
        </p>
        <p>
          The 200&nbsp;µm waist therefore corresponds to roughly 34&nbsp;ns
          optical switching. In practice we can generate clean optical pulses on
          the ~50&nbsp;ns scale or longer. The same green path also supports
          electron initialization and averaged fluorescence readout during
          initial experiments: comparable NV experiments use 2–4&nbsp;µs,
          ~150&nbsp;µW 532&nbsp;nm pulses for electron initialization.
        </p>
        <p>
          After the AOM, the first diffracted order is selected using a Thorlabs
          SM1D12C iris, while the zero-order beam terminates in a Thorlabs
          LB1/M beam block.
        </p>
        <p>
          A second AC254-250-A recollimates the first-order beam, after which a
          Thorlabs BE05-532 5x beam expander increases the beam diameter to
          approximately 4–5&nbsp;mm before the objective. The BE05-532 has
          &gt;98% specified transmission at 532&nbsp;nm.
        </p>
        <p>
          A Thorlabs DMLP605R dichroic reflects the 532&nbsp;nm excitation
          toward the cryostat while transmitting the 650–800&nbsp;nm NV
          fluorescence on the return path. Its specified average reflectance is
          &gt;95% across 470–590&nbsp;nm and average transmission &gt;90% across
          620–800&nbsp;nm.
        </p>
        <p>
          Additional beam-combining optics introduce the independently
          controlled 637&nbsp;nm beam into the common path before the Montana
          H05 Cryo-Optic and Zeiss EC Epiplan-Neofluar 100x/0.90 objective. Both
          beams are aligned onto the selected NV. The beam-combining components
          remain TBD and must preserve the fluorescence collection path. The
          DMLP605R alone does not reject the 637&nbsp;nm excitation from the
          detector arm; that rejection is specified in the optical readout
          section.
        </p>
        <p>
          The existing 532&nbsp;nm throughput estimate, before accounting for
          the additional beam-combining optics, is:
        </p>
        <table>
          <thead>
            <tr>
              <th>Stage</th>
              <th>Approx. Throughput</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Focusing lens</td>
              <td>~99%</td>
            </tr>
            <tr>
              <td>AOM insertion + first-order diffraction</td>
              <td>~76%</td>
            </tr>
            <tr>
              <td>Iris/alignment allowance</td>
              <td>~95%</td>
            </tr>
            <tr>
              <td>Recollimation lens</td>
              <td>~99%</td>
            </tr>
            <tr>
              <td>BE05-532</td>
              <td>&gt;98%</td>
            </tr>
            <tr>
              <td>DMLP605R at 532 nm</td>
              <td>&gt;95%</td>
            </tr>
            <tr>
              <td>Cryostat window + objective allowance</td>
              <td>~90%</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>~55–60%</td>
            </tr>
          </tbody>
        </table>
        <p>
          The final throughput is recalculated after the beam-combining optics
          are selected.
        </p>

        <h3>Focusing lens</h3>
        <p>
          The focusing lens takes the approximately collimated laser output and
          produces the required approximately 200&nbsp;µm beam waist inside the
          AOM interaction region.
        </p>

        <h3>637 nm resonant path</h3>
        <p>
          Tunable, frequency-stabilized 637&nbsp;nm excitation addresses the
          selected NV&rsquo;s spin-pumping and readout transitions. These
          optical operations are gated independently of the 532&nbsp;nm
          charge-repump pulses and synchronized by the RFSoC.
        </p>
        <p>
          The red path includes laser-frequency stabilization, fast optical
          gating and beam shaping before entering the common objective path. The
          laser, stabilization hardware, gate and combining optics remain TBD.
          Optical frequencies, polarization and pulse settings are calibrated
          for the selected NV.
        </p>
      </section>

      <section>
        <h2>9. Optical readout</h2>
        <p>
          The same Montana H05 Cryo-Optic with the Zeiss 100x / 0.90 NA
          objective collects the NV fluorescence.
        </p>
        <p>
          The readout does not require spectrally indistinguishable photons; it
          only requires enough spin-dependent fluorescence to distinguish the NV
          electron state. We therefore collect the broad ~650–800&nbsp;nm phonon
          sideband, which contains most of the NV emission, rather than
          isolating the 637&nbsp;nm zero-phonon line.
        </p>
        <p>
          Returning fluorescence passes back through the collection optics and
          dichroic, which has an average transmit rate of &gt;90% from
          620–800&nbsp;nm while continuing to reject the 532&nbsp;nm excitation
          path. The detector arm must reject both the 532&nbsp;nm and 637&nbsp;nm
          excitation wavelengths while transmitting the selected phonon-sideband
          band.
        </p>
        <p>
          For initial measurements using ~150&nbsp;µW of 532&nbsp;nm excitation,
          Fresnel reflection from the diamond surface can return on the order of
          25&nbsp;µW of 532&nbsp;nm light toward the objective. After the
          dichroic, a conservative upper bound is still roughly 2.5&nbsp;µW
          reaching the detector arm. That is far too high for single-photon
          readout: it corresponds to roughly 7 trillion green photons per
          second, while the useful fluorescence signal from a single NV is
          typically only around 100,000 detected counts per second.
        </p>
        <p>
          To suppress this residual excitation, we place a Semrock BLP01-647R-25
          long-pass filter before the detector. At 532&nbsp;nm it provides OD
          &gt; 6, reducing the residual green power by at least 1,000,000x, from
          the conservative ~2.5&nbsp;µW upper bound to &lt;2.5&nbsp;pW, while
          transmitting &gt;93% of the fluorescence above 665&nbsp;nm.
        </p>
        <p>
          For resonant readout, the filter stack must also provide sufficient
          rejection of scattered 637&nbsp;nm laser light. Rejection at both
          laser wavelengths is verified under the intended pulse conditions;
          additional filtering is included if required. The detector records
          phonon-sideband fluorescence during the resonant readout pulse.
        </p>
        <p>
          A Thorlabs AC254-050-B-ML, 50&nbsp;mm achromatic doublet then focuses
          the filtered fluorescence onto an Excelitas SPCM-AQRH-10 silicon SPAD.
          The detector covers 400–1060&nbsp;nm, has ~65% photon-detection
          efficiency at 650&nbsp;nm, a 24&nbsp;ns dead time and a maximum
          specified dark-count rate of 1500 counts per second.
        </p>
        <p>
          Each detected photon produces a TTL pulse. Rather than adding a
          separate photon counter, that output is connected directly to an
          RFSoC4x2 ADC input, which QICK-DAWG already supports in
          photon-counting mode. The RFSoC opens a defined readout window
          synchronized with each readout pulse and counts the arriving detector
          pulses during that interval.
        </p>
        <p>
          Bright- and dark-state reference measurements establish the
          photon-count distributions and calibrate state assignment. Initial
          experiments using 532&nbsp;nm excitation average counts over repeated
          preparations to estimate spin observables. Resonant single-shot
          measurements use the calibrated count distributions to assign
          individual electron outcomes.
        </p>
      </section>

      <section>
        <h2>10. Preparation and readout</h2>
        <p>
          The 532&nbsp;nm laser restores the NV&rsquo;s negative charge state.
          Tunable, frequency-stabilized 637&nbsp;nm excitation addresses the
          optical transitions used for electron-spin preparation and readout.
        </p>
        <p>
          The electron is prepared in m<sub>s</sub> = 0. Each <sup>13</sup>C
          nucleus is then initialized by transferring the electron&rsquo;s
          polarization through two conditional gates: first a nuclear-controlled
          electron flip, then an electron-controlled nuclear flip. The electron
          is optically reset afterwards. This sequence is repeated for each
          selected carbon, preserving the nuclei already prepared.
        </p>
        <p>
          The intrinsic <sup>14</sup>N qubit uses the m<sub>I</sub> = −1 and m
          <sub>I</sub> = 0 states. A nitrogen-selective microwave pulse followed
          by electron readout identifies the desired starting state. Preparation
          is repeated until that state is confirmed; population in the unused m
          <sub>I</sub> = +1 state is measured separately.
        </p>
        <p>
          For measurement, basis-rotation pulses and a conditional gate map the
          selected nuclear observable onto the electron. Resonant 637&nbsp;nm
          excitation produces spin-dependent fluorescence, collected by the
          objective and counted by the SPAD. Bright- and dark-state reference
          measurements calibrate the readout.
        </p>
        <p>
          Full-register measurements require a calibrated readout order and
          protection of nuclei awaiting measurement. Initial two-qubit
          experiments can instead use averaged fluorescence under 532&nbsp;nm
          excitation.
        </p>
        <p>
          The preparation and resonant-readout baseline follows the{' '}
          <a
            href="https://arxiv.org/html/1905.02094v2"
            target="_blank"
            rel="noreferrer"
          >
            published multi-spin NV register architecture
          </a>
          .
        </p>
      </section>

      <section>
        <h2>11. First complete experiment</h2>
        <p>
          The first acceptance experiment prepares and measures an entangled
          state of the NV electron and one <sup>13</sup>C nucleus. Resonance
          frequencies, pulse amplitudes, pulse durations and phases are
          calibrated for the selected pair.
        </p>
        <ol>
          <li>
            <strong>Prepare:</strong> Initialize the electron and nucleus in
            |00⟩, using the preparation sequence above.
          </li>
          <li>
            <strong>Create a superposition:</strong> Apply a microwave π/2 pulse
            to the electron.
          </li>
          <li>
            <strong>Entangle:</strong> Apply an electron-controlled nuclear flip,
            compiled from RF rotations and microwave refocusing pulses. With
            calibrated phases, this prepares the Bell state (|00⟩+|11⟩)/√2.
          </li>
          <li>
            <strong>Measure:</strong> Repeat the experiment in three measurement
            settings to obtain the correlations ⟨XX⟩, ⟨YY⟩ and ⟨ZZ⟩. For each
            setting, apply the analysis rotations below, then a
            nuclear-controlled electron flip and optical electron readout.
          </li>
        </ol>
        <table>
          <thead>
            <tr>
              <th>Correlation</th>
              <th>Analysis rotation applied to both qubits</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>XX</td>
              <td>
                R<sub>y</sub>(−π/2)
              </td>
            </tr>
            <tr>
              <td>YY</td>
              <td>
                R<sub>x</sub>(+π/2)
              </td>
            </tr>
            <tr>
              <td>ZZ</td>
              <td>None</td>
            </tr>
          </tbody>
        </table>
        <p>The Bell-state fidelity is</p>
        <p className="spec-eq">
          F = (1 + ⟨XX⟩ − ⟨YY⟩ + ⟨ZZ⟩) / 4
        </p>
        <p>
          The experiment passes when the lower 95% confidence bound exceeds 0.5,
          including uncertainty from readout calibration and analysis pulses.
          Results include the three correlations, fidelity, uncertainty and
          calibration settings.
        </p>
      </section>

      <section>
        <h2>12. User interface and API</h2>
        <p>
          The user should not be required to understand any of the microwave,
          RF, optical or FPGA hardware to operate the machine.
        </p>
        <p>
          All Diamond QPU units should appear from the user perspective as
          straight-out-the-box and a delight to use. The absolute minimum amount
          of clicks should be required to open up the intuitive user interface.
        </p>
        <p>
          The primary interface will therefore be a Python SDK with first-class
          Qiskit compatibility.
        </p>
        <p>A user should be able to:</p>
        <ul>
          <li>Connect to the machine.</li>
          <li>Query available qubits.</li>
          <li>
            Click on a picture of an individual qubit at any arbitrary point in
            the circuit and see its state vector on the Bloch sphere.
          </li>
          <li>
            Retrieve detailed calibration information, but only if specifically
            requested.
          </li>
          <li>Submit quantum circuits.</li>
          <li>Specify shot count.</li>
          <li>Run the circuits.</li>
        </ul>
        <p>The intended workflow is approximately:</p>
        <pre>
          <code>{`from pathfinder import PathfinderProvider
from qiskit import transpile

provider = PathfinderProvider()
backend = provider.get_backend("diamond_qpu")

circuit = transpile(circuit, backend)
job = backend.run(circuit, shots=1000)

result = job.result()`}</code>
        </pre>
        <p>
          The Pathfinder backend exposes its native gate set, available qubits,
          connectivity, timing constraints and current calibration data to the
          transpiler.
        </p>
      </section>
        </div>
      </article>
    </div>
  )
}
