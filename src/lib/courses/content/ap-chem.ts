export default String.raw`
@course ap-chem | AP Chemistry | AP | 🧪 | Science

// Follows the 9 units of the AP Chemistry Course and Exam Description.

@unit Atomic Structure and Properties | Moles and mass, mass spectra, electron configuration, photoelectron spectroscopy, periodic trends
@lesson Moles, mass spectra and composition
say: AP Chem begins with counting atoms. The mole is the bridge between tiny particles and grams you can weigh.
One mole contains 6.022 × 10²³ particles. Molar mass (g/mol) converts between grams and moles.
key: n = m ÷ M (moles = mass ÷ molar mass). Particles = moles × Avogadro's number.
A mass spectrum shows the isotopes of an element and their relative abundances. The average atomic mass is the weighted average of the isotope masses.
Percent composition and empirical formulas: convert mass percents to moles, then divide by the smallest number of moles to get the simplest whole-number ratio.
ex: A compound is 40.0% C, 6.7% H and 53.3% O by mass. Find its empirical formula.
> In 100 g: 40.0/12.01 = 3.33 mol C; 6.7/1.008 = 6.65 mol H; 53.3/16.00 = 3.33 mol O
> Divide by 3.33: C 1, H 2, O 1
= CH₂O
term: mole = 6.022 × 10²³ particles of a substance
term: mass spectrum = a graph showing the masses and relative abundances of an element's isotopes
term: empirical formula = the simplest whole-number ratio of atoms in a compound
term: percent composition = the percent by mass of each element in a compound
q: How many moles are in 9.0 g of water (18.0 g/mol)? | *0.50 mol | 2.0 mol | 162 mol | 9.0 mol
why: 9.0 ÷ 18.0 = 0.50.
q: A mass spectrum of an element shows peaks at 10 (20%) and 11 (80%). Its average mass is… | *10.8 | 10.5 | 10.2 | 11.0
why: 0.20(10) + 0.80(11) = 10.8.
gen: stem.molarMass, stem.moles

@lesson Electron configuration and PES
say: Where electrons live explains almost every property of the elements. Photoelectron spectroscopy lets us see it directly.
Electron configurations fill orbitals in order of energy: 1s 2s 2p 3s 3p 4s 3d 4p… Aufbau principle, Pauli exclusion (2 electrons per orbital with opposite spins) and Hund's rule (fill orbitals singly first).
key: Coulomb's law drives atomic structure: the attraction between the nucleus and an electron increases with greater nuclear charge and decreases with greater distance.
Photoelectron spectroscopy (PES) measures the energy needed to remove electrons from each subshell. Each peak is a subshell; its height shows the number of electrons, and its position shows binding energy (core electrons are held more tightly, so they have higher binding energies).
ex: A PES spectrum has peaks with relative heights 2, 2, 6, 1. Which element is it?
> 1s² 2s² 2p⁶ 3s¹
> Total electrons: 11
= Sodium
term: Coulomb's law = the force between charges increases with charge and decreases with distance
term: photoelectron spectroscopy = a technique measuring the energy needed to remove electrons from each subshell
term: binding energy = the energy needed to remove an electron from an atom
term: Hund's rule = electrons fill degenerate orbitals singly before pairing
q: In a PES spectrum, the peak farthest to the left (highest energy) corresponds to… | *1s electrons | valence electrons | 2p electrons | the nucleus
why: Core 1s electrons are closest to the nucleus and hardest to remove.
q: What does the height of a PES peak tell you? | *The number of electrons in that subshell | The atomic mass | The number of neutrons | The charge
why: Signal intensity is proportional to the number of electrons.

@lesson Periodic trends explained
say: On the AP exam, it's not enough to know the trends. You must explain them with Coulomb's law and shielding.
- Atomic radius decreases across a period: more protons (greater effective nuclear charge) pull the same shell closer. It increases down a group: more shells, more shielding.
- Ionization energy increases across a period and decreases down a group, for the same reasons.
- Electronegativity follows the same pattern as ionization energy.
- Cations are smaller than their atoms; anions are larger.
key: Explain trends using effective nuclear charge and distance/shielding, not "because it's further right."
Successive ionization energies jump sharply when you start removing core electrons. A big jump after the second ionization means the element has 2 valence electrons (group 2).
term: effective nuclear charge = the net positive charge felt by valence electrons after shielding
term: shielding = the reduction of nuclear attraction by inner electrons
term: successive ionization energies = the energies needed to remove each additional electron
q: Why is Cl smaller than Na? | *Cl has more protons attracting the same shell | Cl has more shells | Cl has fewer electrons | Na is a metal
why: Higher effective nuclear charge pulls electrons closer.
q: An element's ionization energies jump sharply between the 3rd and 4th. Which group is it in? | *Group 13 | Group 1 | Group 2 | Group 17
why: Three valence electrons come off before reaching the core.
gen: bank.CHEM.periodic

@unit Compound Structure and Properties | Bonding types, Lewis diagrams, resonance and formal charge, VSEPR and hybridization
@lesson Types of bonds and potential energy
say: Bonds form because atoms are more stable together. Potential energy diagrams show exactly why.
- Ionic bonds: transfer of electrons between metals and nonmetals; held by Coulombic attraction in a lattice. Lattice energy increases with larger charges and smaller ions.
- Covalent bonds: shared electrons between nonmetals. Polar if electronegativities differ.
- Metallic bonds: cations in a sea of delocalized electrons, explaining conductivity and malleability. Alloys can be interstitial (small atoms fill gaps, like steel) or substitutional (similar-size atoms replace each other, like brass).
key: On a potential energy vs. internuclear distance graph, the minimum energy is at the bond length; the depth of the well is the bond energy.
term: lattice energy = the energy released when ions form a solid lattice; larger for higher charges and smaller ions
term: bond length = the distance between nuclei at minimum potential energy
term: interstitial alloy = an alloy where small atoms fill spaces between larger metal atoms
term: delocalized electrons = electrons not bound to one atom, free to move through a structure
q: Which has the greater lattice energy? | *MgO | NaCl | KBr | CsI
why: Mg²⁺ and O²⁻ have larger charges and small radii.
q: Why do metals conduct electricity? | *Delocalized electrons move freely | They are ionic | They have no electrons | Their nuclei move
why: The electron sea carries charge.

@lesson Lewis structures, resonance and formal charge
say: Lewis structures predict how atoms connect. When several structures are possible, formal charge picks the best one.
Draw Lewis structures by counting total valence electrons, connecting atoms with single bonds, completing octets on outer atoms, then placing remaining electrons on the central atom (and forming multiple bonds if needed).
key: Formal charge = valence electrons − nonbonding electrons − ½(bonding electrons). The best structure has formal charges closest to zero, with negative charges on more electronegative atoms.
Resonance occurs when more than one valid structure can be drawn. The real molecule is an average (hybrid), so bonds have intermediate lengths. Ozone and carbonate (CO₃²⁻) are classic examples.
Exceptions to the octet rule: boron often has 6 electrons; elements in period 3 and beyond (like S and P) can have expanded octets.
term: formal charge = a bookkeeping charge used to choose the best Lewis structure
term: resonance = when two or more valid Lewis structures describe a molecule; the real structure is an average
term: expanded octet = more than eight valence electrons around a central atom in period 3 or beyond
q: In carbonate (CO₃²⁻), all three C–O bonds are equal in length because of… | *resonance | an expanded octet | ionic bonding | hydrogen bonding
why: Electrons are delocalized across the three bonds.
q: The best Lewis structure has formal charges that are… | *as close to zero as possible | all positive | all negative | equal to the charge on each atom's nucleus
why: Minimal formal charge indicates the most stable arrangement.

@lesson VSEPR and hybridization
say: Molecular shape controls polarity, and polarity controls properties. VSEPR predicts shape from electron domains.
Count electron domains (bonds of any type and lone pairs) around the central atom:
- 2: linear (180°), sp
- 3: trigonal planar (120°), sp²; with one lone pair, bent
- 4: tetrahedral (109.5°), sp³; one lone pair, trigonal pyramidal; two lone pairs, bent
- 5: trigonal bipyramidal; 6: octahedral
key: A molecule is polar if it has polar bonds arranged asymmetrically. CO₂ and CCl₄ are nonpolar because their dipoles cancel.
Sigma (σ) bonds form from head-on overlap; pi (π) bonds from side-by-side overlap. A single bond is 1 σ; a double bond is 1 σ + 1 π; a triple bond is 1 σ + 2 π.
term: electron domain = a region of electron density around a central atom: a bond or lone pair
term: hybridization = the mixing of atomic orbitals to form new orbitals for bonding
term: sigma bond = a covalent bond formed by head-on orbital overlap
term: pi bond = a covalent bond formed by side-by-side overlap of p orbitals
q: What is the shape of NH₃? | *Trigonal pyramidal | Trigonal planar | Tetrahedral | Bent
why: Four domains with one lone pair.
q: How many σ and π bonds are in a triple bond? | *1 σ, 2 π | 3 σ | 2 σ, 1 π | 3 π
why: The first bond is σ; the other two are π.

@unit Properties of Substances and Mixtures | Intermolecular forces, solids and liquids, gases, solutions, spectroscopy
@lesson Intermolecular forces and properties
say: Intermolecular forces decide boiling points, solubility and more. On the AP exam, always name the specific force.
- London dispersion forces: in all molecules; stronger for larger, more polarizable electron clouds (more electrons).
- Dipole–dipole: between polar molecules.
- Hydrogen bonding: H bonded to N, O or F interacting with a lone pair on N, O or F. Strongest of the IMFs.
- Ion–dipole: between ions and polar molecules (like salt in water).
key: Stronger IMFs → higher boiling point, higher viscosity, higher surface tension, lower vapor pressure.
ex: Explain why H₂O boils at 100°C but H₂S boils at −60°C.
> Water molecules form hydrogen bonds (H bonded to O)
> H₂S has only dipole–dipole and dispersion forces
= More energy is needed to overcome water's stronger hydrogen bonds
Types of solids: ionic, covalent network (diamond, very hard), molecular (low melting) and metallic.
term: London dispersion forces = attractions from temporary dipoles; present in all molecules
term: polarizability = how easily an electron cloud can be distorted
term: vapor pressure = the pressure of a vapor above its liquid; lower for stronger IMFs
term: covalent network solid = a solid where atoms are linked by a network of covalent bonds
q: Which has the highest boiling point? | *C₈H₁₈ | CH₄ | C₂H₆ | C₃H₈
why: The largest molecule has the strongest dispersion forces.
q: Stronger intermolecular forces lead to… | *lower vapor pressure | higher vapor pressure | lower boiling point | lower viscosity
why: Molecules escape the liquid less easily.

@lesson Gases and solutions
say: Ideal gases follow PV = nRT, but real gases deviate. And solutions have their own math.
key: PV = nRT (R = 0.08206 L·atm/mol·K). Real gases deviate most at high pressure and low temperature, when particle volume and attractions matter.
- Kinetic molecular theory: average kinetic energy is proportional to temperature. At the same temperature, lighter gases move faster.
- Dalton's law: P_total = sum of partial pressures; partial pressure = mole fraction × total pressure.
Solutions: molarity M = moles solute ÷ liters solution. "Like dissolves like." Separation techniques like chromatography and distillation exploit differences in IMFs.
Spectroscopy: Beer–Lambert law, A = εbc. Absorbance is proportional to concentration, which lets you find an unknown concentration from a calibration curve.
term: ideal gas = a gas whose particles have no volume and no attractions
term: mole fraction = moles of one component divided by total moles
term: Beer–Lambert law = absorbance is proportional to concentration: A = εbc
term: chromatography = separating a mixture based on different attractions to a stationary and mobile phase
q: Real gases deviate most from ideal behavior at… | *high pressure and low temperature | low pressure and high temperature | STP | any temperature
why: Particles are close together and attractions matter.
q: If absorbance doubles in a Beer–Lambert experiment, concentration… | *doubles | halves | stays the same | quadruples
why: A is directly proportional to c.
gen: chem.idealGas, stem.molarity

@unit Chemical Reactions | Net ionic equations, stoichiometry, titration, types of reactions
@lesson Net ionic equations and stoichiometry
say: AP Chem focuses on what actually reacts. Net ionic equations strip away the spectator ions.
To write a net ionic equation: write the balanced molecular equation, split strong electrolytes (soluble salts, strong acids and bases) into ions, then cancel ions that appear unchanged on both sides (spectator ions).
ex: Write the net ionic equation for AgNO₃(aq) + NaCl(aq)
> Ions: Ag⁺ + NO₃⁻ + Na⁺ + Cl⁻ → AgCl(s) + Na⁺ + NO₃⁻
> Cancel Na⁺ and NO₃⁻
= Ag⁺(aq) + Cl⁻(aq) → AgCl(s)
key: All sodium, potassium, ammonium and nitrate salts are soluble. Solids, liquids, gases and weak electrolytes stay together in net ionic equations.
Stoichiometry uses mole ratios from balanced equations. Find the limiting reactant by calculating how much product each reactant could make.
term: net ionic equation = an equation showing only the species that actually react
term: spectator ion = an ion present on both sides of a reaction that doesn't participate
term: strong electrolyte = a substance that fully dissociates into ions in water
q: Which is a spectator ion in HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)? | *Na⁺ | H⁺ | OH⁻ | H₂O
why: Na⁺ is unchanged on both sides.
q: The net ionic equation for a strong acid–strong base reaction is… | *H⁺ + OH⁻ → H₂O | Na⁺ + Cl⁻ → NaCl | HCl → H⁺ + Cl⁻ | no reaction
why: Only H⁺ and OH⁻ actually react.
gen: stem.stoich, chem.balance

@lesson Reaction types and titration
say: Most AP reactions fall into three families: precipitation, acid–base and redox. Let's learn to spot each.
- Precipitation: two solutions form an insoluble solid.
- Acid–base: proton (H⁺) transfer.
- Oxidation–reduction (redox): electron transfer. Oxidation is loss of electrons (oxidation number increases); reduction is gain (oxidation number decreases). "OIL RIG."
key: In a redox reaction, the substance oxidized is the reducing agent, and the substance reduced is the oxidizing agent.
Titration finds an unknown concentration. At the equivalence point, moles of acid = moles of base (for 1:1 reactions): M_a V_a = M_b V_b.
ex: In Zn + Cu²⁺ → Zn²⁺ + Cu, what is oxidized?
> Zn goes from 0 to +2: loses electrons
= Zn is oxidized (and is the reducing agent)
term: oxidation = loss of electrons; increase in oxidation number
term: reduction = gain of electrons; decrease in oxidation number
term: oxidizing agent = the substance that gains electrons and causes another to be oxidized
term: equivalence point = the point in a titration where reactants are present in stoichiometric amounts
q: In 2Na + Cl₂ → 2NaCl, chlorine is… | *reduced | oxidized | a spectator | a catalyst
why: Cl goes from 0 to −1, gaining electrons.
q: 20.0 mL of 0.10 M NaOH neutralizes 10.0 mL of HCl. The HCl concentration is… | *0.20 M | 0.10 M | 0.05 M | 2.0 M
why: 0.10 × 20.0 = M × 10.0.

@unit Kinetics | Reaction rates, rate laws, integrated rate laws, mechanisms, catalysts
@lesson Rate laws
say: Kinetics studies how fast reactions go. Rate laws describe exactly how concentration affects speed.
key: Rate = k[A]ᵐ[B]ⁿ. The orders m and n must be determined experimentally, not from coefficients.
Use the method of initial rates: compare experiments where one concentration changes and the others stay the same.
ex: Doubling [A] (with [B] constant) quadruples the rate. What is the order in A?
> 2ᵐ = 4
= Second order in A
Integrated rate laws relate concentration to time:
- Zero order: [A] vs. t is linear.
- First order: ln[A] vs. t is linear; half-life t½ = 0.693/k is constant.
- Second order: 1/[A] vs. t is linear.
term: rate law = an equation relating reaction rate to reactant concentrations
term: reaction order = the exponent on a concentration in a rate law
term: rate constant = the proportionality constant k in a rate law
term: half-life = the time for a reactant's concentration to fall to half
q: Tripling [B] triples the rate. The order in B is… | *1 | 0 | 2 | 3
why: 3ⁿ = 3, so n = 1.
q: Which reaction order has a constant half-life? | *First order | Zero order | Second order | All orders
why: t½ = 0.693/k doesn't depend on concentration.
gen: chem.halfLife

@lesson Mechanisms and catalysts
say: Most reactions happen in a series of simple steps. The slowest step controls the overall rate.
A reaction mechanism is a sequence of elementary steps. For an elementary step, the rate law comes directly from its molecularity (coefficients).
key: The rate-determining step is the slowest step. The overall rate law matches the rate law of that step (substituting for intermediates if needed).
- Intermediates are produced in one step and consumed in a later step.
- Catalysts are consumed in an early step and regenerated later. They provide a new pathway with a lower activation energy and don't appear in the overall equation.
Collision theory: reactions need collisions with enough energy (at least Eₐ) and the correct orientation. Raising temperature increases the fraction of particles with enough energy, so k increases.
term: reaction mechanism = the series of elementary steps by which a reaction occurs
term: rate-determining step = the slowest step in a mechanism, which controls the overall rate
term: intermediate = a species formed in one step and used up in a later step
term: catalyst = a substance that speeds a reaction by providing a lower-energy pathway without being consumed
q: A species produced in step 1 and consumed in step 2 is a(n)… | *intermediate | catalyst | product | reactant
why: Intermediates don't appear in the overall equation.
q: How does a catalyst speed up a reaction? | *It lowers the activation energy | It raises the temperature | It increases ΔH | It shifts equilibrium
why: It provides an alternative pathway.

@unit Thermochemistry | Endothermic and exothermic processes, calorimetry, enthalpy, Hess's law, bond enthalpies
@lesson Calorimetry and enthalpy
say: Thermochemistry tracks heat flowing in and out of reactions. Calorimetry is how we measure it.
Exothermic reactions release heat (ΔH < 0); endothermic reactions absorb heat (ΔH > 0).
key: q = mcΔT. In a calorimeter, heat lost by the reaction = heat gained by the water: q_rxn = −q_water.
ex: A reaction in 100 g of water raises the temperature by 5.0°C. Find q for the reaction. (c = 4.18 J/g·°C)
> q_water = 100 × 4.18 × 5.0 = 2,090 J
> The reaction released that heat
= q_rxn = −2,090 J (exothermic)
Phase changes absorb or release energy at constant temperature: melting and boiling are endothermic; freezing and condensing are exothermic. On a heating curve, flat sections are phase changes.
term: enthalpy change = the heat absorbed or released at constant pressure, ΔH
term: calorimetry = measuring heat flow in a reaction
term: specific heat capacity = the energy needed to raise 1 g of a substance by 1°C
term: heating curve = a graph of temperature vs. heat added, showing phase changes as flat sections
q: Water in a calorimeter gets colder during a reaction. The reaction is… | *endothermic | exothermic | at equilibrium | spontaneous
why: The reaction absorbed heat from the water.
q: During a phase change, temperature… | *stays constant | rises steadily | drops | doubles
why: Energy goes into changing IMFs, not kinetic energy.
gen: chem.specificHeat

@lesson Hess's law and bond enthalpies
say: Enthalpy is a state function, so you can add reactions like puzzle pieces to find ΔH. That's Hess's law.
key: Hess's law: if a reaction is the sum of other reactions, its ΔH is the sum of their ΔH values.
- Reversing a reaction changes the sign of ΔH.
- Multiplying a reaction by a factor multiplies ΔH by that factor.
Using enthalpies of formation: ΔH°rxn = ΣΔH°f(products) − ΣΔH°f(reactants). Elements in their standard states have ΔH°f = 0.
Using bond enthalpies: ΔH ≈ Σ(bonds broken) − Σ(bonds formed). Breaking bonds requires energy; forming bonds releases energy.
ex: A reaction breaks bonds totaling 1,500 kJ and forms bonds totaling 1,800 kJ. Find ΔH.
> ΔH = broken − formed = 1,500 − 1,800
= −300 kJ (exothermic)
term: Hess's law = the total enthalpy change is the sum of the enthalpy changes of the steps
term: enthalpy of formation = ΔH when one mole of a compound forms from its elements in standard states
term: bond enthalpy = the energy required to break one mole of a bond in the gas phase
q: Reaction A has ΔH = +50 kJ. The reverse reaction has ΔH = | *−50 kJ | +50 kJ | 0 kJ | +100 kJ
why: Reversing a reaction flips the sign.
q: What is ΔH°f for O₂(g)? | *0 | 498 kJ/mol | −249 kJ/mol | depends on temperature
why: Elements in their standard states have zero enthalpy of formation.

@unit Equilibrium | Equilibrium constants, Q vs K, ICE tables, Le Chatelier's principle, solubility equilibria
@lesson K, Q and ICE tables
say: At equilibrium, forward and reverse rates are equal. The equilibrium constant K tells you where the balance lies.
key: For aA + bB ⇌ cC + dD, K = [C]ᶜ[D]ᵈ / ([A]ᵃ[B]ᵇ). Pure solids and liquids are left out.
- K ≫ 1: products are favored. K ≪ 1: reactants are favored.
- Q (reaction quotient) uses current concentrations. If Q < K, the reaction shifts right; if Q > K, it shifts left; if Q = K, it's at equilibrium.
ICE tables (Initial, Change, Equilibrium) organize equilibrium calculations.
ex: For H₂ + I₂ ⇌ 2HI, K = 50. A mixture has Q = 10. Which way will it shift?
> Q < K
= It shifts right, making more HI
Manipulating K: reversing a reaction gives 1/K; multiplying coefficients by n raises K to the nth power.
term: equilibrium constant = the ratio of product to reactant concentrations at equilibrium, K
term: reaction quotient = the same ratio as K but using current concentrations, Q
term: ICE table = a table of initial, change and equilibrium concentrations
q: Q > K. The reaction will… | *shift left toward reactants | shift right toward products | stay the same | stop
why: There are too many products relative to equilibrium.
q: A reaction has K = 4. The reverse reaction has K = | *0.25 | 4 | −4 | 16
why: Reversing gives 1/K.

@lesson Le Chatelier's principle and solubility
say: Disturb an equilibrium and it fights back. Le Chatelier's principle predicts how.
key: A system at equilibrium shifts to counteract any stress: changes in concentration, pressure (volume) or temperature.
- Adding reactant or removing product shifts right.
- Decreasing volume (increasing pressure) shifts toward fewer moles of gas.
- Temperature changes the value of K: for exothermic reactions, raising temperature shifts left and decreases K.
- Catalysts don't shift equilibrium; they just reach it faster.
Solubility equilibria: for AgCl(s) ⇌ Ag⁺ + Cl⁻, Ksp = [Ag⁺][Cl⁻]. Molar solubility s satisfies Ksp = s² here.
The common ion effect: adding an ion already in the equilibrium decreases solubility. AgCl is less soluble in NaCl solution than in pure water.
term: Le Chatelier's principle = an equilibrium shifts to relieve a stress placed on it
term: solubility product = the equilibrium constant for dissolving a sparingly soluble salt, Ksp
term: common ion effect = decreased solubility of a salt when a solution already contains one of its ions
q: For N₂ + 3H₂ ⇌ 2NH₃, decreasing the volume shifts the equilibrium… | *right | left | nowhere | depends on the catalyst
why: The right side has fewer moles of gas.
q: Adding NaCl to a saturated AgCl solution causes… | *more AgCl to precipitate | more AgCl to dissolve | no change | Ksp to increase
why: The common ion Cl⁻ shifts the equilibrium left.

@unit Acids and Bases | pH and pOH, strong and weak acids, buffers, titration curves, pKa
@lesson Weak acids and pH
say: Strong acids ionize completely; weak acids barely ionize. Calculating pH for each is a core AP skill.
key: pH = −log[H₃O⁺]; pOH = −log[OH⁻]; pH + pOH = 14 at 25°C; Kw = [H₃O⁺][OH⁻] = 1.0 × 10⁻¹⁴.
For a strong acid, [H₃O⁺] equals the acid concentration. 0.010 M HCl has pH 2.
For a weak acid HA ⇌ H⁺ + A⁻, Ka = [H⁺][A⁻]/[HA]. If the acid is only slightly ionized, [H⁺] ≈ √(Ka × C).
ex: Find the pH of 0.10 M acetic acid (Ka = 1.8 × 10⁻⁵).
> [H⁺] ≈ √(1.8 × 10⁻⁵ × 0.10) = √(1.8 × 10⁻⁶) ≈ 1.34 × 10⁻³
> pH = −log(1.34 × 10⁻³)
= about 2.87
Larger Ka (smaller pKa) means a stronger acid. Conjugate pairs: Ka × Kb = Kw.
term: Ka = the acid dissociation constant, measuring acid strength
term: pKa = −log Ka; smaller pKa means a stronger acid
term: Kw = the ion product of water, 1.0 × 10⁻¹⁴ at 25°C
term: conjugate acid–base pair = two species that differ by one proton
q: What is the pH of 0.001 M HCl? | *3 | 1 | 11 | 0.001
why: Strong acid: [H⁺] = 10⁻³.
q: Which acid is strongest? | *pKa = 2 | pKa = 5 | pKa = 9 | pKa = 12
why: The smallest pKa means the largest Ka.
gen: stem.pH

@lesson Buffers and titration curves
say: Buffers keep pH steady, which is why your blood doesn't swing wildly. Titration curves show how acids and bases react.
key: A buffer contains a weak acid and its conjugate base. Henderson–Hasselbalch: pH = pKa + log([A⁻]/[HA]).
When [A⁻] = [HA], pH = pKa. Buffers work best within about ±1 pH unit of the pKa. Buffer capacity is larger when there's more of both components.
Titration curves:
- Strong acid + strong base: equivalence point at pH 7.
- Weak acid + strong base: equivalence point above 7 (the conjugate base makes it basic). At the half-equivalence point, pH = pKa.
- Weak base + strong acid: equivalence point below 7.
ex: A weak acid titration reaches its half-equivalence point at pH 4.7. What is the acid's pKa?
> At half-equivalence, [HA] = [A⁻]
= pKa = 4.7
term: buffer = a solution of a weak acid and its conjugate base that resists pH changes
term: Henderson–Hasselbalch equation = pH = pKa + log([A⁻]/[HA])
term: half-equivalence point = the point in a titration where half the acid has been neutralized; pH = pKa
q: The equivalence point of a weak acid–strong base titration is… | *above pH 7 | at pH 7 | below pH 7 | at pH 0
why: The conjugate base makes the solution basic.
q: A buffer has equal concentrations of HA and A⁻. Its pH equals… | *pKa | 7 | pKb | 14
why: log(1) = 0.

@unit Thermodynamics and Electrochemistry | Entropy, Gibbs free energy, thermodynamic favorability, galvanic and electrolytic cells
@lesson Entropy and Gibbs free energy
say: Why do some reactions happen on their own? Entropy and free energy answer that question.
Entropy (S) measures dispersal of matter and energy. Entropy increases when solids become liquids or gases, when moles of gas increase, and when temperature rises.
key: ΔG = ΔH − TΔS. A process is thermodynamically favorable when ΔG < 0.
- ΔH < 0 and ΔS > 0: favorable at all temperatures.
- ΔH > 0 and ΔS < 0: never favorable.
- ΔH < 0 and ΔS < 0: favorable at low temperatures.
- ΔH > 0 and ΔS > 0: favorable at high temperatures.
ΔG° relates to K: ΔG° = −RT ln K. If K > 1, ΔG° < 0.
oops: "Thermodynamically favorable" doesn't mean fast. Diamond turning into graphite is favorable but incredibly slow (kinetic control).
term: entropy = a measure of the dispersal of matter and energy
term: Gibbs free energy = ΔG = ΔH − TΔS; negative for thermodynamically favorable processes
term: thermodynamically favorable = a process that proceeds without continuous outside energy; ΔG < 0
q: A reaction has ΔH > 0 and ΔS > 0. It is favorable… | *at high temperatures | at all temperatures | at low temperatures | never
why: −TΔS must outweigh the positive ΔH.
q: K > 1 means ΔG° is… | *negative | positive | zero | undefined
why: ΔG° = −RT ln K, and ln K > 0.

@lesson Electrochemistry
say: Batteries turn chemical energy into electrical energy using redox reactions. Let's see how a galvanic cell works.
A galvanic (voltaic) cell uses a favorable redox reaction to make electricity. Oxidation happens at the anode; reduction at the cathode ("An Ox, Red Cat"). Electrons flow through the wire from anode to cathode, and a salt bridge keeps the solutions neutral.
key: E°cell = E°cathode − E°anode. A positive E°cell means the reaction is favorable. ΔG° = −nFE°.
An electrolytic cell uses outside electrical energy to drive an unfavorable reaction, as in electroplating or charging a battery.
Faraday's law: the amount of substance produced depends on charge: moles of electrons = (current × time) ÷ F, where F = 96,485 C/mol.
ex: E°(Cu²⁺/Cu) = +0.34 V and E°(Zn²⁺/Zn) = −0.76 V. Find E°cell.
> Cu²⁺ is reduced (cathode); Zn is oxidized (anode)
> 0.34 − (−0.76)
= +1.10 V
term: galvanic cell = an electrochemical cell that produces electricity from a favorable redox reaction
term: anode = the electrode where oxidation occurs
term: cathode = the electrode where reduction occurs
term: salt bridge = a connection that lets ions flow to keep half-cells electrically neutral
term: electrolytic cell = a cell that uses electrical energy to drive an unfavorable reaction
q: In a galvanic cell, electrons flow… | *from anode to cathode | from cathode to anode | through the salt bridge | in both directions
why: Electrons leave the oxidized anode.
q: A positive E°cell means ΔG° is… | *negative (favorable) | positive | zero | unknown
why: ΔG° = −nFE°.
`;
