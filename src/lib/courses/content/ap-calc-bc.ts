export default String.raw`
@course ap-calc-bc | AP Calculus BC | AP | ∞ | Math

// Follows the 10 units of the AP Calculus BC Course and Exam Description. Units 1–8 match AB plus BC-only topics; Units 9–10 are BC only.

@unit Limits and Continuity | Limits, continuity, asymptotes and the Intermediate Value Theorem
@lesson Limits review
say: BC moves fast, so let's lock in limits quickly. They're the foundation for everything else.
key: lim (x→c) f(x) = L means f(x) approaches L as x approaches c from both sides. The limit exists only if both one-sided limits agree.
Evaluate by direct substitution; for 0/0, factor, rationalize or use special limits like lim (x→0) sin x / x = 1.
ex: lim (x→0) sin(3x)/x
> Rewrite: 3 · sin(3x)/(3x)
= 3
Limits at infinity give horizontal asymptotes; infinite limits give vertical asymptotes.
oops: A limit can exist even when f(c) is undefined, and f(c) can exist even when the limit doesn't. The limit only cares about values near c.
tip: On the exam, use limit notation in your justifications, like "because lim (x→2⁻) f(x) ≠ lim (x→2⁺) f(x), the limit does not exist."
term: limit = the value a function approaches as the input approaches a number
term: indeterminate form = an expression like 0/0 that requires more work to evaluate
term: squeeze theorem = if g ≤ f ≤ h and g and h share a limit, f has that limit too
q: lim (x→0) (1 − cos x)/x = | *0 | 1 | does not exist | ∞
why: This is a standard trig limit.
q: lim (x→∞) (2x³)/(5x³ + x) = | *2/5 | 0 | ∞ | 2
why: Equal degrees: ratio of leading coefficients.
gen: stem.limitHole, stem.limitInf

@lesson Continuity and the IVT
say: Continuity means no breaks. The Intermediate Value Theorem is the first big theorem that depends on it.
key: f is continuous at c if f(c) exists, lim (x→c) f(x) exists, and they're equal.
Discontinuities: removable (hole), jump and infinite. Polynomials, exponentials, sine and cosine are continuous everywhere; rational functions are continuous on their domains.
The IVT: if f is continuous on [a, b] and N is between f(a) and f(b), then f(c) = N for some c in (a, b). Always state continuity when using it.
ex: f is continuous with f(0) = −3 and f(2) = 4. Must f have a zero on (0, 2)?
> 0 is between −3 and 4, and f is continuous
= Yes, by the IVT
term: continuity = a function has no breaks, holes or jumps at a point
term: intermediate value theorem = a continuous function takes every value between f(a) and f(b)
term: jump discontinuity = a break where the one-sided limits exist but differ
q: Which condition is required for the IVT? | *Continuity on a closed interval | Differentiability | f(a) = f(b) | f is increasing
why: The IVT only applies to continuous functions.
q: A hole in a graph is a… | *removable discontinuity | jump discontinuity | vertical asymptote | point of inflection
why: It could be filled by redefining one point.

@unit Differentiation: Definition and Fundamental Properties | The derivative, differentiability, basic rules, product and quotient rules
@lesson The derivative and basic rules
say: The derivative measures instantaneous rate of change. With a few rules, you can differentiate almost anything.
key: f′(x) = lim (h→0) [f(x + h) − f(x)]/h.
Rules: power rule d/dx xⁿ = nxⁿ⁻¹; d/dx eˣ = eˣ; d/dx ln x = 1/x; d/dx sin x = cos x; d/dx cos x = −sin x.
Differentiability implies continuity. A function isn't differentiable at corners, cusps, vertical tangents or discontinuities.
ex: Find f′(x) for f(x) = 3x⁴ − 2√x + eˣ.
> 12x³ − 2·(1/2)x^(−1/2) + eˣ
= f′(x) = 12x³ − 1/√x + eˣ
term: derivative = the instantaneous rate of change of a function
term: differentiable = having a derivative at a point
term: power rule = d/dx xⁿ = nxⁿ⁻¹
q: d/dx [ln x] = | *1/x | ln x | x | eˣ
why: Standard derivative.
q: f(x) = |x − 2| is not differentiable at x = 2 because… | *it has a corner | it is discontinuous | it has a vertical asymptote | it's undefined
why: The slopes from each side differ.
gen: stem.powerRule, stem.derivAt

@lesson Product and quotient rules
say: Products and quotients need their own rules. Practice them until they're automatic.
key: (fg)′ = f′g + fg′. (f/g)′ = (f′g − fg′)/g².
Trig derivatives: d/dx tan x = sec²x, d/dx sec x = sec x tan x, d/dx csc x = −csc x cot x, d/dx cot x = −csc²x.
ex: Differentiate y = x²/(x + 1).
> f = x², f′ = 2x; g = x + 1, g′ = 1
> (2x(x + 1) − x²)/(x + 1)²
= (x² + 2x)/(x + 1)²
term: product rule = (fg)′ = f′g + fg′
term: quotient rule = (f/g)′ = (f′g − fg′)/g²
q: d/dx [x sin x] = | *sin x + x cos x | cos x | x cos x | sin x − x cos x
why: Product rule.
q: d/dx [sec x] = | *sec x tan x | sec²x | −csc x cot x | tan x
why: Standard trig derivative.
gen: calc.productRule

@unit Differentiation: Composite, Implicit and Inverse Functions | Chain rule, implicit differentiation, inverse functions, higher derivatives
@lesson The chain rule and implicit differentiation
say: The chain rule handles nested functions, and implicit differentiation handles equations not solved for y.
key: d/dx f(g(x)) = f′(g(x))·g′(x).
Implicit differentiation: differentiate both sides with respect to x, multiply by dy/dx whenever you differentiate y, then solve for dy/dx.
ex: Find dy/dx if x² + xy + y² = 7.
> 2x + (y + x dy/dx) + 2y dy/dx = 0
> dy/dx (x + 2y) = −2x − y
= dy/dx = −(2x + y)/(x + 2y)
tip: For nested functions like sin²(3x), work from the outside in: 2 sin(3x) · cos(3x) · 3.
oops: Forgetting dy/dx on y terms is the most common implicit differentiation mistake.
term: chain rule = differentiate the outer function, keep the inner, multiply by the inner derivative
term: implicit differentiation = differentiating an equation where y is not isolated
q: d/dx [cos(5x)] = | *−5 sin(5x) | −sin(5x) | 5 cos(5x) | −5 cos(5x)
why: Chain rule with inner derivative 5.
q: d/dx [y²] = | *2y dy/dx | 2y | y² dy/dx | 2
why: y depends on x.
gen: stem.chain, stem.expDeriv

@lesson Inverse functions and higher-order derivatives
say: Derivatives of inverse functions use reciprocal slopes. And second derivatives describe acceleration and concavity.
key: If g = f⁻¹, then g′(a) = 1/f′(g(a)). Inverse trig: d/dx arcsin x = 1/√(1 − x²); d/dx arctan x = 1/(1 + x²).
The second derivative f″ measures how f′ changes. For position s(t), s″(t) is acceleration.
ex: f(x) = x³ + x, and g = f⁻¹. Find g′(2).
> f(1) = 2, so g(2) = 1
> f′(x) = 3x² + 1, f′(1) = 4
= g′(2) = 1/4
tip: You usually don't need a formula for g. Find g(a) by solving f(x) = a, then take the reciprocal of f′ at that x.
oops: g′(a) = 1/f′(a) is wrong. Evaluate f′ at g(a), the matching input, not at a.
term: inverse function derivative = g′(a) = 1/f′(g(a))
term: second derivative = the derivative of the derivative
q: d/dx [arcsin x] = | *1/√(1 − x²) | 1/(1 + x²) | −1/√(1 − x²) | cos x
why: Standard inverse trig derivative.
q: If s(t) = 4t³, the acceleration at t = 1 is… | *24 | 12 | 4 | 36
why: s″(t) = 24t.

@unit Contextual Applications of Differentiation | Rates in context, motion, related rates, linearization, L'Hospital's rule
@lesson Motion and related rates
say: Derivatives describe real rates: speed, growth, leaking tanks and sliding ladders.
key: Velocity v = s′(t), acceleration a = v′(t). Speed |v| increases when v and a have the same sign.
Related rates: write an equation linking the quantities, differentiate with respect to t, then substitute values.
ex: A 10 ft ladder slides down a wall. The bottom moves away at 2 ft/s. How fast is the top falling when the bottom is 6 ft from the wall?
> x² + y² = 100; when x = 6, y = 8
> 2x dx/dt + 2y dy/dt = 0: 2(6)(2) + 2(8) dy/dt = 0
= dy/dt = −1.5 ft/s (falling at 1.5 ft/s)
term: related rates = finding one rate of change from another through a connecting equation
term: speed = the absolute value of velocity
q: v(3) = 4 and a(3) = −2. At t = 3, speed is… | *decreasing | increasing | zero | constant
why: v and a have opposite signs.
q: In related rates, you differentiate with respect to… | *time | x | y | the radius only
why: The rates are changes over time.

@lesson Linearization and L'Hospital's rule
say: Tangent lines approximate functions near a point, and L'Hospital's rule evaluates tough limits.
key: Linearization: L(x) = f(a) + f′(a)(x − a). L'Hospital's rule: for 0/0 or ∞/∞, lim f/g = lim f′/g′.
ex: lim (x→∞) x/eˣ
> ∞/∞, so differentiate: 1/eˣ
= 0
Other indeterminate forms (0·∞, ∞ − ∞, 1^∞, 0⁰, ∞⁰) can be rewritten into 0/0 or ∞/∞ first, often using logs.
Linear approximations are overestimates when f is concave down and underestimates when f is concave up, because the curve bends away from the tangent line.
oops: L'Hospital's rule is NOT the quotient rule. Differentiate the top and bottom separately, and only for 0/0 or ∞/∞ forms.
term: linearization = approximating a function by its tangent line
term: L'Hospital's rule = for 0/0 or ∞/∞ limits, compare derivatives of numerator and denominator
q: lim (x→0) (eˣ − 1)/x = | *1 | 0 | e | ∞
why: L'Hospital: eˣ/1 → 1.
q: Use the tangent line to f(x) = √x at x = 9 to estimate √9.2. | *about 3.033 | about 3.2 | about 3.1 | exactly 3
why: 3 + (1/6)(0.2) ≈ 3.033.
gen: calc.tangentLine

@unit Analytical Applications of Differentiation | MVT, extrema, increasing/decreasing, concavity, optimization, implicit curve analysis
@lesson Extrema and curve analysis
say: Derivatives reveal the shape of a graph: where it rises, falls, peaks and bends.
key: Critical points: f′ = 0 or undefined. First derivative test: f′ changes + to − at a local max, − to + at a local min. f″ > 0: concave up; f″ < 0: concave down.
Mean Value Theorem: if f is continuous on [a, b] and differentiable on (a, b), some c has f′(c) = (f(b) − f(a))/(b − a).
Extreme Value Theorem: a continuous function on a closed interval has an absolute max and min, found at critical points or endpoints.
ex: f′(x) = (x − 1)(x + 2)². Where does f have local extrema?
> f′ changes sign only at x = 1 (− to +)
> At x = −2, f′ doesn't change sign
= Local minimum at x = 1 only
term: critical point = where f′ is zero or undefined
term: mean value theorem = a point exists where the instantaneous rate equals the average rate
term: point of inflection = where concavity changes
q: f′ changes from + to − at x = 4. Then f has a… | *local maximum at x = 4 | local minimum | inflection point | discontinuity
why: Increasing then decreasing means a peak.
q: Absolute extrema on [a, b] occur at… | *critical points or endpoints | only critical points | only endpoints | inflection points
why: The candidates test checks both.
gen: calc.critical

@lesson Optimization
say: Optimization uses derivatives to find the best possible outcome under constraints.
key: Write the quantity to optimize as a function of one variable using the constraint, find critical points, and justify the extremum.
ex: Find the dimensions of a box with a square base and open top, volume 32 ft³, that use the least material.
> V = x²h = 32, so h = 32/x²
> Surface area S = x² + 4xh = x² + 128/x
> S′ = 2x − 128/x² = 0 gives x = 4, so h = 2
= 4 ft × 4 ft × 2 ft (S″ > 0 confirms a minimum)
Always check the domain and endpoints, and answer the question asked.
term: optimization = finding a maximum or minimum value in a real context
term: constraint = an equation that limits the variables
q: To justify a minimum at a critical point, you can show… | *f″ > 0 there | f″ < 0 there | f′ > 0 there | f = 0 there
why: Concave up at a critical point means a minimum.
q: Maximize P = x(30 − x). The best x is… | *15 | 30 | 10 | 0
why: P′ = 30 − 2x = 0.

@unit Integration and Accumulation of Change | Riemann sums, FTC, antiderivatives, u-substitution, integration by parts, partial fractions, improper integrals
@lesson The Fundamental Theorem and substitution
say: Integrals accumulate change. The Fundamental Theorem connects them to antiderivatives.
key: ∫ₐᵇ f(x) dx = F(b) − F(a), and d/dx ∫ₐˣ f(t) dt = f(x).
Riemann sums (left, right, midpoint, trapezoid) approximate integrals. u-substitution reverses the chain rule; change the limits for definite integrals.
ex: Evaluate ∫₀¹ 2x(x² + 1)³ dx.
> u = x² + 1, du = 2x dx; limits become 1 to 2
> ∫₁² u³ du = [u⁴/4] from 1 to 2
= 4 − 1/4 = 15/4
oops: When the upper limit is a function, like ∫₀^(x²) f(t) dt, the derivative is f(x²) · 2x by the chain rule.
tip: For an increasing function, a left Riemann sum underestimates and a right Riemann sum overestimates the integral.
term: fundamental theorem of calculus = differentiation and integration are inverse processes
term: u-substitution = a technique that reverses the chain rule
term: Riemann sum = an approximation of an integral using rectangles
q: d/dx ∫₁ˣ cos(t²) dt = | *cos(x²) | sin(x²) | 2x cos(x²) | cos(x)
why: FTC Part 1.
q: ∫₀³ x² dx = | *9 | 27 | 3 | 6
why: x³/3 from 0 to 3.
gen: stem.integral, calc.riemann

@lesson BC integration techniques
say: BC adds three powerful techniques: integration by parts, partial fractions and improper integrals.
key: Integration by parts: ∫ u dv = uv − ∫ v du. Choose u using LIATE (logs, inverse trig, algebraic, trig, exponential).
ex: ∫ x eˣ dx
> u = x, dv = eˣ dx; du = dx, v = eˣ
= x eˣ − eˣ + C
Partial fractions split rational functions with factorable denominators (distinct linear factors): 1/((x − 1)(x + 2)) = A/(x − 1) + B/(x + 2).
Improper integrals have infinite limits or infinite discontinuities. Evaluate them as limits: ∫₁^∞ 1/x² dx = lim (b→∞) [−1/x] from 1 to b = 1 (converges). ∫₁^∞ 1/x dx diverges.
term: integration by parts = ∫ u dv = uv − ∫ v du
term: partial fractions = splitting a rational function into simpler fractions to integrate
term: improper integral = an integral with an infinite limit or infinite discontinuity, evaluated as a limit
q: Does ∫₁^∞ 1/x³ dx converge? | *Yes, to 1/2 | No | Yes, to 1 | Yes, to 3
why: [−1/(2x²)] from 1 to ∞ = 1/2.
q: For ∫ x ln x dx, the best choice of u is… | *ln x | x | x ln x | dx
why: LIATE puts logs first.

@unit Differential Equations | Slope fields, separation of variables, exponential and logistic models, Euler's method
@lesson Slope fields, separation of variables and Euler's method
say: Differential equations describe how quantities change. BC adds Euler's method to approximate solutions numerically.
key: Separate variables, integrate both sides, add C, then use the initial condition. dy/dt = ky has solution y = y₀e^(kt).
Slope fields show the slope dy/dx at each point; solution curves follow them.
Euler's method approximates a solution step by step: y_new = y_old + (dy/dx)·Δx.
ex: dy/dx = x + y, y(0) = 1. Use Euler's method with Δx = 0.5 to estimate y(1).
> Step 1: slope at (0, 1) is 1; y(0.5) ≈ 1 + 1(0.5) = 1.5
> Step 2: slope at (0.5, 1.5) is 2; y(1) ≈ 1.5 + 2(0.5)
= y(1) ≈ 2.5
term: Euler's method = a step-by-step numerical method for approximating solutions to differential equations
term: slope field = a graph of short segments showing slopes from a differential equation
term: separation of variables = rewriting a differential equation so each variable is on one side
q: Euler's method uses which line to step forward? | *The tangent line | The secant line | A horizontal line | The x-axis
why: Each step follows the current slope.
q: The solution to dy/dt = −0.2y with y(0) = 50 is… | *y = 50e^(−0.2t) | y = 50 − 0.2t | y = −0.2e^(50t) | y = 50e^(0.2t)
why: Exponential decay.
gen: calc.expModel

@lesson Logistic growth
say: Real populations don't grow forever. The logistic model captures growth that levels off.
key: Logistic differential equation: dP/dt = kP(1 − P/L), where L is the carrying capacity.
- As t → ∞, P → L (for P₀ > 0).
- Growth is fastest when P = L/2, the inflection point of the solution curve.
- If P > L, the population decreases toward L.
ex: dP/dt = 0.4P(1 − P/800). What is the carrying capacity, and when is growth fastest?
> L = 800
= Carrying capacity 800; fastest growth at P = 400
term: logistic differential equation = dP/dt = kP(1 − P/L), modeling growth with a limit
term: carrying capacity = the limiting value L a logistic population approaches
q: In dP/dt = 2P(1 − P/500), the population grows fastest when P = | *250 | 500 | 1000 | 2
why: Half the carrying capacity.
q: If P(0) = 600 and L = 500, the population… | *decreases toward 500 | increases forever | stays at 600 | drops to 0
why: Above L, dP/dt is negative.

@unit Applications of Integration | Average value, motion, area, volume, arc length
@lesson Area, volume and average value
say: Integrals compute totals: areas, volumes, distances and averages.
key: Average value = (1/(b − a))∫ₐᵇ f(x) dx. Area between curves = ∫ (top − bottom) dx. Disc: π∫R² dx. Washer: π∫(R² − r²) dx. Cross sections: ∫A(x) dx.
Motion: displacement = ∫v dt; total distance = ∫|v| dt; position s(t) = s(0) + ∫₀ᵗ v.
ex: Find the volume when y = x² on [0, 2] is rotated about the x-axis.
> Disc radius x²
> π∫₀² x⁴ dx = π[x⁵/5] from 0 to 2
= 32π/5
term: washer method = volume by integrating π(R² − r²)
term: average value = the integral over an interval divided by its length
q: Total distance traveled is the integral of… | *|v(t)| | v(t) | a(t) | s(t)
why: Absolute value counts backward motion as distance.
q: Average value of f(x) = x² on [0, 3]? | *3 | 9 | 4.5 | 1
why: (1/3)(9) = 3.
gen: calc.avgValue

@lesson Arc length
say: BC adds arc length: the exact length of a curved path.
key: Arc length of y = f(x) from a to b: L = ∫ₐᵇ √(1 + (f′(x))²) dx.
For parametric curves: L = ∫ √((dx/dt)² + (dy/dt)²) dt.
ex: Find the length of y = (2/3)x^(3/2) from x = 0 to 3.
> f′(x) = x^(1/2), so 1 + (f′)² = 1 + x
> ∫₀³ √(1 + x) dx = (2/3)(1 + x)^(3/2) from 0 to 3
= (2/3)(8 − 1) = 14/3
Many arc length integrals can't be done by hand; on the exam, use a calculator when permitted.
term: arc length = the length of a curve between two points
term: arc length formula = L = ∫ √(1 + (f′(x))²) dx
q: The arc length integrand for y = f(x) is… | *√(1 + (f′(x))²) | f′(x) | 1 + f(x)² | √(f(x))
why: It comes from the Pythagorean theorem on tiny segments.
q: Arc length of a straight line y = x from 0 to 1 is… | *√2 | 1 | 2 | 1/2
why: ∫₀¹ √2 dx = √2.

@unit Parametric Equations, Polar Coordinates and Vector-Valued Functions | Parametric derivatives, motion with vectors, polar derivatives and area
@lesson Parametric and vector-valued functions
say: Parametric and vector functions describe motion in the plane, one of BC's signature topics.
key: For x(t), y(t): dy/dx = (dy/dt)/(dx/dt). d²y/dx² = [d/dt(dy/dx)]/(dx/dt).
For a particle with position vector ⟨x(t), y(t)⟩:
- Velocity ⟨x′(t), y′(t)⟩, acceleration ⟨x″(t), y″(t)⟩.
- Speed = √((x′)² + (y′)²).
- Distance traveled = ∫ speed dt.
ex: x = t², y = t³. Find dy/dx at t = 2.
> dy/dt = 3t² = 12; dx/dt = 2t = 4
= dy/dx = 3
Horizontal tangents occur where dy/dt = 0 (and dx/dt ≠ 0); vertical tangents where dx/dt = 0 (and dy/dt ≠ 0).
tip: The particle's position at time t is its starting position plus the integral of velocity: x(t) = x(0) + ∫₀ᵗ x′(u) du, and the same for y.
term: parametric derivative = dy/dx = (dy/dt)/(dx/dt)
term: vector-valued function = a function whose output is a vector, like ⟨x(t), y(t)⟩
term: speed = the magnitude of the velocity vector
q: A particle has velocity ⟨3, 4⟩. Its speed is… | *5 | 7 | 1 | 12
why: √(9 + 16) = 5.
q: For x = cos t, y = sin t, dy/dx = | *−cot t | tan t | −tan t | cot t
why: cos t / (−sin t).

@lesson Polar curves
say: Polar curves draw shapes by angle and radius. Calculus finds their slopes and the areas they enclose.
key: Area enclosed by r = f(θ) from α to β: A = ½∫ r² dθ.
Slope of a polar curve: with x = r cos θ and y = r sin θ, dy/dx = (dy/dθ)/(dx/dθ).
dr/dθ tells whether points move away from (dr/dθ > 0 with r > 0) or toward the origin.
ex: Find the area inside r = 2 (a full circle).
> A = ½∫₀^{2π} 4 dθ
= 4π (matching πr²)
To find the area between two polar curves, integrate ½(R² − r²) over the angles where one is outside the other, using intersection points as limits.
term: polar area formula = A = ½∫ r² dθ
term: polar curve = a graph defined by r as a function of θ
q: The area formula for a polar region is… | *½∫ r² dθ | ∫ r dθ | π∫ r² dθ | ∫ r² dθ
why: Each sliver is a sector with area ½r²dθ.
q: For r = 3 + sin θ at a point where dr/dθ > 0 and r > 0, the curve is moving… | *away from the origin | toward the origin | in a circle | not at all
why: r is increasing.

@unit Infinite Sequences and Series | Convergence tests, alternating series, power series, Taylor and Maclaurin series
@lesson Convergence tests
say: Can you add infinitely many numbers and get a finite answer? Sometimes! Convergence tests tell you when.
key: nth-term test: if lim aₙ ≠ 0, the series diverges. (If the limit is 0, the test is inconclusive.)
- Geometric series Σarⁿ converges to a/(1 − r) when |r| < 1.
- p-series Σ1/nᵖ converges when p > 1 (the harmonic series, p = 1, diverges).
- Integral, comparison and limit comparison tests compare to known series.
- Ratio test: if lim |aₙ₊₁/aₙ| < 1, the series converges absolutely; > 1 diverges; = 1 inconclusive.
ex: Does Σ n/3ⁿ converge?
> Ratio: (n + 1)/3ⁿ⁺¹ ÷ n/3ⁿ = (n + 1)/(3n) → 1/3
= Converges (ratio < 1)
term: convergent series = a series whose partial sums approach a finite value
term: p-series = Σ 1/nᵖ, which converges if p > 1
term: ratio test = a convergence test using the limit of |aₙ₊₁/aₙ|
term: harmonic series = Σ 1/n, which diverges
q: Does Σ 1/n² converge? | *Yes, it's a p-series with p = 2 | No | Only to 0 | Can't tell
why: p > 1.
q: The nth-term test shows Σ n/(n + 1)… | *diverges | converges | is inconclusive | equals 1
why: The terms approach 1, not 0.
gen: stem.geoSeries

@lesson Alternating series and error
say: Alternating series flip signs. They converge more easily, and we can bound their errors.
key: Alternating series test: Σ(−1)ⁿbₙ converges if bₙ decreases and bₙ → 0.
Alternating series error bound: the error after n terms is at most the first omitted term, |bₙ₊₁|.
A series converges absolutely if Σ|aₙ| converges; it converges conditionally if it converges but Σ|aₙ| diverges. The alternating harmonic series converges conditionally.
ex: Estimate the error using 1 − 1/2 + 1/3 − 1/4 (four terms) for the alternating harmonic series.
> The first omitted term is 1/5
= Error ≤ 0.2
term: alternating series = a series whose terms alternate in sign
term: conditional convergence = a series converges, but the series of absolute values diverges
term: alternating series error bound = the error is at most the first omitted term
q: The alternating harmonic series converges… | *conditionally | absolutely | not at all | to infinity
why: It converges, but Σ1/n diverges.
q: After summing 5 terms of an alternating series with bₙ = 1/n², the error is at most… | *1/36 | 1/25 | 1/5 | 1
why: The first omitted term is b₆ = 1/36.

@lesson Taylor and power series
say: Taylor series turn functions into infinite polynomials. Calculators use them to compute sine, eˣ and more.
key: Taylor series centered at a: f(x) = Σ f⁽ⁿ⁾(a)/n! · (x − a)ⁿ. A Maclaurin series is centered at 0.
Know these Maclaurin series:
- eˣ = 1 + x + x²/2! + x³/3! + …
- sin x = x − x³/3! + x⁵/5! − …
- cos x = 1 − x²/2! + x⁴/4! − …
- 1/(1 − x) = 1 + x + x² + … for |x| < 1
Power series have an interval of convergence, found with the ratio test and checking endpoints. The Lagrange error bound: |error| ≤ max|f⁽ⁿ⁺¹⁾| · |x − a|ⁿ⁺¹/(n + 1)!.
ex: Find the 3rd-degree Maclaurin polynomial for eˣ and estimate e^0.1.
> P₃(x) = 1 + x + x²/2 + x³/6
> P₃(0.1) = 1 + 0.1 + 0.005 + 0.000167
= about 1.10517
term: Taylor series = a power series representation of a function centered at a point
term: Maclaurin series = a Taylor series centered at 0
term: interval of convergence = the set of x-values for which a power series converges
term: Lagrange error bound = a bound on the error of a Taylor polynomial approximation
q: The Maclaurin series for sin x starts… | *x − x³/6 + … | 1 − x²/2 + … | 1 + x + x²/2 + … | x + x² + …
why: Sine is odd, with alternating odd powers.
q: The coefficient of x² in the Maclaurin series of f is… | *f″(0)/2 | f″(0) | f′(0) | f(0)/2
why: f⁽ⁿ⁾(0)/n! with n = 2.
`;
