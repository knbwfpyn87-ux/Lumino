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
demo: Pacing a module
aim: Each SAT Math module gives you 35 minutes for 22 questions. Plan your pace.
set: k = 11 | Questions answered | 0 to 22 by 1
set: s = 85 | Seconds per question | 30 to 150 by 5
out: used = k*s/60 | Minutes used
out: left = 35 - k*s/60 | Minutes left
out: perq = if(k < 22, (35 - k*s/60)/(22 - k), 0) | Minutes left per remaining question
plot: k, left
step: What pace leaves 5 minutes to check your work at the end?
result: 35 minutes ÷ 22 questions is about 95 seconds each. Moving at about 80 seconds on easier questions banks time for the harder ones near the end of the module.
term: plugging in answers = testing each answer choice in the problem to find the one that works
term: picking numbers = substituting easy numbers for variables to test expressions
q: You've spent 3 minutes on a question. Best move? | *Guess, mark it for review and move on | Keep working until solved | Skip it with no answer | Restart the module
why: Unanswered questions get no credit and time is limited.
q: A question asks for 2y. You solve and find y = 6. What do you enter? | *12 | 6 | 3 | 2
why: Always answer the exact question asked.

@lesson Desmos basics: finding your way around
say: Desmos is the most powerful tool on the Digital SAT, and it's built right into the test. Let's learn to drive it fast.
key: The Desmos graphing calculator is built into Bluebook for every Math question in both modules. Anything you type on a line in the expression list is graphed or calculated instantly.
## The screen
- The expression list on the left: each line is one equation, function or calculation.
- The graph on the right: drag to move, pinch or use + and − to zoom, and the home button to reset the view.
- Click a curve to show gray points for its intercepts, maximums, minimums and intersections. Click a gray point to see its exact coordinates.
## Typing math
- Exponents: ^ (x^2). Square roots: type sqrt. Absolute value: | | or abs. Pi: type pi.
- Fractions: / makes a stacked fraction. Multiplication: * or just a space (2x works).
- Arithmetic works on any line: type 0.15*80 and the answer appears.
- Graph with x and y. If a question uses another letter, like t or n, rewrite it with x.
code:
| y = x^2 - 4x + 3
| y = sqrt(x + 5)
| 0.15*80
tip: Trig questions use degrees, but a calculator may be set to radians. Open the settings (the wrench icon) and check the angle mode before you calculate sin, cos or tan.
oops: Desmos shows decimals. If the answer choices are fractions, convert yours (or compare decimals) before you choose.
term: expression list = the column on the left where you type equations and calculations in Desmos
term: point of interest = a gray dot Desmos shows on a curve, such as an intercept, maximum or intersection
term: angle mode = the radians or degrees setting that controls trig calculations
q: You need to evaluate 37% of 260 quickly. What should you type in Desmos? | *0.37*260 | 37%260 | y = 37x + 260 | 260/37
why: Any line can do arithmetic: 0.37 × 260 = 96.2.
q: How do you see the exact coordinates of a graph's x-intercept? | *Click the curve, then click its gray point on the x-axis | Zoom in until it looks exact | Type x = 0 | Use the table feature only
why: Desmos marks points of interest with gray dots and shows their exact coordinates.
gen: percentOf, exponent

@lesson Solving equations and systems with Desmos
say: Most SAT equations can be solved by graphing. Let's turn algebra into "find where the graphs meet."
key: To solve an equation, graph each side as its own line, y = left side and y = right side, then click the intersection. Its x-coordinate is the solution.
The intersection method works for any equation, even ones that are hard to solve by hand (radicals, absolute values, exponentials).
A second method: graph y = (left side) − (right side) and find where it crosses the x-axis.
## Systems of equations
Type both equations exactly as given (Desmos accepts forms like 3x + 2y = 12). The intersection point (x, y) is the solution.
- Lines cross once: one solution.
- Parallel lines: no solution.
- The same line: infinitely many solutions.
## Inequalities
Type inequalities directly, such as y > 2x − 1. Desmos shades the solution region; for a system, the solution is where the shadings overlap. A point is a solution if it lies in that overlap (on a dashed boundary line doesn't count).
code:
| y = 3(x + 2)
| y = 2x + 11
ex: Solve 3(x + 2) = 2x + 11 with Desmos, then find x + 4.
> Type y = 3(x + 2) and y = 2x + 11
> Click the intersection: (5, 21), so x = 5
= x + 4 = 9 (always answer the question that's asked)
demo: Graph both sides
aim: Desmos solves 3(x + 2) = 2x + 11 by graphing y = left − right and finding where it equals zero. Move x to search.
set: x = 1 | x | -5 to 10 by 0.5
out: L = 3*(x + 2) | Left side
out: Rr = 2*x + 11 | Right side
out: d = L - Rr | Left − right
plot: x, d
step: Find the x where left − right equals 0. That's the solution.
result: The difference crosses zero at x = 5, the only solution. In Desmos you'd simply click that zero (or the intersection of the two sides), which takes seconds and avoids sign mistakes.
term: intersection = a point where two graphs meet; its coordinates satisfy both equations
term: system of equations = two or more equations solved together
term: boundary line = the edge of an inequality's shaded region; dashed if not included
q: In Desmos, two lines in a system appear parallel. How many solutions does the system have? | *None | One | Two | Infinitely many
why: Parallel lines never meet.
q: To solve √(x + 7) = x − 5 with Desmos, you should… | *graph y = √(x + 7) and y = x − 5 and find the intersection | square both sides first | type x = 5 | graph only y = √(x + 7)
why: Each side is graphed separately; the intersection's x-value solves the equation (here x = 9).
gen: linear, system2

@lesson Quadratics, functions and sliders in Desmos
say: Quadratics and functions are where Desmos saves the most time, and sliders crack the hardest questions.
key: Graph a quadratic and click it: Desmos shows the vertex (maximum or minimum), the x-intercepts (zeros) and the y-intercept. No factoring or quadratic formula needed.
## Functions
Define a function on one line, like f(x) = 2x^2 − 3x, then type f(4) on another line to evaluate it. You can also graph f(x − 2) + 1 to see transformations.
## Sliders for unknown constants
When a question has an unknown constant (k, a, c…), type it into the equation. Desmos offers to "add slider." Drag the slider until the graph does what the question describes, such as touching the x-axis once or becoming parallel to another line.
code:
| f(x) = x^2 - 6x + 5
| f(4)
| y = x^2 - 6x + c
demo: Slide to find c
aim: For what value of c does x² − 6x + c = 0 have exactly one real solution? Slide c like a Desmos slider.
set: c = 5 | c | 0 to 15 by 0.5
out: D = 36 - 4*c | Discriminant b² − 4ac
out: n = (D > 1e-9)*2 + (abs(D) < 1e-9)*1 | Number of real solutions
out: vy = c - 9 | Vertex y-coordinate
plot: c, n
step: Watch where the vertex sits as you slide. When does the parabola just touch the x-axis?
result: Exactly one solution happens at c = 9, when the vertex sits on the x-axis (the discriminant is 0). Below 9 there are two solutions, above 9 none. In Desmos, slide c until the vertex touches the axis.
term: vertex = the maximum or minimum point of a parabola
term: zero = an x-value where a function equals 0 (an x-intercept)
term: slider = a Desmos control for an unknown constant that you drag to change the graph
q: A question asks for the minimum value of f(x) = x² − 8x + 20. What do you click in Desmos? | *The vertex, whose y-coordinate is the minimum (4) | The y-intercept | The x-intercepts | Nothing; Desmos can't do this
why: The vertex (4, 4) is the lowest point, so the minimum value is 4.
q: For what value of k do y = 2x + 3 and y = kx − 1 have no solution? Using a slider for k, you look for… | *the k that makes the lines parallel (k = 2) | the k where they cross at the origin | k = 0 | k = −1
why: Parallel lines (same slope, different intercepts) never meet.
gen: quadRoots, funcEval

@lesson Statistics, tables and regression in Desmos
say: Data questions get faster with lists and tables. Desmos can compute statistics and lines of best fit in seconds.
key: Type a list in square brackets, then use statistics functions on it: mean, median, stdev and more. For a model, enter data in a table and use the ~ symbol to fit a regression.
## Lists and statistics
- Name a list: L = [12, 15, 15, 18, 40]
- mean(L), median(L), stdev(L) (sample standard deviation), total(L) (the sum) and length(L) (how many values)
- Change one value to see how the mean and median react to an outlier.
## Tables and regression
Add a table (the + button), enter x₁ and y₁ values, then type y₁ ~ mx₁ + b for a linear fit. Desmos reports m, b and r². Use y₁ ~ ax₁^2 + bx₁ + c for a quadratic fit or y₁ ~ ab^x₁ for an exponential fit.
code:
| L = [12, 15, 15, 18, 40]
| mean(L)
| median(L)
| y_1 ~ m x_1 + b
tip: You rarely need a regression on the SAT, but lists are great for mean and median questions: typing beats adding by hand.
term: list = an ordered set of numbers in square brackets in Desmos
term: regression = fitting a model to data; in Desmos you use ~
term: r² = a value from 0 to 1 showing how well a model fits the data
q: For the data 4, 7, 7, 9, 23, which Desmos line gives the median? | *median([4, 7, 7, 9, 23]) | mean([4, 7, 7, 9, 23]) | stdev([4, 7, 7, 9, 23]) | y ~ mx + b
why: median() returns the middle value, 7.
q: In a Desmos regression, the ~ symbol means… | *"fit this model to the data" | "approximately equal for graphing only" | "not equal" | "plot the residuals only"
why: ~ tells Desmos to find the best values for the parameters.
gen: meanFind, median

@lesson Desmos strategy: when to use it and when not to
say: Desmos is fast, but only if you know when to reach for it. Let's build the judgment top scorers have.
key: Use Desmos when a graph answers the question: intersections, zeros, maximums, number of solutions, inequalities and checking answers. Use quick algebra or mental math when the problem is a one-step calculation or the question is about structure.
## Great Desmos moves
- Solve any equation or system by graphing.
- Check equivalent expressions: graph y = (expression) and each answer choice. The one whose graph lies exactly on top is equivalent.
- Check a multiple-choice answer by plugging it in on a new line.
- Find how many solutions an equation has by counting intersections.
## When to skip it
- One-step arithmetic you can do in your head.
- Questions about meaning, like "what does the 15 represent in this model?"
- Very large or tiny numbers that are hard to see on the graph (calculate instead).
ex: Which expression is equivalent to (x + 3)² − 9? Choices: x² + 6x, x² + 9, x² − 6x, x² + 6x + 9.
> Graph y = (x + 3)^2 − 9
> Graph each choice; only y = x^2 + 6x lands exactly on top
= x² + 6x
oops: Watch for answers that need a specific form. Desmos finds x = 0.4, but the choices may show 2/5.
term: equivalent expressions = expressions that are equal for every value of the variable
term: plugging in = substituting a value or answer choice to check it
q: The fastest way to check which choice is equivalent to 4(x − 2) + 3x is… | *graph each choice with the original and see which overlaps exactly | solve for x | find the y-intercept only | count the terms
why: Equivalent expressions have identical graphs.
q: "In the model C = 15h + 40, what does 15 represent?" Should you use Desmos? | *No, it's a question about meaning: 15 is the cost per hour | Yes, graph it and click the vertex | Yes, use a regression | Yes, find the intersection with y = 15
why: Interpretation questions need reasoning about the context, not graphing.

@lesson Student-produced responses: entering your answer
say: About a quarter of SAT Math questions have no answer choices. You type the answer, and small entry mistakes cost real points.
key: For student-produced response questions, you type your answer into a box. Follow the entry rules exactly; Bluebook shows a preview of how your answer will be read.
## The entry rules
- You can enter up to 5 characters for a positive answer and up to 6 (including the minus sign) for a negative answer.
- Fractions and decimals are both fine: 2/3, .6666 and .6667 are all accepted.
- If a decimal is too long, round or cut it off so it fills all the space, but don't shorten it more than that (0.67 would be marked wrong for 2/3).
- Write mixed numbers as improper fractions or decimals: 3½ is 7/2 or 3.5, never 3 1/2.
- Don't type symbols such as %, $ or commas.
- If more than one answer is correct, enter just one.
ex: Your answer is 5/12. How could you enter it?
> 5/12 fits in 4 characters
> As a decimal, 0.41666… → .4166 or .4167
= 5/12, .4166 or .4167
tip: When Desmos gives a long decimal like 1.33333, enter the exact fraction (4/3) instead. It's shorter and always accepted.
demo: Rounding to fill the box
aim: An answer of 2/3 = 0.6666… is entered with d decimal places. Fewer places means a bigger error. The SAT accepts .6666 or .6667 (4 decimal places).
set: d = 2 | Decimal places entered | 1 to 4 by 1
out: v = round(2/3*10^d)/10^d | Rounded entry
out: err = abs(v - 2/3) | Error from 2/3
plot: d, err
step: Which number of decimal places is enough to be accepted?
result: Rounding to fill the box (4 decimal places for a positive number under 1) keeps the error tiny. Shorter entries like 0.67 lose accuracy and are marked wrong.
term: student-produced response = an SAT question where you type your own answer instead of choosing
term: improper fraction = a fraction whose numerator is larger than its denominator, like 7/2
q: The answer is 3½. Which entry is acceptable? | *7/2 | 3 1/2 | 3½ | 3-1/2
why: Mixed numbers must be entered as improper fractions or decimals.
q: The answer is 2/3. Which entry would be marked wrong? | *0.67 | 2/3 | .6667 | .6666
why: 0.67 doesn't fill the available space, so it's less accurate than the accepted entries.

@lesson The reference sheet and test day
say: The last few points come from preparation outside the math: the reference sheet, practice tests and a calm test day.
key: Bluebook gives you a reference sheet with area and volume formulas, the Pythagorean theorem and special right triangles. Know what's on it so you only open it when needed, and memorize what's not (like slope, the quadratic formula and circle equations).
## Before the test
- Take the full-length practice tests in the Bluebook app. They use the same adaptive format, tools and Desmos as the real test.
- Practice with Desmos until the common moves (intersections, vertex, sliders) take seconds.
## Test day
- Bring your charged device with Bluebook installed, your admission ticket and an acceptable photo ID, plus a pencil or pen. Scratch paper is provided.
- Reading and Writing comes first (2 modules), then a 10-minute break, then Math (2 modules), about 2 hours 14 minutes in total.
- Within a module you can move back and forth and use Mark for Review, but you can't return to a module once it ends.
## Scores
The total score is 400 to 1600. Many colleges superscore: they take your best section scores across test dates.
demo: Superscore calculator
aim: You took the SAT twice. A college that superscores combines your best Reading and Writing and best Math scores.
set: rw1 = 620 | Test 1 Reading and Writing | 200 to 800 by 10
set: m1 = 580 | Test 1 Math | 200 to 800 by 10
set: rw2 = 590 | Test 2 Reading and Writing | 200 to 800 by 10
set: m2 = 650 | Test 2 Math | 200 to 800 by 10
out: t1 = rw1 + m1 | Test 1 total
out: t2 = rw2 + m2 | Test 2 total
out: sup = max(rw1, rw2) + max(m1, m2) | Superscore
plot: m2, sup
step: Compare the superscore with each single test total.
result: The superscore (here 620 + 650 = 1270) can beat either single test. Check each college's policy: some superscore, some want all scores, and Score Choice lets you pick which dates to send to many schools.
term: reference sheet = the formula sheet available during SAT Math
term: superscore = combining your highest section scores from different test dates
term: Bluebook = the College Board app used to take the Digital SAT and its practice tests
q: Which of these is on the SAT reference sheet? | *The volume of a cylinder | The quadratic formula | Slope formula | The equation of a circle
why: The sheet covers area, volume and right-triangle facts; you must memorize the others.
q: What happens when a Math module's time runs out? | *It ends and you can't go back to it | You get 5 extra minutes | You can return during the break | The module restarts
why: You can move freely within a module, but once it ends you can't return.

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
demo: Temperature conversion line
aim: Fahrenheit and Celsius are related by the linear function F = 1.8C + 32.
set: C = 20 | Temperature (°C) | -40 to 100 by 1
out: F = 1.8*C + 32 | Temperature (°F)
plot: C, F
step: Interpret the slope and the y-intercept. Where are the two scales equal?
result: The slope 1.8 means each 1 °C rise is a 1.8 °F rise; the intercept 32 is the freezing point. Solving C = 1.8C + 32 gives −40, where both scales read the same.
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
demo: A growing town
aim: A town of 12,000 people grows by a fixed percentage each year. Model it as P = 12,000(1 + r)ᵗ.
set: t = 10 | Years | 0 to 40 by 1
set: r = 3 | Growth rate (% per year) | 0.5 to 8 by 0.5
out: P = 12000*(1 + r/100)^t | Population
plot: t, P
step: Compare linear growth (adding 360 people a year) with 3% growth after 40 years.
result: Exponential growth multiplies by the same factor (1.03) each year, so it eventually beats any linear growth. SAT questions often ask you to read the initial value and growth factor from the equation.
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
demo: Cost of a road trip
aim: Plan the fuel cost of a 300-mile trip from your car's gas mileage and the price of gas.
set: mpg = 30 | Gas mileage (miles per gallon) | 10 to 60 by 1
set: p = 3.5 | Gas price ($ per gallon) | 2 to 6 by 0.1
out: gal = 300/mpg | Gallons used
out: cost = gal*p | Fuel cost ($)
plot: mpg, cost
step: Set up the units: miles ÷ (miles/gallon) × (dollars/gallon) = dollars.
result: Units cancel to give dollars: 300 ÷ 30 × $3.50 = $35. Cost is inversely proportional to gas mileage, so improving from 20 to 40 mpg halves the cost.
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
demo: Will the truck fit through the tunnel?
aim: A tunnel's cross-section is a semicircle. How tall is the opening at a distance x from the center?
set: x = 3 | Distance from the center (m) | 0 to 5 by 0.1
set: r = 6 | Tunnel radius (m) | 5 to 8 by 0.5
out: y = sqrt(r^2 - x^2) | Height of the tunnel there (m)
plot: x, y
step: A truck is 4 m wide and 4.5 m tall, driving in the middle. Check the height at x = 2.
result: The circle x² + y² = r² gives y = √(r² − x²). With r = 6, at x = 2 the clearance is 5.66 m, so the 4.5 m truck fits; near the walls the height drops quickly.
term: equation of a circle = (x − h)² + (y − k)² = r²
term: sector = a region of a circle bounded by two radii and an arc
term: tangent = a line touching a circle at exactly one point, perpendicular to the radius there
q: What is the radius of (x + 1)² + (y − 7)² = 36? | *6 | 36 | 18 | 7
why: r² = 36.
q: A circle has radius 10. What is the length of a 90° arc? | *5π | 10π | 20π | 25π
why: (90/360) × 20π = 5π.
gen: geo.circleEq, geo.arcSector
`;
