export default String.raw`
@course ap-calc-ab | AP Calculus AB | AP | ∫ | Math

// Follows the 8 units of the AP Calculus AB Course and Exam Description.

@unit Limits and Continuity | What limits mean, evaluating limits algebraically, limits at infinity, continuity and the IVT
@lesson What is a limit?
say: Calculus is built on one idea: the limit. It asks what a function is approaching, not where it actually lands.
key: lim (x→c) f(x) = L means f(x) gets as close as we like to L as x gets close to c (from both sides).
The limit doesn't care what happens exactly at x = c, only nearby. f(c) might be different, or undefined.
A limit exists only if the left-hand limit and the right-hand limit are equal. If they differ (a jump) or the function blows up (a vertical asymptote), the limit does not exist.
ex: Read lim (x→2) f(x) from a table: f(1.9) = 4.88, f(1.99) = 4.99, f(2.01) = 5.01, f(2.1) = 5.12
> From the left, values approach 5
> From the right, values approach 5
= The limit is 5
term: limit = the value a function approaches as the input approaches a given number
term: one-sided limit = the value a function approaches from only the left or only the right
term: does not exist = a limit that fails because the one-sided limits differ or the function is unbounded
q: The left-hand limit at x = 3 is 4 and the right-hand limit is 6. The limit at x = 3… | *does not exist | is 5 | is 4 | is 6
why: Both one-sided limits must agree.
q: f(2) is undefined, but f(x) → 7 as x → 2. What is lim (x→2) f(x)? | *7 | undefined | 0 | 2
why: The limit depends only on nearby values.
gen: stem.limitHole

@lesson Evaluating limits algebraically
say: When you can't just plug in, algebra rescues you. The goal is to get rid of the 0/0.
First, try direct substitution. If you get a real number, that's the limit (for continuous functions).
If substitution gives 0/0 (an indeterminate form), try:
- Factoring and canceling.
- Multiplying by the conjugate (for square roots).
- Simplifying complex fractions.
ex: Find lim (x→3) (x² − 9)/(x − 3)
> Substituting gives 0/0
> Factor: (x + 3)(x − 3)/(x − 3) = x + 3 for x ≠ 3
> Substitute: 3 + 3
= 6
Special limits to know: lim (x→0) sin x / x = 1 and lim (x→0) (1 − cos x)/x = 0.
The Squeeze Theorem: if g(x) ≤ f(x) ≤ h(x) and g and h approach the same limit, f does too.
term: indeterminate form = an expression like 0/0 that doesn't directly give a limit
term: direct substitution = finding a limit by plugging in the value
term: squeeze theorem = if a function is trapped between two functions with the same limit, it shares that limit
q: lim (x→0) sin(x)/x = ? | *1 | 0 | does not exist | ∞
why: This is a fundamental trig limit.
q: lim (x→1) (x² − 1)/(x − 1) = ? | *2 | 0 | 1 | does not exist
why: Factor and cancel to get x + 1, then plug in 1.
gen: stem.limitHole

@lesson Limits at infinity and continuity
say: Limits also tell us about end behavior and whether a graph has any breaks. Both show up all over the exam.
Limits at infinity describe horizontal asymptotes. For rational functions, compare degrees: bigger bottom → 0; equal degrees → ratio of leading coefficients; bigger top → ±∞.
key: f is continuous at x = c if f(c) is defined, lim (x→c) f(x) exists, and the limit equals f(c).
Types of discontinuities: removable (a hole), jump, and infinite (vertical asymptote).
Intermediate Value Theorem (IVT): if f is continuous on [a, b], then f takes every value between f(a) and f(b). For example, if f(1) = −2 and f(3) = 5, then f(c) = 0 for some c in (1, 3).
ex: Is f(x) = (x² − 4)/(x − 2) continuous at x = 2? How would you fix it?
> f(2) is undefined, so it's not continuous
> The limit is 4 (factor and cancel)
= Removable discontinuity; define f(2) = 4
term: continuous = having no breaks, jumps or holes at a point or on an interval
term: removable discontinuity = a hole in a graph that could be filled by redefining one point
term: intermediate value theorem = a continuous function on [a, b] takes every value between f(a) and f(b)
q: lim (x→∞) (3x² + 1)/(5x² − x) = ? | *3/5 | 0 | ∞ | 3
why: Equal degrees: ratio of leading coefficients.
q: To apply the IVT on [a, b], f must be… | *continuous on [a, b] | differentiable only | increasing | positive
why: The IVT requires continuity.
gen: stem.limitInf

@unit Differentiation: Definition and Basic Rules | The derivative as a limit, differentiability, power, sum, product and quotient rules, trig derivatives
@lesson The definition of the derivative
say: The derivative measures instantaneous rate of change: the slope of a curve at one exact point.
The average rate of change over [a, b] is the slope of the secant line: (f(b) − f(a)) ÷ (b − a).
key: f′(x) = lim (h→0) [f(x + h) − f(x)] / h, the slope of the tangent line.
ex: Use the definition to find f′(x) for f(x) = x²
> [(x + h)² − x²]/h = (2xh + h²)/h
> Simplify: 2x + h
> Let h → 0
= f′(x) = 2x
Differentiability implies continuity, but not the reverse. A function is not differentiable at corners (like |x| at 0), cusps, vertical tangents, or discontinuities.
term: derivative = the instantaneous rate of change of a function; the slope of the tangent line
term: secant line = a line through two points on a curve
term: tangent line = the line that touches a curve at a point with the same slope as the curve
term: differentiable = having a derivative at a point
q: f(x) = |x| at x = 0 is… | *continuous but not differentiable | differentiable but not continuous | both | neither
why: There's a sharp corner at 0.
q: lim (h→0) [(3 + h)² − 9]/h equals… | *6 | 9 | 3 | 0
why: It's the derivative of x² at x = 3: 2(3) = 6.

@lesson Power, sum and constant rules
say: Computing limits every time would be exhausting. These rules give derivatives in seconds!
key: Power rule: d/dx [xⁿ] = nxⁿ⁻¹.
- Constant rule: the derivative of a constant is 0.
- Constant multiple: d/dx [c·f] = c·f′.
- Sum rule: differentiate term by term.
ex: Find f′(x) for f(x) = 4x³ − 5x + 2 − 6/x
> Rewrite 6/x as 6x⁻¹
> 12x² − 5 + 0 + 6x⁻²
= f′(x) = 12x² − 5 + 6/x²
Rewrite roots and fractions as powers first: √x = x^(1/2), so its derivative is (1/2)x^(−1/2) = 1/(2√x).
Derivatives of sin and cos: d/dx sin x = cos x, d/dx cos x = −sin x. Also d/dx eˣ = eˣ and d/dx ln x = 1/x.
term: power rule = the derivative of xⁿ is nxⁿ⁻¹
term: constant multiple rule = the derivative of c times f is c times f′
q: d/dx [x⁵] = ? | *5x⁴ | x⁴ | 5x⁵ | 4x⁵
why: Bring down the 5 and subtract 1 from the exponent.
q: d/dx [cos x] = ? | *−sin x | sin x | −cos x | cos x
why: The derivative of cosine is negative sine.
gen: stem.powerRule, stem.derivAt

@lesson Product and quotient rules
say: When functions are multiplied or divided, you need special rules. Don't just multiply the derivatives!
key: Product rule: (fg)′ = f′g + fg′. Quotient rule: (f/g)′ = (f′g − fg′)/g².
Memory trick for the quotient rule: "low d-high minus high d-low, over the square of what's below."
ex: Find d/dx [x² sin x]
> f = x², f′ = 2x; g = sin x, g′ = cos x
> f′g + fg′
= 2x sin x + x² cos x
Use the quotient rule to get d/dx tan x = sec²x. Other trig derivatives: d/dx sec x = sec x tan x, d/dx csc x = −csc x cot x, d/dx cot x = −csc²x.
oops: (fg)′ is NOT f′g′. For x · x, f′g′ would be 1, but the derivative of x² is 2x.
term: product rule = the derivative of f times g is f′g + fg′
term: quotient rule = the derivative of f over g is (f′g − fg′) over g²
q: d/dx [x eˣ] = ? | *eˣ + xeˣ | eˣ | xeˣ | 1 + eˣ
why: Product rule: (1)eˣ + x(eˣ).
q: d/dx [tan x] = ? | *sec²x | sec x tan x | −csc²x | cot x
why: Quotient rule on sin x / cos x gives 1/cos²x.
gen: calc.productRule

@unit Differentiation: Composite, Implicit and Inverse Functions | The chain rule, implicit differentiation, inverse functions, higher-order derivatives
@lesson The chain rule
say: The chain rule handles functions inside functions. It's the most-used rule in all of calculus.
key: d/dx f(g(x)) = f′(g(x)) · g′(x). Differentiate the outside, keep the inside, then multiply by the derivative of the inside.
ex: Find d/dx (3x² + 1)⁵
> Outside: 5( )⁴; inside: 3x² + 1
> 5(3x² + 1)⁴ · 6x
= 30x(3x² + 1)⁴
More examples: d/dx sin(4x) = 4cos(4x). d/dx e^(x²) = 2x e^(x²). d/dx ln(5x + 1) = 5/(5x + 1).
tip: Ask "what's the last operation I'd do to evaluate this?" That's the outside function.
term: chain rule = the derivative of f(g(x)) is f′(g(x)) times g′(x)
term: composite function = a function inside another function, f(g(x))
q: d/dx [sin(x²)] = ? | *2x cos(x²) | cos(x²) | cos(2x) | 2x sin(x²)
why: Outside derivative cos(x²), times inside derivative 2x.
q: d/dx [e^(3x)] = ? | *3e^(3x) | e^(3x) | 3xe^(3x) | e^3
why: Multiply by the derivative of 3x.
gen: stem.chain, stem.expDeriv

@lesson Implicit differentiation
say: Some curves, like circles, can't be written as y = something. Implicit differentiation still finds their slopes.
Differentiate both sides with respect to x. Every time you differentiate a y term, multiply by dy/dx (chain rule). Then solve for dy/dx.
ex: Find dy/dx for x² + y² = 25
> Differentiate: 2x + 2y(dy/dx) = 0
> Solve: dy/dx = −2x/(2y)
= dy/dx = −x/y
ex: Find the slope of x² + y² = 25 at (3, 4)
> dy/dx = −x/y = −3/4
= −3/4
Watch for products: d/dx (xy) = y + x(dy/dx) by the product rule.
term: implicit differentiation = differentiating an equation with y not isolated, treating y as a function of x
term: dy/dx = the derivative of y with respect to x
q: For x² + y² = 25, dy/dx = ? | *−x/y | x/y | −y/x | 2x + 2y
why: 2x + 2y y′ = 0, so y′ = −x/y.
q: d/dx [y³] = ? | *3y² dy/dx | 3y² | y³ dy/dx | 3y
why: Chain rule: y is a function of x.

@lesson Inverse functions and higher derivatives
say: Derivatives of inverse functions have a neat shortcut. And you can take derivatives of derivatives!
key: If g is the inverse of f, then g′(x) = 1 / f′(g(x)). The slopes at matching points are reciprocals.
ex: f(2) = 5 and f′(2) = 4. If g = f⁻¹, find g′(5).
> g(5) = 2 because f(2) = 5
> g′(5) = 1/f′(2)
= 1/4
Inverse trig derivatives: d/dx arcsin x = 1/√(1 − x²), d/dx arctan x = 1/(1 + x²).
The second derivative f″ is the derivative of f′. If position is s(t), then velocity is s′(t) and acceleration is s″(t).
term: inverse function derivative = g′(x) = 1/f′(g(x)) when g is the inverse of f
term: second derivative = the derivative of the first derivative
term: arctan = the inverse tangent function; its derivative is 1/(1 + x²)
q: d/dx [arctan x] = ? | *1/(1 + x²) | 1/√(1 − x²) | sec²x | −1/(1 + x²)
why: This is a standard inverse trig derivative.
q: s(t) = t³. What is the acceleration at t = 2? | *12 | 8 | 6 | 24
why: s″(t) = 6t, so 6(2) = 12.

@unit Contextual Applications of Differentiation | Rates of change in context, motion, related rates, linearization, L'Hospital's rule
@lesson Derivatives in context and motion
say: A derivative is a rate of change, with real units. Interpreting it in context is a big part of the AP exam.
If V(t) is the volume of water in liters at t minutes, then V′(5) = 3 means at t = 5, the volume is increasing at 3 liters per minute.
key: Position s(t), velocity v(t) = s′(t), acceleration a(t) = v′(t) = s″(t).
- The particle moves right (or up) when v > 0, left when v < 0, and is at rest when v = 0.
- Speed is |v(t)|. Speed increases when v and a have the same sign, and decreases when they have opposite signs.
ex: s(t) = t³ − 6t². When is the particle at rest?
> v(t) = 3t² − 12t = 3t(t − 4)
= t = 0 and t = 4
term: velocity = the derivative of position with respect to time
term: speed = the absolute value of velocity
term: acceleration = the derivative of velocity with respect to time
q: v(2) = −3 and a(2) = −1. At t = 2, the speed is… | *increasing | decreasing | zero | constant
why: v and a have the same sign, so speed increases.
q: P(t) is population in thousands, t in years. P′(4) = 2 means… | *at year 4 the population is growing by 2,000 per year | the population is 2,000 at year 4 | the population doubled | growth stopped
why: The derivative is a rate, in units of output per input.
gen: stem.derivAt

@lesson Related rates
say: Related rates problems connect how fast different quantities change. Think ladders sliding and balloons inflating.
Steps:
- Draw a picture and name the variables.
- Write an equation relating them.
- Differentiate both sides with respect to time t.
- Substitute known values, then solve for the unknown rate.
ex: A circle's radius grows at 2 cm/s. How fast is its area growing when r = 5 cm?
> A = πr²
> dA/dt = 2πr (dr/dt)
> dA/dt = 2π(5)(2)
= 20π cm²/s
oops: Plug in the specific values only after you differentiate. If you plug in r = 5 first, the derivative of a constant is 0.
term: related rates = problems that find one rate of change from another using a relating equation
term: implicit differentiation with respect to time = differentiating every variable as a function of t
q: For a sphere V = (4/3)πr³, dV/dt = ? | *4πr² dr/dt | 4πr² | (4/3)πr² dr/dt | 3r² dr/dt
why: Chain rule with respect to t.
q: In related rates, when should you substitute specific values? | *After differentiating | Before differentiating | Never | Only for constants
why: Variables that change must stay variables until after differentiating.

@lesson Linearization and L'Hospital's rule
say: The tangent line makes a great approximation near a point. And L'Hospital's rule finds tricky limits fast.
Local linear approximation: near x = a, f(x) ≈ f(a) + f′(a)(x − a). This is the tangent line.
ex: Approximate √4.1 using f(x) = √x at a = 4
> f(4) = 2, f′(x) = 1/(2√x), f′(4) = 1/4
> f(4.1) ≈ 2 + (1/4)(0.1)
= about 2.025
If f is concave up, the tangent line approximation is an underestimate; if concave down, an overestimate.
key: L'Hospital's rule: if a limit gives 0/0 or ∞/∞, then lim f/g = lim f′/g′ (if that limit exists).
ex: lim (x→0) (eˣ − 1)/x
> 0/0, so differentiate top and bottom: eˣ/1
= 1
term: linearization = approximating a function near a point by its tangent line
term: L'Hospital's rule = for 0/0 or ∞/∞ limits, take the limit of the ratio of derivatives
q: L'Hospital's rule applies to which form? | *0/0 | 1/0 | 0/5 | 3/2
why: It requires an indeterminate form: 0/0 or ∞/∞.
q: f is concave down near x = a. The tangent line approximation is… | *an overestimate | an underestimate | exact | undefined
why: A concave-down curve lies below its tangent lines.
gen: calc.tangentLine

@unit Analytical Applications of Differentiation | Mean Value Theorem, extrema, increasing/decreasing, concavity, curve sketching, optimization
@lesson The Mean Value Theorem and extreme values
say: The Mean Value Theorem guarantees that at some moment, your instant speed equals your average speed.
key: Mean Value Theorem: if f is continuous on [a, b] and differentiable on (a, b), then f′(c) = (f(b) − f(a))/(b − a) for some c in (a, b).
Extreme Value Theorem: a continuous function on a closed interval [a, b] has both an absolute maximum and an absolute minimum.
Critical points are where f′(x) = 0 or f′ is undefined. Absolute extrema on [a, b] happen at critical points or endpoints.
ex: Find the absolute max of f(x) = x³ − 3x on [0, 2]
> f′(x) = 3x² − 3 = 0 at x = 1
> Check: f(0) = 0, f(1) = −2, f(2) = 2
= Absolute max 2 at x = 2 (absolute min −2 at x = 1)
term: mean value theorem = some point's instantaneous rate equals the average rate over an interval
term: critical point = a point where f′ is zero or undefined
term: extreme value theorem = a continuous function on a closed interval has an absolute max and min
term: candidates test = checking critical points and endpoints to find absolute extrema
q: You drive 120 miles in 2 hours. The MVT guarantees that at some moment you were going… | *exactly 60 mph | over 60 mph | under 60 mph | 120 mph
why: Instantaneous rate equals average rate somewhere.
q: Where can absolute extrema on [a, b] occur? | *At critical points or endpoints | Only where f′ = 0 | Only at endpoints | Anywhere
why: Those are the only candidates.

@lesson Increasing, decreasing and concavity
say: The first and second derivatives tell the whole story of a graph's shape.
- f′ > 0: f is increasing. f′ < 0: f is decreasing.
- First derivative test: if f′ changes from + to −, f has a local max; from − to +, a local min.
- f″ > 0: f is concave up (cup). f″ < 0: concave down (cap).
- An inflection point is where concavity changes (f″ changes sign).
key: Second derivative test: if f′(c) = 0 and f″(c) > 0, local min; if f″(c) < 0, local max.
ex: f(x) = x³ − 3x². Find local extrema and the inflection point.
> f′ = 3x² − 6x = 3x(x − 2): zero at 0 and 2
> f″ = 6x − 6: f″(0) = −6 (max), f″(2) = 6 (min)
> f″ = 0 at x = 1, and f″ changes sign there
= local max at x = 0, local min at x = 2, inflection at x = 1
term: concave up = curving upward; f″ > 0
term: inflection point = a point where a graph changes concavity
term: first derivative test = a sign change of f′ identifies a local max or min
q: f′ changes from negative to positive at x = 3. At x = 3, f has a… | *local minimum | local maximum | inflection point | discontinuity
why: The function stops decreasing and starts increasing.
q: If f″(x) < 0 on an interval, the graph is… | *concave down | concave up | increasing | linear
why: Negative second derivative means a "cap" shape.
gen: calc.critical

@lesson Optimization
say: Optimization finds the biggest or smallest possible value: the most area, the least cost, the shortest path.
Steps:
- Write a formula for the quantity to maximize or minimize.
- Use a constraint to write it in one variable.
- Find critical points, and check endpoints of the realistic domain.
- Justify that it's a max or min (first or second derivative test).
ex: You have 100 m of fence for a rectangular pen. What dimensions give the most area?
> Perimeter: 2x + 2y = 100, so y = 50 − x
> Area: A = x(50 − x) = 50x − x²
> A′ = 50 − 2x = 0, so x = 25; A″ = −2 < 0 (max)
= 25 m by 25 m, area 625 m²
tip: Always answer the question that was asked: dimensions, maximum value or location.
term: optimization = finding the maximum or minimum value of a quantity under constraints
term: constraint = a condition that limits the possible values of the variables
q: In optimization, after finding critical points you must also… | *check endpoints and justify max or min | stop | integrate | take the limit at infinity
why: The absolute extreme could be at an endpoint.
q: To maximize A = x(20 − x), x should be… | *10 | 20 | 5 | 0
why: A′ = 20 − 2x = 0 at x = 10.

@unit Integration and Accumulation of Change | Riemann sums, definite integrals, the Fundamental Theorem of Calculus, antiderivatives and u-substitution
@lesson Riemann sums and accumulation
say: Integration adds up tiny pieces to find a total. It starts with rectangles under a curve.
If a rate is constant, total change = rate × time. If the rate varies, approximate by splitting time into pieces and adding rate × width for each: a Riemann sum.
- Left, right and midpoint Riemann sums use different heights for each rectangle.
- The trapezoidal rule averages left and right sums.
- For an increasing function, a left sum underestimates and a right sum overestimates.
key: The definite integral ∫ from a to b of f(x) dx is the limit of Riemann sums as the rectangles get infinitely thin. It gives the net (signed) area.
Area below the x-axis counts as negative.
term: Riemann sum = an approximation of an integral using rectangles
term: definite integral = the limit of Riemann sums; the net accumulation of a rate over an interval
term: trapezoidal rule = an approximation of an integral using trapezoids
q: For an increasing function, a right Riemann sum is… | *an overestimate | an underestimate | exact | negative
why: Right endpoints are the tallest points on each interval.
q: The definite integral of a velocity function gives… | *displacement | acceleration | speed | position at t = 0
why: Accumulating velocity over time gives change in position.
gen: calc.riemann

@lesson The Fundamental Theorem of Calculus
say: The Fundamental Theorem connects derivatives and integrals. It's the most important theorem in calculus.
key: FTC Part 2: ∫ from a to b of f(x) dx = F(b) − F(a), where F is any antiderivative of f.
FTC Part 1: d/dx ∫ from a to x of f(t) dt = f(x). Accumulating a function, then differentiating, gives the function back.
ex: Evaluate ∫ from 1 to 3 of 2x dx
> An antiderivative of 2x is x²
> F(3) − F(1) = 9 − 1
= 8
ex: Find d/dx ∫ from 0 to x² of cos t dt
> FTC 1 with the chain rule: cos(x²) · 2x
= 2x cos(x²)
Properties: ∫ from a to a = 0; reversing the limits changes the sign; integrals over adjacent intervals add.
term: antiderivative = a function F whose derivative is f
term: fundamental theorem of calculus = differentiation and integration are inverse processes
term: accumulation function = a function defined as an integral from a fixed point to x
q: ∫ from 0 to 2 of 3x² dx = ? | *8 | 12 | 6 | 4
why: x³ from 0 to 2: 8 − 0.
q: d/dx ∫ from 2 to x of t³ dt = ? | *x³ | x⁴/4 | 3x² | x³ − 8
why: FTC Part 1 gives back the integrand.
gen: stem.integral

@lesson Antiderivatives and u-substitution
say: Finding antiderivatives is differentiation in reverse. And u-substitution undoes the chain rule.
Basic antiderivatives (always add + C for indefinite integrals):
- ∫ xⁿ dx = xⁿ⁺¹/(n + 1) + C (n ≠ −1)
- ∫ 1/x dx = ln|x| + C
- ∫ eˣ dx = eˣ + C
- ∫ cos x dx = sin x + C and ∫ sin x dx = −cos x + C
key: u-substitution: choose u as the inside function, find du, and rewrite the whole integral in terms of u.
ex: Find ∫ 2x(x² + 1)⁴ dx
> Let u = x² + 1, so du = 2x dx
> ∫ u⁴ du = u⁵/5 + C
= (x² + 1)⁵/5 + C
For definite integrals with u-substitution, change the limits to u-values too.
term: indefinite integral = the family of all antiderivatives, written with + C
term: u-substitution = an integration technique that reverses the chain rule
term: constant of integration = the + C added to an indefinite integral
q: ∫ x³ dx = ? | *x⁴/4 + C | 3x² + C | x⁴ + C | 4x⁴ + C
why: Add 1 to the exponent and divide by the new exponent.
q: For ∫ cos(5x) dx, a good choice is… | *u = 5x | u = cos(5x) | u = x | u = sin x
why: 5x is the inside function.

@unit Differential Equations | Modeling with differential equations, slope fields, separation of variables, exponential models
@lesson Slope fields and verifying solutions
say: A differential equation describes how something changes. Its solution is a function, not a number.
A differential equation relates a function to its derivatives, like dy/dx = 2x. A solution is a function that makes it true, like y = x² + C.
To verify a solution, differentiate it and substitute into the equation.
A slope field draws a tiny line segment with slope dy/dx at many points. Solution curves follow the segments like a current.
ex: For dy/dx = x + y, what is the slope at (1, 2)?
> Substitute: 1 + 2
= slope 3
tip: If dy/dx depends only on x, the slope segments are the same along each vertical column. If it depends only on y, they're the same along each horizontal row.
term: differential equation = an equation involving a function and its derivatives
term: slope field = a graph of short segments showing the slope given by a differential equation at many points
term: general solution = a family of solutions including the constant C
q: Which function solves dy/dx = 3? | *y = 3x + 7 | y = 3 | y = x³ | y = 3y
why: Its derivative is 3.
q: For dy/dx = y − x, the slope at (2, 2) is… | *0 | 4 | 2 | −2
why: 2 − 2 = 0.

@lesson Separation of variables and exponential models
say: Separation of variables solves many differential equations: move all the y's to one side and x's to the other, then integrate.
Steps: separate (y terms with dy, x terms with dx), integrate both sides, add C, use the initial condition to find C, then solve for y.
ex: Solve dy/dx = xy with y(0) = 3
> Separate: dy/y = x dx
> Integrate: ln|y| = x²/2 + C
> Solve: y = Ae^(x²/2); y(0) = 3 gives A = 3
= y = 3e^(x²/2)
key: dy/dt = ky has solution y = y₀e^(kt): exponential growth if k > 0, decay if k < 0.
This models populations, radioactive decay, Newton's law of cooling and continuously compounded interest.
term: separation of variables = rearranging a differential equation so each variable is on its own side before integrating
term: particular solution = the solution that satisfies a given initial condition
term: exponential growth model = dy/dt = ky, with solution y = y₀e^(kt)
q: The solution to dy/dt = 0.3y with y(0) = 50 is… | *y = 50e^(0.3t) | y = 0.3e^(50t) | y = 50 + 0.3t | y = 50t^0.3
why: dy/dt = ky gives y = y₀e^(kt).
q: In separation of variables, you must add C… | *after integrating, before solving for y | at the very end only | never | before separating
why: Including C before solving for y keeps the general solution correct.
gen: calc.expModel

@unit Applications of Integration | Average value, motion with integrals, area between curves, volumes of solids
@lesson Average value and motion
say: Integrals answer real questions: average temperature, total distance traveled, and more.
key: Average value of f on [a, b] = (1/(b − a)) ∫ from a to b of f(x) dx.
For motion with velocity v(t):
- Displacement = ∫ v(t) dt (net change in position).
- Total distance = ∫ |v(t)| dt (always positive).
- Position at time t: s(t) = s(0) + ∫ from 0 to t of v(u) du.
ex: v(t) = t − 2 on [0, 4]. Find displacement and total distance.
> Displacement: ∫ (t − 2) dt from 0 to 4 = [t²/2 − 2t] = 8 − 8 = 0
> Distance: area from 0 to 2 is 2, from 2 to 4 is 2
= displacement 0, total distance 4
More generally, ∫ of a rate gives the net change in the quantity: ∫ from a to b of R′(t) dt = R(b) − R(a).
term: average value of a function = the integral over an interval divided by the interval's length
term: total distance = the integral of the absolute value of velocity
term: net change theorem = the integral of a rate of change gives the total change
q: Average value of f(x) = 2x on [0, 3]? | *3 | 9 | 6 | 1.5
why: (1/3)∫ 2x dx from 0 to 3 = (1/3)(9) = 3.
q: To find total distance traveled, integrate… | *|v(t)| | v(t) | a(t) | s(t)
why: Absolute value keeps backward motion from canceling forward motion.
gen: calc.avgValue

@lesson Area between curves
say: To find the area between two curves, integrate the top function minus the bottom function.
key: Area = ∫ from a to b of [top(x) − bottom(x)] dx.
Find where the curves intersect to get the limits of integration. If the curves cross in the middle, split the integral.
ex: Find the area between y = x and y = x² from x = 0 to 1
> On [0, 1], x ≥ x², so top = x
> ∫ (x − x²) dx = [x²/2 − x³/3] from 0 to 1
= 1/2 − 1/3 = 1/6
Sometimes it's easier to integrate with respect to y: Area = ∫ [right(y) − left(y)] dy.
term: area between curves = the integral of the top function minus the bottom function
term: points of intersection = where two curves meet; often used as limits of integration
q: Which gives the area between y = 4 and y = x² from −2 to 2? | *∫ (4 − x²) dx | ∫ (x² − 4) dx | ∫ 4x² dx | ∫ (x² + 4) dx
why: y = 4 is on top over that interval.
q: The curves cross in the middle of [a, b]. You should… | *split the integral at the crossing point | integrate as usual | add the functions | use only one function
why: Top and bottom switch at the crossing.

@lesson Volumes of solids
say: Spin a region around an axis or stack shapes on it, and integration finds the volume.
Volume by cross sections: V = ∫ A(x) dx, where A(x) is the area of each cross section (squares, semicircles, triangles…).
key: Disc method: V = π ∫ [R(x)]² dx. Washer method: V = π ∫ ([R(x)]² − [r(x)]²) dx, with outer radius R and inner radius r.
ex: Rotate y = √x from x = 0 to 4 about the x-axis. Find the volume.
> Disc radius R = √x
> V = π ∫ from 0 to 4 of x dx = π[x²/2]
= 8π
When rotating about a line other than an axis, measure radii from that line: about y = −1, R = f(x) + 1.
term: disc method = finding volume by integrating areas of circular cross sections, π∫R² dx
term: washer method = the disc method with a hole: π∫(R² − r²) dx
term: cross section = the shape formed by slicing a solid perpendicular to an axis
q: The disc method formula is… | *π ∫ R² dx | ∫ R dx | 2π ∫ R dx | π ∫ R dx
why: Each slice is a circle with area πR².
q: When should you use washers instead of discs? | *When the solid has a hole | When rotating about the x-axis | Always | When the region is a triangle
why: Washers subtract the inner radius for the hollow part.
`;
