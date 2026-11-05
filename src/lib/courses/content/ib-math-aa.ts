export default String.raw`
@course ib-math-aa | IB Math: Analysis & Approaches | IB | 📘 | IB

// Follows the five topics of IB Mathematics: Analysis and Approaches (SL and HL), plus the internal assessment.

@unit Number and Algebra | Sequences and series, exponents and logarithms, the binomial theorem, proof
@lesson Sequences, series and finance
say: IB Math AA emphasizes algebraic reasoning and proof. We start with sequences, series and their applications.
key: Arithmetic: uₙ = u₁ + (n − 1)d, Sₙ = (n/2)(2u₁ + (n − 1)d). Geometric: uₙ = u₁rⁿ⁻¹, Sₙ = u₁(1 − rⁿ)/(1 − r), and S∞ = u₁/(1 − r) when |r| < 1.
Sigma notation compactly writes sums. Financial applications use geometric growth: compound interest FV = PV(1 + r/(100k))^(kn), and the GDC's finance solver handles loans and annuities.
ex: A geometric series has u₁ = 8 and r = 1/2. Find S∞.
> |r| < 1, so it converges
= S∞ = 8/(1 − 1/2) = 16
tip: In Paper 1 (no calculator), simplify fractions and surds exactly. In Paper 2, use the GDC for heavy computation, but show your setup.
demo: Paying off a car loan
aim: Borrow money for a car at 6% a year, paid monthly. How do the payments and total interest depend on the loan length?
set: yrs = 5 | Loan length (years) | 1 to 10 by 1
set: P = 20000 | Amount borrowed ($) | 5000 to 50000 by 1000
out: r = 0.06/12 | Monthly rate
out: pay = P*r/(1 - (1 + r)^(-12*yrs)) | Monthly payment ($)
out: interest = pay*12*yrs - P | Total interest ($)
plot: yrs, interest
step: Compare a 3-year and a 7-year loan for $20,000.
result: The payment formula comes from the sum of a geometric series. Longer loans have smaller payments but much more total interest, which is the trade-off TVM solvers help you compare.
term: arithmetic sequence = a sequence with a common difference
term: geometric series = the sum of terms of a geometric sequence
term: sum to infinity = the limit of a convergent geometric series, u₁/(1 − r)
term: sigma notation = notation using Σ to write a sum
q: Find the 10th term of 3, 7, 11, … | *39 | 40 | 43 | 36
why: 3 + 9 × 4.
q: Does 2 + 4 + 8 + … have a sum to infinity? | *No, because |r| ≥ 1 | Yes, 4 | Yes, 2 | Yes, infinity is a number
why: r = 2.
gen: stem.arith, stem.geom, stem.geoSeries

@lesson Exponents, logarithms, binomial theorem and proof
say: Logarithms and the binomial theorem are core AA tools, and you'll write your own proofs.
key: Laws of logs: log(xy) = log x + log y, log(x/y) = log x − log y, log xⁿ = n log x, change of base log_b x = ln x/ln b. Solve exponential equations by taking logs.
Binomial theorem: (a + b)ⁿ = Σ ⁿCᵣ aⁿ⁻ʳ bʳ, with ⁿCᵣ = n!/(r!(n − r)!).
Proof: direct proof from definitions; proof by counterexample to disprove. HL adds proof by induction, contradiction, complex numbers and systems of equations.
ex: Find the coefficient of x³ in (2 + x)⁵.
> The term is ⁵C₃ · 2² · x³
= 10 × 4 = 40
term: logarithm = the inverse of an exponential function
term: binomial coefficient = ⁿCᵣ, the number of ways to choose r items from n
term: proof by counterexample = disproving a statement by finding one case where it fails
q: Solve 2ˣ = 32 | *5 | 16 | 6 | 4
why: 2⁵ = 32.
q: ⁵C₂ = | *10 | 20 | 5 | 25
why: 5!/(2!3!).
gen: stem.logs, alg2.expSolve

@unit Functions | Function properties and transformations, quadratics, rational, exponential and logarithmic functions
@lesson Functions and transformations
say: Functions are the language of Math AA. You'll analyze them algebraically and graphically.
key: Domain and range, composite functions (f ∘ g)(x) = f(g(x)), and inverse functions f⁻¹ (reflect in y = x; exists only if f is one-to-one).
Transformations of y = f(x): f(x) + b shifts up, f(x − a) shifts right, pf(x) stretches vertically by p, f(qx) stretches horizontally by 1/q, −f(x) reflects in the x-axis, f(−x) reflects in the y-axis.
ex: Describe y = 2f(x − 3) + 1 relative to y = f(x).
> Horizontal shift right 3
> Vertical stretch by 2, then shift up 1
= Right 3, stretched vertically ×2, up 1
term: composite function = a function applied to the output of another function
term: inverse function = a function that reverses another; its graph reflects in y = x
term: domain = the set of allowed inputs
term: one-to-one function = a function where each output comes from exactly one input
q: If f(x) = 2x + 1 and g(x) = x², find (f ∘ g)(3). | *19 | 49 | 13 | 7
why: g(3) = 9, then f(9) = 19.
q: f(x − 4) shifts the graph… | *right 4 | left 4 | up 4 | down 4
why: Inside changes go the opposite way.
gen: stem.compose, alg2.inverseLin

@lesson Quadratic, rational, exponential and log functions
say: AA expects you to sketch and analyze key function families, finding intercepts, asymptotes and turning points.
key: Quadratics: f(x) = a(x − h)² + k has vertex (h, k); the discriminant Δ = b² − 4ac gives the number of real roots.
Rational functions f(x) = (ax + b)/(cx + d) have vertical asymptote x = −d/c and horizontal asymptote y = a/c.
Exponential f(x) = aˣ has horizontal asymptote y = 0; logarithmic f(x) = logₐ x has vertical asymptote x = 0. They're inverses.
ex: Find the asymptotes of f(x) = (2x + 1)/(x − 3).
> Vertical: x = 3
= Horizontal: y = 2/1 = 2
demo: Decibels and distance
aim: Sound intensity from a speaker falls with distance. Loudness in decibels uses a logarithm: L = 10 log₁₀(I/10⁻¹²).
set: d = 10 | Distance from the speaker (m) | 1 to 100 by 1
set: P = 1 | Speaker power (W) | 0.01 to 10 by 0.01
out: I = P/(4*pi*d^2) | Intensity (W/m²)
out: L = 10*log(I/1e-12) | Loudness (dB)
plot: d, L
step: How many decibels do you lose each time you double your distance?
result: Doubling the distance quarters the intensity, which is always a drop of about 6 dB, because log turns multiplication into subtraction: 10 log(1/4) ≈ −6.
term: discriminant = b² − 4ac, determining the number of real roots of a quadratic
term: vertical asymptote = a vertical line the graph approaches but doesn't cross
term: reciprocal function = a function of the form f(x) = k/x
q: For which k does x² + kx + 9 = 0 have exactly one root (k > 0)? | *6 | 3 | 9 | 18
why: k² − 36 = 0.
q: The horizontal asymptote of f(x) = (4x − 1)/(2x + 5) is… | *y = 2 | y = 4 | y = −1/5 | y = 0
why: Ratio of leading coefficients: 4/2.
gen: alg.vertex, alg2.asymptote

@unit Geometry and Trigonometry | 3D geometry, trig functions and identities, sine and cosine rules
@lesson Trigonometry and triangles
say: Trigonometry in AA connects triangles, the unit circle and periodic functions.
key: Sine rule: a/sin A = b/sin B = c/sin C (watch for the ambiguous case). Cosine rule: c² = a² + b² − 2ab cos C. Area = ½ab sin C.
Radians: arc length l = rθ, sector area A = ½r²θ.
Identities: sin²θ + cos²θ = 1, tan θ = sin θ/cos θ, double angle sin 2θ = 2 sin θ cos θ, cos 2θ = cos²θ − sin²θ.
Trig equations: find all solutions in the given domain using symmetry of the unit circle.
ex: Solve 2 sin x = 1 for 0 ≤ x ≤ 2π.
> sin x = 1/2
= x = π/6 or 5π/6
term: sine rule = a/sin A = b/sin B = c/sin C
term: cosine rule = c² = a² + b² − 2ab cos C
term: radian = an angle measure where 2π radians equals 360°
q: Arc length of a sector with r = 5 and θ = 2 radians? | *10 | 25 | 2.5 | 50
why: l = rθ.
q: cos 2θ can be written as… | *1 − 2sin²θ | 2 sin θ cos θ | sin²θ − cos²θ | 2cos θ
why: A double-angle identity.
gen: stem.trigExact, stem.radians, geo.arcSector

@lesson 3D geometry and trig functions
say: AA also covers 3D shapes and graphs of trig functions. HL adds vectors.
key: Volume and surface area of pyramids, cones and spheres; use Pythagoras and trig to find lengths and angles in 3D (for example, the angle between a line and a plane).
Trig graphs: f(x) = a sin(b(x + c)) + d has amplitude |a|, period 2π/b, horizontal shift −c and principal axis y = d. These model periodic phenomena like tides.
HL extends to vectors (lines and planes in 3D, scalar and vector products) and complex numbers in polar form.
ex: The depth of water is d(t) = 3 sin(πt/6) + 5 meters. Find the maximum depth and the period.
> Maximum when sin = 1: 3 + 5
= 8 m; period 2π/(π/6) = 12 hours
demo: Will the pole fit in the box?
aim: Find the longest straight pole that fits in a box, and the angle it makes with the base.
set: a = 60 | Length (cm) | 10 to 120 by 5
set: b = 40 | Width (cm) | 10 to 100 by 5
set: c = 30 | Height (cm) | 10 to 100 by 5
out: base = sqrt(a^2 + b^2) | Base diagonal (cm)
out: d = sqrt(a^2 + b^2 + c^2) | Space diagonal (cm)
out: ang = atand(c/base) | Angle with the base (°)
plot: c, d
step: Use Pythagoras twice: first across the base, then up to the opposite corner.
result: The space diagonal is √(a² + b² + c²). The angle between it and the base comes from the right triangle formed by the base diagonal and the height: tan θ = c/√(a² + b²).
term: amplitude = half the distance between maximum and minimum
term: period = the horizontal length of one cycle
term: principal axis = the horizontal line midway between maximum and minimum
q: What is the period of y = 4 cos(2x)? | *π | 2π | 4π | π/2
why: 2π/2.
q: Volume of a cone with r = 3 and h = 4? | *12π | 36π | 48π | 4π
why: ⅓π(9)(4).
gen: geo.volume

@unit Statistics and Probability | Descriptive statistics, regression, probability and distributions
@lesson Statistics and regression
say: Statistics in AA covers describing data and modeling relationships. The GDC does much of the computation.
key: Measures of center (mean, median, mode) and spread (range, IQR, standard deviation). Outliers lie beyond Q1 − 1.5·IQR or Q3 + 1.5·IQR.
Bivariate data: Pearson's correlation coefficient r measures linear correlation. The regression line of y on x predicts y from x; use it only within the data range (interpolation). AA also uses the regression line of x on y.
Sampling: random, systematic, stratified, quota and convenience sampling, with possible bias.
ex: r = −0.92 between hours of screen time and sleep. Interpret.
> Strong negative linear correlation
= More screen time is associated with less sleep (not necessarily caused by it)
term: Pearson's correlation coefficient = r, measuring the strength of a linear relationship
term: regression line = a line of best fit used for prediction
term: interquartile range = Q3 − Q1
term: stratified sampling = sampling proportionally from subgroups of a population
q: Predicting far outside the data range is… | *extrapolation and unreliable | interpolation and reliable | always valid | regression on x
why: The trend may not continue.
q: Which sampling method takes proportional samples from subgroups? | *Stratified | Convenience | Systematic | Quota
why: Strata are subgroups.
gen: median, stem.zscore

@lesson Probability and distributions
say: Probability and distributions let you model uncertainty, from coin tosses to test scores.
key: Venn diagrams and tree diagrams organize outcomes. P(A ∪ B) = P(A) + P(B) − P(A ∩ B). Conditional probability P(A | B) = P(A ∩ B)/P(B). Independent: P(A ∩ B) = P(A)P(B).
Discrete random variables: E(X) = Σ x P(X = x). Binomial distribution X ~ B(n, p): mean np. Normal distribution X ~ N(μ, σ²): use the GDC for probabilities and inverse normal.
ex: X ~ B(10, 0.3). Find E(X).
> E(X) = np
= 3
demo: Quality control on bolts
aim: Bolts must be 10.0 ± 0.2 mm. Lengths are normal with the machine's mean and standard deviation.
set: sd = 0.1 | Standard deviation (mm) | 0.02 to 0.3 by 0.01
set: mu = 10 | Machine mean (mm) | 9.8 to 10.2 by 0.01
out: ok = 100*(normcdf((10.2 - mu)/sd) - normcdf((9.8 - mu)/sd)) | Within tolerance (%)
plot: sd, ok
step: What standard deviation keeps 99% of bolts in tolerance when the mean is exactly 10.0?
result: P(9.8 < X < 10.2) uses the normal CDF. With σ = 0.1 mm about 95% pass; you need σ ≈ 0.078 mm for 99%. A mean that drifts off-center lowers the pass rate quickly.
term: binomial distribution = the distribution of successes in n independent trials with constant probability p
term: normal distribution = a symmetric, bell-shaped continuous distribution
term: conditional probability = the probability of A given B
term: expected value = the mean of a random variable
q: Two events are independent if… | *P(A ∩ B) = P(A)P(B) | P(A ∪ B) = 1 | P(A) = P(B) | P(A) + P(B) = 0
why: That's the definition.
q: For X ~ N(μ, σ²), about what percent lies within 2σ of μ? | *95% | 68% | 99.7% | 50%
why: Empirical rule.
gen: stem.combos, stem.indep, stem.expected

@unit Calculus | Limits and derivatives, differentiation applications, integration, kinematics
@lesson Differentiation and its applications
say: Calculus is the heart of Math AA. Derivatives measure rates of change and find optimal values.
key: f′(x) = lim (h→0) [f(x + h) − f(x)]/h. Rules: power, product, quotient and chain rules; derivatives of eˣ, ln x, sin x and cos x.
Applications: tangents and normals, increasing and decreasing intervals, stationary points (f′ = 0), the second derivative test (f″ > 0 minimum, f″ < 0 maximum), points of inflection, and optimization.
ex: Find the gradient of the normal to y = x² at x = 3.
> Gradient of tangent: 2x = 6
= Normal gradient: −1/6
HL adds implicit differentiation, related rates, L'Hôpital's rule and more.
term: stationary point = a point where the derivative is zero
term: normal = the line perpendicular to the tangent at a point
term: second derivative test = f″ > 0 indicates a minimum; f″ < 0 indicates a maximum
q: d/dx (x² eˣ) = | *2xeˣ + x²eˣ | 2xeˣ | x²eˣ | 2x + eˣ
why: Product rule.
q: f′(a) = 0 and f″(a) < 0. Then f has a… | *maximum at a | minimum at a | point of inflection | asymptote
why: Concave down at a stationary point.
gen: stem.powerRule, stem.chain, calc.productRule, calc.tangentLine

@lesson Integration and kinematics
say: Integration accumulates change: areas, volumes and distances. Kinematics ties it all together.
key: Indefinite integrals: ∫ xⁿ dx = xⁿ⁺¹/(n + 1) + C, ∫ eˣ dx = eˣ + C, ∫ 1/x dx = ln|x| + C, ∫ sin x dx = −cos x + C. Definite integrals give areas; area between curves = ∫(top − bottom) dx.
Substitution reverses the chain rule. Kinematics: v = ds/dt, a = dv/dt; displacement = ∫v dt; total distance = ∫|v| dt.
HL adds integration by parts, volumes of revolution and differential equations.
ex: Find the area under y = 3x² from x = 0 to 2.
> ∫₀² 3x² dx = [x³] from 0 to 2
= 8
Internal assessment: the mathematical exploration is a 12–20 page investigation of a topic you choose, worth 20% of your grade.
demo: A particle on a track
aim: A particle moves with velocity v(t) = 6t − t² m/s, starting at the origin. Find its displacement by integrating.
set: t = 3 | Time (s) | 0 to 9 by 0.1
out: v = 6*t - t^2 | Velocity (m/s)
out: s = 3*t^2 - t^3/3 | Displacement (m)
out: dist = if(t > 6, 36 + (36 - s), s) | Total distance (m)
plot: t, s
step: When does the particle turn around? Compare displacement and total distance at t = 9.
result: Displacement s = ∫v dt = 3t² − t³/3. The particle turns at t = 6 (v = 0); after that it moves back, so distance traveled exceeds displacement: at t = 9, s = 0 but the distance is 72 m.
term: definite integral = an integral with limits, giving net area
term: displacement = the integral of velocity over time
term: mathematical exploration = the IB Math internal assessment, an independent investigation
q: ∫ 4x³ dx = | *x⁴ + C | 12x² + C | 4x⁴ + C | x³ + C
why: 4x⁴/4.
q: Total distance traveled is found by integrating… | *|v(t)| | v(t) | a(t) | s(t)
why: It counts all movement as positive.
gen: stem.integral, calc.avgValue
`;
