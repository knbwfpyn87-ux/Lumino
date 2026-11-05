export default String.raw`
@course apes | AP Environmental Science | AP | 🌎 | Science

// Follows the 9 units of the AP Environmental Science Course and Exam Description.

@unit The Living World: Ecosystems | Ecosystem interactions, biomes, energy flow, biogeochemical cycles
@lesson Ecosystems, biomes and energy flow
say: APES starts with how ecosystems work. Energy flows through them, and nutrients cycle.
Species interact through competition, predation, mutualism, commensalism and parasitism. Resource partitioning lets competitors coexist by using resources differently.
key: Only about 10% of energy transfers from one trophic level to the next (the 10% rule). The rest is lost as heat, as required by the second law of thermodynamics.
Primary productivity is the rate producers convert sunlight to chemical energy. Gross primary productivity minus the energy producers use for respiration equals net primary productivity (NPP), the energy available to consumers.
Biomes are defined by temperature and precipitation: tropical rainforests have the highest NPP; deserts and tundra the lowest.
term: net primary productivity = the energy producers store after their own respiration; available to consumers
term: trophic level = a feeding position in a food chain
term: resource partitioning = competing species using different parts of a resource to reduce competition
term: 10% rule = only about 10% of energy passes to the next trophic level
q: If producers have 20,000 kcal, about how much reaches secondary consumers? | *200 kcal | 2,000 kcal | 20 kcal | 10,000 kcal
why: 20,000 → 2,000 → 200.
q: Which biome has the highest net primary productivity? | *Tropical rainforest | Desert | Tundra | Taiga
why: Warm temperatures and abundant rain.
gen: bank.BIO.ecology

@lesson Biogeochemical cycles
say: Matter cycles through ecosystems. Knowing where it's stored and how it moves is key to environmental problems.
key: Carbon cycle: photosynthesis removes CO₂; respiration, decomposition and combustion release it. Fossil fuels and ocean sediments are long-term reservoirs.
- Nitrogen cycle: nitrogen fixation (bacteria, lightning) turns N₂ into ammonia; nitrification makes nitrates; assimilation brings it into organisms; ammonification returns it to soil; denitrification returns N₂ to the air.
- Phosphorus cycle: no atmospheric component; it moves slowly through rocks, soil and water. It's often a limiting nutrient.
- Water (hydrologic) cycle: evaporation, transpiration, condensation, precipitation, infiltration and runoff.
Human impacts: burning fossil fuels adds CO₂; fertilizers add nitrogen and phosphorus, causing eutrophication.
lab: Carbon in a growing forest
aim: Measure carbon stored in a replanted forest plot over the decades.
set: t = 30 | Years since planting | 0 to 150 by 5
set: Cmax = 200 | Mature forest carbon (t/hectare) | 50 to 300 by 10
out: C = Cmax*(1 - exp(-t/40)) | Carbon stored (t/ha)
out: rate = Cmax/40*exp(-t/40) | Uptake rate (t/ha per year)
plot: t, C
step: Record carbon stored every 25 years.
step: Compare a tropical forest (250) with a boreal forest (100).
noise: 4
result: Young forests absorb carbon fastest; uptake slows as the forest matures and approaches a maximum. Forests are carbon sinks, and cutting them releases that stored carbon.
term: nitrogen fixation = converting atmospheric N₂ into ammonia that organisms can use
term: denitrification = bacteria converting nitrates back into N₂ gas
term: reservoir = a place where matter is stored in a cycle, like the ocean for carbon
term: limiting nutrient = the nutrient in shortest supply that limits growth
q: Which cycle has no significant atmospheric component? | *Phosphorus | Carbon | Nitrogen | Water
why: Phosphorus moves through rocks and water.
q: Which process returns nitrogen gas to the atmosphere? | *Denitrification | Nitrification | Fixation | Assimilation
why: Bacteria convert nitrates to N₂.

@unit The Living World: Biodiversity | Biodiversity, ecosystem services, island biogeography, ecological succession
@lesson Biodiversity and ecosystem services
say: Biodiversity makes ecosystems resilient and provides services worth trillions of dollars.
Biodiversity includes genetic, species and ecosystem diversity. Species richness is the number of species; evenness is how equally individuals are distributed among them.
key: Ecosystem services are benefits humans get from nature: provisioning (food, timber), regulating (climate, flood control, pollination), supporting (nutrient cycling, soil formation) and cultural (recreation, spiritual value).
Island biogeography: larger islands and islands closer to the mainland have more species. This applies to habitat "islands" like parks surrounded by development.
Species have ecological tolerance ranges; generalists tolerate many conditions, while specialists need narrow conditions and are more vulnerable.
lab: Species–area relationship
aim: Count species on islands or habitat patches of different sizes.
set: A = 100 | Habitat area (km²) | 1 to 1000 by 1
set: z = 0.25 | Exponent z | 0.15 to 0.35 by 0.01
out: S = 10*A^z | Number of species
plot: A, S
step: Record species counts for at least 5 areas.
step: Cut the area by 90% (for example 1,000 → 100 km²). What fraction of species remains?
noise: 5
result: S = cAᶻ: larger areas hold more species, but with diminishing returns. Losing 90% of a habitat removes roughly 40–50% of its species, which is why habitat loss is the top threat to biodiversity.
term: species richness = the number of different species in an area
term: ecosystem services = benefits humans receive from ecosystems
term: island biogeography = the study of how island size and distance affect species diversity
term: specialist species = a species with a narrow niche and specific needs
q: Bees pollinating crops is which type of ecosystem service? | *Regulating | Provisioning | Cultural | None
why: Pollination regulates crop production.
q: According to island biogeography, which island has the most species? | *Large and near the mainland | Small and far | Small and near | Large and far
why: More habitat and easier colonization.

@lesson Ecological succession
say: After a disturbance, ecosystems rebuild in a predictable sequence called succession.
key: Primary succession starts on bare rock with no soil (after a lava flow or glacier). Pioneer species like lichens and mosses break down rock to start soil.
Secondary succession happens where soil remains after a disturbance (fire, abandoned farmland) and is faster.
Communities progress from fast-growing r-selected species (many offspring, little care) to slower K-selected species (fewer offspring, more care), toward a mature climax community.
Indicator species reveal environmental conditions; for example, the presence of certain macroinvertebrates shows healthy stream water.
term: primary succession = succession starting on bare rock without soil
term: secondary succession = succession after a disturbance that leaves soil intact
term: pioneer species = the first organisms to colonize a barren area
term: indicator species = a species whose presence reveals environmental conditions
q: A forest regrowing after a wildfire is… | *secondary succession | primary succession | climax only | biomagnification
why: The soil survived.
q: Lichens on new volcanic rock are… | *pioneer species | climax species | invasive species | K-selected species
why: They're the first colonizers.

@unit Populations | r and K strategists, survivorship, carrying capacity, human population dynamics
@lesson Population ecology
say: Populations grow, crash and stabilize. Their strategies and limits shape ecosystems.
key: r-selected species reproduce quickly with many offspring and little parental care (insects, weeds). K-selected species have few offspring with more care and long lives (elephants, whales).
Survivorship curves: Type I (most survive to old age, humans), Type II (constant death rate, birds), Type III (most die young, fish and plants).
Populations grow exponentially with unlimited resources, then logistically level off at the carrying capacity (K). Overshoot beyond K leads to a die-off.
Density-dependent factors (competition, disease, predation) intensify with crowding; density-independent factors (storms, droughts) don't.
term: r-selected species = species with many offspring, fast growth and little parental care
term: K-selected species = species with few offspring, slow growth and extensive parental care
term: survivorship curve = a graph showing survival of individuals across ages
term: overshoot = when a population exceeds carrying capacity
q: Which has a Type III survivorship curve? | *Sea turtles | Humans | Elephants | Birds
why: Most hatchlings die young.
q: A drought killing plants regardless of population size is… | *density-independent | density-dependent | a K-strategy | carrying capacity
why: It affects populations of any density.

@lesson Human population dynamics
say: The human population has grown to over 8 billion. Demographics help us understand where it's headed.
key: Rule of 70: doubling time ≈ 70 ÷ growth rate (in percent). A population growing at 2% doubles in about 35 years.
Total fertility rate (TFR) is the average number of children per woman; replacement level is about 2.1. Age-structure diagrams (population pyramids) predict growth: a wide base means rapid growth.
The demographic transition model: preindustrial (high birth and death rates), transitional (death rates fall, rapid growth), industrial (birth rates fall), postindustrial (low birth and death rates).
Factors lowering birth rates include education and empowerment of women, access to family planning, and economic development.
ex: A country grows at 3.5% per year. Find its doubling time.
> 70 ÷ 3.5
= 20 years
lab: Birth rates and growth
aim: Change crude birth and death rates to see the growth rate and doubling time of a country.
set: CBR = 20 | Crude birth rate (per 1,000) | 8 to 45 by 1
set: CDR = 8 | Crude death rate (per 1,000) | 5 to 20 by 1
out: r = (CBR - CDR)/10 | Growth rate (%)
out: Td = if(r > 0, 70/max(r, 0.01), 0) | Doubling time (years)
plot: CBR, r
step: Record the growth rate for a stage-2 country (CBR 40, CDR 15) and a stage-4 country (CBR 11, CDR 9).
step: Find the birth rate that gives zero growth.
result: Growth rate = (CBR − CDR)/10. Countries in stage 2 of the demographic transition grow fast (doubling in under 30 years); in stage 4 growth is near zero and can turn negative.
term: rule of 70 = doubling time equals 70 divided by the percent growth rate
term: total fertility rate = the average number of children born per woman
term: replacement-level fertility = about 2.1 children per woman, keeping population stable
term: demographic transition = the shift from high to low birth and death rates as a country develops
q: A population pyramid with a very wide base indicates… | *rapid growth | decline | stability | an aging population
why: Many young people will soon have children.
q: Which most effectively lowers birth rates? | *Education and opportunities for women | Higher infant mortality | Lower incomes | Less healthcare
why: Educated women tend to have fewer children.

@unit Earth Systems and Resources | Plate tectonics, soil, the atmosphere, global wind patterns, watersheds
@lesson Plate tectonics, soil and watersheds
say: Earth's geology and soils shape where resources and hazards are found.
Plate boundaries create hazards: convergent boundaries form volcanoes and mountains; divergent boundaries form ridges; transform boundaries cause earthquakes. The Pacific "Ring of Fire" has many volcanoes and earthquakes.
key: Soil has horizons: O (organic), A (topsoil), B (subsoil) and C (weathered parent material). Soil texture (sand, silt, clay) affects water holding: sand drains quickly, clay holds water but drains poorly, loam is best for farming.
A watershed is all the land that drains into a body of water. Human activities anywhere in a watershed (farming, paving, deforestation) affect water quality downstream.
term: soil horizon = a distinct layer of soil
term: topsoil = the A horizon, rich in organic matter and nutrients
term: loam = soil with a balanced mix of sand, silt and clay
term: watershed = all the land area that drains into a particular body of water
q: Which soil type drains fastest? | *Sand | Clay | Silt | Loam
why: Large particles leave big pore spaces.
q: Which soil horizon is richest in organic matter and nutrients for crops? | *A horizon (topsoil) | C horizon | B horizon | Bedrock
why: Topsoil holds humus.
gen: bank.EARTH.geology

@lesson Atmosphere, wind patterns and climate
say: The atmosphere and global circulation patterns distribute heat and shape climates worldwide.
The atmosphere's layers: troposphere (weather, most air mass), stratosphere (ozone layer absorbs UV), mesosphere, thermosphere.
key: Uneven solar heating (more direct at the equator) drives global air circulation in convection cells (Hadley cells). Rising air at the equator brings rain (rainforests); sinking air near 30° latitude brings dry conditions (deserts).
The Coriolis effect deflects winds, creating trade winds and westerlies. Rain shadows form when mountains force air up (rain on the windward side) and dry air sinks on the leeward side.
El Niño (ENSO) weakens trade winds, warming the eastern Pacific and shifting weather patterns worldwide.
lab: Albedo and Earth's temperature
aim: Change how much sunlight Earth reflects and calculate its average surface temperature.
set: alb = 0.3 | Albedo | 0.1 to 0.7 by 0.01
set: GH = 33 | Greenhouse warming (°C) | 0 to 45 by 1
out: Te = (1361*(1 - alb)/(4*5.67e-8))^0.25 - 273 | Temperature without greenhouse effect (°C)
out: Ts = Te + GH | Surface temperature (°C)
plot: alb, Ts
step: Record the surface temperature at today's albedo (0.30) and at 4 other values.
step: Set the greenhouse warming to 0. What would Earth be like?
noise: 1
result: Higher albedo (ice, clouds) reflects more sunlight and cools the planet. Without the natural greenhouse effect Earth would average about −18 °C; with it, about 15 °C. Melting ice lowers albedo, a positive feedback.
term: Hadley cell = a large convection cell of rising air at the equator and sinking air near 30° latitude
term: Coriolis effect = the deflection of moving air and water caused by Earth's rotation
term: rain shadow = a dry area on the leeward side of a mountain range
term: El Niño = a periodic warming of the eastern Pacific that disrupts global weather
q: Why are many deserts found near 30° latitude? | *Dry air sinks there | Air rises there | They're near the equator | Ocean currents are warm
why: Descending air in Hadley cells is dry.
q: The dry side of a mountain range is called the… | *rain shadow | windward side | watershed | front
why: Air loses moisture rising over the mountains.

@unit Land and Water Use | Agriculture, irrigation, pest control, forestry, urbanization, sustainable practices
@lesson Agriculture and its impacts
say: Feeding 8 billion people takes enormous amounts of land and water. Farming methods matter for the environment.
The Green Revolution used high-yield crops, fertilizers, pesticides and irrigation to greatly increase food production, but with environmental costs.
key: Industrial agriculture problems: soil erosion, loss of soil fertility, water depletion, eutrophication from fertilizer runoff, pesticide resistance and loss of biodiversity from monocultures.
Irrigation methods: flood and furrow irrigation waste a lot of water; drip irrigation is the most efficient. Overirrigation can cause waterlogging and soil salinization.
Sustainable practices: crop rotation, contour plowing, terracing, no-till farming, windbreaks, cover crops and integrated pest management (IPM, combining biological, physical and limited chemical controls).
lab: Fertilizer trial plots
aim: Apply nitrogen fertilizer to corn plots and measure the yield and the nitrate washing off into streams.
set: N = 120 | Nitrogen applied (kg/ha) | 0 to 300 by 10
out: Y = 12*(1 - exp(-(N + 30)/70)) | Yield (t/ha)
out: run = 0.05*N + 0.3*max(N - 150, 0) | Nitrate runoff (kg/ha)
plot: N, Y
step: Record the yield and runoff for at least 6 nitrogen levels.
step: Find the point where extra fertilizer barely raises the yield.
noise: 4
result: Yield shows diminishing returns, but runoff rises sharply once crops can't use the extra nitrogen. That excess causes eutrophication and dead zones downstream, so precise application saves money and water quality.
term: monoculture = growing a single crop over a large area
term: soil salinization = salt buildup in soil, often from irrigation
term: integrated pest management = controlling pests using a combination of methods to minimize pesticides
term: drip irrigation = delivering water directly to plant roots through tubes
q: Which irrigation method is most water-efficient? | *Drip | Flood | Furrow | Spray at midday
why: Water goes directly to roots with little evaporation.
q: Planting different crops in sequence on the same land is… | *crop rotation | monoculture | clear-cutting | salinization
why: It restores nutrients and breaks pest cycles.

@lesson Forestry, mining and urbanization
say: How we use land for timber, minerals and cities shapes habitats, water and climate.
key: Clear-cutting removes all trees, causing erosion, habitat loss and loss of carbon storage. Selective cutting and sustainable forestry remove fewer trees and protect ecosystems.
Mining extracts minerals and fuels. Surface mining (strip mining, mountaintop removal) destroys habitats and can cause acid mine drainage; land reclamation tries to restore mined areas.
Urbanization increases impervious surfaces (roads, roofs), leading to more runoff, flooding and the urban heat island effect. Urban sprawl increases car dependence. Smart growth uses mixed-use, walkable, transit-friendly design.
Ecological footprint measures the land and water needed to support a person's lifestyle.
term: clear-cutting = removing all trees from an area at once
term: impervious surface = a surface that water can't soak through, like pavement
term: urban heat island = a city area warmer than its surroundings due to pavement and buildings
term: ecological footprint = the area of land and water needed to support a person's resource use
q: Paving over land in cities mainly increases… | *runoff and flooding | groundwater recharge | biodiversity | soil fertility
why: Water can't infiltrate impervious surfaces.
q: Why are cities warmer than nearby rural areas? | *The urban heat island effect | More trees | Higher elevation | Ocean currents
why: Pavement and buildings absorb and release heat.

@unit Energy Resources and Consumption | Fossil fuels, nuclear power, renewable energy, conservation
@lesson Nonrenewable energy
say: Most of the world's energy still comes from nonrenewable sources. Each has trade-offs.
key: Fossil fuels (coal, oil, natural gas) supply most global energy. Burning them releases CO₂ and pollutants. Coal is the most polluting; natural gas burns cleaner but methane leaks are a potent greenhouse gas.
Electricity from fossil fuels: burning fuel heats water into steam, which spins a turbine connected to a generator. Overall efficiency is often only about 33%.
Fracking (hydraulic fracturing) extracts natural gas from shale but can contaminate groundwater and trigger small earthquakes.
Nuclear power uses fission of uranium-235. It produces no CO₂ during operation but creates radioactive waste with long half-lives and carries a small risk of accidents (Chernobyl, Fukushima).
term: fossil fuel = coal, oil or natural gas formed from ancient organic matter
term: fracking = injecting fluid at high pressure to release natural gas from rock
term: nuclear fission = splitting atoms to release energy
term: radioactive waste = dangerous material left over from nuclear reactions
q: Which fossil fuel produces the most CO₂ per unit of energy? | *Coal | Natural gas | Oil | They're equal
why: Coal is mostly carbon.
q: A major drawback of nuclear power is… | *long-lived radioactive waste | high CO₂ emissions | it runs on coal | it can't make electricity
why: Waste stays dangerous for thousands of years.

@lesson Renewable energy and conservation
say: Renewable energy and conservation are key to a sustainable future. Each source has strengths and limits.
- Solar: photovoltaic cells convert sunlight to electricity; no emissions but intermittent.
- Wind: turbines are cheap and clean but intermittent and can affect birds and bats.
- Hydroelectric: dams provide steady power but flood habitats and block fish migration.
- Geothermal: uses Earth's internal heat; reliable but location-limited.
- Biomass: burning wood or making biofuels; renewable but can release CO₂ and require large areas of land.
- Hydrogen fuel cells: produce only water but need energy to make hydrogen.
key: Energy conservation and efficiency (insulation, LED lights, efficient vehicles, smart grids) are often the cheapest way to reduce environmental impact.
lab: Wind turbine power curve
aim: Measure a wind turbine's power output at different wind speeds.
set: v = 8 | Wind speed (m/s) | 0 to 25 by 0.5
set: L = 50 | Blade length (m) | 20 to 80 by 5
out: P = min(0.5*1.2*pi*L^2*v^3*0.4/1e6, 0.0012*L^2) | Power (MW)
plot: v, P
step: Record the power at 5 wind speeds.
step: Double the wind speed from 5 to 10 m/s. By what factor does power change?
noise: 3
result: Power rises with the cube of wind speed (P = ½ρAv³Cₚ), so doubling the wind gives eight times the power, until the turbine reaches its rated maximum. Longer blades sweep more area and capture more energy.
term: photovoltaic cell = a device that converts sunlight directly into electricity
term: intermittent energy = energy that isn't always available, like solar and wind
term: geothermal energy = energy from heat inside Earth
term: energy efficiency = using less energy to perform the same task
q: What's a major environmental drawback of hydroelectric dams? | *Disrupting fish migration and flooding habitats | High CO₂ emissions | Radioactive waste | They're intermittent
why: Dams alter river ecosystems.
q: Which is the cheapest way to reduce energy-related impacts? | *Conservation and efficiency | Building new coal plants | Burning more biomass | Using more oil
why: Using less energy costs less than producing more.

@unit Atmospheric Pollution | Air pollutants, smog, acid rain, indoor air pollution, noise
@lesson Air pollutants and smog
say: Air pollution harms human health and ecosystems. Knowing the major pollutants helps us fight it.
key: Primary pollutants are emitted directly (CO, NOₓ, SO₂, particulates). Secondary pollutants form in the atmosphere (ozone and smog).
Photochemical smog forms when NOₓ and volatile organic compounds react with sunlight to make ground-level ozone, a respiratory irritant. It peaks on sunny afternoons in cities with heavy traffic.
Thermal inversions trap cool, polluted air under a layer of warm air, worsening smog.
The Clean Air Act regulates major pollutants. Catalytic converters reduce car emissions; scrubbers reduce power plant emissions.
term: primary pollutant = a pollutant released directly from a source
term: secondary pollutant = a pollutant formed by reactions in the atmosphere
term: photochemical smog = smog formed when sunlight reacts with NOₓ and VOCs, creating ozone
term: thermal inversion = a warm air layer trapping cooler polluted air near the ground
q: Ground-level ozone is a… | *secondary pollutant | primary pollutant | greenhouse gas only | beneficial gas
why: It forms from reactions in sunlight.
q: Smog is worst during a thermal inversion because… | *polluted air is trapped near the ground | it's cold | wind is strong | it rains
why: The warm layer acts like a lid.

@lesson Acid rain and indoor pollution
say: Some air pollution falls back to Earth as acid rain, and some of the worst pollution is indoors.
key: Acid deposition forms when SO₂ and NOₓ react with water to make sulfuric and nitric acids. It lowers the pH of lakes and soils, harms aquatic life, leaches nutrients and damages buildings.
Limestone (calcium carbonate) can neutralize acid; areas with granite bedrock are more vulnerable.
Indoor air pollutants include radon (a radioactive gas from rocks, a leading cause of lung cancer), carbon monoxide from faulty heaters, asbestos, mold, and smoke from burning wood or dung for cooking (a major problem in developing countries).
Noise pollution disrupts animal communication and causes stress in people.
lab: Rain samples near a power plant
aim: Collect rain at sites with different sulfur dioxide levels and measure its pH.
set: S = 20 | SO₂ in the air (ppb) | 0 to 100 by 1
out: pH = -log(2.5e-6 + 2e-7*S) | Rain pH
plot: S, pH
step: Record the rain pH at clean (0 ppb) and polluted sites.
step: Find the SO₂ level where rain becomes "acid rain" (pH < 5).
noise: 1
result: Clean rain is naturally slightly acidic (about 5.6) from dissolved CO₂. SO₂ and NOₓ from burning fossil fuels form sulfuric and nitric acids, lowering pH; scrubbers and the Clean Air Act have reduced acid rain.
term: acid deposition = acidic rain, snow or particles caused by sulfur and nitrogen oxides
term: radon = a radioactive gas that seeps from rocks into buildings
term: carbon monoxide = a colorless, odorless poisonous gas from incomplete combustion
q: Which pollutants cause acid rain? | *SO₂ and NOₓ | CO₂ and CH₄ | Ozone and radon | Lead and mercury
why: They form sulfuric and nitric acids.
q: Radon causes… | *lung cancer | acid rain | smog | ozone depletion
why: It's a radioactive gas that's inhaled.

@unit Aquatic and Terrestrial Pollution | Water pollution, eutrophication, solid waste, toxins and human health
@lesson Water pollution
say: Clean water is essential for life, but many human activities pollute it.
key: Point sources come from one location (factory pipes, sewage plants); nonpoint sources come from many places (farm runoff, urban stormwater) and are harder to regulate.
Eutrophication: excess nitrogen and phosphorus cause algal blooms. When algae die, decomposers use up oxygen, creating hypoxic dead zones (like in the Gulf of Mexico).
Other pollutants: oil spills, plastics (microplastics), heavy metals like mercury, and thermal pollution (warm water from power plants holds less oxygen).
Sewage treatment: primary (physical removal of solids), secondary (bacteria break down organic matter), and sometimes tertiary (remove nutrients and chemicals).
lab: Oxygen sag downstream of a sewage outfall
aim: Measure dissolved oxygen at points downstream from where organic waste enters a river.
set: x = 20 | Distance downstream (km) | 0 to 150 by 5
set: L0 = 20 | BOD of the waste (mg/L) | 5 to 40 by 1
out: t = x/10 | Travel time (days)
out: DO = max(9 - 0.3*L0/0.3*(exp(-0.3*t) - exp(-0.6*t)), 0) | Dissolved oxygen (mg/L)
plot: x, DO
step: Record dissolved oxygen every 20 km.
step: Find the lowest point and see where fish (which need about 5 mg/L) could survive.
noise: 3
result: Bacteria decomposing the waste use oxygen, so DO dips downstream (the oxygen sag curve), then recovers as the river re-aerates. Treating sewage to lower BOD keeps oxygen above levels fish need.
term: point source = pollution from a single identifiable source
term: eutrophication = nutrient enrichment causing algae blooms and oxygen loss
term: dead zone = an area of water with too little oxygen to support most life
term: thermal pollution = warming of water by human activity, reducing oxygen levels
q: A dead zone forms mainly because of… | *excess nutrients causing algae blooms and oxygen loss | too much oxygen | cold water | salt
why: Decomposing algae use up oxygen.
q: Runoff from many lawns into a stream is… | *nonpoint source pollution | point source pollution | thermal pollution | primary treatment
why: It comes from many diffuse sources.

@lesson Solid waste, toxins and human health
say: Waste and toxic chemicals can harm both ecosystems and people. Reducing them protects everyone.
key: Bioaccumulation is the buildup of a toxin in an organism over its life; biomagnification is the increase in concentration at higher trophic levels. Persistent toxins like mercury, DDT and PCBs biomagnify.
Solid waste goes to sanitary landfills (lined, with leachate collection and methane capture), incinerators (reduce volume but can release pollutants), or is recycled and composted. The waste hierarchy: reduce, reuse, recycle.
Dose-response: LD50 is the dose that kills 50% of a test population. Toxicity depends on dose, and some chemicals are endocrine disruptors.
Infectious diseases (malaria, cholera, tuberculosis) are linked to environmental conditions like poor sanitation and climate.
lab: Dose–response and LD50
aim: Expose groups of test organisms to increasing doses of a toxin and record the percent that die.
set: d = 100 | Dose (mg/kg) | 1 to 1000 by 1
set: LD = 200 | LD50 (mg/kg) | 50 to 500 by 10
out: M = 100/(1 + (LD/d)^3) | Mortality (%)
plot: d, M
step: Record mortality for at least 6 doses.
step: Find the dose that kills half the group.
noise: 4
result: Dose–response curves are S-shaped. The LD50 is the dose that kills 50% of the test population; a lower LD50 means a more toxic substance. "The dose makes the poison."
term: bioaccumulation = the buildup of a toxin in an organism's body over time
term: biomagnification = increasing concentration of a toxin at higher trophic levels
term: LD50 = the dose of a substance that kills 50% of a test population
term: leachate = liquid that drains through a landfill, carrying contaminants
q: Why are top predators like tuna high in mercury? | *Biomagnification | They swim fast | Mercury is in seawater only | They eat plants
why: Mercury concentrates up the food chain.
q: Which is the most preferred option in the waste hierarchy? | *Reduce | Recycle | Incinerate | Landfill
why: Not creating waste avoids all disposal impacts.

@unit Global Change | Ozone depletion, the greenhouse effect, climate change, ocean acidification, invasive species, endangered species
@lesson Ozone depletion and climate change
say: Two global atmospheric problems: a thinning ozone layer and a warming climate. One is being solved; the other is ongoing.
key: Stratospheric ozone absorbs harmful UV radiation. CFCs (from old refrigerants and aerosols) release chlorine that destroys ozone. The Montreal Protocol (1987) phased out CFCs, and the ozone layer is slowly recovering.
The greenhouse effect is natural, but human emissions of CO₂ (fossil fuels, deforestation), methane (agriculture, landfills) and nitrous oxide (fertilizers) enhance it, raising global temperatures.
Effects of climate change: rising sea levels (thermal expansion and melting ice), more extreme weather, shifting species ranges, melting permafrost (releasing more methane), and ocean acidification as oceans absorb CO₂, harming coral and shellfish.
lab: Ocean acidification
aim: Bubble air with different CO₂ levels through seawater and measure its pH and how easily shells can form.
set: C = 420 | Atmospheric CO₂ (ppm) | 280 to 1000 by 10
out: pH = 8.2 - 0.33*log2(C/280) | Seawater pH
out: Om = 4.6*10^(2*(pH - 8.2)) | Aragonite saturation
plot: C, pH
step: Record the pH at 280 (pre-industrial), 420 (today) and 2 future levels.
step: Shells dissolve when the saturation drops below 1. Is that reached?
noise: 0.3
result: Oceans absorb CO₂, forming carbonic acid and lowering pH, already about 0.1–0.2 units since 1850 (30% more acidic). Fewer carbonate ions make it harder for corals and shellfish to build shells.
term: ozone layer = a stratospheric layer that absorbs harmful UV radiation
term: Montreal Protocol = the 1987 treaty that phased out ozone-depleting CFCs
term: greenhouse effect = the trapping of heat by gases in the atmosphere
term: ocean acidification = the lowering of ocean pH from absorbing CO₂
q: Which chemicals destroyed stratospheric ozone? | *CFCs | CO₂ | Methane | Water vapor
why: CFCs release ozone-destroying chlorine.
q: Ocean acidification most directly harms… | *corals and shellfish | whales only | sharks | seaweed only
why: Acidic water dissolves calcium carbonate shells.

@lesson Invasive and endangered species
say: Global trade spreads invasive species, while habitat loss and other pressures push many species toward extinction.
key: Invasive species are non-native species that spread rapidly, often because they lack natural predators. Examples include zebra mussels, kudzu, cane toads and Asian carp. They outcompete native species and disrupt ecosystems.
The biggest threats to biodiversity (HIPPCO): Habitat destruction, Invasive species, Pollution, Population growth, Climate change and Overexploitation.
Protection strategies:
- Laws: the Endangered Species Act (US) and CITES (international wildlife trade).
- Protected areas and wildlife corridors connecting fragmented habitats.
- Captive breeding and habitat restoration.
term: invasive species = a non-native species that spreads and causes harm
term: Endangered Species Act = a US law protecting threatened and endangered species and their habitats
term: CITES = an international treaty regulating trade in endangered species
term: habitat fragmentation = breaking habitat into smaller isolated patches
q: Why do invasive species often spread quickly? | *They lack natural predators in the new area | They're always larger | They can't reproduce | Humans protect them
why: Nothing controls their population.
q: Wildlife corridors help endangered species by… | *connecting fragmented habitats | increasing pollution | introducing invasives | building dams
why: Animals can move between habitat patches.
`;
