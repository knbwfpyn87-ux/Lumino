export default String.raw`
@course prealg | Pre-Algebra | Standard | 🔢 | Math

@unit Integers and Rational Numbers | Integer operations, fractions and decimals, order of operations
@lesson Working with integers
say: Integers include positive numbers, negative numbers and zero. Let's master the rules for combining them.
Integers are whole numbers and their opposites: …, −3, −2, −1, 0, 1, 2, 3, … Absolute value is the distance from zero: |−7| = 7.
key: Adding: same signs → add and keep the sign; different signs → subtract and keep the sign of the larger absolute value. Subtracting: add the opposite. Multiplying or dividing: same signs → positive; different signs → negative.
ex: Simplify −8 − (−3) + (−4)(2)
> Subtracting −3 means adding 3: −8 + 3 = −5
> (−4)(2) = −8
> −5 + (−8)
= −13
tip: Think of a number line: adding a positive moves right, adding a negative moves left.
term: integer = a whole number or its opposite
term: absolute value = the distance of a number from zero
term: opposite = a number the same distance from zero on the other side, like 5 and −5
q: What is −6 + 10? | *4 | −16 | 16 | −4
why: Different signs: 10 − 6 = 4, keep the positive sign.
q: What is (−3)(−7)? | *21 | −21 | −10 | 10
why: Same signs give a positive product.
gen: stem.gcdLcm

@lesson Fractions, decimals and order of operations
say: Fractions and decimals are two ways to write parts of a whole. Let's move between them and compute with confidence.
- To add or subtract fractions, find a common denominator.
- To multiply, multiply tops and bottoms. To divide, multiply by the reciprocal.
- To turn a fraction into a decimal, divide: 3/8 = 0.375.
key: Order of operations: Parentheses, Exponents, Multiplication and Division (left to right), Addition and Subtraction (left to right).
ex: Compute 2/3 + 3/4
> Common denominator 12: 8/12 + 9/12
= 17/12, or 1 5/12
ex: Evaluate 4 + 6 × (5 − 3)²
> Parentheses: 2; exponent: 4
> 6 × 4 = 24; 4 + 24
= 28
term: reciprocal = a number flipped so its product with the original is 1, like 3/4 and 4/3
term: common denominator = a shared denominator used to add or subtract fractions
term: order of operations = the agreed order for evaluating expressions
q: What is 3/5 ÷ 1/2? | *6/5 | 3/10 | 4/7 | 1/2
why: Multiply by the reciprocal: 3/5 × 2.
q: Evaluate 10 − 2 × 3 | *4 | 24 | 2 | 6
why: Multiply first: 10 − 6.
gen: alg.orderOps

@unit Ratios, Rates and Percents | Ratios and unit rates, proportions, percents
@lesson Ratios, rates and proportions
say: Ratios compare quantities. They help with recipes, maps, speeds and best buys.
A ratio compares two quantities, written 3:4, 3 to 4, or 3/4. A rate compares quantities with different units, like 60 miles per hour. A unit rate has a denominator of 1.
key: A proportion says two ratios are equal. Solve by cross-multiplying: if a/b = c/d, then ad = bc.
ex: 4 notebooks cost $10. How much do 7 cost?
> 4/10 = 7/x
> 4x = 70
= x = $17.50
Unit prices help compare deals: $3.00 for 12 ounces is $0.25 per ounce.
term: ratio = a comparison of two quantities
term: unit rate = a rate with a denominator of one unit
term: proportion = an equation stating two ratios are equal
q: A car travels 150 miles in 3 hours. What is its unit rate? | *50 miles per hour | 450 miles per hour | 147 miles per hour | 3 miles per hour
why: 150 ÷ 3 = 50.
q: Solve 2/5 = x/20 | *8 | 10 | 4 | 50
why: 5x = 40.
gen: proportion, drt

@lesson Percents
say: Percent means "per hundred." Percents show up everywhere: sales, tips, grades and taxes.
key: Percent of a number: part = percent × whole. Write the percent as a decimal first: 35% = 0.35.
- Discount: subtract the percent from the price. Tax and tip: add it.
- Percent change = (new − old) ÷ old × 100%.
ex: A $60 jacket is 25% off. What's the sale price?
> 25% of 60 = 0.25 × 60 = 15
> 60 − 15
= $45
ex: A price rises from $40 to $50. Percent change?
> (50 − 40) ÷ 40 = 0.25
= 25% increase
term: percent = a ratio out of 100
term: discount = an amount subtracted from the original price
term: percent change = the change divided by the original amount, as a percent
q: What is 20% of 85? | *17 | 65 | 4.25 | 105
why: 0.2 × 85 = 17.
q: A shirt costs $30 with 8% tax. What's the total? | *$32.40 | $38 | $30.08 | $2.40
why: 30 × 1.08 = 32.40.
gen: percentOf, percentChange

@unit Expressions and Equations | Variables and expressions, solving equations, inequalities
@lesson Variables and expressions
say: Algebra uses letters to stand for numbers. Expressions are the building blocks.
A variable is a letter that represents a number. An expression combines numbers, variables and operations, like 3x + 5.
key: Combine like terms (terms with the same variable part) and use the distributive property: a(b + c) = ab + ac.
ex: Simplify 4(x + 2) + 3x − 5
> Distribute: 4x + 8 + 3x − 5
> Combine: 7x + 3
= 7x + 3
To evaluate an expression, substitute the value: if x = 2, then 7x + 3 = 17.
Translate words: "5 more than a number" is n + 5; "twice a number" is 2n; "3 less than a number" is n − 3.
term: variable = a letter that represents an unknown number
term: expression = a combination of numbers, variables and operations
term: like terms = terms with the same variable raised to the same power
term: distributive property = a(b + c) = ab + ac
q: Simplify 6y − 2y + 4 | *4y + 4 | 8y | 4y − 4 | 8y + 4
why: 6y − 2y = 4y.
q: Write "7 less than a number n" | *n − 7 | 7 − n | 7n | n + 7
why: Subtract 7 from n.
gen: alg.likeTerms, alg.distribute

@lesson Solving equations and inequalities
say: Solving an equation means finding the value that makes it true. Keep it balanced!
key: Use inverse operations to isolate the variable, doing the same thing to both sides.
ex: Solve 3x − 4 = 11
> Add 4: 3x = 15
> Divide by 3
= x = 5
Inequalities use <, >, ≤, ≥. Solve them like equations, but flip the sign if you multiply or divide by a negative number. Graph solutions on a number line with an open circle (< or >) or closed circle (≤ or ≥).
ex: Solve −2x > 8
> Divide by −2 and flip
= x < −4
term: equation = a statement that two expressions are equal
term: inverse operations = operations that undo each other
term: inequality = a statement comparing expressions with <, >, ≤ or ≥
q: Solve x/3 + 2 = 6 | *12 | 24 | 4/3 | 8
why: x/3 = 4, so x = 12.
q: Solve −3x ≤ 9 | *x ≥ −3 | x ≤ −3 | x ≥ 3 | x ≤ 3
why: Dividing by −3 flips the sign.
gen: linear, inequality

@unit Geometry and Measurement | Angles and area, circles and volume, the Pythagorean theorem
@lesson Area, perimeter and circles
say: Geometry helps us measure the world: rooms, gardens, pizzas and more.
key: Perimeter is the distance around a shape. Area is the space inside. Rectangle A = lw; triangle A = ½bh; circle C = 2πr and A = πr².
ex: A circular garden has a radius of 5 m. Find its area and circumference (use π ≈ 3.14).
> A = 3.14 × 5² = 78.5 m²
> C = 2 × 3.14 × 5
= 78.5 m² and 31.4 m
Angles: a straight line is 180°, a right angle is 90°, and a triangle's angles add to 180°.
term: perimeter = the distance around a figure
term: area = the amount of space inside a two-dimensional figure
term: circumference = the distance around a circle
term: radius = the distance from the center of a circle to its edge
q: Area of a triangle with base 8 and height 5? | *20 | 40 | 13 | 26
why: ½ × 8 × 5 = 20.
q: Two angles of a triangle are 50° and 60°. The third is… | *70° | 90° | 110° | 180°
why: 180 − 50 − 60 = 70.
gen: area, angles

@lesson Volume and the Pythagorean theorem
say: Volume measures space inside 3D shapes, and the Pythagorean theorem finds missing sides of right triangles.
key: Volume of a rectangular prism V = lwh; cylinder V = πr²h. Pythagorean theorem: a² + b² = c² for right triangles, where c is the hypotenuse.
ex: A box is 4 cm by 3 cm by 10 cm. Find its volume.
> V = 4 × 3 × 10
= 120 cm³
ex: A right triangle has legs 6 and 8. Find the hypotenuse.
> 6² + 8² = 36 + 64 = 100
= c = 10
Volume is measured in cubic units, area in square units, and length in plain units.
term: volume = the space inside a 3D figure, in cubic units
term: hypotenuse = the longest side of a right triangle, opposite the right angle
term: Pythagorean theorem = a² + b² = c² for right triangles
q: Volume of a cube with edge 3? | *27 | 9 | 18 | 12
why: 3 × 3 × 3 = 27.
q: A right triangle has legs 5 and 12. The hypotenuse is… | *13 | 17 | 7 | 60
why: 25 + 144 = 169.
gen: pyth

@unit Data and Probability | Mean, median and mode, simple probability
@lesson Statistics basics
say: Statistics helps us summarize lots of numbers with just a few. Let's find the center of data.
key: Mean = sum ÷ count. Median = middle value when sorted. Mode = most common value. Range = max − min.
ex: Find the mean, median and range of 4, 7, 7, 9, 13
> Mean: 40 ÷ 5 = 8
> Median: the middle value is 7
= mean 8, median 7, mode 7, range 9
An outlier (a value far from the others) affects the mean more than the median. Graphs like bar graphs, histograms, line plots and box plots display data.
term: mean = the average: sum divided by count
term: median = the middle value of ordered data
term: mode = the most frequent value
term: range = the difference between the largest and smallest values
q: Median of 3, 8, 1, 9, 5? | *5 | 8 | 5.2 | 3
why: Sorted: 1, 3, 5, 8, 9.
q: Which is most affected by an outlier? | *Mean | Median | Mode | None
why: The mean uses every value.
gen: median, meanFind

@lesson Probability
say: Probability measures how likely something is to happen, from 0 (impossible) to 1 (certain).
key: Probability = favorable outcomes ÷ total possible outcomes.
ex: A bag has 3 red and 5 blue marbles. What's the probability of drawing red?
> 3 favorable out of 8 total
= 3/8
- Experimental probability comes from actually doing trials; theoretical probability comes from reasoning.
- For independent events, multiply probabilities: P(heads and rolling a 6) = 1/2 × 1/6 = 1/12.
- A sample space lists all possible outcomes; a tree diagram helps organize them.
term: probability = a number from 0 to 1 describing how likely an event is
term: sample space = the set of all possible outcomes
term: independent events = events where one doesn't affect the other
q: What is the probability of rolling an even number on a die? | *1/2 | 1/6 | 1/3 | 2/3
why: 3 even numbers out of 6.
q: Probability of flipping heads twice in a row? | *1/4 | 1/2 | 1/3 | 2
why: 1/2 × 1/2.
gen: stem.diceSum
`;
