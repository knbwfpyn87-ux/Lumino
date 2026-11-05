export default String.raw`
@course ap-phys2 | AP Physics 2 | AP | ⚡ | Science

// Follows the 7 units of the revised AP Physics 2 framework (2024–25 onward).

@unit Thermodynamics | Kinetic theory and the ideal gas law, thermal energy transfer, the laws of thermodynamics
@lesson Gases and kinetic theory
say: AP Physics 2 starts with heat and gases, explaining big-scale behavior from tiny particle motion.
key: Ideal gas law: PV = nRT = NkT. Temperature is proportional to the average kinetic energy of particles: K_avg = (3/2)kT.
Pressure comes from particles colliding with container walls. At higher temperature, particles move faster and collide harder and more often.
On a PV diagram, isothermal processes stay at constant temperature, isobaric at constant pressure, isochoric (isovolumetric) at constant volume, and adiabatic with no heat exchange.
ex: A gas at 300 K is heated to 600 K at constant volume. What happens to its pressure?
> P/T is constant at fixed V and n
= Pressure doubles
term: ideal gas law = PV = nRT, relating pressure, volume, moles and temperature
term: isothermal process = a process at constant temperature
term: isobaric process = a process at constant pressure
term: adiabatic process = a process with no heat transfer
q: Doubling the kelvin temperature of a gas doubles its… | *average kinetic energy | number of particles | mass | volume always
why: K_avg ∝ T.
q: A process at constant volume is called… | *isochoric | isobaric | isothermal | adiabatic
why: "Choric" refers to volume staying fixed.
gen: chem.idealGas, stem.boyle

@lesson The laws of thermodynamics
say: The laws of thermodynamics govern every engine, refrigerator and living thing.
key: First law: ΔU = Q + W, where Q is heat added to the system and W is work done ON the system. Energy is conserved.
Work done on a gas equals the negative of the area under its PV curve (W = −PΔV for constant pressure). Expanding gas does work on its surroundings, so W on the gas is negative.
Second law: heat flows naturally from hot to cold, and the entropy of an isolated system never decreases. No heat engine can be 100% efficient.
Heat transfers by conduction (contact), convection (fluid motion) and radiation (electromagnetic waves).
ex: A gas absorbs 500 J of heat and does 200 J of work on its surroundings. Find ΔU.
> Q = +500 J; W on the gas = −200 J
= ΔU = 300 J
term: first law of thermodynamics = ΔU = Q + W; energy is conserved
term: entropy = a measure of disorder or energy dispersal
term: conduction = heat transfer through direct contact
term: heat engine = a device that converts heat into work
q: Can a heat engine be 100% efficient? | *No, by the second law | Yes, with good design | Only in a vacuum | Only at high temperature
why: Some heat must always be expelled.
q: Heat from the Sun reaches Earth by… | *radiation | conduction | convection | induction
why: Space has no medium for conduction or convection.

@unit Electric Force, Field and Potential | Coulomb's law, electric fields, electric potential and capacitors
@lesson Electric force and field
say: Charges push and pull each other. Electric fields describe how a charge affects the space around it.
key: Coulomb's law: F = k|q₁q₂|/r². Like charges repel; opposite charges attract. Doubling the distance makes the force 1/4 as strong.
The electric field E = F/q is the force per unit charge. Field lines point away from positive charges and toward negative charges. A uniform field exists between parallel charged plates.
ex: Two charges are 2 m apart with force 36 N. They move to 6 m apart. New force?
> Distance tripled, so force ÷ 9
= 4 N
Charge is conserved and quantized (multiples of e = 1.6 × 10⁻¹⁹ C). Conductors let charge move freely; charge on a conductor sits on its surface.
term: Coulomb's law = the electric force between charges is proportional to their product and inversely proportional to distance squared
term: electric field = the force per unit charge at a point
term: elementary charge = 1.6 × 10⁻¹⁹ C, the charge of a proton
q: Electric field lines point… | *away from positive charges | toward positive charges | in circles | randomly
why: They show the force on a positive test charge.
q: If both charges double, the force… | *quadruples | doubles | stays the same | halves
why: F ∝ q₁q₂.
gen: bank.PHYS.electricity

@lesson Electric potential and capacitors
say: Electric potential is like height for charges. Charges "fall" from high potential to low potential.
key: Electric potential V = U/q (volts). The potential difference ΔV drives charges. In a uniform field, ΔV = Ed.
Work done moving a charge: W = qΔV. Equipotential lines are perpendicular to field lines; moving along them takes no work.
A capacitor stores charge and energy: C = Q/V. For parallel plates, C = κε₀A/d. Energy stored: U = ½CV².
ex: A capacitor of 4 μF is charged to 10 V. How much charge and energy does it store?
> Q = CV = 4 × 10⁻⁶ × 10 = 4 × 10⁻⁵ C
= U = ½(4 × 10⁻⁶)(10²) = 2 × 10⁻⁴ J
term: electric potential = electric potential energy per unit charge, in volts
term: equipotential = a surface where all points have the same potential
term: capacitor = a device that stores charge and energy in an electric field
term: capacitance = charge stored per volt, C = Q/V
q: Moving a charge along an equipotential line requires… | *no work | maximum work | infinite work | negative work only
why: ΔV = 0 along it.
q: Increasing the plate separation of a capacitor… | *decreases its capacitance | increases its capacitance | has no effect | doubles its charge always
why: C ∝ A/d.

@unit Electric Circuits | Current, resistance, power, series and parallel circuits, RC circuits
@lesson Current, resistance and Ohm's law
say: Circuits put moving charge to work. Let's connect current, voltage and resistance.
key: Current I = ΔQ/Δt. Ohm's law: V = IR. Resistance R = ρL/A: longer, thinner wires and higher resistivity mean more resistance.
Power P = IV = I²R = V²/R. Batteries provide emf; real batteries have internal resistance, so terminal voltage drops when current flows.
ex: A 12 V battery drives current through a 6 Ω resistor. Find current and power.
> I = 12/6 = 2 A
= P = 2 × 12 = 24 W
Current is conserved at junctions (Kirchhoff's junction rule), and the voltage changes around any closed loop sum to zero (loop rule).
term: current = the rate of flow of charge
term: resistivity = a material property describing how strongly it resists current
term: Kirchhoff's junction rule = current into a junction equals current out
term: Kirchhoff's loop rule = voltage changes around a closed loop sum to zero
q: A wire is made twice as long. Its resistance… | *doubles | halves | quadruples | stays the same
why: R ∝ L.
q: Kirchhoff's junction rule is based on conservation of… | *charge | energy | momentum | mass
why: Charge can't pile up at a junction.
gen: stem.ohm, stem.elecPower

@lesson Series, parallel and RC circuits
say: How components are connected changes how current and voltage divide. Capacitors add time-dependent behavior.
key: Series resistors: R_eq = R₁ + R₂ (same current). Parallel resistors: 1/R_eq = 1/R₁ + 1/R₂ (same voltage). Capacitors combine the opposite way: parallel add, series add reciprocally.
Adding a resistor in parallel lowers total resistance and increases total current from the battery.
RC circuits: when charging, current starts high and decreases as the capacitor fills. After a long time, a charged capacitor acts like an open circuit (no current through its branch).
ex: Find R_eq for 6 Ω and 3 Ω in parallel.
> 1/R = 1/6 + 1/3 = 1/2
= R_eq = 2 Ω
term: equivalent resistance = a single resistance that could replace a combination
term: RC circuit = a circuit with a resistor and capacitor whose current changes over time
term: time constant = τ = RC, describing how quickly an RC circuit charges
q: Adding another bulb in parallel to a battery… | *increases total current | decreases total current | doesn't change current | dims the other bulbs always
why: Total resistance decreases.
q: Long after being connected, a capacitor in a DC circuit acts like… | *an open circuit | a short circuit | a resistor of 0 Ω | a battery
why: It's fully charged and no current flows to it.
gen: stem.series, stem.parallel

@unit Magnetism and Electromagnetism | Magnetic fields and forces, electromagnetic induction
@lesson Magnetic fields and forces
say: Moving charges create magnetic fields and feel magnetic forces. That's how motors work.
key: Force on a moving charge: F = qvB sin θ. Force on a current-carrying wire: F = ILB sin θ. Use the right-hand rule to find direction.
The magnetic force is perpendicular to velocity, so it changes direction but does no work. A charge moving perpendicular to a uniform field travels in a circle: r = mv/(qB).
A long straight wire creates a magnetic field circling it: B = μ₀I/(2πr). Parallel currents in the same direction attract.
ex: An electron and a proton enter the same magnetic field at the same speed. How do their paths differ?
> Opposite charges curve in opposite directions
= They curve opposite ways; the lighter electron curves in a much smaller circle
term: magnetic field = a field produced by moving charges that exerts forces on other moving charges
term: right-hand rule = a method for finding the direction of magnetic forces and fields
term: Lorentz force = the force on a charge moving in a magnetic field
q: Does a magnetic field do work on a moving charge? | *No | Yes, always | Only on protons | Only at high speed
why: The force is always perpendicular to motion.
q: Two parallel wires carry current in the same direction. They… | *attract | repel | don't interact | spin
why: Like currents attract.

@lesson Electromagnetic induction
say: Changing magnetic fields create electric currents. This discovery powers our entire electrical grid.
key: Magnetic flux Φ = BA cos θ. Faraday's law: emf = −NΔΦ/Δt. A changing flux induces an emf.
Lenz's law: the induced current flows to oppose the change in flux (the minus sign). Flux can change by changing B, the area, or the orientation.
A conducting rod moving through a field has motional emf = BLv.
Generators spin coils in magnetic fields; transformers change voltages using induction between coils.
ex: A loop's flux increases. Which way does the induced current flow?
> Lenz's law: the induced field must oppose the increase
= It flows in the direction that creates a field opposite to the increasing external field
term: magnetic flux = the amount of magnetic field passing through an area
term: Faraday's law = a changing magnetic flux induces an emf
term: Lenz's law = induced current opposes the change in flux that caused it
term: motional emf = the emf induced in a conductor moving through a magnetic field
q: A magnet sits still inside a coil. The induced current is… | *zero | maximum | alternating | constant but nonzero
why: Induction requires a changing flux.
q: Lenz's law is a consequence of conservation of… | *energy | charge | momentum | mass
why: Otherwise induced currents would create free energy.

@unit Geometric Optics | Reflection and mirrors, refraction and lenses
@lesson Reflection and mirrors
say: Light travels in straight lines and bounces predictably. Mirrors use this to form images.
key: Law of reflection: angle of incidence = angle of reflection. Mirror and lens equation: 1/f = 1/dₒ + 1/dᵢ. Magnification M = −dᵢ/dₒ.
Concave mirrors converge light (f > 0). Objects beyond the focal point form real, inverted images; objects inside f form virtual, upright, enlarged images. Convex mirrors always form virtual, upright, smaller images.
Ray diagrams use special rays: parallel to the axis reflects through the focal point; through the focal point reflects parallel.
ex: An object is 30 cm from a concave mirror with f = 10 cm. Where is the image?
> 1/dᵢ = 1/10 − 1/30 = 2/30
= dᵢ = 15 cm (real, inverted, half size)
term: focal length = the distance from a mirror or lens to its focal point
term: real image = an image formed where light rays actually meet; can be projected
term: virtual image = an image formed where light only appears to come from
term: magnification = the ratio of image height to object height
q: Convex mirrors always produce images that are… | *virtual, upright and smaller | real and inverted | larger | real and upright
why: They diverge light.
q: A negative image distance means the image is… | *virtual | real | inverted | larger
why: It forms behind the mirror.

@lesson Refraction and lenses
say: Light bends when it changes speed between materials. Lenses use this bending to focus light.
key: Index of refraction n = c/v. Snell's law: n₁ sin θ₁ = n₂ sin θ₂. Light bends toward the normal entering a higher-n material.
Total internal reflection occurs when light goes from high n to low n at an angle greater than the critical angle: sin θc = n₂/n₁.
Converging (convex) lenses have positive f; diverging (concave) lenses have negative f. The same thin-lens equation 1/f = 1/dₒ + 1/dᵢ applies.
ex: Light enters glass (n = 1.5) from air at 30°. Find the refraction angle.
> 1.0 sin 30° = 1.5 sin θ₂
> sin θ₂ = 0.333
= θ₂ ≈ 19.5°
term: index of refraction = the ratio of light's speed in a vacuum to its speed in a material
term: Snell's law = n₁ sin θ₁ = n₂ sin θ₂
term: critical angle = the incidence angle beyond which total internal reflection occurs
term: converging lens = a lens that bends parallel rays to meet at a focal point
q: Light entering a material with a higher index of refraction bends… | *toward the normal | away from the normal | not at all | backward
why: It slows down.
q: Total internal reflection can happen when light goes from… | *glass to air | air to glass | air to water | vacuum to glass
why: It requires going to a lower index.

@unit Waves, Sound and Physical Optics | Wave properties, sound, interference and diffraction of light
@lesson Waves and sound
say: Waves carry energy without carrying matter. Sound waves show these properties clearly.
key: v = fλ. Wave speed depends on the medium, not the frequency. Sound is a longitudinal mechanical wave; it travels faster in solids than in gases.
Standing waves form from interference of reflected waves. On a string fixed at both ends, λ = 2L/n. Open pipes support all harmonics; closed pipes (closed at one end) support only odd harmonics: λ = 4L/n for odd n.
Doppler effect: a source moving toward you sounds higher in frequency; moving away, lower.
Beats occur when two close frequencies interfere: f_beat = |f₁ − f₂|.
ex: Two tuning forks at 440 Hz and 444 Hz sound together. What do you hear?
> Beat frequency = |440 − 444|
= 4 beats per second
term: standing wave = a wave pattern with fixed nodes and antinodes formed by interference
term: harmonic = a whole-number multiple of the fundamental frequency
term: beat frequency = the frequency of loudness variation between two close tones
term: Doppler effect = a change in observed frequency due to relative motion
q: A wave's frequency doubles in the same medium. Its wavelength… | *halves | doubles | stays the same | quadruples
why: v is fixed, so λ ∝ 1/f.
q: A pipe closed at one end supports… | *only odd harmonics | only even harmonics | all harmonics | no harmonics
why: It must have a node at the closed end and an antinode at the open end.
gen: stem.wave

@lesson Interference and diffraction of light
say: Light behaves as a wave when it passes through slits. Interference patterns proved it.
key: Double-slit interference: bright fringes where d sin θ = mλ. The fringe spacing on a screen is about Δy = λL/d.
Path difference determines interference: whole wavelengths give constructive interference (bright); half wavelengths give destructive (dark).
Single-slit diffraction spreads light, with a wide central maximum. Diffraction gratings with many slits make sharp, widely separated bright lines.
Thin-film interference (soap bubbles, oil slicks) comes from light reflecting off both surfaces of a film; reflections off higher-n surfaces shift phase by half a wavelength.
ex: In a double-slit setup, what happens to the fringes if the slits move closer together?
> Δy = λL/d, so smaller d gives larger Δy
= The fringes spread farther apart
term: interference = the combination of overlapping waves
term: diffraction = the spreading of waves around obstacles or through openings
term: path difference = the difference in distance traveled by two waves
term: diffraction grating = a surface with many slits that produces sharp interference lines
q: Bright fringes occur where the path difference is… | *a whole number of wavelengths | half a wavelength | zero only | random
why: Waves arrive in phase.
q: Using red light instead of blue in a double-slit experiment makes the fringes… | *farther apart | closer together | disappear | the same
why: Red has a longer wavelength.

@unit Modern Physics | Quantum effects, atomic spectra, nuclear physics
@lesson Photons and the photoelectric effect
say: Around 1900, experiments showed that light comes in packets and matter behaves like waves. Welcome to quantum physics.
key: Photon energy E = hf = hc/λ. In the photoelectric effect, K_max = hf − φ, where φ is the work function.
Increasing light intensity increases the number of ejected electrons but not their maximum kinetic energy. Below the threshold frequency, no electrons are ejected, no matter how bright the light.
Matter has wave properties too: de Broglie wavelength λ = h/p. Electron diffraction confirmed this.
Atoms have discrete energy levels; electrons emit or absorb photons when they jump between levels, producing line spectra unique to each element.
ex: A metal has φ = 2.0 eV. Light with photon energy 5.0 eV hits it. Find K_max.
> K_max = 5.0 − 2.0
= 3.0 eV
term: photon = a quantum of electromagnetic energy, E = hf
term: work function = the minimum energy needed to remove an electron from a metal
term: threshold frequency = the minimum frequency of light that ejects electrons
term: de Broglie wavelength = the wavelength of a moving particle, h/p
q: Brighter light (same frequency) in the photoelectric effect causes… | *more electrons ejected, same max energy | faster electrons | no change | fewer electrons
why: Intensity changes the number of photons, not their energy.
q: An atom emits light when an electron… | *drops to a lower energy level | absorbs a photon | leaves the nucleus | stays still
why: The energy difference becomes a photon.
gen: bank.PHYS.modern

@lesson Nuclear physics
say: The nucleus holds enormous energy. Nuclear reactions convert tiny amounts of mass into huge amounts of energy.
key: E = mc². The mass defect (mass of separate nucleons minus the nucleus's mass) corresponds to the binding energy holding the nucleus together.
Radioactive decay:
- Alpha: emits a helium nucleus (mass number −4, atomic number −2).
- Beta-minus: a neutron becomes a proton, emitting an electron and antineutrino (atomic number +1).
- Gamma: emits high-energy photons with no change in particles.
Conservation laws hold in nuclear reactions: charge, nucleon number, energy and momentum.
Fission splits heavy nuclei; fusion combines light nuclei. Both release energy because the products are more tightly bound.
ex: Uranium-238 (Z = 92) undergoes alpha decay. What nucleus results?
> Mass number 238 − 4 = 234; Z = 92 − 2 = 90
= Thorium-234
term: mass defect = the difference between the mass of separate nucleons and the mass of the nucleus
term: binding energy = the energy needed to separate a nucleus into its nucleons
term: alpha decay = emission of a helium nucleus from an unstable nucleus
term: beta decay = a neutron changing into a proton while emitting an electron
q: In beta-minus decay, the atomic number… | *increases by 1 | decreases by 1 | decreases by 2 | stays the same
why: A neutron becomes a proton.
q: Why do fission and fusion release energy? | *The products have greater binding energy per nucleon | Mass increases | Electrons are destroyed | Charge isn't conserved
why: Some mass is converted to energy.
gen: chem.halfLife
`;
