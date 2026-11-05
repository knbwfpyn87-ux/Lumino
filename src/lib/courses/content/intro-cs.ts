export default String.raw`
@course intro-cs | Intro to Computer Science | Standard | 💡 | Computer Science

@unit How Computers Work | Hardware and software, binary
@lesson Hardware, software and the computer
say: Computers are everywhere, but how do they actually work? Let's open the box.
key: Every computer follows the input → processing → storage → output model.
- Hardware is the physical parts: the CPU (processor, the "brain"), RAM (fast, temporary memory), storage (SSD or hard drive, long-term), and input/output devices.
- Software is the instructions: the operating system (Windows, macOS, iOS) manages hardware and runs applications (apps).
RAM is cleared when power turns off; storage keeps data. More RAM lets you run more programs at once.
ex: You type a message and it appears on the screen. Trace the steps.
> Input: keyboard sends key presses
> Processing: the CPU runs the app's instructions
= Output: the screen displays the text (and storage saves it if you save)
term: CPU = the central processing unit that carries out instructions
term: RAM = fast, temporary memory that holds running programs and data
term: operating system = software that manages hardware and runs applications
term: hardware = the physical parts of a computer
q: Which is software? | *An operating system | A keyboard | A CPU | A hard drive
why: Software is a set of instructions.
q: What happens to data in RAM when the power turns off? | *It's erased | It's saved permanently | It moves to the CPU | It doubles
why: RAM is temporary memory.
gen: bank.CS.basics

@lesson Binary and data
say: Computers store everything, from text to photos to music, as 0s and 1s. That's binary.
key: A bit is a single 0 or 1. A byte is 8 bits. With n bits, you can represent 2ⁿ different values.
Binary is base 2. Each place is a power of 2: 1, 2, 4, 8, 16, 32, 64, 128.
ex: Convert binary 1101 to decimal.
> 8 + 4 + 0 + 1
= 13
Text is stored using codes like ASCII and Unicode (the letter A is 65). Images are grids of pixels, each with color values (RGB). Larger units: kilobyte (about 1,000 bytes), megabyte, gigabyte and terabyte.
term: bit = a binary digit, 0 or 1
term: byte = a group of 8 bits
term: binary = the base-2 number system computers use
term: pixel = the smallest dot of color in a digital image
q: How many values can 3 bits represent? | *8 | 3 | 6 | 9
why: 2³ = 8.
q: What is binary 101 in decimal? | *5 | 3 | 101 | 6
why: 4 + 0 + 1.
gen: stem.binDec

@unit Programming Basics | Variables and data types, conditionals and loops
@lesson Variables and data types
say: Programming is giving a computer precise instructions. It starts with storing data in variables.
key: A variable is a named container for data. Common data types: integers (whole numbers), floats (decimals), strings (text in quotes) and Booleans (true or false).
code:
| name = "Ada"
| age = 15
| height = 1.62
| is_student = True
| print(name + " is " + str(age))
Programs follow sequencing: instructions run in order, top to bottom. Operators include +, −, *, / and comparison operators like ==, <, >.
oops: "5" + "5" makes "55" (joining strings), while 5 + 5 makes 10. Data types matter!
term: variable = a named storage location for data
term: string = a sequence of characters, like text
term: Boolean = a data type that is either true or false
term: integer = a whole number data type
q: Which data type stores True or False? | *Boolean | String | Integer | Float
why: Booleans hold true/false values.
q: What is "3" + "4" in many languages? | *"34" | 7 | "7" | an error always
why: Adding strings joins them.

@lesson Conditionals and loops
say: Programs make decisions with conditionals and repeat actions with loops. These are coding superpowers.
key: Conditionals (if/else) run code only when a condition is true. Loops repeat code: a for loop repeats a set number of times; a while loop repeats as long as a condition is true.
code:
| score = 85
| if score >= 90:
|     print("A")
| elif score >= 80:
|     print("B")
| else:
|     print("Keep going!")
|
| for i in range(3):
|     print("Hello")
ex: What does the code above print?
> 85 is not ≥ 90 but is ≥ 80, so it prints B
= "B", then "Hello" three times
oops: A while loop whose condition never becomes false is an infinite loop, and the program never stops.
term: conditional = code that runs only if a condition is true
term: loop = code that repeats
term: infinite loop = a loop that never ends
q: How many times does "for i in range(5)" repeat? | *5 | 4 | 6 | 1
why: range(5) gives 0 through 4.
q: Which runs only when a condition is true? | *An if statement | A variable | A string | A comment
why: Conditionals check conditions.

@unit Problem Solving | Algorithms and decomposition, functions and debugging
@lesson Algorithms and decomposition
say: Before writing code, programmers plan the steps. That plan is called an algorithm.
key: An algorithm is a precise, step-by-step set of instructions to solve a problem. Good algorithms are correct, clear and efficient.
Computational thinking strategies:
- Decomposition: break a big problem into smaller parts.
- Pattern recognition: notice similarities with problems you've solved.
- Abstraction: focus on what's important and ignore unneeded details.
- Algorithm design: write the steps.
Pseudocode and flowcharts help plan algorithms before coding.
ex: Write an algorithm to find the largest number in a list.
> Start with the first number as the largest
> Compare each next number; if it's bigger, it becomes the largest
= After checking all numbers, the largest one remains
term: algorithm = a step-by-step set of instructions to solve a problem
term: decomposition = breaking a problem into smaller parts
term: abstraction = focusing on important details and hiding complexity
term: pseudocode = a plain-language description of an algorithm's steps
q: Breaking "build a game" into graphics, controls and scoring is… | *decomposition | abstraction | debugging | compiling
why: It splits a big task into parts.
q: An algorithm must be… | *precise and step by step | written in Python | very long | secret
why: Each step must be clear and unambiguous.
gen: bank.CS.algorithms

@lesson Functions and debugging
say: Functions let you reuse code, and debugging helps you find and fix mistakes. Every programmer needs both.
key: A function is a named block of code that does one task. It can take parameters (inputs) and return a value (output).
code:
| def area(width, height):
|     return width * height
|
| print(area(4, 5))   # 20
Functions make code shorter, easier to read and easier to fix.
Debugging finds and fixes bugs. Types of errors: syntax errors (breaking the language's rules), runtime errors (crashing while running) and logic errors (wrong results). Strategies: read error messages, print variable values, test small pieces and explain your code out loud ("rubber duck debugging").
term: function = a reusable, named block of code
term: parameter = an input value a function receives
term: return value = the output a function sends back
term: logic error = a bug that produces wrong results without crashing
q: What does area(3, 7) return in the code above? | *21 | 10 | 37 | 4
why: 3 × 7.
q: A program runs but calculates the wrong average. This is a… | *logic error | syntax error | runtime error | hardware error
why: It runs but the result is wrong.

@unit Computing and Society | The internet, cybersecurity and ethics
@lesson The internet and cybersecurity
say: The internet connects billions of devices. Staying safe online is an essential skill.
key: Data travels across the internet in small packets, following protocols (rules) like TCP/IP. DNS translates website names into IP addresses. HTTPS encrypts web traffic (look for the lock icon).
Cybersecurity threats:
- Phishing: fake messages that trick you into revealing information.
- Malware: harmful software like viruses and ransomware.
- Weak passwords and reused passwords.
Protection: strong, unique passwords (or a password manager), two-factor authentication, software updates, and thinking before clicking links.
tip: Before clicking a link in a message, hover over it to see the real address, and check the sender. When in doubt, go to the site directly instead.
term: packet = a small chunk of data sent over a network
term: IP address = a number that identifies a device on the internet
term: phishing = a scam that tricks people into giving personal information
term: two-factor authentication = using a second step, like a code, to verify identity
q: An email asks you to click a link and enter your password to "unlock your account." This is likely… | *phishing | a software update | encryption | a firewall
why: Legitimate services don't ask this way.
q: What does HTTPS provide? | *Encryption of web traffic | Faster downloads | Free Wi-Fi | Unlimited storage
why: The S stands for secure.
gen: bank.CS.internet

@lesson Ethics and the impact of computing
say: Technology shapes society in powerful ways. Responsible computer scientists think about who it helps and who it harms.
key: Computing has benefits (medicine, communication, education) and risks (privacy loss, misinformation, job changes, bias).
- Privacy: apps collect personal data; read privacy settings and share carefully.
- Bias: algorithms trained on biased data can be unfair, like facial recognition that works worse for some groups.
- Digital divide: not everyone has equal access to computers and the internet.
- Intellectual property: respect copyright; use open licenses (like Creative Commons) when sharing.
- AI: powerful tools that should be used honestly and responsibly.
Your digital footprint (everything you post online) can last a long time, so think before you post.
term: digital footprint = the trail of data you leave online
term: algorithmic bias = unfair outcomes from biased data or design
term: digital divide = unequal access to technology
term: copyright = legal protection for creative work
q: A hiring algorithm favors one group because of biased training data. This is… | *algorithmic bias | phishing | encryption | the digital divide
why: Biased data led to unfair results.
q: Your digital footprint is… | *the record of your online activity | your shoe size | your password | a type of virus
why: Posts, searches and data can last a long time.
`;
