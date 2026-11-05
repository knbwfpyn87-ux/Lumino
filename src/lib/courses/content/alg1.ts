export default String.raw`
@course alg1 | Algebra I | Standard | ➗ | Math

@unit Expressions & Real Numbers | Order of operations, properties, like terms and evaluating expressions
@lesson Order of operations
say: Math has a rule for what to do first, so everyone gets the same answer. Let's learn it!
key: Parentheses, Exponents, Multiplication and Division (left to right), Addition and Subtraction (left to right). Many people remember it as PEMDAS.
Without a rule, 3 + 4 × 2 could be 14 or 11. The order of operations says multiplication comes before addition, so the answer is 11.
- Multiplication and division are a team: do whichever comes first, left to right.
- Addition and subtraction are also a team, done left to right.
- Grouping symbols include parentheses ( ), brackets [ ], fraction bars, and absolute value bars.
ex: Evaluate 18 − 2 × (1 + 3)²
> Parentheses first: 1 + 3 = 4
> Exponent: 4² = 16
> Multiply: 2 × 16 = 32
> Subtract: 18 − 32 = −14
= −14
oops: PEMDAS does not mean multiplication always beats division. For 12 ÷ 3 × 2, go left to right: 4 × 2 = 8, not 12 ÷ 6 = 2.
term: order of operations = the agreed order for evaluating an expression: grouping, exponents, multiply/divide, add/subtract
term: grouping symbols = parentheses, brackets, fraction bars and absolute value bars; evaluate inside them first
q: What is 10 − 4 ÷ 2? | *8 | 3 | 6 | 2
why: Divide first: 4 ÷ 2 = 2. Then 10 − 2 = 8.
q: What is (3 + 5)² ÷ 4? | *16 | 64 | 8.5 | 4
why: Parentheses: 8. Exponent: 64. Then 64 ÷ 4 = 16.
q: What is 20 ÷ 5 × 2? | *8 | 2 | 10 | 40
why: Division and multiplication go left to right: 20 ÷ 5 = 4, then 4 × 2 = 8.
gen: alg.orderOps

@lesson Properties of real numbers
say: Properties are shortcuts that are always true. They let you rearrange and simplify with confidence.
Real numbers include every number on the number line: whole numbers, negatives, fractions, decimals, and irrational numbers like √2 and π.
## The properties you'll use every day
- Commutative: order doesn't matter for adding or multiplying. 3 + 7 = 7 + 3.
- Associative: grouping doesn't matter for adding or multiplying. (2 + 5) + 1 = 2 + (5 + 1).
- Distributive: a(b + c) = ab + ac. Multiply the outside number by every term inside.
- Identity: adding 0 or multiplying by 1 leaves a number unchanged.
- Inverse: a + (−a) = 0 and a × (1/a) = 1.
ex: Use the distributive property to find 7 × 103 in your head
> Write 103 as 100 + 3
> 7 × 100 + 7 × 3
> 700 + 21
= 721
oops: Subtraction and division are NOT commutative. 8 − 3 is 5, but 3 − 8 is −5.
term: commutative property = changing the order of numbers being added or multiplied does not change the result
term: associative property = changing the grouping of numbers being added or multiplied does not change the result
term: distributive property = a(b + c) = ab + ac
term: rational number = a number that can be written as a fraction of two integers
term: irrational number = a number that cannot be written as a fraction, like √2 or π
q: Which property is shown by 4(x + 2) = 4x + 8? | *Distributive | Commutative | Associative | Identity
why: The 4 is multiplied by each term inside the parentheses.
q: Which number is irrational? | *√5 | 0.75 | −3 | 2/9
why: √5 cannot be written as a fraction of integers. The others can (0.75 = 3/4, −3 = −3/1).
q: Which is an example of the commutative property? | *6 × 9 = 9 × 6 | 6 − 9 = 9 − 6 | 6(9 + 1) = 54 + 6 | 6 + 0 = 6
why: Swapping the order of a product keeps it the same. Subtraction is not commutative.
gen: alg.distribute

@lesson Simplifying and evaluating expressions
say: An expression is like a recipe with letters. Let's clean it up and then plug in numbers.
Terms are the pieces separated by + and − signs. Like terms have exactly the same variable part, such as 3x and −5x, or 2y² and 7y². Only like terms can be combined.
ex: Simplify 4x + 7 − x + 2
> Group like terms: (4x − x) + (7 + 2)
> Combine: 3x + 9
= 3x + 9
To evaluate an expression, replace each variable with its value, then follow the order of operations. Put negative values in parentheses so the signs stay correct.
ex: Evaluate 2x² − 3x when x = −4
> Substitute: 2(−4)² − 3(−4)
> Exponent: 2(16) − 3(−4)
> Multiply: 32 + 12
= 44
oops: (−4)² is 16, but −4² means −(4²) = −16. Parentheses matter!
demo: Taxi fare
aim: A taxi charges $3 to start plus $2.50 per mile, and you add a tip. Evaluate 3 + 2.5m for your ride, then add the tip.
set: m = 4 | Miles | 0 to 30 by 0.5
set: t = 15 | Tip (%) | 0 to 25 by 5
out: fare = 3 + 2.5*m | Fare ($)
out: total = fare*(1 + t/100) | Total with tip ($)
plot: m, total
step: Change the miles and watch which part of the expression changes.
result: Substituting values into an expression gives the cost of any ride. The $3 is the constant term and $2.50 is the coefficient of m, the cost per mile.
term: term = a number, a variable, or a product of them, separated from others by + or −
term: like terms = terms with the same variables raised to the same powers
term: coefficient = the number multiplying a variable, like 5 in 5x
term: constant = a term with no variable
q: Simplify 5a + 3b − 2a + b | *3a + 4b | 7ab | 3a + 3b | 8a + 2b
why: 5a − 2a = 3a and 3b + b = 4b.
q: Evaluate 3x − 7 when x = −2 | *−13 | −1 | 13 | 1
why: 3(−2) − 7 = −6 − 7 = −13.
q: Which pair are like terms? | *4x² and −9x² | 4x and 4x² | 3xy and 3x | 7 and 7y
why: Same variable (x) raised to the same power (2).
gen: alg.likeTerms, alg.evalExpr

@unit Solving Linear Equations | One-step to multi-step equations, variables on both sides, literal equations and word problems
@lesson One-step and two-step equations
say: Solving an equation is like balancing a scale. Whatever you do to one side, you do to the other.
An equation says two expressions are equal. To solve it, get the variable alone by undoing operations with inverse operations: addition undoes subtraction, and multiplication undoes division.
key: Undo operations in reverse order: first undo adding or subtracting, then undo multiplying or dividing.
ex: Solve 3x − 5 = 16
> Add 5 to both sides: 3x = 21
> Divide both sides by 3: x = 7
> Check: 3(7) − 5 = 21 − 5 = 16 ✓
= x = 7
tip: Always check your answer by plugging it back into the original equation.
term: equation = a statement that two expressions are equal
term: inverse operations = operations that undo each other, like adding and subtracting
term: solution = a value of the variable that makes the equation true
q: Solve x/4 + 3 = 10 | *x = 28 | x = 7/4 | x = 52 | x = 1.75
why: Subtract 3: x/4 = 7. Multiply by 4: x = 28.
q: Solve −2x = 18 | *x = −9 | x = 9 | x = 16 | x = −36
why: Divide both sides by −2.
q: What should you do first to solve 5x + 8 = 43? | *Subtract 8 from both sides | Divide both sides by 5 | Add 8 to both sides | Multiply by 5
why: Undo the addition first, then the multiplication.
gen: linear

@lesson Multi-step equations and variables on both sides
say: Bigger equations just take a few more steps. Simplify each side, then collect the x's on one side.
Steps for any linear equation:
- Distribute to clear parentheses.
- Combine like terms on each side.
- Move variable terms to one side and constants to the other.
- Divide by the coefficient.
ex: Solve 4(x − 2) = 2x + 6
> Distribute: 4x − 8 = 2x + 6
> Subtract 2x from both sides: 2x − 8 = 6
> Add 8: 2x = 14
> Divide by 2: x = 7
= x = 7
Some equations have no solution or infinitely many. If the variables cancel and you get something false like 3 = 7, there is no solution. If you get something always true like 5 = 5, every number is a solution.
oops: When distributing a negative, change the sign of every term: −3(x − 4) = −3x + 12, not −3x − 12.
term: no solution = an equation that simplifies to a false statement, like 0 = 4
term: identity = an equation true for every value of the variable, like 2x + 2 = 2(x + 1)
q: Solve 5x + 3 = 2x + 18 | *x = 5 | x = 3 | x = 21/7 | x = 7
why: Subtract 2x: 3x + 3 = 18. Subtract 3: 3x = 15. Divide: x = 5.
q: How many solutions does 2(x + 3) = 2x + 6 have? | *Infinitely many | None | Exactly one | Two
why: Both sides simplify to 2x + 6, which is always true.
q: Solve −2(x − 5) = 4 | *x = 3 | x = −3 | x = 7 | x = 4.5
why: −2x + 10 = 4, so −2x = −6 and x = 3.
gen: linear

@lesson Literal equations and word problems
say: Algebra really shines when you turn a story into an equation. Let's practice translating.
A literal equation has several letters, like the formula d = rt. You solve it for one letter using the same steps as always.
ex: Solve P = 2L + 2W for W
> Subtract 2L: P − 2L = 2W
> Divide by 2: W = (P − 2L)/2
= W = (P − 2L) ÷ 2
## Translating words into math
- "more than" or "increased by" means add; "less than" means subtract (careful: "5 less than x" is x − 5).
- "of" often means multiply; "per" means divide.
- "is" usually means equals.
ex: A gym charges $25 to join plus $15 per month. After how many months will you have paid $130?
> Let m = number of months
> 25 + 15m = 130
> 15m = 105, so m = 7
= 7 months
demo: Saving for a bike
aim: You want a $300 bike and already have $60. How many weeks will it take to save the rest?
set: w = 20 | Saved per week ($) | 5 to 60 by 5
set: g = 300 | Bike price ($) | 100 to 600 by 10
out: weeks = (g - 60)/w | Weeks needed
plot: w, weeks
step: Write and solve the equation 60 + 20w = 300.
result: Solve 60 + rx = goal for x: weeks = (goal − 60) ÷ rate. Doubling what you save each week halves the time.
term: literal equation = an equation with two or more variables, such as a formula
term: variable = a letter that stands for an unknown or changing quantity
q: Solve A = bh for h | *h = A/b | h = Ab | h = A − b | h = b/A
why: Divide both sides by b.
q: Which equation means "7 less than twice a number is 15"? | *2n − 7 = 15 | 7 − 2n = 15 | 2(n − 7) = 15 | 2n + 7 = 15
why: Twice a number is 2n; 7 less than that is 2n − 7.
q: A taxi costs $3 plus $2 per mile. A ride costs $19. How many miles? | *8 | 11 | 9.5 | 6
why: 3 + 2m = 19, so 2m = 16 and m = 8.
gen: linear, proportion

@unit Inequalities & Absolute Value | Solving and graphing inequalities, compound inequalities, absolute value equations
@lesson Solving and graphing inequalities
say: Inequalities are like equations, but the answer is a whole range of numbers. There's one twist to remember!
Inequality symbols: < less than, > greater than, ≤ less than or equal to, ≥ greater than or equal to. Solve them just like equations.
key: If you multiply or divide both sides by a negative number, flip the inequality sign.
ex: Solve −3x + 4 > 19
> Subtract 4: −3x > 15
> Divide by −3 and flip: x < −5
= x < −5
On a number line, use an open circle for < or > (the endpoint is not included) and a closed circle for ≤ or ≥ (it is included). Shade the side that works.
tip: Test a number from your answer in the original inequality. For x < −5, try x = −6: −3(−6) + 4 = 22, and 22 > 19 ✓.
demo: Concert budget
aim: You have a budget for a concert: a $15 ticket fee plus $8 per snack. How many snacks can you buy?
set: b = 50 | Budget ($) | 15 to 100 by 1
out: max = floor((b - 15)/8) | Most snacks you can buy
out: left = b - 15 - 8*max | Money left ($)
plot: b, max
step: Solve 15 + 8s ≤ 50. Why must the answer be rounded down?
result: The inequality 15 + 8s ≤ b gives s ≤ (b − 15)/8. Because you can't buy part of a snack, you round down to a whole number, which makes the graph a staircase.
term: inequality = a statement that compares two expressions using <, >, ≤ or ≥
term: open circle = shows an endpoint that is not included on a number line graph
term: closed circle = shows an endpoint that is included on a number line graph
q: Solve 2x − 1 ≤ 9 | *x ≤ 5 | x ≥ 5 | x ≤ 4 | x < 5
why: Add 1: 2x ≤ 10. Divide by 2 (positive, no flip): x ≤ 5.
q: Solve −4x < 12 | *x > −3 | x < −3 | x > 3 | x < 3
why: Dividing by −4 flips the sign.
q: Which graph shows x ≥ 2? | *Closed circle at 2, shaded right | Open circle at 2, shaded right | Closed circle at 2, shaded left | Open circle at 2, shaded left
why: ≥ includes 2 (closed) and means greater (right).
gen: inequality

@lesson Compound inequalities
say: Sometimes a number has to follow two rules at once, or either of two rules. That's a compound inequality.
An AND inequality means both must be true; the answer is between two numbers, like −2 < x ≤ 5. An OR inequality means at least one is true; the answer goes outward, like x < 1 or x > 6.
ex: Solve −1 < 2x + 3 < 11
> Subtract 3 from all three parts: −4 < 2x < 8
> Divide all parts by 2: −2 < x < 4
= −2 < x < 4
tip: With a "sandwich" inequality, do the same thing to all three parts at once.
term: compound inequality = two inequalities joined by "and" or "or"
term: intersection = the values that make both parts of an "and" inequality true
q: Solve 3 ≤ x + 5 < 9 | *−2 ≤ x < 4 | 8 ≤ x < 14 | −2 < x ≤ 4 | 3 ≤ x < 9
why: Subtract 5 from every part.
q: Which describes "x < 1 or x > 6"? | *Two rays pointing away from each other | A segment between 1 and 6 | No solution | Only the numbers 1 and 6
why: OR inequalities with outward arrows cover everything except the middle.
gen: inequality

@lesson Absolute value equations
say: Absolute value measures distance from zero, and distance is never negative. That gives us two cases to solve.
|x| is the distance from x to 0, so |5| = 5 and |−5| = 5. The equation |x| = 5 has two solutions: 5 and −5.
key: To solve |expression| = k (with k ≥ 0), solve expression = k AND expression = −k.
ex: Solve |2x − 3| = 7
> Case 1: 2x − 3 = 7, so x = 5
> Case 2: 2x − 3 = −7, so x = −2
= x = 5 or x = −2
oops: If the absolute value equals a negative number, like |x + 1| = −4, there is no solution, because distance can't be negative.
tip: Isolate the absolute value first. For 3|x| + 2 = 14, subtract 2 and divide by 3 to get |x| = 4.
term: absolute value = the distance of a number from zero on the number line
q: Solve |x + 4| = 6 | *x = 2 or x = −10 | x = 2 | x = 10 or x = −2 | x = −10
why: x + 4 = 6 gives 2; x + 4 = −6 gives −10.
q: How many solutions does |3x − 1| = −2 have? | *None | One | Two | Infinitely many
why: Absolute value can never equal a negative number.
gen: alg.absEq

@unit Functions | Relations, function notation, domain and range, rate of change
@lesson What is a function?
say: A function is a machine: put in an input, get exactly one output. Let's see how to spot one.
A relation is any set of input–output pairs. It is a function if every input has exactly one output. Outputs may repeat, but an input can't lead to two different outputs.
- Table or list: check that no x-value repeats with a different y-value.
- Graph: use the vertical line test. If any vertical line hits the graph more than once, it is not a function.
ex: Is {(1, 4), (2, 5), (1, 6)} a function?
> The input 1 goes to both 4 and 6
= Not a function
term: function = a relation where each input has exactly one output
term: relation = any set of ordered pairs
term: vertical line test = a graph is a function if no vertical line crosses it more than once
term: input = the x-value, or independent variable
term: output = the y-value, or dependent variable
q: Which set is a function? | *{(1, 3), (2, 3), (3, 3)} | {(2, 1), (2, 5), (4, 0)} | {(0, 0), (0, 1)} | {(5, 2), (5, −2)}
why: Every input appears once. Repeated outputs are fine.
q: A circle drawn on a graph… | *fails the vertical line test | passes the vertical line test | is always a function | has no inputs
why: A vertical line through a circle hits it twice.

@lesson Function notation and evaluating
say: f of x is just a fancy way to say the output when the input is x. Let's plug in!
f(x) is read "f of x." It does NOT mean f times x. If f(x) = 3x + 1, then f(4) means replace x with 4: f(4) = 3(4) + 1 = 13.
ex: If g(x) = x² − 2x, find g(−3)
> Substitute: (−3)² − 2(−3)
> Simplify: 9 + 6
= g(−3) = 15
You can also work backward: if f(x) = 2x − 5 and f(x) = 9, then 2x − 5 = 9, so x = 7.
term: function notation = writing f(x) for the output of function f at input x
term: evaluate = find the output for a given input
q: If f(x) = 5 − 2x, what is f(3)? | *−1 | 11 | 9 | 1
why: 5 − 2(3) = 5 − 6 = −1.
q: If h(x) = 4x + 1 and h(x) = 21, what is x? | *5 | 85 | 22 | 4
why: 4x + 1 = 21, so 4x = 20 and x = 5.
gen: funcEval

@lesson Domain, range and rate of change
say: Every function has a set of inputs it accepts and outputs it makes. And how fast it changes tells a story.
The domain is the set of all allowed inputs (x-values). The range is the set of all outputs (y-values). For a graph, read the domain left to right and the range bottom to top.
The average rate of change between two points is the change in output divided by the change in input: (y₂ − y₁) ÷ (x₂ − x₁). For a linear function it is the same everywhere; it is the slope.
ex: A plant is 4 cm tall on day 2 and 13 cm on day 5. Find the average rate of change.
> Change in height: 13 − 4 = 9 cm
> Change in time: 5 − 2 = 3 days
> 9 ÷ 3
= 3 cm per day
demo: Road trip rate of change
aim: A car drives at a steady speed. See how distance changes with time.
set: t = 2 | Hours driven | 0 to 8 by 0.25
set: s = 60 | Speed (mph) | 20 to 80 by 5
out: d = s*t | Distance (miles)
plot: t, d
step: Pick two times and compute (change in distance) ÷ (change in time).
result: The rate of change is the same between any two points: it equals the speed. A constant rate of change makes a linear function, and the steeper the line, the faster the car.
term: domain = the set of all input values of a function
term: range = the set of all output values of a function
term: rate of change = how much the output changes for each unit change in the input
q: What is the domain of {(−1, 4), (0, 2), (3, 2)}? | *{−1, 0, 3} | {4, 2} | {2, 4, −1} | {−1, 3}
why: The domain is the set of x-values.
q: A car is at mile 30 at hour 1 and mile 150 at hour 3. What is its average rate of change? | *60 miles per hour | 50 miles per hour | 120 miles per hour | 75 miles per hour
why: (150 − 30) ÷ (3 − 1) = 120 ÷ 2 = 60.
gen: slope, funcEval

@unit Linear Functions | Slope, slope-intercept and point-slope form, graphing, parallel and perpendicular lines
@lesson Slope
say: Slope tells you how steep a line is and which way it goes. Rise over run!
Slope m = rise ÷ run = (y₂ − y₁) ÷ (x₂ − x₁). It's the rate of change of a line.
- Positive slope: line goes up left to right.
- Negative slope: line goes down.
- Zero slope: horizontal line (y = number).
- Undefined slope: vertical line (x = number), because you'd divide by zero.
ex: Find the slope through (2, −1) and (6, 7)
> Rise: 7 − (−1) = 8
> Run: 6 − 2 = 4
> 8 ÷ 4
= m = 2
oops: Keep the order the same on top and bottom. If you start with the second point's y, start with the second point's x too.
term: slope = the steepness of a line: change in y divided by change in x
term: horizontal line = a line with slope 0
term: vertical line = a line with undefined slope
q: What is the slope through (1, 5) and (3, 1)? | *−2 | 2 | −1/2 | 3
why: (1 − 5) ÷ (3 − 1) = −4 ÷ 2 = −2.
q: What is the slope of the line x = 4? | *Undefined | 0 | 4 | 1
why: x = 4 is vertical; the run is 0.
gen: slope

@lesson Slope-intercept and point-slope form
say: There are a few ways to write a line's equation. Each one is handy in a different situation.
key: Slope-intercept form: y = mx + b, where m is the slope and b is the y-intercept (where the line crosses the y-axis).
To graph y = 2x − 3, start at (0, −3) and use the slope: up 2, right 1.
Point-slope form: y − y₁ = m(x − x₁). Use it when you know a point and the slope.
ex: Write the line with slope 3 through (2, 5) in slope-intercept form
> Point-slope: y − 5 = 3(x − 2)
> Distribute: y − 5 = 3x − 6
> Add 5: y = 3x − 1
= y = 3x − 1
Standard form is Ax + By = C. It's great for finding intercepts: set x = 0 to find the y-intercept and y = 0 to find the x-intercept.
demo: Lemonade stand profit
aim: Each cup sells for $1.50 and costs $0.40 to make, and you spent $20 on a stand. Graph profit = 1.10x − 20.
set: x = 10 | Cups sold | 0 to 60 by 1
set: p = 1.5 | Price per cup ($) | 0.5 to 3 by 0.25
out: profit = (p - 0.4)*x - 20 | Profit ($)
plot: x, profit
step: What is the y-intercept and what does it mean? Find the break-even point.
result: In y = mx + b, the slope m = price − cost is the profit per cup, and the intercept b = −20 is your starting cost. You break even where the line crosses zero (about 19 cups at $1.50).
term: y-intercept = the point where a line crosses the y-axis (x = 0)
term: x-intercept = the point where a line crosses the x-axis (y = 0)
term: slope-intercept form = y = mx + b
term: point-slope form = y − y₁ = m(x − x₁)
q: What is the slope and y-intercept of y = −4x + 7? | *slope −4, y-intercept 7 | slope 7, y-intercept −4 | slope 4, y-intercept 7 | slope −4, y-intercept −7
why: In y = mx + b, m = −4 and b = 7.
q: What is the x-intercept of 2x + 5y = 10? | *(5, 0) | (0, 2) | (2, 0) | (10, 0)
why: Set y = 0: 2x = 10, so x = 5.
gen: alg.lineEq, slope

@lesson Parallel and perpendicular lines
say: Lines can be best friends that never meet, or cross at a perfect right angle. Slope tells you which!
key: Same slope means parallel. Slopes that multiply to −1 mean perpendicular.
- Parallel lines have the same slope and never meet: y = 2x + 1 and y = 2x − 4.
- Perpendicular lines meet at a right angle. Their slopes are opposite reciprocals: 2 and −1/2. Their product is −1.
ex: Find the line perpendicular to y = 3x + 2 that passes through (6, 1)
> Perpendicular slope: −1/3
> y − 1 = −1/3(x − 6)
> y − 1 = −1/3 x + 2
= y = −1/3 x + 3
oops: Horizontal and vertical lines are perpendicular too, even though a vertical line's slope is undefined. y = 2 and x = 5 meet at a right angle.
term: parallel lines = lines in a plane with the same slope that never intersect
term: perpendicular lines = lines that meet at a right angle; their slopes multiply to −1
term: opposite reciprocal = flip the fraction and change the sign, like 4/5 → −5/4
q: Which line is parallel to y = −5x + 2? | *y = −5x − 8 | y = 5x + 2 | y = 1/5 x + 2 | y = −1/5 x
why: Parallel lines have the same slope, −5.
q: What slope is perpendicular to 2/3? | *−3/2 | 3/2 | −2/3 | 2/3
why: Flip and change the sign.
gen: alg.lineEq

@unit Systems of Equations | Graphing, substitution, elimination, applications and systems of inequalities
@lesson Solving systems by graphing and substitution
say: A system is two equations that must both be true. The solution is where their lines cross.
The solution to a system of two linear equations is the ordered pair (x, y) that works in both. On a graph, it's the intersection point.
- One solution: lines cross once.
- No solution: parallel lines (same slope, different intercepts).
- Infinitely many: the same line.
Substitution: solve one equation for a variable, then plug that expression into the other equation.
ex: Solve y = 2x + 1 and 3x + y = 16
> Substitute: 3x + (2x + 1) = 16
> 5x + 1 = 16, so x = 3
> y = 2(3) + 1 = 7
= (3, 7)
term: system of equations = two or more equations with the same variables
term: substitution method = solve one equation for a variable and substitute into the other
q: Solve y = x + 2 and 2x + y = 11 | *(3, 5) | (5, 3) | (2, 4) | (4, 6)
why: 2x + x + 2 = 11 → 3x = 9 → x = 3, y = 5.
q: How many solutions do y = 4x + 1 and y = 4x − 3 have? | *None | One | Two | Infinitely many
why: Same slope, different intercepts: parallel lines never meet.
gen: system2

@lesson Elimination
say: Elimination makes one variable disappear by adding the equations together. It's very satisfying!
Line up the equations. If a variable has opposite coefficients (like +2y and −2y), add the equations to eliminate it. If not, multiply one or both equations first.
ex: Solve 3x + 2y = 16 and x − 2y = 0
> Add the equations: 4x = 16, so x = 4
> Substitute into x − 2y = 0: 4 − 2y = 0, so y = 2
= (4, 2)
ex: Solve 2x + 3y = 12 and x + y = 5
> Multiply the second by −2: −2x − 2y = −10
> Add: y = 2
> x + 2 = 5, so x = 3
= (3, 2)
tip: Choose the method that's least work: substitution when a variable is already alone, elimination when coefficients line up.
term: elimination method = add or subtract equations to remove one variable
q: Solve x + y = 10 and x − y = 4 | *(7, 3) | (3, 7) | (6, 4) | (5, 5)
why: Add: 2x = 14 so x = 7, then y = 3.
q: To eliminate x from 3x + y = 7 and x + 2y = 4, multiply the second equation by… | *−3 | 3 | 2 | −2
why: −3x cancels 3x when you add.
gen: system2

@lesson Applications and systems of inequalities
say: Systems solve real problems with two unknowns, like tickets and snacks. Let's set one up.
key: Name the two unknowns, write one equation for each fact in the story, then solve the system.
ex: Adult tickets cost $8 and student tickets cost $5. 120 tickets sold for $750. How many of each?
> Let a = adult, s = student
> a + s = 120 and 8a + 5s = 750
> Substitute s = 120 − a: 8a + 600 − 5a = 750
> 3a = 150, so a = 50 and s = 70
= 50 adult, 70 student
A system of inequalities is solved by graphing each inequality and shading. The solution is the overlapping region. Use a dashed line for < or > and a solid line for ≤ or ≥.
tip: To check a point, plug it into every inequality. It's a solution only if all of them are true.
demo: Streaming plan break-even
aim: Plan A costs $40 plus $5 per movie; Plan B costs $10 plus $10 per movie. Find where they cost the same.
set: v = 3 | Movies rented | 0 to 12 by 1
out: A = 40 + 5*v | Plan A ($)
out: Bc = 10 + 10*v | Plan B ($)
out: diff = A - Bc | A minus B ($)
plot: v, diff
step: Solve the system y = 40 + 5x and y = 10 + 10x.
result: The two lines meet at x = 6, y = 70. Below 6 movies Plan B is cheaper; above 6, Plan A. The solution of a system is the point that satisfies both equations.
term: solution region = the area where the shading of all inequalities in a system overlaps
term: dashed line = a boundary line that is not included (for < or >)
q: Two numbers add to 20 and differ by 6. What is the larger number? | *13 | 14 | 7 | 12
why: x + y = 20, x − y = 6 → 2x = 26 → x = 13.
q: For y > 2x + 1, the boundary line is… | *dashed, shade above | solid, shade above | dashed, shade below | solid, shade below
why: > means not included (dashed) and greater y (above).
gen: system2

@unit Exponents & Exponential Functions | Exponent rules, zero and negative exponents, scientific notation, growth and decay
@lesson Exponent rules
say: Exponents are repeated multiplication, and a few simple rules make them easy to handle.
x⁴ means x · x · x · x. The base is x and the exponent is 4.
- Product rule: xᵃ · xᵇ = xᵃ⁺ᵇ (same base, add exponents)
- Quotient rule: xᵃ ÷ xᵇ = xᵃ⁻ᵇ
- Power rule: (xᵃ)ᵇ = xᵃᵇ (multiply exponents)
- Power of a product: (xy)ᵃ = xᵃyᵃ
- Zero exponent: x⁰ = 1 (x ≠ 0)
- Negative exponent: x⁻ⁿ = 1/xⁿ
ex: Simplify (2x³)² · x⁻⁴
> Power of a product: 4x⁶
> Multiply by x⁻⁴: 4x⁶⁻⁴
= 4x²
oops: x² · x³ is x⁵, not x⁶. You add exponents when multiplying, and only multiply them when raising a power to a power.
term: base = the number being multiplied repeatedly in a power
term: exponent = how many times the base is used as a factor
term: zero exponent rule = any nonzero number to the power 0 equals 1
q: Simplify x⁵ · x³ | *x⁸ | x¹⁵ | x² | 2x⁸
why: Same base: add exponents.
q: What is 5⁻²? | *1/25 | −25 | −10 | 25
why: A negative exponent means reciprocal: 1/5² = 1/25.
q: Simplify (a⁴)³ | *a¹² | a⁷ | a⁶⁴ | 3a⁴
why: Power to a power: multiply exponents.
gen: exponent

@lesson Scientific notation
say: Scientists write giant and tiny numbers in a short way. It's all about powers of ten.
A number in scientific notation looks like a × 10ⁿ, where 1 ≤ a < 10. Positive n means a big number; negative n means a small number.
ex: Write 0.00042 in scientific notation
> Move the decimal 4 places right to get 4.2
> Moving right means a negative exponent
= 4.2 × 10⁻⁴
To multiply, multiply the front numbers and add the exponents. Then adjust so the front number is between 1 and 10.
term: scientific notation = writing a number as a × 10ⁿ with 1 ≤ a < 10
q: Which is 3,600,000 in scientific notation? | *3.6 × 10⁶ | 36 × 10⁵ | 3.6 × 10⁵ | 0.36 × 10⁷
why: Move the decimal 6 places left; 3.6 is between 1 and 10.
q: What is (2 × 10³)(4 × 10⁵)? | *8 × 10⁸ | 8 × 10¹⁵ | 6 × 10⁸ | 8 × 10²
why: 2 × 4 = 8 and 3 + 5 = 8.
gen: alg.sciNote

@lesson Exponential growth and decay
say: Some things grow by a percent each time, like money and populations. That's exponential, and it gets big fast!
key: Exponential function: y = a · bˣ. a is the starting amount and b is the growth factor. If b > 1 it grows; if 0 < b < 1 it decays.
For a percent change r: growth uses b = 1 + r, decay uses b = 1 − r. So 8% growth means b = 1.08; 20% decay means b = 0.80.
ex: A $500 investment grows 6% per year. How much after 3 years?
> y = 500(1.06)³
> 1.06³ ≈ 1.191
= about $595.51
Linear functions add the same amount each step; exponential functions multiply by the same factor. Over time, exponential growth always overtakes linear growth.
demo: Compound interest
aim: Invest $1,000 at a yearly interest rate and watch it grow exponentially.
set: t = 10 | Years | 0 to 40 by 1
set: r = 5 | Interest rate (%) | 1 to 12 by 0.5
out: A = 1000*(1 + r/100)^t | Balance ($)
out: simple = 1000*(1 + r/100*t) | With simple interest ($)
plot: t, A
step: Compare the compound and simple balances after 30 years.
result: Compound interest multiplies by the same factor each year, so growth speeds up over time. At 5%, money doubles about every 14 years; simple interest only adds the same amount each year.
term: exponential growth = increase by the same percent each time period; growth factor greater than 1
term: exponential decay = decrease by the same percent each time period; factor between 0 and 1
term: growth factor = the number b multiplied each period in y = a · bˣ
q: Which function shows decay? | *y = 300(0.85)ˣ | y = 300(1.15)ˣ | y = 300 + 15x | y = 0.85x + 300
why: The base 0.85 is between 0 and 1.
q: A town of 2,000 grows 10% per year. Which equation models it? | *y = 2000(1.1)ˣ | y = 2000(0.1)ˣ | y = 2000 + 10x | y = 2000(10)ˣ
why: 10% growth means a factor of 1.10.
gen: alg.expGrowth

@unit Polynomials & Factoring | Adding, subtracting and multiplying polynomials; factoring GCF, trinomials and special products
@lesson Adding, subtracting and multiplying polynomials
say: Polynomials are expressions made of terms with whole-number exponents. Let's combine and multiply them.
A polynomial is named by its degree (highest exponent) and number of terms: 3x² − 5x + 1 is a quadratic trinomial.
To add or subtract, combine like terms. When subtracting, distribute the minus sign to every term of the second polynomial.
To multiply, distribute every term in the first by every term in the second. For two binomials, FOIL (First, Outer, Inner, Last) is a helpful reminder.
ex: Multiply (x + 4)(x − 3)
> First: x · x = x²
> Outer: x · (−3) = −3x
> Inner: 4 · x = 4x
> Last: 4 · (−3) = −12
> Combine: x² + x − 12
= x² + x − 12
oops: (x + 3)² is not x² + 9. It's (x + 3)(x + 3) = x² + 6x + 9.
demo: Open-top box from cardboard
aim: Cut equal squares from the corners of a 20 cm × 30 cm sheet and fold up the sides. Which cut gives the biggest box?
set: x = 3 | Square cut (cm) | 0 to 10 by 0.1
out: V = x*(20 - 2*x)*(30 - 2*x) | Volume (cm³)
plot: x, V
step: Expand x(20 − 2x)(30 − 2x) into a polynomial. What degree is it?
result: Volume is the cubic polynomial 4x³ − 100x² + 600x. Too small a cut makes a shallow box, too big a narrow one; the maximum is near x = 3.9 cm (about 1,056 cm³).
term: polynomial = a sum of terms with variables raised to whole-number powers
term: degree = the highest exponent in a polynomial
term: binomial = a polynomial with two terms
term: trinomial = a polynomial with three terms
q: Simplify (3x² + 2x) − (x² − 5x) | *2x² + 7x | 2x² − 3x | 4x² − 3x | 2x² + 3x
why: 3x² − x² = 2x² and 2x − (−5x) = 7x.
q: Multiply (x + 5)(x + 2) | *x² + 7x + 10 | x² + 10 | x² + 7x + 7 | 2x + 7
why: x² + 2x + 5x + 10.
gen: alg.distribute, alg.likeTerms

@lesson Factoring GCF and trinomials
say: Factoring is multiplying in reverse. We break an expression into pieces that multiply back together.
Always start by pulling out the greatest common factor (GCF): 6x² + 9x = 3x(2x + 3).
key: To factor x² + bx + c, find two numbers that multiply to c and add to b.
ex: Factor x² − x − 12
> Need two numbers with product −12 and sum −1
> −4 and 3 work: (−4)(3) = −12 and −4 + 3 = −1
= (x − 4)(x + 3)
tip: Check by multiplying your factors back out. You should get the original expression.
term: factor = to write an expression as a product
term: greatest common factor = the largest expression that divides every term
q: Factor 5x² − 15x | *5x(x − 3) | 5(x² − 15x) | x(5x − 3) | 5x(x − 15)
why: 5x divides both terms.
q: Factor x² + 8x + 15 | *(x + 3)(x + 5) | (x + 1)(x + 15) | (x − 3)(x − 5) | (x + 8)(x + 15)
why: 3 × 5 = 15 and 3 + 5 = 8.
gen: alg.factorTri

@lesson Special products
say: Some patterns show up so often they get their own names. Spot them and factoring becomes instant.
- Difference of squares: a² − b² = (a + b)(a − b). Example: x² − 49 = (x + 7)(x − 7).
- Perfect square trinomial: a² + 2ab + b² = (a + b)². Example: x² + 10x + 25 = (x + 5)².
- And a² − 2ab + b² = (a − b)².
ex: Factor 4x² − 9
> 4x² = (2x)² and 9 = 3²
> Difference of squares
= (2x + 3)(2x − 3)
oops: A sum of squares like x² + 9 does NOT factor over the real numbers.
term: difference of squares = a² − b², which factors as (a + b)(a − b)
term: perfect square trinomial = a trinomial of the form a² ± 2ab + b²
q: Factor x² − 64 | *(x + 8)(x − 8) | (x − 8)² | (x + 8)² | (x − 32)(x + 2)
why: 64 = 8², so it's a difference of squares.
q: Which is a perfect square trinomial? | *x² + 12x + 36 | x² + 12x + 12 | x² + 6x + 36 | x² − 36
why: 36 = 6² and 12x = 2 · 6 · x.
gen: alg.factorTri

@unit Quadratic Functions & Equations | Parabolas, vertex and axis of symmetry, solving by factoring, square roots and the quadratic formula
@lesson Graphing quadratics
say: Quadratic functions make U-shaped curves called parabolas. Let's find the key points.
A quadratic function has the form y = ax² + bx + c. Its graph is a parabola.
- If a > 0 it opens up (has a minimum); if a < 0 it opens down (has a maximum).
- The vertex is the turning point. Its x-coordinate is x = −b ÷ (2a).
- The axis of symmetry is the vertical line through the vertex.
- The zeros (x-intercepts) are where y = 0.
ex: Find the vertex of y = x² − 6x + 5
> x = −(−6) ÷ (2 · 1) = 3
> y = 3² − 6(3) + 5 = −4
= vertex (3, −4)
Vertex form y = a(x − h)² + k shows the vertex (h, k) directly.
demo: Basketball shot
aim: A ball leaves a player's hands 2 m high. Its height is h = −4.9t² + vt + 2.
set: t = 0.5 | Time (s) | 0 to 2 by 0.02
set: v = 8 | Upward launch speed (m/s) | 4 to 12 by 0.5
out: h = -4.9*t^2 + v*t + 2 | Height (m)
plot: t, h
sim: projectile | v=v, a=90, h=2
step: Find the vertex: when does the ball reach its highest point?
result: The path is a parabola opening down. The vertex is at t = v/9.8, and the ball passes the 3.05 m rim height twice: once rising and once falling.
term: parabola = the U-shaped graph of a quadratic function
term: vertex = the highest or lowest point of a parabola
term: axis of symmetry = the vertical line through the vertex that splits a parabola in half
term: zeros = the x-values where a function equals zero
q: Which way does y = −2x² + 3 open? | *Down | Up | Left | Right
why: a = −2 is negative.
q: What is the vertex of y = (x − 4)² + 1? | *(4, 1) | (−4, 1) | (4, −1) | (1, 4)
why: Vertex form a(x − h)² + k has vertex (h, k).
gen: alg.vertex

@lesson Solving by factoring and square roots
say: To solve a quadratic, set it equal to zero. Then factoring or square roots can crack it open.
key: Zero product property: if A · B = 0, then A = 0 or B = 0.
ex: Solve x² + 2x − 15 = 0
> Factor: (x + 5)(x − 3) = 0
> x + 5 = 0 or x − 3 = 0
= x = −5 or x = 3
When there's no x term, isolate x² and take the square root of both sides. Remember both the positive and negative roots.
ex: Solve 3x² = 75
> x² = 25
> x = ±√25
= x = 5 or x = −5
term: zero product property = if a product equals zero, at least one factor equals zero
term: quadratic equation = an equation that can be written as ax² + bx + c = 0
q: Solve (x − 7)(x + 2) = 0 | *x = 7 or x = −2 | x = −7 or x = 2 | x = 7 only | x = 14
why: Set each factor equal to zero.
q: Solve x² = 49 | *x = 7 or x = −7 | x = 7 | x = 24.5 | x = −7
why: Both 7² and (−7)² equal 49.
gen: quadRoots, alg.factorTri

@lesson The quadratic formula
say: The quadratic formula solves any quadratic, even ones that don't factor nicely. It's a superpower!
key: For ax² + bx + c = 0: x = (−b ± √(b² − 4ac)) ÷ (2a)
The discriminant b² − 4ac tells you how many real solutions there are:
- Positive: two real solutions.
- Zero: one real solution.
- Negative: no real solutions.
ex: Solve 2x² + 3x − 2 = 0
> a = 2, b = 3, c = −2
> Discriminant: 9 − 4(2)(−2) = 25
> x = (−3 ± 5) ÷ 4
= x = 1/2 or x = −2
tip: Write a, b and c down first, including their signs. Most mistakes come from a lost negative.
term: quadratic formula = x = (−b ± √(b² − 4ac)) ÷ 2a
term: discriminant = b² − 4ac; tells how many real solutions a quadratic has
q: What is the discriminant of x² + 4x + 4? | *0 | 32 | 8 | −16
why: 16 − 4(1)(4) = 0, so there is exactly one real solution.
q: How many real solutions does x² + 1 = 0 have? | *0 | 1 | 2 | Infinitely many
why: The discriminant is 0 − 4 = −4, which is negative.
gen: quadRoots

@unit Statistics & Data | Displays, center and spread, scatter plots and lines of best fit
@lesson Center and spread
say: Statistics helps us describe a whole set of data with just a few numbers. Let's meet the main ones.
- Mean: add the values and divide by how many there are.
- Median: the middle value when sorted (average the two middle values if there's an even count).
- Mode: the most frequent value.
- Range: maximum minus minimum.
- Interquartile range (IQR): Q3 − Q1, the spread of the middle half.
ex: Find the mean and median of 4, 8, 6, 10, 2
> Sum: 30, count 5, mean 6
> Sorted: 2, 4, 6, 8, 10; middle value 6
= mean 6, median 6
An outlier is a value far from the rest. The median and IQR resist outliers; the mean and range are pulled by them.
demo: Mean versus median
aim: Five test scores are 70, 72, 75, 78 and 80. Add a sixth score and see how the mean and median change.
set: x = 76 | Sixth score | 0 to 100 by 1
out: mean = (375 + x)/6 | Mean
out: median = (min(max(x, 72), 75) + min(max(x, 75), 78))/2 | Median
plot: x, mean
step: Make the sixth score an outlier, like 10. Which measure moves more?
result: The mean uses every value, so an outlier drags it a long way. The median depends only on the middle values, so it barely moves. Use the median for skewed data.
term: mean = the sum of the values divided by the number of values
term: median = the middle value of an ordered data set
term: outlier = a value much larger or smaller than the rest of the data
term: interquartile range = the third quartile minus the first quartile
q: Find the median of 3, 9, 1, 7 | *5 | 7 | 4 | 9
why: Sorted: 1, 3, 7, 9. Average of 3 and 7 is 5.
q: Adding an outlier of 500 to a small data set changes which the most? | *The mean | The median | The mode | The number of modes
why: The mean uses every value, so one huge value pulls it up a lot.
gen: median, meanFind

@lesson Scatter plots and lines of fit
say: When we compare two variables, a scatter plot shows if they move together. Let's read the story in the dots.
A scatter plot graphs pairs of data. Look for a pattern:
- Positive correlation: as x increases, y tends to increase.
- Negative correlation: as x increases, y tends to decrease.
- No correlation: no clear pattern.
A line of best fit models the trend. Its slope tells the rate of change; you can use it to make predictions.
ex: A line of fit for hours studied (x) and test score (y) is y = 6x + 52. Predict the score for 5 hours.
> y = 6(5) + 52
= about 82
oops: Correlation is not causation. Ice cream sales and sunburns rise together, but both are caused by hot weather.
term: correlation = a relationship where two variables tend to change together
term: line of best fit = a line that best models the trend in a scatter plot
term: causation = when a change in one variable actually causes a change in another
q: As outside temperature rises, heating bills fall. This is… | *negative correlation | positive correlation | no correlation | causation proven
why: One goes up while the other goes down.
q: Using y = 2.5x + 10, what is y when x = 8? | *30 | 20.5 | 28 | 35
why: 2.5(8) + 10 = 20 + 10 = 30.
gen: alg.lineEq
`;
