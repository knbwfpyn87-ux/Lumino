export default String.raw`
@course linalg | Linear Algebra | College | 🧊 | Math

@unit Linear Systems and Matrices | Systems of equations, row reduction, matrix operations
@lesson Systems and row reduction
say: Linear algebra studies systems of linear equations, and it powers graphics, data science and machine learning.
A system of linear equations can have one solution, no solution, or infinitely many solutions.
key: Gaussian elimination uses row operations (swap rows, scale a row, add a multiple of one row to another) to reduce an augmented matrix to echelon form, then back-substitution solves it.
Reduced row echelon form (RREF) has leading 1s with zeros above and below them. Pivot columns correspond to basic variables; other variables are free.
ex: What does a row [0 0 0 | 5] in echelon form mean?
> It says 0 = 5
= The system has no solution (it's inconsistent)
A system with at least one free variable (and consistent) has infinitely many solutions.
term: augmented matrix = a matrix of coefficients with the constants added as a final column
term: row echelon form = a staircase form produced by row reduction
term: pivot = the leading nonzero entry in a row of an echelon matrix
term: free variable = a variable not tied to a pivot, which can take any value
q: A consistent system has one free variable. How many solutions? | *Infinitely many | Exactly one | None | Two
why: The free variable can be anything.
q: Which is a valid row operation? | *Adding a multiple of one row to another | Squaring a row | Deleting a row | Adding 1 to every entry
why: Row operations preserve the solution set.
gen: system2

@lesson Matrix operations
say: Matrices can be added, multiplied and inverted. Matrix multiplication is the core operation of linear algebra.
key: To multiply AB, the number of columns of A must equal the number of rows of B. Entry (i, j) is the dot product of row i of A and column j of B.
Matrix multiplication is not commutative: AB usually ≠ BA. The identity matrix I satisfies AI = IA = A.
An inverse A⁻¹ satisfies AA⁻¹ = I. For a 2×2 matrix [[a, b], [c, d]], A⁻¹ = (1/(ad − bc))[[d, −b], [−c, a]], which exists only if ad − bc ≠ 0.
ex: Multiply [[1, 2], [3, 4]] by the vector [5, 6].
> Row 1: 1·5 + 2·6 = 17
> Row 2: 3·5 + 4·6 = 39
= [17, 39]
term: matrix multiplication = combining matrices by taking dot products of rows and columns
term: identity matrix = a square matrix with 1s on the diagonal and 0s elsewhere
term: inverse matrix = a matrix that multiplies with A to give the identity
q: A is 2×3 and B is 3×4. What size is AB? | *2×4 | 3×3 | 2×3 | 4×2
why: Outer dimensions give the result.
q: Is matrix multiplication commutative in general? | *No | Yes | Only for 2×2 matrices | Only for vectors
why: AB and BA usually differ.
gen: stem.matvec

@unit Determinants | Computing determinants, properties and meaning
@lesson Determinants
say: The determinant is a single number that tells you whether a matrix is invertible and how it scales area or volume.
key: For a 2×2 matrix, det = ad − bc. A matrix is invertible exactly when its determinant is nonzero.
For larger matrices, use cofactor expansion along a row or column, or row-reduce to triangular form (the determinant is then the product of the diagonal entries, adjusted for row swaps and scalings).
Geometric meaning: |det A| is the factor by which A scales areas (2D) or volumes (3D). A negative determinant means orientation is reversed.
ex: Find det [[2, 3], [1, 4]].
> 2·4 − 3·1
= 5 (areas are scaled by 5)
Properties: det(AB) = det(A)det(B); swapping two rows changes the sign; a row of zeros gives det = 0.
term: determinant = a number computed from a square matrix that measures scaling and invertibility
term: cofactor expansion = computing a determinant using minors along a row or column
term: singular matrix = a matrix with determinant zero, which has no inverse
q: det [[3, 6], [1, 2]] = | *0 | 12 | 6 | −6
why: 3·2 − 6·1 = 0, so it's singular.
q: det(A) = 4 and det(B) = 3. det(AB) = | *12 | 7 | 1 | 4/3
why: Determinants multiply.
gen: stem.det2

@lesson Cramer's rule and applications
say: Determinants also solve systems directly and compute areas of shapes.
key: Cramer's rule: for Ax = b with det A ≠ 0, xᵢ = det(Aᵢ)/det(A), where Aᵢ replaces column i of A with b.
ex: Solve 2x + y = 5, x + 3y = 10 with Cramer's rule.
> det A = 2·3 − 1·1 = 5
> x = det[[5, 1], [10, 3]]/5 = (15 − 10)/5 = 1
= x = 1, and y = det[[2, 5], [1, 10]]/5 = 15/5 = 3
Area of a parallelogram spanned by vectors u and v in 2D is |det[u v]|; the volume of a parallelepiped spanned by three vectors in 3D is |det[u v w]|.
Cramer's rule is elegant but slow for large systems; row reduction is used in practice.
term: Cramer's rule = solving a linear system using ratios of determinants
term: parallelogram area = the absolute value of the determinant of the two spanning vectors
q: The area of the parallelogram spanned by ⟨3, 0⟩ and ⟨1, 2⟩ is… | *6 | 3 | 5 | 2
why: |3·2 − 0·1| = 6.
q: Cramer's rule requires… | *a nonzero determinant | a zero determinant | a 3×3 matrix only | no solution
why: You divide by det A.

@unit Vector Spaces | Vectors and linear combinations, span and independence, basis and dimension
@lesson Vectors, span and independence
say: Vector spaces generalize arrows to any objects you can add and scale. Span and independence describe their structure.
A linear combination of vectors v₁, …, vₖ is c₁v₁ + … + cₖvₖ. The span is the set of all linear combinations.
key: Vectors are linearly independent if the only solution to c₁v₁ + … + cₖvₖ = 0 is all cᵢ = 0. Otherwise, one vector can be written using the others (dependent).
In ℝⁿ, more than n vectors are always dependent. Two vectors in ℝ² are independent unless they lie on the same line.
ex: Are ⟨1, 2⟩ and ⟨2, 4⟩ independent?
> ⟨2, 4⟩ = 2⟨1, 2⟩
= No, they're dependent (they lie on the same line)
term: linear combination = a sum of vectors multiplied by scalars
term: span = the set of all linear combinations of a set of vectors
term: linear independence = no vector in the set is a combination of the others
q: Can 3 vectors in ℝ² be linearly independent? | *No | Yes | Only if they're unit vectors | Only if one is zero
why: ℝ² has dimension 2.
q: The span of ⟨1, 0⟩ and ⟨0, 1⟩ is… | *all of ℝ² | a line | a point | empty
why: Every vector ⟨a, b⟩ = a⟨1, 0⟩ + b⟨0, 1⟩.
gen: stem.dot, stem.magnitude

@lesson Basis, dimension and subspaces
say: A basis is a minimal set of building blocks for a space. Its size is the dimension.
key: A basis is a linearly independent set that spans the space. Every basis of a space has the same number of vectors: the dimension.
Subspaces are subsets closed under addition and scalar multiplication that contain the zero vector. Important subspaces of a matrix A:
- Column space: the span of A's columns (all possible outputs Ax).
- Null space: all x with Ax = 0.
Rank–nullity theorem: rank(A) + nullity(A) = number of columns, where rank = dim(column space) and nullity = dim(null space).
ex: A 4×6 matrix has rank 3. What is its nullity?
> rank + nullity = 6 columns
= nullity = 3
term: basis = a linearly independent set that spans a vector space
term: dimension = the number of vectors in a basis
term: null space = the set of all solutions to Ax = 0
term: rank = the dimension of a matrix's column space
q: What is the dimension of ℝ³? | *3 | 1 | 9 | infinite
why: The standard basis has 3 vectors.
q: Which must every subspace contain? | *The zero vector | All vectors | A basis of size 1 | Only unit vectors
why: Closure under scalar multiplication by 0 requires it.

@unit Eigenvalues and Eigenvectors | Eigenvalues, eigenvectors and diagonalization
@lesson Eigenvalues and eigenvectors
say: Eigenvectors are special directions that a matrix only stretches, never turns. They reveal a matrix's deepest behavior.
key: v is an eigenvector of A with eigenvalue λ if Av = λv (v ≠ 0). Find eigenvalues by solving det(A − λI) = 0, the characteristic equation.
ex: Find the eigenvalues of [[2, 0], [0, 5]].
> det [[2 − λ, 0], [0, 5 − λ]] = (2 − λ)(5 − λ) = 0
= λ = 2 and λ = 5
For each eigenvalue, solve (A − λI)v = 0 to find its eigenvectors. The eigenvalues of a triangular matrix are its diagonal entries.
Applications: Google's PageRank, population models, vibration analysis and principal component analysis in data science.
term: eigenvector = a nonzero vector whose direction is unchanged by a matrix
term: eigenvalue = the scale factor λ for an eigenvector, where Av = λv
term: characteristic equation = det(A − λI) = 0, whose roots are the eigenvalues
q: If Av = 3v, then 3 is… | *an eigenvalue of A | the determinant of A | the dimension | an eigenvector
why: λ = 3 scales v.
q: The eigenvalues of [[4, 1], [0, 7]] are… | *4 and 7 | 1 and 0 | 4 and 1 | 11 and 28
why: For triangular matrices, they're the diagonal entries.

@lesson Diagonalization
say: Diagonalization turns a complicated matrix into a simple diagonal one, making powers and long-run behavior easy to compute.
key: A is diagonalizable if A = PDP⁻¹, where D is diagonal (eigenvalues) and P's columns are eigenvectors. An n×n matrix is diagonalizable if it has n linearly independent eigenvectors.
Powers become easy: Aᵏ = PDᵏP⁻¹, and Dᵏ just raises each diagonal entry to the kth power.
ex: A has eigenvalues 1 and 0.5. What happens to Aᵏx as k grows (for a typical x)?
> The 0.5ᵏ component shrinks to 0
= Aᵏx approaches the eigenvector direction with eigenvalue 1 (a steady state)
This idea explains Markov chains: long-term probabilities settle into the eigenvector for eigenvalue 1. Symmetric matrices are always diagonalizable with perpendicular eigenvectors.
term: diagonalization = writing A = PDP⁻¹ with D diagonal
term: Markov chain = a process that moves between states with fixed transition probabilities
term: steady state = a vector that remains unchanged by repeated application of a matrix
q: Why is diagonalization useful for computing A¹⁰⁰? | *Powers of a diagonal matrix are easy to compute | It removes the need for eigenvalues | It makes A zero | It isn't useful
why: Just raise each diagonal entry to the 100th power.
q: An n×n matrix is diagonalizable if it has… | *n linearly independent eigenvectors | a zero determinant | one eigenvalue | no inverse
why: Those eigenvectors form the columns of P.
`;
