export default String.raw`
@course phys | Physics | Standard | 🧲 | Science

@unit Motion in One Dimension | Displacement and velocity, acceleration, kinematic equations, free fall
@lesson Position, displacement and velocity
say: Physics starts with a simple question: how do things move? Let's describe motion precisely.
Distance is how much ground you cover (a scalar, just a size). Displacement is your change in position, including direction (a vector).
key: Average velocity = displacement ÷ time. Speed is the size of velocity, with no direction.
ex: You walk 30 m east, then 10 m west, in 20 s. Find your distance, displacement and average velocity.
> Distance: 30 + 10 = 40 m
> Displacement: 30 − 10 = 20 m east
> Velocity: 20 m ÷ 20 s
= 40 m, 20 m east, 1 m/s east
On a position–time graph, the slope is the velocity. A straight line means constant velocity; a curve means the velocity is changing.
term: displacement = change in position, including direction
term: velocity = rate of change of position, with direction
term: scalar = a quantity with only size, like speed or mass
term: vector = a quantity with both size and direction, like velocity or force
q: A runner goes once around a 400 m track and stops at the start. What is their displacement? | *0 m | 400 m | 200 m | 800 m
why: They end where they started.
q: On a position–time graph, the slope gives… | *velocity | acceleration | distance | force
why: Slope = change in position ÷ change in time.
gen: stem.speed

@lesson Acceleration
say: Acceleration means velocity is changing: speeding up, slowing down, or turning.
key: Acceleration = change in velocity ÷ time: a = (v_f − v_i) ÷ t. Units: m/s².
An acceleration of 3 m/s² means the velocity changes by 3 m/s every second. Slowing down is acceleration too: its direction is opposite the motion.
ex: A car goes from 10 m/s to 30 m/s in 5 s. Find its acceleration.
> a = (30 − 10) ÷ 5
= 4 m/s²
On a velocity–time graph, the slope is the acceleration and the area under the line is the displacement.
oops: An object can have zero velocity and still accelerate, like a ball at the very top of its toss.
term: acceleration = the rate at which velocity changes
term: deceleration = acceleration that slows an object down
term: velocity–time graph = a graph whose slope is acceleration and whose area is displacement
q: A bike slows from 8 m/s to 2 m/s in 3 s. Its acceleration is… | *−2 m/s² | 2 m/s² | −6 m/s² | 3.3 m/s²
why: (2 − 8) ÷ 3 = −2 m/s².
q: What does the area under a velocity–time graph give? | *Displacement | Acceleration | Force | Speed only
why: velocity × time = displacement.
gen: stem.accel

@lesson Kinematic equations and free fall
say: When acceleration is constant, four equations let you predict exactly where something will be.
key: v = v₀ + at · Δx = v₀t + ½at² · v² = v₀² + 2aΔx · Δx = ½(v₀ + v)t
Pick the equation that has the three things you know and the one you want.
Free fall is motion under gravity alone. Near Earth, every object falls with acceleration g = 9.8 m/s² downward (ignoring air resistance), no matter its mass.
ex: A rock is dropped from rest off a cliff. How far does it fall in 3 s?
> v₀ = 0, a = 9.8 m/s², t = 3 s
> Δx = ½(9.8)(3²) = 4.9 × 9
= 44.1 m
lab: Free-fall drop test
aim: Drop a ball from different heights and time the fall. How does fall time depend on height?
set: h = 5 | Drop height (m) | 1 to 50 by 1
set: m = 1 | Ball mass (kg) | 0.1 to 5 by 0.1
out: t = sqrt(2*h/g) | Fall time (s)
out: v = g*t | Impact speed (m/s)
plot: h, t
sim: drop | h=h, m=m
step: Set a height and press Record. Repeat for at least 4 heights.
step: Now keep the height fixed and change the mass. Does the time change?
noise: 3
result: Fall time grows with the square root of height (t = √(2h/g)): four times the height only doubles the time. Mass makes no difference without air resistance, just as Galileo found.
term: free fall = motion where gravity is the only force acting
term: acceleration due to gravity = g = 9.8 m/s², the acceleration of falling objects near Earth
term: kinematics = the description of motion without discussing its causes
q: Without air, a feather and a hammer dropped together… | *land at the same time | the hammer lands first | the feather lands first | neither falls
why: All objects in free fall have the same acceleration.
q: A ball is thrown straight up. At its highest point, its velocity is… | *0 m/s | 9.8 m/s | maximum | negative 9.8 m/s
why: It stops for an instant before falling back down.
gen: stem.freefall, stem.kinematics

@unit Forces and Newton's Laws | Inertia, F = ma, action–reaction pairs, friction and free-body diagrams
@lesson Newton's first law and inertia
say: Why do you lurch forward when a bus stops? Newton's first law explains it.
key: Newton's first law: an object at rest stays at rest, and an object in motion stays in motion at constant velocity, unless a net force acts on it.
Inertia is the tendency to resist changes in motion. More mass means more inertia.
A force is a push or pull, measured in newtons (N). The net force is the sum of all forces on an object. If forces are balanced (net force = 0), the object's velocity doesn't change.
ex: A book rests on a table. Gravity pulls down with 10 N. What's the net force?
> The table pushes up with 10 N (normal force)
> 10 N up − 10 N down
= 0 N, so the book stays at rest
term: inertia = an object's resistance to changes in its motion
term: force = a push or pull, measured in newtons
term: net force = the total of all forces acting on an object
term: equilibrium = a state where the net force is zero
q: A hockey puck slides on frictionless ice. What happens to it? | *It keeps moving at constant velocity | It slows to a stop | It speeds up | It curves
why: With no net force, velocity doesn't change.
q: Which has the most inertia? | *A truck | A bicycle | A soccer ball | A feather
why: Inertia depends on mass.
gen: bank.PHYS.forces

@lesson Newton's second law
say: Newton's second law is the most useful equation in physics. It links force, mass and acceleration.
key: F_net = ma. Acceleration is in the direction of the net force.
A bigger force gives more acceleration; a bigger mass gives less. 1 newton is the force that accelerates 1 kg at 1 m/s².
Weight is the force of gravity on an object: W = mg. A 50 kg student weighs 50 × 9.8 = 490 N. Mass stays the same everywhere; weight changes on the Moon.
ex: A 1,200 kg car accelerates at 3 m/s². What net force acts on it?
> F = ma = 1,200 × 3
= 3,600 N
lab: Cart and pulling force
aim: Pull a cart with a spring scale on a track. How do force and mass affect its acceleration?
set: F = 10 | Net force (N) | 1 to 40 by 1
set: m = 2 | Cart mass (kg) | 0.5 to 10 by 0.5
out: a = F/m | Acceleration (m/s²)
plot: F, a
step: Keep the mass fixed and record the acceleration for 4 different forces.
step: Then keep the force fixed and double the mass.
noise: 4
result: Acceleration is directly proportional to net force (a straight line through the origin) and inversely proportional to mass: a = F/m, Newton's second law.
term: Newton's second law = the net force on an object equals its mass times its acceleration
term: weight = the force of gravity on an object, W = mg
term: mass = the amount of matter in an object, measured in kilograms
term: newton = the SI unit of force; 1 N = 1 kg·m/s²
q: A 5 kg box is pushed with a net force of 20 N. Its acceleration is… | *4 m/s² | 100 m/s² | 0.25 m/s² | 15 m/s²
why: a = F ÷ m = 20 ÷ 5.
q: On the Moon, your mass is… | *the same as on Earth | one sixth as much | zero | six times more
why: Mass doesn't depend on location; weight does.
gen: stem.newton2, stem.weight

@lesson Newton's third law, friction and free-body diagrams
say: Forces always come in pairs. And friction is the force that makes walking possible!
key: Newton's third law: for every action force there is an equal and opposite reaction force, acting on a different object.
When you push on a wall, the wall pushes back on you just as hard. A rocket pushes gas down; the gas pushes the rocket up.
Friction opposes sliding. Static friction keeps things from starting to move; kinetic friction acts on things already sliding. Friction force = μ × normal force, where μ is the coefficient of friction.
A free-body diagram shows an object as a dot with arrows for every force on it: gravity (down), normal force (perpendicular to the surface), friction (opposite motion), tension and applied forces.
oops: Action–reaction forces never cancel, because they act on different objects.
term: Newton's third law = forces come in equal and opposite pairs acting on different objects
term: friction = a force that opposes sliding between surfaces
term: normal force = the support force a surface exerts, perpendicular to the surface
term: free-body diagram = a sketch showing all the forces acting on one object
q: A bat hits a ball with 500 N. How hard does the ball push on the bat? | *500 N | 0 N | 250 N | 1,000 N
why: Third law: equal and opposite.
q: Friction always acts… | *opposite to the sliding motion | in the direction of motion | straight up | toward Earth's center
why: Friction resists sliding.

@unit Motion in Two Dimensions | Vectors, projectile motion, circular motion and gravitation
@lesson Vectors
say: In two dimensions, direction really matters. Vectors let us add motions and forces at angles.
A vector has a magnitude and a direction, drawn as an arrow. To add vectors, place them tip to tail; the resultant goes from the first tail to the last tip.
Any vector can be split into components: x = V cos θ and y = V sin θ.
ex: A plane flies 300 km north, then 400 km east. Find its displacement.
> The legs are perpendicular, so use the Pythagorean theorem
> √(300² + 400²) = √250,000
= 500 km, at about 53° east of north
Perpendicular components are independent: what happens horizontally doesn't affect what happens vertically.
term: resultant = the vector sum of two or more vectors
term: component = the part of a vector along the x- or y-axis
term: magnitude = the size of a vector
q: You walk 6 m east and 8 m north. How far are you from the start? | *10 m | 14 m | 2 m | 48 m
why: √(36 + 64) = 10.
q: A 10 N force points at 30° above horizontal. Its vertical component is… | *5 N | 8.7 N | 10 N | 3 N
why: 10 × sin 30° = 5 N.
gen: pyth

@lesson Projectile motion
say: Throw a ball and it follows a curved path. Split it into horizontal and vertical parts and it gets simple!
key: A projectile moves at constant horizontal velocity while accelerating downward at 9.8 m/s². The two motions are independent.
A ball rolled off a table and a ball dropped from the same height hit the floor at the same time, because their vertical motions are identical.
ex: A ball is thrown horizontally at 15 m/s from a 20 m cliff. How far from the base does it land?
> Vertical: 20 = ½(9.8)t², so t ≈ 2.0 s
> Horizontal: x = 15 × 2.0
= about 30 m
A projectile launched from the ground goes farthest at 45° (without air resistance).
lab: Projectile launcher
aim: Fire a ball from a launcher at different angles. Which angle sends it farthest?
set: th = 30 | Launch angle (°) | 5 to 85 by 5
set: v = 15 | Launch speed (m/s) | 5 to 30 by 1
out: R = v^2*sind(2*th)/g | Range (m)
out: H = (v*sind(th))^2/(2*g) | Max height (m)
plot: th, R
sim: projectile | v=v, a=th
step: Keep the speed fixed and record the range for at least 5 angles.
step: Compare complementary angles such as 30° and 60°.
noise: 3
result: The range peaks at 45°. Complementary angles (30° and 60°) land at the same spot, but the steeper one flies higher and stays in the air longer.
term: projectile = an object moving through the air under gravity alone after being launched
term: trajectory = the curved path a projectile follows
term: range = the horizontal distance a projectile travels
q: At the top of its path, a projectile's vertical velocity is… | *zero | maximum | equal to its horizontal velocity | 9.8 m/s
why: It stops rising for an instant.
q: Ignoring air, a projectile's horizontal velocity… | *stays constant | increases | decreases | becomes zero at the top
why: No horizontal force acts on it.

@lesson Circular motion and gravity
say: Anything moving in a circle is always accelerating toward the center. Gravity keeps the planets doing exactly that!
Even at constant speed, an object moving in a circle is accelerating because its direction keeps changing. This centripetal acceleration points toward the center: a = v²/r.
The force causing it is the centripetal force: F = mv²/r. It can come from tension, friction or gravity.
key: Newton's law of universal gravitation: F = Gm₁m₂/r². Double the distance and gravity becomes 1/4 as strong.
Gravity provides the centripetal force that keeps the Moon and satellites in orbit. Astronauts float because they're falling around Earth along with their spacecraft.
oops: There's no outward "centrifugal force" pushing you out on a merry-go-round. Your inertia wants to go straight, and the ride pulls you inward.
term: centripetal force = the net force toward the center that keeps an object moving in a circle
term: universal gravitation = every mass attracts every other mass with a force that depends on their masses and distance
term: orbit = the curved path of an object around another due to gravity
q: The distance between two masses is tripled. The gravitational force becomes… | *1/9 as strong | 1/3 as strong | 3 times stronger | 9 times stronger
why: Inverse square: (1/3)² = 1/9.
q: A car turns a corner at constant speed. Is it accelerating? | *Yes, its direction is changing | No, its speed is constant | Only if it brakes | Only if it speeds up
why: Changing direction is a change in velocity.

@unit Work, Energy and Power | Work and power, kinetic and potential energy, conservation of energy
@lesson Work and power
say: In physics, work has a very specific meaning: a force moving something.
key: Work = force × distance (in the direction of the force): W = Fd. Units: joules (J).
If you push on a wall and it doesn't move, you do no work on it. Carrying a box horizontally at constant speed does no work on the box either, since the force (up) is perpendicular to the motion.
Power is how fast work is done: P = W ÷ t, measured in watts (W). 1 W = 1 J/s.
ex: You lift a 100 N box 2 m in 4 s. Find the work and power.
> W = 100 × 2 = 200 J
> P = 200 ÷ 4
= 200 J of work at 50 W
Simple machines (levers, pulleys, ramps) don't reduce work; they let you use less force over a longer distance.
term: work = force times the distance moved in the direction of the force
term: joule = the SI unit of work and energy
term: power = the rate at which work is done
term: watt = the SI unit of power; one joule per second
q: You push a box 5 m with a 40 N force. How much work? | *200 J | 8 J | 45 J | 35 J
why: W = 40 × 5 = 200 J.
q: Two people climb the same stairs, one faster. Who uses more power? | *The faster one | The slower one | Same power | Neither does work
why: Same work in less time means more power.
gen: stem.work, stem.power

@lesson Kinetic and potential energy
say: Energy comes in different forms. Moving things have kinetic energy, and lifted things store potential energy.
key: Kinetic energy KE = ½mv². Gravitational potential energy PE = mgh.
Kinetic energy depends on speed squared: doubling speed quadruples KE. That's why highway crashes are so much worse than slow ones.
Gravitational potential energy depends on height. Elastic potential energy is stored in stretched or compressed springs.
ex: Find the KE of a 2 kg ball moving at 3 m/s and the PE of a 2 kg ball on a 5 m shelf.
> KE = ½(2)(3²) = 9 J
> PE = 2 × 9.8 × 5
= KE 9 J, PE 98 J
term: kinetic energy = energy of motion, ½mv²
term: potential energy = stored energy due to position or shape
term: gravitational potential energy = energy stored by height, mgh
q: If an object's speed doubles, its kinetic energy… | *quadruples | doubles | halves | stays the same
why: KE depends on v².
q: Which has more potential energy? | *A 10 kg box on a 3 m shelf | A 10 kg box on a 1 m shelf | A 1 kg box on a 3 m shelf | A 10 kg box on the floor
why: More mass and more height mean more mgh.
gen: stem.kinetic, stem.potential

@lesson Conservation of energy
say: Energy can't be created or destroyed. It just changes form. This is one of the deepest laws in all of science.
key: Law of conservation of energy: the total energy of a closed system stays constant.
On a frictionless roller coaster, potential energy at the top turns into kinetic energy at the bottom: mgh = ½mv².
ex: A ball is dropped from 5 m. How fast is it moving just before it hits the ground?
> mgh = ½mv², so v = √(2gh)
> v = √(2 × 9.8 × 5) = √98
= about 9.9 m/s
In real life, friction turns some energy into thermal energy (heat), so mechanical energy decreases, but the total energy is still conserved.
Efficiency = useful energy out ÷ energy in × 100%. No machine is 100% efficient.
lab: Roller coaster energy
aim: Release a cart from rest at the top of a hill. How fast is it going at the bottom?
set: h = 20 | Hill height (m) | 1 to 60 by 1
set: m = 500 | Cart mass (kg) | 100 to 1000 by 50
out: PE = m*g*h | Energy at the top (J)
out: v = sqrt(2*g*h) | Speed at the bottom (m/s)
plot: h, v
step: Record the bottom speed for at least 4 hill heights.
step: Change the mass. Does the speed change?
noise: 2
result: All the potential energy becomes kinetic energy: mgh = ½mv², so v = √(2gh). Mass cancels, and quadrupling the height only doubles the speed.
term: conservation of energy = energy cannot be created or destroyed, only transformed
term: mechanical energy = the sum of kinetic and potential energy
term: efficiency = the percent of input energy that becomes useful output
q: At the bottom of a frictionless swing, energy is mostly… | *kinetic | potential | thermal | lost
why: The height is lowest and the speed is highest.
q: A motor uses 1,000 J to do 600 J of useful work. Its efficiency is… | *60% | 40% | 166% | 600%
why: 600 ÷ 1,000 = 60%.
gen: bank.PHYS.energy

@unit Momentum | Momentum and impulse, conservation of momentum, collisions
@lesson Momentum and impulse
say: A slow truck and a fast baseball can both be hard to stop. Momentum measures how hard.
key: Momentum p = mv. It's a vector, in the direction of motion. Units: kg·m/s.
Impulse is a force applied over time: J = FΔt. Impulse equals the change in momentum: FΔt = Δp.
To reduce the force in a collision, increase the time it takes to stop. That's how airbags, helmets, and bending your knees when you land all work.
ex: A 0.15 kg baseball moving at 40 m/s is caught and stopped in 0.1 s. What force does the glove apply?
> Δp = 0.15 × 40 = 6 kg·m/s
> F = Δp ÷ Δt = 6 ÷ 0.1
= 60 N
term: momentum = mass times velocity
term: impulse = force multiplied by the time it acts; equals the change in momentum
q: Why do airbags reduce injuries? | *They increase the stopping time, lowering the force | They reduce your momentum to zero instantly | They increase the force | They make you lighter
why: Same change in momentum over more time means less force.
q: What is the momentum of a 3 kg ball at 4 m/s? | *12 kg·m/s | 7 kg·m/s | 24 kg·m/s | 0.75 kg·m/s
why: p = 3 × 4 = 12.
gen: stem.momentum

@lesson Conservation of momentum and collisions
say: When objects collide, momentum is passed between them, but the total stays the same.
key: In a closed system, total momentum before a collision equals total momentum after.
- Elastic collisions: objects bounce apart and kinetic energy is conserved too (like billiard balls, nearly).
- Inelastic collisions: some kinetic energy turns into heat and sound.
- Perfectly inelastic: objects stick together.
ex: A 2 kg cart at 3 m/s hits a 1 kg cart at rest. They stick together. Find their speed.
> Before: 2 × 3 + 1 × 0 = 6 kg·m/s
> After: (2 + 1)v = 6
= v = 2 m/s
Recoil is conservation of momentum too: when a cannon fires a ball forward, the cannon moves backward.
lab: Collision cart track
aim: Roll a cart into a stationary cart so they stick together. What is their speed afterward?
set: m1 = 2 | Moving cart mass (kg) | 0.5 to 5 by 0.5
set: v1 = 3 | Moving cart speed (m/s) | 0.5 to 6 by 0.5
set: m2 = 2 | Stationary cart mass (kg) | 0.5 to 5 by 0.5
out: vf = m1*v1/(m1 + m2) | Speed after sticking (m/s)
out: KElost = 0.5*m1*v1^2 - 0.5*(m1 + m2)*vf^2 | Kinetic energy lost (J)
plot: m2, vf
sim: collision | m1=m1, v1=v1, m2=m2, e=0
step: Record the final speed for 4 different stationary-cart masses.
step: Check that momentum before (m₁v₁) equals momentum after ((m₁ + m₂)v).
noise: 3
result: Momentum is conserved, so a heavier target means a slower combined speed. Kinetic energy is not conserved in this perfectly inelastic collision; some becomes heat and sound.
term: conservation of momentum = total momentum stays constant in a closed system
term: elastic collision = a collision where kinetic energy is conserved
term: inelastic collision = a collision where some kinetic energy is lost to other forms
term: recoil = the backward motion of an object that launches something forward
q: Two ice skaters at rest push apart. Their total momentum after is… | *zero | positive | doubled | equal to their weight
why: It was zero before, so it's zero after: they move in opposite directions.
q: In which collision do objects stick together? | *Perfectly inelastic | Elastic | Super-elastic | Explosive
why: That's the definition of perfectly inelastic.

@unit Waves and Sound | Wave properties, wave behavior, sound and the Doppler effect
@lesson Wave properties
say: Waves carry energy from place to place without carrying matter. Sound, light and ocean waves are all waves!
- Mechanical waves need a medium (sound, water waves). Electromagnetic waves don't (light).
- Transverse waves vibrate perpendicular to the direction they travel (light, waves on a rope).
- Longitudinal waves vibrate parallel to the direction of travel (sound), with compressions and rarefactions.
Parts of a wave: wavelength (λ, distance between crests), amplitude (height, related to energy), frequency (f, waves per second in hertz) and period (T = 1/f).
key: Wave speed = frequency × wavelength: v = fλ.
ex: A wave has frequency 5 Hz and wavelength 2 m. Find its speed.
> v = fλ = 5 × 2
= 10 m/s
lab: Waves on a string
aim: Shake a string at different frequencies. How does the wavelength change?
set: f = 5 | Frequency (Hz) | 1 to 20 by 1
set: v = 10 | Wave speed (m/s) | 2 to 20 by 1
out: lam = v/f | Wavelength (m)
plot: f, lam
step: Keep the wave speed fixed and record the wavelength at 5 frequencies.
noise: 3
result: Wavelength is inversely proportional to frequency (λ = v/f). Shaking faster makes shorter waves; the speed depends only on the string, not on how you shake it.
term: wavelength = the distance between two crests of a wave
term: frequency = the number of waves passing a point per second, in hertz
term: amplitude = the maximum displacement of a wave from rest; related to its energy
term: transverse wave = a wave that vibrates perpendicular to its direction of travel
term: longitudinal wave = a wave that vibrates parallel to its direction of travel
q: Sound is what kind of wave? | *Longitudinal mechanical | Transverse electromagnetic | Transverse mechanical | Longitudinal electromagnetic
why: Sound is compressions traveling through a medium.
q: If frequency increases at the same speed, wavelength… | *decreases | increases | stays the same | becomes zero
why: v = fλ, so f and λ are inversely related.
gen: stem.wave

@lesson Wave behavior
say: Waves bounce, bend and add up in fascinating ways. Let's see what happens when they meet obstacles and each other.
- Reflection: a wave bounces off a surface (an echo).
- Refraction: a wave bends when it changes speed entering a new medium.
- Diffraction: a wave spreads out around obstacles or through openings (you can hear around corners).
- Interference: when waves overlap, they add. Constructive interference makes a bigger wave; destructive interference can cancel them out (noise-cancelling headphones).
A standing wave forms when waves reflect back and forth and interfere, creating nodes (no motion) and antinodes (maximum motion). Guitar strings vibrate as standing waves.
Resonance happens when something is pushed at its natural frequency, building large vibrations, like pushing a swing at just the right moment.
term: reflection = a wave bouncing off a surface
term: refraction = the bending of a wave as it changes speed in a new medium
term: diffraction = a wave spreading out around an obstacle or through an opening
term: interference = the combining of two or more overlapping waves
term: resonance = large vibrations caused by matching an object's natural frequency
q: Noise-cancelling headphones use… | *destructive interference | constructive interference | refraction | resonance
why: They add a wave that cancels the incoming sound.
q: Hearing someone around a corner is mostly due to… | *diffraction | reflection only | refraction | resonance
why: Sound waves spread around obstacles.
gen: bank.PHYS.waves

@lesson Sound and the Doppler effect
say: Sound is vibrations traveling through the air. Its pitch and loudness depend on the wave.
Sound travels about 343 m/s in air, faster in liquids, and fastest in solids. It can't travel through a vacuum.
- Pitch depends on frequency: high frequency = high pitch. Humans hear about 20 to 20,000 Hz.
- Loudness depends on amplitude and is measured in decibels (dB). Every 10 dB is 10 times the intensity.
key: Doppler effect: a source moving toward you sounds higher-pitched; moving away, it sounds lower.
ex: You see lightning, then hear thunder 3 s later. About how far away is it?
> distance = speed × time
> 343 × 3
= about 1,000 m (1 km)
term: pitch = how high or low a sound seems; determined by frequency
term: decibel = the unit for measuring sound intensity level
term: Doppler effect = a change in observed frequency when a wave source moves relative to the observer
q: An ambulance drives away from you. Its siren sounds… | *lower in pitch | higher in pitch | louder | the same
why: Waves stretch out behind a moving source.
q: Sound travels fastest through… | *steel | air | water | a vacuum
why: Particles in solids are closest together.

@unit Light and Optics | The electromagnetic spectrum, reflection and mirrors, refraction and lenses
@lesson The electromagnetic spectrum
say: Visible light is just a tiny slice of a huge family of waves called the electromagnetic spectrum.
Electromagnetic waves are vibrating electric and magnetic fields. They travel through a vacuum at the speed of light, c = 3.0 × 10⁸ m/s.
key: From longest wavelength (lowest energy) to shortest (highest energy): radio, microwaves, infrared, visible, ultraviolet, X-rays, gamma rays.
Visible light runs from red (longest) to violet (shortest): ROY G BIV. White light is a mix of all colors.
We see an object's color because it reflects that color and absorbs the others. A red apple reflects red light.
Light acts as both a wave and a particle. Particles of light are called photons; higher frequency photons carry more energy.
term: electromagnetic spectrum = the full range of electromagnetic waves by wavelength
term: speed of light = 3.0 × 10⁸ m/s in a vacuum
term: photon = a particle of light energy
term: ultraviolet = EM waves just beyond violet; can cause sunburn
q: Which has the highest energy? | *Gamma rays | Radio waves | Visible light | Microwaves
why: Gamma rays have the shortest wavelength and highest frequency.
q: A leaf looks green because it… | *reflects green light | absorbs green light | emits green light | refracts only green
why: We see the color that's reflected.

@lesson Reflection and mirrors
say: Mirrors work because of one simple rule about how light bounces.
key: Law of reflection: the angle of incidence equals the angle of reflection, both measured from the normal.
- Plane (flat) mirrors make upright, virtual images the same size as the object, as far behind the mirror as the object is in front.
- Concave mirrors curve inward and can focus light to a point (the focal point). They make real or virtual images, used in telescopes and makeup mirrors.
- Convex mirrors curve outward and spread light, giving a wider view with smaller images (car side mirrors).
A real image can be projected on a screen; a virtual image can't, because light only appears to come from it.
term: law of reflection = the angle of incidence equals the angle of reflection
term: normal = a line perpendicular to a surface at the point where light hits
term: focal point = the point where parallel light rays meet after reflecting or refracting
term: virtual image = an image formed where light only appears to come from
q: A ray hits a mirror at 35° from the normal. It reflects at… | *35° | 55° | 70° | 90°
why: Angle of incidence = angle of reflection.
q: Which mirror is used for car side mirrors to show a wide view? | *Convex | Concave | Plane | None
why: Convex mirrors spread light and show more area.

@lesson Refraction and lenses
say: A straw looks bent in a glass of water. That's refraction: light bending as it changes speed.
Light slows down in materials like water and glass. The index of refraction n = c ÷ v tells how much. When light enters a slower medium at an angle, it bends toward the normal.
Total internal reflection happens when light in a slower medium hits the boundary at a large angle and reflects completely. It's how fiber-optic cables carry internet signals.
- Convex (converging) lenses are thicker in the middle and focus light. Magnifying glasses, cameras and your eye use them.
- Concave (diverging) lenses are thinner in the middle and spread light. They correct nearsightedness.
A prism separates white light into colors because each color refracts by a slightly different amount (dispersion). Rainbows work the same way.
lab: Converging lens bench
aim: Move a candle in front of a lens and find where a sharp image forms on the screen.
set: d = 30 | Object distance (cm) | 12 to 80 by 1
set: f = 10 | Focal length (cm) | 5 to 20 by 1
out: di = 1/(1/f - 1/d) | Image distance (cm)
out: M = -di/d | Magnification
plot: d, di
step: Record the image distance for at least 4 object distances.
step: Notice what happens as the object approaches the focal point.
noise: 2
result: The thin-lens equation 1/f = 1/dₒ + 1/dᵢ fits the data. As the object nears the focal point the image moves far away and grows; far away objects form small images near f.
term: refraction = the bending of light as it passes between materials
term: index of refraction = the ratio of light's speed in a vacuum to its speed in a material
term: total internal reflection = complete reflection of light inside a medium at a steep angle
term: converging lens = a lens thicker in the middle that brings light rays together
q: Why does a straw look bent in water? | *Light refracts as it leaves the water | The straw really bends | Reflection off the glass | Diffraction
why: Light changes speed and direction at the water–air boundary.
q: Fiber-optic cables rely on… | *total internal reflection | diffraction | the Doppler effect | dispersion
why: Light keeps reflecting inside the fiber.

@unit Electricity | Electric charge, current, voltage and resistance, circuits
@lesson Electric charge and static electricity
say: Rub a balloon on your hair and it sticks to the wall. That's electric charge at work!
There are two kinds of charge: positive (protons) and negative (electrons). Like charges repel; opposite charges attract.
Objects become charged by gaining or losing electrons: by friction (rubbing), conduction (touching) or induction (bringing a charge near without touching). Charge is conserved: it's moved, never created.
key: Coulomb's law: the electric force gets stronger with more charge and weaker with distance: F = kq₁q₂/r².
Conductors (metals) let charges move easily; insulators (rubber, plastic, glass) don't. Lightning is a giant static discharge.
term: electric charge = a property of matter that causes electric forces; positive or negative
term: conductor = a material that lets electric charges move easily
term: insulator = a material that resists the flow of electric charge
term: static electricity = a buildup of electric charge on an object
q: Two negatively charged balloons will… | *repel | attract | do nothing | become neutral
why: Like charges repel.
q: When you rub a balloon on your hair, what moves? | *Electrons | Protons | Neutrons | Atoms
why: Only electrons move between objects.
gen: bank.PHYS.electricity

@lesson Current, voltage and resistance
say: Electricity in a circuit is like water in pipes. Voltage is the push, current is the flow, and resistance slows it down.
- Current (I) is the flow of charge, measured in amperes (A).
- Voltage (V) is the electric potential difference that pushes charges, measured in volts.
- Resistance (R) opposes current, measured in ohms (Ω). Thinner, longer or hotter wires have more resistance.
key: Ohm's law: V = IR. Electrical power: P = IV.
ex: A 12 V battery is connected to a 4 Ω resistor. Find the current and power.
> I = V ÷ R = 12 ÷ 4 = 3 A
> P = IV = 3 × 12
= 3 A and 36 W
Your electric bill charges for energy in kilowatt-hours: power (kW) × time (h).
lab: Ohm's law circuit
aim: Change the battery voltage across a resistor and read the ammeter.
set: V = 6 | Voltage (V) | 0 to 12 by 0.5
set: R = 10 | Resistance (Ω) | 1 to 50 by 1
out: I = V/R | Current (A)
out: P = V*I | Power (W)
plot: V, I
step: Keep the resistance fixed and record the current at 5 voltages.
step: Then double the resistance and repeat one voltage.
noise: 3
result: Current is proportional to voltage, a straight line whose slope is 1/R. That's Ohm's law: V = IR. Doubling resistance halves the current.
term: current = the rate of flow of electric charge, measured in amperes
term: voltage = electric potential difference that pushes current, measured in volts
term: resistance = opposition to current, measured in ohms
term: Ohm's law = V = IR
q: A 9 V battery drives 3 A of current. What is the resistance? | *3 Ω | 27 Ω | 12 Ω | 6 Ω
why: R = V ÷ I = 9 ÷ 3.
q: A device draws 2 A at 120 V. Its power is… | *240 W | 60 W | 122 W | 118 W
why: P = IV = 2 × 120.
gen: stem.ohm, stem.elecPower

@lesson Series and parallel circuits
say: How you connect parts of a circuit changes everything. Let's compare series and parallel.
A circuit needs a closed loop with an energy source. An open switch breaks the loop.
- Series circuit: one path. Current is the same everywhere. Resistances add: R_total = R₁ + R₂ + … If one bulb burns out, they all go out.
- Parallel circuit: several branches. Voltage is the same across each branch. 1/R_total = 1/R₁ + 1/R₂ + … Adding branches lowers total resistance. If one bulb burns out, the others stay on. Homes are wired in parallel.
ex: Two 6 Ω resistors are connected (a) in series and (b) in parallel. Find each total resistance.
> Series: 6 + 6 = 12 Ω
> Parallel: 1/R = 1/6 + 1/6 = 1/3
= 12 Ω in series, 3 Ω in parallel
Fuses and circuit breakers protect circuits by opening when the current gets too high.
term: series circuit = a circuit with only one path for current
term: parallel circuit = a circuit with two or more separate branches
term: circuit breaker = a switch that opens automatically when current is too high
q: In a series circuit, if one bulb breaks… | *all the bulbs go out | only that bulb goes out | the others get brighter | nothing happens
why: There's only one path, so the loop is broken.
q: Adding more branches to a parallel circuit makes total resistance… | *decrease | increase | stay the same | become infinite
why: More paths make it easier for current to flow.
gen: stem.series, stem.parallel

@unit Magnetism and Modern Physics | Magnets and electromagnetism, induction, atomic and nuclear physics
@lesson Magnetism and electromagnetism
say: Magnets and electricity are two sides of the same coin. A moving charge makes a magnetic field!
Magnets have north and south poles. Like poles repel and unlike poles attract. Magnetic field lines go from north to south outside the magnet. Earth itself is a giant magnet, which is why compasses work.
key: An electric current creates a magnetic field. This is electromagnetism.
An electromagnet is a coil of wire around an iron core. Turning the current on or off turns the magnet on or off, and more coils or more current make it stronger.
Electric motors use magnetic forces on current-carrying wires to turn electrical energy into motion.
term: magnetic field = the region around a magnet where magnetic forces act
term: magnetic pole = one of the two ends of a magnet, north or south
term: electromagnet = a coil of wire that acts as a magnet when current flows
term: electric motor = a device that uses electromagnetism to turn electrical energy into motion
q: How can you make an electromagnet stronger? | *Add more coils of wire | Remove the iron core | Use less current | Make the wire shorter
why: More coils (and more current) strengthen the field.
q: What does an electric current create? | *A magnetic field | Gravity | Sound | Light only
why: Moving charges produce magnetic fields.

@lesson Electromagnetic induction
say: If electricity can make magnetism, can magnetism make electricity? Yes! That's how power plants work.
key: Electromagnetic induction: a changing magnetic field through a coil creates a voltage and current in the coil.
Moving a magnet into a coil of wire induces a current; moving it out reverses the current. The faster the change, the bigger the voltage.
A generator spins coils in a magnetic field (turned by steam, wind or water) to make electricity. It's a motor run in reverse.
A transformer uses induction to change voltage. Power lines carry electricity at very high voltage to reduce energy loss, then transformers step it down for homes.
Alternating current (AC) changes direction many times per second (60 Hz in the US). Direct current (DC), from batteries, flows one way.
lab: Generator coil
aim: Spin a magnet inside a coil and measure the peak voltage it induces.
set: N = 100 | Turns of wire | 10 to 500 by 10
set: f = 10 | Spin rate (turns per second) | 1 to 50 by 1
set: B = 0.2 | Magnet strength (T) | 0.05 to 1 by 0.05
out: Vpk = N*B*0.01*2*pi*f | Peak voltage (V)
plot: f, Vpk
step: Record the peak voltage at 4 spin rates.
step: Then try more turns of wire and a stronger magnet.
noise: 4
result: Induced voltage rises with how fast the magnetic flux changes: more turns, a stronger magnet, or faster spinning all increase it (Faraday's law). The coil area here is 0.01 m².
term: electromagnetic induction = producing a voltage by changing a magnetic field
term: generator = a device that turns motion into electrical energy using induction
term: transformer = a device that changes the voltage of alternating current
term: alternating current = electric current that regularly reverses direction
q: A generator converts… | *mechanical energy into electrical energy | electrical energy into motion | heat into light | chemical energy into heat
why: Spinning coils in a magnetic field produce current.
q: A magnet held still inside a coil produces… | *no current | a steady current | an alternating current | a magnetic field only when hot
why: Induction needs a changing magnetic field.

@lesson Atoms, light and the nucleus
say: Around 1900, physicists discovered that tiny things follow strange new rules. Welcome to modern physics!
Energy comes in tiny packets called quanta. Light's photons each carry energy E = hf, so higher frequency light carries more energy per photon.
The photoelectric effect (light knocking electrons off metal) showed that light behaves like particles. Einstein won the Nobel Prize for explaining it.
Electrons in atoms can only have certain energy levels. When they drop to a lower level, they emit a photon of a specific color, giving each element its own spectrum.
key: E = mc²: mass and energy are equivalent. A tiny amount of mass can release an enormous amount of energy, which is what powers nuclear reactions and the Sun.
Nuclear fission splits heavy nuclei (used in power plants); fusion combines light nuclei (in stars).
term: quantum = the smallest possible packet of energy
term: photoelectric effect = the emission of electrons from a metal when light shines on it
term: mass-energy equivalence = the idea that mass and energy are related by E = mc²
q: Which photon carries more energy? | *Ultraviolet | Red light | Infrared | Radio
why: Higher frequency means more energy per photon (E = hf).
q: Where does the Sun get its energy? | *Nuclear fusion | Nuclear fission | Burning gas | Chemical reactions
why: Hydrogen nuclei fuse into helium, converting mass to energy.
gen: bank.PHYS.modern
`;
