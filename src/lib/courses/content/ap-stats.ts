export default String.raw`
@course ap-stats | AP Statistics | AP | 📊 | Math

// Follows the 9 units of the AP Statistics Course and Exam Description.

@unit Exploring One-Variable Data | Displays, center and spread, outliers, comparing distributions, the normal distribution
@lesson Describing distributions
say: Statistics starts with describing data clearly. On the AP exam, always describe shape, center, spread and unusual features, in context.
Categorical variables place individuals into groups (eye color); quantitative variables are numerical measurements (height). Display categorical data with bar charts; quantitative data with dotplots, histograms, stemplots and boxplots.
key: Describe a distribution with SOCS: Shape, Outliers, Center, Spread, always in context.
- Shape: symmetric, skewed left (tail to the left), skewed right (tail to the right), unimodal or bimodal.
- Center: mean (x̄) or median.
- Spread: standard deviation, range or IQR.
- Outliers: below Q1 − 1.5·IQR or above Q3 + 1.5·IQR.
In a right-skewed distribution, the mean is usually greater than the median. Use median and IQR for skewed data (they're resistant); use mean and standard deviation for roughly symmetric data.
ex: Q1 = 20 and Q3 = 30. Is 48 an outlier?
> IQR = 10; upper fence = 30 + 1.5(10) = 45
= Yes, 48 > 45, so it's an outlier
term: categorical variable = a variable that places individuals into groups or categories
term: quantitative variable = a variable with numerical values that can be averaged
term: interquartile range = Q3 − Q1, the spread of the middle 50% of the data
term: resistant = not strongly affected by outliers or skew, like the median
term: skewed right = a distribution with a long tail on the right side
q: In a strongly right-skewed distribution, the mean is likely… | *greater than the median | less than the median | equal to the median | zero
why: The long right tail pulls the mean up.
q: Which measures are resistant to outliers? | *Median and IQR | Mean and standard deviation | Mean and range | Range and standard deviation
why: They depend on position, not extreme values.
gen: median, meanFind

@lesson z-scores and the normal distribution
say: The normal distribution is the most important curve in statistics. z-scores let you compare values from different distributions.
key: z = (x − μ)/σ measures how many standard deviations a value is from the mean.
The empirical rule for normal distributions: about 68% of values are within 1σ, 95% within 2σ, and 99.7% within 3σ of the mean.
For other proportions, use a z-table or calculator (normalcdf / invNorm).
ex: SAT Math scores are N(520, 110). What percent score above 740?
> z = (740 − 520)/110 = 2
> About 2.5% lie above z = 2 (half of the 5% outside ±2σ)
= about 2.5%
A percentile tells the percent of values at or below a given value. Transforming data: adding a constant shifts the center but not the spread; multiplying by a constant multiplies both center and spread.
demo: Filling cereal boxes
aim: A machine fills boxes labeled 500 g. Fill weights are normal with an adjustable mean and standard deviation 8 g.
set: mu = 510 | Machine setting (mean, g) | 490 to 540 by 1
set: sd = 8 | Standard deviation (g) | 2 to 15 by 1
out: under = 100*normcdf((500 - mu)/sd) | Underweight boxes (%)
plot: mu, under
step: What setting keeps underweight boxes below 1%?
result: P(X < 500) = P(Z < (500 − μ)/σ). To get under 1% you need z ≤ −2.33, so μ ≥ 500 + 2.33σ ≈ 519 g. Reducing variability lets the company fill less on average.
term: z-score = the number of standard deviations a value is from the mean
term: normal distribution = a symmetric, bell-shaped distribution described by its mean and standard deviation
term: empirical rule = the 68–95–99.7 rule for normal distributions
term: percentile = the percent of values at or below a given value
q: A value has z = −1.5. It is… | *1.5 standard deviations below the mean | 1.5 units below the mean | at the 15th percentile | an outlier
why: z counts standard deviations.
q: Adding 10 points to every test score changes the standard deviation by… | *0 | 10 | 100 | √10
why: Shifting data doesn't change spread.
gen: stem.zscore

@unit Exploring Two-Variable Data | Two-way tables, scatterplots and correlation, least-squares regression, residuals
@lesson Scatterplots and correlation
say: When we measure two quantitative variables, a scatterplot shows the relationship. Correlation measures its strength.
Describe a scatterplot with DOFS: Direction (positive or negative), Outliers, Form (linear or curved), Strength, in context.
key: The correlation r ranges from −1 to 1. It measures the strength and direction of a linear relationship only.
- r near ±1: strong linear relationship. r near 0: weak or no linear relationship.
- r has no units and doesn't change if you switch x and y or change units.
- r is not resistant: one outlier can change it a lot.
oops: Correlation does not imply causation. Ice cream sales and drownings are correlated because both increase in summer (a lurking variable).
Two-way tables summarize two categorical variables. Use joint, marginal and conditional relative frequencies to check for association.
term: correlation = a number from −1 to 1 describing the strength and direction of a linear relationship
term: explanatory variable = the variable that may help explain or predict changes in the response
term: response variable = the outcome variable measured in a study
term: lurking variable = a variable not studied that affects the relationship between two variables
q: r = −0.92 indicates… | *a strong negative linear relationship | a weak relationship | no relationship | that x causes y to decrease
why: Values near −1 are strongly negative.
q: Which is true about correlation? | *It measures only linear relationships | It proves causation | It has units | It's always positive
why: A strong curved relationship can have r near 0.

@lesson Least-squares regression and residuals
say: The regression line is the best-fitting line through a scatterplot. Interpreting its slope in context is a guaranteed AP question.
key: ŷ = a + bx. Slope b = r(s_y/s_x); the line always passes through (x̄, ȳ).
Interpret the slope: "For each additional [x unit], the predicted [y] increases/decreases by [b]."
A residual = actual − predicted = y − ŷ. A residual plot with no pattern means a linear model is appropriate; a curved pattern means it isn't.
r² is the coefficient of determination: the percent of variation in y explained by the linear model with x.
ex: ŷ = 30 + 4.5x, where x is hours studied and y is test score. A student studied 8 hours and scored 70. Find the residual.
> Predicted: 30 + 4.5(8) = 66
> Residual: 70 − 66
= 4 (the student scored 4 points above the prediction)
oops: Extrapolation (predicting far outside the range of the data) is unreliable.
demo: The danger of extrapolation
aim: For children aged 2–12, height is well modeled by ŷ = 76 + 6x cm, where x is age. Use it at other ages.
set: x = 8 | Age (years) | 0 to 40 by 1
out: yhat = 76 + 6*x | Predicted height (cm)
plot: x, yhat
step: Predict the height of a 10-year-old, then a 40-year-old.
result: Within the data (ages 2–12) predictions are reasonable: 136 cm at age 10. At 40 the model predicts 316 cm, because growth stops. Never extrapolate far beyond the range of x in the data.
term: least-squares regression line = the line that minimizes the sum of squared residuals
term: residual = actual value minus predicted value
term: coefficient of determination = r², the proportion of variation in y explained by the model
term: extrapolation = using a model to predict outside the range of the data
q: r² = 0.81 means… | *81% of the variation in y is explained by the linear model with x | the slope is 0.81 | 81% of points are on the line | r = 0.81
why: That's the meaning of r².
q: A residual plot shows a clear curve. This suggests… | *a linear model isn't appropriate | the model is perfect | r = 1 | there are no outliers
why: Patterns in residuals indicate a poor linear fit.
gen: alg.lineEq

@unit Collecting Data | Sampling methods and bias, experiments, observational studies, inference about populations and causation
@lesson Sampling and bias
say: How data is collected matters more than any calculation. A biased sample gives a wrong answer, no matter how big it is.
A population is the entire group of interest; a sample is the part we actually study. A census collects data from everyone.
key: Random sampling methods: simple random sample (SRS), stratified (random samples within similar groups), cluster (randomly select whole groups) and systematic (every kth individual after a random start).
Sources of bias:
- Convenience sampling: choosing easy-to-reach people.
- Voluntary response: people choose to respond, usually those with strong opinions.
- Undercoverage: some groups are left out.
- Nonresponse: selected people don't respond.
- Response bias: question wording or interviewer effects lead to inaccurate answers.
demo: Nonresponse bias in a survey
aim: Exactly 50% of a town supports a new park. Supporters and opponents respond to a mailed survey at different rates.
set: r1 = 30 | Supporters who respond (%) | 5 to 80 by 5
set: r2 = 15 | Opponents who respond (%) | 5 to 80 by 5
out: est = 100*0.5*r1/(0.5*r1 + 0.5*r2) | Survey estimate of support (%)
out: bias = est - 50 | Bias (points)
plot: r1, est
step: Set equal response rates. Then make supporters twice as likely to respond.
result: When people who respond differ from those who don't, the estimate is biased, here 67% instead of 50%. A bigger sample doesn't fix bias; better design (follow-ups, random sampling) does.
term: simple random sample = a sample where every group of n individuals has an equal chance of being chosen
term: stratified random sample = dividing the population into similar groups and sampling randomly from each
term: cluster sample = randomly selecting entire groups and surveying everyone in them
term: voluntary response bias = bias from people choosing whether to participate, often those with strong opinions
term: undercoverage = when some members of the population are less likely to be included in a sample
q: An online poll invites anyone to vote. This suffers from… | *voluntary response bias | stratification | random sampling | blinding
why: People with strong opinions are more likely to respond.
q: Dividing a school by grade and randomly sampling 20 students from each grade is… | *stratified random sampling | cluster sampling | convenience sampling | systematic sampling
why: The grades are strata.

@lesson Experiments and observational studies
say: Only well-designed experiments can show cause and effect. Here's what makes an experiment trustworthy.
In an observational study, researchers observe without imposing treatments. In an experiment, they deliberately assign treatments.
key: Principles of experimental design: comparison (at least two groups), random assignment of treatments, control of other variables, and replication (enough experimental units).
- A control group gets no treatment or a placebo.
- Blinding: subjects (single-blind) or both subjects and evaluators (double-blind) don't know who gets which treatment.
- Blocking: grouping similar units and randomizing within blocks reduces variability. A matched-pairs design is a special case.
Scope of inference: random sampling allows generalizing to the population; random assignment allows cause-and-effect conclusions.
term: random assignment = using chance to assign experimental units to treatments
term: confounding = when the effects of two variables on the response can't be separated
term: placebo = a fake treatment with no active ingredient
term: double-blind = neither the subjects nor the evaluators know who receives which treatment
term: blocking = grouping similar experimental units before randomly assigning treatments
q: What allows a study to conclude cause and effect? | *Random assignment of treatments | Random sampling | A large sample | A survey
why: Random assignment balances other variables between groups.
q: Why use a placebo? | *To control for the placebo effect | To increase sample size | To make it observational | To avoid randomization
why: Subjects may improve just from believing they're treated.

@unit Probability, Random Variables and Probability Distributions | Probability rules, random variables, binomial and geometric distributions
@lesson Probability rules
say: Probability is the language of uncertainty. These rules are used in every later unit.
key: P(A or B) = P(A) + P(B) − P(A and B). P(A and B) = P(A) · P(B | A). Events are independent if P(B | A) = P(B).
- Mutually exclusive events can't happen together: P(A and B) = 0.
- Complement: P(not A) = 1 − P(A). "At least one" problems are often easiest with the complement.
- Conditional probability: P(A | B) = P(A and B)/P(B).
ex: The probability a part is defective is 0.05. What's the probability that at least one of 3 independent parts is defective?
> P(none defective) = 0.95³ ≈ 0.857
> P(at least one) = 1 − 0.857
= about 0.143
Simulation uses random numbers to model chance processes and estimate probabilities.
term: independent events = events where knowing one occurred doesn't change the probability of the other
term: mutually exclusive = events that cannot occur at the same time
term: conditional probability = the probability of an event given that another event has occurred
term: simulation = imitating a random process to estimate probabilities
q: P(A) = 0.4, P(B) = 0.5, and A and B are independent. P(A and B) = | *0.20 | 0.90 | 0.10 | 0.45
why: Multiply for independent events.
q: Two events are mutually exclusive. Can they be independent (if both have positive probability)? | *No | Yes, always | Only if P = 0.5 | Only in simulations
why: If one happens, the other can't, so they affect each other.
gen: stem.indep

@lesson Random variables, binomial and geometric distributions
say: Random variables turn chance outcomes into numbers. Two special distributions show up constantly on the exam.
The expected value of a discrete random variable is μ = Σ x·P(x), the long-run average. Its standard deviation measures typical variation from the mean.
Combining random variables: means add (μ_X+Y = μ_X + μ_Y). For independent variables, variances add (even when subtracting): σ²_X±Y = σ²_X + σ²_Y.
key: Binomial setting (BINS): Binary outcomes, Independent trials, fixed Number of trials n, Same probability p. P(X = k) = C(n,k)pᵏ(1 − p)ⁿ⁻ᵏ, with μ = np and σ = √(np(1 − p)).
Geometric setting: count trials until the first success. P(X = k) = (1 − p)ᵏ⁻¹p, with mean 1/p.
ex: A basketball player makes 70% of free throws. In 10 shots, what's the expected number made and the standard deviation?
> μ = np = 10(0.7) = 7
> σ = √(10 × 0.7 × 0.3) = √2.1
= μ = 7, σ ≈ 1.45
demo: Free throws: the binomial distribution
aim: A player takes 20 free throws, each made with the same probability. Find the probability of making exactly k.
set: k = 14 | Shots made (k) | 0 to 20 by 1
set: p = 0.7 | Probability of making each shot | 0.1 to 0.95 by 0.05
out: P = choose(20, k)*p^k*(1 - p)^(20 - k) | P(X = k)
out: mean = 20*p | Expected makes
out: sd = sqrt(20*p*(1 - p)) | Standard deviation
plot: k, P
step: Find the most likely number of makes. How does the shape change when p is 0.5 versus 0.9?
result: P(X = k) = C(20, k)pᵏ(1 − p)²⁰⁻ᵏ. The distribution centers at np = 14 with SD √(np(1 − p)) ≈ 2.05; it's symmetric at p = 0.5 and skewed left when p is near 1.
term: expected value = the long-run average value of a random variable
term: binomial distribution = the distribution of the number of successes in n independent trials with the same probability p
term: geometric distribution = the distribution of the number of trials until the first success
term: random variable = a variable whose value is a numerical outcome of a random process
q: Rolling a die until you get a 6 follows which distribution? | *Geometric | Binomial | Normal | Uniform
why: You count trials until the first success.
q: A binomial setting has n = 20 and p = 0.25. What is the mean? | *5 | 20 | 0.25 | 80
why: μ = np.
gen: stem.expected, stem.combos

@unit Sampling Distributions | Variation in statistics, sampling distributions of proportions and means, the Central Limit Theorem
@lesson Sampling distributions
say: Different samples give different results. A sampling distribution describes how a statistic varies from sample to sample.
A parameter describes a population (p, μ); a statistic describes a sample (p̂, x̄). The sampling distribution of a statistic is the distribution of its values from all possible samples of the same size.
key: A statistic is unbiased if its sampling distribution is centered at the parameter. Larger samples reduce variability (spread decreases by a factor of √n).
Sampling distribution of p̂: mean p, standard deviation √(p(1 − p)/n). It's approximately normal if np ≥ 10 and n(1 − p) ≥ 10.
ex: In a population, p = 0.6. For samples of n = 100, find the mean and standard deviation of p̂.
> Mean = 0.6
> SD = √(0.6 × 0.4/100) = √0.0024
= mean 0.6, SD ≈ 0.049
term: parameter = a number that describes a population
term: statistic = a number that describes a sample
term: sampling distribution = the distribution of a statistic over all possible samples of a given size
term: unbiased estimator = a statistic whose sampling distribution is centered at the true parameter
q: To cut the standard deviation of p̂ in half, multiply the sample size by… | *4 | 2 | 8 | 0.5
why: SD ∝ 1/√n.
q: p̂ is a(n)… | *statistic | parameter | population | census
why: It's calculated from a sample.

@lesson The Central Limit Theorem
say: The Central Limit Theorem is statistical magic: sample means become normal even when the population isn't.
Sampling distribution of x̄: mean μ, standard deviation σ/√n.
key: Central Limit Theorem: for large enough samples (n ≥ 30 is a common guideline), the sampling distribution of x̄ is approximately normal, regardless of the population's shape.
If the population itself is normal, x̄ is normal for any sample size.
ex: Commute times have μ = 30 minutes and σ = 12, with a right-skewed shape. For random samples of 36 commuters, describe the sampling distribution of x̄.
> n = 36 ≥ 30, so the CLT applies: approximately normal
> Mean 30, SD = 12/√36 = 2
= approximately N(30, 2)
The 10% condition: when sampling without replacement, the sample should be less than 10% of the population for the standard deviation formulas to work.
demo: Sample size and the sampling distribution
aim: Battery lifetimes have mean 400 hours and SD 60 hours (and are skewed). Take samples of size n.
set: n = 30 | Sample size | 1 to 200 by 1
out: se = 60/sqrt(n) | SD of x̄ (hours)
out: P = 100*(1 - normcdf((410 - 400)/se)) | Chance x̄ > 410 h (%)
plot: n, se
step: How does the chance of a sample mean above 410 change as n grows?
result: The sampling distribution of x̄ has SD σ/√n, so larger samples give less variable means. By the Central Limit Theorem it's approximately normal for n ≥ 30 even though lifetimes are skewed.
term: central limit theorem = sample means are approximately normal for large samples, regardless of population shape
term: standard error = the estimated standard deviation of a statistic's sampling distribution
term: 10% condition = the sample size should be less than 10% of the population when sampling without replacement
q: A population is strongly skewed. For n = 50, the sampling distribution of x̄ is… | *approximately normal | strongly skewed | uniform | bimodal
why: The Central Limit Theorem applies.
q: The standard deviation of x̄ for samples of n = 25 with σ = 10 is… | *2 | 10 | 0.4 | 250
why: σ/√n = 10/5.

@unit Inference for Proportions | Confidence intervals for proportions, significance tests, errors and power
@lesson Confidence intervals for proportions
say: A confidence interval gives a range of plausible values for a parameter. Interpreting it correctly earns big points.
key: Confidence interval = statistic ± (critical value)(standard error). For a proportion: p̂ ± z*√(p̂(1 − p̂)/n).
Conditions: Random sample; 10% condition; Large counts (np̂ ≥ 10 and n(1 − p̂) ≥ 10).
Common critical values: 90% → 1.645, 95% → 1.96, 99% → 2.576.
ex: In a random sample of 400 students, 240 support a later start. Construct a 95% confidence interval.
> p̂ = 0.6; SE = √(0.6 × 0.4/400) ≈ 0.0245
> 0.6 ± 1.96(0.0245) = 0.6 ± 0.048
= (0.552, 0.648)
Interpretation: "We are 95% confident that the interval from 0.552 to 0.648 captures the true proportion of all students who support a later start."
Higher confidence → wider interval. Larger sample → narrower interval.
term: confidence interval = a range of plausible values for a parameter
term: margin of error = the critical value times the standard error; half the interval's width
term: confidence level = the long-run percent of intervals that capture the true parameter
term: critical value = the z* or t* value that matches the confidence level
q: Increasing the confidence level from 90% to 99% makes the interval… | *wider | narrower | the same width | centered differently
why: More confidence requires a larger critical value.
q: What does "95% confident" mean? | *95% of intervals made this way capture the true parameter | There's a 95% chance p̂ is correct | 95% of the data is in the interval | The parameter changes 5% of the time
why: Confidence describes the method's long-run success rate.

@lesson Significance tests and errors
say: A significance test asks whether data gives convincing evidence against a claim. Here's the four-step process.
key: State hypotheses (H₀: p = p₀; Hₐ: p >, <, or ≠ p₀), check conditions, calculate the test statistic and P-value, then conclude in context.
Test statistic: z = (p̂ − p₀)/√(p₀(1 − p₀)/n). The P-value is the probability of getting a result at least this extreme if H₀ is true.
If P-value < α (often 0.05), reject H₀: there is convincing evidence for Hₐ. Otherwise, fail to reject H₀ (never "accept" it).
- Type I error: rejecting H₀ when it's true (probability α).
- Type II error: failing to reject H₀ when Hₐ is true.
- Power = 1 − P(Type II error): the probability of correctly rejecting a false H₀. Power increases with larger samples, larger α, and larger true effects.
demo: The power of a test
aim: Test H₀: p = 0.50 against Hₐ: p > 0.50 at α = 0.05. How likely are you to detect a true effect?
set: p = 0.55 | True proportion | 0.5 to 0.7 by 0.01
set: n = 400 | Sample size | 50 to 2000 by 50
out: cut = 0.5 + 1.645*sqrt(0.25/n) | Rejection cutoff for p̂
out: power = 100*(1 - normcdf((cut - p)/sqrt(p*(1 - p)/n))) | Power (%)
out: beta = 100 - power | Type II error (%)
plot: p, power
step: Find the sample size needed for 80% power when p = 0.55.
result: Power is the probability of correctly rejecting a false H₀. It rises with a larger true effect, a larger sample and a larger α. At p = 0.55 you need about 620 people for 80% power.
term: null hypothesis = the claim of no effect or no difference, tested in a significance test
term: P-value = the probability of results at least as extreme as observed, assuming the null hypothesis is true
term: Type I error = rejecting the null hypothesis when it is actually true
term: Type II error = failing to reject the null hypothesis when it is actually false
term: power = the probability of correctly rejecting a false null hypothesis
q: P-value = 0.03 and α = 0.05. The conclusion is… | *reject H₀ | fail to reject H₀ | accept H₀ | the test is invalid
why: 0.03 < 0.05.
q: Which increases power? | *A larger sample size | A smaller α | A smaller true effect | Less data
why: Larger samples reduce variability.

@unit Inference for Means | t-distributions, confidence intervals and tests for means, two-sample and paired procedures
@lesson t-procedures for one mean
say: When we don't know σ, which is almost always, we use the t-distribution instead of z.
key: For means, use t* with df = n − 1: x̄ ± t*(s/√n). Test statistic: t = (x̄ − μ₀)/(s/√n).
t-distributions are bell-shaped but have fatter tails than the normal distribution; they approach the normal as df increases.
Conditions: random sample; 10% condition; normal/large sample (n ≥ 30, or the population is approximately normal, or the sample data show no strong skew or outliers).
ex: A random sample of 16 batteries has x̄ = 49 hours and s = 4. Is there evidence the mean lifetime is less than the claimed 50 hours?
> t = (49 − 50)/(4/√16) = −1
> With df = 15, the P-value ≈ 0.17
= P-value > 0.05, so we fail to reject H₀; not convincing evidence the mean is below 50 hours
term: t-distribution = a distribution used for inference about means when σ is unknown
term: degrees of freedom = a parameter of the t-distribution; n − 1 for one sample
term: standard error of the mean = s/√n
q: Why use t instead of z for means? | *σ is unknown, so we estimate it with s | t is always more accurate | z only works for proportions | The sample is too large
why: Estimating σ adds uncertainty, captured by fatter tails.
q: Compared to z*, the t* value for 95% confidence with df = 5 is… | *larger | smaller | the same | negative
why: Fatter tails require a larger critical value.

@lesson Two-sample and paired procedures
say: Many studies compare two groups. The key is recognizing whether the data are independent or paired.
key: Paired data: the same individuals measured twice, or matched pairs. Analyze the differences with one-sample t-procedures on d.
Two independent samples: use two-sample t-procedures: (x̄₁ − x̄₂) ± t*√(s₁²/n₁ + s₂²/n₂).
For two proportions: (p̂₁ − p̂₂) ± z*√(p̂₁(1 − p̂₁)/n₁ + p̂₂(1 − p̂₂)/n₂). Tests of H₀: p₁ = p₂ use a pooled proportion.
ex: Students take a test before and after tutoring. Which procedure?
> The same students are measured twice
= Paired t-procedure on the differences
If a confidence interval for a difference contains 0, there's no convincing evidence of a difference.
demo: A/B test of two study apps
aim: Students using App A score higher on average than students using App B. Is the difference statistically significant?
set: diff = 4 | Difference in mean scores | 0 to 15 by 0.5
set: n = 30 | Students per group | 5 to 200 by 5
out: se = sqrt(12^2/n + 12^2/n) | Standard error of difference
out: z = diff/se | Test statistic
out: P = 100*2*(1 - normcdf(z)) | p-value (%)
plot: n, P
step: With a 4-point difference, how many students per group make the result significant at 5%?
result: The test statistic (x̄₁ − x̄₂)/SE grows with sample size. A 4-point difference isn't significant with 30 per group (p ≈ 20%) but is with about 70 per group. Significance depends on effect size and n.
term: paired data = two measurements on the same individual or matched individuals
term: two-sample t-test = a test comparing the means of two independent groups
term: pooled proportion = the combined proportion of successes used in a two-proportion test
q: A 95% interval for μ₁ − μ₂ is (−2.1, 3.4). What can you conclude? | *No convincing evidence of a difference | Group 1 is larger | Group 2 is larger | The means are equal
why: The interval includes 0.
q: Comparing heights of randomly chosen boys and girls uses… | *a two-sample procedure | a paired procedure | a chi-square test | regression
why: The groups are independent.

@unit Inference for Categorical Data: Chi-Square | Goodness of fit, homogeneity, independence
@lesson Chi-square tests
say: Chi-square tests handle categorical data with more than two categories. Three versions cover different questions.
key: χ² = Σ (observed − expected)²/expected. Larger χ² means the data differ more from what H₀ predicts.
- Goodness of fit: does one categorical variable match a claimed distribution? df = categories − 1.
- Homogeneity: do several populations have the same distribution of a categorical variable? (Separate samples.)
- Independence: are two categorical variables associated in one population? (One sample, two variables.)
For two-way tables, expected count = (row total × column total)/grand total, and df = (rows − 1)(columns − 1).
Condition: all expected counts are at least 5.
ex: A die is rolled 60 times. What is the expected count for each face under H₀ that the die is fair?
> 60 rolls ÷ 6 faces
= 10 per face
demo: Is the coin fair?
aim: Flip a coin 100 times and run a chi-square goodness-of-fit test against a 50/50 model.
set: h = 58 | Heads in 100 flips | 30 to 70 by 1
out: chi = (h - 50)^2/50 + (100 - h - 50)^2/50 | χ² statistic
out: P = 100*2*(1 - normcdf(sqrt(chi))) | p-value (%), df = 1
plot: h, P
step: How many heads are needed before you'd reject a fair coin at α = 0.05?
result: χ² = Σ(O − E)²/E with df = 1. You need 60 or more heads (or 40 or fewer) to reject at 5%; 58 heads gives p ≈ 11%, consistent with a fair coin.
term: chi-square statistic = a measure of how far observed counts are from expected counts
term: goodness-of-fit test = a chi-square test comparing one variable's distribution to a claimed distribution
term: test for independence = a chi-square test for association between two categorical variables in one population
term: expected count = the count predicted if the null hypothesis were true
q: A 3 × 4 table has how many degrees of freedom for a chi-square test? | *6 | 12 | 7 | 5
why: (3 − 1)(4 − 1) = 6.
q: Which test checks if M&M colors match the company's claimed percentages? | *Goodness of fit | Independence | Homogeneity | Two-sample t
why: One variable compared to a claimed distribution.

@lesson Choosing the right inference procedure
say: Half the battle on AP free response is picking the right procedure. Here's a quick decision guide.
key: Ask: Is the data categorical or quantitative? One sample, two samples, or paired? Estimating (interval) or testing a claim?
- One categorical proportion: one-proportion z.
- Two proportions: two-proportion z.
- More than two categories or a two-way table: chi-square.
- One mean or paired differences: one-sample t.
- Two independent means: two-sample t.
- Relationship between two quantitative variables: t for the slope.
ex: A researcher wants to estimate the average daily screen time of teens. Which procedure?
> Quantitative (minutes), one sample, estimating
= One-sample t-interval for a mean
tip: Always state the procedure by name, check conditions, show the calculation, and write a conclusion in context. Each part earns points.
term: inference = drawing conclusions about a population from sample data
term: one-proportion z-test = a test about a single population proportion
term: conditions for inference = requirements like randomness and sample size that make a procedure valid
q: Comparing the proportion of left-handed people in two schools uses… | *a two-proportion z procedure | a one-sample t | chi-square goodness of fit | regression t
why: Two independent proportions.
q: Testing whether a new drug changes average blood pressure, measured before and after on the same patients, uses… | *a paired t-test | a two-sample t-test | chi-square | a z-test for proportions
why: Same patients measured twice.

@unit Inference for Slopes | Regression inference, confidence intervals and tests for slope
@lesson Inference for the slope of a regression line
say: Is a relationship in sample data real, or could it be chance? Inference for slope answers that.
The population regression line is μ_y = α + βx. The sample slope b estimates the true slope β.
key: Confidence interval for slope: b ± t*(SE_b), with df = n − 2. Test H₀: β = 0 (no linear relationship) with t = b/SE_b.
Conditions (LINER): Linear relationship, Independent observations, Normal residuals, Equal variance of residuals (no fanning in the residual plot), Random sample.
Computer output gives b, SE_b, t and the P-value. Know how to read it: the slope is in the row for the explanatory variable.
ex: Output shows slope b = 2.4, SE_b = 0.8, n = 22. Find the test statistic for H₀: β = 0.
> t = 2.4/0.8
= t = 3.0, with df = 20
A small P-value means convincing evidence of a linear relationship between x and y in the population.
demo: Inference for a regression slope
aim: A sample shows exam score rising 1.5 points per extra hour of study. Is the slope significantly different from 0?
set: n = 15 | Sample size | 5 to 100 by 1
set: b = 1.5 | Sample slope | 0 to 4 by 0.1
out: se = 8/(3*sqrt(n - 1)) | SE of slope
out: t = b/se | t statistic
out: P = 100*2*(1 - normcdf(t)) | Approx. p-value (%)
out: lo = b - 2*se | 95% CI low
plot: n, P
step: Check whether the 95% interval contains 0 for small and large samples.
result: t = b/SE_b tests H₀: β = 0. Larger samples shrink SE_b, so the same slope becomes significant and the confidence interval excludes 0. (Exact p-values use the t distribution with n − 2 df.)
term: population slope = the true slope β of the linear relationship in the population
term: standard error of the slope = the estimated standard deviation of the sample slope
term: residual plot = a plot of residuals vs. x, used to check regression conditions
q: Degrees of freedom for inference about slope with n = 30 are… | *28 | 29 | 30 | 1
why: df = n − 2.
q: A 95% interval for β is (0.5, 1.9). This suggests… | *a positive linear relationship | no relationship | a negative relationship | β = 0
why: The interval contains only positive values.

@lesson Putting it all together: communicating statistics
say: The AP Statistics exam rewards clear communication as much as correct math. Let's practice writing like a statistician.
key: Every conclusion must be in context, use the language of probability correctly, and not overstate the evidence.
Strong writing habits:
- Name the parameter: "p = the true proportion of all US teens who…"
- State hypotheses in symbols and words.
- Check every condition and say why it's met.
- Link the P-value to α: "Because the P-value of 0.012 < α = 0.05, we reject H₀."
- Conclude in context: "There is convincing evidence that…"
- Never say "accept H₀" or "prove."
ex: Improve: "The P-value is 0.30, so H₀ is true."
> We can't prove H₀; we only fail to reject it
= "Because the P-value of 0.30 > 0.05, we fail to reject H₀. We do not have convincing evidence that [Hₐ in context]."
term: context = the real-world situation of the data, which conclusions must refer to
term: convincing evidence = evidence strong enough (P-value < α) to reject the null hypothesis
q: Which conclusion is worded correctly? | *We do not have convincing evidence that the mean differs from 50 | We proved the mean is 50 | We accept that the mean is 50 | The mean is definitely not 50
why: Failing to reject doesn't prove H₀.
q: Why must conclusions be "in context"? | *They must refer to the real situation and variables | It sounds better | It's optional | To avoid calculations
why: Statistics answers questions about the real world.
`;
