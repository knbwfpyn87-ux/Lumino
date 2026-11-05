export default String.raw`
@course univ-physics | University Physics (College) | College | 🪐 | College

// Follows a standard calculus-based university physics sequence (OpenStax University Physics Volumes 1–3): mechanics, energy and momentum, rotation and oscillations, electricity and magnetism, and modern physics.

@unit Mechanics | Kinematics, Newton's laws, energy and momentum
@lesson Kinematics and Newton's laws
say: Mechanics describes how things move and why. Calculus makes it precise.
key: Velocity v = dx/dt and acceleration a = dv/dt. For constant acceleration: v = v₀ + at, x = x₀ + v₀t + ½at², v² = v₀² + 2aΔx. Projectiles: horizontal velocity is constant; vertical acceleration is −g (9.8 m/s²).
Newton's laws: (1) inertia; (2) F_net = ma (vector sum of forces); (3) equal and opposite force pairs. Draw free-body diagrams.
Forces: weight mg, normal force, tension, friction (f_s ≤ μ_sN, f_k = μ_kN), springs F = −kx. Uniform circular motion: a = v²/r toward the center.
ex: A 5 kg box is pulled with 30 N on a surface with friction force 10 N. Find its acceleration.
> F_net = 30 − 10 = 20 N
> a = 20 ÷ 5
= 4 m/s²
lab: Atwood machine
aim: Hang two masses over a light pulley and measure the acceleration.
set: m2 = 1.2 | Heavier mass (kg) | 1 to 3 by 0.05
set: m1 = 1 | Lighter mass (kg) | 0.5 to 1 by 0.05
out: a = (m2 - m1)*g/(m1 + m2) | Acceleration (m/s²)
out: T = 2*m1*m2*g/(m1 + m2) | String tension (N)
plot: m2, a
step: Record the acceleration for 5 values of the heavier mass.
step: Use your data to estimate g.
noise: 3
result: a = (m₂ − m₁)g/(m₁ + m₂): only the difference in weight drives the system, but both masses must be accelerated. With nearly equal masses the motion is slow enough to time, which is how Atwood measured g.
term: acceleration = the rate of change of velocity
term: free-body diagram = a sketch showing all forces on one object
term: kinetic friction = the force opposing sliding, μ_kN
term: centripetal acceleration = v²/r, directed toward the center of a circle
q: A ball is dropped from rest. After 2 s its speed is about… | *19.6 m/s | 9.8 m/s | 4.9 m/s | 39.2 m/s
why: v = gt.
q: A car rounding a curve at constant speed is… | *accelerating toward the center | not accelerating | accelerating outward | in equilibrium
why: Its direction changes.
gen: stem.kinematics, stem.newton2, stem.freefall

@lesson Work, energy and momentum
say: Energy and momentum are conserved, which makes many hard problems simple.
key: Work W = ∫F·dx (= Fd cos θ for constant force). Kinetic energy K = ½mv²; the work–energy theorem: W_net = ΔK. Potential energy: gravitational U = mgh, spring U = ½kx². With only conservative forces, mechanical energy is conserved. Power P = dW/dt.
Momentum p = mv; impulse J = FΔt = Δp. In isolated systems total momentum is conserved. Elastic collisions also conserve kinetic energy; inelastic ones don't (perfectly inelastic: objects stick together).
ex: A 2 kg cart at 3 m/s hits and sticks to a 1 kg cart at rest. Find the final speed.
> Momentum: 2 × 3 = (2 + 1)v
= v = 2 m/s
term: work–energy theorem = net work equals the change in kinetic energy
term: conservative force = a force whose work doesn't depend on path
term: impulse = force times time, equal to change in momentum
term: elastic collision = a collision conserving kinetic energy
q: Doubling speed multiplies kinetic energy by… | *4 | 2 | 8 | 1
why: K ∝ v².
q: In a perfectly inelastic collision, what is conserved? | *Momentum | Kinetic energy | Both | Neither
why: KE is lost to deformation and heat.
gen: stem.work, stem.kinetic, stem.momentum, stem.potential

@unit Rotation, Oscillations and Waves | Torque, angular momentum, simple harmonic motion, waves
@lesson Rotation and gravitation
say: Spinning objects follow rules parallel to straight-line motion.
key: Angular quantities: θ, ω = dθ/dt, α = dω/dt; v = rω. Torque τ = rF sin θ; τ_net = Iα, where moment of inertia I = Σmr² depends on mass distribution. Rotational KE = ½Iω². Angular momentum L = Iω is conserved without external torque (a skater pulling in arms spins faster).
Gravitation: F = Gm₁m₂/r². Orbits: circular orbital speed v = √(GM/r); Kepler's third law T² ∝ r³. Gravitational potential energy U = −GMm/r.
term: torque = the rotational effect of a force, rF sin θ
term: moment of inertia = resistance to angular acceleration
term: angular momentum = Iω, conserved without external torque
term: Kepler's third law = the square of the orbital period is proportional to the cube of the orbit radius
tip: Every linear formula has a rotational twin: swap x for θ, v for ω, a for α, m for I, F for τ, and p for L.
q: A skater pulls in her arms. Her angular speed… | *increases | decreases | stays the same | becomes zero
why: I drops, L is conserved.
q: Doubling the distance between two masses makes gravity… | *1/4 as strong | 1/2 as strong | twice as strong | unchanged
why: Inverse-square law.

@lesson Oscillations and waves
say: Springs, pendulums, sound and light all share the mathematics of oscillation.
key: Simple harmonic motion: x(t) = A cos(ωt + φ). For a mass on a spring ω = √(k/m), T = 2π√(m/k); for a small-angle pendulum T = 2π√(L/g). Energy sloshes between kinetic and potential.
Waves: v = fλ. Transverse versus longitudinal. Wave speed on a string v = √(T/μ). Superposition gives interference: constructive (in phase) and destructive. Standing waves on a string: λ = 2L/n. Doppler effect: approaching sources sound higher.
ex: A wave has frequency 50 Hz and wavelength 4 m. Find its speed.
> v = fλ = 50 × 4
= 200 m/s
lab: Driven oscillator and resonance
aim: Drive a mass on a spring (natural frequency 10 rad/s) at different frequencies and measure the amplitude.
set: w = 8 | Driving frequency (rad/s) | 1 to 20 by 0.25
set: b = 1 | Damping (kg/s) | 0.2 to 5 by 0.1
out: A = 10/sqrt((100 - w^2)^2 + (b*w)^2) | Amplitude (m)
plot: w, A
step: Record the amplitude at 6 driving frequencies.
step: Increase the damping and compare the peak.
noise: 2
result: The amplitude peaks sharply when the driving frequency matches the natural frequency: resonance. More damping lowers and widens the peak. Engineers add damping so bridges and buildings don't resonate.
term: simple harmonic motion = oscillation with restoring force proportional to displacement
term: period = the time for one complete cycle
term: standing wave = a wave pattern with fixed nodes and antinodes
term: Doppler effect = the change in observed frequency due to relative motion
q: Quadrupling the mass on a spring makes the period… | *double | quadruple | halve | unchanged
why: T ∝ √m.
q: Two waves meeting crest to crest produce… | *constructive interference | destructive interference | refraction | diffraction only
why: Amplitudes add.
gen: stem.wave

@unit Electricity, Magnetism and Modern Physics | Fields, circuits, induction, quantum and relativity
@lesson Electric fields and circuits
say: Electric charges create fields, and moving charges make circuits work.
key: Coulomb's law F = kq₁q₂/r². Electric field E = F/q; potential V = U/q, with E = −dV/dx. Gauss's law relates flux to enclosed charge. Capacitance C = Q/V; energy stored ½CV².
Circuits: current I = dQ/dt, Ohm's law V = IR, power P = IV = I²R. Series resistors add; parallel resistors combine as 1/R = 1/R₁ + 1/R₂. Kirchhoff's rules: the junction rule (charge conservation) and the loop rule (energy conservation). RC circuits charge with time constant τ = RC.
ex: Find the equivalent resistance of 6 Ω and 3 Ω in parallel.
> 1/R = 1/6 + 1/3 = 1/2
= 2 Ω
lab: Battery internal resistance
aim: Connect different load resistors to a 9 V battery with 1.5 Ω internal resistance and measure the terminal voltage and power.
set: Rl = 5 | Load resistance (Ω) | 0.1 to 20 by 0.1
set: r = 1.5 | Internal resistance (Ω) | 0.5 to 5 by 0.5
out: I = 9/(Rl + r) | Current (A)
out: V = 9 - I*r | Terminal voltage (V)
out: P = I^2*Rl | Power to load (W)
plot: Rl, P
step: Record the voltage and power for at least 6 loads.
step: Find the load that receives the most power.
noise: 2
result: The terminal voltage drops below the emf as current flows (V = ε − Ir). Power delivered to the load is greatest when the load resistance equals the internal resistance (maximum power transfer).
term: electric field = force per unit charge
term: capacitance = charge stored per volt
term: Kirchhoff's loop rule = voltages around any closed loop sum to zero
term: time constant = τ = RC, the charging time scale of an RC circuit
q: Two 10 Ω resistors in series give… | *20 Ω | 5 Ω | 10 Ω | 100 Ω
why: Series resistances add.
q: A 12 V battery drives 2 A. The power is… | *24 W | 6 W | 14 W | 10 W
why: P = IV.
gen: stem.ohm, stem.parallel, stem.series, stem.elecPower

@lesson Magnetism, induction and modern physics
say: Magnetism and electricity are one force, and at small scales classical physics gives way to quantum rules.
key: Magnetic force on a charge F = qv × B and on a wire F = IL × B. Currents create magnetic fields (Ampère's law). Faraday's law: a changing magnetic flux induces an emf, ε = −dΦ/dt; Lenz's law gives the direction opposing the change. This drives generators and transformers. Maxwell's equations unify E and B; light is an electromagnetic wave.
Modern physics: photon energy E = hf; the photoelectric effect shows light comes in quanta. Matter has wavelength λ = h/p. Atoms have discrete energy levels. Special relativity: time dilation, length contraction, E = mc². Nuclear decay follows half-lives.
term: Faraday's law = a changing magnetic flux induces an emf
term: Lenz's law = induced current opposes the change that produced it
term: photoelectric effect = light ejecting electrons, showing light's particle nature
term: time dilation = moving clocks run slow relative to a stationary observer
q: Moving a magnet faster into a coil makes the induced emf… | *larger | smaller | zero | reversed only
why: Flux changes faster.
q: Increasing light frequency increases photoelectron… | *maximum kinetic energy | number only | charge | mass
why: E = hf − work function.
gen: bank.PHYS.modern, bank.PHYS.electricity
`;
