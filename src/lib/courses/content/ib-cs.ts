export default String.raw`
@course ib-cs | IB Computer Science | IB | 💾 | IB

// Follows the IB Computer Science guide (first assessment 2027): Theme A, Concepts of computer science (system fundamentals, networks, databases, machine learning), and Theme B, Computational thinking and problem-solving (programming, OOP, abstract data types).

@unit A1–A2: Computer Fundamentals and Networks | Hardware, data representation, logic, networks
@lesson Hardware and data representation
say: Theme A begins inside the machine: what a computer is made of and how it stores everything as bits.
key: The CPU contains the control unit (CU), arithmetic logic unit (ALU) and registers (program counter, MAR, MDR, accumulator). It runs the fetch–decode–execute cycle. GPUs have many simple cores for parallel tasks such as graphics and machine learning.
Memory hierarchy: registers → cache (L1, L2, L3) → RAM → secondary storage (SSD, HDD). Faster memory is smaller and more expensive. RAM is volatile; ROM and secondary storage are non-volatile.
Data representation: binary (base 2), hexadecimal (base 16, one hex digit = 4 bits), and characters (ASCII, Unicode). Logic gates (AND, OR, NOT, NAND, NOR, XOR) combine bits; truth tables list every input combination.
ex: Convert binary 1011 0110 to hexadecimal.
> Split into nibbles: 1011 = 11 = B, 0110 = 6
= B6
term: ALU = the part of the CPU that performs arithmetic and logical operations
term: cache = small, fast memory close to the CPU that stores frequently used data
term: volatile memory = memory that loses its contents when power is off
term: hexadecimal = a base-16 number system using digits 0–9 and A–F
q: Which register holds the address of the next instruction? | *Program counter | Accumulator | MDR | Cache
why: The PC points to the next instruction to fetch.
q: How many bits does one hexadecimal digit represent? | *4 | 8 | 2 | 16
why: 16 = 2⁴.
gen: stem.binDec, stem.bitsNeeded, stem.gates

@lesson Operating systems and networks
say: Computers rarely work alone. The operating system manages one machine; networks connect many.
key: An operating system manages memory, processes (scheduling), files, devices (drivers), security and the user interface. Interrupts let hardware signal the CPU; polling checks devices repeatedly.
Networks: LAN, WAN, VPN and PAN. Devices include switches, routers and access points. The TCP/IP model has layers: application, transport (TCP reliable, UDP fast), internet (IP addresses, routing) and network access.
Data travels in packets; packet switching sends them along different routes. Security uses encryption (symmetric and asymmetric), firewalls, and authentication.
term: protocol = a set of rules governing how data is transmitted
term: packet switching = splitting data into packets that travel independently across a network
term: firewall = a system that filters network traffic using security rules
term: asymmetric encryption = encryption using a public key to encrypt and a private key to decrypt
q: Which transport protocol guarantees ordered, reliable delivery? | *TCP | UDP | IP | HTTP
why: TCP uses acknowledgments and retransmission.
q: A VPN mainly provides… | *a secure, encrypted connection over a public network | faster CPUs | more RAM | a local printer
why: It tunnels traffic securely.
gen: bank.CS.systems, bank.CS.internet

@unit A3–A4: Databases and Machine Learning | Relational databases, SQL, ML concepts and ethics
@lesson Databases
say: Nearly every app stores data in a database. Good design keeps it consistent and easy to query.
key: A relational database stores data in tables (relations) of records (rows) and fields (columns). A primary key uniquely identifies each record; a foreign key links to another table's primary key.
Normalization (1NF, 2NF, 3NF) removes redundancy and update anomalies. SQL queries data: SELECT fields FROM table WHERE condition ORDER BY field; joins combine tables.
Transactions follow ACID properties: atomicity, consistency, isolation and durability.
code:
| SELECT name, grade
| FROM Students
| WHERE grade >= 90
| ORDER BY name;
term: primary key = a field that uniquely identifies each record in a table
term: foreign key = a field that refers to the primary key of another table
term: normalization = organizing tables to reduce redundancy
term: atomicity = a transaction completes entirely or not at all
q: Which SQL clause filters rows? | *WHERE | SELECT | FROM | ORDER BY
why: WHERE sets the condition.
q: Normalization mainly reduces… | *data redundancy | query speed | the number of users | encryption
why: Each fact is stored once.

@lesson Machine learning
say: Machine learning lets computers learn patterns from data instead of following hand-written rules.
key: Supervised learning trains on labeled data (classification, regression). Unsupervised learning finds structure in unlabeled data (clustering). Reinforcement learning learns by rewards and penalties.
Data is split into training and test sets. Overfitting means a model memorizes training data and generalizes poorly; underfitting means it's too simple. Neural networks pass inputs through weighted layers.
Ethics: biased training data produces biased predictions; issues include privacy, transparency (explainability), accountability and environmental cost.
tip: For ethics questions, name a specific stakeholder, explain how the system affects them, and suggest a safeguard such as auditing training data or keeping a human in the loop.
term: supervised learning = learning from labeled examples
term: overfitting = a model fitting training data so closely that it fails on new data
term: clustering = grouping similar data points without labels
term: algorithmic bias = systematic unfairness in a model's outputs
q: Grouping customers by purchase habits without labels is… | *unsupervised learning | supervised learning | reinforcement learning | normalization
why: No labels are provided.
q: A model scores 99% on training data but 60% on test data. This suggests… | *overfitting | underfitting | perfect generalization | a hardware fault
why: It memorized instead of generalizing.

@unit B: Computational Thinking and Programming | Algorithms, OOP, abstract data types
@lesson Algorithms and computational thinking
say: Theme B is about solving problems: breaking them down and writing efficient algorithms.
key: Computational thinking: decomposition, pattern recognition, abstraction and algorithmic design.
Searching: linear search is O(n); binary search on sorted data is O(log n). Sorting: bubble sort and selection sort are O(n²). Big-O describes how time grows with input size.
Recursion: a function calls itself with a smaller input and needs a base case. Tracing with trace tables checks how variables change.
ex: How many comparisons, at most, does binary search need for 1,024 sorted items?
> Each step halves the list: 2¹⁰ = 1,024
= 10 comparisons (plus one final check)
term: abstraction = removing unnecessary detail to focus on what matters
term: decomposition = breaking a problem into smaller sub-problems
term: base case = the condition that stops recursion
term: Big-O notation = a description of how an algorithm's running time grows
q: Binary search requires the data to be… | *sorted | unsorted | in a stack | in a hash table
why: It discards half based on order.
q: A recursive function without a base case will… | *recurse until stack overflow | run once | return 0 | sort data
why: Nothing stops the calls.
gen: bank.CS.algorithms, stem.logic

@lesson Object-oriented programming and data structures
say: Large programs are organized into objects, and data is stored in structures chosen for the task.
key: OOP concepts: a class is a blueprint; an object is an instance. Encapsulation hides data behind methods; inheritance lets subclasses reuse and extend a parent class; polymorphism lets one method call behave differently by object type. UML class diagrams show classes, attributes and methods.
Abstract data types: a stack is LIFO (push, pop); a queue is FIFO (enqueue, dequeue); a linked list connects nodes with pointers; a binary search tree keeps smaller values left and larger right; hash tables give near O(1) lookup.
term: encapsulation = bundling data with methods and restricting direct access
term: inheritance = a class acquiring the attributes and methods of a parent class
term: stack = a last-in, first-out data structure
term: queue = a first-in, first-out data structure
q: Which structure suits an "undo" feature? | *Stack | Queue | Hash table | Array sorted by date
why: The last action is undone first.
q: Overriding a parent's method in a subclass demonstrates… | *polymorphism | encapsulation | normalization | recursion
why: The same call behaves differently.
gen: bank.CS.basics
`;
