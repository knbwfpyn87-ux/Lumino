// Term ↔ definition banks for concept-heavy classes. Each pair is one fact; questions ask it both ways.
// Wrong choices are other terms/definitions from the same unit, so exactly one choice is ever right.
import type { Gen } from '../generated';

export type Pairs = [string, string][];
type Mode = 'both' | 'def' | 'term';
/** Builds a generator from a unit's pairs. `ask` picks the wording; `kind` names what the term is (for the prompt). */
export function vocab(pairs: Pairs, opts: { mode?: Mode; termQ?: (t: string) => string; defQ?: (d: string) => string } = {}): Gen {
  const { mode = 'both', termQ = t => `What does "${t}" mean?`, defQ = d => `Which term matches: "${d}"?` } = opts;
  return r => {
    const [t, d] = r.pick(pairs); const others = r.shuffle(pairs.filter(p => p[0] !== t && p[1] !== d)).slice(0, 3);
    const askTerm = mode === 'term' || (mode === 'both' && r.next() < 0.5);
    return askTerm
      ? { prompt: termQ(t), correct: d, wrong: others.map(o => o[1]), explanation: `${t}: ${d}.` }
      : { prompt: defQ(d), correct: t, wrong: others.map(o => o[0]), explanation: `${t}: ${d}.` };
  };
}
const v = vocab;
const people = (pairs: Pairs) => vocab(pairs, { termQ: t => `What is ${t} known for?`, defQ: d => `Who is known for: ${d}?` });
const events = (pairs: Pairs) => vocab(pairs, { termQ: t => `What was the ${t}?`, defQ: d => `Which matches this description: ${d}?` });
const word = (lang: string, pairs: Pairs) => vocab(pairs, { termQ: t => `What does the ${lang} word "${t}" mean?`, defQ: d => `How do you say "${d}" in ${lang}?` });
const art = (pairs: Pairs) => vocab(pairs, { termQ: t => `Who created ${t}?`, defQ: d => `Which work is by ${d}?` });

// ---------------- Biology ----------------
export const BIO = {
  cells: v([['nucleus', "stores the cell's DNA"], ['mitochondria', 'produce ATP through cellular respiration'], ['ribosome', 'builds proteins'], ['chloroplast', 'carries out photosynthesis'],
    ['cell membrane', 'controls what enters and leaves the cell'], ['Golgi apparatus', 'packages and ships proteins'], ['lysosome', 'breaks down waste using enzymes'], ['cell wall', 'rigid outer layer in plant cells'],
    ['prokaryote', 'cell with no nucleus, like bacteria'], ['eukaryote', 'cell with a nucleus and membrane-bound organelles']]),
  biochem: v([['enzyme', 'protein that speeds up a reaction'], ['ATP', 'molecule cells use for energy'], ['carbohydrate', 'sugars and starches used for energy'], ['lipid', 'fats and oils; makes up cell membranes'],
    ['protein', 'chain of amino acids'], ['nucleic acid', 'DNA or RNA'], ['photosynthesis', 'uses light to turn CO₂ and water into glucose and oxygen'], ['cellular respiration', 'breaks down glucose to release energy'],
    ['diffusion', 'movement from high to low concentration'], ['osmosis', 'diffusion of water across a membrane']]),
  genetics: v([['allele', 'a version of a gene'], ['genotype', 'the alleles an organism has'], ['phenotype', 'observable traits'], ['dominant allele', 'shows its trait with only one copy'],
    ['recessive allele', 'shows its trait only with two copies'], ['homozygous', 'two identical alleles'], ['heterozygous', 'two different alleles'], ['mutation', 'a change in the DNA sequence'],
    ['codominance', 'both alleles fully show in the phenotype'], ['sex-linked trait', 'gene carried on the X or Y chromosome']]),
  dna: v([['DNA replication', 'copying DNA before a cell divides'], ['transcription', 'making mRNA from DNA'], ['translation', 'building a protein from mRNA'], ['codon', 'three mRNA bases that code for one amino acid'],
    ['mitosis', 'division that makes two identical body cells'], ['meiosis', 'division that makes four sex cells with half the chromosomes'], ['gene', 'segment of DNA that codes for a protein'], ['chromosome', 'long, coiled strand of DNA'],
    ['base pairing', 'A with T and C with G'], ['tRNA', 'brings amino acids to the ribosome']]),
  evolution: v([['natural selection', 'better-suited individuals survive and reproduce more'], ['adaptation', 'inherited trait that improves survival'], ['homologous structures', 'similar structures inherited from a common ancestor'],
    ['analogous structures', 'similar function but different ancestry'], ['speciation', 'formation of a new species'], ['genetic drift', 'random change in allele frequencies'], ['fossil record', 'preserved evidence of past life'],
    ['vestigial structure', 'body part that has lost its original function'], ['gene flow', 'movement of alleles between populations'], ['artificial selection', 'humans breeding for chosen traits']]),
  ecology: v([['producer', 'makes its own food, usually by photosynthesis'], ['consumer', 'gets energy by eating other organisms'], ['decomposer', 'breaks down dead organisms'], ['food web', 'network of feeding relationships'],
    ['carrying capacity', 'largest population an environment can support'], ['mutualism', 'both species benefit'], ['parasitism', 'one benefits and the other is harmed'], ['commensalism', 'one benefits and the other is unaffected'],
    ['trophic level', 'feeding position in a food chain'], ['keystone species', 'species with an outsized effect on its ecosystem']]),
  body: v([['circulatory system', 'moves blood through the body'], ['respiratory system', 'exchanges oxygen and carbon dioxide'], ['digestive system', 'breaks down food and absorbs nutrients'], ['nervous system', 'sends electrical signals to coordinate the body'],
    ['endocrine system', 'uses hormones to regulate the body'], ['immune system', 'defends against pathogens'], ['skeletal system', 'supports the body and makes blood cells'], ['urinary system', 'filters blood and removes waste as urine'],
    ['muscular system', 'moves the body by contracting'], ['integumentary system', 'skin, hair and nails that protect the body']]),
  anatomy: v([['alveoli', 'tiny air sacs where gas exchange happens'], ['neuron', 'nerve cell'], ['femur', 'longest bone in the body'], ['insulin', 'hormone that lowers blood sugar'],
    ['nephron', 'filtering unit of the kidney'], ['tendon', 'connects muscle to bone'], ['ligament', 'connects bone to bone'], ['red blood cells', 'carry oxygen using hemoglobin'],
    ['white blood cells', 'fight infection'], ['platelets', 'help blood clot'], ['aorta', 'largest artery, leaving the heart'], ['diaphragm', 'muscle that drives breathing']]),
};

// ---------------- Chemistry ----------------
export const CHEM = {
  atoms: v([['proton', 'positive particle in the nucleus'], ['neutron', 'neutral particle in the nucleus'], ['electron', 'negative particle outside the nucleus'], ['atomic number', 'number of protons'],
    ['mass number', 'protons plus neutrons'], ['isotope', 'same element, different number of neutrons'], ['ion', 'atom with a charge from gaining or losing electrons'], ['valence electrons', 'electrons in the outermost shell']]),
  periodic: v([['group', 'vertical column of the periodic table'], ['period', 'horizontal row of the periodic table'], ['alkali metals', 'group 1, very reactive metals'], ['halogens', 'group 17, reactive nonmetals'],
    ['noble gases', 'group 18, mostly unreactive gases'], ['electronegativity', 'how strongly an atom attracts bonding electrons'], ['transition metals', 'elements in groups 3–12'], ['metalloid', 'element with properties of both metals and nonmetals']]),
  bonding: v([['ionic bond', 'electrons transferred from a metal to a nonmetal'], ['covalent bond', 'electrons shared between nonmetals'], ['metallic bond', 'sea of shared electrons among metal atoms'], ['polar molecule', 'molecule with an uneven charge distribution'],
    ['hydrogen bond', 'attraction between H on N, O or F and another N, O or F'], ['Lewis structure', 'diagram showing valence electrons as dots'], ['VSEPR theory', 'predicts molecule shape from electron-pair repulsion'], ['double bond', 'two shared pairs of electrons']]),
  reactions: v([['synthesis', 'two or more substances combine into one'], ['decomposition', 'one substance breaks into simpler ones'], ['single replacement', 'one element replaces another in a compound'], ['double replacement', 'ions in two compounds swap partners'],
    ['combustion', 'fuel reacts with oxygen, making CO₂ and water'], ['catalyst', 'speeds a reaction without being used up'], ['exothermic', 'releases heat'], ['endothermic', 'absorbs heat'], ['limiting reactant', 'reactant that runs out first']]),
  acids: v([['acid', 'donates H⁺ ions; pH below 7'], ['base', 'accepts H⁺ ions; pH above 7'], ['neutralization', 'acid + base → salt + water'], ['buffer', 'resists changes in pH'],
    ['indicator', 'changes color depending on pH'], ['strong acid', 'fully ionizes in water'], ['weak acid', 'only partly ionizes in water'], ['titration', 'adding a solution of known concentration to find an unknown one']]),
  thermo: v([['enthalpy', 'heat content at constant pressure'], ['entropy', 'measure of disorder'], ['Gibbs free energy', 'tells whether a reaction is spontaneous (ΔG < 0)'], ['activation energy', 'minimum energy needed to start a reaction'],
    ['equilibrium', 'forward and reverse reaction rates are equal'], ["Le Chatelier's principle", 'a system at equilibrium shifts to counter a change'], ['oxidation', 'loss of electrons'], ['reduction', 'gain of electrons']]),
};

// ---------------- Physics ----------------
export const PHYS = {
  forces: v([["Newton's first law", 'an object keeps its motion unless a net force acts'], ["Newton's second law", 'net force equals mass times acceleration'], ["Newton's third law", 'every action has an equal and opposite reaction'],
    ['inertia', 'resistance to changes in motion'], ['friction', 'force opposing sliding motion'], ['normal force', "a surface's push perpendicular to itself"], ['vector', 'quantity with magnitude and direction'], ['scalar', 'quantity with magnitude only']]),
  energy: v([['kinetic energy', 'energy of motion'], ['potential energy', 'stored energy of position'], ['conservation of energy', "energy can't be created or destroyed"], ['work', 'force times distance in the direction of the force'],
    ['power', 'rate of doing work'], ['joule', 'SI unit of energy'], ['watt', 'SI unit of power, one joule per second'], ['momentum', 'mass times velocity']]),
  waves: v([['wavelength', 'distance between two crests'], ['frequency', 'number of waves per second'], ['amplitude', 'height of a wave from its rest position'], ['transverse wave', 'vibrates perpendicular to its direction of travel'],
    ['longitudinal wave', 'vibrates parallel to its direction of travel'], ['reflection', 'a wave bouncing off a surface'], ['refraction', 'a wave bending as it changes medium'], ['Doppler effect', 'change in observed frequency due to relative motion'], ['hertz', 'unit of frequency']]),
  electricity: v([['current', 'flow of charge, measured in amperes'], ['voltage', 'electric potential difference, measured in volts'], ['resistance', 'opposition to current, measured in ohms'], ['series circuit', 'only one path for current'],
    ['parallel circuit', 'several paths for current'], ['conductor', 'lets charge flow easily'], ['insulator', 'resists the flow of charge'], ['magnetic field', 'region where a magnetic force acts']]),
  modern: v([['photon', 'particle of light'], ['photoelectric effect', 'light knocking electrons out of a metal'], ['half-life', 'time for half of a radioactive sample to decay'], ['alpha particle', 'helium nucleus'],
    ['beta particle', 'high-energy electron emitted by a nucleus'], ['gamma ray', 'high-energy electromagnetic radiation'], ['nuclear fission', 'splitting a heavy nucleus'], ['nuclear fusion', 'joining light nuclei']]),
};

// ---------------- Earth & environment ----------------
export const EARTH = {
  geology: v([['igneous rock', 'forms from cooled magma or lava'], ['sedimentary rock', 'forms from compacted sediments'], ['metamorphic rock', 'rock changed by heat and pressure'], ['plate tectonics', "Earth's outer shell moving in plates"],
    ['convergent boundary', 'plates move toward each other'], ['divergent boundary', 'plates move apart'], ['transform boundary', 'plates slide past each other'], ['mantle', 'layer between the crust and the core'], ['erosion', 'moving of rock and soil by wind, water or ice']]),
  weather: v([['troposphere', 'lowest atmosphere layer, where weather happens'], ['humidity', 'amount of water vapor in the air'], ['front', 'boundary between two air masses'], ['Coriolis effect', "deflection of moving air due to Earth's rotation"],
    ['climate', 'long-term average weather'], ['greenhouse effect', 'gases trapping heat in the atmosphere'], ['jet stream', 'fast, high-altitude air current'], ['barometer', 'instrument that measures air pressure']]),
  space: v([['rotation', 'Earth spinning on its axis, once a day'], ['revolution', 'Earth orbiting the Sun, once a year'], ['light-year', 'distance light travels in a year'], ['galaxy', 'huge system of stars held together by gravity'],
    ['axial tilt', 'cause of the seasons'], ['lunar eclipse', "Earth's shadow falls on the Moon"], ['solar eclipse', 'the Moon blocks the Sun from Earth'], ['nebula', 'cloud of gas and dust where stars form']]),
  environment: v([['biodiversity', 'variety of life in an area'], ['renewable resource', 'naturally replenished on a human timescale'], ['nonrenewable resource', 'limited supply, like fossil fuels'], ['eutrophication', 'excess nutrients causing algae blooms and low oxygen'],
    ['biomagnification', 'toxins becoming more concentrated up a food chain'], ['sustainability', 'meeting needs without harming future generations'], ['invasive species', 'non-native species that spreads and causes harm'], ['ozone layer', 'stratospheric layer that absorbs UV radiation'],
    ['carbon footprint', 'total greenhouse gases caused by a person or activity'], ['watershed', 'land area that drains into one body of water']]),
};

// ---------------- Computer science & engineering ----------------
export const CS = {
  basics: v([['algorithm', 'step-by-step procedure to solve a problem'], ['variable', 'named storage for a value'], ['loop', 'repeats a block of code'], ['conditional', 'runs code only if a condition is true'],
    ['function', 'reusable, named block of code'], ['list (array)', 'ordered collection of values'], ['boolean', 'a true or false value'], ['debugging', 'finding and fixing errors in code'], ['syntax error', "a mistake in the language's rules"]]),
  internet: v([['IP address', 'number that identifies a device on a network'], ['packet', 'small chunk of data sent over a network'], ['protocol', 'agreed rules for communication'], ['DNS', 'translates domain names into IP addresses'],
    ['HTTP', 'protocol for transferring web pages'], ['encryption', 'scrambling data so only authorized parties can read it'], ['bandwidth', 'amount of data transferred per second'], ['lossless compression', 'shrinks data with no information lost'],
    ['lossy compression', 'shrinks data by discarding some information'], ['phishing', 'tricking people into revealing private information']]),
  algorithms: v([['binary search', 'repeatedly halves a sorted list to find a value'], ['linear search', 'checks each item in order'], ['bubble sort', 'repeatedly swaps adjacent out-of-order items'], ['merge sort', 'splits a list, sorts the halves, and merges them'],
    ['Big-O notation', 'describes how running time grows with input size'], ['recursion', 'a function that calls itself'], ['stack', 'last in, first out'], ['queue', 'first in, first out'], ['hash table', 'stores key–value pairs for fast lookup']]),
  systems: v([['CPU', 'executes program instructions'], ['RAM', 'fast, temporary working memory'], ['operating system', 'manages hardware and runs programs'], ['compiler', 'translates source code into machine code'],
    ['interpreter', 'runs code line by line'], ['bit', 'a single 0 or 1'], ['byte', '8 bits'], ['open source', 'software whose code anyone can view and modify']]),
  engineering: v([['engineering design process', 'define, brainstorm, prototype, test and improve'], ['prototype', 'early model used to test a design'], ['constraint', 'limit on a design, such as cost or size'], ['criteria', 'requirements a design must meet'],
    ['tension', 'pulling force'], ['compression', 'pushing or squeezing force'], ['factor of safety', 'ratio of strength to expected load'], ['CAD', 'computer-aided design software'], ['iteration', 'repeating the design cycle to improve it']]),
};

// ---------------- English ----------------
export const ENG = {
  literary: v([['metaphor', 'comparison without "like" or "as"'], ['simile', 'comparison using "like" or "as"'], ['personification', 'giving human qualities to non-human things'], ['alliteration', 'repeated beginning consonant sounds'],
    ['hyperbole', 'extreme exaggeration'], ['irony', 'contrast between what is expected and what happens'], ['foreshadowing', 'hints about later events'], ['theme', 'central message of a work'],
    ['protagonist', 'main character'], ['antagonist', 'character who opposes the protagonist'], ['onomatopoeia', 'a word that imitates a sound'], ['imagery', 'language that appeals to the senses']]),
  rhetoric: v([['ethos', 'appeal to credibility'], ['pathos', 'appeal to emotion'], ['logos', 'appeal to logic'], ['anaphora', 'repeating words at the start of successive clauses'],
    ['antithesis', 'contrasting ideas in parallel structure'], ['rhetorical question', 'a question asked for effect, not an answer'], ['concession', 'acknowledging an opposing point'], ['claim', 'the main argument being made'],
    ['diction', 'word choice'], ['syntax', 'sentence structure'], ['tone', "the author's attitude toward the subject"]]),
  poetry: v([['sonnet', '14-line poem'], ['iambic pentameter', 'ten-syllable line of unstressed–stressed pairs'], ['enjambment', 'a sentence running past the end of a line of poetry'], ['free verse', 'poetry without regular meter or rhyme'],
    ['motif', 'recurring element that develops a theme'], ['symbol', 'object that represents a larger idea'], ['unreliable narrator', "narrator whose account can't be fully trusted"], ['soliloquy', 'a character speaking thoughts alone on stage'],
    ['tragic flaw', "trait that leads to a hero's downfall"], ['allusion', 'reference to another work or event'], ['dramatic irony', "the audience knows something a character doesn't"]]),
  grammar: v([['noun', 'person, place, thing or idea'], ['verb', 'action or state of being'], ['adjective', 'describes a noun'], ['adverb', 'describes a verb, adjective or another adverb'],
    ['pronoun', 'takes the place of a noun'], ['conjunction', 'joins words or clauses'], ['preposition', 'shows a relationship, like "in," "on" or "under"'], ['independent clause', 'can stand alone as a sentence'],
    ['dependent clause', 'cannot stand alone as a sentence'], ['comma splice', 'two independent clauses joined only by a comma']]),
};

// ---------------- History & social studies ----------------
export const HIST = {
  usFounding: events([['Mayflower Compact', '1620 self-government agreement by the Plymouth settlers'], ['Declaration of Independence', '1776 document announcing separation from Britain'], ['Articles of Confederation', 'first U.S. constitution, with a weak central government'],
    ['Constitutional Convention', '1787 meeting that wrote the Constitution'], ['Bill of Rights', 'the first ten amendments'], ['Louisiana Purchase', '1803 land deal with France that doubled the nation'], ['Monroe Doctrine', '1823 warning against new European colonies in the Americas'], ['Manifest Destiny', 'belief that the U.S. was meant to expand west']]),
  usCivilWar: events([['Missouri Compromise', '1820 deal admitting Missouri as a slave state and Maine as free'], ['Dred Scott v. Sandford', '1857 ruling that enslaved people were not citizens'], ['Emancipation Proclamation', '1863 order freeing enslaved people in Confederate states'],
    ['13th Amendment', 'abolished slavery'], ['14th Amendment', 'granted citizenship and equal protection'], ['15th Amendment', 'banned denying the vote based on race'], ['Reconstruction', 'rebuilding the South after the Civil War, 1865–1877'], ['Battle of Gettysburg', '1863 battle that turned the war toward the Union']]),
  usIndustry: events([['Gilded Age', 'late-1800s era of rapid industry and inequality'], ['Progressive Era', 'early-1900s reform movement against corruption'], ['muckrakers', 'journalists who exposed corruption'], ['19th Amendment', "guaranteed women's right to vote in 1920"],
    ['Sherman Antitrust Act', '1890 law against monopolies'], ['Ellis Island', 'main immigration station in New York'], ['Plessy v. Ferguson', '1896 ruling allowing "separate but equal"'], ['Spanish–American War', '1898 war that gave the U.S. Puerto Rico, Guam and the Philippines']]),
  us20th: events([['New Deal', "FDR's programs responding to the Great Depression"], ['Great Depression', 'severe economic collapse after the 1929 crash'], ['Pearl Harbor', '1941 attack that brought the U.S. into WWII'], ['Marshall Plan', 'U.S. aid to rebuild Western Europe after WWII'],
    ['containment', 'Cold War policy to stop the spread of communism'], ['Brown v. Board of Education', '1954 ruling ending legal school segregation'], ['Civil Rights Act of 1964', 'banned discrimination by race, color, religion, sex or national origin'], ['Cuban Missile Crisis', '1962 standoff over Soviet missiles in Cuba'], ['Watergate', "scandal that led to Nixon's resignation"]]),
  worldAncient: events([['Mesopotamia', 'early civilization between the Tigris and Euphrates rivers'], ['Code of Hammurabi', 'early Babylonian law code'], ['Athenian democracy', 'citizen self-rule in ancient Greece'], ['Pax Romana', 'about 200 years of relative peace in the Roman Empire'],
    ['Silk Road', 'trade routes linking China and the Mediterranean'], ['Han dynasty', 'Chinese dynasty known for the Silk Road and civil service exams'], ['Maurya Empire', 'Indian empire that grew under Ashoka'], ['Confucianism', 'Chinese philosophy stressing social harmony and family respect']]),
  worldMedieval: events([['feudalism', 'medieval European system of lords, vassals and land'], ['Crusades', 'religious wars over the Holy Land'], ['Black Death', '1300s plague that killed a huge share of Europe'], ['Magna Carta', "1215 document limiting the English king's power"],
    ['Mongol Empire', 'largest contiguous land empire, founded by Genghis Khan'], ['Byzantine Empire', 'eastern Roman Empire centered on Constantinople'], ['Mali Empire', 'West African empire famous for Mansa Musa'], ['Tang dynasty', 'Chinese golden age of culture and trade']]),
  worldEarlyModern: events([['Renaissance', 'rebirth of art and learning in Europe'], ['Protestant Reformation', 'religious movement Martin Luther started in 1517'], ['Columbian Exchange', 'transfer of plants, animals and diseases between hemispheres'], ['Scientific Revolution', 'new ideas based on observation and experiment'],
    ['Enlightenment', 'movement emphasizing reason and individual rights'], ['absolutism', 'rulers holding unlimited power'], ['Ottoman Empire', 'empire that captured Constantinople in 1453'], ['Mughal Empire', 'Muslim empire in South Asia']]),
  worldModern: events([['Industrial Revolution', 'shift to machine production that began in Britain'], ['French Revolution', '1789 overthrow of the French monarchy'], ['imperialism', 'powerful nations taking control of other lands'], ['World War I', '1914–1918 global war'],
    ['Treaty of Versailles', '1919 treaty ending WWI that punished Germany'], ['World War II', '1939–1945 global war'], ['Cold War', 'rivalry between the U.S. and the USSR after WWII'], ['decolonization', 'colonies gaining independence after WWII'], ['United Nations', 'international organization founded in 1945']]),
  government: v([['separation of powers', 'dividing government into legislative, executive and judicial branches'], ['checks and balances', 'each branch can limit the others'], ['federalism', 'power shared between national and state governments'], ['judicial review', 'courts can strike down unconstitutional laws'],
    ['Electoral College', 'system that formally elects the president'], ['filibuster', 'long debate used to delay a Senate vote'], ['veto', "the president's rejection of a bill"], ['impeachment', 'the House formally charging an official'],
    ['First Amendment', 'protects speech, religion, press, assembly and petition'], ['due process', 'fair legal procedures before taking liberty or property'], ['popular sovereignty', "government's power comes from the people"], ['gerrymandering', 'drawing districts to favor one party']]),
  geography: v([['population pyramid', 'chart of a population by age and sex'], ['demographic transition model', 'stages of birth and death rates as countries develop'], ['push factor', 'reason that drives people to leave a place'], ['pull factor', 'reason that draws people to a place'],
    ['urbanization', 'growing share of people living in cities'], ['diffusion', 'spread of ideas or traits from place to place'], ['Green Revolution', 'mid-1900s jump in crop yields from new seeds and fertilizers'], ['gentrification', 'wealthier people moving in and changing a neighborhood'],
    ['sovereignty', "a state's control over its own territory"], ['site', 'the physical features of a place'], ['situation', "a place's location relative to other places"], ['lingua franca', 'language used between speakers of different languages']]),
  psychology: v([['neurotransmitter', 'chemical messenger between neurons'], ['classical conditioning', 'learning by associating two stimuli (Pavlov)'], ['operant conditioning', 'learning from rewards and punishments (Skinner)'], ['positive reinforcement', 'adding something pleasant to increase a behavior'],
    ['negative reinforcement', 'removing something unpleasant to increase a behavior'], ['cognitive dissonance', 'discomfort from holding conflicting beliefs'], ['confirmation bias', 'favoring information that supports what you already believe'], ['placebo effect', 'improvement caused by expectations'],
    ['hippocampus', 'brain area key to forming memories'], ['amygdala', 'brain area linked to fear and emotion'], ['frontal lobe', 'brain area for planning and decisions'], ['nature vs. nurture', 'debate over genes versus environment']]),
  economics: v([['scarcity', 'limited resources versus unlimited wants'], ['opportunity cost', 'value of the next best alternative given up'], ['equilibrium price', 'price where quantity supplied equals quantity demanded'], ['inflation', 'general rise in prices'],
    ['GDP', 'total value of final goods and services produced in a country'], ['recession', 'significant decline in economic activity'], ['fiscal policy', 'government spending and taxes used to steer the economy'], ['monetary policy', 'central bank actions on money supply and interest rates'],
    ['elastic demand', 'quantity demanded changes a lot when price changes'], ['monopoly', 'a single seller in a market'], ['comparative advantage', 'producing at a lower opportunity cost than others'], ['externality', 'a cost or benefit that falls on third parties']]),
  business: v([['stakeholder', 'person or group affected by a business'], ['SWOT analysis', 'strengths, weaknesses, opportunities and threats'], ['marketing mix', 'product, price, place and promotion'], ['break-even point', 'sales level where revenue equals total costs'],
    ['cash flow', 'money moving in and out of a business'], ['market segmentation', 'dividing a market into groups of similar customers'], ['limited liability', 'owners can lose only what they invested'], ['economies of scale', 'lower average costs from producing more']]),
  famousPeople: people([['Martin Luther King Jr.', 'leading the civil rights movement and the "I Have a Dream" speech'], ['Abraham Lincoln', 'leading the Union in the Civil War and issuing the Emancipation Proclamation'], ['Susan B. Anthony', "campaigning for women's suffrage"],
    ['Frederick Douglass', 'escaping slavery and becoming a leading abolitionist writer'], ['Franklin D. Roosevelt', 'the New Deal and leading the U.S. in WWII'], ['Mahatma Gandhi', 'nonviolent resistance for Indian independence'], ['Nelson Mandela', "ending apartheid and becoming South Africa's president"],
    ['Napoleon Bonaparte', 'conquering much of Europe as French emperor'], ['Martin Luther', 'starting the Protestant Reformation'], ['Karl Marx', "writing The Communist Manifesto"]]),
};

// ---------------- World languages ----------------
export const LANG = {
  spanish1: word('Spanish', [['hola', 'hello'], ['adiós', 'goodbye'], ['gracias', 'thank you'], ['por favor', 'please'], ['el libro', 'the book'], ['la escuela', 'the school'], ['el agua', 'the water'],
    ['la casa', 'the house'], ['el perro', 'the dog'], ['el gato', 'the cat'], ['rojo', 'red'], ['grande', 'big'], ['comer', 'to eat'], ['hablar', 'to speak'], ['el lunes', 'Monday']]),
  spanish2: word('Spanish', [['la biblioteca', 'the library'], ['el almuerzo', 'lunch'], ['la cocina', 'the kitchen'], ['viajar', 'to travel'], ['aprender', 'to learn'], ['ayer', 'yesterday'], ['siempre', 'always'],
    ['nunca', 'never'], ['el médico', 'the doctor'], ['la playa', 'the beach'], ['caro', 'expensive'], ['barato', 'cheap'], ['despertarse', 'to wake up'], ['el invierno', 'winter']]),
  french1: word('French', [['bonjour', 'hello'], ['au revoir', 'goodbye'], ['merci', 'thank you'], ["s'il vous plaît", 'please'], ['le livre', 'the book'], ["l'école", 'the school'], ["l'eau", 'the water'],
    ['la maison', 'the house'], ['le chien', 'the dog'], ['le chat', 'the cat'], ['rouge', 'red'], ['grand', 'big'], ['manger', 'to eat'], ['parler', 'to speak'], ['lundi', 'Monday']]),
  french2: word('French', [['la bibliothèque', 'the library'], ['le déjeuner', 'lunch'], ['la cuisine', 'the kitchen'], ['voyager', 'to travel'], ['apprendre', 'to learn'], ['hier', 'yesterday'], ['toujours', 'always'],
    ['jamais', 'never'], ['le médecin', 'the doctor'], ['la plage', 'the beach'], ['cher', 'expensive'], ['bon marché', 'cheap'], ["l'hiver", 'winter'], ['demain', 'tomorrow']]),
};
const CONJ: Record<string, { pron: string[]; verbs: Record<string, string[]> }> = {
  Spanish: { pron: ['yo', 'tú', 'él / ella', 'nosotros', 'ellos / ellas'], verbs: {
    hablar: ['hablo', 'hablas', 'habla', 'hablamos', 'hablan'], comer: ['como', 'comes', 'come', 'comemos', 'comen'], vivir: ['vivo', 'vives', 'vive', 'vivimos', 'viven'],
    estudiar: ['estudio', 'estudias', 'estudia', 'estudiamos', 'estudian'], aprender: ['aprendo', 'aprendes', 'aprende', 'aprendemos', 'aprenden'], escribir: ['escribo', 'escribes', 'escribe', 'escribimos', 'escriben'],
    ser: ['soy', 'eres', 'es', 'somos', 'son'], tener: ['tengo', 'tienes', 'tiene', 'tenemos', 'tienen'], ir: ['voy', 'vas', 'va', 'vamos', 'van'] } },
  French: { pron: ['je', 'tu', 'il / elle', 'nous', 'vous', 'ils / elles'], verbs: {
    parler: ['parle', 'parles', 'parle', 'parlons', 'parlez', 'parlent'], finir: ['finis', 'finis', 'finit', 'finissons', 'finissez', 'finissent'], vendre: ['vends', 'vends', 'vend', 'vendons', 'vendez', 'vendent'],
    être: ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'], avoir: ['ai', 'as', 'a', 'avons', 'avez', 'ont'], aller: ['vais', 'vas', 'va', 'allons', 'allez', 'vont'] } },
};
/** Present-tense conjugation: wrong choices are the same verb's other forms (deduplicated, e.g. French je/tu/il often match). */
export const conj = (lang: 'Spanish' | 'French'): Gen => r => {
  const { pron, verbs } = CONJ[lang]; const [inf, forms] = r.pick(Object.entries(verbs)); const i = r.int(0, pron.length - 1), right = forms[i];
  const wrong = [...new Set(forms.filter(f => f !== right))];
  const other = Object.values(verbs).flat().filter(f => f !== right && !wrong.includes(f));
  return { prompt: `${lang}: choose the correct present-tense form. ${pron[i]} ___ (${inf})`, correct: right, wrong: [...wrong, ...r.shuffle(other)].slice(0, 3), explanation: `${inf} → ${pron[i]} ${right}.` };
};

// ---------------- Arts ----------------
export const ARTS = {
  works: art([['the Mona Lisa', 'Leonardo da Vinci'], ['The Starry Night', 'Vincent van Gogh'], ['Guernica', 'Pablo Picasso'], ['The Persistence of Memory', 'Salvador Dalí'], ['The Birth of Venus', 'Sandro Botticelli'],
    ['the Sistine Chapel ceiling', 'Michelangelo'], ['Girl with a Pearl Earring', 'Johannes Vermeer'], ['The Scream', 'Edvard Munch'], ['Water Lilies', 'Claude Monet'], ['American Gothic', 'Grant Wood'], ['The Night Watch', 'Rembrandt']]),
  movements: v([['Impressionism', 'loose brushwork capturing light and a passing moment'], ['Cubism', 'subjects broken into geometric shapes from several viewpoints'], ['Surrealism', 'dreamlike, irrational imagery'], ['Baroque', 'dramatic, emotional style of the 1600s'],
    ['Renaissance art', 'revival of classical ideals and linear perspective'], ['Pop Art', 'imagery from advertising and popular culture'], ['Abstract Expressionism', 'large, gestural, non-representational painting'], ['Realism', 'everyday life shown without idealizing it']]),
  music: v([['tempo', 'speed of the music'], ['dynamics', 'loudness and softness'], ['forte', 'loud'], ['piano (dynamic)', 'soft'], ['crescendo', 'gradually getting louder'], ['staccato', 'short, detached notes'],
    ['legato', 'smooth, connected notes'], ['time signature', 'beats per measure and which note gets the beat'], ['key signature', 'sharps or flats at the start of the staff'], ['triad', 'three-note chord built in thirds']]),
};
