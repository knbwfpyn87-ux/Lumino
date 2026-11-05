export default String.raw`
@course ap-csa | AP Computer Science A | AP | 💻 | Computer Science

// Follows the College Board's revised AP CSA framework (2025–26 onward): 4 units, inheritance removed, text files and data sets added.

@unit Using Objects and Methods | Variables and types, expressions, casting, calling methods, String and Math
@lesson Variables and primitive types
say: Every Java program stores information in variables. Let's meet the three primitive types you'll use on the AP exam.
A variable is a named box that holds a value. In Java you must declare its type before using it.
- int holds whole numbers: int score = 95;
- double holds decimals: double price = 4.99;
- boolean holds true or false: boolean done = false;
code:
| int age = 16;
| double gpa = 3.8;
| boolean hasPermit = true;
| age = age + 1;   // age is now 17
A variable declared final can't change after it's set: final int MAX = 100;
oops: = means "store into," not "is equal to." age = age + 1 takes the old value, adds 1, and stores it back.
term: variable = a named storage location that holds a value of a declared type
term: primitive type = a basic data type like int, double or boolean that stores a simple value
term: final = keyword that makes a variable a constant that cannot be reassigned
q: Which type should store the number of students in a class? | *int | double | boolean | String
why: A count is a whole number.
q: What is stored in x after: int x = 5; x = x * 2 + 1; | *11 | 10 | 5 | 12
why: The right side uses the old x: 5 × 2 + 1 = 11.
gen: csa.u1a

@lesson Expressions, integer division and modulus
say: Java does math a little differently than your calculator, especially with whole numbers. This trips up a lot of people!
key: When both operands are int, / does integer division and drops the remainder. % gives the remainder.
code:
| System.out.println(17 / 5);   // 3
| System.out.println(17 % 5);   // 2
| System.out.println(17.0 / 5); // 3.4
Java follows order of operations: *, / and % happen before + and −, left to right. Compound assignment operators are shortcuts: x += 3 means x = x + 3. x++ adds 1.
ex: What does 7 + 10 / 4 * 2 evaluate to?
> 10 / 4 = 2 (integer division)
> 2 * 2 = 4
> 7 + 4 = 11
= 11
tip: n % 2 == 0 tests whether n is even. n % 10 gives the last digit of n.
term: integer division = dividing two ints, which truncates (drops) the decimal part
term: modulus = the % operator, which gives the remainder after division
term: compound assignment = shorthand like +=, -=, *= that updates a variable
q: What is 23 % 4? | *3 | 5 | 5.75 | 0
why: 23 = 4 × 5 + 3, so the remainder is 3.
q: What is 9 / 2 * 2? | *8 | 9 | 9.0 | 4
why: 9 / 2 = 4 (integer division), then 4 × 2 = 8.
gen: csa.u1b

@lesson Casting and the range of int
say: Sometimes you need to turn a double into an int, or the other way around. That's called casting.
Casting converts a value to another type: (int) 3.99 is 3 because casting to int truncates (chops off) the decimal. (double) 7 is 7.0.
ex: int a = 7, b = 2. What does (double) a / b give?
> The cast happens first: (double) a is 7.0
> 7.0 / 2 uses double division
= 3.5
To round a positive double to the nearest int, use (int) (x + 0.5).
An int is stored in 32 bits, so it ranges from Integer.MIN_VALUE (−2,147,483,648) to Integer.MAX_VALUE (2,147,483,647). Going past the limit causes overflow: the value wraps around.
oops: (double) (7 / 2) is 3.0, not 3.5. The integer division inside the parentheses happens before the cast.
term: casting = converting a value from one type to another, like (int) or (double)
term: truncation = dropping the decimal part when converting a double to an int
term: overflow = when an int calculation goes past Integer.MAX_VALUE or MIN_VALUE and wraps around
q: What is (int) 8.7? | *8 | 9 | 8.7 | 8.0
why: Casting to int truncates; it does not round.
q: Which expression gives 2.5? | *(double) 5 / 2 | (double) (5 / 2) | 5 / 2 | (int) 5.0 / 2
why: Casting 5 to a double first makes the division real division.
gen: csa.u1c

@lesson Objects, classes and calling methods
say: Objects are the heart of Java. A class is the blueprint, and an object is the thing you build from it.
A class defines what an object knows (its attributes) and can do (its methods). You create an object with new, which calls a constructor.
code:
| Scanner input = new Scanner(System.in);
| String name = new String("Ada");
| Turtle t = new Turtle(world);
The variable holds a reference to the object, not the object itself. A reference variable that doesn't point to any object holds null, and calling a method on null throws a NullPointerException.
Call a method with dot notation: object.method(arguments). Methods can be void (just do something) or return a value you can store or print. Static methods belong to the class, so you call them on the class name, like Math.sqrt(16).
term: class = a blueprint that defines the attributes and methods of objects
term: object = a specific instance of a class, created with new
term: constructor = special code that runs when an object is created and sets its starting state
term: null = a value meaning a reference variable points to no object
term: static method = a method called on the class itself, not an object, like Math.abs
q: What does the keyword new do? | *Creates an object by calling a constructor | Declares a primitive variable | Imports a class | Deletes an object
why: new builds an instance of a class and returns a reference to it.
q: Calling a method on a variable whose value is null causes… | *a NullPointerException | a compile error every time | the method to return 0 | nothing
why: There's no object to run the method on, so Java throws a NullPointerException at runtime.

@lesson String methods
say: Strings are objects that hold text, and they come with handy methods. Let's learn the ones on the AP Java Quick Reference.
Strings are indexed from 0. In "CODE", C is at index 0 and E is at index 3. The length is 4.
- length() returns the number of characters.
- substring(a, b) returns characters from index a up to but NOT including b.
- substring(a) returns from index a to the end.
- indexOf(str) returns the first index where str appears, or −1 if it's not there.
- equals(other) checks if two strings have the same characters.
- compareTo(other) returns a negative number, 0 or a positive number for alphabetical order.
ex: String s = "lumino"; What is s.substring(1, 4)?
> Index 1 is u, index 2 is m, index 3 is i
> Stop before index 4
= "umi"
oops: Use equals to compare Strings, not ==. The == operator checks whether two references point to the same object.
tip: Strings are immutable: methods like substring return a new String and never change the original.
term: index = the position of a character in a String, starting at 0
term: substring = a part of a String, from a start index up to but not including an end index
term: immutable = cannot be changed after it is created; every String method returns a new String
term: concatenation = joining Strings with +, like "Hi " + name
q: What is "computer".length()? | *8 | 7 | 9 | 6
why: c-o-m-p-u-t-e-r has 8 characters.
q: What is "banana".indexOf("na")? | *2 | 4 | 3 | −1
why: The first "na" starts at index 2.
q: How should you check if two Strings s and t have the same text? | *s.equals(t) | s == t | s = t | s.compareTo(t) == 1
why: equals compares the characters; == compares references.
gen: csa.u2a, csa.u2b

@lesson The Math class and random numbers
say: Java's Math class has ready-made tools for powers, roots and random numbers. All its methods are static.
- Math.abs(x): absolute value
- Math.pow(base, exp): returns a double
- Math.sqrt(x): returns a double
- Math.random(): a double from 0.0 up to (but not including) 1.0
key: To get a random int from min to max inclusive: (int) (Math.random() * (max − min + 1)) + min
ex: Write an expression for a random die roll from 1 to 6
> Range size: 6 − 1 + 1 = 6
> Math.random() * 6 gives 0.0 up to 5.999…
> Cast to int: 0 to 5, then add 1
= (int) (Math.random() * 6) + 1
Wrapper classes Integer and Double let primitives act like objects (needed for ArrayList). Java converts automatically: this is called autoboxing and unboxing.
term: Math.random() = returns a random double greater than or equal to 0.0 and less than 1.0
term: wrapper class = a class like Integer or Double that wraps a primitive value in an object
term: autoboxing = Java automatically converting a primitive to its wrapper object
q: What is the type of Math.pow(2, 3)? | *double | int | long | boolean
why: Math.pow always returns a double (8.0).
q: Which gives a random int from 10 to 20 inclusive? | *(int) (Math.random() * 11) + 10 | (int) (Math.random() * 10) + 10 | (int) Math.random() * 11 + 10 | (int) (Math.random() * 20) + 10
why: There are 11 values from 10 to 20; the cast must wrap the whole product.
gen: csa.u2c

@unit Selection and Iteration | Boolean logic, if statements, while and for loops, nested loops, String algorithms
@lesson Boolean expressions and if statements
say: Programs make decisions with if statements. They run code only when a condition is true.
Relational operators compare values and produce a boolean: ==, !=, <, >, <=, >=.
code:
| if (score >= 90) {
|     grade = "A";
| } else if (score >= 80) {
|     grade = "B";
| } else {
|     grade = "C or below";
| }
In an if / else if / else chain, Java checks conditions top to bottom and runs only the first branch that is true.
oops: Order matters. If you check score >= 80 before score >= 90, a 95 gets a B, because the first true branch wins.
term: boolean expression = an expression that evaluates to true or false
term: relational operator = ==, !=, <, >, <= or >=, which compare two values
term: conditional statement = code like if/else that runs only when a condition is true
q: What is printed when x = 7? if (x > 5) print "big"; else if (x > 2) print "medium"; | *big | medium | big medium | nothing
why: Only the first true branch runs.
q: Which operator means "not equal"? | *!= | <> | =! | ~=
why: In Java, != means not equal.
gen: csa.u3a

@lesson Compound conditions and De Morgan's laws
say: You can combine conditions with and, or, and not. Java is clever about skipping work, too.
- && (and): true only if both sides are true.
- || (or): true if at least one side is true.
- ! (not): flips true and false.
Short-circuit evaluation: with &&, if the left side is false, Java skips the right side. With ||, if the left side is true, it skips the right side. This lets you write safe checks like if (obj != null && obj.isReady()).
key: De Morgan's laws: !(a && b) is the same as !a || !b, and !(a || b) is the same as !a && !b.
ex: Simplify !(x > 3 && y == 0)
> Apply De Morgan: !(x > 3) || !(y == 0)
> Flip each comparison
= x <= 3 || y != 0
term: short-circuit evaluation = skipping the second operand of && or || when the first already decides the result
term: De Morgan's laws = !(a && b) equals !a || !b, and !(a || b) equals !a && !b
term: logical operator = &&, || or !, which combine or negate boolean expressions
q: What is true && (false || true)? | *true | false | error | null
why: false || true is true, and true && true is true.
q: Which is equivalent to !(a || b)? | *!a && !b | !a || !b | a && b | !a || b
why: De Morgan's law: negate each part and switch || to &&.
gen: csa.u3b, csa.u3c

@lesson While loops
say: Loops let your program repeat. A while loop keeps going as long as its condition is true.
code:
| int n = 1;
| while (n < 100) {
|     n = n * 2;
| }
| System.out.println(n);   // 128
Every loop needs three things: start (initialize), a condition to check, and an update that eventually makes the condition false. Without the update you get an infinite loop.
ex: How many times does the body run? int k = 10; while (k > 0) { k -= 3; }
> k goes 10 → 7 → 4 → 1 → −2
> The body ran for k = 10, 7, 4 and 1
= 4 times
tip: Trace loops with a table: write each variable's value at the end of every pass.
term: while loop = a loop that repeats while its condition is true, checking before each pass
term: infinite loop = a loop whose condition never becomes false
term: iteration = one pass through the body of a loop
q: What is printed? int i = 0; while (i < 5) { i += 2; } System.out.println(i); | *6 | 5 | 4 | 8
why: i goes 0 → 2 → 4 → 6, then 6 < 5 is false.
q: What causes an infinite loop? | *The condition never becomes false | The loop runs zero times | Using a for loop | Printing inside the loop
why: If nothing makes the condition false, the loop never ends.
gen: csa.u4a

@lesson For loops and nested loops
say: A for loop packs the start, condition and update into one line. It's perfect for counting.
code:
| for (int i = 0; i < 5; i++) {
|     System.out.print(i + " ");
| }
| // prints 0 1 2 3 4
A loop that runs from 0 while i < n runs exactly n times. Off-by-one errors happen when you use <= instead of < (or start at 1 instead of 0).
Nested loops put one loop inside another. The inner loop runs completely for each pass of the outer loop.
ex: How many times is "*" printed? for (int r = 0; r < 3; r++) for (int c = 0; c < 4; c++) print("*");
> The inner loop runs 4 times per outer pass
> The outer loop runs 3 times
= 3 × 4 = 12 times
term: for loop = a loop with initialization, condition and update in its header
term: off-by-one error = a loop that runs one time too many or too few
term: nested loop = a loop inside another loop
q: How many times does for (int i = 2; i <= 10; i += 2) run? | *5 | 4 | 10 | 8
why: i takes the values 2, 4, 6, 8, 10.
q: for (int i = 0; i < 4; i++) for (int j = 0; j < i; j++) count++; What is count? | *6 | 16 | 4 | 10
why: The inner loop runs 0 + 1 + 2 + 3 = 6 times.
gen: csa.u4b

@lesson String traversal algorithms
say: Combining loops and String methods lets you search, count and reverse text. These show up on every AP exam.
Loop through a String with an index from 0 to length() − 1 and grab one character at a time with substring(i, i + 1).
code:
| String word = "mississippi";
| int count = 0;
| for (int i = 0; i < word.length(); i++) {
|     if (word.substring(i, i + 1).equals("s")) {
|         count++;
|     }
| }
| // count is 4
Common String algorithms: count a letter, find if a substring exists, reverse a String, check for a palindrome, and remove characters.
ex: Build the reverse of "code"
> Start with rev = ""
> Loop i from 0 up: rev = word.substring(i, i + 1) + rev
> c → oc → doc → edoc
= "edoc"
oops: Looping with i <= word.length() goes one past the end and throws a StringIndexOutOfBoundsException.
term: traversal = visiting every element of a String or collection in order
term: palindrome = a word that reads the same forward and backward
term: StringIndexOutOfBoundsException = error from using an index below 0 or at least the String's length
q: What does this count? for (i...) if (s.substring(i, i+1).equals("a")) n++; | *How many times "a" appears in s | The index of the first "a" | The length of s | Whether s starts with "a"
why: n goes up once for every "a" found.
q: What is the last valid index of a String with length 6? | *5 | 6 | 7 | 0
why: Indexes run from 0 to length − 1.
gen: csa.u4c

@unit Class Creation | Writing classes, constructors, accessors and mutators, static, this and scope, documentation
@lesson Anatomy of a class
say: Now you get to design your own objects! Let's look at the parts of a class.
code:
| public class Student {
|     private String name;   // instance variables
|     private int grade;
|
|     public Student(String n, int g) {   // constructor
|         name = n;
|         grade = g;
|     }
|
|     public String getName() { return name; }   // accessor
| }
Instance variables store each object's data. They should be private so other classes can't change them directly. This is called encapsulation.
Methods are usually public so other classes can use them. A class's private data is reached only through its public methods.
term: instance variable = a variable declared in a class that each object has its own copy of
term: encapsulation = hiding data with private and giving controlled access through public methods
term: private = access modifier meaning only code inside the class can use it
term: public = access modifier meaning any class can use it
q: Why should instance variables be private? | *To protect data so it's only changed through methods | So they run faster | So other classes can change them | Because Java requires it to compile
why: Encapsulation keeps an object's data valid and under its own control.
q: Each Student object has its own name. name is a… | *instance variable | static variable | local variable | constructor
why: Instance variables belong to individual objects.
gen: csa.u5b

@lesson Constructors, accessors and mutators
say: Constructors set up a new object, accessors read its data, and mutators change it. Let's write all three.
A constructor has the same name as the class and no return type. A class can have several constructors with different parameters (overloading). If you write none, Java gives a default constructor that sets numbers to 0, booleans to false and objects to null.
code:
| public class BankAccount {
|     private double balance;
|     public BankAccount(double start) { balance = start; }
|     public double getBalance() { return balance; }            // accessor
|     public void deposit(double amt) { balance += amt; }       // mutator
| }
An accessor (getter) returns a value and doesn't change the object. A mutator (setter) changes instance variables and is usually void.
A method's signature is its name and parameter list. A return statement sends a value back and ends the method immediately.
oops: Writing void before a constructor's name makes it a regular method, not a constructor!
term: accessor = a method that returns the value of an instance variable without changing it
term: mutator = a method that changes the value of an instance variable
term: overloading = having several methods or constructors with the same name but different parameters
term: return type = the type of value a method sends back, or void if it returns nothing
q: Which is a correct constructor header for class Dog? | *public Dog(String name) | public void Dog(String name) | public static Dog(String name) | Dog public(String name)
why: Constructors have the class name and no return type.
q: What does a mutator usually do? | *Changes the value of an instance variable | Returns a value without changes | Creates a new class | Prints the object
why: Mutators (setters) modify the object's state.
gen: csa.u5a, csa.u5b

@lesson Static, this, and scope
say: Some variables belong to the whole class instead of one object. And Java has rules about where each variable lives.
A static variable is shared by every object of the class, like a counter of how many objects have been made. A static method can't use instance variables because it doesn't belong to any one object.
code:
| public class Ticket {
|     private static int sold = 0;
|     private int number;
|     public Ticket() { sold++; number = sold; }
| }
The keyword this refers to the current object. It's often used when a parameter has the same name as an instance variable: this.name = name;
Scope is where a variable can be used. Local variables (declared inside a method or loop) exist only inside that block. Parameters are local to their method.
oops: If a parameter is named the same as an instance variable and you write name = name;, nothing changes. Use this.name = name;
term: static variable = a variable shared by all objects of a class
term: this = a reference to the current object
term: scope = the part of a program where a variable can be used
term: local variable = a variable declared inside a method or block, which disappears when the block ends
q: If 3 Ticket objects are created, what is sold? | *3 | 1 | 0 | Each has its own value
why: The static variable is shared, so all three constructors add to the same counter.
q: Where can a variable declared inside a for loop be used? | *Only inside that loop | Anywhere in the class | Anywhere in the method | In any other class
why: Its scope is the loop's block.
gen: csa.u5c

@lesson Documentation and ethics of computing
say: Good programmers write code other people can understand, and think about how their code affects people.
Comments explain code: // for one line, /* */ for several lines, and /** */ for Javadoc. Javadoc comments describe what a method does, its parameters (@param) and what it returns (@return).
Preconditions are what must be true before a method is called. Postconditions are what will be true after it runs. The AP exam uses them to tell you what you can assume.
Computing has real effects on people. Programs can protect or leak personal data, and algorithms can be unfair if they're built on biased data. Programmers should respect privacy, licenses and intellectual property.
term: precondition = a condition that must be true before a method is called
term: postcondition = a condition that will be true after a method finishes
term: Javadoc = a comment style starting with /** that documents classes and methods
term: intellectual property = creations like code that are protected by law, such as copyright
q: A comment says "Precondition: n > 0." What does that mean? | *The method can assume n is positive | The method must check n and throw an error | n will be positive after the method runs | n is ignored
why: Preconditions are promises the caller makes, so the method can rely on them.
q: Which comment style creates documentation? | */** ... */ | // ... | <!-- ... --> | # ...
why: Javadoc comments start with /**.

@unit Data Collections | Arrays, ArrayList, 2D arrays, searching and sorting, recursion, text files and data sets
@lesson Arrays
say: An array holds many values of the same type in one variable. It's like a row of numbered lockers.
code:
| int[] scores = new int[5];          // five 0s
| double[] prices = {1.99, 4.50, 3.25};
| scores[0] = 90;
| System.out.println(prices.length);  // 3
Arrays have a fixed length set when they're created. Indexes run from 0 to length − 1. New int arrays are filled with 0, doubles with 0.0, booleans with false and object references with null.
Traverse an array with a for loop or an enhanced for loop. The enhanced for loop is simpler but can't change the array's elements or tell you the index.
code:
| int sum = 0;
| for (int s : scores) { sum += s; }
oops: Using an index of length or more (or a negative index) throws an ArrayIndexOutOfBoundsException.
term: array = a fixed-length collection of elements of the same type, accessed by index
term: enhanced for loop = for (type x : array), which visits each element in order
term: ArrayIndexOutOfBoundsException = error from accessing an array with an invalid index
q: What is arr.length after int[] arr = new int[8];? | *8 | 7 | 0 | 9
why: The array has 8 elements, indexed 0 to 7.
q: What is the default value in a new boolean array? | *false | true | null | 0
why: Each element of a new boolean array starts as false.
gen: csa.u6a, csa.u6b

@lesson Array algorithms
say: Most array problems use the same few patterns. Learn these and you can solve almost any free-response question.
Standard algorithms:
- Sum or average all elements.
- Find the maximum or minimum.
- Count elements that meet a condition.
- Check if any or all elements have a property.
- Shift or rotate elements, or reverse the array.
ex: Find the largest value in int[] a
> Start with max = a[0]
> Loop through the rest: if (a[i] > max) max = a[i];
> After the loop, max holds the largest value
= max = a[0], then update it whenever a bigger value appears
oops: Starting max at 0 breaks when every value is negative. Start with the first element instead.
term: algorithm = a step-by-step process for solving a problem
term: accumulator = a variable that collects a running total or count during a loop
q: To count even numbers in an array, inside the loop you write… | *if (a[i] % 2 == 0) count++; | count += a[i]; | if (a[i] / 2 == 0) count++; | count = a[i] % 2;
why: n % 2 == 0 tests for even numbers.
q: Why start max at a[0] instead of 0? | *So it works even if every value is negative | Because a[0] is always biggest | To avoid a compile error | It makes the loop shorter
why: If all values are negative, a max that starts at 0 would never be replaced.
gen: csa.u6b, csa.u6c

@lesson ArrayList
say: An ArrayList is like an array that can grow and shrink. It's perfect when you don't know how many items you'll have.
code:
| ArrayList<String> names = new ArrayList<String>();
| names.add("Ana");          // [Ana]
| names.add("Ben");          // [Ana, Ben]
| names.add(1, "Cal");       // [Ana, Cal, Ben]
| names.set(0, "Abe");       // [Abe, Cal, Ben]
| names.remove(1);           // [Abe, Ben]
| System.out.println(names.size());   // 2
An ArrayList holds objects, so for numbers use wrapper types: ArrayList<Integer>. Use size() instead of length, and get(i) instead of [i].
key: When you remove items while looping forward, the next item slides into the current index. Loop backward, or don't increase i after a removal.
term: ArrayList = a resizable list of objects from java.util
term: size() = the ArrayList method that returns the number of elements
term: ConcurrentModificationException = error from adding or removing items in an enhanced for loop over an ArrayList
q: What does list.add(0, "X") do? | *Inserts "X" at the front and shifts the rest right | Replaces the first element with "X" | Adds "X" to the end | Removes index 0
why: add(index, value) inserts and shifts later elements over.
q: Which type can an ArrayList NOT hold directly? | *int | Integer | String | Double
why: ArrayLists hold objects; use the wrapper class Integer.
gen: csa.u7a, csa.u7b, csa.u7c

@lesson 2D arrays
say: A 2D array is a grid of rows and columns, like a spreadsheet or a game board.
code:
| int[][] grid = new int[3][4];   // 3 rows, 4 columns
| grid[1][2] = 7;                 // row 1, column 2
| int rows = grid.length;         // 3
| int cols = grid[0].length;      // 4
Java stores a 2D array as an array of rows. Row-major traversal goes across each row, top to bottom. Column-major goes down each column, left to right.
code:
| for (int r = 0; r < grid.length; r++) {
|     for (int c = 0; c < grid[0].length; c++) {
|         System.out.print(grid[r][c] + " ");
|     }
| }
tip: Always write the row first: grid[row][col]. A quick way to remember: "RC, like RC car."
term: 2D array = an array of arrays, accessed with two indexes [row][column]
term: row-major order = visiting a 2D array row by row
term: column-major order = visiting a 2D array column by column
q: For int[][] m = new int[5][2], what is m[0].length? | *2 | 5 | 10 | 1
why: m[0] is the first row, which has 2 columns.
q: Which loop order is row-major? | *Outer loop over rows, inner over columns | Outer over columns, inner over rows | Only one loop | Rows and columns in parallel
why: Row-major finishes each row before moving down.
gen: csa.u8a, csa.u8b, csa.u8c

@lesson Searching and sorting
say: Finding and ordering data are two classic problems. Let's compare the algorithms you need to know.
Linear search checks each element in order until it finds the target. It works on any list. Binary search only works on sorted data: it checks the middle, then throws away the half that can't contain the target. It's much faster on large lists.
- Selection sort: find the smallest remaining element and swap it into the next position.
- Insertion sort: take the next element and slide it left into its place among the sorted part.
- Merge sort: split the list in half, sort each half recursively, then merge them. It's the fastest of the three on large lists.
ex: Binary search for 23 in [3, 8, 15, 23, 42, 57, 71]
> Middle is index 3: 23. Found it!
= Found at index 3 after 1 check
tip: Binary search on a list of 1,000 items needs at most about 10 checks, because 2¹⁰ = 1,024.
term: linear search = checking each element one by one until the target is found
term: binary search = repeatedly checking the middle of a sorted list and discarding half
term: selection sort = repeatedly selecting the smallest remaining element and swapping it into place
term: insertion sort = inserting each element into its correct spot in the sorted part of the list
term: merge sort = a recursive sort that splits a list in half, sorts each half, and merges them
q: Which search requires the data to be sorted? | *Binary search | Linear search | Both | Neither
why: Binary search depends on knowing which half the target must be in.
q: After one pass of selection sort on [5, 2, 9, 1], the list is… | *[1, 2, 9, 5] | [2, 5, 9, 1] | [1, 5, 2, 9] | [2, 5, 1, 9]
why: The smallest value, 1, is swapped with the first element, 5.
gen: csa.u6c

@lesson Recursion
say: A recursive method calls itself! It solves a big problem by solving a smaller version of the same problem.
Every recursive method needs a base case that stops the recursion, and a recursive call that moves toward the base case.
code:
| public static int factorial(int n) {
|     if (n == 0) return 1;            // base case
|     return n * factorial(n - 1);     // recursive call
| }
ex: Trace factorial(4)
> factorial(4) = 4 * factorial(3)
> factorial(3) = 3 * factorial(2)
> factorial(2) = 2 * factorial(1) and factorial(1) = 1 * factorial(0) = 1
> Multiply back up: 2, then 6, then 24
= 24
oops: A recursive method with no base case (or one it never reaches) keeps calling itself until the program crashes with a StackOverflowError.
term: recursion = a method calling itself to solve a smaller version of a problem
term: base case = the condition where a recursive method stops calling itself
term: StackOverflowError = error caused by too many method calls, often from recursion with no base case
q: What does f(3) return? int f(int n) { if (n == 0) return 0; return n + f(n − 1); } | *6 | 3 | 0 | 9
why: 3 + 2 + 1 + 0 = 6.
q: What's missing from a recursive method that never stops? | *A reachable base case | A return type | A parameter | A loop
why: The base case is what ends the chain of calls.
gen: csa.u10a, csa.u10b, csa.u10c

@lesson Text files and data sets
say: Real programs work with real data. Let's read a file and analyze a data set, which is new to the AP exam.
Java can read a text file with the File and Scanner classes. Reading a file can throw an IOException, so the method header declares throws IOException.
code:
| import java.io.*;
| import java.util.*;
| public static int countLines(String path) throws IOException {
|     Scanner in = new Scanner(new File(path));
|     int count = 0;
|     while (in.hasNextLine()) {
|         String line = in.nextLine();
|         count++;
|     }
|     in.close();
|     return count;
| }
A common pattern: read each line, use split(",") to break it into fields, convert numbers with Integer.parseInt or Double.parseDouble, and store objects in an ArrayList. Then use array and list algorithms to find totals, averages, maximums and patterns.
Data sets can be incomplete or biased. Before trusting a conclusion, ask how the data was collected and who might be missing from it.
term: Scanner = a class that reads input from the keyboard or a file, using methods like nextLine and hasNextLine
term: IOException = an exception that can happen when reading or writing files
term: split = a String method that breaks a String into an array of parts around a separator
term: data set = a collection of related data, often stored as rows in a file
q: What does "4,Ana,92".split(",") return? | *An array {"4", "Ana", "92"} | The String "4 Ana 92" | An ArrayList of ints | The number 3
why: split breaks the String at each comma into a String array.
q: Which loop condition keeps reading until a file ends? | *while (in.hasNextLine()) | while (in.nextLine()) | while (in != null) | while (true)
why: hasNextLine() returns false once there are no more lines.
`;
