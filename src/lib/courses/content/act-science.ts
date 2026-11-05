export default String.raw`
@course act-science | ACT Science | Standard | 🔬 | Test Prep

@unit The ACT Science Test | Format and strategy, passage types
@lesson Format and strategy
say: ACT Science is really a reading-data test. You rarely need outside science knowledge. Let's learn the strategy.
key: Since 2025, ACT Science is optional and scored separately from the composite. It has 40 questions in 40 minutes, so about one minute per question. Many colleges and scholarships still look at it, so check before skipping.
Most answers come directly from the graphs, tables and experiments in each passage.
Strategy:
- Skim the passage quickly; don't read every word.
- Go straight to the questions and find the figure they point to.
- Read axis labels, units and keys carefully.
- Answer data questions first; save conflicting-viewpoints passages for last if they're slow for you.
term: data representation = a passage type built around graphs and tables
term: research summaries = a passage type describing experiments and their results
term: conflicting viewpoints = a passage type comparing different scientists' hypotheses
q: Do you need lots of memorized science facts for ACT Science? | *Rarely; most answers are in the data | Yes, always | Only chemistry | Only biology
why: It tests reading and reasoning with data.
q: What should you check first when reading a graph? | *Axis labels and units | The passage title only | Answer choices | The page number
why: Misreading axes causes many errors.

@lesson Passage types
say: ACT Science has three passage types. Recognizing them helps you attack each one.
key: Data Representation passages present graphs and tables; questions ask you to read values and spot trends.
Research Summaries describe one or more experiments; questions ask about design, variables and results.
Conflicting Viewpoints present two or more hypotheses (like Scientist 1 and Scientist 2); questions ask what each believes and where they agree or disagree.
For conflicting viewpoints, summarize each viewpoint in one sentence in the margin before answering.
tip: Underline the key claim of each viewpoint. Most questions ask what one scientist would predict or how a new result affects a claim.
lab: The classic pendulum passage
aim: A student tests whether a pendulum's length, mass or swing angle affects its period. Run the experiments yourself.
set: L = 1 | Length (m) | 0.2 to 2 by 0.1
set: m = 100 | Bob mass (g) | 50 to 500 by 50
out: T = 2*pi*sqrt(L/g) | Period (s)
plot: L, T
sim: pendulum | L=L, m=m
step: Experiment 1: change only the length and record 4 trials.
step: Experiment 2: change only the mass. Did the period change?
noise: 1
result: Only length affects the period (T grows with √L); mass doesn't. ACT questions test this: identify the variable changed in each experiment and what stayed constant.
term: hypothesis = a testable explanation
term: viewpoint = one scientist's explanation in a conflicting viewpoints passage
term: trend = a general pattern in data
q: A passage where Student 1 and Student 2 disagree is… | *conflicting viewpoints | data representation | research summaries | a table
why: It compares different explanations.
q: For conflicting viewpoints, a good strategy is to… | *summarize each viewpoint before answering | read only the questions | skip the passage | memorize every detail
why: It keeps the positions clear.

@unit Reading Data | Tables and graphs, trends and interpolation
@lesson Reading tables and graphs
say: Most ACT Science points come from reading data accurately. Let's practice.
key: To read a value, find the right row or line, then trace carefully to the matching value. Watch for different units and scales on multiple axes.
Trends: direct relationship (both increase), inverse relationship (one increases as the other decreases), or no clear trend.
Interpolation estimates values between data points; extrapolation estimates beyond the data by extending the trend.
ex: A table shows plant height: week 1: 2 cm, week 2: 4 cm, week 3: 6 cm. Predict week 5.
> It grows 2 cm per week
= About 10 cm (extrapolating the trend)
lab: Solubility curves
aim: Dissolve potassium nitrate and sodium chloride in 100 g of water at different temperatures and read their solubility.
set: T = 30 | Water temperature (°C) | 0 to 80 by 5
out: KNO3 = 13.3*exp(0.0355*T) | KNO₃ solubility (g/100 g water)
out: NaCl = 35.7 + 0.04*T | NaCl solubility (g/100 g water)
plot: T, KNO3
step: Record both solubilities every 10 °C.
step: At what temperature are they equal? Which salt depends more on temperature?
noise: 2
result: KNO₃ solubility rises steeply with temperature, while NaCl barely changes; the curves cross near 24 °C. ACT data questions ask you to read values, compare trends and interpolate between points.
term: direct relationship = both variables increase together
term: inverse relationship = one variable increases as the other decreases
term: interpolation = estimating a value between known data points
term: extrapolation = estimating a value beyond the known data
q: As temperature rises, gas volume rises. This is… | *a direct relationship | an inverse relationship | no relationship | a constant
why: Both increase together.
q: Estimating a value between two data points is… | *interpolation | extrapolation | a hypothesis | a control
why: Inter means between.
gen: stem.actTable

@lesson Comparing multiple figures
say: Harder questions combine information from two figures. Take it one step at a time.
key: When a question uses two figures, find the shared variable that connects them. Use the first figure to get a value, then look it up in the second.
Watch for:
- Different units (mL vs. L, °C vs. K).
- Logarithmic or uneven scales.
- Keys and legends that distinguish multiple lines.
- Questions that ask about a percent change or a ratio rather than a raw value.
ex: Figure 1 shows the temperature at each depth; Figure 2 shows the oxygen at each temperature. Find the oxygen at 20 m depth.
> Figure 1: 20 m → 12°C
= Figure 2: 12°C → read the oxygen value there
term: legend = a key explaining the symbols or lines on a graph
term: logarithmic scale = a scale where each step multiplies by a constant
term: shared variable = a variable that connects two figures
q: Two figures share the variable "temperature." To combine them, you should… | *use temperature to link a value from one figure to the other | ignore one figure | average the figures | only read the titles
why: The shared variable is the bridge.
q: On a logarithmic scale, equal spacing represents… | *equal multiplication factors | equal differences | no change | random values
why: Each step multiplies.

@unit Experiments and Reasoning | Experimental design, evaluating models
@lesson Experimental design
say: Research Summaries test whether you understand how experiments work.
key: The independent variable is what scientists change on purpose. The dependent variable is what they measure. Controlled variables stay constant. A control group provides a baseline for comparison.
Questions may ask why a step was included, what would happen if a variable changed, or which experiment would test a new hypothesis.
ex: Scientists test plant growth at 3 light levels with the same soil and water. Identify the variables.
> Changed: light level (independent)
> Measured: growth (dependent)
= Controlled: soil and water
To test a hypothesis, change only the variable in question and keep everything else the same.
lab: Seed germination experiment
aim: Design and run an experiment testing how temperature affects the percentage of radish seeds that germinate in 5 days.
set: T = 20 | Temperature (°C) | 0 to 45 by 1
set: n = 50 | Seeds per dish | 10 to 100 by 10
out: G = 95*exp(-((T - 25)/8)^2) | Germination (%)
out: count = G/100*n | Seeds germinated
plot: T, G
step: Independent variable: temperature. Dependent variable: percent germinated. Controls: seed type, water, light, number of seeds.
step: Record germination at 6 temperatures.
noise: 5
result: Germination peaks near 25 °C and falls at extremes. More seeds per dish reduces the effect of random variation. On the ACT, a good experiment changes only one variable and keeps everything else the same.
term: independent variable = the variable deliberately changed in an experiment
term: dependent variable = the variable measured in an experiment
term: controlled variable = a factor kept the same in an experiment
term: control group = a group used as a baseline for comparison
q: In a study of how fertilizer affects plant height, height is the… | *dependent variable | independent variable | controlled variable | control group
why: It's what is measured.
q: To test whether temperature affects reaction speed, you should change… | *only the temperature | everything | the measuring tool | nothing
why: Isolate one variable.

@lesson Evaluating hypotheses and models
say: Conflicting Viewpoints and reasoning questions ask you to compare ideas and judge evidence.
key: To evaluate a viewpoint, ask: what does it claim, what evidence supports it, and what would weaken it? Find where the viewpoints agree, which questions often target.
Questions may ask which new finding would support or weaken a scientist's view. A finding supports a view if it's consistent with that view's prediction.
ex: Scientist 1 says a lake's fish died from low oxygen; Scientist 2 blames a toxin. Which finding supports Scientist 1?
> Scientist 1 predicts low oxygen levels
= Measurements showing very low dissolved oxygen when the fish died
term: support = evidence consistent with a hypothesis
term: weaken = evidence inconsistent with a hypothesis
term: assumption = an idea taken as true without proof
q: A finding contradicts Scientist 2's prediction. It… | *weakens Scientist 2's view | supports Scientist 2 | proves Scientist 1 right completely | has no effect
why: Inconsistent evidence weakens a hypothesis.
q: Questions often ask where two viewpoints… | *agree | use the same words | have equal length | have no data
why: Shared assumptions are a common target.
`;
