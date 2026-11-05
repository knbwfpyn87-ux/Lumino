export default String.raw`
@course anatomy | Anatomy & Physiology | Honors | 🫀 | Science

@unit Organization of the Body | Levels of organization, anatomical terms, homeostasis, tissues
@lesson Body organization and anatomical language
say: Anatomy is the study of body structure; physiology is how it works. First, let's learn to speak the language.
The body is organized from chemicals to cells, tissues, organs, organ systems and the whole organism.
key: Anatomical position: standing upright, facing forward, arms at sides, palms forward. All directions are described from this position.
Directional terms:
- Superior (above) and inferior (below).
- Anterior (front) and posterior (back).
- Medial (toward the midline) and lateral (away from it).
- Proximal (closer to where a limb attaches) and distal (farther).
Body planes: sagittal (left and right), frontal (front and back) and transverse (top and bottom). Body cavities include the cranial, thoracic and abdominopelvic cavities.
term: anatomical position = the standard reference position for describing the body
term: proximal = closer to the point where a limb attaches to the body
term: distal = farther from the point where a limb attaches
term: sagittal plane = a plane dividing the body into left and right parts
q: The wrist is ___ to the elbow. | *distal | proximal | superior | medial
why: It's farther from where the arm attaches.
q: The nose is ___ to the ears. | *medial | lateral | posterior | distal
why: It's closer to the midline.
gen: bank.BIO.anatomy

@lesson Homeostasis and tissues
say: The body works constantly to keep its internal conditions stable. Tissues are the teams that make it possible.
key: Homeostasis is maintained mostly by negative feedback: a receptor detects a change, a control center (often the brain) responds, and an effector reverses the change.
Example: when body temperature rises, sweat glands release sweat, and blood vessels near the skin widen to release heat.
Four tissue types:
- Epithelial: covers surfaces and lines organs (skin, stomach lining).
- Connective: supports and connects (bone, cartilage, blood, fat).
- Muscle: contracts to produce movement (skeletal, cardiac, smooth).
- Nervous: sends electrical signals (neurons).
lab: Cooling down after exercise
aim: Measure core body temperature after exercise. How does negative feedback bring it back to 37 °C?
set: t = 5 | Time after exercise (min) | 0 to 60 by 1
set: rise = 2 | Temperature rise from exercise (°C) | 0.5 to 3 by 0.5
out: T = 37 + rise*exp(-t/12) | Core temperature (°C)
plot: t, T
step: Record the temperature every 10 minutes.
noise: 1
result: Sweating and wider skin blood vessels remove heat fastest when the temperature is furthest from the set point, so it returns smoothly to about 37 °C. That's negative feedback.
term: negative feedback = a response that reverses a change to restore balance
term: epithelial tissue = tissue that covers body surfaces and lines organs
term: connective tissue = tissue that supports and connects other tissues
term: effector = a muscle or gland that carries out a response
q: Blood is classified as which tissue type? | *Connective | Epithelial | Muscle | Nervous
why: Blood is a fluid connective tissue.
q: Shivering to warm up is an example of… | *negative feedback | positive feedback | a tissue | anatomy
why: It reverses a drop in body temperature.

@unit Support and Movement | The skeletal system, the muscular system
@lesson The skeletal system
say: Your skeleton supports you, protects your organs, and even makes your blood cells.
The adult skeleton has 206 bones, divided into the axial skeleton (skull, spine, ribs) and the appendicular skeleton (limbs, shoulders, hips).
key: Functions of bones: support, protection, movement (with muscles), mineral storage (calcium) and blood cell production in red bone marrow.
Bone is living tissue constantly remodeled by osteoblasts (build bone) and osteoclasts (break it down). Joints connect bones: immovable (skull sutures), slightly movable (vertebrae), and freely movable synovial joints (knee, shoulder). Ligaments connect bone to bone.
Weight-bearing exercise and calcium help keep bones strong; osteoporosis weakens them.
term: axial skeleton = the bones of the skull, spine and rib cage
term: red bone marrow = tissue inside bones that makes blood cells
term: ligament = connective tissue joining bone to bone
term: osteoblast = a cell that builds new bone
q: Where are blood cells made? | *Red bone marrow | The heart | The liver only | Cartilage
why: Marrow produces red and white blood cells.
q: What connects bone to bone? | *Ligaments | Tendons | Cartilage only | Muscles
why: Tendons connect muscle to bone.

@lesson The muscular system
say: Muscles move you, pump your blood and push food through your body. Let's see how they contract.
key: Three muscle types: skeletal (voluntary, attached to bones by tendons), cardiac (involuntary, only in the heart), and smooth (involuntary, in organs like the stomach and blood vessels).
Muscles can only pull, not push, so they work in pairs: when the biceps contracts, the triceps relaxes.
Sliding filament theory: inside muscle fibers, actin and myosin filaments slide past each other to shorten the muscle. This requires ATP and calcium, triggered by signals from motor neurons.
Exercise builds muscle strength and endurance; muscles weaken without use (atrophy).
lab: The forearm as a lever
aim: How hard must the biceps pull to hold a weight in your hand?
set: m = 5 | Mass held (kg) | 1 to 20 by 1
set: dl = 35 | Hand distance from elbow (cm) | 20 to 40 by 1
set: di = 4 | Biceps attachment distance (cm) | 3 to 6 by 0.5
out: F = m*g*dl/di | Biceps force (N)
out: ratio = dl/di | Force multiplier
plot: m, F
step: Record the biceps force for 4 masses.
step: Then move the attachment point farther from the elbow.
noise: 2
result: The forearm is a third-class lever: the muscle attaches close to the elbow, so it must pull about 9 times the load. The trade-off is speed and range of motion at the hand.
term: skeletal muscle = voluntary muscle attached to bones
term: tendon = connective tissue joining muscle to bone
term: sliding filament theory = the model of muscle contraction where actin and myosin slide past each other
term: antagonistic muscles = muscle pairs that work in opposition
q: Which muscle type is found only in the heart? | *Cardiac | Skeletal | Smooth | Voluntary
why: Cardiac muscle pumps blood.
q: Muscles can only… | *pull | push | both push and pull | stretch themselves
why: That's why they work in opposing pairs.

@unit Control Systems | The nervous system, the endocrine system
@lesson The nervous system
say: The nervous system is your body's high-speed communication network.
The central nervous system (CNS) is the brain and spinal cord. The peripheral nervous system (PNS) includes nerves throughout the body.
key: Neurons send electrical impulses (action potentials) along axons. At synapses, they release neurotransmitters to signal the next cell.
Parts of the brain: cerebrum (thinking, senses, voluntary movement), cerebellum (balance and coordination), and brainstem (breathing, heart rate). The autonomic nervous system controls involuntary functions: sympathetic (fight-or-flight) and parasympathetic (rest-and-digest).
A reflex arc lets the spinal cord respond quickly without waiting for the brain, like pulling your hand from a hot stove.
lab: Ruler drop reaction time
aim: Catch a falling ruler and use how far it fell to calculate your reaction time.
set: d = 15 | Distance the ruler fell (cm) | 5 to 30 by 1
out: t = sqrt(2*d/100/g)*1000 | Reaction time (ms)
plot: d, t
step: Record the reaction time for at least 4 catches.
step: A nerve impulse travels about 1 m in 10–20 ms. What else takes time?
noise: 2
result: Typical reaction times are 150–250 ms. Only a small part is nerve conduction; most is the brain processing the signal (synapses) before sending a message to the hand muscles.
term: neuron = a nerve cell that transmits electrical signals
term: synapse = the junction where a neuron passes a signal to another cell
term: cerebellum = the brain region that coordinates balance and movement
term: reflex arc = a fast, automatic nerve pathway through the spinal cord
q: Which brain part controls balance? | *Cerebellum | Cerebrum | Brainstem | Spinal cord
why: It coordinates movement.
q: Pulling your hand from a hot stove before feeling pain is a… | *reflex | conscious decision | hormone response | digestion
why: The spinal cord responds before the brain.

@lesson The endocrine system
say: The endocrine system sends slower but longer-lasting messages using hormones carried in the blood.
key: Glands release hormones into the bloodstream, which travel to target cells with matching receptors.
Major glands and hormones:
- Pituitary: the "master gland," controlled by the hypothalamus; releases growth hormone and hormones that control other glands.
- Thyroid: thyroxine regulates metabolism.
- Adrenal glands: adrenaline (fight-or-flight) and cortisol (stress).
- Pancreas: insulin lowers blood sugar; glucagon raises it.
- Ovaries and testes: estrogen, progesterone and testosterone.
Diabetes happens when the body doesn't make enough insulin (type 1) or doesn't respond to it well (type 2).
term: hormone = a chemical messenger carried in the blood
term: pituitary gland = the master gland that controls many other glands
term: insulin = a hormone from the pancreas that lowers blood sugar
term: target cell = a cell with receptors for a specific hormone
q: Which hormone lowers blood sugar? | *Insulin | Glucagon | Adrenaline | Thyroxine
why: Insulin helps cells absorb glucose.
q: The "master gland" is the… | *pituitary | thyroid | adrenal gland | pancreas
why: It controls many other glands.

@unit Transport and Exchange | Cardiovascular system, respiratory system
@lesson The cardiovascular system
say: Your heart beats about 100,000 times a day, pumping blood through a network of vessels that would stretch around Earth twice.
key: Blood flow: body → right atrium → right ventricle → lungs (pulmonary circuit) → left atrium → left ventricle → body (systemic circuit).
Valves keep blood flowing in one direction. The left ventricle has the thickest walls because it pumps blood to the whole body.
- Arteries carry blood away from the heart under high pressure.
- Veins carry blood back to the heart and have valves.
- Capillaries are tiny vessels where gases and nutrients are exchanged.
Blood contains red blood cells (carry oxygen with hemoglobin), white blood cells (fight infection), platelets (clotting) and plasma.
term: atrium = an upper chamber of the heart that receives blood
term: ventricle = a lower chamber of the heart that pumps blood out
term: hemoglobin = the protein in red blood cells that carries oxygen
term: capillary = a tiny blood vessel where exchange with tissues occurs
q: Which chamber pumps blood to the body? | *Left ventricle | Right ventricle | Left atrium | Right atrium
why: It sends oxygen-rich blood through the aorta.
q: Which blood component helps clotting? | *Platelets | Red blood cells | Plasma | White blood cells
why: Platelets plug damaged vessels.
gen: bank.BIO.body

@lesson The respiratory system
say: Breathing brings in oxygen your cells need and removes carbon dioxide they produce.
key: Air path: nose/mouth → pharynx → larynx → trachea → bronchi → bronchioles → alveoli. Gas exchange happens in the alveoli, tiny air sacs surrounded by capillaries.
Oxygen diffuses from alveoli into the blood; carbon dioxide diffuses from blood into the alveoli to be exhaled.
The diaphragm contracts and moves down to pull air in (inhalation); it relaxes and moves up to push air out (exhalation).
The brainstem controls breathing rate mainly by sensing CO₂ levels in the blood. Smoking damages alveoli and cilia that clean the airways.
lab: Spirometer and breathing
aim: Measure breathing rate and tidal volume to find how much air moves in and out each minute.
set: f = 12 | Breaths per minute | 8 to 40 by 1
set: TV = 0.5 | Tidal volume (L) | 0.3 to 3 by 0.1
out: VE = f*TV | Minute ventilation (L/min)
out: VA = f*(TV - 0.15) | Air reaching alveoli (L/min)
plot: f, VE
step: Record ventilation at rest (12 breaths, 0.5 L), then during exercise.
step: Compare fast shallow breathing with slow deep breathing at the same ventilation.
noise: 3
result: Ventilation = rate × tidal volume, rising from about 6 L/min to over 100 L/min in hard exercise. About 0.15 L of each breath stays in the airways (dead space), so deep breaths are more efficient.
term: alveoli = tiny air sacs in the lungs where gas exchange occurs
term: diaphragm = the dome-shaped muscle that drives breathing
term: trachea = the windpipe leading to the lungs
term: cilia = tiny hairs that sweep mucus and particles out of the airways
q: Where does gas exchange occur? | *Alveoli | Trachea | Bronchi | Larynx
why: Thin walls let gases diffuse.
q: What mainly signals the brain to breathe faster? | *Rising CO₂ in the blood | Low temperature | Full stomach | High oxygen
why: The brainstem monitors CO₂.

@unit Processing and Protection | Digestive and urinary systems, immune system
@lesson Digestion and excretion
say: Your digestive system breaks food into nutrients, and your kidneys filter waste from your blood.
key: Digestive path: mouth → esophagus → stomach → small intestine → large intestine. Mechanical digestion breaks food physically; chemical digestion uses enzymes.
- Mouth: saliva (amylase) begins breaking down starch.
- Stomach: acid and pepsin break down proteins.
- Small intestine: most digestion and absorption happen here, through villi that increase surface area. The liver makes bile to break up fats, and the pancreas supplies enzymes.
- Large intestine: absorbs water.
The urinary system filters blood through the kidneys' nephrons, removing wastes like urea and balancing water and salts. Urine travels through the ureters to the bladder.
lab: Bile and surface area
aim: Break a 1 cm cube of fat into smaller pieces, as bile does, and calculate the surface area lipase can work on.
set: s = 5 | Piece size (mm) | 0.1 to 10 by 0.1
out: SA = 6*10^3/s/100 | Total surface area (cm²)
out: n = (10/s)^3 | Number of pieces
plot: s, SA
step: Record the surface area for at least 4 piece sizes.
noise: 1
result: Halving the piece size doubles the total surface area. Bile emulsifies fat into tiny droplets, so lipase has far more surface to act on and digestion is much faster.
term: villi = finger-like projections in the small intestine that absorb nutrients
term: bile = a liver fluid that breaks fats into small droplets
term: nephron = the filtering unit of the kidney
term: enzyme = a protein that speeds up chemical reactions like digestion
q: Where are most nutrients absorbed? | *Small intestine | Stomach | Large intestine | Esophagus
why: Villi provide huge surface area.
q: What do the kidneys filter? | *Blood | Air | Food | Bile
why: They remove wastes from the blood.

@lesson The immune system
say: Your immune system defends you against germs with layers of protection.
key: Lines of defense:
- First: barriers like skin, mucus and stomach acid.
- Second: nonspecific responses like inflammation, fever and white blood cells that engulf invaders (phagocytes).
- Third: specific (adaptive) immunity. B cells make antibodies that tag specific pathogens; T cells destroy infected cells and coordinate the response.
Memory cells remember pathogens, so a second infection is fought off faster. Vaccines train memory cells safely.
Problems include allergies (overreaction to harmless substances), autoimmune diseases (attacking the body's own cells) and immunodeficiency (like HIV weakening T cells).
term: pathogen = a disease-causing organism like a bacterium or virus
term: antibody = a protein that binds to a specific antigen
term: memory cell = an immune cell that remembers a pathogen for faster future responses
term: autoimmune disease = a condition in which the immune system attacks the body's own cells
q: Which cells make antibodies? | *B cells | Red blood cells | Platelets | Neurons
why: B cells produce antibodies.
q: Skin is part of which line of defense? | *First | Second | Third | None
why: It's a physical barrier.
`;
