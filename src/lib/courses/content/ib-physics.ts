export default String.raw`
@course ib-physics | IB Physics | IB | 🔭 | IB

// Follows the five themes of the IB Physics guide (first assessment 2025): A Space, time and motion; B The particulate nature of matter; C Wave behaviour; D Fields; E Nuclear and quantum physics.

@unit A: Space, Time and Motion | Kinematics, forces and momentum, work, energy and power, rigid bodies (HL), relativity (HL)
@lesson Kinematics, forces and momentum
say: IB Physics Theme A covers motion: how things move and why. It's the foundation for everything else.
key: Kinematics (SUVAT for constant acceleration): v = u + at, s = ut + ½at², v² = u² + 2as, s = ½(u + v)t. Projectiles: horizontal and vertical motion are independent.
Newton's laws: F = ma (more generally F = Δp/Δt). Momentum p = mv is conserved in isolated systems. Impulse = FΔt = Δp.
Circular motion: centripetal acceleration a = v²/r = ω²r toward the center.
ex: A car accelerates from 10 m/s to 25 m/s in 5 s. Find its acceleration and displacement.
> a = (25 − 10)/5 = 3 m/s²
= s = ½(10 + 25)(5) = 87.5 m
lab: Ball rolling off a table
aim: Roll a ball off a bench at different speeds and measure where it lands.
set: v = 2 | Launch speed (m/s) | 0.5 to 6 by 0.1
set: h = 1 | Bench height (m) | 0.5 to 2 by 0.1
out: t = sqrt(2*h/g) | Time in the air (s)
out: x = v*t | Horizontal distance (m)
plot: v, x
step: Record the landing distance for 5 launch speeds at a fixed height.
step: Change the height. Does the time in the air depend on the speed?
noise: 3
result: Horizontal and vertical motion are independent. The time in the air depends only on the height (t = √(2h/g)), so the landing distance is directly proportional to launch speed.
term: SUVAT equations = kinematic equations for constant acceleration
term: momentum = mass times velocity, conserved in isolated systems
term: impulse = force times time, equal to the change in momentum
term: centripetal acceleration = acceleration toward the center of a circular path
q: A 2 kg ball moving at 3 m/s has momentum… | *6 kg m/s | 1.5 kg m/s | 5 kg m/s | 18 kg m/s
why: p = mv.
q: In projectile motion (no air resistance), horizontal velocity… | *stays constant | increases | decreases | is zero
why: No horizontal force acts.
gen: stem.kinematics, stem.momentum, stem.newton2

@lesson Work, energy, power and relativity
say: Energy is conserved, but it changes form. And at very high speeds, Einstein's relativity takes over.
key: Work W = Fs cos θ. Kinetic energy Eₖ = ½mv² = p²/2m. Gravitational potential energy ΔEₚ = mgΔh. Elastic potential energy Eₕ = ½kx². Power P = W/t = Fv. Efficiency = useful output/input.
Energy is conserved in isolated systems; friction transfers energy to thermal energy.
HL adds rigid body mechanics (torque, moment of inertia, angular momentum) and special relativity: time dilation, length contraction and the invariance of the speed of light.
ex: A 60 kg runner climbs 10 m of stairs in 12 s. Find her power output.
> ΔEₚ = 60 × 9.8 × 10 = 5,880 J
= P = 5,880/12 = 490 W
term: work = force times displacement in the direction of the force
term: power = the rate of doing work
term: efficiency = the ratio of useful energy output to total energy input
term: time dilation = the slowing of time for objects moving at relativistic speeds
q: A machine uses 200 J to do 150 J of useful work. Efficiency? | *75% | 150% | 25% | 50%
why: 150/200.
q: If speed doubles, kinetic energy… | *quadruples | doubles | halves | stays the same
why: Eₖ ∝ v².
gen: stem.kinetic, stem.potential, stem.power

@unit B: The Particulate Nature of Matter | Thermal energy transfers, greenhouse effect, gas laws, thermodynamics (HL), current and circuits
@lesson Thermal physics and the greenhouse effect
say: Theme B explains matter in terms of particles: heat, temperature, gases and even Earth's climate.
key: Temperature measures average kinetic energy of particles. Specific heat capacity: Q = mcΔT. Specific latent heat (phase changes): Q = mL.
Heat transfer: conduction, convection and radiation. A black body emits radiation with power P = σAT⁴ (Stefan–Boltzmann law); Wien's law: λₘₐₓT = 2.9 × 10⁻³ m K.
The greenhouse effect: Earth absorbs short-wavelength solar radiation and emits infrared; greenhouse gases absorb and re-emit infrared, warming the surface. Albedo is the fraction of radiation reflected.
Ideal gas law: pV = nRT. Kinetic theory links pressure to particle collisions.
lab: Specific heat capacity of a metal block
aim: Heat a 1 kg metal block with a 50 W immersion heater and record its temperature.
set: t = 120 | Time (s) | 0 to 600 by 10
set: c = 900 | Specific heat capacity (J/kg·K) | 380 to 2000 by 10
out: T = 20 + 50*t/(1*c) | Temperature (°C)
plot: t, T
step: Record the temperature every 100 s for aluminum (900 J/kg·K).
step: Switch to copper (385) and compare the slope.
noise: 2
result: The temperature rises linearly; the slope equals P/(mc), so c = P/(m × slope). Real results come out a little high because some heat escapes to the surroundings, so the block is insulated.
term: specific heat capacity = energy needed to raise 1 kg of a substance by 1 K
term: latent heat = energy absorbed or released during a phase change without temperature change
term: albedo = the fraction of incoming radiation reflected by a surface
term: black body = an ideal object that absorbs and emits all radiation
q: Energy to melt ice at 0°C goes into… | *latent heat (breaking bonds) | raising temperature | kinetic energy only | radiation
why: Temperature stays constant during melting.
q: A higher albedo surface (like snow)… | *reflects more radiation | absorbs more radiation | is darker | emits more infrared
why: Albedo is reflectivity.
gen: chem.specificHeat, chem.idealGas

@lesson Current and circuits
say: Electric circuits are also part of Theme B, since current is the flow of charged particles.
key: Current I = ΔQ/Δt. Potential difference V = W/q. Resistance R = V/I; resistivity R = ρL/A. Power P = IV = I²R = V²/R.
Series circuits: same current, voltages add, R = R₁ + R₂. Parallel circuits: same voltage, currents add, 1/R = 1/R₁ + 1/R₂.
Cells have emf ε and internal resistance r: ε = I(R + r). Ohmic conductors follow V ∝ I at constant temperature; filament lamps and diodes are non-ohmic.
ex: A 12 V battery with internal resistance 1 Ω drives a 5 Ω resistor. Find the current.
> I = ε/(R + r) = 12/6
= 2 A
term: emf = the energy per unit charge supplied by a source
term: internal resistance = resistance inside a cell that reduces terminal voltage
term: resistivity = a material property used to calculate resistance
term: ohmic conductor = a conductor whose current is proportional to voltage at constant temperature
q: Two 4 Ω resistors in parallel have total resistance… | *2 Ω | 8 Ω | 4 Ω | 16 Ω
why: 1/R = 1/4 + 1/4.
q: Increasing a wire's length increases its… | *resistance | current | emf | cross-sectional area
why: R ∝ L.
gen: stem.ohm, stem.series, stem.parallel

@unit C: Wave Behaviour | Simple harmonic motion, wave model, wave phenomena, standing waves, Doppler effect
@lesson Simple harmonic motion and waves
say: Theme C covers oscillations and waves, from pendulums to sound and light.
key: Simple harmonic motion: acceleration is proportional to displacement and opposite in direction: a = −ω²x. Period of a pendulum T = 2π√(l/g); mass on a spring T = 2π√(m/k).
Waves transfer energy without transferring matter. v = fλ. Transverse waves oscillate perpendicular to travel; longitudinal waves oscillate parallel (sound).
Electromagnetic waves travel at c = 3.00 × 10⁸ m/s in a vacuum and can be polarized (transverse only).
ex: A wave has frequency 500 Hz and wavelength 0.68 m. Find its speed.
> v = fλ = 500 × 0.68
= 340 m/s
term: simple harmonic motion = oscillation where acceleration is proportional and opposite to displacement
term: wavelength = the distance between consecutive crests
term: polarization = restricting a transverse wave's oscillations to one plane
term: longitudinal wave = a wave oscillating parallel to its direction of travel
q: Doubling a pendulum's length changes its period by a factor of… | *√2 | 2 | 4 | 1/2
why: T ∝ √l.
q: Which waves can be polarized? | *Transverse waves | Longitudinal waves | Sound waves | All waves
why: Polarization requires transverse oscillation.
gen: stem.wave

@lesson Wave phenomena and the Doppler effect
say: Waves reflect, refract, diffract and interfere. These behaviors explain rainbows, echoes and radar.
key: Snell's law: n₁ sin θ₁ = n₂ sin θ₂. Total internal reflection occurs above the critical angle. Diffraction is greatest when the gap is similar to the wavelength.
Interference: constructive when path difference = nλ; destructive when path difference = (n + ½)λ. Double-slit fringe spacing s = λD/d.
Standing waves form from two waves traveling in opposite directions, creating nodes and antinodes. On a string, λ = 2L/n.
Doppler effect: a moving source or observer changes the observed frequency; approaching raises it, receding lowers it. It's used in radar speed guns and to measure redshift of galaxies.
lab: Doppler effect with a moving speaker
aim: Move a speaker playing a steady note toward or away from a microphone and measure the frequency received.
set: vs = 30 | Source speed (m/s, + toward you) | -100 to 100 by 5
set: f = 440 | Emitted frequency (Hz) | 200 to 1000 by 10
out: fo = f*343/(343 - vs) | Observed frequency (Hz)
plot: vs, fo
step: Record the observed frequency for sources approaching and receding.
noise: 0.5
result: An approaching source compresses the waves (higher pitch); a receding source stretches them (lower pitch): f′ = f·v/(v − vₛ). The same effect shifts light from distant galaxies to the red, showing the universe is expanding.
term: Snell's law = n₁ sin θ₁ = n₂ sin θ₂
term: diffraction = the spreading of waves through gaps or around obstacles
term: standing wave = a wave pattern with fixed nodes and antinodes
term: Doppler effect = a change in observed frequency due to relative motion
q: Constructive interference happens when the path difference is… | *a whole number of wavelengths | half a wavelength | zero only | random
why: Waves arrive in phase.
q: Light from a galaxy moving away from Earth is… | *redshifted | blueshifted | unchanged | polarized
why: The source is receding.

@unit D: Fields | Gravitational fields, electric and magnetic fields, motion in fields, induction (HL)
@lesson Gravitational and electric fields
say: Theme D describes forces that act at a distance through fields: gravity, electricity and magnetism.
key: Newton's law of gravitation: F = GMm/r². Gravitational field strength g = GM/r². Orbital speed v = √(GM/r). Kepler's third law: T² ∝ r³.
Coulomb's law: F = kq₁q₂/r². Electric field strength E = F/q; between parallel plates E = V/d.
Field lines show direction and strength (closer lines = stronger field).
HL adds gravitational and electric potential and potential energy, escape velocity and equipotentials.
ex: If the distance between two masses triples, how does the gravitational force change?
> F ∝ 1/r²
= It becomes 1/9 as strong
lab: Satellite orbits
aim: Place a satellite at different distances from Earth's center and calculate its orbital period and speed.
set: r = 7 | Orbit radius (thousand km) | 6.6 to 45 by 0.1
out: T = 2*pi*sqrt((r*1e6)^3/(6.674e-11*5.97e24))/3600 | Period (hours)
out: v = sqrt(6.674e-11*5.97e24/(r*1e6))/1000 | Orbital speed (km/s)
plot: r, T
step: Record the period at 5 radii, including the International Space Station (6.8).
step: Find the radius where the period is 24 hours.
noise: 0.5
result: T² ∝ r³ (Kepler's third law). The ISS circles in about 90 minutes; at 42,200 km the period is 24 hours, a geostationary orbit that stays above one point on Earth.
term: gravitational field strength = the force per unit mass at a point
term: Coulomb's law = F = kq₁q₂/r² for point charges
term: electric field strength = the force per unit charge at a point
term: Kepler's third law = T² is proportional to r³ for orbits
q: Doubling both charges changes the electric force by a factor of… | *4 | 2 | 1/4 | 8
why: F ∝ q₁q₂.
q: The field between parallel charged plates is… | *uniform | zero | radial | circular
why: E = V/d is constant between the plates.
gen: bank.PHYS.forces

@lesson Magnetic fields and induction
say: Moving charges create magnetic fields and feel magnetic forces. Changing fields induce currents.
key: Force on a moving charge: F = qvB sin θ. Force on a current-carrying wire: F = BIL sin θ. Charged particles in uniform magnetic fields move in circles: r = mv/(qB).
Magnetic fields around wires and solenoids follow the right-hand grip rule.
HL: electromagnetic induction. Magnetic flux Φ = BA cos θ. Faraday's law: ε = −N ΔΦ/Δt. Lenz's law: the induced current opposes the change that caused it. Generators and transformers rely on induction.
ex: A proton moves at 2 × 10⁶ m/s perpendicular to a 0.5 T field. Is the force on it doing work?
> The magnetic force is perpendicular to velocity
= No; it changes direction but not speed
term: magnetic flux = the product of magnetic field and area, BA cos θ
term: Faraday's law = induced emf equals the rate of change of flux linkage
term: Lenz's law = an induced current opposes the change that caused it
term: solenoid = a coil of wire that produces a magnetic field when current flows
q: A charge moving parallel to a magnetic field experiences… | *no magnetic force | maximum force | a circular path | double force
why: sin 0° = 0.
q: Lenz's law follows from conservation of… | *energy | charge | momentum | mass
why: Otherwise energy would be created.
gen: bank.PHYS.electricity

@unit E: Nuclear and Quantum Physics | Structure of the atom, quantum physics (HL), radioactive decay, fission and fusion
@lesson Atoms, quantum ideas and radioactivity
say: Theme E explores the atom and nucleus, where classical physics breaks down.
key: Atomic spectra show discrete energy levels: a photon's energy E = hf equals the difference between levels. The photoelectric effect (HL) shows light's particle nature: Eₖmax = hf − Φ.
Radioactive decay is random and spontaneous. Alpha (helium nucleus), beta-minus (electron and antineutrino), beta-plus (positron and neutrino) and gamma (photon) decay. Half-life is the time for half the nuclei to decay. Activity A = λN.
ex: A sample has a half-life of 3 days. What fraction remains after 9 days?
> 9 days = 3 half-lives
= (1/2)³ = 1/8
lab: Gamma rays and distance
aim: Move a Geiger counter away from a gamma source and measure the count rate.
set: d = 10 | Distance (cm) | 5 to 50 by 1
set: A = 20000 | Source strength | 5000 to 50000 by 1000
out: C = A/d^2 + 20 | Count rate (counts/min, including 20 background)
plot: d, C
step: First measure the background count (about 20 per minute).
step: Record the count rate at 5 distances and subtract the background.
noise: 5
result: Gamma intensity follows an inverse-square law: doubling the distance cuts the corrected count rate to a quarter. Distance is one of the best protections from radiation.
term: photon = a quantum of electromagnetic radiation with energy hf
term: half-life = the time for half the radioactive nuclei to decay
term: activity = the number of decays per second
term: photoelectric effect = the emission of electrons from a metal when light shines on it
q: In beta-minus decay, a neutron becomes… | *a proton | an alpha particle | a photon | a positron
why: Charge is conserved by emitting an electron.
q: An electron drops to a lower energy level. It… | *emits a photon | absorbs a photon | gains mass | becomes a neutron
why: The energy difference leaves as light.
gen: chem.halfLife, bank.PHYS.modern

@lesson Fission, fusion and stars
say: Nuclear reactions power reactors and stars by converting mass into energy.
key: E = mc². The mass defect (difference between the mass of separate nucleons and the nucleus) equals the binding energy divided by c². Binding energy per nucleon peaks near iron-56, so fission of heavy nuclei and fusion of light nuclei both release energy.
Fission: a neutron splits uranium-235 into smaller nuclei and more neutrons, allowing a chain reaction. Reactors use moderators (slow neutrons), control rods (absorb neutrons) and coolant.
Fusion powers stars. A star's life cycle depends on its mass; the Hertzsprung–Russell diagram plots luminosity against temperature.
term: mass defect = the difference between the mass of separate nucleons and the mass of the nucleus
term: binding energy = the energy needed to separate a nucleus into its nucleons
term: chain reaction = a self-sustaining series of fission reactions
term: Hertzsprung–Russell diagram = a plot of star luminosity against surface temperature
q: Which nucleus has the highest binding energy per nucleon? | *Iron-56 | Uranium-235 | Hydrogen-1 | Helium-4
why: The curve peaks near iron.
q: Control rods in a reactor… | *absorb neutrons to control the chain reaction | slow neutrons | cool the core | produce fuel
why: Fewer neutrons means fewer fissions.
`;
