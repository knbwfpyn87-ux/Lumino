export default String.raw`
@course act-math | ACT Math | Standard | 📏 | Test Prep

@unit ACT Math Format and Strategy | The test format, pacing and strategies
@lesson The ACT Math test
say: The ACT Math test rewards speed and broad knowledge. Let's learn the format first.
key: Since 2025, the enhanced ACT Math section has 45 questions in 50 minutes, with four answer choices per question. A calculator is allowed. There's no penalty for guessing, so answer every question.
Content covers pre-algebra, algebra, functions, geometry, statistics and probability, and some trigonometry. Questions generally get harder as you go.
key: Pacing: a little over a minute per question. Do the easier early questions quickly to save time for harder ones at the end.
Scores range from 1 to 36. Your composite score averages English, Math and Reading; Science is now optional and reported separately.
term: composite score = the average of the ACT English, Math and Reading scores
term: pacing = managing time so you can attempt every question
term: guessing penalty = a deduction for wrong answers; the ACT has none
q: Is there a penalty for guessing on the ACT? | *No | Yes, a quarter point | Yes, a full point | Only on math
why: Always answer every question.
q: Are calculators allowed on ACT Math? | *Yes | No | Only for trig | Only on the last 10 questions
why: A permitted calculator can be used throughout.

@lesson Strategies for ACT Math
say: Smart strategies can add points even before you learn new math.
key: Backsolving: plug answer choices into the problem, starting with a middle value. Picking numbers: substitute simple numbers for variables in algebraic questions.
- Read the question carefully: is it asking for x, or 2x?
- Draw diagrams for geometry problems and label everything you know.
- Estimate to eliminate unreasonable choices.
- Mark hard questions and come back.
ex: If 3x + 7 = 22, what is 2x? Choices: 5, 10, 15, 20
> Solve: 3x = 15, x = 5
> The question asks for 2x
= 10
demo: Why you should never leave a blank
aim: The ACT has no guessing penalty and four answer choices. See how guessing on remaining questions changes your expected score.
set: b = 8 | Questions you'd leave blank | 0 to 20 by 1
set: e = 1 | Choices you can eliminate first | 0 to 2 by 1
out: gain = b/(4 - e) | Expected extra correct answers
plot: b, gain
step: How much does eliminating one wrong choice help?
result: Each blind guess is worth 1/4 of a point on average, and eliminating one choice raises that to 1/3. With no penalty, guessing can only help, so fill in every answer.
term: backsolving = testing answer choices to find the one that works
term: picking numbers = replacing variables with simple numbers to test expressions
q: A question asks for 2x and you find x = 6. You choose… | *12 | 6 | 3 | 36
why: Answer the question asked.
q: Backsolving works best when… | *the answer choices are numbers | there are no choices | the question is about graphs only | never
why: You can test each number.

@unit Algebra and Functions | Linear equations and systems, quadratics and functions
@lesson Linear equations and systems
say: Algebra is the biggest part of ACT Math. Linear equations come up again and again.
key: Solve linear equations by isolating the variable. Slope m = (y₂ − y₁)/(x₂ − x₁). Slope-intercept form y = mx + b. Parallel lines have equal slopes; perpendicular slopes multiply to −1.
Systems: solve by substitution or elimination. Word problems often lead to systems: two unknowns, two equations.
Inequalities flip when multiplying or dividing by a negative.
ex: Tickets cost $5 for students and $8 for adults. 100 tickets sold for $620. How many adult tickets?
> s + a = 100; 5s + 8a = 620
> 5(100 − a) + 8a = 620, so 3a = 120
= 40 adult tickets
term: slope = the rate of change of a line
term: system of equations = two or more equations solved together
term: slope-intercept form = y = mx + b
q: Solve 4x − 9 = 3x + 2 | *11 | −7 | 7 | −11
why: Subtract 3x and add 9.
q: A line perpendicular to y = 2x + 1 has slope… | *−1/2 | 2 | −2 | 1/2
why: Opposite reciprocal.
gen: linear, slope, system2

@lesson Quadratics, exponents and functions
say: Quadratics, exponents and function notation make up a big chunk of the harder questions.
key: Factor quadratics or use the quadratic formula x = (−b ± √(b² − 4ac))/2a. The vertex of y = ax² + bx + c is at x = −b/(2a).
Exponent rules: xᵃ · xᵇ = xᵃ⁺ᵇ, (xᵃ)ᵇ = xᵃᵇ, x⁰ = 1, x⁻ⁿ = 1/xⁿ.
Function notation: f(3) means substitute 3. Composition f(g(x)) means evaluate g first.
Logarithms: log_b(x) = y means bʸ = x.
ex: f(x) = x² − 1 and g(x) = 2x. Find f(g(3)).
> g(3) = 6
> f(6) = 36 − 1
= 35
demo: Fireworks height
aim: A firework is launched from a 4 ft platform at 96 ft/s. Its height is h = −16t² + 96t + 4 feet.
set: t = 2 | Time (s) | 0 to 6.1 by 0.05
out: h = -16*t^2 + 96*t + 4 | Height (ft)
plot: t, h
step: Find the maximum height and when it occurs: t = −b/(2a).
result: The vertex is at t = 96/32 = 3 s, at a height of 148 ft. ACT questions often ask for the vertex, the zeros or the value at a given time.
term: quadratic formula = x = (−b ± √(b² − 4ac)) / 2a
term: function = a rule giving exactly one output for each input
term: logarithm = the exponent to which a base must be raised to get a number
q: Factor x² − 5x + 6 | *(x − 2)(x − 3) | (x + 2)(x + 3) | (x − 1)(x − 6) | (x + 1)(x − 6)
why: −2 × −3 = 6 and −2 + −3 = −5.
q: Simplify x³ · x⁴ | *x⁷ | x¹² | 2x⁷ | x
why: Add exponents.
gen: quadRoots, alg.factorTri, funcEval

@unit Geometry and Trigonometry | Plane geometry, coordinate geometry, trigonometry
@lesson Plane and coordinate geometry
say: Geometry questions test angles, shapes, area and the coordinate plane. Know the key formulas by heart; the ACT doesn't give a formula sheet.
key: Must-know formulas: triangle area ½bh, rectangle lw, circle area πr² and circumference 2πr, Pythagorean theorem a² + b² = c², and the sum of a polygon's interior angles (n − 2) × 180°.
Special right triangles: 45-45-90 (x, x, x√2) and 30-60-90 (x, x√3, 2x).
Coordinate geometry: midpoint ((x₁ + x₂)/2, (y₁ + y₂)/2), distance √((x₂ − x₁)² + (y₂ − y₁)²), circle equation (x − h)² + (y − k)² = r².
ex: A rectangle is 6 by 8. How long is its diagonal?
> 6² + 8² = 100
= 10
demo: Fencing a rectangular garden
aim: You have 40 m of fence for a rectangular garden. Which shape encloses the most area?
set: x = 6 | Width (m) | 1 to 19 by 0.5
out: L = 20 - x | Length (m)
out: A = x*(20 - x) | Area (m²)
plot: x, A
step: Try a long, thin rectangle and a square.
result: With a fixed perimeter, area x(20 − x) is greatest when the rectangle is a square, 10 m × 10 m = 100 m². Long, thin rectangles enclose much less.
term: Pythagorean theorem = a² + b² = c² for right triangles
term: midpoint formula = the average of the endpoints' coordinates
term: circle equation = (x − h)² + (y − k)² = r²
q: The interior angles of a pentagon sum to… | *540° | 360° | 720° | 180°
why: (5 − 2) × 180.
q: Area of a circle with diameter 10? | *25π | 100π | 10π | 20π
why: Radius 5: π(5)².
gen: area, pyth, geo.midpoint

@lesson Trigonometry
say: The ACT includes a few trigonometry questions, and they're often easier than they look.
key: SOH-CAH-TOA: sin = opposite/hypotenuse, cos = adjacent/hypotenuse, tan = opposite/adjacent.
Other trig facts tested on the ACT: sin²θ + cos²θ = 1, the unit circle values for 30°, 45° and 60°, and radians (π = 180°).
Graphs: y = A sin(Bx) has amplitude |A| and period 2π/B.
Law of Sines and Law of Cosines may appear for non-right triangles; the formula is often provided in the question.
ex: In a right triangle, the side opposite angle θ is 5 and the hypotenuse is 13. Find cos θ.
> The adjacent side is √(169 − 25) = 12
= cos θ = 12/13
term: sine = opposite over hypotenuse
term: amplitude = half the distance between a sinusoid's maximum and minimum
term: radian = an angle measure where π radians equals 180°
q: What is the period of y = sin(3x)? | *2π/3 | 3π | 6π | π/3
why: 2π/B.
q: tan θ = opposite/adjacent. If opposite = 3 and adjacent = 4, tan θ = | *3/4 | 4/3 | 3/5 | 4/5
why: TOA.
gen: geo.trigRatio

@unit Statistics, Probability and Number | Percents and ratios, statistics and probability
@lesson Percents, ratios and number properties
say: Number and quantity questions are often quick points if you know the basics well.
key: Percent of: part = percent × whole. Percent change = (new − old)/old × 100%. Ratios and proportions: cross-multiply.
Number properties: primes, factors and multiples, GCF and LCM, odd and even rules, absolute value and the order of operations.
Averages: mean = sum ÷ count. If you know the average and the count, you know the sum.
ex: The average of 4 tests is 85. What score on a 5th test raises the average to 87?
> Current sum: 4 × 85 = 340; needed sum: 5 × 87 = 435
= 435 − 340 = 95
demo: Up 20%, then down 20%
aim: A $100 item's price goes up by a percentage, then down by the same percentage. Does it get back to $100?
set: p = 20 | Percent change (%) | 0 to 90 by 5
out: after = 100*(1 + p/100)*(1 - p/100) | Final price ($)
out: net = after - 100 | Net change ($)
plot: p, after
step: Predict the final price at 50% before you look.
result: The decrease is applied to a bigger number, so you always end lower: 100(1 + p)(1 − p) = 100(1 − p²). Up and down 20% leaves $96; 50% leaves just $75.
term: percent change = the change divided by the original amount, times 100
term: least common multiple = the smallest number that is a multiple of each given number
term: mean = the sum of values divided by their count
q: What is 30% of 70? | *21 | 30 | 2.1 | 49
why: 0.3 × 70.
q: LCM of 6 and 8? | *24 | 48 | 2 | 14
why: 24 is the smallest common multiple.
gen: percentOf, percentChange, meanFind

@lesson Statistics and probability
say: Data and probability questions test reading tables and reasoning about chance.
key: Mean, median, mode and range describe data. Probability = favorable outcomes ÷ total outcomes. For independent events, multiply probabilities.
Counting: the fundamental counting principle multiplies choices; permutations count arrangements (order matters); combinations count groups (order doesn't).
Expected value = sum of each value × its probability.
ex: A bag has 3 red, 5 blue and 2 green marbles. Two are drawn without replacement. P(both red)?
> 3/10 × 2/9
= 6/90 = 1/15
term: median = the middle value in ordered data
term: combination = a selection where order does not matter
term: independent events = events where one doesn't affect the other
q: Median of 2, 9, 4, 7, 5? | *5 | 4 | 5.4 | 7
why: Sorted: 2, 4, 5, 7, 9.
q: How many ways to arrange 4 books on a shelf? | *24 | 16 | 4 | 12
why: 4! = 24.
gen: median, stem.combos, stem.indep
`;
