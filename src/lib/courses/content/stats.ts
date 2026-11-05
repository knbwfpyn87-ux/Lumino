export default String.raw`
@course stats | Statistics | Standard | 📊 | Math

@unit Describing Data | Types of data and displays, center and spread
@lesson Types of data and displays
say: Statistics is the science of learning from data. It starts with knowing what kind of data you have.
Categorical data puts individuals into groups (favorite sport); quantitative data are numbers you can average (height). Displays:
- Categorical: bar graphs and pie charts.
- Quantitative: dotplots, histograms, stemplots and boxplots.
key: Describe a distribution's shape (symmetric, skewed left or right), center, spread and any outliers.
A distribution is skewed right if it has a long tail to the right (like incomes). It's skewed left if the tail is on the left.
tip: Ask "Does it make sense to average this?" If yes, it's quantitative. Zip codes are numbers, but averaging them is meaningless, so they're categorical.
term: categorical variable = a variable that places individuals into groups
term: quantitative variable = a variable with numerical values
term: histogram = a graph showing the distribution of quantitative data in intervals
term: skewed right = a distribution with a long tail to the right
q: Which is a quantitative variable? | *Height in centimeters | Eye color | Favorite food | Zip code
why: Heights are measurements you can average.
q: Most people earn moderate incomes, but a few earn huge amounts. The distribution is… | *skewed right | skewed left | symmetric | uniform
why: The long tail extends toward high values.
gen: median

@lesson Center and spread
say: Two numbers summarize most data sets: where the center is and how spread out values are.
key: Mean = average; median = middle value. Range = max − min. IQR = Q3 − Q1. Standard deviation measures typical distance from the mean.
The five-number summary (min, Q1, median, Q3, max) is shown by a boxplot. Outliers fall below Q1 − 1.5·IQR or above Q3 + 1.5·IQR.
ex: Data: 2, 4, 5, 7, 9, 10, 30. Find the median and check if 30 is an outlier.
> Median: 7. Q1 = 4, Q3 = 10, IQR = 6
> Upper fence: 10 + 1.5(6) = 19
= Median 7; 30 is an outlier
Use median and IQR for skewed data; use mean and standard deviation for symmetric data.
demo: Spread and one changing value
aim: Four quiz scores are 10, 12, 14 and 16. Change the fifth score and watch the mean and standard deviation.
set: x = 13 | Fifth score | 0 to 30 by 1
out: m = (52 + x)/5 | Mean
out: sd = sqrt(((10 - m)^2 + (12 - m)^2 + (14 - m)^2 + (16 - m)^2 + (x - m)^2)/4) | Standard deviation
plot: x, sd
step: Where is the standard deviation smallest? What does an outlier do?
result: Standard deviation measures typical distance from the mean. It's smallest when the new score sits in the middle and grows quickly as the value moves away, because deviations are squared.
term: standard deviation = a measure of how spread out data are from the mean
term: five-number summary = minimum, Q1, median, Q3 and maximum
term: outlier = a value far from the rest of the data
q: Which measure of center resists outliers? | *Median | Mean | Range | Standard deviation
why: The median depends only on position.
q: Q1 = 12 and Q3 = 20. The IQR is… | *8 | 32 | 16 | 4
why: 20 − 12 = 8.
gen: meanFind, median

@unit The Normal Distribution | z-scores, the empirical rule
@lesson z-scores and the normal curve
say: The bell-shaped normal curve appears everywhere in nature. z-scores let us compare values on it.
key: z = (x − mean) ÷ standard deviation. It tells how many standard deviations a value is from the mean.
Empirical rule: in a normal distribution, about 68% of data is within 1 standard deviation, 95% within 2, and 99.7% within 3.
ex: Heights have mean 66 in and standard deviation 3 in. What percent are between 60 and 72 inches?
> 60 and 72 are 2 standard deviations from the mean
= about 95%
z-scores let you compare apples and oranges: a test score with z = 1.5 is more impressive than one with z = 0.8, even on different tests.
term: z-score = the number of standard deviations a value is from the mean
term: normal distribution = a symmetric, bell-shaped distribution
term: empirical rule = 68–95–99.7% of data within 1, 2 and 3 standard deviations
q: A score has z = 0. It is… | *equal to the mean | an outlier | the maximum | one standard deviation above
why: It's zero standard deviations from the mean.
q: About what percent of normal data is within 1 standard deviation? | *68% | 95% | 50% | 99.7%
why: Empirical rule.
gen: stem.zscore

@lesson Percentiles and comparing values
say: Percentiles and z-scores answer questions like "How does my score compare to everyone else's?"
A percentile is the percent of values at or below a given value. Scoring at the 90th percentile means you did as well as or better than 90% of test takers.
key: In a normal distribution, z = 1 is about the 84th percentile, z = 2 is about the 97.5th percentile, and z = −1 is about the 16th percentile.
ex: Ana scored 85 on a test with mean 75 and SD 5. Ben scored 90 on a test with mean 80 and SD 10. Who did better relative to their class?
> Ana: z = (85 − 75)/5 = 2
> Ben: z = (90 − 80)/10 = 1
= Ana did better relative to her class
demo: SAT score percentiles
aim: SAT scores are roughly normal with mean 1050 and standard deviation 210. Find the percentile of any score.
set: x = 1200 | Score | 400 to 1600 by 10
out: z = (x - 1050)/210 | z-score
out: pct = 100*normcdf(z) | Percentile
plot: x, pct
step: What score is at the 90th percentile?
result: Convert to a z-score and use the normal curve: 1200 is z = 0.71, about the 76th percentile. The 90th percentile is near z = 1.28, a score of about 1320.
term: percentile = the percent of values at or below a given value
term: standardizing = converting values to z-scores to compare them
q: Scoring at the 75th percentile means… | *75% scored at or below you | you got 75% correct | 75 people took the test | you're in the top 75%
why: Percentiles describe relative standing.
q: z = −2 means the value is… | *2 standard deviations below the mean | an error | above average | the median
why: Negative z means below the mean.

@unit Relationships Between Variables | Scatterplots and correlation, regression lines
@lesson Scatterplots and correlation
say: Do two variables move together? Scatterplots let us see the relationship, and correlation measures it.
A scatterplot graphs pairs of quantitative data. Describe its direction (positive or negative), form (linear or curved) and strength.
key: The correlation coefficient r is between −1 and 1. Values near ±1 mean a strong linear relationship; near 0 means weak or none.
oops: Correlation is not causation. Ice cream sales and sunburns are correlated because both increase in summer; ice cream doesn't cause sunburn.
A lurking variable is a hidden variable that affects both variables in a relationship.
term: scatterplot = a graph of paired quantitative data
term: correlation coefficient = r, measuring the strength and direction of a linear relationship
term: lurking variable = a hidden variable that influences both variables being studied
q: r = 0.95 indicates… | *a strong positive linear relationship | no relationship | a strong negative relationship | causation
why: Values near 1 are strong and positive.
q: Shoe size and reading level are correlated in children. The lurking variable is likely… | *age | shoe brand | book length | height of shelves
why: Older children have bigger feet and read better.

@lesson Regression lines
say: A regression line is the best-fitting line through a scatterplot. It helps us make predictions.
key: The least-squares regression line is ŷ = a + bx. The slope b tells the predicted change in y for each one-unit increase in x.
A residual is actual − predicted. Positive residuals mean the point is above the line.
ex: ŷ = 20 + 5x predicts a test score from hours studied. Predict the score for 6 hours and interpret the slope.
> ŷ = 20 + 5(6) = 50
= Predicted score 50; each extra hour of study predicts 5 more points
oops: Don't extrapolate far beyond the data. Predicting a score for 40 hours of study would be unreliable.
r² tells the percent of variation in y explained by the line.
demo: Ice cream and temperature
aim: An ice cream shop's sales follow the regression line ŷ = −50 + 8x, where x is temperature in °C.
set: x = 25 | Temperature (°C) | 10 to 40 by 1
set: y = 160 | Actual cones sold | 0 to 300 by 5
out: yhat = -50 + 8*x | Predicted cones
out: res = y - yhat | Residual (actual − predicted)
plot: x, yhat
step: Interpret the slope in context. Find the residual for 160 cones on a 25 °C day.
result: The slope means about 8 more cones per extra degree. A positive residual means the model underestimated. Predicting far outside the data range (extrapolation) is risky.
term: regression line = the line that best fits the data in a scatterplot
term: residual = actual value minus predicted value
term: extrapolation = predicting outside the range of the data
q: A point has actual y = 12 and predicted ŷ = 9. Its residual is… | *3 | −3 | 21 | 0.75
why: 12 − 9 = 3.
q: In ŷ = 4 + 2x, what does 2 mean? | *y increases by 2 for each 1-unit increase in x | y starts at 2 | x increases by 2 | the correlation is 2
why: The slope is the rate of change.
gen: alg.lineEq

@unit Collecting Data and Probability | Sampling and experiments, probability rules
@lesson Sampling and experiments
say: How data is collected determines whether it can be trusted. Let's learn to spot good and bad studies.
A population is the whole group; a sample is the part studied. A random sample gives every individual an equal chance of selection, reducing bias.
key: Biased samples (voluntary response, convenience) don't represent the population, even if they're large.
In an observational study, researchers observe without intervening. In an experiment, they impose treatments. Only randomized experiments can show cause and effect.
Good experiments use a control group, random assignment, and enough subjects (replication). Blinding prevents expectations from affecting results.
term: population = the entire group of interest
term: random sample = a sample where every member has an equal chance of selection
term: experiment = a study where researchers assign treatments
term: control group = a group that receives no treatment or a placebo
q: Which can show cause and effect? | *A randomized experiment | A survey | An observational study | A voluntary poll
why: Random assignment balances other variables.
q: A TV poll asks viewers to call in their opinion. This is… | *voluntary response bias | a random sample | an experiment | a census
why: Only people with strong opinions call.

@lesson Probability rules
say: Probability gives us a language for chance. A few rules handle most situations.
key: P(A) is between 0 and 1. P(not A) = 1 − P(A). For independent events, P(A and B) = P(A) × P(B). P(A or B) = P(A) + P(B) − P(A and B).
ex: Draw a card from a standard deck. P(king or heart)?
> P(king) = 4/52, P(heart) = 13/52, P(king of hearts) = 1/52
> 4/52 + 13/52 − 1/52
= 16/52 = 4/13
Conditional probability P(A | B) is the probability of A given that B happened. Two-way tables help compute it.
demo: The birthday problem
aim: How many people need to be in a room before two probably share a birthday?
set: n = 23 | People in the room | 2 to 80 by 1
out: P = 100*(1 - exp(-n*(n - 1)/730)) | Chance of a shared birthday (%)
plot: n, P
step: Guess first, then find where the chance passes 50%.
result: Only 23 people give about a 50% chance, and 50 people give 97%, because the number of pairs n(n − 1)/2 grows fast. Probability often surprises our intuition.
term: complement = the event that A does not happen
term: independent events = events where one doesn't affect the probability of the other
term: conditional probability = the probability of an event given that another occurred
q: P(rain) = 0.35. P(no rain) = | *0.65 | 0.35 | 1.35 | 0
why: 1 − 0.35.
q: Roll two dice. P(both show 6)? | *1/36 | 1/6 | 1/12 | 2/6
why: 1/6 × 1/6.
gen: stem.indep, stem.combos

@unit Inference | Confidence intervals and margin of error, hypothesis tests
@lesson Confidence intervals
say: We almost never know the true value for a whole population. Confidence intervals give a range of plausible values.
key: Confidence interval = estimate ± margin of error. A 95% confidence level means that if we repeated the sampling many times, about 95% of intervals would capture the true value.
ex: A poll finds 54% support a policy with a margin of error of ±3%. Interpret it.
> Interval: 51% to 57%
= We're 95% confident the true support is between 51% and 57%
Larger samples give smaller margins of error. Higher confidence levels give wider intervals.
demo: Poll margin of error
aim: A poll finds a percentage supporting a candidate. How does the 95% margin of error depend on the sample size?
set: n = 1000 | Sample size | 100 to 3000 by 50
set: p = 50 | Sample percentage (%) | 10 to 90 by 5
out: ME = 196*sqrt(p/100*(1 - p/100)/n) | Margin of error (± points)
out: lo = p - ME | Interval low (%)
out: hi = p + ME | Interval high (%)
plot: n, ME
step: How many people must you poll to cut the margin of error in half?
result: ME = 1.96√(p̂(1 − p̂)/n). About 1,000 people give ±3 points; halving the margin needs four times the sample, because n is under a square root.
term: confidence interval = a range of plausible values for a population parameter
term: margin of error = the maximum likely difference between the sample result and the true value
term: confidence level = how often the method captures the true value in the long run
q: How can you make a margin of error smaller? | *Use a larger sample | Use a smaller sample | Increase the confidence level | Ask fewer questions
why: More data gives more precision.
q: A poll says 40% ± 4%. The interval is… | *36% to 44% | 40% to 44% | 0% to 40% | 4% to 40%
why: 40 − 4 and 40 + 4.

@lesson Hypothesis tests
say: A hypothesis test asks whether data provides convincing evidence against a claim.
key: The null hypothesis (H₀) states no effect or no difference. The alternative hypothesis (Hₐ) is what we suspect. A small P-value (usually less than 0.05) is evidence against H₀.
The P-value is the probability of getting results as extreme as ours if H₀ were true.
ex: A coin is flipped 100 times and lands heads 70 times. A test of H₀: the coin is fair gives a P-value of 0.0001. Conclusion?
> P-value < 0.05
= Reject H₀; there is strong evidence the coin is not fair
Errors: a Type I error rejects a true H₀; a Type II error fails to reject a false H₀.
term: null hypothesis = the claim of no effect or no difference
term: P-value = the probability of results this extreme if the null hypothesis is true
term: statistically significant = a result unlikely to occur by chance alone
q: A P-value of 0.30 means… | *the result could easily happen by chance; don't reject H₀ | strong evidence against H₀ | H₀ is proven true | the study is wrong
why: Large P-values aren't convincing.
q: Rejecting a true null hypothesis is a… | *Type I error | Type II error | correct decision | margin of error
why: That's the definition of a Type I error.
`;
