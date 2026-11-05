export default String.raw`
@course digital-electronics | Digital Electronics | Honors | 🔌 | Computer Science

@unit Electricity and Components | Circuits and Ohm's law, electronic components
@lesson Circuits and Ohm's law
say: Digital electronics starts with electricity. Let's learn how current flows through circuits.
key: Ohm's law: V = IR. Voltage (volts) pushes current (amperes) through resistance (ohms). Power P = IV.
In a series circuit, current is the same everywhere and resistances add. In a parallel circuit, voltage is the same across each branch and total resistance decreases.
ex: A 9 V battery powers a 450 Ω resistor. Find the current.
> I = V/R = 9/450
= 0.02 A (20 mA)
Kirchhoff's laws: currents into a junction equal currents out, and voltages around any closed loop add to zero.
term: Ohm's law = V = IR
term: current = the flow of electric charge, measured in amperes
term: resistance = opposition to current, measured in ohms
term: series circuit = a circuit with one path for current
q: Two 100 Ω resistors in series have total resistance… | *200 Ω | 50 Ω | 100 Ω | 10,000 Ω
why: Series resistances add.
q: A circuit draws 2 A from 5 V. Its power is… | *10 W | 2.5 W | 7 W | 3 W
why: P = IV.
gen: stem.ohm, stem.series

@lesson Electronic components
say: Circuits are built from components with special jobs. Let's meet the most common ones.
- Resistors limit current. Their color bands show resistance values.
- Capacitors store and release charge, smoothing voltage or creating time delays.
- Diodes let current flow in only one direction. LEDs (light-emitting diodes) glow when current flows forward.
- Transistors act as electronic switches or amplifiers. They're the building blocks of every computer chip.
key: An LED needs a current-limiting resistor in series, or too much current will burn it out. R = (V_supply − V_LED) ÷ I_LED.
ex: A 5 V supply drives an LED that drops 2 V and needs 20 mA. Find the resistor value.
> R = (5 − 2) ÷ 0.020
= 150 Ω
term: diode = a component that allows current in only one direction
term: LED = a diode that emits light when current flows forward
term: transistor = a semiconductor device used as a switch or amplifier
term: capacitor = a component that stores electric charge
q: Which component acts as an electronic switch in computer chips? | *Transistor | Resistor | Capacitor | Battery
why: Billions of transistors switch on and off.
q: Why put a resistor in series with an LED? | *To limit current so the LED doesn't burn out | To make it brighter | To store charge | To reverse current
why: LEDs have little resistance of their own.

@unit Number Systems and Logic | Binary and hexadecimal, logic gates and truth tables
@lesson Binary and hexadecimal
say: Digital circuits work with two states, 0 and 1. Number systems let us represent anything with them.
key: Binary (base 2) uses 0 and 1. Hexadecimal (base 16) uses 0–9 and A–F, where each hex digit equals exactly 4 bits.
ex: Convert binary 1010 1111 to hexadecimal.
> Split into 4-bit groups: 1010 = A, 1111 = F
= AF
Converting decimal to binary: repeatedly divide by 2 and read the remainders bottom to top. 13 = 1101.
Digital signals are discrete (0 or 1), unlike analog signals, which vary continuously. Digital signals resist noise, which is why modern electronics use them.
term: hexadecimal = the base-16 number system using 0–9 and A–F
term: digital signal = a signal with discrete values, usually 0 and 1
term: analog signal = a signal that varies continuously
term: nibble = a group of 4 bits, equal to one hex digit
q: What is hex F in decimal? | *15 | 16 | 10 | 14
why: A=10 through F=15.
q: Binary 1111 in decimal is… | *15 | 4 | 16 | 1111
why: 8 + 4 + 2 + 1.
gen: stem.binDec

@lesson Logic gates and truth tables
say: Logic gates are the building blocks of digital circuits. Each one makes a simple decision.
key: Basic gates:
- AND: output 1 only if all inputs are 1.
- OR: output 1 if any input is 1.
- NOT (inverter): flips the input.
- NAND and NOR: AND and OR followed by NOT. They're universal gates: any circuit can be built from only NAND gates (or only NOR gates).
- XOR: output 1 if the inputs are different.
A truth table lists the output for every input combination. With n inputs, there are 2ⁿ rows.
ex: A = 1, B = 0. What do AND, OR and XOR output?
> AND: 0 (not both 1)
> OR: 1 (at least one is 1)
= XOR: 1 (inputs differ)
term: logic gate = an electronic circuit that performs a basic logical operation
term: truth table = a table showing a circuit's output for every input combination
term: universal gate = a gate (NAND or NOR) that can build any logic function
term: XOR = exclusive OR; outputs 1 when inputs differ
q: How many rows are in a truth table with 3 inputs? | *8 | 3 | 6 | 9
why: 2³ = 8.
q: Which gate outputs 1 only when both inputs are 1? | *AND | OR | XOR | NOR
why: AND requires all inputs to be 1.
gen: stem.logic, stem.gates

@unit Combinational Logic | Boolean algebra, Karnaugh maps
@lesson Boolean algebra
say: Boolean algebra lets us simplify logic circuits, so they use fewer gates and cost less.
key: In Boolean algebra, AND is written as multiplication (AB), OR as addition (A + B), and NOT as an overbar or prime (A′).
Useful laws:
- A + 0 = A, A · 1 = A, A + 1 = 1, A · 0 = 0.
- A + A′ = 1, A · A′ = 0.
- Distributive: A(B + C) = AB + AC.
- De Morgan's theorems: (AB)′ = A′ + B′ and (A + B)′ = A′B′.
ex: Simplify AB + AB′.
> Factor out A: A(B + B′)
> B + B′ = 1
= A
Simplified expressions mean fewer gates, lower cost and faster circuits.
term: Boolean algebra = algebra for logic values 0 and 1 using AND, OR and NOT
term: De Morgan's theorems = rules for complementing AND and OR expressions
term: sum of products = a Boolean expression written as ORed AND terms
q: Simplify A + A′ | *1 | 0 | A | A′
why: Either A or its complement is always true.
q: By De Morgan's theorem, (A + B)′ equals… | *A′B′ | A′ + B′ | AB | A + B
why: Break the bar, change the operator.

@lesson Karnaugh maps and circuit design
say: Karnaugh maps give a visual way to simplify logic. Then we can turn a design problem into a working circuit.
key: A Karnaugh map (K-map) arranges a truth table so adjacent cells differ by one variable. Group 1s in rectangles of 1, 2, 4 or 8 cells (powers of two), as large as possible. Each group becomes one simplified product term.
Design process: describe the problem in words → make a truth table → write the expression → simplify with a K-map or Boolean algebra → build the circuit with gates.
ex: A safety system lights an alarm if a door is open (D) AND the system is armed (S). Write the logic.
> Alarm = 1 only when both are 1
= Alarm = DS (an AND gate)
Common combinational circuits: adders (half and full adders add binary numbers), multiplexers (select one input) and decoders (activate one output based on a code).
term: Karnaugh map = a grid for simplifying Boolean expressions by grouping 1s
term: half adder = a circuit that adds two bits, producing a sum and carry
term: multiplexer = a circuit that selects one of several inputs to send to the output
term: decoder = a circuit that activates one output based on a binary input code
q: In a K-map, groups of 1s must contain… | *1, 2, 4 or 8 cells | any number of cells | only 3 cells | diagonal cells
why: Groups must be powers of two.
q: A half adder adding 1 + 1 outputs… | *sum 0, carry 1 | sum 1, carry 0 | sum 2 | sum 1, carry 1
why: 1 + 1 = 10 in binary.

@unit Sequential Logic and Microcontrollers | Flip-flops and counters, microcontrollers
@lesson Flip-flops and counters
say: Combinational circuits react instantly. Sequential circuits have memory, so the past affects the output.
key: A flip-flop stores one bit. It changes state on a clock edge.
- D flip-flop: the output Q takes the value of D at each clock edge.
- JK flip-flop: J sets, K resets, and both 1 toggles the output.
- T flip-flop: toggles when T = 1.
A clock signal is a steady square wave that synchronizes changes. Counters are built from flip-flops: a 4-bit counter counts from 0 to 15 and then rolls over.
Registers store multiple bits; shift registers move bits left or right on each clock pulse.
term: flip-flop = a circuit that stores one bit of data
term: clock signal = a regular pulse that synchronizes a sequential circuit
term: counter = a sequential circuit that counts clock pulses
term: register = a group of flip-flops that store multiple bits
q: How many states can a 3-bit counter count through? | *8 | 3 | 6 | 16
why: 2³ = 8 states (0 to 7).
q: A D flip-flop's output changes… | *on the clock edge to match D | randomly | only when power turns off | never
why: It samples D at each clock edge.

@lesson Microcontrollers and programmable logic
say: Microcontrollers are tiny computers that control everything from microwaves to robots.
key: A microcontroller (like Arduino) combines a processor, memory and input/output pins on one chip. It runs a program that reads inputs (sensors, buttons) and controls outputs (LEDs, motors).
Digital pins read or write HIGH (1) or LOW (0). Analog inputs read varying voltages through an analog-to-digital converter (ADC). Pulse-width modulation (PWM) simulates analog output by switching on and off rapidly, used to dim LEDs and control motor speed.
code:
| void loop() {
|   if (digitalRead(2) == HIGH) {
|     digitalWrite(13, HIGH);
|   } else {
|     digitalWrite(13, LOW);
|   }
| }
Programmable logic devices (like FPGAs) let engineers build custom digital circuits in software.
term: microcontroller = a small computer on a chip that controls devices
term: PWM = pulse-width modulation, rapidly switching a signal to simulate analog levels
term: analog-to-digital converter = a circuit that converts a varying voltage into a number
term: FPGA = a reconfigurable chip that can implement custom digital circuits
q: What does the code above do? | *Turns on the LED on pin 13 when the button on pin 2 is pressed | Blinks forever | Reads temperature | Nothing
why: It mirrors the button state to the LED.
q: Dimming an LED with a microcontroller typically uses… | *PWM | an ADC | a flip-flop | a decoder
why: Varying the duty cycle changes brightness.
`;
