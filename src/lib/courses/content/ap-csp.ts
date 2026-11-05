export default String.raw`
@course ap-csp | AP Computer Science Principles | AP | 🖥️ | Computer Science

// Follows the 5 Big Ideas of the AP Computer Science Principles Course and Exam Description.

@unit Creative Development | Collaboration, program function and purpose, program design and development, identifying and correcting errors
@lesson Collaboration and program design
say: Computing is creative and collaborative. Great programs start with understanding people's needs.
Programs are developed with a purpose: to solve a problem or express something creative. Developers consider users' needs through surveys, interviews and testing.
key: Collaboration brings in diverse perspectives, which helps avoid bias and produces better solutions. Pair programming has one person writing code (driver) while another reviews (navigator).
The development process is iterative: design, build, test and refine repeatedly. Programs take input (from users, sensors or files) and produce output (text, sound, visuals).
Documentation and comments explain how code works and give credit when using others' code.
term: iterative development = repeatedly designing, testing and improving a program
term: pair programming = two programmers working together at one computer
term: program input = data sent to a program, like user clicks or sensor readings
term: documentation = written explanation of how code works
q: Why does collaboration often improve programs? | *Diverse perspectives catch problems and add ideas | It makes code longer | It removes the need for testing | It's required by law
why: Different people notice different issues.
q: Iterative development means… | *repeatedly testing and improving | writing code once | never testing | only planning
why: Programs improve through cycles of refinement.

@lesson Finding and fixing errors
say: Every programmer makes mistakes. The skill is finding and fixing them efficiently.
- Syntax errors: the code breaks the language's rules (like a missing parenthesis) and won't run.
- Runtime errors: the program crashes while running (like dividing by zero).
- Logic errors: the program runs but gives the wrong result.
- Overflow errors: a number is too large for the space reserved for it.
key: Debugging strategies: test with varied inputs (including edge cases), add print statements to trace values, use a debugger, and hand-trace the code.
ex: A program should output the average of a list but always gives a value that's too small. What kind of error?
> The program runs without crashing
> The output is wrong
= A logic error (perhaps dividing by the wrong count)
term: syntax error = a mistake in the rules of the programming language
term: logic error = a mistake that causes incorrect results without crashing
term: runtime error = an error that occurs while the program is running
term: edge case = an extreme or unusual input used for testing
q: A program crashes when it tries to divide by zero. This is a… | *runtime error | syntax error | logic error | overflow
why: It happens during execution.
q: Testing with an empty list is an example of… | *testing an edge case | a syntax error | documentation | collaboration
why: Unusual inputs reveal hidden bugs.

@unit Data | Binary numbers, data compression, extracting information from data, using programs with data
@lesson Binary and data representation
say: Everything inside a computer, from photos to music, is stored as bits: 0s and 1s.
A bit is a binary digit (0 or 1). A byte is 8 bits. Binary is base 2: each place value is a power of 2.
key: With n bits you can represent 2ⁿ different values. For example, 8 bits can represent 256 values (0 to 255).
ex: Convert binary 1011 to decimal.
> 1·8 + 0·4 + 1·2 + 1·1
= 11
Computers use fixed numbers of bits, which can cause overflow errors (too big) and round-off errors (imprecise decimals). Analog data (continuous, like sound waves) is converted to digital data by sampling.
term: bit = a binary digit, 0 or 1
term: byte = a group of 8 bits
term: binary = the base-2 number system
term: sampling = measuring an analog signal at intervals to convert it to digital data
q: How many values can 4 bits represent? | *16 | 4 | 8 | 32
why: 2⁴ = 16.
q: What is binary 110 in decimal? | *6 | 3 | 110 | 12
why: 4 + 2 = 6.
gen: stem.binDec, stem.bitsNeeded

@lesson Compression and working with data
say: Data is everywhere. Compression shrinks it, and analysis turns it into knowledge.
key: Lossless compression reduces size without losing information (needed for text and code). Lossy compression removes some information for much smaller files (fine for photos, video and music).
Metadata is data about data, like a photo's date and location.
Programs help find patterns in large data sets. Cleaning data (fixing errors, removing duplicates, standardizing formats) is often necessary. Correlation in data doesn't prove causation, and data sets can contain bias that leads to unfair conclusions.
ex: You need to send a legal contract as a small file. Which compression should you use?
> Every character must be preserved exactly
= Lossless compression
term: lossless compression = reducing file size without losing any data
term: lossy compression = reducing file size by permanently removing some data
term: metadata = data that describes other data
term: data cleaning = fixing or removing incorrect, incomplete or inconsistent data
q: Which compression works best for streaming video quickly? | *Lossy | Lossless | Neither | No compression
why: Lossy makes much smaller files with acceptable quality.
q: A photo's location and date are examples of… | *metadata | compression | binary | encryption
why: They describe the photo.

@unit Algorithms and Programming | Variables, conditionals, iteration, lists, procedures, algorithms and efficiency
@lesson Variables, conditionals and loops
say: Programs are built from a few basic ideas: storing data, making decisions and repeating actions.
The AP exam uses a pseudocode reference: assignment uses an arrow (x ← 5), DISPLAY shows output, IF/ELSE makes decisions, and REPEAT n TIMES or REPEAT UNTIL loops.
key: Algorithms are built from three structures: sequencing (steps in order), selection (choosing a path with IF), and iteration (repeating with loops).
code:
| count ← 0
| REPEAT 5 TIMES
| {
|    count ← count + 2
| }
| DISPLAY(count)
ex: What does the code above display?
> count increases by 2 five times
= 10
Boolean expressions use AND, OR and NOT and evaluate to true or false.
term: variable = a named storage location for a value
term: selection = choosing which code to run based on a condition
term: iteration = repeating a set of instructions
term: Boolean expression = an expression that evaluates to true or false
q: Which structure repeats instructions? | *Iteration | Selection | Sequencing | Assignment
why: Loops repeat.
q: x ← 3, then x ← x * 4. What is x? | *12 | 7 | 3 | 4
why: 3 × 4 = 12.
gen: bank.CS.basics

@lesson Lists, procedures and algorithms
say: Lists store many values, procedures organize code, and algorithms solve problems step by step.
A list holds ordered values. In AP pseudocode, lists start at index 1. You can traverse a list with FOR EACH item IN list.
key: Procedures (functions) package code with a name and parameters so it can be reused. Abstraction hides details: you can use a procedure without knowing how it works inside.
Searching: linear search checks items one by one; binary search only works on sorted lists but is much faster (it halves the list each step).
Efficiency: algorithms that run in reasonable time grow polynomially; some problems (like checking every possible route) grow exponentially and are unreasonable for large inputs, so heuristics give approximate solutions. Some problems are undecidable: no algorithm can solve them for all inputs.
term: list = an ordered collection of elements
term: procedure = a named group of instructions that can take parameters and be reused
term: abstraction = reducing complexity by hiding details
term: binary search = a search that repeatedly halves a sorted list
term: undecidable problem = a problem no algorithm can solve for all inputs
q: Binary search requires the list to be… | *sorted | short | numeric only | empty
why: It relies on order to discard half.
q: In AP CSP pseudocode, the first list element is at index… | *1 | 0 | −1 | 2
why: AP pseudocode lists start at 1.
gen: bank.CS.algorithms

@unit Computer Systems and Networks | The internet, fault tolerance, parallel and distributed computing
@lesson How the internet works
say: The internet connects billions of devices. It works because of shared rules called protocols.
The internet is a network of networks. Data is broken into packets, which travel independently and may take different paths, then are reassembled at the destination.
key: Protocols are agreed-upon rules: IP (addressing), TCP (reliable delivery and reassembly), UDP (faster, less reliable), HTTP (web pages), and DNS (translates domain names to IP addresses).
The World Wide Web is a system of linked pages that runs on the internet; it's not the same as the internet itself.
The internet is fault tolerant: redundant connections let data route around failures. Bandwidth is the maximum data transferred per second.
term: packet = a small chunk of data sent over a network
term: protocol = an agreed-upon set of rules for sending data
term: IP address = a unique number identifying a device on the internet
term: DNS = the system that translates domain names into IP addresses
term: fault tolerance = the ability to keep working when parts fail
q: What does DNS do? | *Translates domain names into IP addresses | Encrypts data | Stores web pages | Speeds up packets
why: It's like the internet's phone book.
q: The internet is fault tolerant because… | *there are redundant paths for data | it never fails | it uses one central server | packets never get lost
why: Data can route around broken connections.
gen: bank.CS.internet

@lesson Parallel and distributed computing
say: Big problems can be split up and solved faster by many processors working together.
- Sequential computing runs one operation at a time.
- Parallel computing splits a task to run on multiple processors at once.
- Distributed computing uses many computers on a network (like a data center or volunteer projects).
key: Speedup = sequential time ÷ parallel time. Speedup is limited because some parts of a task must run in order.
ex: Three independent tasks take 30, 40 and 50 seconds. Compare running them sequentially vs. on two processors, with the 50 s task on one processor and the 30 s and 40 s tasks on the other.
> Sequential: 30 + 40 + 50 = 120 s
> Parallel: max(50, 70) = 70 s
= Speedup = 120/70 ≈ 1.7
term: parallel computing = running multiple parts of a task at the same time on different processors
term: distributed computing = using multiple networked computers to solve a problem
term: speedup = sequential running time divided by parallel running time
q: Why can't adding more processors always increase speed? | *Some steps must run in order | Processors slow each other down always | Computers can't run in parallel | It costs too much
why: Sequential parts limit the speedup.
q: Sequential time is 60 s and parallel time is 20 s. The speedup is… | *3 | 40 | 1/3 | 80
why: 60 ÷ 20 = 3.

@unit Impact of Computing | Beneficial and harmful effects, the digital divide, bias, crowdsourcing, legal and ethical concerns, safe computing
@lesson Effects, equity and ethics
say: Computing changes society in powerful ways, both good and bad. Responsible programmers think about everyone affected.
Computing innovations have beneficial and harmful effects, often both at once. Social media connects people but can spread misinformation.
key: The digital divide is unequal access to computing and the internet, based on income, location or other factors.
Bias in computing: algorithms trained on biased data can make unfair decisions (like in hiring or facial recognition). Diverse teams and careful testing reduce bias.
Crowdsourcing gathers ideas or data from many people (like Wikipedia or citizen science). Intellectual property is protected by copyright; Creative Commons and open source licenses let creators share work with conditions.
term: digital divide = unequal access to technology and the internet
term: algorithmic bias = unfair outcomes caused by biased data or design
term: crowdsourcing = gathering information or services from a large group of people online
term: Creative Commons = licenses allowing creators to share work with specified permissions
q: An AI trained mostly on photos of one group performs poorly on others. This is… | *algorithmic bias | the digital divide | crowdsourcing | encryption
why: Biased training data led to unfair results.
q: Rural areas lacking high-speed internet illustrates… | *the digital divide | open source | phishing | lossless compression
why: Access to technology is unequal.

@lesson Safe computing and privacy
say: Your personal data is valuable, and attackers want it. Let's learn how to protect yourself.
Personally identifiable information (PII) includes your name, address, birthday and Social Security number. Data you share online can be collected, combined and used in ways you didn't expect.
key: Strong security uses strong unique passwords, multifactor authentication, encryption and software updates.
- Encryption scrambles data so only someone with the key can read it. Symmetric encryption uses one shared key; public key encryption uses a public key to encrypt and a private key to decrypt.
- Phishing tricks people into revealing information through fake emails or sites.
- Malware (viruses, ransomware) damages systems or steals data.
- Keylogging records keystrokes to steal passwords.
term: personally identifiable information = information that can identify a specific person
term: multifactor authentication = verifying identity with two or more types of evidence
term: encryption = encoding data so only authorized parties can read it
term: phishing = a scam that tricks people into giving personal information
term: public key encryption = encryption using a public key to encrypt and a private key to decrypt
q: An email asks you to "verify your bank password" through a link. This is likely… | *phishing | encryption | multifactor authentication | a firewall
why: Legitimate banks don't ask for passwords this way.
q: Multifactor authentication improves security by… | *requiring more than one type of proof | using longer emails | removing passwords | sharing keys publicly
why: An attacker needs more than a stolen password.
gen: bank.CS.systems
`;
