export default String.raw`
@course data-structures | Data Structures & Algorithms | College | 🌲 | Computer Science

@unit Algorithm Analysis | Big-O notation, recursion
@lesson Big-O notation
say: Big-O notation describes how an algorithm's running time grows as the input gets larger. It's how programmers compare algorithms.
key: Big-O describes the growth rate of the worst case, ignoring constants and smaller terms.
Common complexities from fastest to slowest:
- O(1): constant (array access by index).
- O(log n): logarithmic (binary search).
- O(n): linear (scanning a list).
- O(n log n): linearithmic (merge sort).
- O(n²): quadratic (nested loops, bubble sort).
- O(2ⁿ): exponential (trying every subset).
ex: What is the Big-O of a loop inside a loop, each running n times?
> The inner loop runs n times for each of the n outer iterations
= O(n²)
Space complexity measures extra memory used, with the same notation.
term: Big-O notation = a description of how running time grows with input size in the worst case
term: time complexity = how the running time of an algorithm grows with input size
term: space complexity = how much extra memory an algorithm uses as input grows
term: logarithmic time = O(log n), growth that slows as input doubles
q: Which is fastest for large inputs? | *O(log n) | O(n) | O(n²) | O(2ⁿ)
why: Logarithmic growth is very slow.
q: 3n² + 5n + 2 simplifies to… | *O(n²) | O(n) | O(3n²) | O(1)
why: Drop constants and lower-order terms.
gen: bank.CS.algorithms

@lesson Recursion
say: A recursive function solves a problem by calling itself on smaller pieces. Many data structures are naturally recursive.
key: Every recursive function needs a base case (stops the recursion) and a recursive case (moves toward the base case).
code:
| def factorial(n):
|     if n <= 1:
|         return 1
|     return n * factorial(n - 1)
Each call is added to the call stack. Too many calls without reaching a base case cause a stack overflow.
Recurrence relations describe recursive running times: T(n) = 2T(n/2) + n (merge sort) solves to O(n log n). Memoization stores results of repeated calls to avoid recomputation, turning exponential recursive Fibonacci into linear time.
term: recursion = a function calling itself to solve smaller subproblems
term: base case = the condition that stops recursion
term: call stack = the structure that tracks active function calls
term: memoization = storing results of function calls to avoid repeating work
q: What does factorial(4) return? | *24 | 10 | 4 | 16
why: 4 × 3 × 2 × 1.
q: Naive recursive Fibonacci is slow because it… | *recomputes the same values many times | has no base case | uses loops | is O(1)
why: Memoization fixes the repeated work.
gen: csa.u10b

@unit Linear Data Structures | Arrays and linked lists, stacks and queues
@lesson Arrays and linked lists
say: Arrays and linked lists both store sequences, but they make different trade-offs.
key: Arrays store elements in contiguous memory: O(1) access by index, but inserting or deleting in the middle is O(n) because elements shift. Dynamic arrays (Python lists, Java ArrayList) resize automatically.
Linked lists store nodes, each with data and a pointer to the next node: O(1) insertion and deletion at a known position (no shifting), but O(n) access because you must walk the list.
Doubly linked lists have pointers in both directions.
ex: You need to read the 1,000th element quickly. Array or linked list?
> Array access by index is O(1)
= Array (a linked list would need 1,000 steps)
term: array = a collection of elements stored in contiguous memory, accessed by index
term: linked list = a sequence of nodes where each points to the next
term: node = an element in a linked structure holding data and pointers
term: dynamic array = an array that resizes itself as elements are added
q: Accessing an element by index in an array is… | *O(1) | O(n) | O(log n) | O(n²)
why: The position can be calculated directly.
q: Which is faster for inserting at the front? | *Linked list | Array | Same | Neither works
why: No elements need to shift.
gen: csa.u6a, csa.u7a

@lesson Stacks and queues
say: Stacks and queues control the order in which items are processed. They power undo buttons, printers and more.
key: A stack is LIFO (last in, first out): push adds to the top, pop removes from the top. Uses: undo history, the call stack, checking balanced parentheses, depth-first search.
A queue is FIFO (first in, first out): enqueue adds to the back, dequeue removes from the front. Uses: print jobs, task scheduling, breadth-first search.
All main operations are O(1).
ex: Push 1, 2, 3 onto a stack, then pop twice. What's left?
> After pushes: 1, 2, 3 (top is 3)
> Pop removes 3, then 2
= 1 remains
A priority queue removes the highest-priority item first (usually implemented with a heap).
term: stack = a last-in, first-out data structure
term: queue = a first-in, first-out data structure
term: LIFO = last in, first out
term: priority queue = a structure that removes items in order of priority
q: Which structure would you use for an undo feature? | *Stack | Queue | Array only | Hash table
why: The most recent action is undone first.
q: Enqueue A, B, C then dequeue once. What's removed? | *A | C | B | Nothing
why: Queues are first in, first out.

@unit Trees and Hashing | Binary search trees, heaps, hash tables
@lesson Binary search trees and heaps
say: Trees organize data hierarchically, making searching and sorting fast.
key: A binary search tree (BST): for every node, values in the left subtree are smaller and values in the right subtree are larger. Search, insert and delete take O(log n) on a balanced tree but O(n) if it becomes a long chain. Self-balancing trees (AVL, red-black) keep it O(log n).
Traversals: inorder (left, node, right) visits a BST in sorted order; preorder and postorder are useful for copying and deleting trees.
A heap is a complete binary tree where each parent is smaller (min-heap) or larger (max-heap) than its children. It gives O(1) access to the min or max, with O(log n) insert and remove, and is used for priority queues and heapsort.
term: binary search tree = a binary tree where left descendants are smaller and right descendants are larger
term: balanced tree = a tree whose height stays O(log n)
term: inorder traversal = visiting left subtree, node, then right subtree
term: heap = a complete binary tree where parents are ordered relative to children
q: Inorder traversal of a BST produces values… | *in sorted order | in random order | in reverse insertion order | only leaves
why: Left (smaller), node, right (larger).
q: Inserting sorted data into a plain BST creates… | *a long chain with O(n) search | a perfectly balanced tree | a heap | a hash table
why: Each new value goes to the right.

@lesson Hash tables
say: Hash tables give near-instant lookups. They're behind dictionaries, sets and databases.
key: A hash table uses a hash function to convert a key into an array index. Average-case insert, delete and lookup are O(1).
Collisions happen when two keys hash to the same index. Solutions:
- Chaining: each slot holds a list of entries.
- Open addressing: probe for the next open slot (linear probing).
The load factor (items ÷ slots) affects performance; tables resize when it gets too high. A good hash function spreads keys evenly.
Hash tables don't keep keys in order, so finding the minimum or iterating in sorted order is slow.
ex: You need to check whether a username already exists among millions. Which structure?
> Lookups must be fast; order doesn't matter
= A hash set (average O(1) lookups)
term: hash table = a structure that maps keys to values using a hash function
term: hash function = a function converting a key into an array index
term: collision = when two keys hash to the same index
term: load factor = the ratio of stored items to available slots
q: Average lookup time in a hash table is… | *O(1) | O(n) | O(log n) | O(n²)
why: The hash function points directly to the slot.
q: Storing a list at each slot to handle collisions is called… | *chaining | probing | hashing | sorting
why: Each slot chains together colliding entries.

@unit Sorting and Graphs | Sorting algorithms, graph algorithms
@lesson Sorting algorithms
say: Sorting is one of the most studied problems in computer science. Different algorithms trade simplicity for speed.
- Bubble, selection and insertion sort: simple, O(n²). Insertion sort is fast for nearly sorted data.
- Merge sort: divide in half, sort each half recursively, merge. Always O(n log n) but needs extra memory.
- Quicksort: pick a pivot, partition, recurse. Average O(n log n), worst case O(n²), very fast in practice.
- Heapsort: O(n log n) using a heap, in place.
key: Comparison-based sorting can't beat O(n log n) in the worst case. A stable sort keeps equal elements in their original order (merge sort is stable; quicksort usually isn't).
ex: After one pass of selection sort on [7, 3, 9, 1], what is the list?
> Find the smallest (1) and swap it to the front
= [1, 3, 9, 7]
term: merge sort = a divide-and-conquer sort that splits, sorts and merges
term: quicksort = a sort that partitions around a pivot and recurses
term: stable sort = a sort that preserves the order of equal elements
term: divide and conquer = solving a problem by splitting it into smaller subproblems
q: Which sort guarantees O(n log n) in the worst case? | *Merge sort | Quicksort | Bubble sort | Insertion sort
why: It always splits evenly.
q: Which sort is efficient on nearly sorted data? | *Insertion sort | Selection sort | Bubble sort always | Heapsort only
why: Few elements need to move.
gen: csa.u6c

@lesson Graph algorithms
say: Graphs model networks like maps and social media. Graph algorithms find paths and connections.
key: Graphs are stored as adjacency lists (efficient for sparse graphs) or adjacency matrices (fast edge lookups, more memory).
- Breadth-first search (BFS) uses a queue and explores level by level; it finds shortest paths in unweighted graphs.
- Depth-first search (DFS) uses a stack (or recursion) and explores as deep as possible; it's used for detecting cycles and topological sorting.
- Dijkstra's algorithm finds shortest paths in graphs with nonnegative weights, using a priority queue.
- Minimum spanning tree algorithms (Kruskal's, Prim's) connect all vertices at minimum total cost.
BFS and DFS run in O(V + E) time.
term: breadth-first search = a graph search that explores neighbors level by level using a queue
term: depth-first search = a graph search that explores as far as possible before backtracking
term: Dijkstra's algorithm = an algorithm for shortest paths in weighted graphs without negative edges
term: adjacency list = a graph representation listing each vertex's neighbors
q: Which algorithm finds the shortest path in an unweighted graph? | *BFS | DFS | Merge sort | Heapsort
why: BFS explores in order of distance.
q: Dijkstra's algorithm doesn't work correctly with… | *negative edge weights | positive weights | undirected graphs | trees
why: It assumes paths only get longer.
`;
