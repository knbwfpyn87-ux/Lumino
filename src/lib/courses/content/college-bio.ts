export default String.raw`
@course college-bio | General Biology (College) | College | 🔬 | College

// Follows a standard majors' introductory biology sequence (OpenStax Biology 2e): the chemistry of life, cells and energy, genetics and molecular biology, evolution, and ecology.

@unit Cells and Energy | Biological molecules, cell structure, membranes, metabolism
@lesson The chemistry of life and cell structure
say: Biology rests on chemistry. Four kinds of large molecules build every cell.
key: Macromolecules: carbohydrates (monosaccharides, energy and structure), lipids (fats, phospholipids, steroids), proteins (amino acids, four levels of structure) and nucleic acids (nucleotides; DNA and RNA). Polymers form by dehydration synthesis and break by hydrolysis.
Prokaryotic cells lack a nucleus; eukaryotic cells have a nucleus and membrane-bound organelles: mitochondria (respiration), chloroplasts (photosynthesis), ER, Golgi apparatus, lysosomes and the cytoskeleton.
Membranes follow the fluid mosaic model. Transport: diffusion and osmosis (passive), facilitated diffusion through channels, active transport with ATP (the sodium–potassium pump), and endocytosis and exocytosis.
term: dehydration synthesis = joining monomers by removing water
term: hydrolysis = breaking polymers by adding water
term: fluid mosaic model = a membrane of phospholipids with embedded, moving proteins
term: active transport = moving substances against their gradient using energy
q: Which organelle modifies and packages proteins for export? | *Golgi apparatus | Lysosome | Mitochondrion | Nucleolus
why: The Golgi processes and ships proteins.
q: A cell in a hypertonic solution will… | *lose water and shrink | gain water and swell | stay the same | divide
why: Water leaves toward higher solute concentration.
gen: bank.BIO.cells, bank.BIO.biochem

@lesson Metabolism, respiration and photosynthesis
say: Cells capture and spend energy through linked chemical pathways.
key: Enzymes lower activation energy; activity depends on temperature, pH and inhibitors (competitive and noncompetitive). ATP is the cell's energy currency.
Cellular respiration: glycolysis (cytoplasm, 2 ATP net) → pyruvate oxidation → the citric acid cycle (mitochondrial matrix, NADH and FADH₂) → oxidative phosphorylation (electron transport chain and chemiosmosis through ATP synthase, about 26–28 more ATP). Oxygen is the final electron acceptor; without it, fermentation regenerates NAD⁺.
Photosynthesis: light reactions in the thylakoids split water, release O₂ and make ATP and NADPH; the Calvin cycle in the stroma fixes CO₂ with rubisco into sugar.
term: ATP = adenosine triphosphate, the cell's main energy carrier
term: chemiosmosis = ATP production driven by a proton gradient through ATP synthase
term: fermentation = anaerobic regeneration of NAD⁺ so glycolysis can continue
term: Calvin cycle = the light-independent reactions that fix CO₂ into sugar
q: Where does the electron transport chain occur in eukaryotes? | *Inner mitochondrial membrane | Cytoplasm | Stroma | Nucleus
why: Its proteins sit in the inner membrane.
q: The O₂ released by photosynthesis comes from… | *water | CO₂ | glucose | rubisco
why: Water is split in the light reactions.

@unit Genetics | Cell division, inheritance, DNA, gene expression
@lesson Cell division and inheritance
say: Cells divide to grow and reproduce, and genes pass between generations in predictable patterns.
key: The cell cycle: interphase (G₁, S, G₂) and mitosis (prophase, metaphase, anaphase, telophase), then cytokinesis. Checkpoints regulate it; cancer results from failed control.
Meiosis produces four haploid gametes; crossing over and independent assortment create variation. Nondisjunction causes aneuploidy.
Mendel's laws: segregation and independent assortment. Monohybrid Aa × Aa gives 3:1; dihybrid AaBb × AaBb gives 9:3:3:1. Extensions: incomplete dominance, codominance, multiple alleles, sex linkage, epistasis and polygenic traits.
ex: Two carriers of a recessive disorder (Aa × Aa) have a child. What is the chance the child is affected?
> Offspring: AA, Aa, Aa, aa
= 1/4 (25%)
term: meiosis = cell division producing four genetically different haploid cells
term: crossing over = exchange of segments between homologous chromosomes
term: law of segregation = the two alleles of a gene separate into different gametes
term: sex-linked trait = a trait coded by a gene on a sex chromosome
q: Human gametes contain how many chromosomes? | *23 | 46 | 92 | 22
why: They are haploid.
q: A testcross with a homozygous recessive reveals… | *an unknown dominant genotype | the mutation rate | the number of chromosomes | blood type only
why: Offspring ratios show whether the parent is AA or Aa.
gen: stem.punnett, bank.BIO.genetics

@lesson DNA and gene expression
say: DNA stores genetic information; gene expression turns it into proteins.
key: DNA replication is semi-conservative: helicase unwinds, primase lays primers, DNA polymerase adds nucleotides 5′ → 3′ (leading strand continuous, lagging strand in Okazaki fragments), and ligase seals gaps.
The central dogma: DNA → RNA → protein. Transcription by RNA polymerase; in eukaryotes, mRNA is processed (5′ cap, poly-A tail, intron splicing). Translation at ribosomes: tRNA anticodons pair with mRNA codons; start codon AUG.
Gene regulation: the lac operon in bacteria; transcription factors, epigenetics and alternative splicing in eukaryotes. Mutations (point, frameshift) can alter proteins. Biotechnology: PCR, gel electrophoresis, CRISPR.
term: semi-conservative replication = each new DNA molecule keeps one original strand
term: transcription = synthesizing RNA from a DNA template
term: operon = a cluster of bacterial genes controlled by one promoter
term: frameshift mutation = an insertion or deletion that shifts the reading frame
tip: Keep the direction straight: DNA polymerase and RNA polymerase both build new strands 5′ to 3′, reading the template 3′ to 5′.
q: Introns are… | *removed from pre-mRNA | translated into protein | found only in bacteria | added during translation
why: Splicing removes introns.
q: A single-base deletion usually causes a… | *frameshift | silent mutation | duplicate gene | new chromosome
why: All later codons shift.
gen: bank.BIO.dna

@unit Evolution and Ecology | Natural selection, population genetics, speciation, ecosystems
@lesson Evolution
say: Evolution is the unifying theory of biology. It explains both life's unity and its diversity.
key: Natural selection: heritable variation, overproduction, differential survival and reproduction. Evidence: fossils, homologous and vestigial structures, comparative DNA, biogeography and direct observation.
Population genetics: Hardy–Weinberg equilibrium p² + 2pq + q² = 1 holds without selection, mutation, migration, drift or nonrandom mating. Genetic drift (bottleneck and founder effects) matters most in small populations.
Speciation: allopatric (geographic isolation) and sympatric. Reproductive barriers are prezygotic or postzygotic. Phylogenetic trees show common ancestry.
ex: In a population, q² (recessive phenotype) = 0.16. Find q and p.
> q = √0.16 = 0.4
= p = 1 − 0.4 = 0.6
term: Hardy–Weinberg equilibrium = stable allele frequencies in a non-evolving population
term: genetic drift = random change in allele frequencies
term: founder effect = reduced variation when a few individuals start a new population
term: homologous structures = similar structures from a common ancestor
q: A bottleneck effect reduces… | *genetic variation | mutation rate to zero | population density forever | natural selection entirely
why: Few survivors carry limited alleles.
q: Bat wings and human arms are… | *homologous | analogous | vestigial | unrelated
why: Same bones, common ancestry.
gen: stem.hardy, bank.BIO.evolution

@lesson Ecology
say: Ecology connects organisms to each other and their environment, from populations to the biosphere.
key: Population growth: exponential dN/dt = rN, and logistic growth that levels off at carrying capacity K. Density-dependent and density-independent factors limit growth; r- and K-selected life histories differ.
Communities: competition, predation, mutualism, commensalism and parasitism. Keystone species shape communities; succession (primary and secondary) changes them over time.
Ecosystems: energy flows (about 10% passes between trophic levels) while nutrients cycle (carbon, nitrogen, phosphorus). Human impacts include habitat loss, invasive species, climate change and biodiversity loss.
term: carrying capacity = the maximum population an environment can sustain
term: logistic growth = growth that slows as a population nears carrying capacity
term: keystone species = a species with an outsized effect on its community
term: primary succession = colonization of a new, lifeless surface
q: Removing a keystone predator often leads to… | *a sharp drop in community diversity | more species diversity | no change | faster succession only
why: Its prey can outcompete other species.
q: Nitrogen-fixing bacteria convert N₂ into… | *ammonia | CO₂ | glucose | ozone
why: Fixation makes N usable by plants.
gen: bank.BIO.ecology
`;
