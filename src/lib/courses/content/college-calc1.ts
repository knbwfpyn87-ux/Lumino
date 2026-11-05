export default String.raw`
@course college-calc1 | Calculus I (College) | College | 🎓 | College

// Follows a standard first-semester university calculus syllabus (OpenStax Calculus Volume 1): limits and continuity, derivatives and their rules, applications of derivatives, and an introduction to integration.

@unit Limits and Continuity | Limit laws, one-sided limits, continuity, limits at infinity
@lesson Limits
say: Calculus starts with limits: what value a function approaches as the input approaches a point.
key: lim x→a f(x) = L means f(x) gets arbitrarily close to L as x approaches a (from both sides). The two one-sided limits must agree for the limit to exist.
Limit laws let you split sums, products and quotients. For polynomials, substitute directly. For 0/0 forms, factor and cancel, rationalize, or simplify. The squeeze theorem handles limits like lim x→0 sin x / x = 1.
The formal ε–δ definition: for every ε > 0 there is a δ > 0 so that 0 < |x − a| < δ implies |f(x) − L| < ε.
ex: Find lim x→3 (x² − 9)/(x − 3).
> Factor: (x − 3)(x + 3)/(x − 3) = x + 3
> Substitute x = 3
= 6
term: limit = the value a function approaches as the input approaches a point
term: one-sided limit = a limit as x approaches from only the left or the right
term: indeterminate form = an expression like 0/0 that needs more work to evaluate
term: squeeze theorem = if g ≤ f ≤ h and g and h share a limit, f has that limit too
q: lim x→2 (x² − 4)/(x − 2) equals… | *4 | 0 | 2 | it doesn't exist
why: Factor to x + 2, then substitute.
q: If the left-hand limit is 3 and the right-hand limit is 5, the limit… | *does not exist | equals 4 | equals 3 | equals 5
why: One-sided limits must agree.
gen: stem.limitHole

@lesson Continuity and limits at infinity
say: Continuous functions have no breaks. Limits at infinity describe long-run behavior.
key: f is continuous at a if f(a) is defined, lim x→a f(x) exists, and the two are equal. Discontinuities are removable (hole), jump, or infinite (vertical asymptote).
The Intermediate Value Theorem: if f is continuous on [a, b] and N is between f(a) and f(b), then f(c) = N for some c in (a, b). It proves roots exist.
Limits at infinity: for rational functions compare degrees. Equal degrees → ratio of leading coefficients; bottom degree larger → 0; top degree larger → ±∞. These give horizontal asymptotes.
ex: Find lim x→∞ (3x² + 1)/(5x² − x).
> Equal degrees: ratio of leading coefficients
= 3/5
term: continuous = having no break, jump or hole at a point
term: removable discontinuity = a hole that could be filled by redefining one value
term: Intermediate Value Theorem = a continuous function takes every value between f(a) and f(b)
term: horizontal asymptote = a line y = L that f approaches as x → ±∞
q: lim x→∞ (2x + 7)/(x² + 1) equals… | *0 | 2 | ∞ | 7
why: The denominator has the higher degree.
q: f(1) = −2 and f(3) = 4 with f continuous. By the IVT, f has a root… | *between 1 and 3 | at x = 2 exactly | nowhere | outside [1, 3]
why: 0 lies between −2 and 4.
gen: stem.limitInf

@unit Derivatives | Definition, rules, chain rule, implicit differentiation
@lesson The derivative and its rules
say: The derivative measures instantaneous rate of change: the slope of the tangent line.
key: Definition: f′(x) = lim h→0 [f(x + h) − f(x)]/h. Differentiable implies continuous (but not the reverse: |x| has a corner at 0).
Rules: power rule d/dx xⁿ = nxⁿ⁻¹; constant multiple and sum rules; product rule (fg)′ = f′g + fg′; quotient rule (f/g)′ = (f′g − fg′)/g².
Basic derivatives: (sin x)′ = cos x, (cos x)′ = −sin x, (eˣ)′ = eˣ, (ln x)′ = 1/x.
ex: Differentiate f(x) = x³ sin x.
> Product rule: (x³)′ sin x + x³ (sin x)′
= 3x² sin x + x³ cos x
term: derivative = the instantaneous rate of change of a function
term: tangent line = the line touching a curve at a point with the same slope
term: product rule = (fg)′ = f′g + fg′
term: differentiable = having a derivative at a point
q: d/dx (5x⁴) equals… | *20x³ | 5x³ | 20x⁴ | 4x⁵
why: 5 · 4x³.
q: Which function is continuous but not differentiable at 0? | *|x| | x² | sin x | eˣ
why: |x| has a corner at 0.
gen: stem.powerRule, stem.derivAt, calc.productRule

@lesson Chain rule and implicit differentiation
say: Most real functions are compositions. The chain rule handles them.
key: Chain rule: d/dx f(g(x)) = f′(g(x)) · g′(x). Differentiate the outside, keep the inside, multiply by the derivative of the inside.
Implicit differentiation: differentiate both sides with respect to x, treating y as a function of x (so d/dx y² = 2y · dy/dx), then solve for dy/dx.
Related rates: write an equation linking quantities, differentiate with respect to time t, substitute known values, and solve for the unknown rate. Inverse trig and logarithmic differentiation extend the toolkit.
ex: Differentiate y = (3x² + 1)⁵.
> Outside: 5( )⁴; inside derivative: 6x
= 30x(3x² + 1)⁴
term: chain rule = the derivative of f(g(x)) is f′(g(x)) · g′(x)
term: implicit differentiation = differentiating an equation without solving for y first
term: related rates = problems finding how fast one quantity changes from another's rate
term: composite function = a function applied to the output of another
q: d/dx e^(2x) equals… | *2e^(2x) | e^(2x) | 2xe^(2x) | e^(2x)/2
why: Multiply by the inner derivative, 2.
q: For x² + y² = 25, dy/dx equals… | *−x/y | x/y | −y/x | 2x
why: 2x + 2y y′ = 0.
gen: stem.chain, stem.expDeriv

@unit Applications and Integration | Optimization, curve sketching, the definite integral, the Fundamental Theorem
@lesson Applications of derivatives
say: Derivatives tell us where functions rise, fall and peak, which lets us optimize.
key: Critical points occur where f′(x) = 0 or is undefined. f′ > 0 means increasing; f′ < 0 means decreasing. First derivative test: a sign change from + to − gives a local max.
Second derivative: f″ > 0 means concave up; f″ < 0 means concave down; inflection points occur where concavity changes. The extreme value theorem: a continuous function on a closed interval has an absolute max and min (check critical points and endpoints).
Optimization: write the quantity to maximize or minimize as one variable, differentiate, set to zero, and confirm. The Mean Value Theorem and L'Hôpital's rule (for 0/0 or ∞/∞) are further tools.
ex: Find two positive numbers summing to 20 with maximum product.
> P = x(20 − x) = 20x − x²; P′ = 20 − 2x = 0
= x = 10, so 10 and 10 (product 100)
term: critical point = where f′ is zero or undefined
term: inflection point = where concavity changes
term: L'Hôpital's rule = for 0/0 or ∞/∞, lim f/g = lim f′/g′
term: Mean Value Theorem = some point has instantaneous rate equal to the average rate
q: If f′ changes from negative to positive at c, then f has a… | *local minimum at c | local maximum at c | inflection point only | vertical asymptote
why: It decreases then increases.
q: lim x→0 sin(3x)/x by L'Hôpital equals… | *3 | 1 | 0 | 1/3
why: 3cos(3x)/1 at 0 is 3.
gen: calc.critical, calc.tangentLine

@lesson Introduction to integration
say: Integration reverses differentiation and measures accumulated change, such as area under a curve.
key: Riemann sums approximate area with rectangles (left, right, midpoint); the definite integral is the limit as rectangles get thinner.
Antiderivatives: ∫xⁿ dx = xⁿ⁺¹/(n + 1) + C (n ≠ −1), ∫1/x dx = ln|x| + C, ∫eˣ dx = eˣ + C, ∫cos x dx = sin x + C.
Fundamental Theorem of Calculus: ∫ₐᵇ f(x) dx = F(b) − F(a) where F′ = f; and d/dx ∫ₐˣ f(t) dt = f(x). Substitution (u-sub) reverses the chain rule.
ex: Evaluate ∫₀² 3x² dx.
> Antiderivative: x³
> 2³ − 0³
= 8
term: definite integral = the net signed area under a curve between two limits
term: antiderivative = a function whose derivative is the given function
term: Fundamental Theorem of Calculus = the theorem linking derivatives and integrals
term: u-substitution = an integration technique reversing the chain rule
q: ∫ 4x³ dx equals… | *x⁴ + C | 12x² + C | 4x⁴ + C | x³ + C
why: Raise the power and divide.
q: d/dx ∫₁ˣ cos t dt equals… | *cos x | sin x | −sin x | cos 1
why: FTC part 1.
gen: stem.integral, calc.riemann
`;
