export default String.raw`
@course earth | Earth Science | Standard | 🌋 | Science

@unit Earth's Structure and Rocks | Earth's layers, minerals and the rock cycle
@lesson Earth's layers
say: Earth is like a giant layered ball. Each layer has different properties that shape our planet's surface.
- Crust: the thin, rocky outer layer. Continental crust is thicker and less dense; oceanic crust is thinner and denser.
- Mantle: hot, slowly flowing rock. The upper part (asthenosphere) is soft enough to flow.
- Outer core: liquid iron and nickel. Its movement creates Earth's magnetic field.
- Inner core: solid iron and nickel, kept solid by enormous pressure despite extreme heat.
key: The lithosphere (crust plus the rigid upper mantle) is broken into tectonic plates that float on the softer asthenosphere.
Scientists learned about Earth's interior by studying seismic waves from earthquakes: S waves can't travel through liquid, which revealed the liquid outer core.
term: crust = Earth's thin, rocky outer layer
term: mantle = the thick layer of hot rock between the crust and core
term: lithosphere = the rigid outer layer made of the crust and upper mantle
term: asthenosphere = the soft, flowing part of the upper mantle
q: Which layer creates Earth's magnetic field? | *Outer core | Inner core | Mantle | Crust
why: Moving liquid metal generates the field.
q: How do scientists know the outer core is liquid? | *S waves can't pass through it | They drilled to it | It glows | Volcanoes erupt from it
why: S waves only travel through solids.
gen: bank.EARTH.geology

@lesson Minerals and the rock cycle
say: Rocks are constantly being made, destroyed and remade. That never-ending process is the rock cycle.
Minerals are naturally occurring, inorganic solids with a definite chemical makeup and crystal structure. They're identified by properties like hardness (Mohs scale), luster, streak and cleavage.
key: Three rock types form in different ways:
- Igneous rocks form when magma or lava cools (granite, basalt).
- Sedimentary rocks form when sediments are compacted and cemented (sandstone, limestone). They often contain fossils.
- Metamorphic rocks form when heat and pressure change existing rock (marble from limestone, slate from shale).
In the rock cycle, any rock type can become any other through weathering, erosion, melting, heat and pressure.
lab: Cooling magma and crystal size
aim: Cool molten rock at different rates and measure the size of the crystals that form.
set: r = 1 | Cooling rate (°C per year) | 0.1 to 100 by 0.1
out: s = 5/sqrt(r) | Crystal size (mm)
plot: r, s
step: Record crystal size for slow cooling (deep underground) and fast cooling (at the surface).
noise: 5
result: Slow cooling gives crystals time to grow, so intrusive rocks like granite have large crystals. Fast-cooled extrusive rocks like basalt have tiny crystals, and instantly quenched lava forms glassy obsidian.
term: mineral = a natural inorganic solid with a definite composition and crystal structure
term: igneous rock = rock formed from cooled magma or lava
term: sedimentary rock = rock formed from compacted and cemented sediments
term: metamorphic rock = rock changed by heat and pressure
q: Where are fossils most likely found? | *Sedimentary rock | Igneous rock | Metamorphic rock | The mantle
why: Sediments bury organisms gently.
q: Marble forms when limestone is changed by heat and pressure. Marble is… | *metamorphic | igneous | sedimentary | a mineral only
why: Heat and pressure transform existing rock.

@unit Plate Tectonics | Plate boundaries, earthquakes and volcanoes
@lesson Plate boundaries
say: Earth's surface is broken into plates that move a few centimeters each year. Where they meet, dramatic things happen.
key: Plate tectonics: Earth's lithosphere is divided into plates that move on the asthenosphere, driven by mantle convection.
- Divergent boundaries: plates pull apart, forming mid-ocean ridges and rift valleys (seafloor spreading).
- Convergent boundaries: plates collide. Ocean-continent collisions form subduction zones and volcanic mountains; continent-continent collisions form huge ranges like the Himalayas.
- Transform boundaries: plates slide past each other, causing earthquakes (the San Andreas Fault).
Evidence for plate tectonics includes matching fossils and rocks on different continents, the puzzle-like fit of continents, and magnetic stripes on the seafloor.
term: plate tectonics = the theory that Earth's lithosphere is divided into moving plates
term: divergent boundary = where plates move apart
term: subduction = one plate sinking beneath another
term: transform boundary = where plates slide past each other
q: The Himalayas formed at a… | *convergent boundary | divergent boundary | transform boundary | hot spot
why: The Indian and Eurasian plates collided.
q: The Mid-Atlantic Ridge is a… | *divergent boundary | convergent boundary | transform boundary | subduction zone
why: Plates are spreading apart there.

@lesson Earthquakes and volcanoes
say: Most earthquakes and volcanoes happen along plate boundaries. Understanding them helps save lives.
An earthquake happens when stress builds along a fault and rock suddenly slips. The focus is where it starts underground; the epicenter is the point on the surface directly above.
key: Seismic waves: P waves are fastest and travel through solids and liquids; S waves are slower and only travel through solids; surface waves cause the most damage. Magnitude measures energy released.
Volcanoes form where magma reaches the surface, at subduction zones, divergent boundaries and hot spots (like Hawaii). Magma with lots of silica is thick and explosive; low-silica magma (basalt) flows gently.
The "Ring of Fire" around the Pacific Ocean has many earthquakes and volcanoes because of subduction zones.
lab: Locating an earthquake
aim: Use the delay between P-wave and S-wave arrivals on a seismogram to find the distance to the epicenter.
set: lag = 20 | S minus P delay (s) | 1 to 120 by 1
out: d = lag*6*3.5/(6 - 3.5) | Distance to epicenter (km)
plot: lag, d
step: Record the distance for at least 4 delays.
step: Three stations' distances are needed to pinpoint the epicenter (triangulation).
noise: 2
result: P waves (about 6 km/s) outrun S waves (about 3.5 km/s), so the delay grows steadily with distance: about 8.4 km for every second of lag. Circles from three stations meet at the epicenter.
term: fault = a break in Earth's crust where rocks move
term: epicenter = the point on the surface above where an earthquake starts
term: seismic waves = energy waves released by an earthquake
term: hot spot = an area where magma rises from deep in the mantle, away from plate boundaries
q: Which seismic waves arrive first? | *P waves | S waves | Surface waves | Tsunamis
why: P waves are the fastest.
q: Hawaii's volcanoes formed over a… | *hot spot | subduction zone | transform fault | rift valley
why: The Pacific plate moves over a stationary plume of magma.

@unit Weather and Climate | The atmosphere, weather systems, climate and climate change
@lesson The atmosphere and weather
say: The atmosphere is a thin blanket of gases that protects life and creates our weather.
The atmosphere is mostly nitrogen (78%) and oxygen (21%). Its layers: troposphere (where weather happens), stratosphere (contains the ozone layer), mesosphere, thermosphere.
key: Uneven heating of Earth by the Sun drives weather. Warm air rises and cool air sinks, creating air pressure differences and wind (air moves from high to low pressure).
- Fronts: boundaries between air masses. Cold fronts bring short, intense storms; warm fronts bring longer, gentler rain.
- Water cycle: evaporation, condensation (clouds) and precipitation.
- The Coriolis effect, caused by Earth's rotation, curves winds and ocean currents.
lab: Weather balloon
aim: Launch a weather balloon and record the air pressure and temperature as it rises.
set: h = 2 | Altitude (km) | 0 to 11 by 0.5
out: P = 1013*exp(-h/8.4) | Air pressure (hPa)
out: T = 15 - 6.5*h | Temperature (°C)
plot: h, P
step: Record pressure and temperature every 2 km up to 11 km.
noise: 1
result: Pressure falls exponentially with height (halving about every 5.5 km) because there's less air above. In the troposphere temperature drops about 6.5 °C per km, since air is heated from the ground.
term: troposphere = the lowest layer of the atmosphere, where weather occurs
term: air pressure = the weight of air pressing down on an area
term: front = a boundary between two different air masses
term: Coriolis effect = the curving of winds and currents caused by Earth's rotation
q: Where does almost all weather happen? | *Troposphere | Stratosphere | Mesosphere | Thermosphere
why: It holds most of the air and water vapor.
q: Wind blows from… | *high pressure to low pressure | low pressure to high pressure | north to south only | the ocean only
why: Air moves to balance pressure.
gen: bank.EARTH.weather

@lesson Climate and climate change
say: Weather is what's happening today. Climate is the long-term pattern. And Earth's climate is changing.
Climate is the average weather in a region over many years. It depends on latitude, elevation, nearness to oceans, ocean currents and prevailing winds.
key: The greenhouse effect: gases like CO₂ and methane trap heat in the atmosphere, keeping Earth warm enough for life. Burning fossil fuels has increased CO₂, strengthening the greenhouse effect and warming the planet.
Evidence of climate change: rising global temperatures, melting glaciers and ice sheets, rising sea levels and more extreme weather. Solutions include renewable energy, efficiency and protecting forests.
term: climate = the average weather of a region over a long period
term: greenhouse effect = the trapping of heat by gases in the atmosphere
term: greenhouse gas = a gas like CO₂ or methane that traps heat
term: fossil fuels = coal, oil and natural gas formed from ancient organisms
q: What is the main human cause of recent climate change? | *Burning fossil fuels | Volcanoes | Earth's orbit | The ozone hole
why: It adds large amounts of CO₂.
q: The difference between weather and climate is… | *time scale | location only | temperature only | there is none
why: Climate is long-term; weather is short-term.

@unit Earth in Space | The Sun, Moon and seasons, the solar system and universe
@lesson Seasons, the Moon and tides
say: Earth's tilt, the Moon's orbit and the Sun's light create seasons, moon phases, eclipses and tides.
key: Seasons are caused by Earth's 23.5° tilt, not by distance from the Sun. When your hemisphere tilts toward the Sun, sunlight is more direct and days are longer, so it's summer.
- Moon phases happen because we see different amounts of the Moon's sunlit half as it orbits Earth (about every 29.5 days).
- A solar eclipse occurs when the Moon blocks the Sun; a lunar eclipse when Earth's shadow falls on the Moon.
- Tides are caused mainly by the Moon's gravity pulling on Earth's oceans. Most places get two high and two low tides each day.
oops: Earth is actually closest to the Sun in January, during Northern Hemisphere winter. Distance doesn't cause seasons.
lab: Sun angle and the seasons
aim: Measure the noon Sun's height and the energy it delivers at different latitudes and times of year.
set: lat = 40 | Latitude (° N) | 0 to 66 by 1
set: dec = 23.4 | Sun's declination (°) | -23.4 to 23.4 by 0.1
out: A = min(90 - lat + dec, 180 - (90 - lat + dec)) | Noon Sun angle (°)
out: I = max(sind(A), 0)*100 | Energy per m² (% of overhead Sun)
plot: lat, I
step: Use declination +23.4° (June solstice) and record energy at 4 latitudes.
step: Switch to −23.4° (December) and compare.
noise: 1
result: The Sun is higher in summer, so its energy is concentrated on a smaller area. Seasons come from Earth's 23.4° tilt changing the Sun's angle, not from changes in distance to the Sun.
term: axial tilt = Earth's 23.5° tilt, which causes seasons
term: lunar phase = the shape of the Moon's lit portion as seen from Earth
term: solar eclipse = when the Moon blocks the Sun's light from reaching Earth
term: tide = the regular rise and fall of the ocean caused mostly by the Moon's gravity
q: What causes Earth's seasons? | *The tilt of Earth's axis | Distance from the Sun | The Moon | Ocean currents
why: Tilt changes the directness of sunlight.
q: What mainly causes tides? | *The Moon's gravity | Wind | Earth's rotation alone | The Sun's heat
why: The Moon pulls on Earth's oceans.
gen: bank.EARTH.space

@lesson The solar system and universe
say: Our Sun is one of billions of stars in our galaxy, which is one of billions of galaxies.
The solar system formed about 4.6 billion years ago from a spinning cloud of gas and dust. The four inner planets (Mercury, Venus, Earth, Mars) are rocky; the four outer planets (Jupiter, Saturn, Uranus, Neptune) are gas and ice giants.
key: Stars produce energy by nuclear fusion, turning hydrogen into helium. A star's life depends on its mass: Sun-like stars become white dwarfs; massive stars explode as supernovas and can leave neutron stars or black holes.
Our Sun is in the Milky Way galaxy. The Big Bang theory says the universe began about 13.8 billion years ago and is still expanding. Evidence includes redshift of distant galaxies and the cosmic microwave background.
term: galaxy = a huge system of stars, gas and dust held together by gravity
term: nuclear fusion = combining light nuclei to form heavier ones, releasing energy
term: Big Bang theory = the theory that the universe began expanding from a hot, dense state
term: light-year = the distance light travels in one year
q: How do stars produce energy? | *Nuclear fusion | Burning gas | Chemical reactions | Nuclear fission
why: They fuse hydrogen into helium.
q: Which is evidence for the Big Bang? | *Galaxies are moving away from us (redshift) | Earth's tilt | Plate tectonics | Ocean tides
why: Expansion suggests a common starting point.

@unit Earth's Resources | Water resources, natural resources and sustainability
@lesson Water and natural resources
say: Earth provides everything we need: water, soil, minerals and energy. Using them wisely is a big challenge.
Only about 3% of Earth's water is fresh, and most of that is frozen in ice caps. Groundwater is stored in aquifers, layers of permeable rock, and can be pumped faster than it refills.
key: Renewable resources (sunlight, wind, water, trees) can be replaced naturally. Nonrenewable resources (fossil fuels, minerals) form over millions of years and can run out.
Soil forms slowly from weathered rock and organic matter. Erosion by water and wind can remove fertile topsoil; practices like contour plowing and cover crops protect it.
Sustainability means meeting today's needs without harming future generations' ability to meet theirs.
term: aquifer = an underground layer of rock that holds groundwater
term: renewable resource = a resource that can be naturally replaced
term: nonrenewable resource = a resource that forms too slowly to be replaced
term: sustainability = using resources without depleting them for future generations
q: Which is a nonrenewable resource? | *Oil | Wind | Sunlight | Trees
why: Oil takes millions of years to form.
q: Most of Earth's fresh water is… | *frozen in ice caps and glaciers | in rivers | in lakes | in the atmosphere
why: Ice holds about two-thirds of fresh water.
gen: bank.EARTH.environment

@lesson Weathering, erosion and landforms
say: Water, wind and ice slowly reshape the land, carving canyons and building deltas.
key: Weathering breaks rock into smaller pieces. Erosion moves those pieces. Deposition drops them in a new place.
- Mechanical weathering physically breaks rock (ice wedging, roots, abrasion).
- Chemical weathering changes rock's minerals (acid rain dissolving limestone, rusting).
- Agents of erosion: water (the most powerful), wind, glaciers and gravity (landslides).
Landforms created by these processes include canyons (like the Grand Canyon, carved by the Colorado River), deltas at river mouths, sand dunes, and U-shaped valleys carved by glaciers.
lab: Stream table erosion
aim: Run water through a stream table at different speeds and see the largest sediment it can move.
set: v = 50 | Water speed (cm/s) | 5 to 300 by 5
out: d = (v/40)^2 | Largest grain moved (mm)
plot: v, d
step: Record the largest grain moved at 5 speeds.
step: Classify: clay < 0.004 mm, sand 0.06–2 mm, pebbles 4–64 mm.
noise: 5
result: Faster water carries much larger particles (competence rises roughly with the square of speed). When a river slows, it drops the biggest grains first, which is why deltas and floodplains sort sediment by size.
term: weathering = the breaking down of rock into smaller pieces
term: erosion = the movement of weathered material by water, wind, ice or gravity
term: deposition = the dropping of sediment in a new location
term: delta = a landform built from sediment deposited at a river's mouth
q: Water freezing in cracks and splitting rock is… | *mechanical weathering | chemical weathering | deposition | erosion only
why: Expanding ice physically breaks rock.
q: What carved the Grand Canyon? | *The Colorado River | A glacier | Wind | An earthquake
why: Millions of years of river erosion.
`;
