export default String.raw`
@course ib-ess | IB Environmental Systems & Societies | IB | 🌿 | IB

// Covers the topics of the IB ESS guide (first assessment 2026): foundation, ecology, biodiversity, water, land, atmosphere and climate, natural resources, human populations and urban systems.

@unit Foundation | Perspectives, systems, sustainability
@lesson Environmental perspectives and systems
say: ESS combines science and society. It starts with how people see the environment and how systems work.
key: Environmental value systems (EVS) range from ecocentric (nature-centered, emphasizing limits and ethics) to technocentric (technology and human ingenuity solve problems), with anthropocentric (human-centered management) in between. Your perspective affects how you judge environmental issues.
Systems thinking: a system has inputs, outputs, storages and flows (transfers and transformations). Open systems exchange matter and energy; closed systems exchange only energy; isolated systems exchange neither.
Feedback: negative feedback stabilizes a system; positive feedback amplifies change and can push a system past a tipping point.
lab: Lake storage and flows
aim: A lake receives a steady inflow, and its outflow increases with how much water it stores. Watch the storage over time.
set: t = 5 | Time (years) | 0 to 30 by 1
set: In = 20 | Inflow (million m³/year) | 5 to 50 by 1
out: Seq = In/0.2 | Equilibrium storage (million m³)
out: S = Seq + (50 - Seq)*exp(-0.2*t) | Storage (million m³)
out: Out = 0.2*S | Outflow (million m³/year)
plot: t, S
step: Record the storage every 5 years.
step: Raise the inflow, as in a wet decade, and see where it settles.
noise: 2
result: When outflow rises with storage, the system has negative feedback and settles at a steady-state equilibrium where inputs equal outputs. Change the input and it moves to a new equilibrium.
term: environmental value system = a worldview that shapes how people perceive environmental issues
term: ecocentric = a perspective that places nature at the center and values it for its own sake
term: open system = a system that exchanges both matter and energy with its surroundings
term: tipping point = a threshold beyond which a system changes dramatically and often irreversibly
q: Earth is best described as which type of system? | *Closed (exchanges energy but very little matter) | Open | Isolated | None
why: Energy enters and leaves, but matter mostly cycles.
q: Melting Arctic ice reducing albedo and causing more warming is… | *positive feedback | negative feedback | a closed system | sustainability
why: The change amplifies itself.
gen: bank.EARTH.environment

@lesson Sustainability
say: Sustainability means meeting our needs without compromising future generations. ESS gives tools to measure it.
key: Sustainability has environmental, social and economic dimensions. Natural capital (resources and ecosystem services) generates natural income; living sustainably means using only the income, not depleting the capital.
Ecological footprint measures the area needed to support a population's consumption; carbon and water footprints measure specific impacts. Planetary boundaries define safe operating limits for Earth systems (such as climate, biodiversity loss and nitrogen cycles).
Environmental impact assessments (EIAs) evaluate projects before they're built. The UN Sustainable Development Goals set global targets.
term: natural capital = natural resources and ecosystem services that provide value
term: ecological footprint = the area of land and water needed to sustain a population
term: planetary boundaries = limits on Earth systems within which humanity can safely operate
term: environmental impact assessment = a study of a project's likely environmental effects
q: Living sustainably means using… | *natural income without depleting natural capital | all resources quickly | only nonrenewable resources | no resources
why: Capital must be preserved for the future.
q: An ecological footprint larger than available biocapacity indicates… | *an unsustainable lifestyle | sustainability | a closed system | high albedo
why: Demand exceeds what the land can supply.

@unit Ecology and Biodiversity | Species and populations, energy flow, biodiversity and conservation
@lesson Ecosystems and energy flow
say: Ecology studies how organisms interact with each other and their environment.
key: A species' niche includes its habitat and role. Populations are limited by biotic and abiotic factors; carrying capacity is the maximum sustainable population. Population growth follows J-curves (exponential) or S-curves (logistic).
Energy flows through food chains and webs; only about 10% passes to the next trophic level. Pyramids of numbers, biomass and productivity show this. Gross primary productivity (GPP) minus respiration equals net primary productivity (NPP).
Biogeochemical cycles (carbon, nitrogen) move matter through ecosystems; human activities disrupt them.
term: niche = the role and position of a species in its ecosystem
term: net primary productivity = energy stored by producers after respiration
term: carrying capacity = the maximum population an environment can support
term: trophic efficiency = the percentage of energy transferred between trophic levels
q: Pyramids of productivity always narrow upward because… | *energy is lost at each trophic level | top predators are larger | producers are fewer | of biomagnification only
why: About 90% is lost as heat.
q: NPP equals… | *GPP minus respiration | GPP plus respiration | total biomass | sunlight absorbed
why: It's what's left for consumers.
gen: bank.BIO.ecology

@lesson Biodiversity and conservation
say: Biodiversity is under threat. Conservation science aims to protect it.
key: Biodiversity includes genetic, species and habitat diversity. Biodiversity hotspots have high endemism and high threat. The Simpson's diversity index measures diversity using richness and evenness.
Threats: habitat loss and fragmentation, invasive species, pollution, overexploitation and climate change. The IUCN Red List categorizes extinction risk.
Conservation approaches: species-based (captive breeding, CITES) and habitat-based (protected areas, wildlife corridors). Reserve design considers size, shape, edge effects and connectivity.
tip: When evaluating a conservation strategy, weigh both sides: protecting habitat saves many species at once, while species-based methods can rescue critically endangered animals quickly.
lab: Simpson's diversity in quadrats
aim: Count three plant species in quadrats and calculate Simpson's diversity index.
set: a = 25 | Species A count | 1 to 100 by 1
set: b = 25 | Species B count | 1 to 100 by 1
set: c = 25 | Species C count | 1 to 100 by 1
out: N = a + b + c | Total plants
out: D = 1 - ((a/N)^2 + (b/N)^2 + (c/N)^2) | Simpson's index (1 − D)
plot: a, D
step: Record the index when all species are equal, then make species A dominant.
result: Diversity depends on both richness and evenness. The index is highest when species are equally common and falls as one species dominates, even though the number of species stays the same.
term: biodiversity hotspot = a region with many endemic species that is under significant threat
term: endemic species = a species found only in one geographic area
term: IUCN Red List = a global inventory of species' extinction risk
term: edge effect = changes in conditions at the boundary of a habitat
q: Why are large, circular reserves often preferred? | *They minimize edge effects | They're cheaper | They have more edges | They're easier to fence
why: Less edge relative to area.
q: A species found only in Madagascar is… | *endemic | invasive | keystone | extinct
why: Endemic means found in one place.

@unit Water, Land and Food | Water systems, soil, food production
@lesson Water and aquatic food production
say: Water is essential and unevenly distributed. Managing it sustainably is a global challenge.
key: The hydrological cycle moves water through evaporation, transpiration, condensation, precipitation, infiltration and runoff. Only about 2.5% of Earth's water is fresh, and most is locked in ice.
Water scarcity can be physical (not enough water) or economic (lack of infrastructure). Solutions include conservation, desalination, rainwater harvesting and better irrigation.
Water pollution: eutrophication from nitrates and phosphates causes algal blooms and hypoxia. Indicator species and biochemical oxygen demand (BOD) measure water quality.
Aquatic food production: overfishing depletes stocks; maximum sustainable yield (MSY), quotas, marine protected areas and sustainable aquaculture help.
lab: Fishing effort and sustainable yield
aim: Add more fishing boats to a fishery and record the long-term sustainable catch.
set: E = 30 | Fishing effort (boats) | 0 to 100 by 1
out: Y = 0.01*E*1000*max(1 - 0.01*E, 0) | Sustainable catch (tonnes/year)
out: stock = 1000*max(1 - 0.01*E, 0) | Fish stock (tonnes)
plot: E, Y
step: Record the catch for at least 6 levels of effort.
step: Find the effort that gives maximum sustainable yield.
noise: 3
result: Catch rises with effort only up to a point (MSY at 50 boats here), then falls as the stock is overfished. Beyond MSY more boats catch fewer fish, which is why quotas and limits on effort matter.
term: hydrological cycle = the continuous movement of water through Earth's systems
term: eutrophication = nutrient enrichment causing algal blooms and oxygen depletion
term: biochemical oxygen demand = the amount of oxygen used by microbes decomposing organic matter
term: maximum sustainable yield = the largest catch that can be taken without depleting a population
q: High BOD in a river indicates… | *lots of organic pollution | very clean water | high oxygen | low nutrients
why: Microbes use oxygen breaking down waste.
q: Fishing at maximum sustainable yield aims to… | *harvest without depleting the population long term | catch every fish | stop all fishing | increase pollution
why: It balances harvest with regeneration.

@lesson Soil and terrestrial food production
say: Soil feeds the world. How we farm determines whether soil stays healthy.
key: Soil is a system of mineral particles, organic matter, water, air and organisms. Soil texture (sand, silt, clay) affects drainage and fertility; loam is ideal for farming.
Soil degradation: erosion (from overgrazing, deforestation and overcultivation), salinization (from irrigation), nutrient depletion and desertification. Conservation: terracing, contour plowing, cover crops, crop rotation and no-till farming.
Food systems: commercial vs. subsistence farming, intensive vs. extensive. Efficiency: eating lower on the food chain uses less land and energy. Food waste and unequal distribution affect food security.
term: salinization = the buildup of salts in soil, often from irrigation
term: desertification = the degradation of drylands into desert-like conditions
term: food security = reliable access to sufficient, nutritious food
term: terracing = cutting steps into slopes to reduce soil erosion
q: Eating plants instead of meat feeds more people per hectare because… | *less energy is lost through trophic levels | plants are heavier | meat is illegal | animals produce oxygen
why: Fewer trophic transfers.
q: Which practice reduces soil erosion on hillsides? | *Terracing | Overgrazing | Deforestation | Monoculture on slopes
why: Steps slow runoff.

@unit Atmosphere, Climate and Society | The atmosphere, climate change, human populations and urban systems
@lesson Atmosphere and climate change
say: Human activity is changing the atmosphere, with global consequences.
key: The atmosphere's greenhouse gases (CO₂, CH₄, N₂O, water vapor) trap infrared radiation. Enhanced greenhouse effect from burning fossil fuels and deforestation causes global warming.
Impacts: rising sea levels, extreme weather, glacier retreat, ocean acidification, species range shifts and threats to food and water security. Feedback loops (melting permafrost releasing methane, ice-albedo feedback) can accelerate change.
Responses: mitigation (reducing emissions, renewable energy, carbon capture, reforestation) and adaptation (flood defenses, drought-resistant crops). International agreements: the Kyoto Protocol and the Paris Agreement.
Stratospheric ozone depletion by CFCs was addressed by the Montreal Protocol, a successful example of global cooperation.
term: enhanced greenhouse effect = additional warming caused by human greenhouse gas emissions
term: mitigation = reducing the causes of climate change
term: adaptation = adjusting to the effects of climate change
term: Montreal Protocol = the 1987 treaty that phased out ozone-depleting substances
q: Building flood barriers is an example of… | *adaptation | mitigation | eutrophication | succession
why: It responds to effects rather than causes.
q: Melting permafrost releasing methane is a… | *positive feedback | negative feedback | mitigation strategy | closed system
why: It amplifies warming.
gen: bank.EARTH.weather

@lesson Human populations, resources and cities
say: Population growth and urbanization shape resource use and environmental impact.
key: Human population growth is analyzed with birth and death rates, fertility rates and the demographic transition model. Age–sex pyramids show population structure. Doubling time ≈ 70 ÷ growth rate (%).
Natural resources: renewable, replenishable and non-renewable. Energy choices balance cost, availability, reliability and environmental impact; a sustainable energy mix increases renewables.
Urban systems: cities concentrate people and consumption, creating heat islands, pollution and waste. Sustainable cities use public transport, green spaces, efficient buildings and circular economy approaches (reduce, reuse, recycle).
ex: A country's population grows at 2% per year. Estimate its doubling time.
> 70 ÷ 2
= about 35 years
lab: How many Earths?
aim: Change the average ecological footprint and population to see how many Earths' worth of biocapacity humanity needs.
set: fp = 2.6 | Footprint per person (gha) | 1 to 10 by 0.1
set: P = 8 | Population (billions) | 4 to 11 by 0.5
out: need = fp*P | Total footprint (billion gha)
out: earths = need/12.2 | Earths needed
plot: fp, earths
step: Record the Earths needed for the world average (2.6 gha) and a high-income country (about 7 gha).
step: Find the footprint per person that would fit within one Earth.
result: Earth has about 12.2 billion global hectares of biocapacity. At today's average footprint humanity uses about 1.7 Earths; if everyone lived like high-income countries we'd need over 4.
term: demographic transition model = a model of changing birth and death rates as countries develop
term: doubling time = the time for a population to double
term: circular economy = an economic system aiming to eliminate waste by reusing resources
term: urban heat island = a city area warmer than surrounding rural areas
q: A population pyramid with a wide base indicates… | *rapid growth | an aging population | decline | zero growth
why: Many young people.
q: A circular economy aims to… | *eliminate waste by keeping resources in use | increase landfills | use only fossil fuels | stop recycling
why: Products and materials are reused.
`;
