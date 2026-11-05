export default String.raw`
@course geo | Geometry | Standard | 📐 | Math

@unit Tools of Geometry | Points, lines and planes; segments, midpoint and distance; angles and angle pairs
@lesson Points, lines and planes
say: Geometry starts with three simple ideas that everything else is built on. Let's meet them!
Points, lines and planes are undefined terms: we describe them instead of defining them.
- A point is an exact location with no size, named with a capital letter like A.
- A line goes on forever in both directions and is named by two points, like line AB.
- A plane is a flat surface that goes on forever, named by three points not on the same line.
A segment is part of a line with two endpoints (segment AB). A ray starts at one endpoint and goes forever in one direction (ray AB starts at A).
key: Two points determine exactly one line, and two lines intersect in at most one point.
term: collinear = points that lie on the same line
term: coplanar = points or lines that lie in the same plane
term: segment = part of a line between two endpoints
term: ray = part of a line that starts at an endpoint and extends forever in one direction
q: How many lines pass through two different points? | *Exactly one | Two | Infinitely many | None
why: Two points determine exactly one line.
q: Ray AB and ray BA are… | *different rays | the same ray | both segments | always opposite rays
why: Ray AB starts at A and ray BA starts at B, so they point in different directions.

@lesson Segments, midpoint and distance
say: On the coordinate plane, we can find the middle of a segment and its exact length with two handy formulas.
The midpoint of a segment splits it into two equal parts. Average the coordinates:
key: Midpoint = ((x₁ + x₂) ÷ 2, (y₁ + y₂) ÷ 2) and distance = √((x₂ − x₁)² + (y₂ − y₁)²)
ex: Find the midpoint and length of the segment from (1, 2) to (7, 10)
> Midpoint: ((1 + 7) ÷ 2, (2 + 10) ÷ 2) = (4, 6)
> Distance: √(6² + 8²) = √100
= midpoint (4, 6), length 10
The distance formula is really the Pythagorean theorem: the horizontal and vertical changes are the legs of a right triangle.
Segment addition: if B is between A and C, then AB + BC = AC.
term: midpoint = the point that divides a segment into two congruent segments
term: congruent segments = segments that have the same length
term: segment addition postulate = if B is between A and C, then AB + BC = AC
q: What is the midpoint of (−2, 4) and (6, 0)? | *(2, 2) | (4, 4) | (8, −4) | (2, 4)
why: ((−2 + 6) ÷ 2, (4 + 0) ÷ 2) = (2, 2).
q: B is between A and C. AB = 7 and AC = 19. What is BC? | *12 | 26 | 7 | 9.5
why: AB + BC = AC, so BC = 19 − 7 = 12.
gen: geo.midpoint, geo.distance

@lesson Angles and angle pairs
say: Angles are everywhere in geometry. Let's learn how they're measured and the special pairs to watch for.
An angle is formed by two rays with a common endpoint, the vertex. Angles are measured in degrees.
- Acute: less than 90°. Right: exactly 90°. Obtuse: between 90° and 180°. Straight: 180°.
- Complementary angles add to 90°. Supplementary angles add to 180°.
- Vertical angles are opposite each other when two lines cross. They are always congruent.
- A linear pair is two adjacent angles that form a straight line, so they're supplementary.
ex: Two angles are supplementary. One is 3 times the other. Find both.
> x + 3x = 180
> 4x = 180, so x = 45
= 45° and 135°
term: vertex = the common endpoint of the two rays of an angle
term: complementary angles = two angles whose measures add to 90°
term: supplementary angles = two angles whose measures add to 180°
term: vertical angles = opposite angles formed by two intersecting lines; they are congruent
term: angle bisector = a ray that divides an angle into two congruent angles
q: What is the complement of a 38° angle? | *52° | 142° | 38° | 62°
why: 90° − 38° = 52°.
q: Two lines cross and one angle is 70°. What is the angle vertical to it? | *70° | 110° | 20° | 290°
why: Vertical angles are congruent.
gen: angles

@unit Reasoning and Proof | Conditional statements, deductive reasoning, algebraic and geometric proofs
@lesson Conditional statements
say: Proofs are built from if-then statements. Let's learn how to flip them around and when they stay true.
A conditional statement has the form "If p, then q." p is the hypothesis and q is the conclusion.
- Converse: If q, then p.
- Inverse: If not p, then not q.
- Contrapositive: If not q, then not p.
key: A conditional and its contrapositive are always both true or both false. The converse and inverse can differ.
ex: Statement: If an angle measures 30°, then it is acute. Is the converse true?
> Converse: If an angle is acute, then it measures 30°
> A 50° angle is acute but not 30°: a counterexample
= The converse is false
When a statement and its converse are both true, combine them into a biconditional: "p if and only if q."
term: hypothesis = the "if" part of a conditional statement
term: conclusion = the "then" part of a conditional statement
term: converse = the statement formed by swapping the hypothesis and conclusion
term: contrapositive = the statement formed by swapping and negating both parts; it has the same truth value
term: counterexample = an example that shows a statement is false
q: What is the contrapositive of "If it rains, then the ground is wet"? | *If the ground is not wet, then it did not rain | If the ground is wet, then it rained | If it does not rain, then the ground is not wet | It rains if and only if the ground is wet
why: Swap and negate both parts.
q: Which is always logically equivalent to a conditional? | *Its contrapositive | Its converse | Its inverse | Its negation
why: A conditional and its contrapositive always share the same truth value.

@lesson Deductive reasoning and properties
say: Deductive reasoning uses facts and rules to reach conclusions that must be true. It's how detectives and mathematicians think.
Inductive reasoning finds patterns from examples (it might be wrong). Deductive reasoning uses accepted facts and logic, so its conclusions are guaranteed.
- Law of Detachment: If p → q is true and p is true, then q is true.
- Law of Syllogism: If p → q and q → r, then p → r.
Properties of equality justify steps in proofs: addition, subtraction, multiplication and division properties; the substitution property; and the reflexive (a = a), symmetric (if a = b then b = a) and transitive (if a = b and b = c then a = c) properties.
ex: Justify each step solving 2x + 5 = 17
> 2x = 12 by the Subtraction Property of Equality
> x = 6 by the Division Property of Equality
= x = 6, with a reason for each step
term: inductive reasoning = reasoning from patterns and examples to a likely conclusion
term: deductive reasoning = reasoning from facts, definitions and rules to a certain conclusion
term: transitive property = if a = b and b = c, then a = c
term: reflexive property = any quantity is equal to itself
q: All squares are rectangles. Figure F is a square. So F is a rectangle. This uses… | *the Law of Detachment | inductive reasoning | the converse | a counterexample
why: The conditional is true and its hypothesis is met, so the conclusion follows.
q: "If AB = CD, then CD = AB" is the… | *Symmetric Property | Reflexive Property | Transitive Property | Substitution Property
why: Symmetric means you can swap the two sides of an equation.

@lesson Writing proofs
say: A proof is an argument where every step has a reason. Two-column proofs keep it neat and organized.
A two-column proof lists statements on the left and reasons on the right. Reasons can be given information, definitions, properties, postulates or theorems you've already proven.
ex: Given ∠1 and ∠2 are a linear pair and m∠1 = 120°. Prove m∠2 = 60°.
> ∠1 and ∠2 are a linear pair (Given)
> m∠1 + m∠2 = 180° (Linear pairs are supplementary)
> 120° + m∠2 = 180° (Substitution)
> m∠2 = 60° (Subtraction Property of Equality)
= Proven, with a reason for every statement
tip: Start with the given information and work toward what you need to prove. It can help to work backward from the end, too.
A theorem is a statement that has been proven. The Vertical Angles Theorem says vertical angles are congruent; you can use it as a reason in later proofs.
term: postulate = a statement accepted as true without proof
term: theorem = a statement that has been proven true
term: two-column proof = a proof with statements in one column and reasons in the other
q: Which can be used as a reason in a proof? | *A definition, postulate or proven theorem | A guess from a drawing | A measurement with a ruler | An example that works
why: Every reason must be something already accepted or proven.
q: What should the first step of a two-column proof usually be? | *The given information | The statement to prove | A counterexample | A definition
why: Proofs build from what you're given.

@unit Parallel and Perpendicular Lines | Angles formed by transversals, proving lines parallel, slopes of lines
@lesson Transversals and angle pairs
say: When a line cuts across two parallel lines, it creates angles that match up in predictable ways.
A transversal is a line that crosses two or more lines. It creates 8 angles. When the two lines are parallel:
- Corresponding angles (same position at each crossing) are congruent.
- Alternate interior angles (inside, opposite sides) are congruent.
- Alternate exterior angles (outside, opposite sides) are congruent.
- Same-side (consecutive) interior angles are supplementary.
ex: Parallel lines are cut by a transversal. One angle is 65°. Find its same-side interior partner.
> Same-side interior angles add to 180°
> 180° − 65°
= 115°
oops: These angle rules only work when the lines are parallel. If they aren't, the angles don't have to match.
term: transversal = a line that intersects two or more lines at different points
term: corresponding angles = angles in the same position at each intersection with a transversal
term: alternate interior angles = angles between two lines on opposite sides of a transversal
term: same-side interior angles = angles between two lines on the same side of a transversal
q: Parallel lines are cut by a transversal. Alternate interior angles are… | *congruent | supplementary | complementary | unrelated
why: When lines are parallel, alternate interior angles are equal.
q: Two same-side interior angles are (2x + 10)° and (3x)°. Find x. | *34 | 10 | 36 | 20
why: They're supplementary: 5x + 10 = 180, so x = 34.

@lesson Proving lines parallel
say: The angle rules work backward too. If the angles match, the lines must be parallel!
The converses of the parallel line theorems let you prove lines are parallel:
- If corresponding angles are congruent, the lines are parallel.
- If alternate interior (or alternate exterior) angles are congruent, the lines are parallel.
- If same-side interior angles are supplementary, the lines are parallel.
Two more facts: two lines parallel to the same line are parallel to each other, and two lines perpendicular to the same line (in a plane) are parallel.
ex: A transversal makes angles of (4x − 8)° and (2x + 30)° as corresponding angles. What value of x makes the lines parallel?
> Set them equal: 4x − 8 = 2x + 30
> 2x = 38
= x = 19
term: converse of corresponding angles = if corresponding angles are congruent, then the lines are parallel
term: perpendicular transversal theorem = a line perpendicular to one of two parallel lines is perpendicular to the other
q: Same-side interior angles measure 95° and 85°. Are the lines parallel? | *Yes, they add to 180° | No, they aren't equal | Only if they're vertical | Can't tell
why: Supplementary same-side interior angles mean the lines are parallel.
q: Lines m and n are both perpendicular to line t. Then m and n are… | *parallel | perpendicular | the same line | skew
why: Two lines perpendicular to the same line in a plane are parallel.

@lesson Slopes of parallel and perpendicular lines
say: On the coordinate plane, slope lets us check for parallel or perpendicular lines with simple arithmetic.
key: Parallel lines have equal slopes. Perpendicular lines have slopes that are opposite reciprocals (they multiply to −1).
ex: Are the lines through (0, 1), (2, 5) and through (1, 0), (5, −2) perpendicular?
> First slope: (5 − 1) ÷ (2 − 0) = 2
> Second slope: (−2 − 0) ÷ (5 − 1) = −1/2
> 2 × (−1/2) = −1
= Yes, they are perpendicular
The distance from a point to a line is measured along the perpendicular segment, the shortest path.
tip: Vertical and horizontal lines are always perpendicular to each other.
term: slope = rise over run; the ratio of vertical change to horizontal change
term: opposite reciprocals = two numbers whose product is −1, like 3 and −1/3
q: A line has slope −4. What is the slope of a line perpendicular to it? | *1/4 | −1/4 | 4 | −4
why: Flip and change sign: −4 → 1/4.
q: Which pair of slopes means parallel lines? | *2/3 and 2/3 | 2/3 and −3/2 | 2/3 and 3/2 | 2/3 and −2/3
why: Parallel lines have equal slopes.
gen: slope

@unit Transformations | Translations, reflections and rotations; dilations; congruence and symmetry
@lesson Translations, reflections and rotations
say: Transformations slide, flip and turn shapes. These three keep the shape exactly the same size.
Rigid motions (isometries) preserve size and shape:
- Translation: slide every point the same distance and direction. (x, y) → (x + a, y + b).
- Reflection: flip over a line. Over the x-axis: (x, y) → (x, −y). Over the y-axis: (x, y) → (−x, y). Over y = x: (x, y) → (y, x).
- Rotation about the origin: 90° counterclockwise (x, y) → (−y, x); 180° (x, y) → (−x, −y); 270° counterclockwise (x, y) → (y, −x).
ex: Rotate the point (3, −2) 90° counterclockwise about the origin
> Rule: (x, y) → (−y, x)
> (−(−2), 3)
= (2, 3)
The original figure is the pre-image; the result is the image, often labeled with primes: A → A′.
term: transformation = a change in the position, size or shape of a figure
term: rigid motion = a transformation that preserves distance and angle measure
term: image = the figure that results from a transformation
term: pre-image = the original figure before a transformation
q: Reflect (4, 7) over the x-axis. | *(4, −7) | (−4, 7) | (7, 4) | (−4, −7)
why: Reflecting over the x-axis negates the y-coordinate.
q: Rotate (1, 5) 180° about the origin. | *(−1, −5) | (5, 1) | (−5, 1) | (1, −5)
why: 180° rotation negates both coordinates.

@lesson Dilations
say: A dilation makes a shape bigger or smaller but keeps it the same shape. It's like zooming in or out.
A dilation with center at the origin and scale factor k maps (x, y) → (kx, ky).
- k > 1: enlargement. 0 < k < 1: reduction.
- Dilations preserve angle measures and shape, but not size, so they are not rigid motions.
- A dilated line segment is parallel to the original (or on the same line), and its length is multiplied by k.
ex: Dilate triangle with vertices (2, 1), (4, 3), (0, 5) by a scale factor of 3
> Multiply every coordinate by 3
= (6, 3), (12, 9), (0, 15)
term: dilation = a transformation that enlarges or reduces a figure by a scale factor
term: scale factor = the ratio of a length in the image to the matching length in the pre-image
term: enlargement = a dilation with a scale factor greater than 1
q: Dilate (6, −4) by a scale factor of 1/2 centered at the origin. | *(3, −2) | (12, −8) | (6.5, −3.5) | (3, 2)
why: Multiply each coordinate by 1/2.
q: A segment of length 5 is dilated by a scale factor of 4. Its new length is… | *20 | 9 | 5 | 1.25
why: Lengths are multiplied by the scale factor.

@lesson Congruence and symmetry
say: Two shapes are congruent if one can be moved onto the other with slides, flips and turns. Symmetry is a shape matching itself!
key: Two figures are congruent if a sequence of rigid motions maps one onto the other. Congruent figures have all matching sides and angles equal.
A figure has line symmetry if a reflection over a line maps it onto itself. It has rotational symmetry if a rotation of less than 360° maps it onto itself.
ex: How many lines of symmetry does a regular hexagon have, and what is its smallest rotation symmetry?
> A regular n-gon has n lines of symmetry
> Smallest rotation: 360° ÷ n = 360° ÷ 6
= 6 lines; 60° rotational symmetry
term: congruent figures = figures with the same size and shape; one maps onto the other by rigid motions
term: line symmetry = when a reflection over a line maps a figure onto itself
term: rotational symmetry = when a rotation less than 360° maps a figure onto itself
q: How many lines of symmetry does a square have? | *4 | 2 | 1 | 8
why: Two through opposite midpoints and two through opposite corners.
q: Which transformation can map a figure onto a congruent figure? | *A reflection | A dilation by 2 | A dilation by 1/2 | Stretching only the x-coordinates
why: Reflections are rigid motions, so they preserve size and shape.

@unit Triangles and Congruence | Triangle angle sums, congruence shortcuts, isosceles and equilateral triangles
@lesson Triangle angle sum and exterior angles
say: Every triangle's angles add to the same total. That one fact solves tons of problems.
key: The interior angles of a triangle always add to 180°.
The Exterior Angle Theorem: an exterior angle equals the sum of the two remote (non-adjacent) interior angles.
ex: A triangle has angles of 48° and 67°. Find the third angle and the exterior angle next to it.
> Third angle: 180° − 48° − 67° = 65°
> Exterior angle: 48° + 67° = 115° (or 180° − 65°)
= third angle 65°, exterior angle 115°
Triangles can be classified by angles (acute, right, obtuse) or by sides (scalene: no equal sides, isosceles: at least two, equilateral: all three).
term: exterior angle = an angle formed by one side of a triangle and the extension of an adjacent side
term: remote interior angles = the two interior angles not next to a given exterior angle
term: scalene triangle = a triangle with no congruent sides
q: A triangle has angles 90° and 35°. What is the third? | *55° | 65° | 125° | 45°
why: 180° − 90° − 35° = 55°.
q: An exterior angle of a triangle is 130°. One remote interior angle is 70°. The other is… | *60° | 50° | 110° | 130°
why: 130° = 70° + x, so x = 60°.
gen: angles

@lesson Proving triangles congruent
say: You don't need to check all six parts to know two triangles are congruent. Five shortcuts do the job!
key: SSS, SAS, ASA, AAS, and HL (for right triangles) prove triangles congruent. AAA and SSA do NOT.
- SSS: all three pairs of sides are congruent.
- SAS: two sides and the angle between them.
- ASA: two angles and the side between them.
- AAS: two angles and a side not between them.
- HL: the hypotenuse and a leg of two right triangles.
After proving triangles congruent, CPCTC (corresponding parts of congruent triangles are congruent) lets you conclude any matching parts are equal.
oops: The order of letters matters. In SAS, the angle must be between the two sides. "SSA" (angle not included) doesn't guarantee congruence.
term: SAS congruence = two sides and the included angle of one triangle match another
term: ASA congruence = two angles and the included side of one triangle match another
term: CPCTC = corresponding parts of congruent triangles are congruent
term: included angle = the angle formed between two given sides
q: Which is NOT a valid way to prove triangles congruent? | *AAA | SAS | ASA | SSS
why: Triangles with the same angles can be different sizes.
q: Two right triangles have congruent hypotenuses and one pair of congruent legs. Which method proves them congruent? | *HL | SSA | AAA | ASA
why: HL is the special right-triangle shortcut.

@lesson Isosceles and equilateral triangles
say: Triangles with equal sides have equal angles too. This link is super useful.
key: Isosceles Triangle Theorem: if two sides of a triangle are congruent, the angles opposite them are congruent. The converse is true too.
In an isosceles triangle, the two equal sides are legs, the third side is the base, and the angles next to the base are the base angles.
An equilateral triangle has three equal sides, so it also has three equal angles of 60° each.
ex: An isosceles triangle has a vertex angle of 40°. Find each base angle.
> The base angles are equal: x + x + 40 = 180
> 2x = 140
= Each base angle is 70°
term: isosceles triangle = a triangle with at least two congruent sides
term: base angles = the two angles opposite the congruent sides of an isosceles triangle
term: equilateral triangle = a triangle with three congruent sides and three 60° angles
q: An isosceles triangle has base angles of 52°. What is the vertex angle? | *76° | 52° | 128° | 38°
why: 180° − 52° − 52° = 76°.
q: Each angle of an equilateral triangle measures… | *60° | 90° | 45° | 180°
why: 180° ÷ 3 = 60°.

@unit Relationships Within Triangles | Midsegments, bisectors, triangle centers and triangle inequalities
@lesson Midsegments and bisectors
say: Special segments inside triangles have surprising properties. Let's explore a few.
A midsegment connects the midpoints of two sides. It is parallel to the third side and half as long.
A perpendicular bisector of a segment crosses it at its midpoint at a right angle. Any point on it is the same distance from both endpoints.
An angle bisector splits an angle in half. Any point on it is the same distance from both sides of the angle.
ex: A midsegment of a triangle is 9 cm. How long is the side parallel to it?
> The midsegment is half the third side
> 2 × 9
= 18 cm
term: midsegment = a segment joining the midpoints of two sides of a triangle; parallel to and half the third side
term: perpendicular bisector = a line perpendicular to a segment at its midpoint
term: equidistant = the same distance from two or more objects
q: A triangle's side is 22. The midsegment parallel to it is… | *11 | 22 | 44 | 5.5
why: A midsegment is half the length of the parallel side.
q: A point on the perpendicular bisector of AB is… | *equally far from A and B | always the midpoint | closer to A | on segment AB
why: Every point on a perpendicular bisector is equidistant from the endpoints.

@lesson Triangle centers
say: Every triangle has four famous centers. Each one is where three special segments meet.
key: Each center is where three special segments are concurrent (meet at one point): perpendicular bisectors, angle bisectors, medians or altitudes.
- Circumcenter: where the perpendicular bisectors meet. It's equidistant from the three vertices (center of the circle through them).
- Incenter: where the angle bisectors meet. It's equidistant from the three sides (center of the circle inside).
- Centroid: where the medians meet (a median goes from a vertex to the midpoint of the opposite side). It's the balance point, located 2/3 of the way along each median from the vertex.
- Orthocenter: where the altitudes meet.
ex: A median is 15 units long. How far is the centroid from the vertex?
> The centroid is 2/3 of the way from the vertex
> 2/3 × 15
= 10 units
term: centroid = the point where the medians of a triangle meet; its balance point
term: circumcenter = the point where perpendicular bisectors meet; equidistant from the vertices
term: incenter = the point where angle bisectors meet; equidistant from the sides
term: median = a segment from a vertex to the midpoint of the opposite side
term: altitude = a perpendicular segment from a vertex to the line containing the opposite side
q: Which center is the balance point of a triangle? | *Centroid | Incenter | Circumcenter | Orthocenter
why: The centroid is the center of mass.
q: Which center is equidistant from all three sides? | *Incenter | Centroid | Circumcenter | Orthocenter
why: The incenter is where angle bisectors meet, and angle bisectors are equidistant from the sides.

@lesson Triangle inequalities
say: Not just any three lengths can make a triangle! And bigger sides sit across from bigger angles.
key: Triangle Inequality Theorem: the sum of any two sides must be greater than the third side.
ex: Can sides of 4, 7 and 12 form a triangle?
> Check the two smallest: 4 + 7 = 11
> 11 is not greater than 12
= No triangle
In any triangle, the longest side is opposite the largest angle, and the shortest side is opposite the smallest angle.
If two sides are 5 and 9, the third side x must satisfy 9 − 5 < x < 9 + 5, so 4 < x < 14.
term: triangle inequality theorem = the sum of the lengths of any two sides of a triangle is greater than the third
q: Which set of lengths can form a triangle? | *5, 6, 10 | 2, 3, 6 | 4, 4, 8 | 1, 2, 3
why: 5 + 6 = 11 > 10. The others fail.
q: A triangle has angles 30°, 70° and 80°. Which side is longest? | *Opposite the 80° angle | Opposite the 30° angle | Opposite the 70° angle | All are equal
why: The longest side is opposite the largest angle.

@unit Quadrilaterals and Polygons | Polygon angle sums, parallelograms, rectangles, rhombuses, squares, trapezoids and kites
@lesson Polygon angle sums
say: How many degrees are inside a polygon? There's a simple formula that works for every one of them.
key: The interior angles of an n-sided polygon add to (n − 2) × 180°. The exterior angles of any convex polygon add to 360°.
You can see why by drawing diagonals from one vertex: they split the polygon into n − 2 triangles, each with 180°.
ex: Find each interior angle of a regular octagon
> Sum: (8 − 2) × 180° = 1080°
> Each: 1080° ÷ 8
= 135°
For a regular polygon, each exterior angle is 360° ÷ n. If each exterior angle is 24°, the polygon has 360 ÷ 24 = 15 sides.
term: polygon = a closed figure made of straight segments
term: regular polygon = a polygon with all sides and all angles congruent
term: convex polygon = a polygon with no angles pointing inward
q: What is the interior angle sum of a hexagon? | *720° | 1080° | 540° | 360°
why: (6 − 2) × 180° = 720°.
q: Each exterior angle of a regular polygon is 30°. How many sides? | *12 | 6 | 10 | 30
why: 360° ÷ 30° = 12.
gen: geo.polygonAngles

@lesson Parallelograms
say: Parallelograms come with a whole bundle of properties. Know them, and lots of problems solve themselves.
A parallelogram has both pairs of opposite sides parallel. In every parallelogram:
- Opposite sides are congruent.
- Opposite angles are congruent.
- Consecutive angles are supplementary.
- The diagonals bisect each other.
ex: In parallelogram ABCD, angle A is 3x + 10 and angle B is 5x + 2. Find x and angle A.
> Consecutive angles are supplementary: 3x + 10 + 5x + 2 = 180
> 8x + 12 = 180, so x = 21
> angle A = 3(21) + 10
= x = 21, angle A = 73°
To prove a quadrilateral is a parallelogram, show any one of these: both pairs of opposite sides parallel or congruent, both pairs of opposite angles congruent, diagonals bisect each other, or one pair of sides both parallel and congruent.
term: parallelogram = a quadrilateral with both pairs of opposite sides parallel
term: diagonal = a segment connecting two non-adjacent vertices of a polygon
term: consecutive angles = angles that share a side of a polygon
q: In a parallelogram, one angle is 65°. What is the angle next to it? | *115° | 65° | 25° | 295°
why: Consecutive angles are supplementary.
q: The diagonals of a parallelogram always… | *bisect each other | are congruent | are perpendicular | bisect the angles
why: Congruent or perpendicular diagonals only happen in special parallelograms.

@lesson Special quadrilaterals
say: Rectangles, rhombuses and squares are special parallelograms, each with an extra superpower.
- Rectangle: a parallelogram with four right angles. Its diagonals are congruent.
- Rhombus: a parallelogram with four congruent sides. Its diagonals are perpendicular and bisect the angles.
- Square: both a rectangle and a rhombus, so it has all of these properties.
- Trapezoid: exactly one pair of parallel sides (the bases). Its midsegment is the average of the bases.
- Isosceles trapezoid: legs congruent, base angles congruent, diagonals congruent.
- Kite: two pairs of consecutive congruent sides; its diagonals are perpendicular.
ex: A trapezoid has bases 10 and 18. How long is its midsegment?
> Midsegment = (b₁ + b₂) ÷ 2
> (10 + 18) ÷ 2
= 14
tip: Think of it as a family tree: every square is a rhombus and a rectangle, and every rhombus and rectangle is a parallelogram. Properties pass down the tree.
term: rectangle = a parallelogram with four right angles
term: rhombus = a parallelogram with four congruent sides
term: trapezoid = a quadrilateral with exactly one pair of parallel sides
term: kite = a quadrilateral with two pairs of consecutive congruent sides
q: Which quadrilateral must have perpendicular diagonals? | *Rhombus | Rectangle | Parallelogram | Isosceles trapezoid
why: A rhombus's diagonals are always perpendicular.
q: A square is always a… | *rectangle and rhombus | trapezoid | kite but not a rhombus | rectangle but not a rhombus
why: A square has 4 right angles and 4 equal sides.

@unit Similarity | Ratios and proportions, similar polygons, AA/SSS/SAS similarity, proportions in triangles
@lesson Ratios, proportions and similar polygons
say: Similar figures are the same shape but different sizes, like a photo and its enlargement.
A proportion is an equation stating two ratios are equal. Solve it by cross-multiplying: if a/b = c/d, then ad = bc.
Two polygons are similar (~) if their corresponding angles are congruent and their corresponding sides are proportional. The ratio of matching sides is the scale factor.
key: If the scale factor is k, perimeters are multiplied by k and areas are multiplied by k².
ex: Two similar rectangles have widths 4 and 10. The small one has length 6. Find the large one's length.
> 4/10 = 6/x
> 4x = 60
= x = 15
term: proportion = an equation stating that two ratios are equal
term: similar polygons = polygons with congruent corresponding angles and proportional corresponding sides
term: cross products = in a/b = c/d, the products ad and bc, which are equal
q: Solve 3/8 = x/24 | *9 | 8 | 64 | 72
why: 8x = 72, so x = 9.
q: Two similar figures have a scale factor of 3. The small one's area is 10. The large one's area is… | *90 | 30 | 13 | 100
why: Areas scale by 3² = 9.
gen: geo.similar, proportion

@lesson Proving triangles similar
say: For triangles, you only need a couple of facts to prove they're similar. AA is the easiest!
- AA: two pairs of congruent angles. (The third pair must match too.)
- SSS similarity: all three pairs of sides are proportional.
- SAS similarity: two pairs of sides are proportional and the included angles are congruent.
ex: Triangle ABC has angles 40° and 75°. Triangle DEF has angles 75° and 65°. Are they similar?
> ABC's third angle: 180° − 40° − 75° = 65°
> Both have 75° and 65° angles
= Yes, by AA similarity
tip: Write similarity statements in matching order: if △ABC ~ △DEF, then A matches D, B matches E, and C matches F.
term: AA similarity = two triangles with two pairs of congruent angles are similar
term: SSS similarity = two triangles whose three pairs of sides are proportional are similar
q: Which is enough to prove two triangles similar? | *Two pairs of congruent angles | One pair of congruent angles | One pair of proportional sides | Equal perimeters
why: AA similarity needs just two angle pairs.
q: Triangles with sides 3, 4, 5 and 6, 8, 10 are similar by… | *SSS similarity | AA only | SAS congruence | They aren't similar
why: Every pair of sides has ratio 1 : 2.

@lesson Proportions in triangles
say: Parallel lines inside triangles cut the sides into proportional pieces. It's a neat shortcut.
Triangle Proportionality Theorem: if a line parallel to one side of a triangle crosses the other two sides, it divides them proportionally.
The Angle Bisector Theorem: an angle bisector divides the opposite side into segments proportional to the other two sides.
ex: In triangle ABC, DE ∥ BC with D on AB and E on AC. AD = 4, DB = 6, AE = 5. Find EC.
> AD/DB = AE/EC
> 4/6 = 5/EC
> 4 · EC = 30
= EC = 7.5
Similar triangles also let you measure things you can't reach, like a tree's height using its shadow and your own shadow.
term: triangle proportionality theorem = a line parallel to one side of a triangle divides the other two sides proportionally
term: indirect measurement = using similar triangles to find lengths that are hard to measure directly
q: A 6 ft person casts a 4 ft shadow. A tree casts a 20 ft shadow at the same time. How tall is the tree? | *30 ft | 13.3 ft | 26 ft | 24 ft
why: 6/4 = h/20, so h = 30.
q: A line parallel to one side of a triangle divides the other two sides… | *proportionally | equally | at right angles | into halves only
why: That's the Triangle Proportionality Theorem.
gen: proportion

@unit Right Triangles and Trigonometry | Pythagorean theorem, special right triangles, sine, cosine and tangent
@lesson The Pythagorean theorem
say: The most famous theorem in math connects the three sides of every right triangle.
key: In a right triangle with legs a and b and hypotenuse c: a² + b² = c².
The hypotenuse is the longest side, across from the right angle.
ex: A ladder 13 ft long reaches 12 ft up a wall. How far is its base from the wall?
> a² + 12² = 13²
> a² = 169 − 144 = 25
= a = 5 ft
Pythagorean triples are whole-number sides that work: 3-4-5, 5-12-13, 8-15-17, 7-24-25, and their multiples.
Converse: if a² + b² = c², the triangle is right. If a² + b² > c² it's acute; if a² + b² < c² it's obtuse (c is the longest side).
term: hypotenuse = the side opposite the right angle in a right triangle
term: legs = the two sides that form the right angle in a right triangle
term: Pythagorean triple = three whole numbers that satisfy a² + b² = c²
q: Legs of 9 and 12. What is the hypotenuse? | *15 | 21 | 13 | 108
why: 81 + 144 = 225, and √225 = 15.
q: Sides 6, 7, 10: what kind of triangle? | *Obtuse | Right | Acute | Not a triangle
why: 36 + 49 = 85 < 100, so it's obtuse.
gen: pyth, geo.distance

@lesson Special right triangles
say: Two right triangles show up so often that their side ratios are worth memorizing.
key: 45-45-90 sides are x : x : x√2. 30-60-90 sides are x : x√3 : 2x.
In a 45-45-90 triangle (an isosceles right triangle), the hypotenuse is a leg times √2.
In a 30-60-90 triangle, the short leg is across from 30°, the long leg (across from 60°) is short leg × √3, and the hypotenuse is twice the short leg.
ex: A 30-60-90 triangle has a hypotenuse of 14. Find both legs.
> Short leg = hypotenuse ÷ 2 = 7
> Long leg = 7√3
= 7 and 7√3
tip: A square's diagonal makes two 45-45-90 triangles, and an equilateral triangle's altitude makes two 30-60-90 triangles.
term: 45-45-90 triangle = an isosceles right triangle with sides in the ratio 1 : 1 : √2
term: 30-60-90 triangle = a right triangle with sides in the ratio 1 : √3 : 2
q: A square has side 5. How long is its diagonal? | *5√2 | 10 | 5√3 | 25
why: The diagonal is the hypotenuse of a 45-45-90 triangle.
q: In a 30-60-90 triangle the short leg is 4. The hypotenuse is… | *8 | 4√3 | 4√2 | 2
why: The hypotenuse is twice the short leg.
gen: geo.specialRight

@lesson Sine, cosine and tangent
say: Trigonometry links angles to side ratios. Just remember SOH-CAH-TOA!
For an acute angle in a right triangle:
key: sin = opposite ÷ hypotenuse, cos = adjacent ÷ hypotenuse, tan = opposite ÷ adjacent (SOH-CAH-TOA).
ex: A ramp makes a 10° angle with the ground and is 20 ft long. How high does it rise?
> The height is opposite the angle; 20 ft is the hypotenuse
> sin 10° = h ÷ 20
> h = 20 × sin 10° ≈ 20 × 0.174
= about 3.5 ft
To find an angle from sides, use the inverse functions: if tan A = 0.75, then A = tan⁻¹(0.75) ≈ 36.9°.
The angle of elevation is measured up from horizontal; the angle of depression is measured down from horizontal.
term: sine = in a right triangle, the ratio of the opposite side to the hypotenuse
term: cosine = in a right triangle, the ratio of the adjacent side to the hypotenuse
term: tangent = in a right triangle, the ratio of the opposite side to the adjacent side
term: angle of elevation = the angle measured upward from a horizontal line
q: Which ratio is opposite over adjacent? | *Tangent | Sine | Cosine | Secant
why: TOA: tangent = opposite ÷ adjacent.
q: In a 3-4-5 right triangle, what is the cosine of the angle opposite the side of 3? | *4/5 | 3/5 | 3/4 | 5/4
why: The adjacent side is 4 and the hypotenuse is 5.
gen: geo.trigRatio

@unit Circles | Parts of circles, arcs and angles, inscribed angles, arc length and sector area, equations of circles
@lesson Parts of a circle and arcs
say: Circles have their own vocabulary. Let's name the parts and learn how arcs are measured.
- Radius: center to the circle. Diameter: across through the center (2 × radius).
- Chord: a segment with both endpoints on the circle. The diameter is the longest chord.
- Tangent: a line that touches the circle at exactly one point. It's perpendicular to the radius at that point.
- Secant: a line that crosses the circle at two points.
A central angle has its vertex at the center. The measure of its arc equals the central angle. A minor arc is less than 180°, a major arc is more, and a semicircle is exactly 180°.
ex: A central angle measures 110°. What is the measure of its major arc?
> The whole circle is 360°
> 360° − 110°
= 250°
term: chord = a segment whose endpoints are on a circle
term: tangent line = a line that touches a circle at exactly one point
term: central angle = an angle with its vertex at the center of a circle
term: minor arc = an arc measuring less than 180°
q: A circle's diameter is 18. What is its radius? | *9 | 36 | 18 | 6
why: The radius is half the diameter.
q: A tangent line and the radius drawn to the point of tangency are… | *perpendicular | parallel | congruent | the same line
why: A tangent is always perpendicular to the radius at the point where it touches.

@lesson Inscribed angles
say: An angle drawn from a point on the circle is half its arc. This half rule unlocks many circle problems.
key: An inscribed angle is half the measure of its intercepted arc.
An inscribed angle has its vertex on the circle and its sides are chords. Inscribed angles that intercept the same arc are congruent.
An angle inscribed in a semicircle is always a right angle (because it intercepts a 180° arc).
In a quadrilateral inscribed in a circle, opposite angles are supplementary.
ex: An inscribed angle intercepts an arc of 140°. Find the angle.
> Half the arc
> 140° ÷ 2
= 70°
term: inscribed angle = an angle with its vertex on a circle and chords as its sides
term: intercepted arc = the arc that lies inside an angle
term: inscribed quadrilateral = a quadrilateral with all four vertices on a circle
q: An inscribed angle measures 35°. Its intercepted arc is… | *70° | 35° | 17.5° | 145°
why: The arc is twice the inscribed angle.
q: A triangle is inscribed in a circle with one side as a diameter. The angle opposite the diameter is… | *90° | 180° | 60° | 45°
why: It intercepts a semicircle (180°), so it's half: 90°.

@lesson Arc length, sector area and circle equations
say: To find part of a circle's length or area, just figure out what fraction of the circle you have.
key: Arc length = (angle ÷ 360°) × 2πr. Sector area = (angle ÷ 360°) × πr².
ex: A pizza has radius 8 in. Find the area of a 45° slice.
> Fraction of the circle: 45/360 = 1/8
> Whole area: π(8)² = 64π
= 8π ≈ 25.1 square inches
The equation of a circle with center (h, k) and radius r is (x − h)² + (y − k)² = r².
oops: In (x − 3)² + (y + 2)² = 25, the center is (3, −2), not (3, 2), and the radius is 5, not 25.
term: arc length = the distance along an arc, a fraction of the circumference
term: sector = a region of a circle bounded by two radii and an arc
term: circumference = the distance around a circle, 2πr
q: What is the circumference of a circle with radius 6? | *12π | 36π | 6π | 18π
why: C = 2πr = 12π.
q: Center and radius of (x + 1)² + (y − 4)² = 49? | *(−1, 4), radius 7 | (1, −4), radius 7 | (−1, 4), radius 49 | (1, 4), radius 7
why: (x − h)² means h = −1; (y − k)² means k = 4; r = √49 = 7.
gen: geo.arcSector, geo.circleEq

@unit Area, Surface Area and Volume | Areas of polygons and circles, surface area, volume of prisms, cylinders, pyramids, cones and spheres
@lesson Area of polygons and circles
say: Area measures the space inside a flat shape. Each shape has a formula, and most come from the rectangle.
- Rectangle: A = lw. Parallelogram: A = bh (h is the perpendicular height).
- Triangle: A = ½bh.
- Trapezoid: A = ½(b₁ + b₂)h.
- Circle: A = πr².
- Regular polygon: A = ½ × apothem × perimeter.
ex: Find the area of a trapezoid with bases 7 and 13 and height 4
> A = ½(7 + 13)(4)
> ½ × 20 × 4
= 40 square units
For composite shapes, split into simpler shapes, find each area, and add (or subtract holes).
oops: Height is always measured perpendicular to the base, not along a slanted side.
term: area = the number of square units inside a two-dimensional figure
term: apothem = the distance from the center of a regular polygon to the midpoint of a side
term: composite figure = a figure made of two or more simple shapes
q: What is the area of a triangle with base 10 and height 7? | *35 | 70 | 17 | 140
why: ½ × 10 × 7 = 35.
q: What is the area of a circle with diameter 10? | *25π | 100π | 10π | 20π
why: The radius is 5, so A = π(5)² = 25π.
gen: area

@lesson Surface area
say: Surface area is the total area covering a 3D shape, like the wrapping paper needed for a gift.
Surface area adds up the area of every face. Unfolding a solid into a flat net helps you see all the faces.
- Rectangular prism: SA = 2lw + 2lh + 2wh.
- Cylinder: SA = 2πr² + 2πrh (two circles plus the rectangle that wraps around).
- Cone: SA = πr² + πrℓ (ℓ is the slant height).
- Sphere: SA = 4πr².
ex: Find the surface area of a cylinder with radius 3 and height 10
> Two circles: 2π(3)² = 18π
> Side: 2π(3)(10) = 60π
= 78π ≈ 245 square units
term: surface area = the total area of all the faces or surfaces of a solid
term: net = a flat pattern that folds into a three-dimensional figure
term: slant height = the height of a lateral face of a pyramid or cone, measured along its surface
q: What is the surface area of a cube with edge 4? | *96 | 64 | 16 | 48
why: 6 faces × 4² = 96.
q: What is the surface area of a sphere with radius 5? | *100π | 25π | 500π/3 | 20π
why: 4π(5)² = 100π.

@lesson Volume
say: Volume measures how much space a solid takes up. Pointy shapes hold exactly one third of their matching prism!
- Prism and cylinder: V = Bh (B is the area of the base). Cylinder: V = πr²h.
- Pyramid and cone: V = ⅓Bh. Cone: V = ⅓πr²h.
- Sphere: V = (4/3)πr³.
ex: A cone has radius 6 and height 10. Find its volume.
> V = ⅓π(6)²(10)
> ⅓ × 36 × 10 = 120
= 120π ≈ 377 cubic units
Cavalieri's Principle: if two solids have the same height and the same cross-section area at every level, they have the same volume.
If a solid is scaled by a factor k, its volume is multiplied by k³.
term: volume = the number of cubic units a solid contains
term: Cavalieri's principle = solids with equal heights and equal cross-sectional areas at every level have equal volumes
q: A cylinder and a cone have the same radius and height. The cone's volume is… | *1/3 of the cylinder's | the same | 1/2 of the cylinder's | 3 times the cylinder's
why: V(cone) = ⅓πr²h.
q: A cube's edges are doubled. Its volume is multiplied by… | *8 | 2 | 4 | 6
why: Volume scales by k³ = 2³ = 8.
gen: geo.volume
`;
