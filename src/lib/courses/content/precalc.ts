export default String.raw`
@course precalc | Precalculus | Honors | 📉 | Math

@unit Functions and Their Graphs | Domain and range, transformations, combinations and inverses, analyzing graphs
@lesson Analyzing functions
say: Precalculus is about understanding functions deeply: their shapes, behaviors and connections. Let's start with the essentials.
A function assigns exactly one output to each input. Key features to analyze:
- Domain and range, written in interval notation like [−2, 5) or (−∞, 3].
- Intercepts, increasing and decreasing intervals, and relative maximums and minimums.
- Symmetry: even functions satisfy f(−x) = f(x) (symmetric about the y-axis); odd functions satisfy f(−x) = −f(x) (symmetric about the origin).
key: Average rate of change on [a, b] = (f(b) − f(a)) ÷ (b − a), the slope of the secant line.
ex: Is f(x) = x³ − 4x even, odd or neither?
> f(−x) = (−x)³ − 4(−x) = −x³ + 4x
> That equals −(x³ − 4x) = −f(x)
= Odd
term: interval notation = writing a set of numbers using brackets and parentheses, like [0, 4)
term: even function = a function where f(−x) = f(x), symmetric about the y-axis
term: odd function = a function where f(−x) = −f(x), symmetric about the origin
term: relative maximum = a point higher than all nearby points on a graph
q: What is the domain of f(x) = 1/(x − 3) in interval notation? | *(−∞, 3) ∪ (3, ∞) | [3, ∞) | (−∞, ∞) | (3, ∞)
why: Every real number except 3.
q: f(x) = x² + 1 is… | *even | odd | neither | both
why: f(−x) = x² + 1 = f(x).
gen: funcEval

@lesson Transformations, composition and inverses
say: Transformations, compositions and inverses let you build complicated functions from simple ones and run them backward.
key: y = a·f(b(x − h)) + k: h shifts horizontally, k vertically, |a| stretches vertically, |b| compresses horizontally by a factor of 1/|b|, and negative a or b reflect.
Composition (f ∘ g)(x) = f(g(x)). The domain of f ∘ g includes only x-values in g's domain whose outputs are in f's domain.
To find an inverse: swap x and y and solve for y. A function has an inverse function only if it's one-to-one (passes the horizontal line test). The graphs of f and f⁻¹ reflect across y = x.
ex: f(x) = √x and g(x) = x − 4. Find (f ∘ g)(x) and its domain.
> f(g(x)) = √(x − 4)
> Need x − 4 ≥ 0
= √(x − 4), domain [4, ∞)
demo: Coupon order matters
aim: A store lets you use a $10-off coupon and a 20%-off coupon. Does the order of the two functions matter?
set: x = 60 | Price ($) | 10 to 200 by 5
out: pctFirst = 0.8*x - 10 | 20% off, then $10 off: g(f(x))
out: dolFirst = 0.8*(x - 10) | $10 off, then 20% off: f(g(x))
out: diff = dolFirst - pctFirst | Difference ($)
plot: x, pctFirst
step: Compare the two compositions at several prices. Is the difference always the same?
result: Composition isn't commutative: f(g(x)) ≠ g(f(x)) in general. Taking 20% off first always saves you $2 more here, because the $10 coupon isn't shrunk by the percentage.
term: composition = combining functions by using one function's output as another's input
term: one-to-one function = a function where each output comes from exactly one input
term: horizontal line test = a function is one-to-one if no horizontal line crosses its graph more than once
q: How does y = f(2x) compare to y = f(x)? | *Compressed horizontally by a factor of 1/2 | Stretched horizontally by 2 | Stretched vertically by 2 | Shifted right 2
why: Multiplying x by 2 compresses the graph horizontally.
q: Find f⁻¹(x) for f(x) = 3x − 6. | *(x + 6)/3 | 3x + 6 | (x − 6)/3 | x/3 − 6
why: Swap and solve: x = 3y − 6, y = (x + 6)/3.
gen: stem.compose, alg2.inverseLin

@unit Polynomial and Rational Functions | Polynomial behavior and zeros, complex zeros, rational functions and asymptotes, inequalities
@lesson Polynomial functions and their zeros
say: Polynomials are smooth, continuous curves. Their degree, leading coefficient and zeros tell you their whole shape.
End behavior depends on the degree and leading coefficient. A degree-n polynomial has at most n real zeros and at most n − 1 turning points.
key: Fundamental Theorem of Algebra: a degree-n polynomial has exactly n complex zeros (counting multiplicity). Complex zeros of real polynomials come in conjugate pairs.
Tools for finding zeros: the Rational Root Theorem, synthetic division, the Factor Theorem, and factoring.
ex: A polynomial with real coefficients has zeros 2 and 3 + i. Name another zero, and the lowest possible degree.
> Complex zeros come in conjugate pairs: 3 − i
= 3 − i is also a zero; the lowest degree is 3
Multiplicity: at a zero with odd multiplicity the graph crosses the x-axis; with even multiplicity it touches and turns.
term: fundamental theorem of algebra = a degree-n polynomial has exactly n complex zeros
term: conjugate pair = two complex numbers a + bi and a − bi
term: multiplicity = how many times a zero appears as a factor
q: How many complex zeros does a degree-6 polynomial have? | *6 | 5 | 3 | at most 2
why: Exactly n, counting multiplicity.
q: If 4 − 2i is a zero of a polynomial with real coefficients, which must also be a zero? | *4 + 2i | −4 − 2i | 2i | −4 + 2i
why: Complex zeros come in conjugate pairs.
gen: alg2.remainder, alg2.complex

@lesson Rational functions and inequalities
say: Rational functions have asymptotes and holes that create dramatic graphs. Let's learn to sketch them by analysis.
For f(x) = p(x)/q(x) (in lowest terms):
- Vertical asymptotes at zeros of q.
- Holes where a factor cancels.
- Horizontal asymptote by comparing degrees; if the top's degree is exactly one more, there's a slant (oblique) asymptote found by long division.
key: To solve polynomial or rational inequalities, find the critical values (zeros and undefined points), make a sign chart, and test each interval.
ex: Solve (x − 2)/(x + 1) ≥ 0.
> Critical values: x = 2 (zero) and x = −1 (undefined)
> Test intervals: x < −1 positive; −1 < x < 2 negative; x > 2 positive
= (−∞, −1) ∪ [2, ∞)
demo: Medicine in the bloodstream
aim: After a pill is taken, the drug concentration follows the rational function C(t) = 50t/(t² + 4).
set: t = 2 | Hours after the dose | 0 to 24 by 0.25
out: C = 50*t/(t^2 + 4) | Concentration (mg/L)
plot: t, C
step: When is the concentration highest? What happens in the long run?
result: The concentration peaks at t = 2 hours (12.5 mg/L) and then decays. Because the denominator's degree is higher, C(t) → 0: the horizontal asymptote is y = 0.
term: slant asymptote = a diagonal asymptote when the numerator's degree is one more than the denominator's
term: sign chart = a number line showing where an expression is positive or negative
term: critical value = a value where an expression equals zero or is undefined
q: f(x) = (x² + 1)/(x − 1) has which kind of asymptote besides x = 1? | *Slant | Horizontal at y = 1 | Horizontal at y = 0 | None
why: The numerator's degree is one more than the denominator's.
q: Why is x = −1 excluded in (x − 2)/(x + 1) ≥ 0? | *It makes the denominator zero | It makes the expression zero | It's negative | It's a hole
why: Division by zero is undefined.
gen: alg2.asymptote

@unit Exponential and Logarithmic Functions | Exponential models, logarithms and their properties, solving equations, applications
@lesson Exponential and logarithmic functions
say: Exponentials and logs are inverses. Together they model growth, decay, sound, earthquakes and more.
key: y = bˣ and y = log_b x are inverse functions. log_b x = y means bʸ = x.
Properties: log(MN) = log M + log N; log(M/N) = log M − log N; log(Mᵏ) = k log M; change of base log_b x = ln x / ln b.
Graphs: y = bˣ has a horizontal asymptote y = 0 and passes through (0, 1). y = log_b x has a vertical asymptote x = 0 and passes through (1, 0).
ex: Condense 2 ln x + ln 5 − ln y into one logarithm.
> 2 ln x = ln x²
> ln x² + ln 5 = ln 5x²
= ln(5x²/y)
term: logarithm = the exponent to which a base must be raised to produce a number
term: natural logarithm = ln x, the logarithm with base e
term: change of base formula = log_b x = log x / log b
q: log₂ 64 = | *6 | 32 | 8 | 4
why: 2⁶ = 64.
q: The graph of y = ln x has a vertical asymptote at… | *x = 0 | y = 0 | x = 1 | y = 1
why: Logarithms are undefined for x ≤ 0.
gen: stem.logs

@lesson Solving equations and modeling
say: Exponential models describe real change. Solving them means using logs to bring exponents down.
To solve exponential equations: isolate the exponential, take a log of both sides, and use the power rule. To solve log equations: condense, rewrite in exponential form, and check for extraneous solutions.
key: Continuous growth: A = Pe^(rt). Compound interest: A = P(1 + r/n)^(nt). Half-life and doubling time come from setting A = P/2 or A = 2P.
ex: How long does it take $1,000 to double at 6% compounded continuously?
> 2000 = 1000e^(0.06t), so 2 = e^(0.06t)
> ln 2 = 0.06t
= t = ln 2 / 0.06 ≈ 11.6 years
Logistic growth models populations that level off at a carrying capacity.
demo: Cooling coffee
aim: Coffee at 90 °C cools in a 20 °C room following Newton's law of cooling, T = 20 + 70e^(−kt).
set: t = 10 | Time (min) | 0 to 60 by 1
set: k = 0.05 | Cooling constant k | 0.01 to 0.15 by 0.01
out: T = 20 + 70*exp(-k*t) | Temperature (°C)
out: drink = ln(70/40)/k | Time to reach 60 °C (min)
plot: t, T
step: Solve 60 = 20 + 70e^(−kt) for t using natural logs.
result: The temperature approaches the room temperature exponentially. Taking ln of both sides gives t = ln(70/40)/k, about 11 minutes when k = 0.05.
term: continuous compounding = interest compounded at every instant, A = Pe^(rt)
term: doubling time = the time it takes a growing quantity to double
term: logistic growth = growth that slows as it approaches a maximum
q: Solve e^x = 10. | *x = ln 10 | x = 10/e | x = log 10 | x = e^10
why: Take the natural log of both sides.
q: Solve log₃(x + 1) = 2. | *x = 8 | x = 5 | x = 9 | x = 7
why: x + 1 = 3² = 9.
gen: alg2.expSolve, stem.compound

@unit Trigonometric Functions | Radians and the unit circle, graphs of trig functions, inverse trig functions
@lesson Radians and the unit circle
say: The unit circle is the key to all of trigonometry. Master it and everything else follows.
key: On the unit circle, a point at angle θ has coordinates (cos θ, sin θ), and tan θ = sin θ / cos θ.
Radians: 2π = 360°. Key angles: π/6 (30°), π/4 (45°), π/3 (60°), π/2 (90°).
Exact values in Quadrant I: sin π/6 = 1/2, sin π/4 = √2/2, sin π/3 = √3/2 (and cosine reverses this order).
Use reference angles and quadrant signs (All Students Take Calculus) for other angles. Reciprocal functions: csc = 1/sin, sec = 1/cos, cot = 1/tan.
ex: Find the exact value of tan(4π/3).
> 4π/3 is in Quadrant III with reference angle π/3
> tan π/3 = √3, and tangent is positive in Quadrant III
= √3
term: unit circle = a circle of radius 1 centered at the origin
term: reference angle = the acute angle between an angle's terminal side and the x-axis
term: coterminal angles = angles that share the same terminal side
q: sin(π/2) = | *1 | 0 | −1 | √2/2
why: The point at π/2 is (0, 1).
q: Which angle is coterminal with π/4? | *9π/4 | 3π/4 | −π/4 | 5π/4
why: Add 2π: π/4 + 8π/4 = 9π/4.
gen: stem.trigExact, stem.radians

@lesson Graphs and inverse trig functions
say: Trig functions repeat, so they're perfect for modeling cycles. Inverse trig functions find angles from ratios.
key: y = A sin(B(x − C)) + D: amplitude |A|, period 2π/|B|, phase shift C, midline y = D.
Tangent has period π and vertical asymptotes where cos x = 0. Secant and cosecant have asymptotes where cos and sin are zero.
Inverse trig functions undo trig functions on restricted domains:
- arcsin x: outputs in [−π/2, π/2].
- arccos x: outputs in [0, π].
- arctan x: outputs in (−π/2, π/2).
ex: Evaluate arccos(−1/2).
> Which angle in [0, π] has cosine −1/2?
= 2π/3
Modeling: a Ferris wheel, tides or daylight hours can be modeled by a sinusoid by finding the amplitude, midline and period from the data.
demo: Hours of daylight
aim: Daylight follows a sine wave through the year. Change your latitude and see the pattern.
set: d = 172 | Day of the year | 1 to 365 by 1
set: lat = 40 | Latitude (° N) | 0 to 60 by 1
out: A = 4.5*sind(lat)*1.12 | Amplitude (hours)
out: hrs = 12 + A*sin(2*pi*(d - 80)/365) | Hours of daylight
plot: d, hrs
step: Find the longest and shortest days. How does the amplitude change near the equator?
result: Daylight = 12 + A sin(2π(d − 80)/365): midline 12 hours, period 365 days, and an amplitude that grows with latitude. At the equator days stay close to 12 hours all year.
term: phase shift = the horizontal shift of a periodic function
term: sinusoid = a graph shaped like a sine or cosine wave
term: arcsin = the inverse sine function, with outputs between −π/2 and π/2
q: What is the period of y = 3 sin(πx)? | *2 | π | 3 | 2π
why: 2π/π = 2.
q: arcsin(1) = | *π/2 | 0 | π | −π/2
why: sin(π/2) = 1.

@unit Trigonometric Identities and Equations | Fundamental identities, sum and double-angle formulas, solving trig equations, laws of sines and cosines
@lesson Identities
say: Trig identities let you rewrite expressions in simpler or more useful forms. They're essential for calculus.
key: Pythagorean identities: sin²θ + cos²θ = 1, 1 + tan²θ = sec²θ, 1 + cot²θ = csc²θ.
Other key identities:
- Sum and difference: sin(A ± B) = sin A cos B ± cos A sin B; cos(A ± B) = cos A cos B ∓ sin A sin B.
- Double angle: sin 2θ = 2 sin θ cos θ; cos 2θ = cos²θ − sin²θ = 1 − 2sin²θ = 2cos²θ − 1.
To verify an identity, work on one side only: rewrite in terms of sine and cosine, factor, or use Pythagorean identities.
ex: Find the exact value of sin 75°.
> sin(45° + 30°) = sin 45° cos 30° + cos 45° sin 30°
> (√2/2)(√3/2) + (√2/2)(1/2)
= (√6 + √2)/4
term: Pythagorean identity = sin²θ + cos²θ = 1 and related forms
term: double-angle formula = an identity expressing a trig function of 2θ in terms of θ
term: verify an identity = show that two expressions are equal for all valid values
q: Simplify 1 − sin²θ. | *cos²θ | tan²θ | sec²θ | −cos²θ
why: From sin²θ + cos²θ = 1.
q: sin 2θ equals… | *2 sin θ cos θ | 2 sin θ | sin²θ − cos²θ | cos²θ − sin²θ
why: That's the double-angle formula for sine.

@lesson Solving trig equations and triangles
say: Trig equations have infinitely many solutions because trig functions repeat. And the laws of sines and cosines solve any triangle.
To solve a trig equation: isolate the trig function, find solutions in one period, then add multiples of the period for all solutions.
ex: Solve 2cos x + 1 = 0 on [0, 2π).
> cos x = −1/2
= x = 2π/3 or 4π/3
key: Law of Sines: a/sin A = b/sin B = c/sin C. Law of Cosines: c² = a² + b² − 2ab cos C.
Use the Law of Sines for AAS, ASA and SSA (watch for the ambiguous case with two possible triangles). Use the Law of Cosines for SAS and SSS.
Area of a triangle with two sides and the included angle: Area = ½ab sin C.
demo: Two ships leave port
aim: Two ships leave the same port, one sailing 30 km and the other 40 km, separated by an angle. How far apart are they?
set: C = 90 | Angle between their paths (°) | 0 to 180 by 1
set: a = 30 | Ship A distance (km) | 5 to 60 by 5
out: c = sqrt(a^2 + 40^2 - 2*a*40*cosd(C)) | Distance apart (km)
plot: C, c
step: Check the 90° case with the Pythagorean theorem. Then try 60° and 120°.
result: The Law of Cosines c² = a² + b² − 2ab cos C works for any triangle. At 90° it becomes the Pythagorean theorem (50 km); a wider angle means a larger distance.
term: law of sines = a/sin A = b/sin B = c/sin C
term: law of cosines = c² = a² + b² − 2ab cos C
term: ambiguous case = the SSA situation where zero, one or two triangles are possible
q: You know two sides and the included angle. Which law finds the third side? | *Law of Cosines | Law of Sines | Pythagorean theorem only | Neither
why: SAS requires the Law of Cosines.
q: Solve sin x = 1 on [0, 2π). | *π/2 | π | 3π/2 | 0
why: sin x = 1 only at π/2 in that interval.

@unit Vectors, Parametric and Polar | Vectors and operations, parametric equations, polar coordinates and graphs, complex numbers in polar form
@lesson Vectors
say: Vectors have both size and direction, making them perfect for forces, velocities and navigation.
A vector can be written as ⟨a, b⟩ or ai + bj. Its magnitude is |v| = √(a² + b²), and its direction angle θ satisfies tan θ = b/a.
- Add and subtract component by component.
- Scalar multiplication stretches a vector: 3⟨1, 2⟩ = ⟨3, 6⟩.
- A unit vector has magnitude 1: v/|v|.
key: Dot product: u · v = u₁v₁ + u₂v₂ = |u||v|cos θ. If u · v = 0, the vectors are perpendicular (orthogonal).
ex: Find the angle between u = ⟨1, 0⟩ and v = ⟨1, 1⟩.
> u · v = 1; |u| = 1; |v| = √2
> cos θ = 1/√2
= θ = 45°
term: vector = a quantity with magnitude and direction
term: magnitude = the length of a vector
term: dot product = u₁v₁ + u₂v₂; zero for perpendicular vectors
term: unit vector = a vector with magnitude 1
q: What is the magnitude of ⟨5, 12⟩? | *13 | 17 | 7 | 60
why: √(25 + 144) = 13.
q: ⟨2, 3⟩ · ⟨3, −2⟩ = | *0 | 12 | 6 | 13
why: 6 − 6 = 0, so they're perpendicular.
gen: stem.magnitude, stem.dot

@lesson Parametric equations and polar coordinates
say: Parametric and polar equations describe curves that ordinary y = f(x) functions can't, like circles traced over time and flower shapes.
Parametric equations give x and y in terms of a parameter t: x = f(t), y = g(t). They describe motion, showing position and direction over time. To eliminate the parameter, solve one equation for t and substitute.
Polar coordinates (r, θ) locate a point by distance from the origin and angle.
key: Converting: x = r cos θ, y = r sin θ, r² = x² + y², tan θ = y/x.
Polar graphs include circles (r = a), roses (r = a cos nθ), cardioids (r = a + a cos θ) and limaçons.
Complex numbers in polar form: a + bi = r(cos θ + i sin θ). De Moivre's theorem: [r(cos θ + i sin θ)]ⁿ = rⁿ(cos nθ + i sin nθ).
ex: Convert the polar point (4, π/3) to rectangular coordinates.
> x = 4 cos(π/3) = 2
> y = 4 sin(π/3) = 2√3
= (2, 2√3)
demo: The path of a kicked ball
aim: A ball is kicked at a speed and angle. Eliminate the parameter t to find its height at any horizontal distance.
set: x = 10 | Horizontal distance (m) | 0 to 40 by 0.5
set: v = 20 | Launch speed (m/s) | 10 to 30 by 1
set: th = 40 | Launch angle (°) | 10 to 80 by 1
out: t = x/(v*cosd(th)) | Time to reach x (s)
out: y = x*tand(th) - g*x^2/(2*v^2*cosd(th)^2) | Height (m)
plot: x, y
step: Start from x = (v cos θ)t and y = (v sin θ)t − 4.9t². Solve the first for t and substitute.
result: Eliminating t gives y = x tan θ − gx²/(2v² cos² θ), a parabola. The parametric form also tells you when the ball is at each point.
term: parametric equations = equations that express x and y in terms of a parameter t
term: polar coordinates = locating a point by its distance from the origin and its angle
term: De Moivre's theorem = a formula for raising a complex number in polar form to a power
q: Convert (0, 5) to polar coordinates. | *(5, π/2) | (5, 0) | (0, 5) | (5, π)
why: r = 5 and the point is on the positive y-axis.
q: x = t, y = t² describes… | *a parabola | a circle | a line | a rose
why: Eliminating t gives y = x².

@unit Sequences, Series and Limits | Sequences and series, binomial theorem, introduction to limits
@lesson Sequences, series and the binomial theorem
say: Sequences and series show how patterns grow, and the binomial theorem expands powers without endless multiplication.
Arithmetic sequences: aₙ = a₁ + (n − 1)d, Sₙ = n(a₁ + aₙ)/2. Geometric: aₙ = a₁rⁿ⁻¹, Sₙ = a₁(1 − rⁿ)/(1 − r). An infinite geometric series converges to a₁/(1 − r) when |r| < 1.
Mathematical induction proves a statement for all natural numbers: prove a base case, then prove that if it's true for k, it's true for k + 1.
key: Binomial theorem: (a + b)ⁿ = Σ C(n, k) aⁿ⁻ᵏ bᵏ. The coefficients come from Pascal's triangle.
ex: Find the coefficient of x² in (x + 2)⁵.
> The term with x² has k = 3: C(5, 3) x² 2³
> 10 × 8 = 80
= 80
term: binomial theorem = a formula for expanding (a + b)ⁿ using combinations
term: Pascal's triangle = a triangle of numbers giving binomial coefficients
term: mathematical induction = a proof method using a base case and an inductive step
q: What is the 3rd row (1, 3, 3, 1) of Pascal's triangle used for? | *Expanding (a + b)³ | Finding primes | Geometric series | Area
why: Its entries are the coefficients of (a + b)³.
q: Does 1 + 1/3 + 1/9 + … converge? | *Yes, to 1.5 | No | Yes, to 3 | Yes, to 1
why: 1/(1 − 1/3) = 3/2.
gen: stem.arith, stem.geom, stem.geoSeries

@lesson Introduction to limits
say: Limits are the doorway to calculus. They describe what a function approaches, even if it never gets there.
lim (x→c) f(x) = L means f(x) gets arbitrarily close to L as x approaches c. The limit exists only if the left- and right-hand limits are equal.
key: Evaluate limits by direct substitution first. If you get 0/0, factor and cancel, rationalize, or simplify.
ex: Find lim (x→4) (x² − 16)/(x − 4).
> Substitution gives 0/0
> Factor: (x + 4)(x − 4)/(x − 4) = x + 4
= 8
Limits at infinity describe end behavior: for rational functions, compare degrees. A limit that grows without bound is written as ∞ (the limit does not exist as a real number).
demo: Approaching a limit
aim: The function f(x) = sin(x)/x is undefined at x = 0. What value does it approach?
set: x = 1 | x (radians) | -3 to 3 by 0.01
out: f = sin(x)/x | f(x)
plot: x, f
step: Move x closer and closer to 0 from both sides. What happens at exactly 0?
result: f(0) is undefined (0/0), shown as "—", yet as x → 0 from either side f(x) → 1. A limit describes where a function is heading, not its value at the point.
term: limit = the value a function approaches as the input approaches a number
term: one-sided limit = the value a function approaches from one side only
term: limit at infinity = the value a function approaches as x grows without bound
q: lim (x→∞) 5/x = | *0 | 5 | ∞ | does not exist
why: 5/x shrinks toward 0.
q: If the left-hand limit is 2 and the right-hand limit is 3, the limit… | *does not exist | is 2.5 | is 2 | is 3
why: The one-sided limits must agree.
gen: stem.limitHole, stem.limitInf
`;
