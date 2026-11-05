export default String.raw`
@course sat-math | SAT Math | Standard | 🎯 | Test Prep | SAT

// Organized by the four Digital SAT Math domains. All questions are original.

@unit How the Digital SAT Math Section Works | Format, adaptive modules, Desmos, pacing and answer strategies
@lesson The format and how it adapts
say: Knowing how the test works is free points. Let's learn the format before we learn the math!
The Digital SAT Math section has two modules of 22 questions each (44 total), with 35 minutes per module. You can use the built-in Desmos graphing calculator on every question.
key: The test is adaptive: how you do on Module 1 decides whether Module 2 is easier or harder. Doing well on Module 1 unlocks the higher score range.
- About 75% of questions are multiple choice with 4 options; about 25% are student-produced responses (you type the answer).
- There is no penalty for wrong answers, so never leave a question blank.
- A reference sheet with common formulas (area, volume, special right triangles) is provided.
Scores range from 200 to 800 for Math. The four domains are Algebra, Advanced Math, Problem-Solving and Data Analysis, and Geometry and Trigonometry.
term: adaptive testing = a test where later questions depend on your performance on earlier ones
term: student-produced response = a question where you type your own answer instead of choosing
term: module = one timed section of the Digital SAT
q: Is there a penalty for wrong answers on the SAT? | *No, so always answer every question | Yes, a quarter point | Yes, a full point | Only on hard questions
why: Guessing can only help.
q: What decides the difficulty of Module 2? | *Your performance on Module 1 | Random chance | Your grade level | The time of day
why: The test adapts after the first module.

@lesson Pacing and test strategies
say: Smart strategy can raise your score as much as more math. Here are the habits of top scorers.
With 35 minutes for 22 questions, you have about 1 minute 35 seconds per question.
key: Don't get stuck. Flag hard questions with the "Mark for Review" tool, guess, move on, and come back if you have time.
Proven strategies:
- Plug in the answers: for "which value of x" questions, test the choices.
- Pick numbers: replace variables with simple numbers to test expressions.
- Use Desmos: graph equations to find intersections, zeros and maximums instead of solving by hand.
- Read the last line first: know exactly what the question asks (x, or 2x + 1?).
- Estimate and eliminate impossible choices.
ex: If 3(x + 2) = 2x + 11, what is the value of x + 4?
> Solve: 3x + 6 = 2x + 11, so x = 5
> Answer the actual question: x + 4
= 9 (not 5!)
term: plugging in answers = testing each answer choice in the problem to find the one that works
term: picking numbers = substituting easy numbers for variables to test expressions
q: You've spent 3 minutes on a question. Best move? | *Guess, mark it for review and move on | Keep working until solved | Skip it with no answer | Restart the module
why: Unanswered questions get no credit and time is limited.
q: A question asks for 2y. You solve and find y = 6. What do you enter? | *12 | 6 | 3 | 2
why: Always answer the exact question asked.

@unit Algebra | Linear equations and inequalities, linear functions, systems, word problems
@lesson Linear equations and expressions
say: Algebra is the biggest chunk of SAT Math. Linear equations are the foundation, so let's make them automatic.
Solve linear equations by distributing, combining like terms, and isolating the variable.
Special cases the SAT loves:
- No solution: variables cancel, leaving a false statement (3 = 5). Happens when the x-coefficients match but constants differ.
- Infinitely many solutions: both sides are identical.
ex: For what value of k does 4x + 7 = kx − 2 have no solution?
> No solution when the x-terms cancel but the constants differ
> k must equal 4 (then 7 = −2 is false)
= k = 4
tip: For equations with fractions, multiply everything by the common denominator first.
term: linear equation = an equation whose graph is a line; the variable has exponent 1
term: no solution = an equation that simplifies to a false statement
term: infinitely many solutions = an equation that simplifies to an always-true statement
q: If 5(x − 1) = 3x + 9, what is x? | *7 | 4 | 5 | 2
why: 5x − 5 = 3x + 9, so 2x = 14.
q: 2(3x + 4) = 6x + c has infinitely many solutions. What is c? | *8 | 4 | 6 | 0
why: 6x + 8 = 6x + c for all x when c = 8.
gen: linear, alg.distribute

@lesson Linear functions and graphs
say: The SAT tests linear functions in equations, graphs, tables and real-world stories. Know how to move between them.
key: In y = mx + b, m is the slope (rate of change) and b is the y-intercept (starting value).
In word problems, the slope is the "per" amount and the intercept is the starting amount.
ex: A plumber charges C = 75h + 60, where h is hours. What does 60 represent?
> When h = 0, C = 60
= A flat fee of $60 charged even before any work is done
Parallel lines have equal slopes; perpendicular slopes multiply to −1. To find the slope from two points, use (y₂ − y₁)/(x₂ − x₁).
tip: For questions about a line's equation from a table, find the slope from two rows, then plug in one point to find b.
term: slope = the rate of change of a linear function
term: y-intercept = the value of y when x is 0; the starting value
term: rate of change = how much the output changes per unit of input
q: In P = 12t + 200, P is a phone plan's cost after t months. What is 12? | *The cost per month | The starting fee | The total cost | The number of months
why: The coefficient of t is the rate per month.
q: A line passes through (0, 3) and (2, 11). What is its equation? | *y = 4x + 3 | y = 3x + 4 | y = 8x + 3 | y = 4x + 11
why: Slope (11 − 3)/2 = 4; intercept 3.
gen: slope, alg.lineEq

@lesson Systems and inequalities
say: Systems of equations show up in nearly every SAT. Learn the fastest method for each type.
Solve systems by substitution, elimination, or graphing in Desmos (find the intersection).
key: A system of two linear equations has no solution if the lines are parallel (same slope, different intercepts) and infinitely many if they're the same line.
ex: For what value of a does the system 3x + 2y = 5 and ax + 4y = 9 have no solution?
> No solution: parallel lines with equal slopes
> Multiply the first by 2: 6x + 4y = 10; matching x-coefficient means a = 6
> 6x + 4y = 9 vs. 10: different constants, so parallel
= a = 6
For inequalities, solve like equations but flip the sign when multiplying or dividing by a negative. On a graph, test a point to decide which side to shade.
term: system of equations = two or more equations solved together
term: elimination = adding or subtracting equations to cancel a variable
term: solution to a system = the point where all equations are true
q: Solve x + y = 12 and x − y = 4. What is x? | *8 | 4 | 6 | 16
why: Add the equations: 2x = 16.
q: A system has lines with the same slope and the same intercept. How many solutions? | *Infinitely many | None | One | Two
why: They're the same line.
gen: system2, inequality

@unit Advanced Math | Quadratics, exponential functions, polynomials and rational expressions, function notation and transformations
@lesson Quadratics
say: Quadratics are the heart of Advanced Math. You need to know their forms and what each one tells you.
- Standard form y = ax² + bx + c: c is the y-intercept.
- Factored form y = a(x − p)(x − q): zeros at x = p and x = q.
- Vertex form y = a(x − h)² + k: vertex at (h, k).
key: The vertex's x-coordinate is −b/(2a), halfway between the zeros. The sum of the solutions is −b/a and the product is c/a.
ex: What is the sum of the solutions of 2x² − 10x + 7 = 0?
> Sum of roots = −b/a
> −(−10)/2
= 5
The discriminant b² − 4ac tells you the number of real solutions: positive → 2, zero → 1, negative → 0. Desmos can find zeros and vertices instantly.
term: vertex form = y = a(x − h)² + k, showing the vertex (h, k)
term: factored form = y = a(x − p)(x − q), showing the zeros p and q
term: discriminant = b² − 4ac, which tells how many real solutions a quadratic has
q: What is the vertex of y = −(x + 2)² + 5? | *(−2, 5) | (2, 5) | (−2, −5) | (5, −2)
why: Vertex form gives (h, k) with h = −2.
q: How many real solutions does x² + 4x + 9 = 0 have? | *0 | 1 | 2 | 4
why: 16 − 36 = −20 is negative.
gen: quadRoots, alg.vertex, alg.factorTri

@lesson Exponential functions
say: Exponential growth and decay show up in finance, populations and science questions. Learn to read them fast.
key: f(x) = a(b)ˣ: a is the starting value, and b is the growth factor. b > 1 means growth; 0 < b < 1 means decay.
- Growth by r%: b = 1 + r/100. A 7% increase gives b = 1.07.
- Decay by r%: b = 1 − r/100. A 15% decrease gives b = 0.85.
- If the time unit changes, adjust the exponent: doubling every 3 years is a(2)^(t/3).
ex: A car worth $24,000 loses 12% of its value each year. Write its value after t years.
> Decay factor: 1 − 0.12 = 0.88
= V = 24,000(0.88)ᵗ
Linear functions change by a constant amount; exponential functions change by a constant percent (factor).
term: growth factor = the number multiplied each period in an exponential function
term: exponential decay = decrease by a constant percent per period
term: initial value = the starting amount a in f(x) = a(b)ˣ
q: f(t) = 500(1.04)ᵗ. What does 1.04 represent? | *4% growth per period | 104% growth | a starting value of 1.04 | 4% decay
why: 1.04 = 1 + 0.04.
q: A population triples every 2 years. Starting at 100, which models it? | *P = 100(3)^(t/2) | P = 100(2)^(t/3) | P = 100 + 3t | P = 300(t)
why: It multiplies by 3 every 2 years.
gen: alg.expGrowth

@lesson Polynomials, radicals and function notation
say: Advanced Math also tests your fluency with expressions and functions. These skills save tons of time.
- Exponent rules: xᵃ · xᵇ = xᵃ⁺ᵇ, (xᵃ)ᵇ = xᵃᵇ, x^(1/n) = ⁿ√x.
- Factor and simplify rational expressions; watch for values that make denominators zero.
- Remainder Theorem: p(a) is the remainder when p(x) is divided by (x − a).
key: Function notation: f(3) means plug in 3. f(x + 1) means replace every x with (x + 1). g(f(2)) means find f(2), then plug that into g.
Transformations: f(x) + k shifts up k; f(x − h) shifts right h; −f(x) reflects over the x-axis.
ex: f(x) = x² − 3. What is f(a + 1)?
> Replace x with (a + 1): (a + 1)² − 3
= a² + 2a − 2
term: function notation = writing f(x) to name a function's output for input x
term: composition = using one function's output as another's input, f(g(x))
term: remainder theorem = the remainder of p(x) divided by x − a equals p(a)
q: If f(x) = 2x + 1 and g(x) = x², what is g(f(1))? | *9 | 3 | 5 | 4
why: f(1) = 3, then g(3) = 9.
q: Which equals x^(3/2)? | *x√x | √x³ ÷ x | 3x/2 | x³√2
why: x^(3/2) = x¹ · x^(1/2).
gen: funcEval, exponent, alg2.remainder

@unit Problem-Solving and Data Analysis | Ratios, rates and percentages, units, statistics and data, probability
@lesson Ratios, rates, percentages and units
say: These real-world math skills are some of the most reliable points on the SAT. Let's master them.
- Ratios and proportions: set up a/b = c/d and cross-multiply.
- Unit conversion: multiply by conversion factors so units cancel.
- Percent of: part = percent × whole.
key: Percent change = (new − old) ÷ old × 100%. Two successive changes multiply: a 20% increase then a 20% decrease gives 1.2 × 0.8 = 0.96, a 4% overall decrease.
ex: A $80 jacket is marked up 25%, then discounted 10%. Final price?
> 80 × 1.25 = 100
> 100 × 0.90
= $90
oops: A 50% increase followed by a 50% decrease does NOT return to the original. 100 → 150 → 75.
term: proportion = an equation stating two ratios are equal
term: percent change = the change in a value divided by the original value, times 100
term: unit rate = a rate with a denominator of one unit, like miles per hour
q: A recipe uses 3 cups of flour for 2 batches. How many cups for 7 batches? | *10.5 | 9 | 14 | 21
why: 3/2 = x/7, so x = 10.5.
q: A price rises from $40 to $50. What is the percent increase? | *25% | 20% | 10% | 50%
why: (50 − 40)/40 = 0.25.
gen: proportion, percentOf, percentChange

@lesson Statistics and data
say: Data questions ask you to read graphs and reason about center and spread. Careful reading wins these.
- Mean (average), median (middle value), mode (most common), range (max − min).
- Standard deviation measures spread: more spread out data has a larger standard deviation.
key: Outliers pull the mean toward them but barely affect the median. Adding an extreme value changes the mean and standard deviation the most.
Scatterplots and lines of best fit: the slope of the line is the predicted change in y per unit x. Use the line to predict, but be cautious extrapolating far outside the data.
Sampling: results can be generalized only to the population that was randomly sampled. A random sample avoids bias; larger samples give smaller margins of error. Only randomly assigned experiments can show cause and effect.
ex: A survey of 200 randomly chosen students at one school finds 60% prefer later start times. To whom can this be generalized?
> The sample was random from that school
= All students at that school (not all students nationwide)
term: standard deviation = a measure of how spread out data values are from the mean
term: margin of error = the likely range of difference between a sample result and the true population value
term: random sample = a sample where every member of the population has an equal chance of being chosen
q: Removing a very high outlier from a data set will… | *decrease the mean more than the median | increase the mean | not change the mean | increase the median a lot
why: The mean is sensitive to extreme values.
q: Which conclusion can a randomized experiment support? | *Cause and effect | Only correlation | Nothing | Generalization to all people everywhere
why: Random assignment controls for other variables.
gen: median, meanFind

@lesson Probability and two-way tables
say: Probability questions on the SAT usually come with a table. The key is reading the right row or column.
key: Probability = favorable outcomes ÷ total outcomes. In a two-way table, the "given" condition tells you which row or column is your total.
ex: In a survey, 40 of 100 students play a sport, and 15 of those 40 also play an instrument. If a sport player is chosen at random, what is the probability they play an instrument?
> "Given they play a sport" means the total is 40, not 100
> 15/40
= 0.375
- P(A or B) = P(A) + P(B) − P(A and B).
- Expected value = sum of each outcome × its probability.
tip: Underline the words "given," "of those" or "among" in the question. They tell you the denominator.
term: two-way table = a table showing counts for two categorical variables
term: conditional probability = the probability of an event given another event occurred
term: expected value = the long-run average outcome of a random process
q: 30 of 120 people prefer tea. What's the probability a random person prefers tea? | *0.25 | 0.3 | 0.4 | 0.12
why: 30/120 = 1/4.
q: Among 50 juniors, 20 take chemistry. A junior is chosen. P(takes chemistry)? | *0.4 | 0.2 | 0.5 | 0.25
why: 20/50 = 0.4.
gen: stem.indep

@unit Geometry and Trigonometry | Area and volume, lines, angles and triangles, right triangles and trig, circles
@lesson Area, volume, lines and angles
say: Geometry is a smaller part of the SAT, but the reference sheet and a few key facts make it very doable.
The reference sheet gives formulas for area (rectangle, triangle, circle), volume (prism, cylinder, sphere, cone, pyramid), and special right triangles. Know how to use them, especially when a question gives volume and asks for a dimension.
key: Angles: a straight line is 180°, a triangle's angles sum to 180°, and vertical angles are equal. Parallel lines cut by a transversal make equal corresponding and alternate interior angles.
ex: A cylinder has volume 72π and radius 3. Find its height.
> V = πr²h, so 72π = π(9)h
= h = 8
Similar triangles have proportional sides. If two triangles share angles (AA), set up a proportion.
term: volume = the space inside a 3D figure
term: vertical angles = opposite angles formed by intersecting lines; always equal
term: similar triangles = triangles with equal angles and proportional sides
q: Two angles of a triangle are 47° and 68°. The third is… | *65° | 75° | 115° | 45°
why: 180 − 47 − 68 = 65.
q: A cube has volume 64. What is its surface area? | *96 | 64 | 16 | 384
why: Edge 4; 6 × 16 = 96.
gen: angles, area, geo.volume

@lesson Right triangles and trigonometry
say: Right triangle questions combine the Pythagorean theorem, special triangles and SOH-CAH-TOA.
Pythagorean theorem: a² + b² = c². Know common triples: 3-4-5, 5-12-13, 8-15-17 (and multiples).
Special right triangles: 45-45-90 sides x, x, x√2; 30-60-90 sides x, x√3, 2x.
key: SOH-CAH-TOA, and the SAT favorite: sin(x) = cos(90° − x). Complementary angles swap sine and cosine.
ex: In a right triangle, sin A = 5/13. What is cos B, where B is the other acute angle?
> A and B are complementary
> cos B = sin A
= 5/13
Radians: 180° = π radians. Multiply degrees by π/180 to convert.
term: SOH-CAH-TOA = sine = opposite/hypotenuse, cosine = adjacent/hypotenuse, tangent = opposite/adjacent
term: complementary angles = angles that add to 90°; sin of one equals cos of the other
term: radian = a unit of angle measure; π radians = 180°
q: sin(32°) equals… | *cos(58°) | cos(32°) | sin(58°) | tan(58°)
why: sin x = cos(90° − x).
q: A right triangle has legs 9 and 12. The hypotenuse is… | *15 | 21 | 13 | 18
why: 3-4-5 triple times 3.
gen: pyth, geo.trigRatio, geo.specialRight

@lesson Circles
say: Circle questions test equations, arcs and angles. Completing the square is the big skill here.
Circumference C = 2πr; area A = πr². An arc's length or a sector's area is a fraction (angle ÷ 360°) of the whole.
key: The equation of a circle is (x − h)² + (y − k)² = r², with center (h, k) and radius r.
ex: Find the center and radius of x² + y² − 6x + 4y = 12
> Group and complete the square: (x² − 6x + 9) + (y² + 4y + 4) = 12 + 9 + 4
> (x − 3)² + (y + 2)² = 25
= center (3, −2), radius 5
A tangent line is perpendicular to the radius at the point of tangency. A central angle equals its arc; an inscribed angle is half its arc.
term: equation of a circle = (x − h)² + (y − k)² = r²
term: sector = a region of a circle bounded by two radii and an arc
term: tangent = a line touching a circle at exactly one point, perpendicular to the radius there
q: What is the radius of (x + 1)² + (y − 7)² = 36? | *6 | 36 | 18 | 7
why: r² = 36.
q: A circle has radius 10. What is the length of a 90° arc? | *5π | 10π | 20π | 25π
why: (90/360) × 20π = 5π.
gen: geo.circleEq, geo.arcSector
`;
