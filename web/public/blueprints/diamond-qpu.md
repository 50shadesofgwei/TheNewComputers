# Diamond QPU v2.1

v2.1 · ODMR

# Diamond QPU

Thanks to [Dr. Jason Smith](https://www.materials.ox.ac.uk/peoplepages/smithj.html), [Dr. Joe A. Smith](https://www.sheffield.ac.uk/eee/people/academic-staff/joe-smith), and [Dr. Chong Zu](https://artsci.washu.edu/faculty-staff/chong-zu) for their review and continued correspondence.

Designed as a compact tabletop system for a conventional lab without extensive infrastructure. **Our chief objective is to manufacture a complete quantum computer as quickly and cost-effectively as possible.**

## System architecture

![Pathfinder Diamond QPU: diamond NV chiplet flip-chip bonded to a microwave and RF ASIC, optically coupled to a silicon nitride photonic circuit for 515 nm excitation and fluorescence collection.](https://thenewcomputers.com/images/diamond-qpu-architecture.png)

Qubits are housed in a 4x4x0.5 mm ⟨111⟩ diamond plate, with an NV depth ~100 nanometers. An ASIC flip-chip bonded to the diamond delivers microwave and RF and carries silicon photonics for 515 nm excitation and fluorescence collection. Pauli X, Y, Z and entangling gates are driven by pulses applied to the various spins. The diamond is cooled by a triple Peltier stack.

## 1. Diamond register

The register is housed in a 4 x 4 x 0.5 mm synthetic diamond plate, sourced from Diatope in Germany. Target NV depth is approximately 100 nm below the diamond surface.

⟨111⟩ diamond is preferred. That orientation simplifies the optical geometry for an appropriately aligned NV.

The desired register contains a nitrogen vacancy surrounded by eight sufficiently strongly coupled ^13C nuclear spins. Those spins are the qubits: Pauli X, Y and Z, and the entangling gates between them, are microwave and RF pulses applied to that register.

Increasing ^13C abundance increases the probability of obtaining a useful nuclear register, while also increasing the surrounding spin bath (reducing electron-spin coherence time). The final isotopic composition will be selected from experimental data rather than assumed in advance.

## 2. NV creation and characterisation

The diamond is implanted with ^14N and annealed by Diatope, who also handle characterisation.

The diamond is then characterized to identify an NV with:

**Stable fluorescence:** We prepare the NV into the NV^− charge state. It must produce a repeatable fluorescence count rate under repeated 515 nm excitation, without significant blinking or charge-state switching. The acceptance threshold will be set from measured photon-count statistics during characterization.

**Electron coherence:** we target Hahn-echo T_2 ≳ 1 ms, comparable to the ~1.18 ms electron-spin coherence demonstrated in similar NV registers in the literature. Note that at our target ~100 nm depth, this is a prospective lower bound and may be far higher.

**Individually addressable hyperfine couplings:** resonant frequencies of the in-register ^13C spins must be sufficiently isolated such that driving one nuclear spin does not rotate another. Our engineering target is ≥99.9% fidelity for a single-qubit Bloch rotation, corresponding to ≤10^−3 total error from crosstalk and control imperfections.

## 3. ASIC antenna and flip-chip bonding

On-diamond metallisation is replaced by an ASIC. The ASIC is flip-chip bonded onto the diamond plate. It carries microwave and RF delivery to the electron and nuclear spins, and it carries the photonic circuit that excites the NV and collects its fluorescence.

Silicon photonics is fundamental to the architecture. 515 nm excitation is coupled into waveguides on the ASIC; phonon-sideband fluorescence is collected on the same chip and routed to the detector.

Flip-chip bonding places the selected NV in the microwave/RF field and in the optical mode of the photonic circuit. Every Pauli rotation and every entangling gate is a pulse sent through this ASIC into those spins. Bump geometry, trace layout, waveguide alignment and the required field at the NV are fixed after simulation and bonding trials.

## 4. Static magnetic field

A static magnetic field of approximately 40 mT is applied along the selected NV axis. This follows the architecture used in closely related Delft multi-spin NV experiments, which operate at approximately 403–404 G.

The field is generated using a permanent neodymium magnet mounted beside the Peltier stack on a precision translation stage. Delft uses a similar arrangement with a temperature-stabilized permanent magnet on a piezo stage.

Alignment is performed by recording the NV’s ODMR spectrum while adjusting the magnet position and minimising the magnetic-field component transverse to the NV axis. Similar NV experiments have used this procedure to reduce residual transverse fields below 50 µT.

Permanent magnets change field strength with temperature, so the magnet is temperature stabilized to prevent resonance frequencies drifting during operation. The exact setpoint will be chosen after the measurement of magnetic-field drift vs magnet temperature; we will then regulate the magnet with a temperature sensor, heater and PID controller.

The external neodymium magnet is temperature-stabilized using an RS PRO 4-wire Class A PT100 sensor mounted in thermal contact with the magnet holder, an RS PRO 50 x 50 mm, 3.75 W silicone heater pad attached to the holder, and an RS PRO ET2011 PID controller. The heater is powered from a MEAN WELL HDR-15-12 12 V, 15 W supply.

## 5. Cooling and optical environment

In place of a bulky cryostat, the diamond QPU uses a triple Peltier stack for heat dissipation. Three thermoelectric stages cool the diamond package; heat is dumped through semiconductor heat dissipators on the hot side of the stack.

The diamond-and-ASIC assembly is mounted on the cold plate. The magnet and electrical connections remain accessible around the stack. Exact TEC modules, ΔT and dissipator sizing are fixed after a thermal budget for the ASIC, the photonic load and the 515 nm diode.

**All excitation and collection goes through the on-chip silicon photonic circuit.**

One RF line carries the combined microwave and nuclear-spin RF signal from the external diplexer to the ASIC; a second line is retained as a spare/debug channel. The 515 nm diode is coupled into the chip; collected fluorescence leaves the chip to the SPAD.

## 6. Electronic control

The central control system is an RFSoC4x2 frequency generation module, running QICK-DAWG as the control software. ‘Frequency generation’ here encompasses deterministic pulse sequencing, waveform generation, experiment timing and also synchronization with the optical system.

The RFSoC4x2 generates the microwave waveform, the nuclear-control waveforms, and the experiment timing. Nuclear-control tones sit in the 0.1–10 MHz band. Both paths share the board clock, so relative timing and phase are native to one instrument.

The software must be capable of specifying commands of the form:

At **t = 124 ns**, execute:

| Parameter | Value |
| --- | --- |
| Frequency | 2.873421 GHz |
| Phase | 37° |
| Envelope | Square |
| Duration | 32 ns |

alongside synchronized optical and detector operations.

The control stack coordinates the complete experimental sequence from microwave and RF frequency, phase, amplitude, pulse shape and duration; delays between pulses; 515 nm diode gating; photon-counting windows; and the number and timing of repeated experimental shots. That stack exists to put Pauli X, Y, Z and entangling gates onto the electron and nuclear spins as timed pulses.

## 7. Microwave and RF chain

The two electrical control paths begin separately, before being merged at the diplexer and addressed together. Microwave pulses rotate the electron; RF pulses rotate the nuclei. Together they are the Pauli gates and the entangling gates.

### Microwave path

![Microwave path from the RFSoC 4x2 through the amplifier, switch and diplexer to the sample RF interface.](https://thenewcomputers.com/images/mw-flow.png)

The microwave path controls the NV electron spin. At zero magnetic field the NV electron transition sits at approximately 2.87 GHz, but with the ~40 mT bias field the lower Zeeman branch moves to approximately 1.75 GHz. Therefore, this is the transition we drive.

The RFSoC4x2 generates the ~1.75 GHz waveform directly, with control over frequency, phase, amplitude and pulse timing. No separate microwave up-conversion stage is required because this frequency sits within the RFSoC output range.

In order to suppress DAC images and out-of-band noise before amplification, the signal is then passed through a band-pass filter (Mini-Circuits VBFZ-1690-S+).

The now-filtered signal is sent to the microwave amplifier (Mini-Circuits ZHL-1724HLN+), which provides approximately 36 dB of gain and can deliver roughly +26 dBm (0.4 W) before 1 dB compression across 1.7–2.4 GHz. The drive amplitude is calibrated until the NV reaches our target ~5–10 MHz electron Rabi frequency. The required amplifier output therefore depends on the measured losses through the downstream switch, diplexer, coax and ASIC interconnect.

After amplification, the signal passes through a microwave switch (Mini-Circuits ZFSWA2-63DR+). The switch is opened only during microwave pulses which prevents broadband amplifier noise from continuously reaching the NV during free-evolution periods.

The microwave signal is then sent into the high-frequency port of the diplexer (Mini-Circuits ZDPLX-2150-S+). The nuclear-spin RF path enters the low-frequency port of the same diplexer, and both RF+MW share a single line from this point onwards.

The combined signal then passes through a DC block (Mini-Circuits BLK-89-S+) to prevent unwanted DC offsets from reaching the diamond while allowing both the nuclear-control signals and the ~1.75 GHz electron-control signal to pass.

### RF path

![RF path from the RFSoC 4x2 through the switch, amplifier, low-pass filter and diplexer to the sample RF interface.](https://thenewcomputers.com/images/rf-flow.png)

The RF path controls the intrinsic ^14N spin and the nearby ^13C nuclear spins. We expect to operate primarily from roughly hundreds of kHz to a few MHz.

The RFSoC4x2 generates the nuclear-control waveforms with programmable frequency, phase, amplitude and envelope. Its output passes through the Mini-Circuits ZASWA2-50DR-FA RF switch, followed by the RF amplifier, low-pass filter and diplexer. The amplifier and filter must cover the complete measured nuclear-control band.

The switched signal is then passed through an RF amplifier; the exact amplifier remains TBD until we simulate the ASIC traces and measure the RF field required at the NV. The selection criterion is the power required to reach our target nuclear Rabi rates without exceeding the thermal or power-handling limits of the diplexer or the flip-chip interconnect.

After amplification, the signal also passes through a low-pass filter to remove DAC images and higher-frequency amplifier noise while preserving the nuclear-control band. The exact filter cutoff remains TBD until the complete measured ^14N/^13C frequency range is known.

The conditioned RF signal is then connected to the low-frequency port of the Mini-Circuits ZDPLX-2150-S+ diplexer. This port covers DC–10 MHz. [Manufacturer specification](https://www.minicircuits.com/WebStore/dashboard.html?model=ZDPLX-2150-S%2B).

## 8. Optical Excitation

A 515 nm diode laser drives the NV through the on-chip photonic circuit. Charge repump, electron initialization and fluorescence readout all use this beam. A 637 nm laser is not required. An AOM is not required: the diode is gated electrically by the RFSoC.

The diode model and the coupler onto the chip remain TBD. Drive current and electrical gating must be fast enough for the initialization and readout windows we use in experiment. Comparable NV work initializes the electron with a few microseconds of ~150 µW green light; we calibrate power at the NV rather than assuming that figure.

Before the chip, the beam passes through a Thorlabs NDC-25C-4M variable neutral-density filter for 0–4 OD of attenuation so that the power launched into the waveguide can be calibrated without changing the rest of the path.

On-chip waveguides deliver 515 nm to the selected NV. There is no free-space objective in the operating excitation path. Throughput is set by diode-to-chip coupling and waveguide loss to the NV, and is measured after the photonic circuit is fabricated.

## 9. Optical readout

Fluorescence is collected on-chip and routed off the ASIC to the detector. A free-space objective is not required for readout.

The readout does not require spectrally indistinguishable photons; it only requires enough spin-dependent fluorescence to distinguish the NV electron state. We therefore collect the broad ~650–800 nm phonon sideband, which contains most of the NV emission, rather than isolating the 637 nm zero-phonon line. No 637 nm laser is used.

Residual 515 nm in the collection waveguide must be rejected before the detector while the phonon sideband is transmitted. A Semrock BLP01-647R-25 long-pass filter sits on that path. At 515 nm it provides OD > 6, while transmitting >93% of the fluorescence above 665 nm.

A Thorlabs AC254-050-B-ML, 50 mm achromatic doublet focuses the filtered light onto an Excelitas SPCM-AQRH-10 silicon SPAD. The detector covers 400–1060 nm, has ~65% photon-detection efficiency at 650 nm, a 24 ns dead time and a maximum specified dark-count rate of 1500 counts per second.

Each detected photon produces a TTL pulse. Rather than adding a separate photon counter, that output is connected directly to an RFSoC4x2 ADC input, which QICK-DAWG already supports in photon-counting mode. The RFSoC opens a defined readout window synchronized with each 515 nm pulse and counts the arriving detector pulses during that interval.

Bright- and dark-state reference measurements establish the photon-count distributions and calibrate state assignment. Experiments average counts over repeated 515 nm preparations to estimate spin observables.

## 10. Preparation and readout

The 515 nm diode, delivered through the on-chip photonic circuit, restores the NV’s negative charge state and is used for electron-spin preparation and fluorescence readout. A 637 nm laser is not required.

The electron is prepared in m_s = 0. Each ^13C nucleus is then initialized by transferring the electron’s polarization through two conditional gates: first a nuclear-controlled electron flip, then an electron-controlled nuclear flip. The electron is optically reset afterwards. This sequence is repeated for each selected carbon, preserving the nuclei already prepared.

The intrinsic ^14N qubit uses the m_I = −1 and m_I = 0 states. A nitrogen-selective microwave pulse followed by electron readout identifies the desired starting state. Preparation is repeated until that state is confirmed; population in the unused m_I = +1 state is measured separately.

For measurement, basis-rotation pulses and a conditional gate map the selected nuclear observable onto the electron. 515 nm excitation produces spin-dependent fluorescence, collected on-chip and counted by the SPAD. Bright- and dark-state reference measurements calibrate the readout.

Full-register measurements require a calibrated readout order and protection of nuclei awaiting measurement. Initial two-qubit experiments use averaged fluorescence under 515 nm excitation.

The microwave and RF preparation sequence follows the [published multi-spin NV register architecture](https://arxiv.org/html/1905.02094v2).

## 11. First complete experiment

The first acceptance experiment prepares and measures an entangled state of the NV electron and one ^13C nucleus. Resonance frequencies, pulse amplitudes, pulse durations and phases are calibrated for the selected pair.

- **Prepare:** Initialize the electron and nucleus in |00⟩, using the preparation sequence above.

- **Create a superposition:** Apply a microwave π/2 pulse to the electron.

- **Entangle:** Apply an electron-controlled nuclear flip, compiled from RF rotations and microwave refocusing pulses. With calibrated phases, this prepares the Bell state (|00⟩+|11⟩)/√2.

- **Measure:** Repeat the experiment in three measurement settings to obtain the correlations ⟨XX⟩, ⟨YY⟩ and ⟨ZZ⟩. For each setting, apply the analysis rotations below, then a nuclear-controlled electron flip and optical electron readout.

| Correlation | Analysis rotation applied to both qubits |
| --- | --- |
| XX | R y (−π/2) |
| YY | R x (+π/2) |
| ZZ | None |

The Bell-state fidelity is

F = (1 + ⟨XX⟩ − ⟨YY⟩ + ⟨ZZ⟩) / 4

The experiment passes when the lower 95% confidence bound exceeds 0.5, including uncertainty from readout calibration and analysis pulses. Results include the three correlations, fidelity, uncertainty and calibration settings.

## 12. User interface and API

The user should not be required to understand any of the microwave, RF, optical or FPGA hardware to operate the machine.

All Diamond QPU units should appear from the user perspective as straight-out-the-box and a delight to use. The absolute minimum amount of clicks should be required to open up the intuitive user interface.

The primary interface will therefore be a Python SDK with first-class Qiskit compatibility.

A user should be able to:

- Connect to the machine.

- Query available qubits.

- Click on a picture of an individual qubit at any arbitrary point in the circuit and see its state vector on the Bloch sphere.

- Retrieve detailed calibration information, but only if specifically requested.

- Submit quantum circuits.

- Specify shot count.

- Run the circuits.

The intended workflow is approximately:

```
from pathfinder import PathfinderProvider
from qiskit import transpile

provider = PathfinderProvider()
backend = provider.get_backend("diamond_qpu")

circuit = transpile(circuit, backend)
job = backend.run(circuit, shots=1000)

result = job.result()
```

The Pathfinder backend exposes its native gate set, available qubits, connectivity, timing constraints and current calibration data to the transpiler. The native gates are the same operations as everywhere else in this document: Pauli X, Y, Z and entangling pulses on the spins.
