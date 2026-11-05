export default String.raw`
@course calc | Calculus | Honors | ∫ | Math

@unit Limits | The idea of a limit, evaluating limits, continuity
@lesson What limits mean
say: Calculus is the math of change, and it all starts with limits: what a function approaches.
key: lim (x→a) f(x) = L means f(x) gets closer and closer to L as x gets closer to a, from both sides.
The value f(a) doesn't matter for the limit. A function can have a hole at x = a and still have a limit there.
If the left-side and right-side limits differ, the limit does not exist.
ex: f(x) = (x² − 1)/(x − 1). What is lim (x→1) f(x)?
> Plugging in gives 0/0, so simplify
> (x + 1)(x − 1)/(x − 1) = x + 1
= The limit is 2
tip: Always try direct substitution first. Only use algebra tricks when you get 0/0.
term: limit = the value a function approaches as the input approaches a number
term: one-sided limit = a limit from only the left or only the right
term: indeterminate form = 0/0, which means more work is needed to find the limit
q: lim (x→3) (2x + 1) = | *7 | 6 | 3 | does not exist
why: Direct substitution: 2(3) + 1.
q: The left limit at x = 2 is 5 and the right limit is 5. The limit is… | *5 | 10 | does not exist | 2
why: The one-sided limits agree.
gen: stem.limitHole

@lesson Limits at infinity and continuity
say: Limits also describe what happens far out on a graph, and whether a graph has any breaks.
key: As x → ∞, 1/x → 0. For rational functions, compare the degrees of the top and bottom to find the limit at infinity.
A function is continuous at x = a if you can draw it there without lifting your pencil: f(a) exists, the limit exists, and they're equal.
ex: lim (x→∞) (4x² + 1)/(2x² − 3)
> The degrees are equal, so compare leading coefficients
= 4/2 = 2
Polynomials, sin x, cos x and eˣ are continuous everywhere.
term: continuous = having no breaks, holes or jumps
term: horizontal asymptote = the value a function approaches as x → ±∞
term: limit at infinity = the value a function approaches as x grows without bound
q: lim (x→∞) 3/x² = | *0 | 3 | ∞ | 1
why: The denominator grows without bound.
q: A graph with a hole at x = 1 is… | *not continuous at x = 1 | continuous everywhere | undefined everywhere | linear
why: The function has a break at the hole.
gen: stem.limitInf

@unit Derivatives | The derivative as a rate of change, derivative rules, the chain rule
@lesson The derivative
say: The derivative tells you how fast something is changing at an exact instant, like a speedometer reading.
key: The derivative f′(x) is the slope of the tangent line, defined as lim (h→0) [f(x + h) − f(x)]/h.
It gives the instantaneous rate of change: if s(t) is position, s′(t) is velocity.
ex: Use the definition to find the derivative of f(x) = 3x.
> [3(x + h) − 3x]/h = 3h/h = 3
= f′(x) = 3 (the slope of the line)
The power rule makes it fast: d/dx xⁿ = nxⁿ⁻¹. Constants have derivative 0, and you differentiate sums term by term.
term: derivative = the instantaneous rate of change of a function; the slope of the tangent line
term: tangent line = the line that touches a curve at one point with the same slope
term: power rule = d/dx xⁿ = nxⁿ⁻¹
q: d/dx [x⁴] = | *4x³ | x³ | 4x⁴ | 3x⁴
why: Power rule.
q: The derivative of a constant is… | *0 | 1 | the constant | undefined
why: Constants don't change.
gen: stem.powerRule, stem.derivAt

@lesson Product, quotient and chain rules
say: More complicated functions need a few more rules. The chain rule is the most important.
key: Product rule: (fg)′ = f′g + fg′. Quotient rule: (f/g)′ = (f′g − fg′)/g². Chain rule: d/dx f(g(x)) = f′(g(x))·g′(x).
Common derivatives: d/dx sin x = cos x, d/dx cos x = −sin x, d/dx eˣ = eˣ, d/dx ln x = 1/x.
ex: Differentiate y = (2x + 3)⁵.
> Outside: 5( )⁴; inside derivative: 2
= 10(2x + 3)⁴
oops: The derivative of a product is not the product of the derivatives. d/dx [x · x] = 2x, not 1.
term: product rule = (fg)′ = f′g + fg′
term: chain rule = differentiate the outside, keep the inside, multiply by the inside's derivative
term: quotient rule = (f/g)′ = (f′g − fg′)/g²
q: d/dx [sin(3x)] = | *3 cos(3x) | cos(3x) | −3 cos(3x) | 3 sin(3x)
why: Chain rule.
q: d/dx [eˣ] = | *eˣ | xeˣ⁻¹ | 1 | e
why: eˣ is its own derivative.
gen: stem.chain, stem.expDeriv

@unit Applications of Derivatives | Motion and related rates, extrema and curve sketching, optimization
@lesson Motion and rates
say: Derivatives describe real motion and change: speed, acceleration and growing quantities.
key: If s(t) is position, then velocity v(t) = s′(t) and acceleration a(t) = v′(t).
The object moves forward when v > 0, backward when v < 0, and is momentarily stopped when v = 0.
ex: s(t) = t² − 6t. When is the object at rest?
> v(t) = 2t − 6
> 2t − 6 = 0
= t = 3
Related rates problems connect the rates of related quantities, like how fast a balloon's radius grows as air is pumped in. Differentiate an equation relating the quantities with respect to time.
term: velocity = the rate of change of position
term: acceleration = the rate of change of velocity
term: related rates = finding one rate of change using its relationship to another
q: s(t) = 5t². What is the velocity at t = 2? | *20 | 10 | 40 | 5
why: v = 10t.
q: If velocity is negative, the object is… | *moving backward | speeding up | at rest | moving forward
why: Negative velocity means the opposite direction.
gen: stem.accel

@lesson Extrema and optimization
say: Derivatives find the highest and lowest points of a graph. That's how we optimize real problems.
key: At a local maximum or minimum, the derivative is zero (or undefined). These are critical points.
- If f′ changes from + to −, there's a local maximum.
- If f′ changes from − to +, there's a local minimum.
- f″ > 0 means concave up (like a cup); f″ < 0 means concave down.
ex: A farmer has 40 m of fence for a rectangular pen. What dimensions maximize area?
> 2x + 2y = 40, so y = 20 − x; A = x(20 − x)
> A′ = 20 − 2x = 0 gives x = 10
= 10 m by 10 m (area 100 m²)
term: critical point = where the derivative is zero or undefined
term: local maximum = a point higher than all nearby points
term: optimization = finding the best (largest or smallest) value
q: f′ changes from positive to negative at x = 2. Then f has a… | *local maximum | local minimum | inflection point | hole
why: Rising then falling makes a peak.
q: If f″(x) > 0, the graph is… | *concave up | concave down | decreasing | flat
why: Positive second derivative means a cup shape.
gen: calc.critical

@unit Integrals | Antiderivatives, definite integrals and area, the Fundamental Theorem
@lesson Antiderivatives
say: Integration reverses differentiation. If you know a rate of change, you can find the original quantity.
key: An antiderivative of f is a function F with F′ = f. ∫ xⁿ dx = xⁿ⁺¹/(n + 1) + C (n ≠ −1).
The + C is needed because every constant has derivative zero, so there are infinitely many antiderivatives.
Other basics: ∫ cos x dx = sin x + C, ∫ eˣ dx = eˣ + C, ∫ 1/x dx = ln|x| + C.
ex: Find ∫ (6x² − 4x + 1) dx.
> 6x³/3 − 4x²/2 + x
= 2x³ − 2x² + x + C
tip: Check an antiderivative by differentiating it. You should get the original function back.
term: antiderivative = a function whose derivative is the given function
term: indefinite integral = the family of all antiderivatives, written with + C
term: constant of integration = the + C in an indefinite integral
q: ∫ 5 dx = | *5x + C | 5 + C | 0 | x⁵ + C
why: The derivative of 5x is 5.
q: ∫ x dx = | *x²/2 + C | x² + C | 1 + C | 2x + C
why: Add 1 to the exponent and divide by it.
gen: stem.integral

@lesson Definite integrals and area
say: A definite integral adds up infinitely many tiny pieces. It gives area, distance and total change.
key: Fundamental Theorem of Calculus: ∫ₐᵇ f(x) dx = F(b) − F(a), where F is an antiderivative of f.
The definite integral gives the net area between a curve and the x-axis (area below the axis counts as negative). Integrating velocity gives displacement.
Riemann sums approximate integrals by adding up areas of rectangles.
ex: Find the area under y = x² from x = 0 to x = 3.
> Antiderivative: x³/3
> 27/3 − 0
= 9 square units
term: definite integral = the net accumulation of a function over an interval
term: fundamental theorem of calculus = integrating a rate of change gives the total change: F(b) − F(a)
term: Riemann sum = an approximation of an integral using rectangles
q: ∫₁³ 2x dx = | *8 | 9 | 4 | 6
why: x² from 1 to 3: 9 − 1.
q: Integrating a velocity function over time gives… | *displacement | acceleration | speed only | force
why: Velocity accumulates into change in position.
gen: calc.riemann
`;
