export default String.raw`
@course trig | Trigonometry | Honors | 📐 | Math

@unit Right Triangle Trigonometry | Trig ratios, solving right triangles, special right triangles
@lesson Trigonometric ratios
say: Trigonometry starts with right triangles. Three ratios connect angles to side lengths.
key: SOH-CAH-TOA: sin θ = opposite/hypotenuse, cos θ = adjacent/hypotenuse, tan θ = opposite/adjacent.
The reciprocal ratios are cosecant (csc = 1/sin), secant (sec = 1/cos) and cotangent (cot = 1/tan).
ex: In a right triangle with legs 7 and 24 and hypotenuse 25, find sin and tan of the angle opposite the side of 7.
> sin = 7/25
> tan = 7/24
= sin θ = 7/25, tan θ = 7/24
For complementary angles, sin θ = cos(90° − θ).
term: sine = opposite over hypotenuse
term: cosine = adjacent over hypotenuse
term: tangent = opposite over adjacent
term: cosecant = the reciprocal of sine
q: Which ratio is adjacent over hypotenuse? | *Cosine | Sine | Tangent | Secant
why: CAH.
q: sin 30° equals cos of… | *60° | 30° | 90° | 120°
why: Complementary angles swap sine and cosine.
gen: geo.trigRatio

@lesson Solving right triangles
say: With trig ratios, you can find any missing side or angle of a right triangle.
To find a side: write the ratio that uses the known side and the unknown side, then solve.
To find an angle: use an inverse function, like θ = tan⁻¹(opposite/adjacent).
ex: A ladder makes a 70° angle with the ground and reaches 12 ft up a wall. How long is the ladder?
> sin 70° = 12/L
> L = 12/sin 70° ≈ 12/0.940
= about 12.8 ft
key: Special right triangles give exact values: 45-45-90 has sides 1 : 1 : √2, and 30-60-90 has sides 1 : √3 : 2.
Angle of elevation is measured up from horizontal; angle of depression is measured down from horizontal.
term: inverse trig function = a function that finds an angle from a ratio, like tan⁻¹
term: angle of elevation = the angle measured upward from a horizontal line
term: angle of depression = the angle measured downward from a horizontal line
q: tan θ = 1. What is θ (acute)? | *45° | 30° | 60° | 90°
why: In a 45-45-90 triangle, the legs are equal.
q: In a 30-60-90 triangle with short leg 5, the hypotenuse is… | *10 | 5√3 | 5√2 | 15
why: The hypotenuse is twice the short leg.
gen: geo.specialRight

@unit The Unit Circle | Radians, angles in standard position, exact values
@lesson Radians and angles
say: To go beyond right triangles, we measure angles in radians and place them on the coordinate plane.
An angle in standard position starts on the positive x-axis. Counterclockwise rotation is positive; clockwise is negative.
key: π radians = 180°. To convert degrees to radians, multiply by π/180; radians to degrees, multiply by 180/π.
ex: Convert 135° to radians.
> 135 × π/180 = 3π/4
= 3π/4
Coterminal angles share a terminal side; add or subtract 360° (or 2π). Arc length s = rθ when θ is in radians.
tip: Memorize the key conversions: 30° = π/6, 45° = π/4, 60° = π/3, 90° = π/2 and 180° = π.
term: radian = the angle that cuts off an arc equal in length to the radius
term: standard position = an angle with vertex at the origin and initial side on the positive x-axis
term: coterminal angles = angles that share the same terminal side
q: Convert π/3 to degrees. | *60° | 30° | 90° | 120°
why: π/3 × 180/π = 60.
q: Which angle is coterminal with 30°? | *390° | 60° | 210° | −30°
why: 30 + 360 = 390.
gen: stem.radians

@lesson The unit circle
say: The unit circle is trig's master map. Every angle's sine and cosine can be read right off it.
key: On the unit circle (radius 1), the point at angle θ is (cos θ, sin θ).
Key values in Quadrant I: (√3/2, 1/2) at π/6, (√2/2, √2/2) at π/4, (1/2, √3/2) at π/3.
Use reference angles and signs by quadrant: Quadrant I all positive; II sine positive; III tangent positive; IV cosine positive.
ex: Find cos(7π/6).
> 7π/6 is in Quadrant III, reference angle π/6
> cos π/6 = √3/2, and cosine is negative in Quadrant III
= −√3/2
term: unit circle = a circle with radius 1 centered at the origin
term: reference angle = the acute angle between the terminal side and the x-axis
q: sin(3π/2) = | *−1 | 0 | 1 | undefined
why: The point is (0, −1).
q: In which quadrant are both sine and cosine negative? | *III | I | II | IV
why: Both x and y are negative.
gen: stem.trigExact

@unit Graphs of Trig Functions | Sine and cosine graphs, transformations, other trig graphs
@lesson Graphing sine and cosine
say: Sine and cosine graphs are smooth waves. Learn their parts and you can sketch any transformation.
key: y = A sin(B(x − C)) + D has amplitude |A|, period 2π/B, phase shift C, and vertical shift (midline) D.
y = sin x starts at 0 and rises; y = cos x starts at its maximum. Both have period 2π and range [−1, 1].
ex: Describe y = 2 cos(3x) − 1.
> Amplitude 2; period 2π/3
> Midline y = −1, so it ranges from −3 to 1
= amplitude 2, period 2π/3, midline y = −1
term: amplitude = half the distance between the maximum and minimum
term: period = the length of one full cycle
term: phase shift = a horizontal shift of a trig graph
q: What is the period of y = sin(4x)? | *π/2 | 4π | 2π | π/4
why: 2π/4 = π/2.
q: What is the amplitude of y = −3 cos x? | *3 | −3 | 1 | 6
why: Amplitude is |A|.

@lesson Tangent and other trig graphs
say: Tangent and the reciprocal functions have asymptotes, making their graphs look very different from sine and cosine.
key: y = tan x has period π and vertical asymptotes where cos x = 0 (x = π/2 + kπ). It passes through the origin.
Secant (1/cos) has asymptotes where cos x = 0; cosecant (1/sin) has asymptotes where sin x = 0. Their graphs are U-shaped curves between asymptotes.
ex: Where are the asymptotes of y = tan x between 0 and 2π?
> cos x = 0 at π/2 and 3π/2
= x = π/2 and x = 3π/2
Inverse trig graphs: arcsin and arccos are defined on [−1, 1]; arctan is defined for all real numbers with horizontal asymptotes at ±π/2.
term: vertical asymptote = a vertical line a graph approaches but never touches
term: secant = the reciprocal of cosine
q: What is the period of y = tan x? | *π | 2π | π/2 | 1
why: Tangent repeats every π.
q: y = csc x has asymptotes where… | *sin x = 0 | cos x = 0 | tan x = 1 | x = 1
why: Cosecant is 1/sin x.

@unit Identities and Equations | Fundamental identities, sum and double-angle formulas, solving trig equations
@lesson Trig identities
say: Identities are equations true for every angle. They help simplify expressions and solve equations.
key: Pythagorean identity: sin²θ + cos²θ = 1. Also 1 + tan²θ = sec²θ and 1 + cot²θ = csc²θ.
Quotient identities: tan θ = sin θ/cos θ; cot θ = cos θ/sin θ.
Sum formula: sin(A + B) = sin A cos B + cos A sin B. Double angle: sin 2θ = 2 sin θ cos θ; cos 2θ = cos²θ − sin²θ.
ex: Simplify sin θ · cot θ.
> cot θ = cos θ/sin θ
> sin θ · cos θ/sin θ
= cos θ
tip: When verifying an identity, rewrite everything in terms of sine and cosine.
term: trigonometric identity = an equation true for all values of the variable
term: Pythagorean identity = sin²θ + cos²θ = 1
term: double-angle formula = an identity for trig functions of 2θ
q: Simplify 1 − cos²θ | *sin²θ | tan²θ | cos²θ | 1
why: From sin²θ + cos²θ = 1.
q: tan θ · cos θ = | *sin θ | cos θ | 1 | sec θ
why: (sin θ/cos θ) · cos θ.

@lesson Solving trig equations and oblique triangles
say: Trig equations have many solutions because trig functions repeat. And two laws solve any triangle.
To solve a trig equation, isolate the trig function, find solutions in one cycle, then add multiples of the period.
ex: Solve 2 sin x − √3 = 0 on [0, 2π).
> sin x = √3/2
= x = π/3 or 2π/3
key: Law of Sines: a/sin A = b/sin B = c/sin C. Law of Cosines: c² = a² + b² − 2ab cos C.
Use Law of Sines when you know an angle and its opposite side; use Law of Cosines for SAS or SSS.
term: law of sines = the ratio of a side to the sine of its opposite angle is constant
term: law of cosines = c² = a² + b² − 2ab cos C
term: oblique triangle = a triangle with no right angle
q: Solve cos x = 0 on [0, 2π). | *π/2 and 3π/2 | 0 and π | π | π/4
why: Cosine is zero at the top and bottom of the unit circle.
q: You know all three sides of a triangle. Which law finds an angle? | *Law of Cosines | Law of Sines | Neither | Pythagorean theorem
why: SSS needs the Law of Cosines.
`;
