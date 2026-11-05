export default String.raw`
@course engineering | Intro to Engineering Design | Standard | 🛠️ | Computer Science

@unit The Design Process | The engineering design process, defining problems and brainstorming
@lesson The engineering design process
say: Engineers solve real problems with creativity and science. They follow a design process that loops until the solution works.
key: The engineering design process: define the problem → research → brainstorm solutions → select the best idea → build a prototype → test and evaluate → improve (iterate) → communicate results.
Engineering is iterative: testing usually reveals problems, so engineers redesign and test again.
Engineers document everything in an engineering notebook, so others can understand and reproduce their work.
ex: A team's bridge prototype collapses under a small load. What should they do next?
> Analyze where and why it failed
> Redesign that part and test again
= Iterate: improve the design based on test results
term: engineering design process = a series of steps engineers use to solve problems
term: prototype = a working model used to test a design
term: iteration = repeating the design cycle to improve a solution
term: engineering notebook = a record of an engineer's ideas, sketches and test data
q: What comes right after building a prototype? | *Testing and evaluating it | Brainstorming | Defining the problem | Shipping it
why: You must check whether it works.
q: Why is engineering called iterative? | *Designs are improved through repeated cycles | It's done once | It uses iron | It avoids testing
why: Each test leads to improvements.
gen: bank.CS.engineering

@lesson Defining problems and brainstorming
say: A well-defined problem is half solved. Let's learn to define problems and generate great ideas.
key: A design brief states the problem, the client, and the criteria and constraints. Criteria are requirements the design must meet (holds 5 kg, fits in a backpack). Constraints are limits (budget of $20, must be made of recycled materials).
Brainstorming rules: generate many ideas, don't criticize during brainstorming, build on others' ideas, and welcome wild ideas.
A decision matrix compares options by scoring each against weighted criteria, helping choose the best solution objectively.
Consider users: interviewing the people who will use a product reveals their real needs (human-centered design).
term: design brief = a document describing a design problem, criteria and constraints
term: criteria = requirements a design must meet
term: constraint = a limit on a design, like budget or materials
term: decision matrix = a table for comparing design options against criteria
q: "The phone stand must cost under $5" is a… | *constraint | criterion | prototype | brainstorm
why: It's a limit on the design.
q: During brainstorming, you should… | *generate many ideas without criticizing | pick the first idea | judge each idea immediately | work alone silently
why: Quantity leads to quality.

@unit Technical Drawing and Modeling | Sketching and technical drawing, measurement and CAD
@lesson Sketching and technical drawing
say: Engineers communicate with drawings. A clear sketch can explain a design faster than pages of words.
key: Types of drawings:
- Isometric drawings show three faces of an object at once, with axes 120° apart.
- Orthographic (multiview) drawings show separate front, top and right side views.
- Oblique drawings show the front face flat with depth at an angle.
Line types communicate meaning: visible lines (solid, thick), hidden lines (dashed) and center lines (long and short dashes).
Dimensions show sizes and locations of features. Tolerances specify how much a dimension can vary and still work.
ex: Which view would show the depth and width of a box but not its height?
> Looking down from above shows width and depth
= The top view
term: isometric drawing = a 3D drawing with axes 120° apart showing three faces
term: orthographic projection = a set of 2D views of an object from different directions
term: hidden line = a dashed line showing an edge not visible from that view
term: tolerance = the acceptable variation in a dimension
q: Dashed lines in a technical drawing show… | *hidden edges | center points | dimensions | visible edges
why: They represent edges you can't see from that view.
q: An orthographic drawing typically shows… | *front, top and side views | one 3D view only | a photograph | a perspective sketch
why: It uses separate 2D views.

@lesson Measurement and CAD
say: Precise measurements and computer models turn ideas into buildable designs.
key: Engineers use precise tools: rulers, calipers (measure to hundredths of a millimeter) and micrometers. Measure twice, cut once.
Accuracy is how close a measurement is to the true value; precision is how consistent repeated measurements are.
Computer-aided design (CAD) software builds 3D models from 2D sketches using features like extrude, revolve, fillet and hole. CAD models can be tested virtually and sent to 3D printers or CNC machines.
Units matter: always label measurements and convert carefully between metric (mm, cm, m) and US customary (inches, feet) units. 1 inch = 25.4 mm.
term: caliper = a tool for precisely measuring dimensions
term: CAD = computer-aided design software for creating models and drawings
term: extrude = a CAD operation that turns a 2D sketch into a 3D shape
term: 3D printing = building objects layer by layer from a digital model
q: 2 inches equals how many millimeters? | *50.8 | 25.4 | 20 | 5.08
why: 2 × 25.4.
q: Turning a 2D circle into a cylinder in CAD uses… | *extrude | fillet | sketch | measure
why: Extrude adds depth to a sketch.

@unit Engineering Principles | Forces and structures, mechanisms
@lesson Forces and structures
say: Bridges, buildings and chairs all have to handle forces safely. Engineers analyze those forces.
key: Structural members experience tension (being pulled apart), compression (being pushed together), shear (sliding forces) and torsion (twisting).
Triangles are the strongest simple shape because they can't change shape without changing a side length. That's why trusses (in bridges and roofs) use triangles.
For a structure to stay still, it must be in equilibrium: the forces and torques balance.
Engineers include a factor of safety: designing for loads several times greater than expected, so structures don't fail under unexpected stress.
ex: A rope holding up a hanging sign experiences which force?
> The sign's weight pulls the rope downward
= Tension
term: tension = a pulling force that stretches a material
term: compression = a pushing force that squeezes a material
term: truss = a structure made of triangles that efficiently carries loads
term: factor of safety = the ratio of a structure's strength to the expected load
q: Why do bridges use triangles? | *Triangles are rigid and don't deform easily | They look nice | They're cheaper only | They're circles
why: A triangle's shape is fixed by its side lengths.
q: A column holding up a roof is mainly in… | *compression | tension | torsion | shear
why: The roof pushes down on it.
gen: stem.work

@lesson Mechanisms and simple machines
say: Simple machines make work easier by trading force for distance. They're inside nearly every mechanism.
key: The six simple machines: lever, wheel and axle, pulley, inclined plane, wedge and screw. They reduce the force needed by increasing the distance over which it acts (work stays the same, ignoring friction).
Mechanical advantage (MA) = output force ÷ input force. Ideal MA for a lever = effort arm length ÷ resistance arm length.
Gears transfer motion and change speed and torque. Gear ratio = driven gear teeth ÷ driver gear teeth. A larger driven gear turns slower with more torque.
ex: A lever has an effort arm of 3 m and a resistance arm of 0.5 m. Find its ideal mechanical advantage.
> IMA = 3 ÷ 0.5
= 6 (you need 1/6 the force)
term: simple machine = a basic device that changes the size or direction of a force
term: mechanical advantage = the ratio of output force to input force
term: gear ratio = the ratio of teeth on the driven gear to the driver gear
term: torque = a twisting force that causes rotation
q: A ramp is which simple machine? | *Inclined plane | Lever | Pulley | Screw
why: It's a sloped surface.
q: A gear with 40 teeth is driven by a gear with 10 teeth. The gear ratio is… | *4:1 | 1:4 | 10:1 | 40:1
why: 40 ÷ 10.
gen: stem.power

@unit Engineering in the World | Materials and manufacturing, careers and ethics
@lesson Materials and manufacturing
say: Choosing the right material and process is a key engineering decision.
key: Material properties: strength, stiffness, hardness, ductility (can stretch), density, cost and environmental impact.
Material types: metals (strong, conductive), polymers (plastics; light, flexible), ceramics (hard, heat-resistant, brittle) and composites (combinations like carbon fiber, very strong and light).
Manufacturing processes: subtractive (cutting away material, like milling and CNC machining), additive (building up layers, like 3D printing) and forming (molding, casting, bending).
Sustainable design considers a product's whole life cycle: materials, energy use, recyclability and disposal.
term: composite = a material made by combining two or more materials
term: ductility = a material's ability to stretch without breaking
term: subtractive manufacturing = making parts by removing material
term: life cycle assessment = evaluating a product's environmental impact from creation to disposal
q: 3D printing is an example of… | *additive manufacturing | subtractive manufacturing | casting | welding
why: It builds parts layer by layer.
q: Which material is hard and heat-resistant but brittle? | *Ceramic | Rubber | Copper | Nylon
why: Ceramics crack under impact.

@lesson Engineering careers and ethics
say: Engineering offers many paths, and every engineer has a responsibility to keep people safe.
key: Engineering fields include civil (bridges, roads), mechanical (machines, engines), electrical (circuits, power), chemical (processes, materials), biomedical (medical devices), computer and software, environmental and aerospace.
Engineers must hold public safety paramount. Codes of ethics require honesty, competence, and reporting dangers. Historical failures, like the collapse of the Tacoma Narrows Bridge (1940) and the Challenger disaster (1986), show what's at stake.
Teamwork and communication are essential: engineers write reports, present designs and collaborate across fields.
term: civil engineering = engineering of infrastructure like roads, bridges and buildings
term: biomedical engineering = engineering applied to medicine and biology
term: code of ethics = a set of principles guiding professional behavior
q: Which engineer designs prosthetic limbs? | *Biomedical | Civil | Chemical | Aerospace
why: Biomedical engineers create medical devices.
q: An engineer's top ethical priority is… | *public safety | lowest cost | fastest delivery | personal fame
why: Codes of ethics put safety first.
`;
