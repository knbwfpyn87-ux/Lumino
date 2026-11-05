export default String.raw`
@course psat | PSAT/NMSQT | Standard | 📝 | Test Prep

@unit About the PSAT | Format and scoring, National Merit
@lesson Format and scoring
say: The PSAT/NMSQT is the practice SAT. It's digital, adaptive, and can qualify you for scholarships.
key: The PSAT/NMSQT mirrors the Digital SAT: a Reading and Writing section (two modules, 54 questions total) and a Math section (two modules, 44 questions total). Like the SAT, it's adaptive: your first module determines the difficulty of your second.
Scores range from 320 to 1520 (each section 160–760). The scale is slightly lower than the SAT's because it's designed for 10th and 11th graders.
A Desmos graphing calculator is built in for Math. There's no penalty for wrong answers.
Your score report shows your strengths and areas to improve, which is a great guide for SAT prep.
term: PSAT/NMSQT = the Preliminary SAT and National Merit Scholarship Qualifying Test
term: adaptive test = a test where later questions depend on your earlier performance
term: score report = a breakdown of your results by skill area
q: What is the PSAT score range? | *320–1520 | 400–1600 | 1–36 | 200–800
why: It's scaled slightly lower than the SAT.
q: The PSAT is adaptive, meaning… | *your first module affects your second module's difficulty | it changes every question | it's given on paper | it has no math
why: Like the Digital SAT.

@lesson National Merit Scholarships
say: In 11th grade, the PSAT/NMSQT can qualify you for National Merit recognition and scholarships.
key: Juniors' scores are converted into a Selection Index (calculated from your section scores). Students with the highest Selection Indexes in each state can become Commended Students or Semifinalists, and many go on to become Finalists and earn scholarships.
The qualifying Selection Index cutoff varies by state and year.
Even if you don't qualify for National Merit, the PSAT is valuable practice and can connect you with other scholarship programs.
Taking it in 10th grade is good practice; the 11th-grade score is the one that counts for National Merit.
term: Selection Index = the score used to determine National Merit eligibility
term: National Merit Semifinalist = a student who scores among the top in their state on the PSAT/NMSQT as a junior
term: Commended Student = a student recognized for a high PSAT score who doesn't become a Semifinalist
q: Which grade's PSAT counts for National Merit? | *11th grade | 9th grade | 10th grade | 12th grade
why: Only juniors qualify.
q: National Merit cutoffs are… | *set by state | the same everywhere | 1600 | based on GPA only
why: Each state has its own cutoff.

@unit Reading and Writing | Craft and structure, information and ideas, conventions and expression
@lesson Reading questions
say: PSAT Reading and Writing uses short passages with one question each, just like the SAT.
key: Question types: words in context, text structure and purpose, cross-text connections, central ideas, evidence (from text and graphs), and inferences.
Strategy: read the question first, then the passage. Predict an answer before looking at choices. The correct answer is always directly supported by the text.
Eliminate traps: answers that are too extreme, out of scope, or only half right.
ex: A passage says a new bridge design "reduced costs but raised safety concerns." Which answer best describes the author's view?
> The author notes both a benefit and a drawback
= The design has advantages and disadvantages (not "the design is a failure")
term: inference = a conclusion strongly supported by the text
term: central idea = the main point of a passage
term: textual evidence = a quotation or detail that supports a claim
q: The correct answer to a reading question is… | *directly supported by the passage | the most interesting choice | the longest choice | based on outside knowledge
why: Evidence from the text is required.
q: An answer that says "always" when the passage says "often" is… | *too extreme | correct | a transition | a summary
why: Extreme language overstates the text.
gen: vocab

@lesson Writing questions
say: Writing questions test grammar, punctuation and clear expression. These are some of the fastest points on the test.
key: Conventions: sentence boundaries (no comma splices), subject–verb agreement, pronoun agreement, verb tense and punctuation (semicolons, colons, apostrophes).
Expression of Ideas: choose transitions that match the logic between sentences, and for rhetorical synthesis questions, pick the answer that uses the notes to meet the stated goal.
ex: "The experiment failed. ______, the team learned valuable lessons."
> A contrast between failure and benefit
= Nevertheless (or However)
tip: Grammar questions are usually the quickest on the test. Answer them confidently to bank time for harder reading questions.
term: transition = a word that shows how ideas connect
term: rhetorical synthesis = using notes to accomplish a specific writing goal
term: comma splice = an error joining two independent clauses with only a comma
q: Which correctly joins two independent clauses? | *A semicolon | A comma alone | No punctuation | A colon before "and"
why: Semicolons connect independent clauses.
q: For rhetorical synthesis, you should first read… | *the stated goal | every note in detail | the longest answer | nothing
why: The goal determines the answer.
gen: transition, sva

@unit Math | Algebra and advanced math, problem solving and geometry
@lesson Algebra and advanced math
say: PSAT Math covers the same four domains as the SAT, with a bit less difficulty.
key: Algebra: linear equations, inequalities, linear functions and systems. Advanced Math: quadratics, exponential functions, polynomials and function notation.
Key skills: interpret slope and intercepts in context, solve systems by substitution or elimination, factor quadratics, and use exponent rules.
Use the Desmos calculator to graph equations, find intersections and check answers.
ex: In C = 15h + 40, C is the cost of a repair taking h hours. What does 40 represent?
> When h = 0, C = 40
= A fixed fee charged even for zero hours of work
tip: Graph equations in Desmos to check your work. Finding where two lines cross takes seconds and catches algebra mistakes.
term: slope = the rate of change of a linear function
term: y-intercept = the starting value when x = 0
term: system of equations = equations solved together
q: Solve 2x + 5 = 17 | *6 | 11 | 8.5 | 12
why: 2x = 12.
q: In y = 3x + 7, the slope is… | *3 | 7 | 10 | 1/3
why: y = mx + b.
gen: linear, system2, quadRoots

@lesson Problem solving, data and geometry
say: Data analysis and geometry questions round out PSAT Math.
key: Problem solving and data: ratios, rates, percents, unit conversions, mean and median, and reading tables and scatterplots.
Geometry and trig: area and volume (a reference sheet is provided), angles, triangles, right triangle trigonometry and circles.
ex: A shirt costs $40 and is on sale for 25% off. What's the sale price?
> 25% of 40 = 10
= $30
Watch units carefully and make sure your answer answers the actual question.
oops: A discount followed by a markup of the same percent doesn't return to the original price: 100 → 80 → 96 after a 20% discount and then a 20% increase.
term: percent = a ratio out of 100
term: median = the middle value of ordered data
term: volume = the space inside a three-dimensional figure
q: What is 15% of 200? | *30 | 15 | 3 | 185
why: 0.15 × 200.
q: Two angles of a triangle are 60° and 70°. The third is… | *50° | 30° | 130° | 70°
why: 180 − 130.
gen: percentOf, angles, median
`;
