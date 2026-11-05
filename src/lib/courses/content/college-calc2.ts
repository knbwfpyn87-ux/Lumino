export default String.raw`
@course college-calc2 | Calculus II (College) | College | 🎓 | College

// Follows a standard second-semester university calculus syllabus (OpenStax Calculus Volume 2): applications of integration, techniques of integration, sequences and series, and parametric and polar curves.

@unit Integration Techniques and Applications | Area, volume, integration by parts, partial fractions, improper integrals
@lesson Applications of integration
say: Integrals measure more than area: volumes, lengths, work and averages.
key: Area between curves: ∫ₐᵇ (top − bottom) dx. Find intersection points first to get the limits.
Volumes of revolution: disk method V = π∫R² dx; washer method V = π∫(R² − r²) dx; shell method V = 2π∫(radius)(height) dx. Arc length: L = ∫√(1 + (f′)²) dx.
Physical applications: work W = ∫F(x) dx, average value (1/(b − a))∫f dx, and center of mass.
ex: Find the area between y = x and y = x² on [0, 1].
> Top is x, bottom is x²: ∫₀¹ (x − x²) dx
> = 1/2 − 1/3
= 1/6
demo: Pumping out a water tank
aim: A cylindrical tank of radius 2 m is full of water to height H. How much work does it take to pump all the water out over the top?
set: H = 3 | Tank height (m) | 0.5 to 10 by 0.5
out: W = 1000*g*pi*4*H^2/2 | Work (J)
out: kWh = W/3.6e6 | Work (kWh)
plot: H, W
step: Slice the water into thin layers: a layer at height y must be lifted H − y. Integrate ρg·π(2)²(H − y) dy.
result: W = ∫₀ᴴ ρgπr²(H − y) dy = ρgπr²H²/2. Doubling the height quadruples the work, because there's twice as much water and it must be lifted twice as far on average.
term: washer method = finding volume using outer and inner radii
term: shell method = finding volume by summing cylindrical shells
term: arc length = the length of a curve between two points
term: average value = (1/(b − a)) times the integral of f over [a, b]
q: Rotating y = √x about the x-axis on [0, 4] gives volume… | *8π | 4π | 16π | 2π
why: π∫₀⁴ x dx = 8π.
q: The washer method subtracts… | *the inner radius squared from the outer radius squared | heights | arc lengths | derivatives
why: V = π∫(R² − r²) dx.
gen: stem.integral, calc.avgValue

@lesson Techniques of integration
say: Many integrals need special techniques. Choosing the right one is the skill.
key: Integration by parts: ∫u dv = uv − ∫v du. Choose u using LIATE (logarithmic, inverse trig, algebraic, trig, exponential).
Trigonometric integrals and trig substitution (x = a sin θ for √(a² − x²)). Partial fractions split rational functions: 1/((x − 1)(x + 2)) = A/(x − 1) + B/(x + 2).
Improper integrals have infinite limits or infinite discontinuities; evaluate as limits. ∫₁^∞ 1/xᵖ dx converges if p > 1 and diverges if p ≤ 1. Numerical methods: trapezoidal rule and Simpson's rule.
ex: Evaluate ∫ x eˣ dx.
> u = x, dv = eˣ dx → du = dx, v = eˣ
> x eˣ − ∫ eˣ dx
= x eˣ − eˣ + C
term: integration by parts = ∫u dv = uv − ∫v du
term: partial fractions = splitting a rational function into simpler fractions
term: improper integral = an integral with an infinite limit or unbounded integrand
term: p-integral = ∫₁^∞ 1/xᵖ dx, convergent only when p > 1
q: ∫₁^∞ 1/x² dx… | *converges to 1 | diverges | equals 0 | equals 2
why: p = 2 > 1; the value is 1.
q: For ∫ x ln x dx, using LIATE you choose u = … | *ln x | x | x ln x | 1
why: Logarithmic comes first.

@unit Sequences, Series and Curves | Convergence tests, power series, Taylor series, parametric and polar
@lesson Sequences and series
say: Can adding infinitely many numbers give a finite answer? Series answer that question.
key: A sequence converges if its terms approach a limit. A series Σaₙ converges if its partial sums approach a limit.
Geometric series Σarⁿ converges to a/(1 − r) when |r| < 1. The nth-term test: if aₙ doesn't approach 0, the series diverges (but aₙ → 0 alone doesn't prove convergence: the harmonic series Σ1/n diverges).
Tests: integral test, p-series (Σ1/nᵖ converges if p > 1), comparison and limit comparison, ratio test (L < 1 converges), root test, and the alternating series test. Absolute versus conditional convergence.
ex: Find the sum of 6 + 3 + 1.5 + …
> a = 6, r = 1/2
> 6 ÷ (1 − 1/2)
= 12
demo: Medicine building up in the body
aim: A patient takes 100 mg every day, and a fraction of the drug remains in the body each day. How much is present right after dose n?
set: n = 5 | Number of doses | 1 to 30 by 1
set: r = 0.5 | Fraction remaining after a day | 0.1 to 0.9 by 0.05
out: A = 100*(1 - r^n)/(1 - r) | Amount after dose n (mg)
out: steady = 100/(1 - r) | Long-run level (mg)
plot: n, A
step: Write the amounts as a geometric series 100 + 100r + 100r² + …. What does it converge to?
result: The partial sums 100(1 − rⁿ)/(1 − r) approach 100/(1 − r), the steady state. With r = 0.5 the level settles at 200 mg, a convergent geometric series at work.
term: geometric series = a series with a constant ratio between terms
term: harmonic series = Σ1/n, which diverges
term: ratio test = a test using lim |aₙ₊₁/aₙ| to decide convergence
term: conditional convergence = converging only because of alternating signs
q: Σ 1/n³ … | *converges (p-series, p > 1) | diverges | equals 0 | is geometric
why: p = 3 > 1.
q: The alternating harmonic series Σ(−1)ⁿ⁺¹/n is… | *conditionally convergent | absolutely convergent | divergent | geometric
why: It converges, but Σ1/n diverges.
gen: stem.geoSeries, stem.geom, stem.arith

@lesson Power series, Taylor series, parametric and polar curves
say: Power series turn functions into infinite polynomials, and new coordinate systems describe curves.
key: A power series Σcₙ(x − a)ⁿ converges on an interval found with the ratio test (check endpoints separately). Taylor series: f(x) = Σ f⁽ⁿ⁾(a)(x − a)ⁿ/n!; at a = 0 it's a Maclaurin series.
Key series: eˣ = Σxⁿ/n!; sin x = x − x³/3! + x⁵/5! − …; cos x = 1 − x²/2! + x⁴/4! − …; 1/(1 − x) = Σxⁿ for |x| < 1. Taylor polynomials approximate functions with error bounded by the Lagrange remainder.
Parametric curves: dy/dx = (dy/dt)/(dx/dt). Polar coordinates: x = r cos θ, y = r sin θ; area = (1/2)∫r² dθ.
term: Taylor series = a power series built from a function's derivatives at one point
term: Maclaurin series = a Taylor series centered at 0
term: radius of convergence = the distance from the center within which a power series converges
term: polar coordinates = locating points by distance r and angle θ
q: The Maclaurin series for eˣ is… | *Σ xⁿ/n! | Σ xⁿ | Σ (−1)ⁿxⁿ | Σ n xⁿ
why: Every derivative of eˣ at 0 is 1.
q: For parametric x = t², y = t³, dy/dx equals… | *3t/2 | 2t/3 | 3t² | t
why: 3t² ÷ 2t.
`;
