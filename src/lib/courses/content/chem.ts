export default String.raw`
@course chem | Chemistry | Standard | ⚗️ | Science

@unit Matter and Measurement | Classifying matter, physical and chemical changes, measurement, significant figures and unit conversions
@lesson Classifying matter
say: Chemistry is the study of matter: anything that has mass and takes up space. Let's sort it into groups.
Matter is either a pure substance or a mixture.
- Elements are pure substances made of one kind of atom (oxygen, gold).
- Compounds are pure substances made of two or more elements chemically combined in a fixed ratio (water, H₂O).
- Mixtures are physical blends. Homogeneous mixtures (solutions) look the same throughout, like salt water. Heterogeneous mixtures have visible parts, like salad.
Mixtures can be separated by physical methods such as filtering, evaporation and distillation. Compounds can only be broken apart by chemical reactions.
The three common states of matter are solid (fixed shape and volume), liquid (fixed volume, takes the container's shape) and gas (fills its container).
term: element = a pure substance made of only one kind of atom
term: compound = a substance made of two or more elements chemically bonded in a fixed ratio
term: homogeneous mixture = a mixture that is the same throughout; a solution
term: heterogeneous mixture = a mixture with visibly different parts
q: Which is a compound? | *Carbon dioxide | Oxygen gas | Salt water | Gold
why: CO₂ is two elements chemically bonded in a fixed ratio.
q: Air is best classified as a… | *homogeneous mixture | compound | element | heterogeneous mixture
why: Air is a uniform blend of gases.
gen: bank.CHEM.atoms

@lesson Physical and chemical changes
say: Some changes just change how matter looks. Others create brand new substances. Let's tell them apart.
A physical change alters form or state but not identity: melting ice, cutting paper, dissolving sugar.
A chemical change produces new substances with new properties: burning wood, rusting iron, baking a cake.
key: Signs of a chemical change: a color change, gas bubbles, a precipitate (solid forming in a liquid), light, or an unexpected temperature change.
Physical properties can be observed without changing the substance (color, density, melting point). Chemical properties describe how a substance reacts (flammability, reactivity with acid).
ex: Is boiling water a physical or chemical change?
> The bubbles are water vapor, still H₂O
> No new substance forms
= Physical change
term: physical change = a change in form or state that does not create a new substance
term: chemical change = a change that produces one or more new substances
term: precipitate = a solid that forms from a reaction in a solution
term: chemical property = a property that describes how a substance reacts, like flammability
q: Which is a chemical change? | *Iron rusting | Ice melting | Salt dissolving | Glass breaking
why: Rust (iron oxide) is a new substance.
q: Density is a… | *physical property | chemical property | chemical change | mixture
why: You can measure density without changing the substance.

@lesson Measurement and significant figures
say: Scientists need measurements everyone can trust. That means using metric units and showing how precise you are.
Chemists use SI units: meters (length), kilograms (mass), seconds (time), kelvin (temperature) and moles (amount). Prefixes scale them: kilo = 1,000, centi = 1/100, milli = 1/1,000.
Accuracy is how close a measurement is to the true value. Precision is how close repeated measurements are to each other.
Significant figures show the precision of a measurement:
- Nonzero digits are significant.
- Zeros between nonzero digits are significant (205 has 3).
- Leading zeros are not (0.0042 has 2).
- Trailing zeros count only if there's a decimal point (2.50 has 3; 250 has 2).
ex: Convert 3.5 km to meters using dimensional analysis
> Multiply by the conversion factor 1000 m / 1 km
> 3.5 × 1000
= 3,500 m
lab: Density of aluminum
aim: Measure the mass of aluminum blocks with different volumes. What does the graph's slope tell you?
set: V = 10 | Block volume (cm³) | 1 to 50 by 1
out: m = 2.70*V | Mass (g)
out: d = m/V | Density (g/cm³)
plot: V, m
step: Choose a block size and press Record. Record at least 5 blocks.
step: Look at the density column. Does it change with size?
noise: 2
result: Mass is proportional to volume, so the graph is a straight line through the origin. Its slope is the density, about 2.70 g/cm³, an intensive property that's the same for any size of aluminum.
term: significant figures = the digits in a measurement that are known with certainty plus one estimated digit
term: accuracy = how close a measurement is to the true value
term: precision = how close repeated measurements are to each other
term: dimensional analysis = converting units by multiplying by conversion factors
q: How many significant figures are in 0.00570? | *3 | 5 | 2 | 6
why: Leading zeros don't count; the trailing zero after the decimal does: 5, 7, 0.
q: How many milligrams are in 2.4 grams? | *2,400 mg | 0.0024 mg | 240 mg | 24 mg
why: 1 g = 1,000 mg.
gen: alg.sciNote

@unit Atomic Structure | Protons, neutrons and electrons; isotopes and atomic mass; electron configurations
@lesson Inside the atom
say: Everything is made of atoms, and atoms are made of even smaller particles. Let's look inside!
- Protons: positive charge, in the nucleus, mass about 1 amu.
- Neutrons: no charge, in the nucleus, mass about 1 amu.
- Electrons: negative charge, outside the nucleus in energy levels, almost no mass.
key: The atomic number is the number of protons, and it defines the element. Mass number = protons + neutrons.
In a neutral atom, electrons equal protons. Ions have gained or lost electrons: losing electrons makes a positive ion (cation); gaining makes a negative ion (anion).
ex: How many protons, neutrons and electrons are in ²³Na⁺ (sodium, atomic number 11)?
> Protons = atomic number = 11
> Neutrons = 23 − 11 = 12
> The + charge means it lost one electron: 11 − 1 = 10
= 11 protons, 12 neutrons, 10 electrons
term: atomic number = the number of protons in an atom's nucleus
term: mass number = the total number of protons and neutrons in an atom
term: ion = an atom that has gained or lost electrons, giving it a charge
term: nucleus = the dense center of an atom containing protons and neutrons
q: An atom has 17 protons and 18 neutrons. What is its mass number? | *35 | 17 | 18 | 1
why: 17 + 18 = 35.
q: An atom loses 2 electrons. Its charge is… | *2+ | 2− | 0 | 1+
why: Losing negative electrons leaves a positive charge.
gen: stem.atomParts

@lesson Isotopes and atomic models
say: Atoms of the same element can have different numbers of neutrons. And our picture of the atom has changed a lot over time!
Isotopes are atoms of the same element with different numbers of neutrons, like carbon-12 and carbon-14.
The atomic mass on the periodic table is a weighted average of all the isotopes, based on how common each one is.
ex: Chlorine is 75% Cl-35 and 25% Cl-37. Find its average atomic mass.
> 0.75 × 35 = 26.25
> 0.25 × 37 = 9.25
= 35.5 amu
Atomic models through history: Dalton (solid spheres), Thomson (plum pudding, discovered electrons), Rutherford (gold foil experiment showed a tiny dense nucleus), Bohr (electrons in fixed energy levels), and the modern quantum model (electron clouds called orbitals).
lab: Mass spectrometer: chlorine isotopes
aim: Change the abundance of chlorine-35 versus chlorine-37 and see how the average atomic mass changes.
set: p = 76 | Chlorine-35 abundance (%) | 0 to 100 by 1
out: A = (34.97*p + 36.97*(100 - p))/100 | Average atomic mass (u)
plot: p, A
step: Record the average atomic mass for at least 4 abundances, including 76%.
step: Compare your result at 76% with the periodic table value for chlorine (35.45).
result: Average atomic mass is a weighted average of the isotope masses. Real chlorine is about 76% Cl-35, which gives 35.45 u, closer to 35 because that isotope is more common.
term: isotope = an atom of an element with a different number of neutrons
term: atomic mass = the weighted average mass of an element's isotopes
term: gold foil experiment = Rutherford's experiment showing atoms have a small, dense, positive nucleus
q: Carbon-12 and carbon-14 differ in their number of… | *neutrons | protons | electrons | elements
why: Isotopes have the same protons but different neutrons.
q: Who discovered the nucleus? | *Rutherford | Dalton | Thomson | Bohr
why: The gold foil experiment revealed the nucleus.

@lesson Electron configuration
say: Electrons fill energy levels in a set order, like seats filling in a stadium. Let's write their address!
Electrons occupy energy levels (1, 2, 3…) divided into sublevels s, p, d and f, which hold 2, 6, 10 and 14 electrons.
key: Fill order: 1s 2s 2p 3s 3p 4s 3d 4p 5s… (lowest energy first).
ex: Write the electron configuration for oxygen (8 electrons)
> 1s² uses 2, 2s² uses 2
> 2p⁴ holds the last 4
= 1s² 2s² 2p⁴
Valence electrons are in the outermost energy level. They determine how an atom bonds. Oxygen has 6 valence electrons (2s² 2p⁴).
When electrons absorb energy they jump to higher levels; when they fall back, they release light of specific colors. That's why each element has a unique emission spectrum (and why fireworks have colors).
term: electron configuration = the arrangement of electrons in an atom's orbitals
term: valence electrons = electrons in the outermost energy level of an atom
term: orbital = a region where an electron is likely to be found
term: emission spectrum = the specific colors of light given off by an element's excited electrons
q: How many electrons fit in a p sublevel? | *6 | 2 | 10 | 8
why: There are three p orbitals with 2 electrons each.
q: How many valence electrons does carbon (1s² 2s² 2p²) have? | *4 | 2 | 6 | 12
why: 2s² 2p² puts 4 electrons in the outer level.

@unit The Periodic Table | Organization of the table, families of elements, periodic trends
@lesson Organization of the periodic table
say: The periodic table is chemistry's cheat sheet. Its layout tells you how every element behaves.
Elements are arranged by atomic number. Rows are periods; columns are groups (families). Elements in a group have the same number of valence electrons, so they behave similarly.
- Group 1: alkali metals (very reactive, 1 valence electron).
- Group 2: alkaline earth metals.
- Groups 3–12: transition metals.
- Group 17: halogens (very reactive nonmetals, 7 valence electrons).
- Group 18: noble gases (full outer shell, very unreactive).
Metals are on the left (shiny, conductive, malleable), nonmetals on the right, and metalloids along the staircase line in between.
term: period = a horizontal row of the periodic table
term: group = a vertical column of elements with similar properties
term: noble gases = group 18 elements with full outer shells that rarely react
term: halogens = group 17 elements with 7 valence electrons
term: metalloid = an element with properties of both metals and nonmetals
q: Why do elements in the same group behave alike? | *Same number of valence electrons | Same atomic mass | Same number of neutrons | They're in the same period
why: Valence electrons control chemical behavior.
q: Which group is the least reactive? | *Noble gases | Alkali metals | Halogens | Transition metals
why: Noble gases already have full outer shells.
gen: bank.CHEM.periodic

@lesson Periodic trends
say: Properties change in patterns across the table. Learn the directions and you can predict them!
- Atomic radius gets smaller across a period (more protons pull electrons closer) and bigger down a group (more energy levels).
- Ionization energy (energy to remove an electron) increases across a period and decreases down a group.
- Electronegativity (how strongly an atom attracts bonding electrons) increases across and decreases down. Fluorine is the most electronegative element.
key: Across a period, atoms get smaller and hold electrons tighter. Down a group, atoms get bigger and hold electrons looser.
ex: Which is larger, Na or Cl? Which has higher ionization energy?
> Both are in period 3; Cl is further right
> Across a period, radius shrinks and ionization energy grows
= Na is larger; Cl has higher ionization energy
lab: Pull on the outer electron
aim: Model how strongly the nucleus attracts an outer electron as nuclear charge and atomic radius change.
set: Z = 3 | Effective nuclear charge | 1 to 8 by 0.5
set: r = 150 | Atomic radius (pm) | 40 to 250 by 5
out: F = Z/(r/100)^2 | Relative attraction
plot: Z, F
step: Keep the radius fixed and record the attraction for 4 nuclear charges (moving across a period).
step: Then keep the charge fixed and increase the radius (moving down a group).
noise: 1
result: Attraction rises with effective nuclear charge and falls with the square of distance. That's why ionization energy and electronegativity increase across a period and decrease down a group.
term: atomic radius = the size of an atom, from the nucleus to the outer electrons
term: ionization energy = the energy needed to remove an electron from an atom
term: electronegativity = an atom's ability to attract electrons in a bond
q: Which element has the largest atomic radius? | *Cesium | Fluorine | Carbon | Oxygen
why: Cs is far down and to the left.
q: Electronegativity generally… | *increases across a period | decreases across a period | stays the same | increases down a group
why: Stronger nuclear pull across a period attracts electrons more.

@unit Chemical Bonding | Ionic bonds, covalent bonds and Lewis structures, molecular shape, polarity and intermolecular forces
@lesson Ionic bonding and naming
say: Atoms bond to get a full outer shell. In ionic bonds, one atom gives electrons to another.
key: Ionic bonds form when a metal transfers electrons to a nonmetal, creating oppositely charged ions that attract.
Atoms tend to gain or lose electrons to reach 8 valence electrons (the octet rule). Sodium loses 1 electron to become Na⁺; chlorine gains 1 to become Cl⁻. Together they form NaCl.
Ionic compounds form crystal lattices, have high melting points, and conduct electricity when melted or dissolved.
ex: Write the formula for the compound of calcium (Ca²⁺) and chlorine (Cl⁻)
> The charges must add to zero
> One Ca²⁺ needs two Cl⁻
= CaCl₂, named calcium chloride
To name binary ionic compounds, write the metal, then the nonmetal with -ide. Transition metals get Roman numerals for charge: FeCl₃ is iron(III) chloride.
term: ionic bond = an attraction between oppositely charged ions formed by electron transfer
term: octet rule = atoms tend to gain, lose or share electrons to have eight valence electrons
term: cation = a positive ion
term: anion = a negative ion
q: What is the formula for magnesium oxide (Mg²⁺ and O²⁻)? | *MgO | Mg₂O | MgO₂ | Mg₂O₂
why: The charges +2 and −2 already balance.
q: Ionic bonds usually form between… | *a metal and a nonmetal | two nonmetals | two metals | noble gases
why: Metals lose electrons and nonmetals gain them.
gen: bank.CHEM.bonding

@lesson Covalent bonding and Lewis structures
say: In covalent bonds, atoms share electrons instead of trading them. This is how most molecules form.
Covalent bonds form between nonmetals that share electron pairs. A single bond shares 1 pair, a double bond 2 pairs, a triple bond 3 pairs.
Lewis structures show valence electrons as dots and bonds as lines.
ex: Draw the Lewis structure of water (H₂O)
> Oxygen has 6 valence electrons; each H has 1: total 8
> O in the center, single bonds to each H (4 electrons)
> The other 4 electrons are two lone pairs on O
= H–O–H with two lone pairs on oxygen
Name molecular compounds with prefixes: mono-, di-, tri-, tetra-, penta-. CO₂ is carbon dioxide; N₂O₄ is dinitrogen tetroxide.
term: covalent bond = a bond formed when atoms share electrons
term: Lewis structure = a diagram showing valence electrons as dots and bonds as lines
term: lone pair = a pair of valence electrons not used in bonding
term: double bond = a covalent bond with two shared pairs of electrons
q: How many electrons are shared in a double bond? | *4 | 2 | 6 | 8
why: Two pairs = 4 electrons.
q: What is the name of CCl₄? | *Carbon tetrachloride | Carbon chloride | Monocarbon chloride | Tetracarbon chloride
why: Tetra- means 4 chlorine atoms; mono- is dropped for the first element.

@lesson Molecular shape, polarity and intermolecular forces
say: A molecule's 3D shape decides whether it's polar, and polarity decides things like boiling point.
VSEPR theory: electron pairs around a central atom spread as far apart as possible.
- 2 groups: linear (CO₂). 3 groups: trigonal planar. 4 groups: tetrahedral (CH₄).
- Lone pairs bend things: water is bent, ammonia is trigonal pyramidal.
A bond is polar when electrons are shared unequally (different electronegativities). A molecule is polar if it has polar bonds AND an uneven shape. CO₂ has polar bonds but is nonpolar because it's symmetric.
key: Intermolecular forces, from strongest to weakest: hydrogen bonding, dipole–dipole, London dispersion. Stronger forces mean higher boiling points.
lab: Boiling points of alkanes
aim: Heat straight-chain alkanes and record their boiling points. How does chain length affect intermolecular forces?
set: n = 4 | Carbon atoms | 1 to 10 by 1
out: M = 14*n + 2 | Molar mass (g/mol)
out: bp = 745.42*log(n + 4.4) - 689.46 | Boiling point (°C)
plot: n, bp
step: Record the boiling point for at least 5 alkanes, from methane (1) to decane (10).
noise: 1
result: Boiling point rises with chain length. Bigger molecules have more electrons and more surface contact, so their London dispersion forces are stronger and more energy is needed to separate them.
term: VSEPR theory = the idea that electron groups around a central atom repel and spread out, determining shape
term: polar molecule = a molecule with an uneven distribution of charge
term: hydrogen bonding = a strong attraction between H bonded to N, O or F and a lone pair on another molecule
term: London dispersion forces = weak temporary attractions present between all molecules
q: What is the shape of methane (CH₄)? | *Tetrahedral | Linear | Bent | Trigonal planar
why: Four bonding groups and no lone pairs.
q: Why does water have a high boiling point for its size? | *Hydrogen bonding | It's nonpolar | London forces only | It has ionic bonds
why: Strong hydrogen bonds hold water molecules together.

@unit Chemical Reactions | Writing and balancing equations, types of reactions, predicting products
@lesson Balancing chemical equations
say: Atoms are never created or destroyed in a reaction. Balancing equations makes sure the atom count matches.
key: Law of conservation of mass: the same number of each kind of atom must appear on both sides.
Reactants are on the left of the arrow; products are on the right. Balance by changing coefficients (the big numbers in front), never subscripts.
ex: Balance H₂ + O₂ → H₂O
> Oxygen: 2 on the left, 1 on the right; put 2 in front of H₂O
> Now hydrogen: 4 on the right, so put 2 in front of H₂
= 2H₂ + O₂ → 2H₂O
oops: Changing a subscript changes the substance. H₂O₂ is hydrogen peroxide, not water!
tip: Balance elements that appear in only one compound on each side first, and save H and O for last.
term: reactant = a starting substance in a chemical reaction
term: product = a substance formed in a chemical reaction
term: coefficient = a number in front of a formula showing how many units take part
term: law of conservation of mass = mass is neither created nor destroyed in a chemical reaction
q: In 3H₂O, how many hydrogen atoms are there? | *6 | 3 | 2 | 5
why: 3 molecules × 2 H each = 6.
q: To balance an equation, you may change… | *coefficients only | subscripts only | both | neither
why: Changing subscripts would change the identity of the substances.
gen: chem.balance

@lesson Types of reactions
say: Most reactions fit one of five patterns. Spot the pattern and you can predict the products.
- Synthesis: A + B → AB (2Na + Cl₂ → 2NaCl)
- Decomposition: AB → A + B (2H₂O₂ → 2H₂O + O₂)
- Single replacement: A + BC → AC + B (Zn + 2HCl → ZnCl₂ + H₂)
- Double replacement: AB + CD → AD + CB (often makes a precipitate, water or gas)
- Combustion: fuel + O₂ → CO₂ + H₂O (for hydrocarbons)
ex: Classify CH₄ + 2O₂ → CO₂ + 2H₂O
> A hydrocarbon reacts with oxygen
> Makes carbon dioxide and water
= Combustion
Single replacement only happens if the free element is more reactive than the one it replaces, which you can check on an activity series.
term: synthesis reaction = two or more substances combine to form one product
term: decomposition reaction = one compound breaks into two or more simpler substances
term: single replacement reaction = one element replaces another in a compound
term: combustion reaction = a substance reacts with oxygen, releasing energy
q: AgNO₃ + NaCl → AgCl + NaNO₃ is a… | *double replacement | single replacement | synthesis | decomposition
why: The cations swap partners.
q: 2KClO₃ → 2KCl + 3O₂ is a… | *decomposition | synthesis | combustion | single replacement
why: One compound breaks into simpler substances.
gen: bank.CHEM.reactions

@lesson Energy in reactions
say: Some reactions give off heat and some soak it up. Let's see where that energy comes from.
Breaking bonds takes energy; forming bonds releases energy.
- Exothermic reactions release energy (feel warm): combustion, hand warmers.
- Endothermic reactions absorb energy (feel cold): instant cold packs, photosynthesis.
Activation energy is the energy needed to start a reaction. A catalyst lowers it and speeds up the reaction without being used up.
Factors that speed up reactions: higher temperature, higher concentration, more surface area (smaller pieces), and catalysts. They all increase how often particles collide with enough energy (collision theory).
lab: Burning a peanut (calorimetry)
aim: Burn a peanut under a can of water and use the temperature rise to estimate its energy content.
set: p = 1 | Peanut burned (g) | 0.2 to 2 by 0.1
set: mw = 100 | Water in the can (g) | 50 to 300 by 10
out: dT = p*25000*0.35/(mw*4.18) | Temperature rise (°C)
out: E = mw*4.18*dT/p/1000 | Measured energy (kJ/g)
plot: p, dT
step: Record the temperature rise for at least 4 peanut masses.
step: Compare your measured energy per gram with the label value of about 25 kJ/g.
noise: 4
result: q = mcΔT gives about 9 kJ/g, far less than the true 25 kJ/g, because most heat escapes to the air and the can. Real calorimeters insulate the sample to reduce this error.
term: exothermic = releasing energy, usually as heat
term: endothermic = absorbing energy from the surroundings
term: activation energy = the minimum energy needed to start a reaction
term: collision theory = reactions happen when particles collide with enough energy and the right orientation
q: A reaction makes its container feel cold. It is… | *endothermic | exothermic | a combustion | catalyzed
why: It absorbs heat from its surroundings, including your hand.
q: Why does powdered sugar dissolve faster than a sugar cube? | *More surface area | Higher temperature | It's a different substance | Less mass
why: Smaller pieces expose more surface for collisions.
gen: bank.CHEM.thermo

@unit The Mole and Stoichiometry | The mole and molar mass, converting moles, mass and particles, stoichiometry and limiting reactants
@lesson The mole and molar mass
say: Atoms are too tiny to count one by one, so chemists count them by the mole, a giant dozen.
key: 1 mole = 6.02 × 10²³ particles (Avogadro's number).
Molar mass is the mass of one mole of a substance in grams. For an element, it equals the atomic mass on the periodic table: carbon is 12.01 g/mol.
ex: Find the molar mass of water (H₂O)
> H: 2 × 1.01 = 2.02
> O: 1 × 16.00 = 16.00
= 18.02 g/mol
To convert: grams ÷ molar mass = moles; moles × 6.02 × 10²³ = particles.
term: mole = 6.02 × 10²³ particles of a substance
term: Avogadro's number = 6.02 × 10²³, the number of particles in one mole
term: molar mass = the mass in grams of one mole of a substance
q: What is the molar mass of CO₂ (C = 12, O = 16)? | *44 g/mol | 28 g/mol | 32 g/mol | 60 g/mol
why: 12 + 2 × 16 = 44.
q: How many moles are in 36 g of water (18 g/mol)? | *2 mol | 0.5 mol | 18 mol | 648 mol
why: 36 ÷ 18 = 2.
gen: stem.molarMass, stem.moles

@lesson Stoichiometry
say: Stoichiometry uses a balanced equation like a recipe to figure out how much product you can make.
key: The coefficients in a balanced equation give mole ratios between substances.
Steps for a mass-to-mass problem: grams of A → moles of A (÷ molar mass) → moles of B (mole ratio) → grams of B (× molar mass).
ex: How many grams of water form from 4.0 g of H₂? (2H₂ + O₂ → 2H₂O)
> 4.0 g H₂ ÷ 2.0 g/mol = 2.0 mol H₂
> Ratio 2 H₂ : 2 H₂O, so 2.0 mol H₂O
> 2.0 mol × 18 g/mol
= 36 g H₂O
term: stoichiometry = calculating amounts of reactants and products using a balanced equation
term: mole ratio = the ratio of moles of two substances from the coefficients of a balanced equation
q: N₂ + 3H₂ → 2NH₃. How many moles of NH₃ form from 6 mol of H₂? | *4 mol | 6 mol | 2 mol | 9 mol
why: Ratio 3 H₂ : 2 NH₃, so 6 × 2/3 = 4.
q: The first step to convert grams of a reactant to grams of a product is… | *convert grams to moles | use the mole ratio | multiply by Avogadro's number | balance the product only
why: Mole ratios work with moles, not grams.
gen: stem.stoich

@lesson Limiting reactant and percent yield
say: In real reactions, one ingredient runs out first. That limiting reactant decides how much product you get.
The limiting reactant is used up first and limits the amount of product. The other is in excess.
ex: 2H₂ + O₂ → 2H₂O. You have 4 mol H₂ and 3 mol O₂. Which is limiting?
> 4 mol H₂ needs 2 mol O₂
> You have 3 mol O₂, which is more than enough
= H₂ is limiting; it makes 4 mol H₂O
Theoretical yield is the maximum product from the limiting reactant. Actual yield is what you really get in the lab.
key: Percent yield = actual yield ÷ theoretical yield × 100%.
lab: Limiting reactant: making water
aim: React hydrogen with a fixed amount of oxygen (2H₂ + O₂ → 2H₂O). When does adding more hydrogen stop helping?
set: H = 2 | Hydrogen (mol) | 0 to 8 by 0.5
set: O = 2 | Oxygen (mol) | 0.5 to 4 by 0.5
out: W = min(H, 2*O) | Water made (mol)
out: left = max(H - 2*O, 0) + max(O - H/2, 0) | Excess reactant left (mol)
plot: H, W
step: Keep the oxygen fixed and record the water made for at least 5 amounts of hydrogen.
step: Find the point where the graph levels off.
result: Water rises with hydrogen until H₂ reaches twice the O₂, then levels off: oxygen has become the limiting reactant, and any extra hydrogen is left over in excess.
term: limiting reactant = the reactant that runs out first and limits the amount of product
term: excess reactant = the reactant left over when a reaction is complete
term: percent yield = actual yield divided by theoretical yield, times 100
q: Theoretical yield 50 g, actual yield 40 g. Percent yield? | *80% | 125% | 40% | 90%
why: 40 ÷ 50 × 100 = 80%.
q: The limiting reactant is the one that… | *runs out first | is left over | has the largest mass | is a catalyst
why: When it's gone, the reaction stops.

@unit Gases | Kinetic molecular theory, gas laws, the ideal gas law
@lesson Kinetic molecular theory and pressure
say: Gas particles zoom around constantly, bumping into everything. That explains how gases behave.
Kinetic molecular theory says gas particles are tiny, far apart, move randomly and constantly, and collide without losing energy. Temperature is a measure of the particles' average kinetic energy.
Pressure is force from particle collisions on a surface. Units: atmospheres (atm), kilopascals (kPa) and mmHg. 1 atm = 101.3 kPa = 760 mmHg.
key: Gas law temperatures must be in kelvin: K = °C + 273.
Standard temperature and pressure (STP) is 273 K and 1 atm. One mole of any gas at STP takes up 22.4 L.
term: kinetic molecular theory = a model explaining gas behavior by the motion of tiny particles
term: pressure = force per unit area, caused by particles colliding with surfaces
term: kelvin = the SI temperature scale starting at absolute zero; K = °C + 273
term: STP = standard temperature and pressure, 273 K and 1 atm
q: Convert 27°C to kelvin. | *300 K | 246 K | 27 K | −246 K
why: 27 + 273 = 300.
q: What does temperature measure at the particle level? | *Average kinetic energy | Number of particles | Pressure | Volume
why: Hotter particles move faster on average.

@lesson The gas laws
say: Squeeze a gas, heat it up, or add more: each change follows a simple law.
- Boyle's law: at constant temperature, pressure and volume are inversely related. P₁V₁ = P₂V₂.
- Charles's law: at constant pressure, volume and temperature are directly related. V₁/T₁ = V₂/T₂.
- Gay-Lussac's law: at constant volume, pressure and temperature are directly related. P₁/T₁ = P₂/T₂.
- Combined gas law: P₁V₁/T₁ = P₂V₂/T₂.
ex: A gas is at 2.0 atm in 6.0 L. It is compressed to 3.0 L at constant temperature. Find the new pressure.
> Boyle: P₁V₁ = P₂V₂
> 2.0 × 6.0 = P₂ × 3.0
= P₂ = 4.0 atm
lab: Syringe and pressure gauge
aim: Squeeze a sealed syringe of air and read the pressure. How are pressure and volume related?
set: V = 30 | Volume (mL) | 10 to 60 by 1
set: T = 298 | Temperature (K) | 273 to 373 by 5
out: P = 101.3*30/V*T/298 | Pressure (kPa)
out: PV = P*V | P × V
plot: V, P
step: Keep the temperature fixed and record the pressure at 5 volumes.
step: Look at the P × V column. Then warm the syringe and repeat one volume.
noise: 2
result: Pressure is inversely proportional to volume (Boyle's law), so P × V stays constant. Heating the gas raises the pressure at the same volume, as Gay-Lussac's law predicts.
term: Boyle's law = at constant temperature, the pressure and volume of a gas are inversely proportional
term: Charles's law = at constant pressure, the volume of a gas is proportional to its kelvin temperature
term: combined gas law = P₁V₁/T₁ = P₂V₂/T₂
q: If a gas's kelvin temperature doubles at constant pressure, its volume… | *doubles | halves | stays the same | quadruples
why: Charles's law: V and T are directly proportional.
q: A balloon shrinks in a freezer. Which law explains this? | *Charles's law | Boyle's law | Avogadro's law | Dalton's law
why: Lower temperature means lower volume at the same pressure.
gen: stem.boyle, stem.charles

@lesson The ideal gas law
say: One equation ties together pressure, volume, temperature and amount of gas. It's the ideal gas law!
key: PV = nRT, where R = 0.0821 L·atm/(mol·K).
Use it when you know three of P, V, n and T and want the fourth. Make sure units match R: liters, atmospheres, moles and kelvin.
ex: How many moles of gas are in a 10.0 L tank at 2.00 atm and 300 K?
> n = PV ÷ RT
> n = (2.00 × 10.0) ÷ (0.0821 × 300)
= about 0.812 mol
Dalton's law of partial pressures: the total pressure of a gas mixture is the sum of each gas's pressure.
Real gases act less "ideal" at high pressure and low temperature, when particles are close together and attract each other.
term: ideal gas law = PV = nRT
term: ideal gas constant = R = 0.0821 L·atm/(mol·K)
term: partial pressure = the pressure one gas in a mixture would exert by itself
q: In PV = nRT, what does n stand for? | *Moles of gas | Number of particles | Pressure | Kelvin
why: n is the amount in moles.
q: A mixture has O₂ at 0.3 atm and N₂ at 0.7 atm. Total pressure? | *1.0 atm | 0.4 atm | 0.21 atm | 2.1 atm
why: Dalton's law: add the partial pressures.
gen: chem.idealGas

@unit Solutions | Solubility, concentration and molarity, dilution and colligative properties
@lesson Solutions and solubility
say: When sugar disappears into tea, it hasn't vanished. It's formed a solution. Let's see how that works.
A solution has a solute (what gets dissolved) and a solvent (what does the dissolving, often water).
key: "Like dissolves like": polar solvents dissolve polar and ionic substances; nonpolar solvents dissolve nonpolar substances. That's why oil and water don't mix.
Solubility is the maximum amount of solute that dissolves at a given temperature.
- Unsaturated: can dissolve more.
- Saturated: holding the maximum.
- Supersaturated: holding more than normal (unstable).
For most solids, solubility increases with temperature. For gases, it decreases with temperature (warm soda goes flat faster) and increases with pressure.
term: solute = the substance being dissolved in a solution
term: solvent = the substance that does the dissolving
term: solubility = the maximum amount of solute that can dissolve in a solvent at a given temperature
term: saturated solution = a solution holding the maximum amount of dissolved solute
q: In salt water, the solute is… | *salt | water | both | neither
why: Salt is dissolved; water does the dissolving.
q: Why doesn't oil dissolve in water? | *Oil is nonpolar and water is polar | Oil is ionic | Water is nonpolar | Oil is too heavy
why: Like dissolves like.

@lesson Concentration and molarity
say: Concentration tells you how much solute is packed into a solution. Chemists usually measure it in molarity.
key: Molarity (M) = moles of solute ÷ liters of solution.
ex: 0.50 mol of NaCl is dissolved to make 250 mL of solution. Find the molarity.
> Convert mL to L: 250 mL = 0.250 L
> 0.50 ÷ 0.250
= 2.0 M
To dilute a solution, add more solvent. The moles of solute stay the same, so M₁V₁ = M₂V₂.
ex: How much 6.0 M HCl do you need to make 300 mL of 1.0 M HCl?
> M₁V₁ = M₂V₂: 6.0 × V₁ = 1.0 × 300
= V₁ = 50 mL (then add water to 300 mL)
lab: Colorimeter: copper sulfate solutions
aim: Shine light through blue copper sulfate solutions of different concentrations and measure the absorbance.
set: c = 0.2 | Concentration (mol/L) | 0.01 to 0.5 by 0.01
out: A = 2.8*c | Absorbance
out: T = 100*10^(-A) | Light transmitted (%)
plot: c, A
step: Record the absorbance of at least 5 standard solutions.
step: Use your line to find the concentration of a mystery solution with absorbance 0.84.
noise: 3
result: Absorbance is proportional to concentration (Beer's law, A = εbc), so the standards make a straight calibration line. A mystery absorbance of 0.84 means 0.30 mol/L.
term: molarity = moles of solute per liter of solution
term: concentration = the amount of solute in a given amount of solution
term: dilution = making a solution less concentrated by adding solvent
q: 2 mol of solute in 4 L of solution. Molarity? | *0.5 M | 2 M | 8 M | 4 M
why: 2 ÷ 4 = 0.5 M.
q: When you dilute a solution, what stays the same? | *Moles of solute | Molarity | Volume | Concentration
why: Only solvent is added.
gen: stem.molarity, stem.dilution

@lesson Colligative properties
say: Adding salt to water changes when it freezes and boils. That's why we salt icy roads!
Colligative properties depend on the number of dissolved particles, not what they are:
- Freezing point depression: solutes lower the freezing point. Road salt melts ice.
- Boiling point elevation: solutes raise the boiling point.
- Vapor pressure lowering: solutes reduce evaporation.
Ionic compounds split into multiple ions, so they affect these properties more. NaCl → Na⁺ + Cl⁻ makes 2 particles per unit; CaCl₂ makes 3.
ex: Which lowers the freezing point of water more, 1 mol of sugar or 1 mol of NaCl?
> Sugar stays as 1 mol of particles
> NaCl splits into 2 mol of ions
= NaCl (twice as many particles)
term: colligative property = a property that depends on the number of solute particles, not their identity
term: freezing point depression = the lowering of a solvent's freezing point when a solute is added
term: electrolyte = a substance that forms ions in solution and conducts electricity
q: Why do we put salt on icy roads? | *Salt lowers water's freezing point | Salt is warm | Salt absorbs sunlight | Salt raises the freezing point
why: Dissolved ions keep water from freezing at 0°C.
q: Which gives the most particles when dissolved? | *CaCl₂ | NaCl | Sugar | KCl
why: CaCl₂ splits into 3 ions.

@unit Acids and Bases | Acid and base definitions, the pH scale, neutralization and titration
@lesson Acids and bases
say: Lemons are sour and soap is slippery. Acids and bases explain why, and they're everywhere!
- Acids taste sour, turn blue litmus red, and react with metals. They release H⁺ (H₃O⁺) ions in water.
- Bases taste bitter, feel slippery, and turn red litmus blue. They release OH⁻ ions in water.
key: Arrhenius: acids make H⁺, bases make OH⁻. Brønsted–Lowry: acids donate protons (H⁺), bases accept them.
Strong acids and bases ionize completely in water (HCl, NaOH). Weak acids and bases only partly ionize (acetic acid in vinegar, ammonia).
In a Brønsted–Lowry reaction, the acid becomes its conjugate base and the base becomes its conjugate acid.
term: acid = a substance that donates H⁺ ions (protons)
term: base = a substance that accepts H⁺ ions or produces OH⁻ ions
term: strong acid = an acid that ionizes completely in water
term: conjugate base = what remains after an acid donates a proton
q: A substance turns red litmus blue. It is a(n)… | *base | acid | salt | neutral substance
why: Bases turn red litmus blue.
q: In the Brønsted–Lowry definition, an acid is a… | *proton donor | proton acceptor | electron donor | hydroxide producer
why: Acids donate H⁺ (protons).
gen: bank.CHEM.acids

@lesson The pH scale
say: The pH scale tells you how acidic or basic something is. Each step is a factor of ten!
key: pH = −log[H⁺]. pH below 7 is acidic, 7 is neutral, above 7 is basic.
Each pH unit is a 10× change: pH 3 is 10 times more acidic than pH 4, and 100 times more than pH 5.
ex: A solution has [H⁺] = 1 × 10⁻⁴ M. Find its pH.
> pH = −log(10⁻⁴)
= pH 4 (acidic)
Also, pOH = −log[OH⁻] and pH + pOH = 14 at 25°C.
Examples: stomach acid ≈ 1.5, lemon juice ≈ 2, pure water = 7, blood ≈ 7.4, bleach ≈ 13.
term: pH = a measure of the hydrogen ion concentration; −log[H⁺]
term: neutral = a pH of 7, with equal H⁺ and OH⁻
term: pOH = −log[OH⁻]; pH + pOH = 14
q: Which is most acidic? | *pH 2 | pH 5 | pH 7 | pH 12
why: Lower pH means more acidic.
q: A solution has pH 9. What is its pOH? | *5 | 9 | 23 | 7
why: 14 − 9 = 5.
gen: stem.pH

@lesson Neutralization and titration
say: When an acid meets a base, they cancel each other out and make water and a salt.
key: Acid + base → salt + water. HCl + NaOH → NaCl + H₂O.
A titration finds the concentration of an unknown acid or base by slowly adding a solution of known concentration until it's exactly neutralized (the equivalence point). An indicator changes color to show the endpoint.
ex: 25.0 mL of HCl is neutralized by 20.0 mL of 0.50 M NaOH. Find the HCl concentration.
> Moles NaOH = 0.50 × 0.0200 = 0.010 mol
> 1:1 ratio, so 0.010 mol HCl
> 0.010 ÷ 0.0250 L
= 0.40 M HCl
Buffers resist pH changes by neutralizing small amounts of added acid or base. Your blood uses buffers to stay near pH 7.4.
lab: Titration of HCl with NaOH
aim: Add 0.10 M NaOH from a burette to 25.0 mL of 0.10 M HCl and track the pH.
set: Vb = 10 | NaOH added (mL) | 0 to 50 by 0.5
set: Cb = 0.1 | NaOH concentration (M) | 0.05 to 0.2 by 0.01
out: x = (0.0025 - Cb*Vb/1000)/((25 + Vb)/1000) | Excess acid (mol/L)
out: pH = -log((x + sqrt(x^2 + 4e-14))/2) | pH
plot: Vb, pH
step: Record the pH every 5 mL, then add drops near 25 mL.
step: Find the equivalence point where the pH jumps.
noise: 1
result: The pH rises slowly, then jumps steeply around the equivalence point (25 mL for 0.10 M base), where moles of base equal moles of acid and the pH is 7. A stronger base reaches it sooner.
term: neutralization = the reaction of an acid and base to form a salt and water
term: titration = adding a solution of known concentration to find an unknown concentration
term: indicator = a substance that changes color at a certain pH
term: buffer = a solution that resists changes in pH
q: What are the products of an acid–base neutralization? | *Salt and water | Acid and base | Hydrogen gas | Only water
why: The ions combine into water and a salt.
q: What does an indicator do in a titration? | *Changes color at the endpoint | Speeds up the reaction | Adds acid | Measures volume
why: It signals when neutralization is complete.

@unit Equilibrium and Nuclear Chemistry | Reaction rates and equilibrium, Le Chatelier's principle, radioactivity and half-life
@lesson Equilibrium and Le Chatelier's principle
say: Some reactions run both forward and backward at the same time. When they balance, we call it equilibrium.
In a reversible reaction, products can turn back into reactants. Chemical equilibrium is reached when the forward and reverse rates are equal; the amounts stop changing (but the reactions don't stop).
key: Le Chatelier's principle: if a system at equilibrium is disturbed, it shifts to counteract the change.
- Add reactant (or remove product): shifts toward products.
- Increase pressure: shifts toward the side with fewer gas molecules.
- Increase temperature: shifts in the endothermic direction.
ex: N₂ + 3H₂ ⇌ 2NH₃ (exothermic). Which way does it shift if pressure increases?
> Left side: 4 gas molecules; right side: 2
> Higher pressure favors fewer gas molecules
= Shifts right, making more NH₃
term: chemical equilibrium = the state where forward and reverse reaction rates are equal
term: reversible reaction = a reaction that can proceed in both directions
term: Le Chatelier's principle = a system at equilibrium shifts to relieve a stress placed on it
q: Adding more reactant to a system at equilibrium shifts it… | *toward products | toward reactants | nowhere | it stops the reaction
why: The system uses up the extra reactant.
q: At equilibrium, the forward and reverse reactions… | *happen at equal rates | have stopped | have equal concentrations always | go only forward
why: Equilibrium is dynamic: both continue at the same rate.

@lesson Nuclear chemistry
say: Some atoms are unstable and break apart on their own, releasing energy. That's radioactivity!
Radioactive decay is when an unstable nucleus emits particles or energy:
- Alpha (α): a helium nucleus (2 protons, 2 neutrons). Stopped by paper.
- Beta (β): an electron emitted when a neutron becomes a proton. Stopped by aluminum.
- Gamma (γ): high-energy light. Needs thick lead or concrete.
key: Half-life is the time for half of a radioactive sample to decay.
ex: Iodine-131 has a half-life of 8 days. How much of a 100 g sample is left after 24 days?
> 24 days = 3 half-lives
> 100 → 50 → 25 → 12.5
= 12.5 g
Fission splits heavy nuclei (nuclear power plants). Fusion joins light nuclei (the Sun). Both release huge amounts of energy.
lab: Geiger counter and half-life
aim: Measure the activity of a radioactive sample over time.
set: t = 10 | Time (days) | 0 to 60 by 1
set: h = 8 | Half-life (days) | 2 to 30 by 1
out: A = 1000*0.5^(t/h) | Count rate (counts/min)
plot: t, A
step: Record the count rate every few days for at least 5 readings.
step: Read off how long it takes the count to halve, and halve again.
noise: 4
result: Activity falls exponentially: it halves every half-life, whatever the starting amount. Iodine-131, used in medicine, has a half-life of about 8 days.
term: radioactive decay = the spontaneous breakdown of an unstable nucleus
term: half-life = the time it takes for half of a radioactive sample to decay
term: fission = splitting a heavy nucleus into smaller nuclei
term: fusion = combining light nuclei into a heavier nucleus
term: alpha particle = a helium nucleus emitted in radioactive decay
q: Which radiation is the most penetrating? | *Gamma | Alpha | Beta | They're equal
why: Gamma rays need thick lead to stop.
q: What powers the Sun? | *Fusion | Fission | Combustion | Alpha decay
why: The Sun fuses hydrogen into helium.
gen: chem.halfLife
`;
