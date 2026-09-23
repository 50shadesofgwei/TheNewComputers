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
          Qubits are housed in a 4x4x0.5&nbsp;mm ⟨111⟩ diamond plate, with an NV
          depth ~100 nanometers. An ASIC flip-chip bonded to the diamond
          delivers microwave and RF and carries silicon photonics for 515&nbsp;nm
          excitation and fluorescence collection. Pauli X, Y, Z and entangling
          gates are driven by pulses applied to the various spins. The diamond
          is cooled by a triple Peltier stack.
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
          ⟨111⟩ diamond is preferred. That orientation simplifies the optical
          geometry for an appropriately aligned NV.
        </p>
        <p>
          The desired register contains a nitrogen vacancy surrounded by eight
          sufficiently strongly coupled <sup>13</sup>C nuclear spins. Those
          spins are the qubits: Pauli X, Y and Z, and the entangling gates
          between them, are microwave and RF pulses applied to that register.
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
          fluorescence count rate under repeated 515&nbsp;nm excitation, without
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
      </section>

      <section>
        <h2>3. ASIC and flip-chip</h2>
        <p>
          On-diamond metallisation is replaced by an ASIC. The ASIC is flip-chip
          bonded onto the diamond plate. It carries microwave and RF delivery to
          the electron and nuclear spins, and it carries the photonic circuit
          that excites the NV and collects its fluorescence.
        </p>
        <p>
          Silicon photonics is fundamental to the architecture. 515&nbsp;nm
          excitation is coupled into waveguides on the ASIC; phonon-sideband
          fluorescence is collected on the same chip and routed to the detector.
        </p>
        <p>
          Flip-chip bonding places the selected NV in the microwave/RF field
          and in the optical mode of the photonic circuit. Every Pauli rotation
          and every entangling gate is a pulse sent through this ASIC into those
          spins. Bump geometry, trace layout, waveguide alignment and the
          required field at the NV are fixed after simulation and bonding
          trials; we do not pattern Ti/Au rails directly onto the diamond.
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
          beside the Peltier stack on a precision translation stage. Delft uses
          a similar arrangement with a temperature-stabilized permanent magnet
          on a piezo stage.
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
        <h2>5. Cooling and optical environment</h2>
        <p>
          The cryostat is replaced by a triple Peltier stack. Three
          thermoelectric stages cool the diamond package; heat is dumped through
          semiconductor heat dissipators on the hot side of the stack.
        </p>
        <p>
          The diamond-and-ASIC assembly is mounted on the cold plate. The magnet
          and electrical connections remain accessible around the stack. Exact
          TEC modules, ΔT and dissipator sizing are fixed after a thermal budget
          for the ASIC, the photonic load and the 515&nbsp;nm diode.
        </p>
        <p>
          Excitation and collection go through the on-chip photonic circuit. A
          free-space objective is not required to run the machine. A microscope
          can still be used to find the NV before bonding.
        </p>
        <p>
          One RF line carries the combined microwave and nuclear-spin RF signal
          from the external diplexer to the ASIC; a second line is retained as a
          spare/debug channel. The 515&nbsp;nm diode is coupled into the chip;
          collected fluorescence leaves the chip to the SPAD.
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
          duration; delays between pulses; 515&nbsp;nm diode gating;
          photon-counting windows;
          and the number and timing of repeated experimental shots. That stack
          exists to put Pauli X, Y, Z and entangling gates onto the electron and
          nuclear spins as timed pulses.
        </p>
      </section>

      <section>
        <h2>7. Microwave and RF chain</h2>
        <p>
          The two electrical control paths begin separately, before being merged
          at the diplexer and addressed together. Microwave pulses rotate the
          electron; RF pulses rotate the nuclei. Together they are the Pauli
          gates and the entangling gates.
        </p>

        <h3>Microwave path</h3>
        <figure className="figure figure-center spec-figure">
          <img
            src="/images/mw-flow.png"
            alt="Microwave path from the RFSoC 4x2 through the amplifier, switch and diplexer to the sample RF interface."
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
          ASIC interconnect.
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
            alt="RF path from the RFSoC 4x2 through the switch, amplifier, low-pass filter and diplexer to the sample RF interface."
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
          amplifier remains TBD until we simulate the ASIC traces and measure
          the RF field required at the NV. The selection criterion is the power
          required to reach our target nuclear Rabi rates without exceeding the
          thermal or power-handling limits of the diplexer or the flip-chip
          interconnect.
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
          A 515&nbsp;nm diode laser drives the NV through the on-chip photonic
          circuit. Charge repump, electron initialization and fluorescence
          readout all use this beam. A 637&nbsp;nm laser is not required. An AOM
          is not required: the diode is gated electrically by the RFSoC.
        </p>
        <p>
          The diode model and the coupler onto the chip remain TBD. Drive
          current and electrical gating must be fast enough for the
          initialization and readout windows we use in experiment. Comparable NV
          work initializes the electron with a few microseconds of ~150&nbsp;µW
          green light; we calibrate power at the NV rather than assuming that
          figure.
        </p>
        <p>
          Before the chip, the beam passes through a Thorlabs NDC-25C-4M
          variable neutral-density filter for 0–4 OD of attenuation so that the
          power launched into the waveguide can be calibrated without changing
          the rest of the path.
        </p>
        <p>
          On-chip waveguides deliver 515&nbsp;nm to the selected NV. There is no
          free-space objective in the operating excitation path. Throughput is
          set by diode-to-chip coupling and waveguide loss to the NV, and is
          measured after the photonic circuit is fabricated.
        </p>
      </section>

      <section>
        <h2>9. Optical readout</h2>
        <p>
          Fluorescence is collected on-chip and routed off the ASIC to the
          detector. A free-space objective is not required for readout.
        </p>
        <p>
          The readout does not require spectrally indistinguishable photons; it
          only requires enough spin-dependent fluorescence to distinguish the NV
          electron state. We therefore collect the broad ~650–800&nbsp;nm phonon
          sideband, which contains most of the NV emission, rather than
          isolating the 637&nbsp;nm zero-phonon line. No 637&nbsp;nm laser is
          used.
        </p>
        <p>
          Residual 515&nbsp;nm in the collection waveguide must be rejected
          before the detector while the phonon sideband is transmitted. A
          Semrock BLP01-647R-25 long-pass filter sits on that path. At
          515&nbsp;nm it provides OD &gt; 6, while transmitting &gt;93% of the
          fluorescence above 665&nbsp;nm.
        </p>
        <p>
          A Thorlabs AC254-050-B-ML, 50&nbsp;mm achromatic doublet focuses the
          filtered light onto an Excelitas SPCM-AQRH-10 silicon SPAD. The
          detector covers 400–1060&nbsp;nm, has ~65% photon-detection efficiency
          at 650&nbsp;nm, a 24&nbsp;ns dead time and a maximum specified
          dark-count rate of 1500 counts per second.
        </p>
        <p>
          Each detected photon produces a TTL pulse. Rather than adding a
          separate photon counter, that output is connected directly to an
          RFSoC4x2 ADC input, which QICK-DAWG already supports in
          photon-counting mode. The RFSoC opens a defined readout window
          synchronized with each 515&nbsp;nm pulse and counts the arriving
          detector pulses during that interval.
        </p>
        <p>
          Bright- and dark-state reference measurements establish the
          photon-count distributions and calibrate state assignment. Experiments
          average counts over repeated 515&nbsp;nm preparations to estimate spin
          observables.
        </p>
      </section>

      <section>
        <h2>10. Preparation and readout</h2>
        <p>
          The 515&nbsp;nm diode, delivered through the on-chip photonic circuit,
          restores the NV&rsquo;s negative charge state and is used for
          electron-spin preparation and fluorescence readout. A 637&nbsp;nm
          laser is not required.
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
          selected nuclear observable onto the electron. 515&nbsp;nm excitation
          produces spin-dependent fluorescence, collected on-chip and counted by
          the SPAD. Bright- and dark-state reference measurements calibrate the
          readout.
        </p>
        <p>
          Full-register measurements require a calibrated readout order and
          protection of nuclei awaiting measurement. Initial two-qubit
          experiments use averaged fluorescence under 515&nbsp;nm excitation.
        </p>
        <p>
          The microwave and RF preparation sequence follows the{' '}
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
          transpiler. The native gates are the same operations as everywhere
          else in this document: Pauli X, Y, Z and entangling pulses on the
          spins.
        </p>
      </section>
        </div>
      </article>
    </div>
  )
}
