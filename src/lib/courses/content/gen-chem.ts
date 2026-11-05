export default String.raw`
@course gen-chem | General Chemistry (College) | College | ⚗️ | College

// Follows a standard two-semester university general chemistry sequence (OpenStax Chemistry 2e): atoms and stoichiometry, gases and thermochemistry, electronic structure and bonding, kinetics, equilibrium, acids and bases, and electrochemistry.

@unit Atoms, Moles and Reactions | Atomic structure, the mole, stoichiometry, solutions
@lesson Atoms and the mole
say: General chemistry begins with what matter is made of and how chemists count particles.
key: Atoms contain protons (+), neutrons (0) and electrons (−). Atomic number Z = protons; mass number A = protons + neutrons. Isotopes differ in neutrons; atomic mass is a weighted average.
The mole: 1 mol = 6.022 × 10²³ particles (Avogadro's number). Molar mass (g/mol) converts grams to moles: n = m/M.
Formulas: percent composition, empirical formula (simplest ratio) and molecular formula (a whole-number multiple). Significant figures and dimensional analysis carry units through every calculation.
ex: Find the moles in 9.0 g of water (M = 18.0 g/mol).
> n = 9.0 ÷ 18.0
= 0.50 mol
term: Avogadro's number = 6.022 × 10²³ particles per mole
term: molar mass = the mass of one mole of a substance in grams
term: isotope = an atom with the same protons but different neutrons
term: dimensional analysis = using unit conversion factors to solve problems
q: How many neutrons are in carbon-14 (Z = 6)? | *8 | 6 | 14 | 20
why: 14 − 6.
q: The empirical formula of C₆H₁₂O₆ is… | *CH₂O | C₆H₁₂O₆ | C₂H₄O₂ | CHO
why: Divide each subscript by 6.
gen: bank.CHEM.atoms, stem.molarMass, stem.moles

@lesson Reactions, stoichiometry and solutions
say: Balanced equations tell us exactly how much reacts and how much forms.
key: Balance equations by conserving atoms. Reaction types: precipitation (use solubility rules and net ionic equations), acid–base neutralization, redox and combustion.
Stoichiometry: grams → moles → mole ratio → moles → grams. The limiting reactant runs out first and sets the theoretical yield; percent yield = actual ÷ theoretical × 100%.
Solutions: molarity M = mol solute ÷ L solution. Dilution: M₁V₁ = M₂V₂. Titrations find unknown concentrations at the equivalence point.
ex: How many moles of NaCl are in 250 mL of 0.40 M solution?
> 0.40 mol/L × 0.250 L
= 0.10 mol
lab: Serial dilution
aim: Pipette different volumes of a 2.00 M stock solution into a 100.0 mL volumetric flask and fill to the mark.
set: V1 = 10 | Stock volume (mL) | 1 to 50 by 1
set: M1 = 2 | Stock concentration (M) | 0.5 to 5 by 0.5
out: M2 = M1*V1/100 | Diluted concentration (M)
out: n = M1*V1/1000 | Moles of solute (mol)
plot: V1, M2
step: Record the diluted concentration for 5 stock volumes.
step: What volume of stock makes exactly 0.150 M?
noise: 1
result: Dilution adds solvent but not solute, so M₁V₁ = M₂V₂. To make 0.150 M from 2.00 M stock in a 100 mL flask, pipette 7.5 mL.
term: limiting reactant = the reactant that is completely consumed first
term: molarity = moles of solute per liter of solution
term: net ionic equation = an equation showing only the species that react
term: theoretical yield = the maximum product predicted by stoichiometry
q: Diluting 100 mL of 2.0 M HCl to 400 mL gives… | *0.50 M | 8.0 M | 1.0 M | 0.25 M
why: 2.0 × 100 = M₂ × 400.
q: In 2H₂ + O₂ → 2H₂O, 4 mol H₂ needs how much O₂? | *2 mol | 4 mol | 1 mol | 8 mol
why: The ratio is 2 : 1.
gen: stem.stoich, stem.molarity, stem.dilution, chem.balance

@unit Gases, Energy and Structure | Gas laws, thermochemistry, electron configurations, bonding
@lesson Gases and thermochemistry
say: Gases follow simple laws, and every reaction comes with an energy change.
key: Ideal gas law: PV = nRT (R = 0.08206 L·atm/(mol·K)). Combined laws: Boyle (P₁V₁ = P₂V₂), Charles (V₁/T₁ = V₂/T₂), Avogadro. Use kelvin. Dalton's law: total pressure is the sum of partial pressures. Kinetic molecular theory explains gas behavior; real gases deviate at high pressure and low temperature.
Thermochemistry: q = mcΔT. Exothermic ΔH < 0, endothermic ΔH > 0. Hess's law adds reaction enthalpies; ΔH°rxn = ΣΔH°f(products) − ΣΔH°f(reactants).
ex: A gas at 2.0 atm occupies 3.0 L. Find its volume at 1.0 atm (constant T).
> P₁V₁ = P₂V₂: 2.0 × 3.0 = 1.0 × V₂
= 6.0 L
lab: Mixing hot and cold water
aim: Mix hot water with 100 g of water at 20 °C in an insulated cup and record the final temperature.
set: m1 = 100 | Hot water mass (g) | 10 to 300 by 10
set: T1 = 80 | Hot water temperature (°C) | 30 to 100 by 5
out: Tf = (m1*T1 + 100*20)/(m1 + 100) | Final temperature (°C)
out: q = m1*4.18*(T1 - Tf) | Heat lost by hot water (J)
plot: m1, Tf
step: Record the final temperature for 5 masses of hot water.
step: Check that heat lost by the hot water equals heat gained by the cold water.
noise: 1
result: Energy is conserved: heat lost = heat gained (m₁cΔT₁ = m₂cΔT₂). The final temperature is a mass-weighted average, closer to whichever sample is larger.
term: ideal gas law = PV = nRT
term: partial pressure = the pressure one gas in a mixture would exert alone
term: specific heat = the energy needed to raise 1 g of a substance by 1 °C
term: Hess's law = the total enthalpy change is independent of the pathway
q: Doubling the kelvin temperature at constant pressure makes a gas's volume… | *double | halve | stay the same | quadruple
why: Charles's law.
q: A reaction with ΔH = −120 kJ is… | *exothermic | endothermic | at equilibrium | non-spontaneous always
why: Negative ΔH releases heat.
gen: stem.boyle, stem.charles, chem.idealGas, chem.specificHeat

@lesson Electronic structure and bonding
say: Electron arrangements explain the periodic table and how atoms bond.
key: Quantum numbers (n, l, mₗ, mₛ) describe orbitals. Electron configurations follow Aufbau, Pauli and Hund (Fe: [Ar] 4s² 3d⁶). Periodic trends: atomic radius decreases across a period and increases down a group; ionization energy and electronegativity show the opposite pattern.
Bonding: ionic (electron transfer), covalent (sharing) and metallic. Lewis structures, formal charge and resonance. VSEPR predicts geometry: 2 domains linear, 3 trigonal planar, 4 tetrahedral (109.5°), with lone pairs giving bent or trigonal pyramidal shapes. Hybridization (sp, sp², sp³) and polarity follow.
Intermolecular forces: dispersion < dipole–dipole < hydrogen bonding; stronger forces raise boiling points.
term: electronegativity = an atom's attraction for shared electrons
term: resonance = several valid Lewis structures for one molecule
term: hybridization = mixing atomic orbitals to form new bonding orbitals
term: VSEPR = the model predicting shape from electron-domain repulsion
q: The geometry of CH₄ is… | *tetrahedral | trigonal planar | linear | bent
why: Four bonding domains, no lone pairs.
q: Which has the highest boiling point? | *H₂O | H₂S | CH₄ | Ne
why: Hydrogen bonding.
gen: bank.CHEM.bonding, bank.CHEM.periodic

@unit Kinetics, Equilibrium and Electrochemistry | Rates, K, acids and bases, redox
@lesson Kinetics and equilibrium
say: How fast does a reaction go, and how far? Kinetics and equilibrium answer.
key: Rate laws: rate = k[A]ᵐ[B]ⁿ with orders found experimentally. Integrated rate laws: first-order half-life t½ = 0.693/k (constant). The Arrhenius equation k = Ae^(−Eₐ/RT) shows rates rise with temperature; catalysts lower Eₐ.
Equilibrium: K = [products]^coefficients ÷ [reactants]^coefficients (pure solids and liquids are left out). Q < K → forward; Q > K → reverse. Le Châtelier: a stressed equilibrium shifts to relieve the stress. ICE tables solve for equilibrium concentrations.
ex: A first-order reaction has k = 0.0693 s⁻¹. Find its half-life.
> t½ = 0.693 ÷ 0.0693
= 10 s
lab: Second-order decomposition of NO₂
aim: Follow the concentration of NO₂ as it decomposes (2NO₂ → 2NO + O₂) and test which plot is linear.
set: t = 100 | Time (s) | 0 to 600 by 10
set: kk = 0.5 | Rate constant k (M⁻¹ s⁻¹) | 0.1 to 2 by 0.1
out: A = 1/(1/0.1 + kk*t) | [NO₂] (M)
out: inv = 1/A | 1/[NO₂] (M⁻¹)
out: lnA = ln(A) | ln[NO₂]
plot: t, inv
step: Record [NO₂], ln[NO₂] and 1/[NO₂] every 100 s.
step: Which quantity changes by the same amount each interval?
noise: 1
result: 1/[NO₂] vs t is a straight line with slope k, so the reaction is second order. For second-order reactions the half-life gets longer as the concentration falls, unlike first-order reactions.
term: rate law = an equation relating rate to reactant concentrations
term: half-life = the time for half of a reactant to be consumed
term: reaction quotient = Q, the K expression evaluated at any moment
term: Le Châtelier's principle = an equilibrium shifts to counteract a disturbance
q: If Q < K, the reaction… | *proceeds forward | proceeds in reverse | is at equilibrium | stops
why: More product forms to reach K.
q: Doubling [A] quadruples the rate. The order in A is… | *2 | 1 | 4 | 0
why: 2² = 4.
gen: chem.halfLife, bank.CHEM.thermo

@lesson Acids, bases and electrochemistry
say: Proton transfers and electron transfers drive much of chemistry, from blood to batteries.
key: Brønsted–Lowry acids donate H⁺; bases accept it. pH = −log[H⁺]; pH + pOH = 14 at 25 °C. Weak acids use Kₐ; Kₐ × K_b = K_w. Buffers (weak acid + conjugate base) resist pH change: pH = pKₐ + log([A⁻]/[HA]). Titration curves show equivalence points.
Redox: OIL RIG (oxidation is loss, reduction is gain). Galvanic cells: oxidation at the anode, reduction at the cathode; E°cell = E°cathode − E°anode, positive for spontaneous reactions. ΔG° = −nFE°. Electrolysis uses electricity to drive non-spontaneous reactions.
ex: Find the pH of 0.001 M HCl.
> Strong acid: [H⁺] = 1 × 10⁻³
= pH 3
term: buffer = a solution that resists changes in pH
term: Henderson–Hasselbalch equation = pH = pKₐ + log([A⁻]/[HA])
term: anode = the electrode where oxidation occurs
term: standard cell potential = the voltage of a cell under standard conditions
q: A solution with pOH 4 has pH… | *10 | 4 | 14 | 7
why: 14 − 4.
q: A positive E°cell means the reaction is… | *spontaneous | non-spontaneous | at equilibrium | endothermic
why: ΔG° = −nFE° is negative.
gen: stem.pH, bank.CHEM.acids
`;
