export default String.raw`
@course alg2 | Algebra II | Honors | 📈 | Math

@unit Functions and Transformations | Parent functions, shifting and stretching graphs, piecewise and absolute value functions, composition
@lesson Parent functions and transformations
say: Most graphs in Algebra 2 are just a basic parent graph that's been moved or stretched. Learn the moves once, use them everywhere!
Parent functions are the simplest member of each family: y = x, y = x², y = x³, y = √x, y = |x|, y = 1/x and y = 2ˣ.
key: For y = a · f(x − h) + k: h shifts right, k shifts up, |a| > 1 stretches vertically, 0 < |a| < 1 compresses, and a negative a reflects over the x-axis.
ex: Describe y = −2(x + 3)² − 1 compared to y = x²
> x + 3 means h = −3: shift left 3
> −2: reflect over the x-axis and stretch by 2
> −1: shift down 1
= Left 3, reflected, stretched by 2, down 1; vertex (−3, −1)
oops: Inside changes go the opposite way. f(x − 4) moves the graph RIGHT 4, not left.
term: parent function = the simplest function in a family, like y = x² for quadratics
term: translation = shifting a graph left, right, up or down without changing its shape
term: vertical stretch = multiplying the outputs by a number greater than 1, making the graph steeper
term: reflection = flipping a graph over a line such as the x-axis
q: How is y = |x − 5| + 2 related to y = |x|? | *Right 5, up 2 | Left 5, up 2 | Right 5, down 2 | Left 2, up 5
why: x − 5 shifts right 5; + 2 shifts up 2.
q: Which reflects y = √x over the x-axis? | *y = −√x | y = √(−x) | y = √x − 1 | y = 1/√x
why: A negative outside the function flips the outputs.
gen: funcEval

@lesson Piecewise and absolute value functions
say: Some functions follow different rules for different inputs. They're called piecewise functions.
A piecewise function uses different formulas on different intervals of x. To evaluate, find which interval the input belongs to, then use that piece.
ex: f(x) = 2x + 1 if x < 0, and x² if x ≥ 0. Find f(−3) and f(3).
> −3 < 0, so use 2x + 1: 2(−3) + 1 = −5
> 3 ≥ 0, so use x²: 9
= f(−3) = −5, f(3) = 9
The absolute value function |x| is itself piecewise: −x when x < 0 and x when x ≥ 0. Its graph is a V with its vertex at the origin. y = a|x − h| + k has vertex (h, k).
term: piecewise function = a function defined by different rules on different parts of its domain
term: interval = a set of numbers between two endpoints, like −2 < x ≤ 5
term: vertex of an absolute value graph = the corner point (h, k) of y = a|x − h| + k
q: f(x) = 5 if x ≤ 2, and x − 1 if x > 2. What is f(2)? | *5 | 1 | 4 | 3
why: x = 2 fits x ≤ 2, so f(2) = 5.
q: What is the vertex of y = 3|x + 4| − 6? | *(−4, −6) | (4, −6) | (−4, 6) | (3, −6)
why: y = a|x − h| + k has vertex (h, k) = (−4, −6).

@lesson Composition and inverses
say: You can feed one function into another, or run a function backward. Let's see how!
Composition (f ∘ g)(x) = f(g(x)): do g first, then put the result into f.
ex: f(x) = x² and g(x) = x + 3. Find f(g(2)) and g(f(2)).
> g(2) = 5, then f(5) = 25
> f(2) = 4, then g(4) = 7
= f(g(2)) = 25 and g(f(2)) = 7, so order matters
An inverse function f⁻¹ undoes f. To find it, swap x and y, then solve for y. The graphs of f and f⁻¹ are reflections over the line y = x.
key: f and g are inverses if f(g(x)) = x and g(f(x)) = x.
A function has an inverse function only if it is one-to-one: it passes the horizontal line test.
term: composition = combining functions by using the output of one as the input of another
term: inverse function = a function that undoes another; written f⁻¹
term: one-to-one = each output comes from exactly one input; passes the horizontal line test
q: If f(x) = 2x and g(x) = x − 1, what is f(g(4))? | *6 | 7 | 8 | 3
why: g(4) = 3, then f(3) = 6.
q: The graph of an inverse function is a reflection over… | *y = x | the x-axis | the y-axis | y = −x
why: Swapping x and y reflects over the line y = x.
gen: stem.compose, alg2.inverseLin

@unit Quadratic Functions and Complex Numbers | Vertex form and completing the square, the discriminant, complex numbers
@lesson Vertex form and completing the square
say: Completing the square turns any quadratic into vertex form, so you can read its turning point instantly.
Vertex form: y = a(x − h)² + k, with vertex (h, k). Standard form: y = ax² + bx + c.
key: To complete the square for x² + bx, add (b/2)².
ex: Write y = x² + 6x + 2 in vertex form
> Group: (x² + 6x) + 2
> Add and subtract (6/2)² = 9: (x² + 6x + 9) − 9 + 2
> Factor: (x + 3)² − 7
= y = (x + 3)² − 7, vertex (−3, −7)
Completing the square also solves equations: x² + 6x + 2 = 0 becomes (x + 3)² = 7, so x = −3 ± √7.
term: vertex form = y = a(x − h)² + k, where (h, k) is the vertex
term: completing the square = adding (b/2)² to make a perfect square trinomial
q: What number completes the square for x² − 10x? | *25 | 100 | −25 | 5
why: (−10/2)² = 25.
q: What is the vertex of y = (x − 2)² + 9? | *(2, 9) | (−2, 9) | (2, −9) | (9, 2)
why: Vertex form shows (h, k) directly.
gen: alg.vertex

@lesson Complex numbers
say: What's the square root of a negative number? Mathematicians invented a new number, i, to answer that!
key: i = √(−1), so i² = −1.
A complex number has the form a + bi, with a real part a and an imaginary part bi.
- Add or subtract: combine real parts and imaginary parts.
- Multiply: use FOIL, then replace i² with −1.
- Divide: multiply the top and bottom by the conjugate of the denominator (a + bi → a − bi).
ex: Multiply (3 + 2i)(1 − 4i)
> FOIL: 3 − 12i + 2i − 8i²
> i² = −1: 3 − 10i + 8
= 11 − 10i
Powers of i repeat every 4: i, −1, −i, 1. So i²³ = i³ = −i.
term: imaginary unit = i, the number whose square is −1
term: complex number = a number of the form a + bi
term: complex conjugate = a − bi, the number with the opposite imaginary part; (a + bi)(a − bi) = a² + b²
q: What is √(−49)? | *7i | −7 | 7 | −7i only
why: √(−49) = √49 · √(−1) = 7i.
q: What is i²? | *−1 | 1 | i | −i
why: That's the definition of i.
gen: alg2.complex

@lesson The discriminant and complex solutions
say: Not every parabola crosses the x-axis. The discriminant tells you what kind of solutions to expect.
For ax² + bx + c = 0, the discriminant is b² − 4ac:
- Positive: two real solutions (the parabola crosses the x-axis twice).
- Zero: one real solution (it touches the x-axis at the vertex).
- Negative: two complex solutions (it never touches the x-axis).
ex: Solve x² + 2x + 5 = 0
> Discriminant: 4 − 20 = −16
> x = (−2 ± √(−16)) ÷ 2 = (−2 ± 4i) ÷ 2
= x = −1 + 2i or x = −1 − 2i
tip: Complex solutions always come in conjugate pairs, like −1 + 2i and −1 − 2i.
term: discriminant = b² − 4ac, which tells the number and type of solutions of a quadratic
term: conjugate pair = two complex numbers a + bi and a − bi
q: The discriminant of a quadratic is −9. How many real solutions? | *0 | 1 | 2 | 3
why: A negative discriminant means two complex (not real) solutions.
q: Solve x² = −25 | *x = 5i or x = −5i | x = 5 or x = −5 | no solution at all | x = −5 only
why: x = ±√(−25) = ±5i.
gen: quadRoots

@unit Polynomial Functions | End behavior, polynomial division, the Remainder and Factor Theorems, finding zeros
@lesson Graphs and end behavior
say: A polynomial's degree and leading coefficient tell you what its graph does far out on both ends.
The degree is the highest exponent; the leading coefficient is the number in front of that term.
- Even degree, positive leading coefficient: both ends up.
- Even degree, negative: both ends down.
- Odd degree, positive: down on the left, up on the right.
- Odd degree, negative: up on the left, down on the right.
A polynomial of degree n has at most n real zeros and at most n − 1 turning points.
A zero's multiplicity is how many times its factor appears. Odd multiplicity: the graph crosses the x-axis. Even multiplicity: it touches and turns around.
term: end behavior = what the y-values do as x goes to positive or negative infinity
term: leading coefficient = the coefficient of the term with the highest degree
term: multiplicity = the number of times a factor appears in a polynomial
term: turning point = a point where a graph changes from increasing to decreasing or vice versa
q: End behavior of f(x) = −3x⁴ + x? | *Both ends down | Both ends up | Down left, up right | Up left, down right
why: Even degree with a negative leading coefficient points both ends down.
q: f(x) = (x − 2)²(x + 1). At x = 2 the graph… | *touches the x-axis and turns | crosses the x-axis | has an asymptote | is undefined
why: The factor (x − 2) has even multiplicity.

@lesson Polynomial division and the Remainder Theorem
say: Dividing polynomials works a lot like long division with numbers. And there's a shortcut for remainders!
Long division and synthetic division both divide a polynomial by a binomial. Synthetic division is a fast shortcut when dividing by (x − a).
key: Remainder Theorem: when p(x) is divided by (x − a), the remainder is p(a).
ex: Find the remainder when p(x) = x³ − 4x + 7 is divided by (x − 2)
> Evaluate p(2) = 8 − 8 + 7
= Remainder 7
Factor Theorem: (x − a) is a factor of p(x) exactly when p(a) = 0.
term: synthetic division = a shortcut for dividing a polynomial by x − a using only coefficients
term: remainder theorem = the remainder of p(x) ÷ (x − a) equals p(a)
term: factor theorem = x − a is a factor of p(x) if and only if p(a) = 0
q: p(3) = 0. Which must be a factor of p(x)? | *x − 3 | x + 3 | 3x | x − 0
why: By the Factor Theorem, p(a) = 0 means x − a is a factor.
q: What is the remainder when x² + 5 is divided by x + 1? | *6 | 4 | 5 | 0
why: p(−1) = 1 + 5 = 6.
gen: alg2.remainder

@lesson Finding zeros
say: Finding all the zeros of a polynomial is like a detective case. The Rational Root Theorem gives you a list of suspects.
Rational Root Theorem: any rational zero of a polynomial with integer coefficients has the form p/q, where p divides the constant term and q divides the leading coefficient.
ex: Find the zeros of x³ − 2x² − 5x + 6
> Possible rational zeros: ±1, ±2, ±3, ±6
> Test x = 1: 1 − 2 − 5 + 6 = 0, so (x − 1) is a factor
> Divide: x² − x − 6 = (x − 3)(x + 2)
= zeros 1, 3 and −2
Fundamental Theorem of Algebra: a polynomial of degree n has exactly n complex zeros, counting multiplicity.
term: rational root theorem = possible rational zeros are factors of the constant divided by factors of the leading coefficient
term: fundamental theorem of algebra = a degree-n polynomial has exactly n complex zeros counting multiplicity
term: zero = an input that makes a function equal 0; an x-intercept if real
q: How many complex zeros does a degree-5 polynomial have? | *5 | 4 | at most 2 | 10
why: Exactly n zeros, counting multiplicity.
q: Which is a possible rational zero of 2x³ + x − 3? | *3/2 | 2/3 | 5 | 1/3
why: p must divide 3 and q must divide 2, so 3/2 is on the list.

@unit Radicals and Rational Exponents | nth roots, rational exponents, radical equations, radical functions
@lesson nth roots and rational exponents
say: Roots and exponents are two ways of writing the same thing. Once you see the connection, radicals get easy.
The nth root of a is a number that, raised to the n, gives a. ∛27 = 3 because 3³ = 27.
key: a^(m/n) = (ⁿ√a)^m. The denominator is the root; the numerator is the power.
ex: Evaluate 16^(3/4)
> Fourth root of 16 is 2
> 2³ = 8
= 8
All the exponent rules work with fractional exponents: x^(1/2) · x^(1/3) = x^(5/6).
To simplify a radical, pull out perfect powers: √72 = √(36 · 2) = 6√2.
term: nth root = a number that, raised to the nth power, equals a given number
term: rational exponent = an exponent that is a fraction, like 2/3
term: index = the small number n in ⁿ√a that tells which root to take
q: What is 27^(2/3)? | *9 | 18 | 3 | 81
why: ∛27 = 3, and 3² = 9.
q: Simplify √50 | *5√2 | 25√2 | 2√5 | 10√5
why: √50 = √(25 · 2) = 5√2.
gen: alg2.ratExp

@lesson Solving radical equations
say: To solve an equation with a square root, isolate the radical and square both sides. But watch for fake answers!
Steps: isolate the radical, raise both sides to the power of the index, solve, then check every answer in the original equation.
ex: Solve √(x + 7) = x − 5
> Square both sides: x + 7 = x² − 10x + 25
> 0 = x² − 11x + 18 = (x − 9)(x − 2)
> Check x = 9: √16 = 4 and 9 − 5 = 4 ✓
> Check x = 2: √9 = 3 but 2 − 5 = −3 ✗
= x = 9 (x = 2 is extraneous)
oops: Squaring both sides can create extraneous solutions. Always check!
term: extraneous solution = a value that comes from solving but does not satisfy the original equation
term: radical equation = an equation with a variable inside a radical
q: Solve √(2x) = 6 | *x = 18 | x = 3 | x = 36 | x = 12
why: Square both sides: 2x = 36, so x = 18.
q: Why must you check answers to radical equations? | *Squaring can create extraneous solutions | Radicals are always negative | The calculator might be wrong | You never need to check
why: Squaring both sides can introduce answers that don't work.

@lesson Radical functions and inverses
say: Square root functions are the inverses of quadratics, with half the parabola tipped on its side.
y = √x starts at (0, 0) and rises slowly to the right. Its domain is x ≥ 0. y = a√(x − h) + k starts at (h, k).
y = ∛x is defined for all real numbers and has an S shape through the origin.
ex: Find the domain of f(x) = √(x − 4) + 1
> The inside must be ≥ 0: x − 4 ≥ 0
= x ≥ 4 (the graph starts at (4, 1))
To undo a quadratic with an inverse, restrict its domain to half the parabola so it's one-to-one.
term: square root function = a function of the form y = a√(x − h) + k
term: domain restriction = limiting the inputs of a function, often so it has an inverse
q: What is the domain of y = √(x + 3)? | *x ≥ −3 | x ≥ 3 | all real numbers | x > 0
why: x + 3 ≥ 0 means x ≥ −3.
q: The inverse of f(x) = x² (for x ≥ 0) is… | *√x | x/2 | −x² | 1/x²
why: Square root undoes squaring on the restricted domain.

@unit Exponential and Logarithmic Functions | Growth and decay, the number e, logarithms and their properties, solving exponential equations
@lesson Exponential functions and e
say: Exponential functions model money, populations and radioactive decay. And they introduce a famous number: e!
An exponential function has the form f(x) = a · bˣ. If b > 1, it shows growth; if 0 < b < 1, decay. Its graph has a horizontal asymptote (y = 0 for the basic form).
Compound interest: A = P(1 + r/n)^(nt), where n is the number of times per year interest compounds.
key: Continuous compounding uses e ≈ 2.718: A = Pe^(rt).
ex: $1,000 is invested at 5% compounded continuously. How much after 10 years?
> A = 1000e^(0.05 × 10) = 1000e^0.5
> e^0.5 ≈ 1.6487
= about $1,648.72
term: exponential function = a function where the variable is in the exponent, f(x) = a · bˣ
term: e = an irrational number, about 2.71828, the base of continuous growth
term: horizontal asymptote = a horizontal line a graph approaches but does not reach as x grows
q: Which represents exponential decay? | *f(x) = 50(0.9)ˣ | f(x) = 50(1.9)ˣ | f(x) = 0.9x + 50 | f(x) = 50x²
why: The base 0.9 is between 0 and 1.
q: About how big is e? | *2.718 | 3.142 | 1.618 | 1.414
why: e ≈ 2.71828.
gen: alg.expGrowth, stem.compound

@lesson Logarithms
say: A logarithm asks a question: what exponent do I need? It's the inverse of an exponential.
key: log_b(x) = y means bʸ = x.
ex: Evaluate log₂(32)
> 2 to what power is 32?
> 2⁵ = 32
= 5
log with no base means base 10 (common log). ln means base e (natural log).
Properties of logarithms:
- Product: log(MN) = log M + log N
- Quotient: log(M/N) = log M − log N
- Power: log(Mᵏ) = k log M
Change of base: log_b(x) = log(x) ÷ log(b), which lets you use a calculator for any base.
term: logarithm = the exponent a base must be raised to in order to get a given number
term: natural logarithm = ln x, the logarithm with base e
term: common logarithm = log x, the logarithm with base 10
q: What is log₃(81)? | *4 | 27 | 3 | 9
why: 3⁴ = 81.
q: Expand log(x³y) | *3 log x + log y | log 3x + log y | 3 log(xy) | log x³ − log y
why: Product rule, then power rule.
gen: stem.logs

@lesson Solving exponential and log equations
say: Exponential and log equations show up in every science class. Here's how to crack them.
- If you can write both sides with the same base, set the exponents equal: 2ˣ = 32 → 2ˣ = 2⁵ → x = 5.
- Otherwise, take the log of both sides and use the power rule to bring the exponent down.
- For log equations, rewrite in exponential form.
ex: Solve 3ˣ = 20
> Take ln of both sides: x ln 3 = ln 20
> x = ln 20 ÷ ln 3
= x ≈ 2.727
ex: Solve log₄(x − 1) = 2
> Exponential form: x − 1 = 4²
= x = 17
oops: You can only take logs of positive numbers. Check that your answer doesn't make anything inside a log negative or zero.
term: exponential equation = an equation with the variable in an exponent
term: exponential form = writing log_b(x) = y as bʸ = x
q: Solve 5ˣ = 125 | *x = 3 | x = 25 | x = 5 | x = 2
why: 125 = 5³.
q: Solve log(x) = 3 | *x = 1000 | x = 30 | x = 3 | x = 300
why: Base 10: x = 10³ = 1000.
gen: alg2.expSolve

@unit Rational Functions | Graphs and asymptotes, simplifying and operating on rational expressions, solving rational equations
@lesson Graphs and asymptotes
say: Rational functions are fractions with polynomials. Their graphs have invisible walls called asymptotes.
A rational function is a ratio of polynomials, like f(x) = (x + 1)/(x − 2).
- Vertical asymptotes occur where the denominator is zero (after canceling common factors).
- A hole occurs where a factor cancels from top and bottom.
- Horizontal asymptote: if the bottom's degree is bigger, y = 0. If the degrees are equal, y = ratio of leading coefficients. If the top's degree is bigger, there is none.
ex: Find the asymptotes of f(x) = (3x − 1)/(x + 4)
> Denominator zero at x = −4: vertical asymptote x = −4
> Equal degrees: y = 3/1 = 3
= x = −4 and y = 3
term: rational function = a function that is a ratio of two polynomials
term: vertical asymptote = a vertical line x = a that the graph approaches but never crosses
term: hole = a missing point on a graph where a common factor cancels
q: What is the vertical asymptote of y = 1/(x − 7)? | *x = 7 | x = −7 | y = 7 | y = 0
why: The denominator is 0 at x = 7.
q: Horizontal asymptote of y = (2x² + 1)/(5x² − x)? | *y = 2/5 | y = 0 | y = 2 | none
why: Equal degrees: ratio of leading coefficients.
gen: alg2.asymptote

@lesson Simplifying and operating on rational expressions
say: Rational expressions follow the same rules as fractions. Factor first, and everything gets easier.
To simplify, factor the top and bottom completely and cancel common factors. Note values that make the denominator zero: they're excluded.
ex: Simplify (x² − 9)/(x² + 5x + 6)
> Factor: (x + 3)(x − 3) / ((x + 3)(x + 2))
> Cancel (x + 3)
= (x − 3)/(x + 2), with x ≠ −3, −2
- Multiply: multiply tops and bottoms, then simplify.
- Divide: multiply by the reciprocal of the second fraction.
- Add or subtract: get a common denominator first.
oops: You can only cancel factors, not terms. (x + 5)/5 does NOT simplify to x.
term: rational expression = a fraction whose numerator and denominator are polynomials
term: excluded value = a value of the variable that makes a denominator zero
term: least common denominator = the smallest expression that each denominator divides into
q: Simplify (4x)/(8x²) | *1/(2x) | 2x | 1/2 | 4/(8x)
why: Divide top and bottom by 4x.
q: Which value is excluded from (x + 1)/(x − 6)? | *6 | −1 | 0 | −6
why: x = 6 makes the denominator zero.

@lesson Solving rational equations
say: To solve an equation with fractions, multiply everything by the common denominator. Then check for sneaky answers!
Multiply both sides by the LCD to clear the fractions, solve, then check that no solution makes a denominator zero.
ex: Solve 3/x + 1/2 = 2
> LCD is 2x: 6 + x = 4x
> 6 = 3x
= x = 2 (check: 3/2 + 1/2 = 2 ✓)
Work problems use rates: if one person paints a room in 3 hours and another in 6, together they paint 1/3 + 1/6 = 1/2 room per hour, so 2 hours.
term: LCD = least common denominator, used to clear fractions from an equation
term: work rate = the fraction of a job done per unit of time
q: Solve x/4 = 6/8 | *3 | 12 | 2 | 4.5
why: Cross-multiply: 8x = 24, so x = 3.
q: Pipe A fills a tank in 4 hours, pipe B in 4 hours. Together? | *2 hours | 8 hours | 4 hours | 1 hour
why: 1/4 + 1/4 = 1/2 tank per hour, so 2 hours.

@unit Sequences and Series | Arithmetic and geometric sequences, sigma notation, series and their sums
@lesson Arithmetic sequences
say: An arithmetic sequence adds the same number every step. Let's find any term without listing them all.
key: aₙ = a₁ + (n − 1)d, where d is the common difference.
ex: Find the 30th term of 7, 11, 15, 19, …
> a₁ = 7, d = 4
> a₃₀ = 7 + 29 × 4
= 123
The sum of the first n terms of an arithmetic series is Sₙ = n(a₁ + aₙ) ÷ 2. Pair up the first and last terms!
term: arithmetic sequence = a sequence with a constant difference between consecutive terms
term: common difference = the amount added to get each next term of an arithmetic sequence
term: series = the sum of the terms of a sequence
q: What is the common difference of 20, 14, 8, 2? | *−6 | 6 | −4 | 2
why: Each term is 6 less than the one before.
q: Sum of 1 + 2 + 3 + … + 100? | *5050 | 5000 | 10100 | 4950
why: 100(1 + 100) ÷ 2 = 5050.
gen: stem.arith

@lesson Geometric sequences
say: A geometric sequence multiplies by the same number every step. These grow (or shrink) really fast.
key: aₙ = a₁ · r^(n − 1), where r is the common ratio.
ex: Find the 8th term of 3, 6, 12, 24, …
> a₁ = 3, r = 2
> a₈ = 3 · 2⁷
= 384
Sum of a finite geometric series: Sₙ = a₁(1 − rⁿ) ÷ (1 − r).
If |r| < 1, an infinite geometric series converges to S = a₁ ÷ (1 − r). If |r| ≥ 1, it diverges (no finite sum).
term: geometric sequence = a sequence where each term is multiplied by a constant ratio
term: common ratio = the number each term is multiplied by in a geometric sequence
term: converge = when an infinite series approaches a finite sum
q: What is the common ratio of 81, 27, 9, 3? | *1/3 | 3 | −54 | 1/9
why: Each term is divided by 3.
q: Sum of the infinite series 10 + 5 + 2.5 + …? | *20 | 15 | 17.5 | infinite
why: S = 10 ÷ (1 − 1/2) = 20.
gen: stem.geom, stem.geoSeries

@lesson Sigma notation and recursive formulas
say: Mathematicians have a compact way to write long sums, using the Greek letter sigma. Let's decode it.
Σ (sigma) means "add up." The expression Σ from k = 1 to 5 of (2k) means 2 + 4 + 6 + 8 + 10 = 30.
ex: Evaluate Σ from k = 1 to 4 of (k² + 1)
> k = 1: 2; k = 2: 5; k = 3: 10; k = 4: 17
> Add: 2 + 5 + 10 + 17
= 34
A recursive formula defines each term from the previous one, like a₁ = 5, aₙ = aₙ₋₁ + 3. An explicit formula gives any term directly, like aₙ = 5 + 3(n − 1).
term: sigma notation = a compact way to write a sum using the symbol Σ
term: recursive formula = a rule that defines each term using the term before it
term: explicit formula = a rule that gives the nth term directly from n
q: Σ from k = 1 to 3 of (k + 2)? | *12 | 9 | 6 | 15
why: 3 + 4 + 5 = 12.
q: a₁ = 2 and aₙ = 3aₙ₋₁. What is a₃? | *18 | 6 | 8 | 54
why: a₂ = 6 and a₃ = 18.

@unit Trigonometric Functions | Radians, the unit circle, graphing sine and cosine
@lesson Radians and the unit circle
say: Trig gets way more powerful when we move beyond triangles to the unit circle. First, a new way to measure angles!
A radian is the angle that cuts off an arc equal to the radius. A full circle is 2π radians = 360°.
key: To convert, multiply degrees by π/180, or radians by 180/π.
The unit circle has radius 1, centered at the origin. For an angle θ, the point on the circle is (cos θ, sin θ).
ex: Find sin and cos of 5π/6
> 5π/6 = 150°, in Quadrant II
> Reference angle 30°: sin 30° = 1/2, cos 30° = √3/2
> In Quadrant II, x is negative
= sin = 1/2, cos = −√3/2
Signs by quadrant: All positive in I, Sine in II, Tangent in III, Cosine in IV ("All Students Take Calculus").
term: radian = the angle that intercepts an arc equal in length to the radius
term: unit circle = a circle of radius 1 centered at the origin
term: reference angle = the acute angle between the terminal side of an angle and the x-axis
q: What is 90° in radians? | *π/2 | π | 2π | π/4
why: 90 × π/180 = π/2.
q: cos(π) = ? | *−1 | 0 | 1 | undefined
why: π is 180°; the point is (−1, 0).
gen: stem.radians, stem.trigExact

@lesson Graphing sine and cosine
say: Sine and cosine make smooth waves that repeat forever. They model sound, tides, seasons and more.
y = sin x and y = cos x both repeat every 2π (their period) and swing between −1 and 1 (amplitude 1).
key: For y = a sin(bx) + d: amplitude = |a|, period = 2π/b, and the midline is y = d.
ex: Describe y = 3 sin(2x) + 1
> Amplitude: 3
> Period: 2π/2 = π
> Midline: y = 1, so it ranges from −2 to 4
= amplitude 3, period π, midline y = 1
The tangent function y = tan x has period π and vertical asymptotes where cos x = 0.
term: amplitude = half the distance between a wave's maximum and minimum
term: period = the horizontal length of one complete cycle of a repeating function
term: midline = the horizontal line halfway between a wave's maximum and minimum
q: What is the period of y = cos(4x)? | *π/2 | 4π | 2π | 8π
why: 2π ÷ 4 = π/2.
q: What is the amplitude of y = −5 sin x? | *5 | −5 | 1 | 10
why: Amplitude is |a|, always positive.

@lesson Trig identities and equations
say: Trig identities are equations that are always true. The most famous comes straight from the Pythagorean theorem.
key: sin²θ + cos²θ = 1
It's true because the point (cos θ, sin θ) is on the unit circle x² + y² = 1. Other identities: tan θ = sin θ / cos θ.
ex: sin θ = 3/5 and θ is in Quadrant II. Find cos θ.
> cos²θ = 1 − 9/25 = 16/25
> cos θ = ±4/5; in Quadrant II cosine is negative
= cos θ = −4/5
To solve a trig equation like 2 sin x = 1 on [0, 2π): sin x = 1/2, so x = π/6 or 5π/6.
term: trigonometric identity = an equation involving trig functions that is true for every angle
term: Pythagorean identity = sin²θ + cos²θ = 1
q: If cos θ = 0.6, what is sin²θ? | *0.64 | 0.4 | 0.36 | 0.8
why: sin²θ = 1 − 0.36 = 0.64.
q: Solve sin x = 0 on [0, 2π) | *x = 0 or π | x = π/2 | x = π/2 or 3π/2 | x = π only
why: sin x = 0 where the point is on the x-axis.

@unit Probability and Statistics | Counting principles, probability, the normal distribution
@lesson Counting: permutations and combinations
say: How many ways can something happen? Counting principles help you find out without listing everything.
Fundamental Counting Principle: if one choice has m options and another has n, together there are m × n options.
key: Permutations count arrangements where order matters: nPr = n!/(n − r)!. Combinations count groups where order doesn't matter: nCr = n!/(r!(n − r)!).
ex: How many ways can 3 officers (president, VP, secretary) be chosen from 10 students?
> Order matters: 10P3
> 10 × 9 × 8
= 720
ex: How many 3-person committees from 10 students?
> Order doesn't matter: 10C3 = 720 ÷ 3!
= 120
term: factorial = n! = n × (n − 1) × … × 1
term: permutation = an arrangement of items where order matters
term: combination = a selection of items where order does not matter
q: How many outfits from 4 shirts and 3 pants? | *12 | 7 | 24 | 64
why: 4 × 3 = 12.
q: 5C2 = ? | *10 | 20 | 5 | 25
why: 5!/(2! · 3!) = 10.
gen: stem.combos

@lesson Probability rules
say: Probability measures how likely something is, from 0 (impossible) to 1 (certain). Let's learn the rules.
P(A) = favorable outcomes ÷ total outcomes, when outcomes are equally likely.
- Complement: P(not A) = 1 − P(A).
- Independent events: P(A and B) = P(A) · P(B).
- Addition rule: P(A or B) = P(A) + P(B) − P(A and B).
- Conditional: P(B | A) = P(A and B) ÷ P(A), the probability of B given A happened.
ex: Draw a card from a standard deck. P(heart or king)?
> P(heart) = 13/52, P(king) = 4/52, P(king of hearts) = 1/52
> 13/52 + 4/52 − 1/52
= 16/52 = 4/13
term: independent events = events where one happening does not change the other's probability
term: mutually exclusive = events that cannot happen at the same time
term: conditional probability = the probability of an event given that another has occurred
q: P(rain) = 0.3. What is P(no rain)? | *0.7 | 0.3 | 1.3 | 0
why: Complement: 1 − 0.3 = 0.7.
q: Flip a coin twice. P(two heads)? | *1/4 | 1/2 | 1/3 | 3/4
why: Independent: 1/2 × 1/2 = 1/4.
gen: stem.indep, stem.diceSum

@lesson The normal distribution
say: Many things in nature, like heights and test scores, form a bell-shaped curve. Let's learn its rules.
A normal distribution is symmetric and bell-shaped, centered at the mean μ with spread measured by the standard deviation σ.
key: Empirical rule: about 68% of data falls within 1σ of the mean, 95% within 2σ, and 99.7% within 3σ.
A z-score tells how many standard deviations a value is from the mean: z = (x − μ) ÷ σ.
ex: Test scores are normal with μ = 75 and σ = 8. What percent score between 67 and 83?
> 67 and 83 are 1 standard deviation below and above
= about 68%
term: normal distribution = a symmetric, bell-shaped distribution of data
term: standard deviation = a measure of how spread out data is from the mean
term: z-score = the number of standard deviations a value is from the mean
term: empirical rule = 68% of data within 1σ, 95% within 2σ, 99.7% within 3σ in a normal distribution
q: Heights: μ = 64 in, σ = 3 in. What is the z-score of 70 in? | *2 | 6 | −2 | 0.5
why: (70 − 64) ÷ 3 = 2.
q: About what percent of data is within 2 standard deviations of the mean? | *95% | 68% | 99.7% | 50%
why: That's the empirical rule.
gen: stem.zscore
`;
