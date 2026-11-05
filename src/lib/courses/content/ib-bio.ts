export default String.raw`
@course ib-bio | IB Biology | IB | 🦠 | IB

// Follows the four themes of the IB Biology guide (first assessment 2025): Unity and diversity; Form and function; Interaction and interdependence; Continuity and change.

@unit A: Unity and Diversity | Water, nucleic acids, cell structure, organisms and species, classification
@lesson Water, nucleic acids and the origin of cells
say: Theme A asks what all living things share and how they differ. It starts at the molecular level.
key: Water's polarity and hydrogen bonding give it cohesion, adhesion, high specific heat and solvent properties that make life possible.
Nucleic acids: DNA (deoxyribose, double helix, A–T and C–G complementary base pairing, antiparallel strands) and RNA (ribose, single-stranded, uracil). The genetic code is universal, which is evidence of common ancestry.
Cell theory: all organisms are made of cells, cells are the smallest unit of life, and cells come from pre-existing cells. Prokaryotes lack a nucleus; eukaryotes have membrane-bound organelles. Endosymbiosis explains the origin of mitochondria and chloroplasts.
lab: Measuring cells under a microscope
aim: Measure the image of a cell and use the magnification to find its actual size.
set: I = 20 | Image size (mm) | 1 to 100 by 1
set: M = 400 | Magnification | 40 to 1000 by 10
out: A = I*1000/M | Actual size (μm)
plot: M, A
step: Record the actual size for 4 magnifications of a 20 mm image.
step: A typical animal cell is 10–30 μm. Which settings match?
result: Actual size = image size ÷ magnification. Converting units carefully (1 mm = 1,000 μm) is the most common source of error. Eukaryotic cells are usually 10–100 μm; bacteria about 1–5 μm.
term: hydrogen bond = a weak attraction between a slightly positive H and a slightly negative atom
term: complementary base pairing = A pairs with T (or U) and C pairs with G
term: endosymbiosis = the theory that mitochondria and chloroplasts came from engulfed prokaryotes
term: antiparallel = DNA strands running in opposite directions
q: Why does water have a high specific heat capacity? | *Hydrogen bonds must be broken to raise its temperature | It's nonpolar | It has ionic bonds | It's a gas
why: Energy goes into breaking hydrogen bonds.
q: Evidence for endosymbiosis includes… | *mitochondria having their own circular DNA | mitochondria lacking membranes | all cells having chloroplasts | ribosomes in the nucleus
why: Circular DNA resembles bacteria.
gen: bank.BIO.cells, bank.BIO.biochem

@lesson Species, classification and biodiversity
say: Life is incredibly diverse. Biologists classify organisms to understand their relationships.
key: A species is often defined as a group of organisms that can interbreed to produce fertile offspring, though this biological species concept has limits (asexual organisms, fossils).
Classification uses a hierarchy (domain, kingdom, phylum, class, order, family, genus, species) and binomial nomenclature (Homo sapiens). Cladistics groups organisms by shared derived characteristics into clades, often using DNA sequences.
The three domains: Bacteria, Archaea and Eukarya.
Biodiversity can be measured with richness and evenness; dichotomous keys identify organisms.
term: binomial nomenclature = the two-part scientific naming system (genus and species)
term: clade = a group of organisms descended from a common ancestor
term: cladogram = a diagram showing evolutionary relationships based on shared characteristics
term: dichotomous key = a tool that identifies organisms through a series of paired choices
q: What are the three domains of life? | *Bacteria, Archaea and Eukarya | Plants, Animals and Fungi | Prokaryotes, Eukaryotes and Viruses | Kingdom, Phylum and Class
why: Based on molecular evidence.
q: A clade includes… | *an ancestor and all its descendants | unrelated species | only plants | only living species
why: Clades are monophyletic groups.

@unit B: Form and Function | Proteins, membranes, organelles, gas exchange, transport, muscle and motility
@lesson Molecules, membranes and organelles
say: Theme B shows how structure determines function, from proteins to whole organ systems.
key: Proteins: amino acids joined by peptide bonds, with primary, secondary, tertiary and quaternary structure. Shape determines function; denaturation destroys it.
Membranes: the fluid mosaic model, a phospholipid bilayer with proteins and cholesterol. Transport: simple diffusion, facilitated diffusion, osmosis (passive) and active transport using ATP and pumps; endocytosis and exocytosis for bulk transport.
Compartmentalization in eukaryotic cells allows specialized conditions (for example, low pH in lysosomes).
tip: In exam answers, link each structure to its function: say what the feature is, then explain how it helps the cell or organism.
term: fluid mosaic model = a model of the membrane as a phospholipid bilayer with embedded proteins
term: active transport = movement against a concentration gradient using ATP
term: denaturation = a change in protein shape that destroys its function
term: osmosis = the passive movement of water across a membrane toward higher solute concentration
q: Which transport requires ATP? | *Active transport | Osmosis | Simple diffusion | Facilitated diffusion
why: It moves substances against the gradient.
q: Denaturing an enzyme changes its… | *shape and active site | primary structure only | number of amino acids | DNA
why: Bonds holding its 3D shape break.

@lesson Gas exchange and transport
say: Organisms have evolved specialized structures to exchange gases and transport materials efficiently.
key: Gas exchange surfaces are thin, moist, have a large surface area and a good blood supply. In humans, alveoli and ventilation (diaphragm and intercostal muscles) maintain concentration gradients. In leaves, stomata allow gas exchange.
Blood vessels: arteries (thick, elastic walls, high pressure), veins (thin walls, valves) and capillaries (one cell thick for exchange).
Plants transport water through xylem by transpiration (cohesion–tension) and sugars through phloem by translocation.
tip: Fick's law sums it up: the rate of diffusion increases with surface area and concentration difference, and decreases with the thickness of the barrier.
lab: Potometer and transpiration
aim: Use a potometer to measure how fast a leafy shoot takes up water in different conditions.
set: RH = 50 | Relative humidity (%) | 20 to 95 by 5
set: w = 1 | Wind speed (m/s) | 0 to 5 by 0.5
out: rate = 2*(1 - RH/100)*(1 + 0.6*sqrt(w)) | Water uptake (mm per min)
plot: RH, rate
step: Record the rate at 5 humidity levels in still air.
step: Then add a fan and compare.
noise: 5
result: Transpiration is fastest in dry, windy conditions because the water vapor gradient between the leaf and the air is steepest. Water loss pulls water up the xylem by cohesion–tension.
term: alveoli = tiny air sacs in the lungs where gas exchange occurs
term: transpiration = the loss of water vapor from leaves, driving water movement in xylem
term: xylem = plant tissue that transports water and minerals
term: phloem = plant tissue that transports sugars
q: Why are capillary walls only one cell thick? | *To allow rapid diffusion | To withstand high pressure | To store blood | To pump blood
why: Short diffusion distance.
q: Water moves up xylem mainly because of… | *transpiration and cohesion | active pumping by roots only | gravity | phloem pressure
why: Evaporation pulls a continuous water column.
gen: bank.BIO.body

@unit C: Interaction and Interdependence | Enzymes and metabolism, cell respiration, photosynthesis, signaling, homeostasis, populations and ecosystems
@lesson Metabolism, respiration and photosynthesis
say: Theme C explores how molecules and organisms interact. Energy flow through cells is central.
key: Enzymes lower activation energy; their activity depends on temperature, pH and substrate concentration. Competitive inhibitors bind the active site; non-competitive inhibitors bind elsewhere. End-product inhibition regulates pathways.
Cell respiration releases energy from glucose to make ATP: anaerobic respiration (glycolysis plus fermentation, small ATP yield) and aerobic respiration (much more ATP using oxygen).
Photosynthesis converts light energy into chemical energy: light-dependent reactions produce ATP and NADPH and release O₂; the Calvin cycle fixes CO₂ into carbohydrates. Limiting factors: light intensity, CO₂ concentration and temperature.
lab: Yeast fermentation and sugar
aim: Give yeast different glucose concentrations and measure how fast it produces CO₂.
set: S = 2 | Glucose (%) | 0 to 20 by 0.5
set: Vm = 10 | Maximum rate (cm³ CO₂/min) | 5 to 20 by 1
out: v = Vm*S/(1.5 + S) | CO₂ production (cm³/min)
plot: S, v
step: Record the rate at 6 glucose concentrations.
step: Why does adding more sugar eventually stop helping?
noise: 5
result: The rate rises, then levels off as the yeast's enzymes become saturated (all active sites occupied). At high sugar concentrations another factor, the amount of enzyme, becomes limiting.
term: competitive inhibition = an inhibitor binding to the active site, blocking the substrate
term: aerobic respiration = respiration using oxygen, producing large amounts of ATP
term: limiting factor = the factor in shortest supply that limits the rate of a process
term: Calvin cycle = the light-independent reactions that fix CO₂ into sugar
q: Which inhibitor can be overcome by adding more substrate? | *Competitive | Non-competitive | Allosteric | End-product
why: Substrate outcompetes it for the active site.
q: Oxygen released in photosynthesis comes from… | *splitting water | carbon dioxide | glucose | ATP
why: Photolysis of water.
gen: bank.BIO.biochem

@lesson Homeostasis and ecosystems
say: Organisms maintain internal balance, and they interact in communities and ecosystems.
key: Homeostasis uses negative feedback: blood glucose (insulin lowers it, glucagon raises it), body temperature, and water balance. Cell signaling uses hormones and neurotransmitters binding to receptors.
Populations: growth curves (exponential and logistic), carrying capacity, and limiting factors. Interactions: competition, predation, herbivory, mutualism and parasitism.
Ecosystems: energy flows through trophic levels with about 90% lost as heat at each step; nutrients cycle (the carbon cycle). Keystone species have large effects on communities.
ex: After a meal, blood glucose rises. Describe the response.
> Pancreas beta cells secrete insulin
= Cells absorb glucose and the liver stores it as glycogen; glucose returns to normal (negative feedback)
term: negative feedback = a response that reverses a change to restore a set point
term: carrying capacity = the maximum population an environment can sustain
term: keystone species = a species with a disproportionately large effect on its ecosystem
term: trophic level = a position in a food chain
q: Which hormone raises blood glucose? | *Glucagon | Insulin | Adrenaline only | Thyroxine
why: Glucagon triggers glycogen breakdown.
q: About how much energy is lost between trophic levels? | *90% | 10% | 50% | 0%
why: Only about 10% passes on.
gen: bank.BIO.ecology

@unit D: Continuity and Change | DNA replication and protein synthesis, cell division, inheritance, natural selection, climate change
@lesson Genes, protein synthesis and inheritance
say: Theme D explains how life continues and changes across generations, starting with genetic information.
key: DNA replication is semi-conservative: helicase unwinds, DNA polymerase builds new strands 5′ to 3′. Protein synthesis: transcription (DNA → mRNA) and translation (mRNA → protein at ribosomes, with tRNA anticodons matching codons).
Cell division: mitosis produces genetically identical cells for growth and repair; meiosis produces genetically varied haploid gametes through crossing over and independent assortment. Errors (non-disjunction) cause conditions like Down syndrome.
Inheritance: dominant, recessive and codominant alleles, sex linkage, and multiple alleles (ABO blood groups). Punnett grids predict offspring ratios; chi-squared tests compare observed and expected results.
term: semi-conservative replication = each new DNA molecule keeps one original strand
term: transcription = copying DNA into mRNA
term: meiosis = cell division producing four genetically different haploid cells
term: codominance = both alleles fully expressed in the phenotype
q: Translation takes place at… | *ribosomes | the nucleus | the Golgi apparatus | mitochondria
why: Ribosomes read mRNA.
q: A cross of Aa × Aa gives what ratio of phenotypes (complete dominance)? | *3:1 | 1:1 | 1:2:1 | 9:3:3:1
why: 3 dominant to 1 recessive.
gen: stem.punnett, bank.BIO.genetics

@lesson Evolution and climate change
say: Life changes over time through evolution, and today, rapid climate change is affecting ecosystems worldwide.
key: Natural selection: variation exists, more offspring are produced than survive, individuals with better-adapted traits survive and reproduce more, and those traits become more common. Evidence: fossils, homologous structures, DNA sequences and observed change (antibiotic resistance).
Speciation occurs through reproductive isolation (allopatric or sympatric). Gene pools and allele frequencies change through selection, drift and gene flow (HL: Hardy–Weinberg).
Climate change: rising CO₂ from fossil fuels enhances the greenhouse effect, causing warming, ocean acidification, shifts in species ranges and coral bleaching. Mitigation includes reducing emissions and protecting carbon sinks.
lab: Antibiotic resistance spreading
aim: Track the fraction of resistant bacteria in a population when an antibiotic gives them an advantage each generation.
set: t = 10 | Generations | 0 to 60 by 1
set: s = 0.3 | Selective advantage | 0.05 to 1 by 0.05
out: p = 0.001*(1 + s)^t/(0.001*(1 + s)^t + 0.999) | Fraction resistant
plot: t, p
step: Record the fraction resistant every 10 generations.
step: Lower the selective advantage, as when antibiotics are used less.
noise: 2
result: A rare resistant mutant spreads slowly at first, then rapidly, until it dominates (an S-shaped curve). Bacteria divide every 20–30 minutes, so this can happen in days; reducing antibiotic overuse lowers the advantage.
term: natural selection = differential survival and reproduction of individuals with advantageous traits
term: allopatric speciation = speciation through geographic isolation
term: gene pool = all the alleles in a population
term: ocean acidification = the decrease in ocean pH from absorbing CO₂
q: Antibiotic resistance in bacteria is evidence of… | *natural selection | Lamarckism | spontaneous generation | climate change
why: Resistant bacteria survive and reproduce.
q: Coral bleaching is caused mainly by… | *rising ocean temperatures | cold water | overfishing only | increased salinity only
why: Heat stress makes corals expel algae.
gen: bank.BIO.evolution, stem.hardy
`;
