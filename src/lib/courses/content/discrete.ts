export default String.raw`
@course discrete | Discrete Math | College | 🧮 | Math

@unit Logic and Proofs | Propositional logic, quantifiers, proof techniques
@lesson Propositional logic
say: Discrete math is the math of computer science. It starts with logic: the rules of valid reasoning.
A proposition is a statement that is either true or false. Logical connectives combine them: ¬ (not), ∧ (and), ∨ (or), → (if-then), ↔ (if and only if).
key: p → q is false only when p is true and q is false. Its contrapositive ¬q → ¬p is logically equivalent; its converse q → p is not.
Truth tables list every combination of truth values. Two statements are logically equivalent if their truth tables match. De Morgan's laws: ¬(p ∧ q) ≡ ¬p ∨ ¬q and ¬(p ∨ q) ≡ ¬p ∧ ¬q.
ex: When is "If it rains, then the game is canceled" false?
> An implication is false only when the hypothesis is true and the conclusion is false
= When it rains and the game is NOT canceled
term: proposition = a statement that is either true or false
term: implication = a statement of the form "if p, then q"
term: contrapositive = the statement ¬q → ¬p, equivalent to p → q
term: tautology = a statement that is always true
q: p is false and q is true. What is p → q? | *True | False | Undefined | Both
why: An implication with a false hypothesis is true.
q: ¬(p ∧ q) is equivalent to… | *¬p ∨ ¬q | ¬p ∧ ¬q | p ∨ q | p → q
why: De Morgan's law.
gen: stem.logic

@lesson Quantifiers and proof techniques
say: Mathematicians prove things with airtight logic. Let's learn the main proof strategies.
Quantifiers: ∀ ("for all") and ∃ ("there exists"). Negating swaps them: ¬∀x P(x) ≡ ∃x ¬P(x).
key: Proof techniques: direct proof (assume p, show q), proof by contrapositive (assume ¬q, show ¬p), proof by contradiction (assume the statement is false and derive a contradiction), and mathematical induction.
Induction proves a statement for all n ≥ 1: prove the base case P(1), then show P(k) → P(k + 1).
ex: Prove the sum of two even numbers is even.
> Let a = 2m and b = 2n for integers m, n
> a + b = 2m + 2n = 2(m + n)
= a + b is 2 times an integer, so it's even
A single counterexample disproves a "for all" statement.
term: universal quantifier = ∀, meaning "for all"
term: existential quantifier = ∃, meaning "there exists"
term: proof by contradiction = assuming the opposite of a claim and deriving a contradiction
term: mathematical induction = proving a base case and that each case implies the next
q: How do you disprove "All primes are odd"? | *Give the counterexample 2 | Prove it by induction | Show 3 is prime | It can't be disproved
why: 2 is an even prime.
q: The negation of "∀x, P(x)" is… | *∃x, ¬P(x) | ∀x, ¬P(x) | ∃x, P(x) | ¬∃x, P(x)
why: Not everything has P means something lacks P.

@unit Sets, Functions and Relations | Set operations, functions, relations
@lesson Sets and functions
say: Sets are collections of objects. They're the language for describing everything in discrete math.
Set operations: union A ∪ B (in either), intersection A ∩ B (in both), difference A − B, and complement. |A| is the number of elements. The power set of A has 2^|A| subsets.
key: Inclusion–exclusion: |A ∪ B| = |A| + |B| − |A ∩ B|.
A function f: A → B assigns each element of A exactly one element of B.
- Injective (one-to-one): different inputs give different outputs.
- Surjective (onto): every element of B is hit.
- Bijective: both, so the function has an inverse.
ex: 30 students take math, 20 take art, 8 take both. How many take at least one?
> 30 + 20 − 8
= 42
term: union = the set of elements in either set
term: intersection = the set of elements in both sets
term: bijection = a function that is both one-to-one and onto
term: power set = the set of all subsets of a set
q: How many subsets does a 4-element set have? | *16 | 8 | 4 | 24
why: 2⁴ = 16.
q: A function where every output is used is… | *surjective (onto) | injective only | not a function | constant
why: Onto means every element of the codomain is hit.

@lesson Relations
say: Relations describe connections between elements, like "is less than" or "is friends with."
A relation on a set A is a set of ordered pairs from A. Properties:
- Reflexive: every element relates to itself (a R a).
- Symmetric: a R b implies b R a.
- Antisymmetric: a R b and b R a imply a = b.
- Transitive: a R b and b R c imply a R c.
key: An equivalence relation is reflexive, symmetric and transitive; it splits a set into equivalence classes. A partial order is reflexive, antisymmetric and transitive.
ex: Is "has the same birthday as" an equivalence relation?
> Reflexive, symmetric and transitive all hold
= Yes; the equivalence classes are the groups sharing a birthday
term: equivalence relation = a relation that is reflexive, symmetric and transitive
term: transitive relation = if a relates to b and b relates to c, then a relates to c
term: equivalence class = the set of all elements related to a given element
q: "Is less than" (<) on numbers is NOT… | *reflexive | transitive | a relation | defined
why: No number is less than itself.
q: Congruence mod 5 is an example of a(n)… | *equivalence relation | function only | partial order | empty relation
why: It's reflexive, symmetric and transitive.

@unit Number Theory | Divisibility and primes, modular arithmetic, GCD and the Euclidean algorithm
@lesson Divisibility, primes and the Euclidean algorithm
say: Number theory studies whole numbers. It powers modern cryptography.
a divides b (written a | b) if b = ak for some integer k. A prime has exactly two positive divisors: 1 and itself.
key: Fundamental Theorem of Arithmetic: every integer greater than 1 has a unique prime factorization.
The Euclidean algorithm finds the GCD quickly: gcd(a, b) = gcd(b, a mod b), repeating until the remainder is 0.
ex: Find gcd(84, 36).
> 84 = 2·36 + 12, so gcd(36, 12)
> 36 = 3·12 + 0
= gcd = 12
lcm(a, b) = ab / gcd(a, b).
term: prime number = an integer greater than 1 with exactly two divisors
term: greatest common divisor = the largest integer dividing both numbers
term: Euclidean algorithm = a fast method for finding the GCD using repeated division
q: What is the prime factorization of 60? | *2² · 3 · 5 | 2 · 30 | 6 · 10 | 2 · 3 · 10
why: 60 = 4 × 3 × 5.
q: gcd(18, 24) = | *6 | 3 | 12 | 72
why: 6 is the largest common divisor.
gen: stem.gcdLcm

@lesson Modular arithmetic
say: Modular arithmetic is "clock math": numbers wrap around after reaching the modulus.
key: a ≡ b (mod n) means n divides a − b, or equivalently a and b have the same remainder when divided by n.
You can add, subtract and multiply in mod n and reduce at any step: (a · b) mod n = ((a mod n)(b mod n)) mod n.
ex: What is 7¹⁰⁰ mod 6?
> 7 ≡ 1 (mod 6)
> 1¹⁰⁰ = 1
= 1
Applications: checking digits (ISBNs, credit cards), hashing, and RSA encryption, which relies on the difficulty of factoring large numbers.
term: modulus = the number at which modular arithmetic wraps around
term: congruence = a ≡ b (mod n) when a and b leave the same remainder
term: RSA = a public-key encryption system based on modular arithmetic and prime factorization
q: 17 mod 5 = | *2 | 3 | 5 | 12
why: 17 = 3·5 + 2.
q: If it's 10 o'clock now, what time is it in 50 hours (12-hour clock)? | *12 o'clock | 10 o'clock | 2 o'clock | 6 o'clock
why: 60 mod 12 = 0, which is 12 on a clock.
gen: stem.modArith

@unit Counting and Probability | Counting principles, permutations and combinations, discrete probability
@lesson Counting principles
say: Counting cleverly is a superpower. It lets you count huge numbers of possibilities without listing them.
key: Product rule: if a task has m ways then n ways, there are m·n ways. Sum rule: if a task can be done in m OR n ways (no overlap), there are m + n ways.
Permutations (order matters): P(n, r) = n!/(n − r)!. Combinations (order doesn't matter): C(n, r) = n!/(r!(n − r)!).
ex: How many 5-card hands come from a 52-card deck?
> Order doesn't matter: C(52, 5)
= 2,598,960
The pigeonhole principle: if n + 1 objects go into n boxes, some box gets at least two.
term: permutation = an ordered arrangement
term: combination = an unordered selection
term: pigeonhole principle = if more items than boxes, some box holds two or more
q: How many ways can 4 runners finish 1st, 2nd and 3rd? | *24 | 4 | 12 | 64
why: 4 × 3 × 2.
q: Among 13 people, at least two share a birth month because of… | *the pigeonhole principle | induction | De Morgan's law | the product rule
why: 13 people, 12 months.
gen: stem.combos

@lesson Discrete probability
say: With counting skills, you can compute probabilities exactly.
key: For equally likely outcomes, P(E) = |E| / |S|, where S is the sample space.
Rules: P(not E) = 1 − P(E); for independent events P(A ∩ B) = P(A)P(B); conditional P(A | B) = P(A ∩ B)/P(B).
Expected value E[X] = Σ x·P(x) gives the long-run average outcome.
ex: You win $10 if you roll a 6 and pay $1 otherwise. What's the expected value?
> 10·(1/6) + (−1)·(5/6) = 10/6 − 5/6
= about $0.83 per game
Bayes' theorem updates probabilities with new evidence: P(A | B) = P(B | A)P(A)/P(B).
term: sample space = the set of all possible outcomes
term: expected value = the long-run average of a random variable
term: Bayes' theorem = a formula for updating probabilities given new evidence
q: Probability of exactly 2 heads in 3 coin flips? | *3/8 | 1/2 | 1/4 | 2/3
why: C(3, 2) = 3 outcomes out of 8.
q: A game's expected value is −$0.50. Over many games you should expect to… | *lose about 50 cents per game | win | break even | lose $50
why: Expected value is the long-run average.
gen: stem.diceSum, stem.expected

@unit Graphs and Trees | Graph terminology, paths and circuits, trees
@lesson Graphs
say: Graphs model networks: friendships, roads, the internet. They're everywhere in computer science.
A graph has vertices (nodes) connected by edges. The degree of a vertex is its number of edges.
key: Handshake theorem: the sum of all vertex degrees equals twice the number of edges, so the number of odd-degree vertices is always even.
- A path is a sequence of edges; a circuit is a path that returns to its start.
- An Euler circuit uses every edge exactly once; it exists in a connected graph exactly when every vertex has even degree.
- A Hamilton circuit visits every vertex exactly once.
Directed graphs have edges with directions; weighted graphs have costs on edges (shortest-path algorithms like Dijkstra's use them).
term: vertex = a point (node) in a graph
term: edge = a connection between two vertices
term: degree = the number of edges at a vertex
term: Euler circuit = a circuit that uses every edge exactly once
q: A graph has vertex degrees 3, 3, 2, 2. How many edges? | *5 | 10 | 4 | 6
why: Sum of degrees = 10 = 2 × edges.
q: A connected graph has an Euler circuit when… | *every vertex has even degree | every vertex has odd degree | it has no cycles | it's a tree
why: Each visit enters and leaves a vertex.

@lesson Trees
say: Trees are graphs with no cycles. They organize data in file systems, family trees and search algorithms.
key: A tree is a connected graph with no cycles. A tree with n vertices has exactly n − 1 edges.
A rooted tree has a designated root; vertices have parents and children, and vertices with no children are leaves. In a binary tree, each vertex has at most two children.
Binary search trees store data so searches can skip half the remaining data at each step. Traversals visit every vertex: preorder, inorder and postorder.
A spanning tree connects all vertices of a graph using a subset of its edges. Minimum spanning trees (Kruskal's or Prim's algorithm) connect everything at the lowest total cost.
term: tree = a connected graph with no cycles
term: leaf = a vertex in a rooted tree with no children
term: binary tree = a tree where each vertex has at most two children
term: spanning tree = a tree that includes every vertex of a graph
q: A tree has 12 vertices. How many edges? | *11 | 12 | 13 | 24
why: n − 1 edges.
q: Kruskal's algorithm finds a… | *minimum spanning tree | shortest path only | Euler circuit | prime factorization
why: It adds the cheapest edges without forming cycles.
`;
