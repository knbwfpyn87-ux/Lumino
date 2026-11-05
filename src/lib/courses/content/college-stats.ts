export default String.raw`
@course college-stats | Intro Statistics (College) | College | 📊 | College

// Follows a standard introductory college statistics syllabus (OpenStax Introductory Statistics): descriptive statistics, probability, distributions, sampling and inference.

@unit Data and Probability | Descriptive statistics, probability rules, random variables
@lesson Describing data
say: Statistics turns raw data into understanding. It begins with describing what we see.
key: Variables are categorical or quantitative. Graphs: bar charts and pie charts for categorical; histograms, dotplots, boxplots and stem plots for quantitative.
Describe distributions by shape (symmetric, skewed left or right, unimodal or bimodal), center (mean, median), spread (range, IQR, standard deviation) and outliers (beyond 1.5 × IQR from the quartiles).
The mean is pulled toward the tail; the median is resistant. A z-score z = (x − μ)/σ tells how many standard deviations a value is from the mean.
ex: A test has mean 70 and standard deviation 8. What is the z-score of 86?
> (86 − 70) ÷ 8
= 2
term: median = the middle value of ordered data
term: interquartile range = Q3 − Q1, the spread of the middle 50%
term: standard deviation = a measure of typical distance from the mean
term: z-score = the number of standard deviations a value is from the mean
q: In a right-skewed distribution, typically… | *mean > median | mean < median | mean = median | there is no median
why: The tail pulls the mean up.
q: Which measure is resistant to outliers? | *Median | Mean | Range | Standard deviation
why: It depends only on order.
gen: median, meanFind, stem.zscore

@lesson Probability and random variables
say: Probability quantifies uncertainty, which is the foundation of inference.
key: P(A or B) = P(A) + P(B) − P(A and B). Mutually exclusive events can't both occur. Independent events satisfy P(A and B) = P(A)P(B). Conditional probability P(A given B) = P(A and B)/P(B).
Counting: permutations nPr (order matters) and combinations nCr (order doesn't).
A discrete random variable has expected value E(X) = Σx·P(x). The binomial distribution models n independent trials with success probability p: mean np, standard deviation √(np(1 − p)).
ex: A game pays $10 with probability 0.2 and $0 otherwise. Find E(X).
> 10(0.2) + 0(0.8)
= $2
term: independent events = events where one doesn't affect the other's probability
term: conditional probability = the probability of A given that B occurred
term: expected value = the long-run average of a random variable
term: binomial distribution = the number of successes in n independent trials
q: Two fair coins are tossed. P(both heads) = … | *1/4 | 1/2 | 1/3 | 3/4
why: (1/2)(1/2).
q: The number of ways to choose 2 people from 5 is… | *10 | 20 | 25 | 5
why: 5C2 = 10.
gen: stem.combos, stem.indep, stem.expected, stem.diceSum

@unit Sampling and Inference | Normal model, sampling distributions, confidence intervals, hypothesis tests
@lesson Normal distributions and sampling
say: The normal distribution and the Central Limit Theorem make inference possible.
key: The empirical rule: about 68%, 95% and 99.7% of a normal distribution lies within 1, 2 and 3 standard deviations of the mean.
Sampling: simple random, stratified, cluster and systematic samples; bias comes from convenience samples, voluntary response, undercoverage and nonresponse.
Central Limit Theorem: for large n (about 30 or more), the sampling distribution of x̄ is approximately normal with mean μ and standard error σ/√n, whatever the population's shape.
ex: μ = 100, σ = 20, n = 25. Find the standard error of x̄.
> 20 ÷ √25
= 4
term: empirical rule = the 68–95–99.7 rule for normal distributions
term: sampling distribution = the distribution of a statistic over many samples
term: Central Limit Theorem = sample means are approximately normal for large n
term: standard error = the standard deviation of a sampling distribution
q: About what percent of normal data lies within 2 standard deviations? | *95% | 68% | 99.7% | 50%
why: The empirical rule.
q: Quadrupling the sample size makes the standard error… | *half as large | twice as large | four times as large | unchanged
why: It's divided by √n.

@lesson Confidence intervals and hypothesis tests
say: Inference uses a sample to draw conclusions about a population, with a stated level of uncertainty.
key: A confidence interval is estimate ± critical value × standard error, for example x̄ ± t*·s/√n or p̂ ± z*·√(p̂(1 − p̂)/n). A 95% interval means 95% of such intervals capture the true parameter.
Hypothesis tests: state H₀ and Hₐ, check conditions, compute a test statistic and p-value, and compare to α. If p < α, reject H₀. Type I error: rejecting a true H₀ (probability α). Type II error: failing to reject a false H₀. Power = 1 − P(Type II).
Other tests: two-sample t, chi-square (goodness of fit, independence) and linear regression (slope, r, r²).
term: confidence interval = a range of plausible values for a parameter
term: p-value = the probability of results at least this extreme if H₀ is true
term: Type I error = rejecting a true null hypothesis
term: null hypothesis = the claim of no effect or no difference
q: p = 0.03 with α = 0.05 means you… | *reject H₀ | fail to reject H₀ | accept Hₐ as certain | must increase α
why: p < α.
q: To make a confidence interval narrower, you can… | *increase the sample size | increase the confidence level | add outliers | decrease n
why: Larger n shrinks the standard error.
gen: stem.interval
`;
