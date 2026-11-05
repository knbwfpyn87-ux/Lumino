export default String.raw`
@course ap-phys1 | AP Physics 1 | AP | 🚀 | Science

// Follows the 8 units of the revised AP Physics 1 framework (2024–25 onward), including fluids.

@unit Kinematics | Position, velocity and acceleration; motion graphs; kinematic equations; projectile motion
@lesson Motion graphs and representations
say: AP Physics is about translating motion between words, graphs and equations. Graphs are the most powerful tool.
key: Position–time: slope = velocity. Velocity–time: slope = acceleration, area = displacement. Acceleration–time: area = change in velocity.
A curved position–time graph means changing velocity. If it curves upward (concave up), acceleration is positive.
Average velocity = Δx/Δt. Instantaneous velocity is the slope of the tangent line on an x–t graph.
ex: A v–t graph is a straight line from (0 s, 2 m/s) to (4 s, 10 m/s). Find the acceleration and displacement.
> Slope: (10 − 2)/4 = 2 m/s²
> Area under the line: ½(2 + 10)(4) = 24 m
= a = 2 m/s², Δx = 24 m
Choosing a reference frame and a positive direction is the first step in every problem. Vectors (displacement, velocity, acceleration) have signs; scalars (distance, speed) don't.
lab: Cart on an incline with a motion sensor
aim: Release a cart from rest on a ramp and record its position over time.
set: t = 1 | Time (s) | 0 to 3 by 0.1
set: th = 5 | Ramp angle (°) | 2 to 20 by 1
out: a = g*sind(th) | Acceleration (m/s²)
out: x = 0.5*a*t^2 | Position (m)
out: v = a*t | Velocity (m/s)
plot: t, x
step: Record the position every half second.
step: Sketch the velocity–time graph from your data. What is its slope?
noise: 2
result: Position grows with t² (a parabola), so velocity grows linearly and the slope of the velocity graph is the constant acceleration g sin θ.
term: reference frame = the coordinate system and point of view from which motion is measured
term: instantaneous velocity = velocity at one instant; the slope of the tangent on an x–t graph
term: displacement = change in position, a vector
q: On a velocity–time graph, the area under the curve represents… | *displacement | acceleration | force | jerk
why: Area = velocity × time.
q: A position–time graph that's a horizontal line means the object is… | *at rest | moving at constant velocity | accelerating | moving backward
why: Zero slope means zero velocity.
gen: stem.accel

@lesson Kinematic equations
say: When acceleration is constant, three equations solve almost any motion problem. Pick the one with your knowns.
key: v = v₀ + at · x = x₀ + v₀t + ½at² · v² = v₀² + 2a(x − x₀)
Strategy: list the knowns and the unknown, then choose the equation that doesn't include the variable you don't know and don't need.
Free fall: a = −g ≈ −9.8 m/s² (taking up as positive). At the top of a vertical toss, v = 0 but a is still −9.8 m/s².
ex: A car moving at 20 m/s brakes at 5 m/s². How far does it travel before stopping?
> v = 0, v₀ = 20, a = −5
> 0 = 20² + 2(−5)Δx
= Δx = 40 m
term: constant acceleration = acceleration that doesn't change with time, required for the kinematic equations
term: free fall = motion under the influence of gravity alone
term: g = the magnitude of gravitational acceleration near Earth, about 9.8 m/s²
q: A ball is dropped from rest. Its speed after 2 s is about… | *20 m/s | 10 m/s | 40 m/s | 5 m/s
why: v = gt ≈ 9.8 × 2.
q: At the highest point of a vertical toss, the acceleration is… | *9.8 m/s² downward | zero | upward | infinite
why: Gravity acts the whole time.
gen: stem.kinematics, stem.freefall

@lesson Projectile motion
say: Projectiles move in two dimensions, but the horizontal and vertical motions never affect each other.
key: Horizontal: constant velocity (aₓ = 0). Vertical: constant acceleration (a_y = −g). Time links the two.
Break the launch velocity into components: vₓ = v cos θ, v_y = v sin θ.
ex: A ball is launched horizontally at 8 m/s from a 5 m tall table. How far does it land?
> Vertical: 5 = ½(9.8)t², t ≈ 1.01 s
> Horizontal: x = 8 × 1.01
= about 8.1 m
Two objects released from the same height at the same time, one dropped and one launched horizontally, hit the ground together.
term: projectile = an object moving under gravity alone after launch
term: velocity components = the horizontal and vertical parts of velocity
term: trajectory = the parabolic path of a projectile
q: A projectile's horizontal velocity at the top of its path is… | *the same as at launch | zero | maximum | 9.8 m/s
why: There's no horizontal acceleration.
q: Which factor alone determines how long a horizontally launched projectile is in the air? | *Height | Horizontal speed | Mass | Launch angle only
why: Vertical motion sets the time.

@unit Force and Translational Dynamics | Systems, Newton's laws, free-body diagrams, friction, springs, circular motion, gravitation
@lesson Newton's laws and free-body diagrams
say: Forces cause changes in motion. Free-body diagrams are how physicists organize every force problem.
key: Newton's second law: ΣF = ma, applied separately to each direction. If ΣF = 0, the velocity is constant.
Draw a free-body diagram: represent the object (or system) as a dot and draw every force acting on it: gravity (mg, down), normal force (perpendicular to the surface), tension (along the rope), friction (parallel to the surface, opposing sliding), and applied forces.
Newton's third law pairs act on different objects, so they never appear on the same free-body diagram.
ex: A 2 kg box is pulled across a frictionless floor by a 10 N horizontal force. Find the acceleration and normal force.
> Horizontal: 10 = 2a, so a = 5 m/s²
> Vertical: N − mg = 0, so N = 2 × 9.8
= a = 5 m/s², N = 19.6 N
term: free-body diagram = a diagram showing all forces acting on one object or system
term: system = the object or group of objects chosen for analysis
term: net force = the vector sum of all forces on a system
q: A box slides at constant velocity. The net force on it is… | *zero | equal to its weight | in the direction of motion | equal to friction
why: Constant velocity means zero acceleration.
q: Do Newton's third-law force pairs appear on the same free-body diagram? | *No, they act on different objects | Yes, always | Only for falling objects | Only with friction
why: Each force in a pair acts on a different object.
gen: stem.newton2, stem.weight

@lesson Friction, springs and inclines
say: Friction and springs show up in nearly every AP force problem. Inclines just need a tilted coordinate system.
key: Kinetic friction f = μₖN. Static friction f ≤ μₛN (it adjusts up to a maximum). Spring force F = −kx (Hooke's law).
On an incline at angle θ, tilt your axes: gravity's component along the slope is mg sin θ, and perpendicular to it is mg cos θ. So the normal force is mg cos θ (with no other perpendicular forces).
ex: A block slides down a frictionless 30° incline. Find its acceleration.
> Along the slope: ma = mg sin 30°
> a = 9.8 × 0.5
= 4.9 m/s²
Static friction is usually larger than kinetic friction, which is why it's harder to start pushing a heavy box than to keep it moving.
lab: Block on an adjustable incline
aim: Raise an incline with a wooden block on it and measure the block's acceleration.
set: th = 30 | Incline angle (°) | 0 to 60 by 1
set: mu = 0.3 | Coefficient of friction | 0.1 to 0.8 by 0.05
out: a = max(g*(sind(th) - mu*cosd(th)), 0) | Acceleration (m/s²)
plot: th, a
step: Record the acceleration for at least 5 angles.
step: Find the angle at which the block starts to slide.
noise: 3
result: The block stays put until tan θ exceeds μ, then accelerates at g(sin θ − μ cos θ). Measuring the angle where sliding begins is a simple way to find the coefficient of friction.
term: coefficient of friction = μ, the ratio of friction force to normal force
term: static friction = friction that prevents surfaces from starting to slide
term: Hooke's law = the spring force is proportional to the stretch or compression, F = −kx
term: spring constant = k, a measure of a spring's stiffness
q: A spring with k = 200 N/m is stretched 0.1 m. The spring force is… | *20 N | 2,000 N | 0.0005 N | 200 N
why: F = kx = 200 × 0.1.
q: On a frictionless incline, a block's acceleration depends on… | *the angle only | its mass | its speed | the length of the ramp
why: a = g sin θ; mass cancels.

@lesson Circular motion and gravitation
say: Circular motion needs a net force toward the center. Gravity provides that force for planets and satellites.
key: Centripetal acceleration a = v²/r, directed toward the center. ΣF_center = mv²/r.
Centripetal force isn't a new kind of force. It's the net force from tension, friction, gravity or normal force that points toward the center.
Universal gravitation: F = Gm₁m₂/r². Near Earth's surface, g = GM/R².
ex: A 0.5 kg ball on a 1 m string swings in a horizontal circle at 4 m/s. Find the tension (ignoring gravity's effect).
> F = mv²/r = 0.5 × 16 / 1
= 8 N
For a satellite in circular orbit, gravity provides the centripetal force: GMm/r² = mv²/r, so v = √(GM/r). The satellite's mass cancels.
term: centripetal acceleration = acceleration toward the center of a circular path, v²/r
term: universal gravitation = every two masses attract with a force proportional to their masses and inversely proportional to distance squared
term: gravitational field = the gravitational force per unit mass at a location
q: If a car's speed doubles on the same curve, the required centripetal force… | *quadruples | doubles | halves | stays the same
why: F ∝ v².
q: An orbiting satellite's speed depends on… | *the planet's mass and the orbit radius | the satellite's mass | the satellite's shape | nothing
why: v = √(GM/r).

@unit Work, Energy and Power | Work, kinetic and potential energy, conservation of energy, power
@lesson Work and the work-energy theorem
say: Energy is one of the most powerful ideas in physics. Work is how energy gets transferred into or out of a system.
key: Work W = Fd cos θ, where θ is the angle between force and displacement. Net work equals the change in kinetic energy: W_net = ΔK.
- Force in the direction of motion: positive work (speeds up).
- Force opposite to motion: negative work (like friction slowing something).
- Force perpendicular to motion: no work (like the normal force on a level surface, or centripetal force).
On a force–displacement graph, the area under the curve is the work done.
ex: A 3 kg cart at rest is pushed with a net 12 N force for 2 m. Find its final speed.
> W_net = 12 × 2 = 24 J = ΔK
> ½(3)v² = 24, so v² = 16
= v = 4 m/s
term: work = energy transferred by a force acting through a displacement, W = Fd cos θ
term: work-energy theorem = the net work done on an object equals its change in kinetic energy
term: kinetic energy = energy of motion, K = ½mv²
q: A force perpendicular to an object's motion does… | *zero work | positive work | negative work | maximum work
why: cos 90° = 0.
q: Friction acting on a sliding box does… | *negative work | positive work | no work | work equal to weight
why: Friction opposes the displacement.
gen: stem.work, stem.kinetic

@lesson Conservation of energy and power
say: In a closed system with no friction, mechanical energy stays constant. Energy bar charts make these problems visual.
key: Kᵢ + Uᵢ + W_external = K_f + U_f + ΔE_thermal. If no external work and no friction, Kᵢ + Uᵢ = K_f + U_f.
- Gravitational potential energy: U_g = mgh (near Earth).
- Elastic potential energy: U_s = ½kx².
ex: A 0.2 kg ball compresses a spring (k = 500 N/m) by 0.1 m and is launched straight up. How high does it rise above the release point?
> Spring energy: ½(500)(0.1)² = 2.5 J
> All becomes U_g at the top: 2.5 = 0.2 × 9.8 × h
= h ≈ 1.28 m
Power is the rate of energy transfer: P = W/t = Fv. Units: watts (J/s).
lab: Stair-climbing power
aim: Time yourself running up stairs and calculate your power output.
set: t = 6 | Time to climb (s) | 2 to 20 by 0.5
set: m = 60 | Your mass (kg) | 40 to 100 by 1
set: h = 6 | Height of the stairs (m) | 3 to 15 by 0.5
out: W = m*g*h | Work done (J)
out: P = W/t | Power (W)
plot: t, P
step: Record your power for at least 4 climbing times.
noise: 3
result: The work (mgh) is the same however fast you climb, but power = work ÷ time, so running doubles your power compared with walking at half the speed. Athletes can briefly produce over 1,000 W.
term: conservation of energy = in a closed system, total energy remains constant
term: elastic potential energy = energy stored in a stretched or compressed spring, ½kx²
term: power = the rate at which work is done or energy is transferred
term: energy bar chart = a diagram showing amounts of each energy type at different moments
q: A ball rolls down a frictionless hill. Its total mechanical energy… | *stays constant | increases | decreases | becomes zero
why: No friction means no energy lost.
q: A 500 W motor runs for 10 s. How much work does it do? | *5,000 J | 50 J | 510 J | 0.02 J
why: W = Pt.
gen: stem.potential, stem.power

@unit Linear Momentum | Momentum and impulse, conservation of momentum, elastic and inelastic collisions
@lesson Momentum and impulse
say: Momentum is mass in motion. Impulse is how forces change it over time.
key: Momentum p = mv (a vector). Impulse J = FΔt = Δp.
On a force–time graph, the area under the curve is the impulse. Extending the collision time reduces the average force for the same change in momentum.
ex: A 0.5 kg ball moving at 10 m/s bounces straight back at 8 m/s. Find the impulse on the ball.
> Take the initial direction as positive
> Δp = m(v_f − v_i) = 0.5(−8 − 10)
= −9 N·s (9 N·s opposite the initial direction)
oops: A bounce involves a larger change in momentum than simply stopping, because the velocity reverses.
term: momentum = mass times velocity, a vector quantity
term: impulse = the product of force and time; equal to the change in momentum
term: impulse-momentum theorem = FΔt = Δp
q: What is the impulse from a 200 N force acting for 0.05 s? | *10 N·s | 4,000 N·s | 250 N·s | 0.00025 N·s
why: J = FΔt.
q: Which causes a larger impulse on a ball: stopping it or making it bounce back? | *Bouncing back | Stopping it | They're equal | Neither
why: Reversing direction doubles (or more) the change in velocity.
gen: stem.momentum

@lesson Conservation of momentum and collisions
say: When no external forces act, total momentum is conserved. That's true in every collision and explosion.
key: For an isolated system, total momentum before = total momentum after: m₁v₁ᵢ + m₂v₂ᵢ = m₁v₁f + m₂v₂f.
- Elastic collisions: kinetic energy is also conserved.
- Inelastic collisions: kinetic energy decreases (converted to thermal energy, sound, deformation).
- Perfectly inelastic: the objects stick together, losing the most kinetic energy.
The center of mass of an isolated system moves at constant velocity, no matter what happens inside the system.
ex: A 1,000 kg car at 20 m/s rear-ends a 1,500 kg car at rest; they lock together. Find their speed.
> Before: 1,000 × 20 = 20,000 kg·m/s
> After: 2,500v = 20,000
= v = 8 m/s
lab: Elastic collisions on an air track
aim: Send a glider into a stationary glider in a perfectly elastic collision. How do their speeds afterward depend on mass?
set: m1 = 0.5 | Moving glider mass (kg) | 0.1 to 1 by 0.05
set: m2 = 0.5 | Target glider mass (kg) | 0.1 to 1 by 0.05
set: v1 = 2 | Initial speed (m/s) | 0.5 to 4 by 0.5
out: u1 = (m1 - m2)/(m1 + m2)*v1 | Moving glider after (m/s)
out: u2 = 2*m1/(m1 + m2)*v1 | Target glider after (m/s)
out: K = 0.5*m1*u1^2 + 0.5*m2*u2^2 | Total KE after (J)
plot: m2, u2
step: Record both final velocities for at least 4 target masses.
step: Check the total kinetic energy before and after.
noise: 2
result: Equal masses swap velocities. A light target shoots off faster; a heavy target barely moves while the incoming glider bounces back. Momentum and kinetic energy are both conserved.
term: isolated system = a system with no net external force
term: elastic collision = a collision where kinetic energy is conserved
term: perfectly inelastic collision = a collision where objects stick together
term: center of mass = the average position of a system's mass
q: In a perfectly inelastic collision, what is conserved? | *Momentum only | Kinetic energy only | Both | Neither
why: Kinetic energy is lost when objects stick.
q: An astronaut at rest throws a tool forward. The astronaut moves… | *backward | forward | not at all | in a circle
why: Total momentum must stay zero.

@unit Torque and Rotational Dynamics | Rotational kinematics, torque, rotational inertia, Newton's second law for rotation
@lesson Rotational kinematics and torque
say: Spinning objects follow rules just like moving ones. Angle, angular velocity and angular acceleration replace position, velocity and acceleration.
Rotational quantities: angular position θ (radians), angular velocity ω = Δθ/Δt, angular acceleration α = Δω/Δt. The kinematic equations work the same way with constant α: ω = ω₀ + αt, etc.
Linking linear and rotational: v = rω and a_tangential = rα.
key: Torque τ = rF sin θ: a force's ability to cause rotation. Torque is greatest when the force is applied far from the axis and perpendicular to the lever arm.
ex: A 20 N force is applied perpendicular to a 0.4 m wrench. Find the torque.
> τ = rF = 0.4 × 20
= 8 N·m
For rotational equilibrium, the net torque is zero: clockwise torques equal counterclockwise torques. A seesaw balances when m₁d₁ = m₂d₂.
term: angular velocity = the rate of change of angular position, in radians per second
term: torque = the rotational effect of a force, τ = rF sin θ
term: lever arm = the perpendicular distance from the axis of rotation to the line of the force
term: rotational equilibrium = a state where the net torque is zero
q: Where should you push a door to open it most easily? | *Far from the hinges, perpendicular to the door | Near the hinges | Toward the hinges | Along the door's edge
why: A large lever arm and perpendicular force give the most torque.
q: A 30 kg child sits 2 m from a seesaw's pivot. How far from the pivot must a 40 kg child sit to balance? | *1.5 m | 2.67 m | 2 m | 1 m
why: 30 × 2 = 40 × d.

@lesson Rotational inertia and Newton's second law for rotation
say: Rotational inertia is the spinning version of mass. Where the mass sits matters as much as how much there is.
key: Newton's second law for rotation: τ_net = Iα, where I is rotational inertia.
Rotational inertia depends on mass and how far that mass is from the axis: I = Σmr². Mass farther from the axis means larger I and more resistance to changes in rotation.
- A hoop (mass at the rim) has I = MR².
- A solid disk has I = ½MR².
- The parallel axis theorem: I = I_cm + Md².
ex: A solid disk and a hoop with the same mass and radius roll down a ramp. Which reaches the bottom first?
> The disk has smaller rotational inertia
> Less energy goes into spinning, more into moving forward
= The solid disk wins
lab: Hanging mass and a spinning disk
aim: A string wrapped around a disk (radius 10 cm) is pulled by a hanging mass. Measure the acceleration to find the disk's rotational inertia.
set: m = 0.2 | Hanging mass (kg) | 0.05 to 1 by 0.05
set: I = 0.01 | Disk rotational inertia (kg·m²) | 0.002 to 0.05 by 0.002
out: a = m*g/(m + I/0.01) | Acceleration of the mass (m/s²)
out: alpha = a/0.1 | Angular acceleration (rad/s²)
plot: m, a
step: Record the acceleration for 5 hanging masses.
step: Increase the rotational inertia and compare.
noise: 3
result: a = mg/(m + I/r²). The disk's rotational inertia acts like extra mass resisting acceleration, so a heavier or larger disk turns more slowly. Rearranging gives I from measured a.
term: rotational inertia = an object's resistance to changes in rotation, depending on mass distribution
term: Newton's second law for rotation = net torque equals rotational inertia times angular acceleration
term: parallel axis theorem = I = I_cm + Md² for an axis a distance d from the center of mass
q: Which has greater rotational inertia: a hoop or a solid disk of the same mass and radius? | *The hoop | The disk | They're equal | It depends on speed
why: The hoop's mass is all at the rim.
q: The same torque is applied to two wheels; one has twice the rotational inertia. Its angular acceleration is… | *half as large | twice as large | the same | four times as large
why: α = τ/I.

@unit Energy and Momentum of Rotating Systems | Rotational kinetic energy, angular momentum and its conservation, rolling
@lesson Rotational kinetic energy and rolling
say: Spinning objects store energy too. A rolling ball has both kinds of kinetic energy at once.
key: Rotational kinetic energy K_rot = ½Iω². A rolling object has total K = ½mv² + ½Iω².
For rolling without slipping, v = rω. Static friction makes the object roll but does no work (the contact point doesn't slide).
ex: A solid sphere (I = (2/5)mr²) rolls without slipping at 5 m/s. What fraction of its kinetic energy is rotational?
> K_trans = ½mv²; K_rot = ½(2/5)mr²(v/r)² = (1/5)mv²
> Total = (1/2 + 1/5)mv² = (7/10)mv²
= Rotational fraction = (1/5)/(7/10) = 2/7
Work done by a torque: W = τΔθ.
lab: Rolling race down a ramp
aim: Release a hoop, a disk, a solid sphere and a sliding block from the same height. Which reaches the bottom fastest?
set: b = 0.4 | Shape factor β (I = βmr²) | 0 to 1 by 0.1
set: h = 1 | Ramp height (m) | 0.2 to 2 by 0.1
out: v = sqrt(2*g*h/(1 + b)) | Speed at the bottom (m/s)
out: frac = 1/(1 + b)*100 | Energy that is translational (%)
plot: b, v
step: Record the speed for β = 0 (sliding), 0.4 (sphere), 0.5 (disk) and 1 (hoop).
step: Change the height. Does the finishing order change?
noise: 2
result: Rolling objects share energy between moving and spinning. The more mass far from the axis (larger β), the more energy goes into rotation and the slower it rolls: sphere beats disk beats hoop, for any mass or size.
term: rotational kinetic energy = energy of rotation, ½Iω²
term: rolling without slipping = rolling where the contact point is momentarily at rest; v = rω
term: angular displacement = the angle through which an object rotates
q: A rolling ball has which kinds of kinetic energy? | *Translational and rotational | Only translational | Only rotational | Only potential
why: It moves forward and spins.
q: For rolling without slipping, v equals… | *rω | ω/r | r/ω | r + ω
why: The rim speed matches the forward speed.

@lesson Angular momentum
say: Spin a skater pulls in her arms and spins faster. That's conservation of angular momentum.
key: Angular momentum L = Iω. If the net external torque is zero, angular momentum is conserved: I₁ω₁ = I₂ω₂.
When a skater pulls in her arms, her rotational inertia decreases, so her angular speed increases to keep L constant. Her rotational kinetic energy actually increases, because she does work pulling her arms in.
A point mass moving in a straight line also has angular momentum about a point: L = mvr⊥.
Angular impulse τΔt = ΔL, just like FΔt = Δp.
ex: A skater spins at 2 rev/s with I = 4 kg·m². She pulls in to I = 1 kg·m². Find her new spin rate.
> I₁ω₁ = I₂ω₂: 4 × 2 = 1 × ω₂
= ω₂ = 8 rev/s
term: angular momentum = the rotational version of momentum, L = Iω
term: conservation of angular momentum = with no net external torque, angular momentum stays constant
term: angular impulse = torque multiplied by time; equals the change in angular momentum
q: A spinning diver tucks in tightly. Their angular speed… | *increases | decreases | stays the same | becomes zero
why: Smaller I means larger ω for the same L.
q: Angular momentum is conserved when… | *net external torque is zero | net force is zero | kinetic energy is conserved | speed is constant
why: Torque changes angular momentum.

@unit Oscillations | Simple harmonic motion, springs and pendulums, energy in oscillating systems
@lesson Simple harmonic motion
say: Things that bounce back and forth, like springs and pendulums, follow a beautifully simple pattern.
key: Simple harmonic motion happens when the restoring force is proportional to displacement and points toward equilibrium (F = −kx).
- Amplitude A: maximum displacement.
- Period T: time for one full cycle. Frequency f = 1/T.
- Mass on a spring: T = 2π√(m/k). Pendulum (small angles): T = 2π√(L/g).
The period of a spring doesn't depend on amplitude. A pendulum's period doesn't depend on mass or amplitude (for small swings).
ex: A pendulum is made 4 times longer. How does its period change?
> T ∝ √L
> √4 = 2
= The period doubles
Position in SHM is sinusoidal: x(t) = A cos(2πft). Speed is maximum at equilibrium; acceleration is maximum at the turning points.
lab: Mass on a spring
aim: Hang masses on a spring, set them bouncing, and time the oscillations.
set: m = 0.2 | Mass (kg) | 0.05 to 1 by 0.05
set: k = 20 | Spring constant (N/m) | 5 to 100 by 5
out: T = 2*pi*sqrt(m/k) | Period (s)
out: f = 1/T | Frequency (Hz)
plot: m, T
step: Record the period for 5 masses.
step: Then try a stiffer spring.
noise: 2
result: T = 2π√(m/k): four times the mass doubles the period, and a stiffer spring oscillates faster. The amplitude doesn't affect the period, which is why springs and pendulums make good clocks.
term: simple harmonic motion = oscillation where the restoring force is proportional to displacement
term: period = the time for one complete oscillation
term: amplitude = the maximum displacement from equilibrium
term: restoring force = a force that pulls an oscillating object back toward equilibrium
q: Which change increases a mass–spring system's period? | *Increasing the mass | Increasing the spring constant | Increasing the amplitude | Decreasing the mass
why: T = 2π√(m/k).
q: Where is an oscillating mass moving fastest? | *At equilibrium | At maximum displacement | At the turning points | It never moves fastest
why: All the energy is kinetic at equilibrium.

@lesson Energy in oscillating systems
say: Oscillators trade energy back and forth between kinetic and potential, but the total stays the same.
key: For a spring oscillator, total energy E = ½kA² = ½kx² + ½mv². At the turning points, all energy is potential; at equilibrium, all is kinetic.
ex: A 0.5 kg mass on a spring (k = 200 N/m) oscillates with amplitude 0.1 m. Find its maximum speed.
> E = ½(200)(0.1)² = 1 J
> At equilibrium: ½(0.5)v² = 1
= v_max = 2 m/s
Doubling the amplitude quadruples the total energy (E ∝ A²) but doesn't change the period.
In real systems, friction causes damping: the amplitude gradually decreases as energy is lost.
term: damping = the gradual loss of energy and amplitude in an oscillating system
term: equilibrium position = the point where the net force on an oscillator is zero
term: total mechanical energy of an oscillator = ½kA², constant without damping
q: If the amplitude of a spring oscillator doubles, its total energy… | *quadruples | doubles | stays the same | halves
why: E = ½kA².
q: At the turning point of an oscillation, the energy is… | *all potential | all kinetic | half and half | zero
why: The mass is momentarily at rest.

@unit Fluids | Density and pressure, buoyancy, fluid flow and Bernoulli's principle
@lesson Density, pressure and buoyancy
say: Fluids are liquids and gases. Pressure and buoyancy explain why ships float and your ears pop.
key: Density ρ = m/V. Pressure P = F/A. Pressure in a fluid increases with depth: P = P₀ + ρgh.
Pascal's principle: pressure applied to an enclosed fluid is transmitted equally in all directions, the idea behind hydraulic lifts.
key: Archimedes' principle: the buoyant force equals the weight of the fluid displaced: F_b = ρ_fluid V_displaced g.
An object floats if its average density is less than the fluid's. A floating object displaces its own weight of fluid.
ex: A 0.002 m³ block is fully submerged in water (ρ = 1,000 kg/m³). Find the buoyant force.
> F_b = 1,000 × 0.002 × 9.8
= 19.6 N
lab: Archimedes and the overflow can
aim: Lower objects into a full overflow can and compare the buoyant force with the weight of water displaced.
set: V = 100 | Object volume (cm³) | 10 to 500 by 10
set: rho = 2.7 | Object density (g/cm³) | 0.5 to 8 by 0.1
out: sub = min(rho, 1) | Fraction submerged
out: Fb = 1000*V*1e-6*sub*g | Buoyant force (N)
out: Wa = max(rho*V/1000*g - Fb, 0) | Apparent weight in water (N)
plot: V, Fb
step: Record the buoyant force for at least 5 volumes.
step: Try a density below 1 g/cm³. What happens?
noise: 2
result: The buoyant force equals the weight of the water displaced (ρ_fluid V g). Dense objects sink but weigh less in water; objects less dense than water float with just enough submerged to balance their weight.
term: density = mass per unit volume
term: pressure = force per unit area
term: buoyant force = the upward force a fluid exerts on an object, equal to the weight of displaced fluid
term: Pascal's principle = pressure applied to an enclosed fluid is transmitted undiminished throughout
q: Why does a steel ship float? | *Its average density, including air inside, is less than water's | Steel is less dense than water | Water pushes down less | Ships are hollow so gravity is weaker
why: The hull displaces enough water to equal the ship's weight.
q: Pressure in a lake at 10 m depth is greater than at 5 m because… | *more water is above it | water is warmer deeper | gravity is stronger | density decreases
why: P = P₀ + ρgh increases with h.
gen: stem.density, stem.pressure

@lesson Fluid flow and Bernoulli's principle
say: Moving fluids follow two big rules: what flows in must flow out, and faster fluid has lower pressure.
key: Continuity equation: A₁v₁ = A₂v₂. When a pipe narrows, the fluid speeds up.
Bernoulli's equation: P + ½ρv² + ρgh = constant along a streamline. It's conservation of energy for fluids.
Where a fluid moves faster, its pressure is lower (at the same height). This explains why a shower curtain gets pulled inward and helps explain lift on airplane wings.
ex: Water flows through a pipe that narrows from 4 cm² to 1 cm². If it enters at 2 m/s, how fast does it exit?
> A₁v₁ = A₂v₂: 4 × 2 = 1 × v₂
= v₂ = 8 m/s
Torricelli's theorem: fluid flowing out of a hole a depth h below the surface exits at v = √(2gh), the same as falling from height h.
term: continuity equation = A₁v₁ = A₂v₂; volume flow rate is constant in a pipe
term: Bernoulli's principle = faster-moving fluid has lower pressure
term: volume flow rate = the volume of fluid passing a point per second, Av
q: When you squeeze a hose's opening, the water… | *speeds up | slows down | stops | gets denser
why: Smaller area means higher speed by continuity.
q: According to Bernoulli's principle, faster-moving air has… | *lower pressure | higher pressure | the same pressure | higher density
why: Kinetic energy per volume rises as pressure falls.
`;
