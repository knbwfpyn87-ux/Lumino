export default String.raw`
@course ap-physc | AP Physics C: Mechanics | AP | 🛰️ | Science

// Follows the 7 units of the revised AP Physics C: Mechanics framework (2024–25 onward). Calculus-based.

@unit Kinematics | Motion with calculus, vectors and projectiles
@lesson Kinematics with calculus
say: Physics C uses calculus to describe motion exactly, even when acceleration isn't constant.
key: v(t) = dx/dt and a(t) = dv/dt. Going backward: x(t) = x₀ + ∫ v dt and v(t) = v₀ + ∫ a dt.
The constant-acceleration equations are special cases. When acceleration changes with time, integrate.
ex: a(t) = 6t m/s² and v(0) = 2 m/s. Find v(t) and v(3).
> v(t) = 2 + ∫₀ᵗ 6t dt = 2 + 3t²
= v(3) = 29 m/s
Displacement is the integral of velocity; distance traveled is the integral of speed |v|. On graphs, slope and area still give derivatives and integrals.
term: instantaneous velocity = the derivative of position with respect to time
term: instantaneous acceleration = the derivative of velocity with respect to time
term: displacement = the integral of velocity over a time interval
q: x(t) = 4t³ − 2t. What is v(t)? | *12t² − 2 | 4t² − 2 | 12t − 2 | t⁴ − t²
why: Differentiate each term.
q: The area under an acceleration–time graph gives… | *change in velocity | position | jerk | force
why: Integrating acceleration gives Δv.
gen: stem.kinematics, stem.derivAt

@lesson Vectors and projectile motion
say: In two dimensions, treat each direction separately and use vectors to combine them.
key: Position, velocity and acceleration are vectors: r(t) = x(t)î + y(t)ĵ, v = dr/dt, a = dv/dt.
For projectiles, aₓ = 0 and a_y = −g. The horizontal and vertical motions are independent but share the same time.
Relative velocity: v_A relative to C = v_A relative to B + v_B relative to C.
ex: A ball is launched at 20 m/s at 30° above horizontal from level ground. Find its time of flight.
> v_y0 = 20 sin 30° = 10 m/s
> Lands when y = 0: t = 2v_y0/g = 20/9.8
= about 2.04 s
term: position vector = a vector from the origin to an object's location
term: relative velocity = the velocity of an object as measured from a moving reference frame
term: projectile = an object moving only under gravity
q: For a projectile, the horizontal acceleration is… | *zero | g | −g | changing
why: Only gravity acts, vertically.
q: Which launch angle gives maximum range on level ground (no air)? | *45° | 30° | 60° | 90°
why: R ∝ sin 2θ, maximized at 45°.

@unit Force and Translational Dynamics | Newton's laws, friction, drag and variable forces, circular motion, gravitation
@lesson Newton's laws, friction and drag
say: Newton's second law becomes a differential equation when forces depend on velocity. That's Physics C's specialty.
key: ΣF = ma = m dv/dt. For systems, the center of mass accelerates according to the net external force.
Friction: f_k = μ_kN; static friction up to μ_sN.
Resistive (drag) forces like F = −bv lead to differential equations: m dv/dt = mg − bv. The object approaches terminal velocity v_T = mg/b, with v(t) = v_T(1 − e^(−bt/m)).
ex: A 2 kg ball falls with drag F = −0.5v. What is its terminal velocity?
> At terminal velocity, mg = bv
> v_T = (2 × 9.8)/0.5
= 39.2 m/s
term: terminal velocity = the constant speed reached when drag balances gravity
term: drag force = a resistive force opposing motion through a fluid
term: center of mass = the point that moves as if all the system's mass were concentrated there
q: At terminal velocity, the net force is… | *zero | mg | maximum | bv only
why: Drag balances weight.
q: With linear drag F = −bv, velocity approaches terminal velocity… | *exponentially | linearly | instantly | never
why: The solution has an e^(−bt/m) term.
gen: stem.newton2

@lesson Circular motion and gravitation
say: Circular motion and gravity combine in orbits. Calculus lets us handle them precisely.
key: Centripetal acceleration a_c = v²/r = ω²r toward the center. If speed changes, there's also tangential acceleration dv/dt.
Universal gravitation: F = Gm₁m₂/r². Gravitational field g = GM/r². Gravitational potential energy U = −Gm₁m₂/r (zero at infinity).
Orbits: for circular orbits, GMm/r² = mv²/r, so v = √(GM/r). Escape speed: v_esc = √(2GM/R). Kepler's third law: T² ∝ r³.
ex: Why is gravitational potential energy U = −GMm/r negative?
> U = −GMm/r is zero at infinity and decreases as objects get closer
= Bound objects have negative total energy; escaping requires raising total energy to zero
term: centripetal acceleration = acceleration toward the center of a circular path
term: gravitational potential energy = U = −GMm/r for two masses
term: escape speed = the minimum speed needed to escape a body's gravity
term: Kepler's third law = the square of the orbital period is proportional to the cube of the orbit radius
q: If orbit radius quadruples, the period… | *increases by a factor of 8 | quadruples | doubles | stays the same
why: T² ∝ r³: T ∝ r^(3/2) = 8.
q: An object with negative total mechanical energy in orbit is… | *bound | escaping | at rest | moving at light speed
why: Escape requires E ≥ 0.

@unit Work, Energy and Power | Work by variable forces, potential energy and force, conservation, power
@lesson Work by variable forces and potential energy
say: With calculus, work is an integral, and force is the negative slope of potential energy.
key: W = ∫ F · dx. For a spring, W = ∫ kx dx = ½kx². The work–energy theorem: W_net = ΔK.
For conservative forces, F = −dU/dx. Equilibrium points occur where dU/dx = 0: stable at minima of U, unstable at maxima.
ex: F(x) = 3x² N acts from x = 0 to 2 m. Find the work done.
> W = ∫₀² 3x² dx = x³ from 0 to 2
= 8 J
Conservative forces (gravity, springs) have path-independent work; nonconservative forces (friction) dissipate mechanical energy.
term: conservative force = a force whose work is independent of path
term: potential energy function = U(x), where F = −dU/dx
term: stable equilibrium = an equilibrium at a minimum of potential energy
q: U(x) = x² − 4x. Where is the equilibrium point? | *x = 2 | x = 0 | x = 4 | x = −2
why: dU/dx = 2x − 4 = 0.
q: Friction is a… | *nonconservative force | conservative force | potential energy | form of mass
why: Its work depends on the path.
gen: stem.work, stem.kinetic

@lesson Conservation of energy and power
say: Energy conservation solves problems that would be messy with forces alone.
key: K₁ + U₁ + W_other = K₂ + U₂. With only conservative forces, mechanical energy is constant.
Power P = dW/dt = F · v. Average power = W/Δt.
ex: A 1,500 kg car moves at 20 m/s against a total resistive force of 600 N. What power must the engine supply to keep speed constant?
> At constant speed, engine force = 600 N
> P = Fv = 600 × 20
= 12,000 W (12 kW)
Energy diagrams (U vs. x with a total energy line) show turning points where K = 0 and regions where motion is allowed.
term: power = the rate of doing work, P = dW/dt = Fv
term: turning point = a position where kinetic energy is zero and the object reverses direction
term: mechanical energy = the sum of kinetic and potential energy
q: On an energy diagram, motion is allowed where… | *total energy ≥ U(x) | U(x) > total energy | U = 0 only | anywhere
why: Kinetic energy can't be negative.
q: Power delivered by a force is… | *F · v | F/v | Fv² | ½Fv
why: P = dW/dt = F dx/dt.
gen: stem.power

@unit Linear Momentum | Impulse, conservation of momentum, collisions, center of mass
@lesson Impulse and momentum
say: Momentum and impulse handle collisions and changing forces with ease.
key: p = mv. Impulse J = ∫ F dt = Δp. ΣF = dp/dt.
On a force–time graph, the area under the curve is the impulse.
ex: A force F(t) = 10t N acts on a 2 kg object from t = 0 to 3 s. Find the change in velocity.
> J = ∫₀³ 10t dt = 5t² from 0 to 3 = 45 N·s
= Δv = 45/2 = 22.5 m/s
Center of mass: x_cm = Σmᵢxᵢ/Σmᵢ, or ∫x dm / M for continuous objects. If no net external force acts, the center of mass moves at constant velocity.
term: impulse = the integral of force over time; equals change in momentum
term: momentum = mass times velocity
term: center of mass = the mass-weighted average position of a system
q: The area under a force–time graph represents… | *impulse | work | power | energy
why: J = ∫F dt.
q: With no external forces, a system's center of mass… | *moves at constant velocity | accelerates | stops | spins
why: Net external force is zero.
gen: stem.momentum

@lesson Collisions
say: In collisions, momentum is always conserved. Kinetic energy depends on the type of collision.
key: Isolated system: Σp_before = Σp_after. Elastic collisions also conserve kinetic energy; inelastic do not. Perfectly inelastic collisions end with the objects stuck together.
For a 1D elastic collision between equal masses where one is at rest, they exchange velocities.
In 2D, conserve momentum separately in the x and y directions.
ex: A 3 kg cart at 4 m/s sticks to a 1 kg cart at rest. Find the final speed and kinetic energy lost.
> 12 = 4v, so v = 3 m/s
> K before = 24 J; K after = ½(4)(9) = 18 J
= v = 3 m/s; 6 J lost
term: elastic collision = a collision that conserves kinetic energy
term: perfectly inelastic collision = a collision where objects stick together
term: isolated system = a system with no net external force
q: Two equal masses collide elastically head-on; one was at rest. After the collision… | *they exchange velocities | both stop | they stick together | both move at half speed
why: Equal masses swap velocities in elastic collisions.
q: In 2D collisions, momentum is conserved… | *separately in each direction | only in x | only overall magnitude | never
why: Momentum is a vector.

@unit Torque and Rotational Dynamics | Rotational kinematics, moment of inertia, torque and τ = Iα
@lesson Rotational kinematics and moment of inertia
say: Rotation has its own versions of position, velocity and mass. Calculus computes rotational inertia for any shape.
key: ω = dθ/dt, α = dω/dt. Linking to linear: v = rω, a_t = rα. Moment of inertia I = Σmr² = ∫r² dm.
Common results: thin rod about its center ML²/12, about one end ML²/3; solid disk ½MR²; hoop MR²; solid sphere (2/5)MR².
Parallel axis theorem: I = I_cm + Md².
ex: Use the parallel axis theorem to find I for a rod about its end from I_cm = ML²/12.
> d = L/2
> ML²/12 + M(L/2)² = ML²/12 + 3ML²/12
= ML²/3
term: moment of inertia = resistance to angular acceleration, I = ∫r² dm
term: parallel axis theorem = I = I_cm + Md²
term: angular acceleration = the rate of change of angular velocity
q: Which has a larger moment of inertia about its center: a hoop or a disk of equal mass and radius? | *Hoop | Disk | Equal | Depends on speed
why: The hoop's mass is all at the edge.
q: v = rω relates… | *linear speed to angular speed | force to torque | mass to inertia | energy to power
why: Points farther out move faster.

@lesson Torque and Newton's second law for rotation
say: Torque causes angular acceleration, just as force causes linear acceleration.
key: τ = r × F, with magnitude rF sin θ. Στ = Iα. For static equilibrium: ΣF = 0 and Στ = 0 about any point.
Systems with ropes over pulleys with mass combine translational and rotational equations, linked by a = rα.
ex: A 2 kg disk (R = 0.5 m) has a string wrapped around it pulled with 4 N. Find α.
> I = ½(2)(0.5²) = 0.25 kg·m²
> τ = 4 × 0.5 = 2 N·m
= α = 2/0.25 = 8 rad/s²
tip: For equilibrium problems, choose a pivot point where unknown forces act, so their torques are zero.
term: torque = the rotational effect of a force, τ = rF sin θ
term: static equilibrium = no net force and no net torque
term: lever arm = the perpendicular distance from the axis to the line of action of a force
q: A force applied directly at the axis of rotation produces… | *zero torque | maximum torque | infinite torque | negative torque
why: r = 0.
q: For static equilibrium, the net torque must be zero about… | *any point | only the center of mass | only the pivot | no point
why: If the object isn't rotating, torques balance about every point.

@unit Energy and Momentum of Rotating Systems | Rotational kinetic energy, rolling, angular momentum
@lesson Rotational energy and rolling
say: Rotating objects store energy, and rolling objects have both translational and rotational energy.
key: K_rot = ½Iω². Rolling without slipping: v_cm = Rω, K = ½Mv² + ½Iω². Work by torque: W = ∫τ dθ. Power: P = τω.
ex: A solid sphere rolls without slipping down a ramp of height h. Find its speed at the bottom.
> Mgh = ½Mv² + ½(2/5)MR²(v/R)² = (7/10)Mv²
= v = √(10gh/7)
Objects with smaller I/(MR²) roll faster down ramps: sphere beats disk beats hoop.
oops: Don't forget the rotational term. A rolling ball moves slower at the bottom of a ramp than a sliding block, because some energy goes into spinning.
term: rotational kinetic energy = ½Iω²
term: rolling without slipping = rolling where v_cm = Rω
term: rotational power = P = τω
q: Which reaches the bottom of a ramp first: a solid sphere, disk or hoop? | *Solid sphere | Disk | Hoop | They tie
why: It has the smallest rotational inertia ratio.
q: Static friction during rolling without slipping does… | *no work | negative work | positive work | infinite work
why: The contact point doesn't slide.
gen: stem.potential

@lesson Angular momentum
say: Angular momentum is conserved when no external torque acts, from spinning skaters to collapsing stars.
key: L = Iω for rigid bodies; for a particle, L = r × p. Στ = dL/dt. If net external torque is zero, L is conserved.
ex: A 0.5 kg ball moving at 4 m/s sticks to the end of a 1 m rod (I = 0.2 kg·m²) pivoted at the other end. Find ω afterward.
> Before: L = mvr = 0.5 × 4 × 1 = 2 kg·m²/s
> After: I_total = 0.2 + 0.5(1²) = 0.7
= ω = 2/0.7 ≈ 2.86 rad/s
Angular momentum is conserved in rotational collisions, but kinetic energy usually is not.
term: angular momentum = L = Iω, or r × p for a particle
term: conservation of angular momentum = with zero net external torque, L stays constant
term: rotational collision = a collision involving rotation where angular momentum is conserved
q: A spinning star collapses to a smaller radius. Its spin rate… | *increases | decreases | stays the same | stops
why: Smaller I means larger ω.
q: Angular momentum changes only when there's a net… | *external torque | external force | internal torque | velocity
why: Στ = dL/dt.

@unit Oscillations | Simple harmonic motion, springs and pendulums, energy in SHM
@lesson Simple harmonic motion
say: Simple harmonic motion is described by a differential equation whose solutions are sines and cosines.
key: SHM occurs when F = −kx, giving d²x/dt² = −(k/m)x. Solution: x(t) = A cos(ωt + φ) with ω = √(k/m).
Period: mass-spring T = 2π√(m/k); simple pendulum T = 2π√(L/g) (small angles); physical pendulum T = 2π√(I/(mgd)).
ex: Show that x(t) = A cos(ωt) satisfies the SHM equation.
> d²x/dt² = −Aω² cos(ωt) = −ω²x
= It works when ω² = k/m
Velocity and acceleration: v_max = Aω at equilibrium; a_max = Aω² at the turning points.
term: simple harmonic motion = oscillation where acceleration is proportional and opposite to displacement
term: angular frequency = ω = 2πf, in radians per second
term: physical pendulum = a rigid object swinging about a pivot
q: For a mass on a spring, ω = | *√(k/m) | √(m/k) | k/m | 2πk
why: From d²x/dt² = −(k/m)x.
q: Where is acceleration greatest in SHM? | *At maximum displacement | At equilibrium | Halfway | It's constant
why: a = −ω²x is largest when |x| is largest.

@lesson Energy in oscillations
say: Energy sloshes between kinetic and potential in an oscillator, while the total stays fixed.
key: E = ½kA² = ½mv² + ½kx². So v = ω√(A² − x²).
ex: A 0.25 kg mass on a spring (k = 100 N/m) oscillates with A = 0.2 m. Find its speed at x = 0.1 m.
> ω = √(100/0.25) = 20 rad/s
> v = 20√(0.04 − 0.01) = 20√0.03
= about 3.46 m/s
Damping removes energy, decreasing amplitude over time. Driving an oscillator at its natural frequency causes resonance, with large amplitudes.
term: total energy of SHM = ½kA²
term: damping = loss of energy that reduces amplitude over time
term: resonance = large oscillations when driven at the natural frequency
q: At x = A, the kinetic energy of an oscillator is… | *zero | maximum | ½kA² | half the total
why: It's momentarily at rest.
q: Doubling amplitude changes total energy by a factor of… | *4 | 2 | 1 | 8
why: E ∝ A².
`;
