export default String.raw`
@course ib-chem | IB Chemistry | IB | 🧫 | IB

// Follows the IB Chemistry guide (first assessment 2025), organized around Structure (1–3) and Reactivity (1–3).

@unit Structure 1: Models of the Particulate Nature of Matter | Particles and the mole, atomic structure, electron configurations
@lesson Particles, the mole and atomic structure
say: IB Chemistry starts with particles: atoms, ions and molecules, and how we count them.
key: The mole: n = m/M and N = nNₐ (Nₐ = 6.02 × 10²³). Empirical formulas come from mass percentages; molecular formulas are multiples of the empirical formula. Concentration c = n/V.
Atomic structure: protons and neutrons in the nucleus, electrons in energy levels. Isotopes differ in neutron number; relative atomic mass is a weighted average, measured with a mass spectrometer.
Ideal gas law: pV = nRT; at STP (273 K, 100 kPa), molar volume is 22.7 dm³ mol⁻¹.
ex: How many moles are in 11 g of CO₂ (M = 44 g mol⁻¹)?
> n = m/M = 11/44
= 0.25 mol
term: mole = the amount of substance containing 6.02 × 10²³ particles
term: empirical formula = the simplest whole-number ratio of atoms in a compound
term: isotope = an atom of an element with a different number of neutrons
term: relative atomic mass = the weighted average mass of an element's isotopes
q: How many moles are in 18 g of water (M = 18 g mol⁻¹)? | *1 | 18 | 0.5 | 324
why: n = 18/18.
q: Isotopes of an element differ in their number of… | *neutrons | protons | electrons | protons and electrons
why: Same element means same protons.
gen: stem.moles, stem.molarMass, chem.idealGas

@lesson Electron configurations
say: Where electrons are located determines how atoms behave. Spectra let us see their energy levels.
key: Electrons fill orbitals in order of increasing energy (Aufbau principle): 1s 2s 2p 3s 3p 4s 3d 4p. Pauli exclusion: two electrons per orbital with opposite spins. Hund's rule: fill degenerate orbitals singly first. Exceptions: Cr ([Ar] 3d⁵ 4s¹) and Cu ([Ar] 3d¹⁰ 4s¹).
The hydrogen emission spectrum is a line spectrum: electrons drop between energy levels, emitting photons of specific frequencies. Lines converge at higher frequency; the convergence limit corresponds to ionization.
HL: successive ionization energies reveal the group; first ionization energies show patterns across periods.
ex: Write the configuration of iron (Z = 26).
> 1s² 2s² 2p⁶ 3s² 3p⁶ then 4s² 3d⁶
= [Ar] 3d⁶ 4s²
term: Aufbau principle = electrons fill the lowest energy orbitals first
term: Hund's rule = electrons fill degenerate orbitals singly before pairing
term: emission spectrum = the line pattern of light emitted by excited atoms
term: convergence limit = the frequency where spectral lines merge, corresponding to ionization
q: How many electrons can a 3d sublevel hold? | *10 | 6 | 2 | 14
why: Five orbitals × 2.
q: A line spectrum shows that electrons… | *exist in discrete energy levels | move continuously | have no energy | are in the nucleus
why: Only specific energies are emitted.

@unit Structure 2 and 3: Bonding and Classification | Ionic, covalent and metallic bonding, intermolecular forces, the periodic table, organic nomenclature
@lesson Bonding and intermolecular forces
say: Bonding explains why substances have the properties they do: from salt crystals to DNA.
key: Ionic bonding: electrostatic attraction between oppositely charged ions in a lattice; high melting points, conduct when molten or dissolved.
Covalent bonding: shared electron pairs. VSEPR predicts shapes (linear, trigonal planar, tetrahedral, bent, trigonal pyramidal). Polarity depends on electronegativity differences and molecular shape.
Metallic bonding: cations in a sea of delocalized electrons; conductivity and malleability.
Intermolecular forces (weakest to strongest): London dispersion, dipole-induced dipole, dipole–dipole, hydrogen bonding. Stronger forces → higher boiling points.
The bonding triangle (van Arkel–Ketelaar) classifies substances by electronegativity difference and average electronegativity.
term: VSEPR theory = electron domains repel and determine molecular shape
term: electronegativity = an atom's ability to attract a shared pair of electrons
term: hydrogen bond = an intermolecular attraction between H bonded to N, O or F and a lone pair on N, O or F
term: lattice = a regular repeating 3D arrangement of particles
q: The shape of NH₃ is… | *trigonal pyramidal | trigonal planar | tetrahedral | linear
why: Four electron domains, one lone pair.
q: Why does water boil at a higher temperature than H₂S? | *Hydrogen bonding | Ionic bonding | Smaller molecules | Metallic bonding
why: H₂O forms hydrogen bonds.
gen: bank.CHEM.bonding

@lesson The periodic table and organic chemistry
say: The periodic table organizes elements by structure, and organic chemistry names carbon compounds systematically.
key: Periodic trends: atomic radius decreases across a period and increases down a group; ionization energy and electronegativity increase across a period and decrease down a group. Explanations use nuclear charge and shielding.
Oxides: metal oxides are basic; non-metal oxides are acidic (causing acid rain).
Organic chemistry: homologous series (alkanes, alkenes, alcohols, carboxylic acids…) share a functional group and general formula. IUPAC names use the longest chain (meth-, eth-, prop-, but-…) and suffixes (-ane, -ene, -ol, -oic acid). Isomers have the same molecular formula but different structures.
ex: Name CH₃CH₂CH₂OH.
> Three carbons: prop-; alcohol: -ol on carbon 1
= propan-1-ol
term: homologous series = a family of compounds with the same functional group differing by CH₂
term: functional group = the group of atoms responsible for a compound's characteristic reactions
term: structural isomers = compounds with the same molecular formula but different structures
term: IUPAC nomenclature = the systematic naming system for chemical compounds
q: Across a period, atomic radius… | *decreases | increases | stays the same | doubles
why: Greater nuclear charge pulls electrons closer.
q: The suffix -ene indicates a… | *carbon–carbon double bond | hydroxyl group | carboxylic acid | single bonds only
why: Alkenes contain C=C.
gen: bank.CHEM.periodic

@unit Reactivity 1: What Drives Chemical Reactions? | Energy changes, energy cycles, entropy and spontaneity (HL)
@lesson Enthalpy and energy cycles
say: Reactivity 1 asks why reactions happen. Energy changes are the first part of the answer.
key: Exothermic reactions release heat (ΔH < 0); endothermic reactions absorb heat (ΔH > 0). Calorimetry: Q = mcΔT, then ΔH = −Q/n.
Bond enthalpies: ΔH = Σ(bonds broken) − Σ(bonds formed). Hess's law: ΔH for a reaction is the same regardless of route. Using enthalpies of formation: ΔH = ΣΔHf(products) − ΣΔHf(reactants).
Combustion of fuels releases energy; incomplete combustion produces carbon monoxide and soot.
HL: Born–Haber cycles, entropy (ΔS) and Gibbs energy ΔG = ΔH − TΔS (spontaneous if ΔG < 0).
ex: Breaking bonds requires 1,200 kJ and forming bonds releases 1,500 kJ. Find ΔH.
> ΔH = 1,200 − 1,500
= −300 kJ (exothermic)
term: enthalpy change = the heat exchanged at constant pressure, ΔH
term: Hess's law = the enthalpy change of a reaction is independent of the route
term: bond enthalpy = the energy needed to break one mole of a bond in the gas phase
term: Gibbs energy = ΔG = ΔH − TΔS; negative for spontaneous reactions
q: A reaction with ΔH = +50 kJ is… | *endothermic | exothermic | spontaneous always | at equilibrium
why: Positive ΔH absorbs heat.
q: Hess's law is a consequence of… | *conservation of energy | conservation of charge | Le Chatelier's principle | the ideal gas law
why: Enthalpy is a state function.
gen: chem.specificHeat, bank.CHEM.thermo

@lesson Rates and activation energy
say: How fast reactions happen depends on collisions. Catalysts can speed them up dramatically.
key: Collision theory: reactions occur when particles collide with energy ≥ Eₐ and the correct orientation. Rate increases with concentration, pressure, surface area, temperature and catalysts.
Maxwell–Boltzmann distributions show that raising temperature increases the fraction of particles with E ≥ Eₐ. Catalysts lower Eₐ by providing an alternative pathway.
HL: rate equations (rate = k[A]ᵐ[B]ⁿ), orders from experimental data, mechanisms with a rate-determining step, and the Arrhenius equation k = Ae^(−Eₐ/RT).
ex: Doubling [A] doubles the rate. What is the order with respect to A?
> 2ᵐ = 2
= First order
term: collision theory = reactions require collisions with enough energy and correct orientation
term: activation energy = the minimum energy needed for a reaction to occur
term: catalyst = a substance that increases the rate by providing a lower-energy pathway
term: Maxwell–Boltzmann distribution = a graph of the number of particles with each kinetic energy
q: How does a catalyst increase the rate? | *It lowers the activation energy | It raises the temperature | It increases ΔH | It shifts equilibrium
why: An alternative pathway.
q: Why does higher temperature increase the rate? | *More particles have energy ≥ Eₐ | Eₐ decreases | Fewer collisions occur | The catalyst activates
why: The distribution shifts to higher energies.

@unit Reactivity 2 and 3: How Much, How Fast and What Mechanisms? | Stoichiometry and equilibrium, acids and bases, redox, organic mechanisms
@lesson Stoichiometry and equilibrium
say: How much product can we make, and when does a reaction stop? Stoichiometry and equilibrium answer these.
key: Stoichiometry uses mole ratios from balanced equations. The limiting reactant determines theoretical yield. Percentage yield = actual/theoretical × 100%. Atom economy = mass of desired product/total mass of reactants × 100%.
Dynamic equilibrium: forward and reverse rates are equal. The equilibrium constant K = [products]/[reactants] (raised to coefficients). Le Chatelier's principle predicts shifts when concentration, pressure or temperature change. Only temperature changes K.
ex: For N₂ + 3H₂ ⇌ 2NH₃ (exothermic), how does raising temperature affect yield?
> Raising temperature favors the endothermic (reverse) direction
= Yield of NH₃ decreases (and K decreases)
term: limiting reactant = the reactant that is used up first
term: atom economy = the percentage of reactant mass that ends up in the desired product
term: equilibrium constant = the ratio of product to reactant concentrations at equilibrium
term: Le Chatelier's principle = a system at equilibrium shifts to oppose a change
q: Which change alters the value of K? | *Temperature | Concentration | Pressure | Adding a catalyst
why: Only temperature changes K.
q: 40 g of product is made from a theoretical 50 g. Percentage yield? | *80% | 125% | 40% | 20%
why: 40/50 × 100.
gen: stem.stoich, chem.balance

@lesson Acids, bases and redox
say: Proton transfer and electron transfer are two of the most important types of reactions.
key: Brønsted–Lowry acids donate protons; bases accept them. Conjugate pairs differ by one H⁺. pH = −log[H⁺]; at 298 K, Kw = 1.0 × 10⁻¹⁴ and pH + pOH = 14. Strong acids fully dissociate; weak acids partially dissociate.
Neutralization produces a salt and water. Titrations find unknown concentrations; buffers resist pH changes.
Redox: oxidation is loss of electrons (increase in oxidation state), reduction is gain (decrease). In voltaic cells, chemical energy becomes electrical energy; oxidation occurs at the anode. Electrolytic cells use electricity to drive non-spontaneous reactions.
Organic mechanisms (Reactivity 3): nucleophilic substitution, electrophilic addition to alkenes, and (HL) more mechanisms with curly arrows.
term: Brønsted–Lowry acid = a proton donor
term: buffer = a solution that resists changes in pH
term: oxidation = loss of electrons; increase in oxidation state
term: voltaic cell = a cell that converts chemical energy into electrical energy
q: What is the pH of a solution with [H⁺] = 1 × 10⁻³ mol dm⁻³? | *3 | −3 | 11 | 0.001
why: −log(10⁻³).
q: In a voltaic cell, oxidation occurs at the… | *anode | cathode | salt bridge | voltmeter
why: An Ox.
gen: stem.pH, bank.CHEM.acids
`;
