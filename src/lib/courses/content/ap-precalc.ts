export default String.raw`
@course ap-precalc | AP Precalculus | AP | 📈 | Math

// Follows the 4 units of the AP Precalculus Course and Exam Description (Unit 4 is taught but not assessed on the exam).

@unit Polynomial and Rational Functions | Rates of change, polynomial behavior, rational functions, transformations and modeling
@lesson Rates of change
say: AP Precalculus is all about how quantities change together. Rates of change are the main lens for every function family.
The average rate of change of f on [a, b] is (f(b) − f(a))/(b − a), the slope of the secant line.
key: A function is increasing where its outputs rise as inputs rise. It's concave up when its rate of change is increasing, and concave down when its rate of change is decreasing.
A point of inflection is where concavity changes, which is where the rate of change switches from increasing to decreasing (or vice versa).
ex: f(1) = 3, f(2) = 7, f(3) = 15. Is f concave up or down on [1, 3]?
> Rate on [1, 2]: 4. Rate on [2, 3]: 8
> The rate of change is increasing
= Concave up
Linear functions have a constant rate of change; quadratic functions have a rate of change that changes at a constant rate.
term: average rate of change = the change in output divided by the change in input over an interval
term: concave up = curving upward; the rate of change is increasing
term: point of inflection = a point where a graph changes concavity
term: secant line = a line through two points on a graph
q: The rate of change of a function is decreasing but positive. The function is… | *increasing and concave down | decreasing and concave up | increasing and concave up | constant
why: Positive rates mean increasing; decreasing rates mean concave down.
q: Values 2, 5, 8, 11 at x = 0, 1, 2, 3 suggest which model? | *Linear | Quadratic | Exponential | Logarithmic
why: The differences are constant (3).
gen: funcEval

@lesson Polynomial functions
say: Polynomials are built from powers of x. Their zeros, degree and leading term tell the whole story.
A polynomial of degree n has at most n real zeros and at most n − 1 extrema. Complex zeros of real polynomials come in conjugate pairs.
key: End behavior is controlled by the leading term: as x → ±∞, the polynomial acts like its highest-degree term.
- Even degree: both ends go the same way. Odd degree: ends go opposite ways.
- A zero of multiplicity 2 touches the x-axis; multiplicity 1 or 3 crosses it.
- Even functions are symmetric about the y-axis; odd functions about the origin.
ex: Describe the end behavior of p(x) = −2x⁵ + 3x² − 1.
> Odd degree, negative leading coefficient
= As x → ∞, p(x) → −∞; as x → −∞, p(x) → ∞
term: leading term = the term with the highest power in a polynomial
term: extremum = a maximum or minimum value of a function
term: end behavior = what a function's outputs do as inputs grow very large or very small
q: How many turning points can a degree-4 polynomial have at most? | *3 | 4 | 5 | 2
why: At most n − 1.
q: A polynomial's graph touches the x-axis at x = 2 and turns around. The zero at 2 has… | *even multiplicity | odd multiplicity | no multiplicity | multiplicity 1
why: Even multiplicity means the graph bounces.
gen: alg2.remainder

@lesson Rational functions and modeling
say: Rational functions model situations like averages and concentrations. Their asymptotes describe limiting behavior.
key: For a rational function r(x) = p(x)/q(x), compare degrees to find end behavior: horizontal asymptote y = 0 (bottom bigger), y = ratio of leading coefficients (equal), or slant/no horizontal asymptote (top bigger).
Vertical asymptotes occur at zeros of the denominator that don't cancel; holes occur where factors cancel. Use limit notation: as x → 3⁺, r(x) → ∞.
ex: A company's average cost per item is C(x) = (500 + 2x)/x. What happens as production grows?
> Degrees are equal: leading coefficients 2 and 1
= C(x) → 2: the average cost approaches $2 per item
Function models are chosen by looking at data patterns, then checked with residuals. Piecewise functions model situations with different rules on different intervals.
term: rational function = a ratio of two polynomial functions
term: horizontal asymptote = a horizontal line a graph approaches as x → ±∞
term: limit notation = notation like x → 3⁺ describing input approaching a value from one side
q: r(x) = (x − 1)/((x − 1)(x + 2)) has a hole at… | *x = 1 | x = −2 | x = 0 | none
why: The factor (x − 1) cancels.
q: As x → ∞, (3x² + 1)/(x² − 4) approaches… | *3 | 0 | ∞ | 1/4
why: Equal degrees: 3/1.
gen: alg2.asymptote

@unit Exponential and Logarithmic Functions | Arithmetic and geometric sequences, exponential functions, logarithms, semi-log plots and modeling
@lesson Sequences and exponential functions
say: Arithmetic sequences grow by adding; geometric sequences grow by multiplying. These are the building blocks of linear and exponential functions.
key: Arithmetic sequences correspond to linear functions (constant differences). Geometric sequences correspond to exponential functions (constant ratios).
- Arithmetic: aₙ = a₀ + dn. Geometric: gₙ = g₀rⁿ.
- Exponential function: f(x) = abˣ, with initial value a and base b. Over equal-length input intervals, outputs change by equal proportions.
ex: Data: x = 0, 1, 2, 3 and y = 5, 15, 45, 135. Which model fits?
> Ratios: 15/5 = 3, 45/15 = 3, 135/45 = 3
= Exponential, y = 5(3)ˣ
Exponential growth always eventually exceeds any polynomial growth.
term: arithmetic sequence = a sequence with a constant difference between terms
term: geometric sequence = a sequence with a constant ratio between terms
term: exponential function = a function of the form f(x) = abˣ
q: Which data pattern indicates an exponential model? | *Constant ratios between outputs over equal intervals | Constant differences | Decreasing differences | Random outputs
why: Exponential functions change by a constant factor.
q: g₀ = 2 and r = 4. What is g₃? | *128 | 14 | 24 | 32
why: 2 × 4³ = 128.
gen: stem.geom, alg.expGrowth

@lesson Logarithms and their properties
say: Logarithms are the inverses of exponential functions. They turn multiplication into addition and powers into products.
key: log_b(c) = a means bᵃ = c. The logarithm of a value tells you the exponent.
Properties: log_b(xy) = log_b x + log_b y; log_b(x/y) = log_b x − log_b y; log_b(xⁿ) = n log_b x; change of base log_b x = ln x / ln b.
The graph of y = log_b x passes through (1, 0) and has a vertical asymptote at x = 0. Over equal-length output intervals, inputs change proportionally.
ex: Solve 4·2ˣ = 48.
> 2ˣ = 12
> x = log₂ 12 = ln 12 / ln 2
= x ≈ 3.585
term: logarithm = the inverse of an exponential function; the exponent needed to produce a value
term: change of base = log_b x = ln x / ln b
term: inverse function = a function that reverses the effect of another
q: log₅ 125 = | *3 | 25 | 5 | 2
why: 5³ = 125.
q: Expand ln(x²/y). | *2 ln x − ln y | ln 2x − ln y | 2 ln(x − y) | ln x² + ln y
why: Quotient rule, then power rule.
gen: stem.logs, alg2.expSolve

@lesson Semi-log plots and modeling
say: Exponential data looks curved on a normal graph, but straight on a semi-log plot. That's a powerful modeling trick.
key: If data is exponential, plotting ln(y) against x gives a straight line. The slope of that line is ln b.
On a semi-log plot, the vertical axis is logarithmic (each tick multiplies by a constant factor). Linear patterns on a semi-log plot indicate exponential relationships.
ex: A semi-log plot of ln(y) vs. x gives the line ln(y) = 0.7x + 2. Write the exponential model.
> y = e^(0.7x + 2) = e²·e^(0.7x)
= y ≈ 7.39(2.01)ˣ
Models are built from data by regression (exponential, logarithmic, power). Choose a model based on the context and on residual plots that show no pattern.
term: semi-log plot = a graph with a logarithmic vertical axis, where exponential data appears linear
term: regression = fitting a function model to data
term: residual = the difference between an actual and predicted value
q: Exponential data appears ___ on a semi-log plot. | *linear | curved | circular | constant
why: Taking logs turns exponential growth into a line.
q: A residual plot shows no pattern. This suggests… | *the model is appropriate | the model is wrong | the data are linear | there are no outliers
why: Random residuals mean the model captures the trend.

@unit Trigonometric and Polar Functions | Periodic phenomena, sine and cosine, sinusoidal models, tangent and inverse trig, polar functions
@lesson Periodic phenomena and the unit circle
say: Many things repeat: tides, seasons, sound waves. Trigonometric functions model these periodic phenomena.
A periodic function repeats its values over an interval called the period. Sine and cosine come from the unit circle: for an angle θ in standard position, the terminal ray meets the circle at (cos θ, sin θ).
key: Angles are measured in radians: a full rotation is 2π. Key values come from special triangles (π/6, π/4, π/3).
ex: Find sin(5π/6) and cos(5π/6).
> 5π/6 is in Quadrant II with reference angle π/6
= sin = 1/2, cos = −√3/2
term: periodic function = a function whose values repeat at regular intervals
term: period = the length of one complete cycle of a periodic function
term: standard position = an angle with vertex at the origin and initial side on the positive x-axis
q: What is the period of y = sin x? | *2π | π | 1 | 4π
why: Sine repeats every full rotation.
q: cos(π) = | *−1 | 0 | 1 | undefined
why: The point at π is (−1, 0).
gen: stem.trigExact, stem.radians

@lesson Sinusoidal functions and models
say: Sinusoidal functions model anything that cycles smoothly. Four parameters control their shape.
key: f(θ) = a sin(b(θ + c)) + d: amplitude |a|, period 2π/|b|, phase shift −c, midline y = d.
To build a model from data: midline = (max + min)/2, amplitude = (max − min)/2, period from the time between peaks, then choose sine or cosine based on where the cycle starts.
ex: A Ferris wheel's seat ranges from 2 m to 42 m high and completes a rotation every 40 s, starting at the bottom. Model its height.
> Midline 22, amplitude 20, period 40 so b = 2π/40 = π/20
> Starting at the minimum: use −cos
= h(t) = −20 cos(πt/20) + 22
term: amplitude = half the distance between a sinusoid's maximum and minimum
term: midline = the horizontal line halfway between the maximum and minimum
term: phase shift = a horizontal shift of a periodic function
term: sinusoidal function = a function of the form a sin(b(x + c)) + d or with cosine
q: What is the period of y = 4cos(3x)? | *2π/3 | 3 | 4 | 6π
why: 2π/|b| = 2π/3.
q: Daily temperatures range from 50°F to 80°F. What is the amplitude of a sinusoidal model? | *15 | 30 | 65 | 80
why: (80 − 50)/2 = 15.

@lesson Tangent, inverse trig and polar functions
say: Tangent has a different shape, inverse trig functions find angles, and polar functions draw curves by angle and distance.
Tangent: tan θ = sin θ / cos θ, the slope of the terminal ray. It has period π and vertical asymptotes where cos θ = 0.
Inverse trig functions output angles on restricted domains: arcsin and arctan output in [−π/2, π/2]; arccos in [0, π].
key: Polar functions r = f(θ) give the distance from the origin as the angle changes. If r is increasing (and positive), points move away from the origin; if r is decreasing, they move toward it.
ex: For r = 3 + 2cos θ, what are the maximum and minimum distances from the origin?
> cos θ ranges from −1 to 1
= Maximum 5 (at θ = 0), minimum 1 (at θ = π)
term: tangent function = sin θ / cos θ; the slope of the terminal ray
term: inverse trig function = a function that returns an angle, like arcsin
term: polar function = a function giving radius r in terms of angle θ
q: Where does y = tan x have vertical asymptotes? | *Where cos x = 0 | Where sin x = 0 | At x = 0 | Nowhere
why: Division by zero when cosine is zero.
q: arctan(1) = | *π/4 | π/2 | 1 | 0
why: tan(π/4) = 1.

@unit Functions Involving Parameters, Vectors and Matrices | Parametric functions, vectors, matrices as transformations
@lesson Parametric functions and vectors
say: Parametric functions describe motion: where something is at each moment. Vectors describe its direction and speed.
Parametric functions give x(t) and y(t). The average rate of change of each component tells how fast the position changes horizontally and vertically.
key: A vector ⟨a, b⟩ has magnitude √(a² + b²). The dot product u · v = u₁v₁ + u₂v₂ is zero for perpendicular vectors.
A particle's velocity can be described by a vector; its speed is the magnitude of that vector.
ex: A particle moves with x(t) = 2t and y(t) = t². Where is it at t = 3, and what is its average velocity vector from t = 0 to 3?
> Position at t = 3: (6, 9)
> Change: ⟨6 − 0, 9 − 0⟩ over 3 seconds
= (6, 9); average velocity ⟨2, 3⟩
term: parametric function = a function giving x and y as separate functions of a parameter t
term: vector = a quantity with magnitude and direction
term: dot product = u₁v₁ + u₂v₂, related to the angle between vectors
q: What is the magnitude of ⟨−6, 8⟩? | *10 | 14 | 2 | 100
why: √(36 + 64) = 10.
q: Vectors with a dot product of zero are… | *perpendicular | parallel | equal | opposite
why: cos 90° = 0.
gen: stem.magnitude, stem.dot

@lesson Matrices and linear transformations
say: Matrices can transform the plane: stretching, rotating and reflecting shapes. They also model changing states.
A 2×2 matrix multiplies a vector to transform it. The determinant ad − bc of [[a, b], [c, d]] tells how areas scale: |det| is the area scale factor, and a negative determinant means orientation flips.
key: A matrix has an inverse if and only if its determinant is not zero. The inverse undoes the transformation.
Rotation by θ: [[cos θ, −sin θ], [sin θ, cos θ]].
Transition matrices model systems that move between states, like customers switching between brands each month.
ex: Find the determinant of [[3, 1], [4, 2]].
> ad − bc = 3(2) − 1(4)
= 2 (areas double)
term: matrix = a rectangular array of numbers
term: determinant = a number from a square matrix; for 2×2, ad − bc
term: linear transformation = a function that maps vectors using matrix multiplication
term: transition matrix = a matrix describing probabilities of moving between states
q: A matrix has determinant 0. Does it have an inverse? | *No | Yes | Only if it's 2×2 | Always
why: A zero determinant means the transformation can't be undone.
q: A transformation's matrix has determinant −3. What happens to areas? | *They triple and orientation flips | They shrink by 3 | They stay the same | They become negative
why: |det| = 3 scales area; the negative sign flips orientation.
gen: stem.det2, stem.matvec
`;
