export default String.raw`
@course ib-math-ai | IB Math: Applications & Interpretation | IB | 📙 | IB

// Follows the five topics of IB Mathematics: Applications and Interpretation (SL and HL), with a focus on modeling and technology.

@unit Number and Algebra | Scientific notation and approximation, financial mathematics, sequences
@lesson Approximation and financial mathematics
say: Math AI focuses on real-world modeling and using technology. Let's start with numbers and money.
key: Scientific notation a × 10ᵏ (1 ≤ a < 10). Round to significant figures or decimal places as asked. Percentage error = |approximate − exact|/|exact| × 100%.
Financial math: compound interest FV = PV(1 + r/(100k))^(kn). Use the GDC's finance solver (TVM) for loans, savings and annuities. Depreciation reduces value by a percentage each year.
ex: A car worth $20,000 depreciates 15% per year. Find its value after 3 years.
> 20,000 × 0.85³
= about $12,282.50
Inflation reduces purchasing power; real interest rates account for it.
term: percentage error = the relative difference between an estimate and the exact value, as a percent
term: compound interest = interest calculated on both the principal and previous interest
term: depreciation = a decrease in value over time
term: annuity = a series of equal payments made at regular intervals
q: Write 0.00052 in scientific notation. | *5.2 × 10⁻⁴ | 52 × 10⁻⁵ | 5.2 × 10⁴ | 0.52 × 10⁻³
why: Move the decimal 4 places right.
q: An estimate is 98 and the exact value is 100. Percentage error? | *2% | 98% | 0.02% | 20%
why: 2/100 × 100.
gen: alg.sciNote, stem.compound

@lesson Sequences and modeling growth
say: Sequences model patterns of growth in savings, populations and more.
key: Arithmetic sequences model linear growth: uₙ = u₁ + (n − 1)d. Geometric sequences model exponential growth: uₙ = u₁rⁿ⁻¹.
Use sums to find totals: Sₙ = (n/2)(2u₁ + (n − 1)d) for arithmetic; Sₙ = u₁(rⁿ − 1)/(r − 1) for geometric.
ex: A gym membership costs $30 the first month and rises by $2 each month. What's the total for a year?
> Arithmetic: u₁ = 30, d = 2, n = 12
= S₁₂ = 6(60 + 22) = $492
Real-world data rarely fits perfectly; Math AI emphasizes choosing an appropriate model and judging its limitations.
term: arithmetic sequence = a sequence with a constant difference, modeling linear growth
term: geometric sequence = a sequence with a constant ratio, modeling exponential growth
term: model = a mathematical representation of a real situation
q: A population doubles every year. Which model fits? | *Geometric | Arithmetic | Linear | Constant
why: Constant ratio of 2.
q: Find u₅ for a geometric sequence with u₁ = 3, r = 2. | *48 | 24 | 96 | 15
why: 3 × 2⁴.
gen: stem.arith, stem.geom

@unit Functions and Modeling | Linear, quadratic, exponential, sinusoidal and other models
@lesson Linear and quadratic models
say: Math AI is all about choosing a function that models real data and interpreting its parameters.
key: Linear model f(x) = mx + c: constant rate of change m. Quadratic model f(x) = ax² + bx + c: models projectiles and areas, with the vertex as the maximum or minimum.
Use the GDC to find intersections, zeros, maxima and minima, and to fit regression models to data.
ex: A ball's height is h(t) = −4.9t² + 20t + 1.5. Find the maximum height.
> Vertex at t = −20/(2 × −4.9) ≈ 2.04 s
= h ≈ 21.9 m
Interpret parameters in context: in C = 15n + 200, 15 is the cost per item and 200 is a fixed cost.
term: linear model = a model with a constant rate of change
term: quadratic model = a model using a parabola, often for maximum or minimum problems
term: regression = fitting a model to data using technology
q: In C = 12n + 50, what does 12 represent? | *The cost per unit | The fixed cost | The total cost | The number of units
why: It multiplies n.
q: A quadratic model's vertex represents… | *the maximum or minimum value | the y-intercept always | the slope | the asymptote
why: Parabolas turn at the vertex.
gen: alg.lineEq, alg.vertex

@lesson Exponential, sinusoidal and other models
say: Different situations need different models. Choosing the right one is a key AI skill.
key: Exponential f(x) = ka⁽ˣ⁾ + c models growth and decay (populations, cooling, radioactivity). Sinusoidal f(x) = a sin(b(x − c)) + d models periodic data (tides, temperatures).
Other models: direct and inverse variation, cubic models, and logistic models for growth with a limit (HL).
Choose a model by examining the data pattern, context and residuals. Use the coefficient of determination R² to judge fit (closer to 1 is better).
ex: Daylight hours peak at 15 in June and bottom at 9 in December. Find the amplitude and principal axis.
> Amplitude = (15 − 9)/2 = 3
= Principal axis y = 12
term: exponential model = a model of the form ka^x + c for growth or decay
term: sinusoidal model = a model using sine or cosine for periodic data
term: coefficient of determination = R², measuring how well a model fits data
q: Which model fits monthly average temperatures over several years? | *Sinusoidal | Linear | Quadratic | Constant
why: Temperatures cycle each year.
q: An R² closer to 1 means… | *a better fit | a worse fit | no correlation | negative correlation
why: More variation is explained.
gen: alg.expGrowth

@unit Geometry and Trigonometry | Right and non-right triangles, 3D shapes, Voronoi diagrams
@lesson Trigonometry and 3D geometry
say: Geometry in Math AI solves real measurement problems: heights, distances, areas and volumes.
key: Right triangles: SOH-CAH-TOA and Pythagoras. Non-right triangles: sine rule, cosine rule and area = ½ab sin C. Angles of elevation and depression and bearings appear in many problems.
3D: volume and surface area of prisms, cylinders, cones, pyramids and spheres; find lengths and angles inside 3D shapes using right triangles.
ex: From 50 m away, the angle of elevation to a building's top is 32°. Find its height.
> tan 32° = h/50
= h = 50 tan 32° ≈ 31.2 m
term: angle of elevation = the angle measured upward from horizontal
term: bearing = a direction measured clockwise from north
term: sine rule = a/sin A = b/sin B = c/sin C
q: A bearing of 090° points… | *east | north | south | west
why: Measured clockwise from north.
q: Area of a triangle with sides 6 and 8 and included angle 30°? | *12 | 24 | 48 | 6
why: ½ × 6 × 8 × 0.5.
gen: geo.trigRatio, geo.volume

@lesson Voronoi diagrams
say: Voronoi diagrams solve location problems, like finding the nearest hospital. They're unique to Math AI.
key: A Voronoi diagram divides a region into cells around sites (points) so every location in a cell is closer to its site than any other.
- Cell edges lie on perpendicular bisectors between neighboring sites.
- Vertices are equidistant from three or more sites.
- The "toxic waste dump" problem: find the point farthest from all sites (often at a vertex of the diagram).
Applications: placing new stores or emergency services, mapping cell phone towers.
ex: Two sites are at (0, 0) and (6, 0). Where is the boundary between their cells?
> The perpendicular bisector of the segment
= The vertical line x = 3
term: Voronoi diagram = a partition of a plane into regions closest to each site
term: site = a point around which a Voronoi cell is built
term: perpendicular bisector = a line perpendicular to a segment through its midpoint
q: Every point in a Voronoi cell is… | *closer to its site than to any other site | the same distance from all sites | farthest from its site | on the boundary
why: That's the definition.
q: Voronoi cell edges lie on… | *perpendicular bisectors between sites | circles | parabolas | random lines
why: Points equidistant from two sites form the bisector.
gen: geo.midpoint

@unit Statistics and Probability | Data collection and descriptive statistics, regression, probability, hypothesis tests
@lesson Data, regression and correlation
say: Math AI emphasizes statistics heavily. You'll collect, analyze and interpret real data.
key: Sampling methods (simple random, systematic, stratified, quota, convenience) and possible bias. Descriptive statistics: mean, median, quartiles, standard deviation, box plots and cumulative frequency graphs.
Bivariate data: Pearson's r for linear correlation; Spearman's rank correlation for monotonic relationships. The regression line of y on x predicts y.
ex: Spearman's rank coefficient is 0.9 for two judges' rankings. Interpret.
> Strong positive association between the rankings
= The judges largely agree
Correlation never proves causation.
term: Spearman's rank correlation = a measure of how well the relationship between two variables follows a monotonic pattern
term: cumulative frequency = a running total of frequencies
term: box plot = a diagram of the five-number summary
q: Which measures association using ranks? | *Spearman's rank correlation | Pearson's r | Standard deviation | IQR
why: It uses ranked data.
q: A strong correlation between two variables proves causation. True or false? | *False | True | Only if r = 1 | Only for linear data
why: Correlation isn't causation.
gen: median, meanFind

@lesson Probability and hypothesis testing
say: Math AI uses probability distributions and hypothesis tests to make decisions from data.
key: Probability rules, Venn and tree diagrams, conditional probability. Distributions: binomial B(n, p) and normal N(μ, σ²), computed with the GDC.
Chi-squared tests: test for independence (contingency tables) and goodness of fit. State H₀ and H₁, find the p-value, and compare with the significance level: if p < α, reject H₀.
The t-test compares means (SL: two-sample t-test).
Internal assessment: the mathematical exploration often uses real data and statistics, and it's worth 20% of the grade.
ex: A chi-squared test for independence gives p = 0.02 at the 5% level. Conclusion?
> 0.02 < 0.05
= Reject H₀: there is evidence the variables are dependent
term: null hypothesis = the hypothesis of no effect or independence
term: p-value = the probability of results this extreme if H₀ is true
term: chi-squared test = a test comparing observed and expected frequencies
term: significance level = the threshold α for rejecting the null hypothesis
q: p = 0.12 at the 5% significance level. You should… | *not reject H₀ | reject H₀ | accept H₁ | change α
why: 0.12 > 0.05.
q: X ~ B(20, 0.5). E(X) = | *10 | 20 | 0.5 | 5
why: np.
gen: stem.zscore, stem.indep

@unit Calculus | Derivatives and optimization, integration and the trapezoidal rule
@lesson Derivatives and optimization
say: Calculus in Math AI focuses on rates of change and optimizing real situations.
key: The derivative gives the rate of change and the gradient of the tangent. Power rule: d/dx (axⁿ) = naxⁿ⁻¹.
Stationary points occur where f′(x) = 0; use them to find maximum profit, minimum cost or maximum area. Use the GDC to verify.
ex: Profit P(x) = −2x² + 80x − 300. Find the number of units that maximizes profit.
> P′(x) = −4x + 80 = 0
= x = 20 units (maximum profit $500)
HL adds more differentiation rules, related rates and differential equations (including slope fields and Euler's method).
term: derivative = the instantaneous rate of change of a function
term: optimization = finding the maximum or minimum value in context
term: gradient = the slope of a curve at a point
q: d/dx (5x³) = | *15x² | 5x² | 15x³ | 3x²
why: Power rule.
q: A stationary point occurs where… | *f′(x) = 0 | f(x) = 0 | f″(x) = 1 | x = 0
why: The gradient is zero.
gen: stem.powerRule, stem.derivAt

@lesson Integration and the trapezoidal rule
say: Integration finds accumulated totals and areas. When there's no formula, the trapezoidal rule estimates them.
key: ∫ axⁿ dx = axⁿ⁺¹/(n + 1) + C. Definite integrals give the area under a curve (use the GDC to evaluate).
The trapezoidal rule estimates area with trapezoids: A ≈ (h/2)[y₀ + yₙ + 2(y₁ + … + yₙ₋₁)], where h is the strip width. It's useful when you only have data points.
ex: Estimate the area under a curve with y-values 2, 4, 5 at x = 0, 1, 2.
> h = 1
> (1/2)[2 + 5 + 2(4)]
= 7.5 square units
term: definite integral = the accumulated area under a curve between two limits
term: trapezoidal rule = a method for estimating area using trapezoids
term: antiderivative = a function whose derivative is the given function
q: ∫ 6x dx = | *3x² + C | 6x² + C | 6 + C | x² + C
why: 6x²/2.
q: The trapezoidal rule is useful when… | *you only have data points | the function is a straight line only | you want an exact answer always | there are no y-values
why: It works from tabulated values.
gen: stem.integral, calc.riemann
`;
