---
title: "Matching methods"
paper: "Paper 10 — Econometrics"
year: "Year 3 (Part IIB)"
section: "Micro Econometrics"
description: "Conditional independence, overlap and matching treated and untreated observations to estimate treatment effects."
order: 7
tags: ["economics"]
---

## Lecture Note

### 1. Dealing with Non-Linearity

When we use standard OLS regression to eliminate selection bias, we include control variables (like age, education, or income) to "hold them constant." However, OLS comes with a straitjacket: **it assumes relationships are linear** (straight lines).

**1. The Reality of Non-Linear Data**
In the real world, variables rarely affect each other in perfect straight lines.
- *Example:* Think about the relationship between **Age** and **Earnings**. 
- Earnings usually rise quickly in your 20s and 30s, peak in your 40s and 50s, and then flatten or drop near retirement. That is an inverted U-shape curve, not a straight line.

**2. What Regression Does (The "Best Fit" Line)**<br>If the true relationship is a curve, standard OLS regression cannot capture it perfectly. Instead, regression calculates the **best linear approximation** to that curve.
- Because a straight line cannot perfectly trace a U-shape, there will be gaps between the line and the actual data points.
- This means the regression model has *failed to fully control* for the effect of Age. The leftover, uncontrolled age effects leak into the error term.
- Consequently, even if you assume you have no omitted variables ($E[U|X]=0$), your estimated treatment effect is probably just an approximation of the true causal effect, because the confounders weren't perfectly held constant.

### 2. How Matching Fixes the Problem

Matching bypasses this entire mathematical problem because **it does not estimate a line or a curve**. Instead of trying to find a mathematical formula to represent the effect of Age across the whole population, matching simply physically pairs up identical people.
![](../../assets/notes/y3-p10-topic-7-matching-methods/01.png)
- In other words it only focuses on a local area of the population and compares like-for-like it does *NOT* estimate an entire line.
- It takes a 28-year-old who took the job training (treated) and finds a 28-year-old who did not take the training (untreated).
- It doesn't matter if the relationship between Age and Earnings is a straight line, a U-shape, an S-curve, or a completely random squiggly mess.
- Because both individuals are exactly 28 years old, the effect of being 28 is **perfectly held constant** for both of them.
**Summary: **While regression tries to mathematically hold the *linear effect* of other factors constant (which causes errors if the world isn't linear) , matching holds the factors *literally* constant by comparing exact twins. Therefore, matching's ability to identify the true causal effect does not depend on the linearity of the underlying model at all.
i.e. OLS mathematically holds the *linear effect* of other factors constant; matching literally holds other factors constant by physically pairing identical individuals in the data.
![](../../assets/notes/y3-p10-topic-7-matching-methods/02.png)
Now after matching we are looking at exact same ages
![](../../assets/notes/y3-p10-topic-7-matching-methods/03.png)

### 3. Review: Potential Outcomes and Parameters of Interest

Before conducting matching, we must define exactly what causal parameter we are trying to estimate using the Potential Outcomes framework.

#### The Notation

- **Treatment Status (**$D_i$**):** A binary taking the value of 1 (treated) or 0 (untreated).
- **Potential Outcomes:** \* $Y_{1i}$: Outcome if treated.
- $Y_{0i}$: Outcome if untreated.
- **Observed Outcome**
$$
Y_i = D_i Y_{1i} + (1 - D_i)Y_{0i}
$$
- **Individual Treatment Effect** 
$$
\Delta_i = Y_{1i} - Y_{0i}
$$
(This is never directly observed for a single individual).

#### The Targets of Inference

Depending on the question, matching can help us estimate different parameters:
1. **Average Treatment Effect (ATE):** $E(\Delta_i)$. The average effect if we forced the entire population to take the treatment.
2. **Average Treatment Effect on the Treated (ATET):** $E(\Delta_i | D_i = 1)$. The average effect strictly for the sub-population that actually chose to take the treatment.
3. **Average Treatment Effect on the Untreated (ATEU):** $E(\Delta_i | D_i = 0)$. The theoretical effect the treatment *would* have had on the people who didn't take it.
Note that, 
$$
ATE = Pr(D_i=1) \times ATET + Pr(D_i=0) \times ATEU
$$

### 4. The Core Concept: An Ideal Example

If selection bias is caused by differences in potential outcomes that are related strictly to *observable* confounders, we can control for this by comparing identical individuals.

#### The Trainee vs. Non-Trainee Scenario

Imagine a job training program where we want to know the effect of the program on future earnings.
- If we simply take the naive difference in means between all trainees ($16,426$) and all non-trainees (20,724), we get a negative causal effect of -\$4,298.
- **The Selection Bias:** This negative result is because the groups are fundamentally different. 
- For example, trainees might generally be younger and less experienced than non-trainees, which drags down their average earnings regardless of the training.

#### The Matching Solution

Suppose we know that the *only* difference driving selection into the program is age.
- We look at a 28-year-old trainee and explicitly search our dataset for a 28-year-old non-trainee to serve as their counterfactual.
- We do this for every trainee in the sample, discarding any non-trainees who do not perfectly match the age profile of our treated group.
- After matching, the age distributions of both groups are perfectly identical. We have created a valid counterfactual group.
- Now, we compare the means in the perfectly matched samples. The new estimate is 16,426-13,982 = +\$2,444. 
- By matching, we isolated the true, positive treatment effect.

### 5. Assumptions for Matching

To successfully use matching to identify a causal effect, we must make three strict assumptions. The most critical of these is the CIA, to eliminate selection bias.

#### 1. The Conditional Independence Assumption (CIA)

$$
(Y_{1i}, Y_{0i}) \perp\!\!\!\perp D_i | X_i
$$
- **The Intuition:** Conditional on observable characteristics $X_i$, the potential outcomes (what would happen if treated vs. untreated) are completely independent of whether the person/unit actually received the treatment.
- **What it means:** Individuals cannot select into the program based on unobserved anticipated impacts. 
    - If we control for all relevant observables $X_i$, the treated and untreated groups are essentially identical, making the untreated group a perfect counterfactual.

**Example: The BDUK Broadband Programme**
Imagine evaluating the UK's Building Digital UK (BDUK) programme, which subsidised superfast broadband rollouts to specific areas. We want to know if BDUK ($D_i = 1$) increased local business growth ($Y_i$).
- **The Selection Bias:** BDUK targeted specific areas—often rural, hard-to-reach places that commercial providers ignored. These rural areas likely have inherently lower baseline economic growth than urban areas. 
    - If we just compare BDUK areas to non-BDUK areas, the BDUK areas might look like they are performing worse, simply because they are rural.
- **Applying the CIA:** The CIA states that if we perfectly match areas based on observables $X_i$ (e.g., population density, rurality index, baseline number of businesses, and historical growth trends), the *reason* one area got BDUK and the other didn't is essentially random. 
    - Conditional on these characteristics being same, an area's potential growth ($Y_{1i}, Y_{0i}$) is independent of whether it received the BDUK subsidy ($D_i$). Therefore, the matched non-BDUK area serves as a valid counterfactual for the BDUK area.

#### 2. Implications of the CIA on Treatment Effects

Because the CIA ensures that treated and untreated units with the exact same characteristics $X_i$ are perfectly comparable, it implies that *locally* (within a specific matched subgroup), the treatment effects are identical regardless of who actually took the treatment:
$$
ATE(X_i) = ATET(X_i) = ATEU(X_i)
$$
NOTE, this does **not** imply the global effects are equal ($ATE = ATET = ATEU$).
- Why? Because the distribution of characteristics for the treated group, $f(X_i | D_i = 1)$, is often different from the distribution for the overall population, $f(X_i)$. It is usually a subset.
- *BDUK Example:* The local effect of broadband on a specific type of rural town is the same whether they got it or not ($ATET(X_i) = ATEU(X_i)$). But overall average effect of BDUK on the actual treated areas ($ATET$) might be much higher than the effect it would have if we rolled it out universally ($ATE$), because BDUK specifically targeted areas that lacked infrastructure.
Using the **Law of Iterated Expectations (LIE)**, we calculate the aggregate effects by averaging these local effects over the relevant distributions:
$$
ATET = E_{X_i|D_i=1}[ATET(X_i) | D_i=1]
$$
And, 
$$
ATE = E_{X_i}[ATE(X_i)]
$$

#### 3. The Common Support Assumption

- **The Math:** $0 < Pr(D_i=1 | X_i) < 1$ for all $X_i$.
- **The Intuition:** There is no combination of characteristics $X_i$ where *everyone* gets treated or *nobody* gets treated.
- **What it means:** In the BDUK example, if *all* extremely rural areas received funding, we would have no untreated extremely rural areas to serve as a match. The causal effect can only be estimated for covariate cells that have "common support" (where both treated and untreated units exist). If this assumption is not met, the causal effect is only consistent for the covariate cells that actually have common support.

#### 4. Stable Unit Treatment Value Assumption (SUTVA)

- **The Intuition:** There are no spillovers.
- **What it means:** Treating individual/unit $i$ has absolutely no impact on the outcome of individual/unit $j$. This rules out general equilibrium effects or social interactions. In the BDUK example, if giving a town superfast broadband causes businesses to relocate there from a neighboring untreated town (harming the untreated town's growth), SUTVA is violated as the treatment of town $A$ directly outcome of town B.

#### 5. Deriving the Causal Effect

If we take the naive difference in means between the treated and untreated groups, we get a biased estimate:
$$
E[Y_i | D_i=1] - E[Y_i | D_i=0] = \underbrace{E[Y_{1i} - Y_{0i} | D_i=1]}_{\text{ATET}} + \underbrace{E[Y_{0i} | D_i=1] - E[Y_{0i} | D_i=0]}_{\text{Selection Bias}}
$$
Because of the **CIA**, the selection bias disappears entirely when we condition on $X_i$. 
Specifically, the CIA allows us to substitute the unobservable counterfactual $E[Y_{0i} | X_i, D_i=1]$ with the observable outcome of the control: $E[Y_{0i} | X_i, D_i=0]$.

Here is the step-by-step mathematical derivation of the ATET using matching:
**Step 1: Start with the definition of ATET**
$$
\delta_{ATET} = E[Y_{1i} - Y_{0i} | D_i=1]
$$
**Step 2: Apply the Law of Iterated Expectations (LIE) conditioning on **$X_i$
$$
= E \Big\{ E[Y_{1i} - Y_{0i} | X_i, D_i=1] \Big| D_i=1 \Big\}
$$
**Step 3: Separate the expectations inside the bracket**
$$
= E \Big\{ E[Y_{1i} | X_i, D_i=1] - E[Y_{0i} | X_i, D_i=1] \Big| D_i=1 \Big\}
$$
**Step 4: Apply the CIA**
*(Here, *$E[Y_{0i} | X_i, D_i=1]$* is counterfactual. The CIA allows us to replace it with the observable untreated group)*
$$
= E \Big\{ E[Y_{1i} | X_i, D_i=1] - E[Y_{0i} | X_i, D_i=0] \Big| D_i=1 \Big\}
$$
**Step 5: Replace potential outcomes with actual outcomes **$Y_i$
$$
= E \Big\{ E[Y_i | X_i, D_i=1] - E[Y_i | X_i, D_i=0] \Big| D_i=1 \Big\}
$$
**Step 6: Define the local difference as **$\delta_x$<br>Let $\delta_x = E[Y_i | X_i, D_i=1] - E[Y_i | X_i, D_i=0]$. This is difference in mean outcomes for treated and non-treated for a specific combination of $X$ (a covariate cell). Thus we can finally say that:
$$
\delta_{ATET}\equiv E \Big\{ \delta_x \Big| D_i=1 \Big\}
$$
Using the equation above, we can write estimators. Assuming the regressors are discrete, we calculate the probability term for each covariate cell $x$. That is after all how you do an expectation, and recall this expectation was over xs.

**Step 7: Calculate Estimator for ATET**
To find causal effect strictly for the treated, we weight the local differences ($\delta_x$) by the probability of being in that cell *given that you were treated*: *Note that this relies on some probability of being treated or untreated for a covariate cell.*
$$
\hat{\delta}_{ATET} = \sum \delta_x P(X_i = x | D_i = 1)
$$
- Basically we are summing all the differences in mean outcomes for treated and non-treated, over the different combination of X
- The weight assigned to each is the probability of that combination being realised; we weight combinations that are more prevalent by more.

**Estimator for ATE: **To find the causal effect for the entire population , we weight the local differences ($\delta_x$) by the overall probability of being in that cell. 
$$
\hat{\delta}_{ATE} = \sum \delta_x P(X_i = x)
$$

### 6. Matching vs. OLS: A Question of Weighting

Even though both OLS regression and matching aim to control for observables, they can yield different estimates for the causal effect. 
This happens because they apply different mathematical **weights** to the covariate cells.
- **Regression (OLS) Weighting:** OLS puts the most weight on covariate cells where the conditional variance of the treatment status is the highest. 
    - In practice, this means OLS gives the most weight to groups where the number of treated and non-treated individuals is roughly equal (a 50/50 split).
- **Matching Weighting:** As shown in the ATET estimator, matching puts the most weight on covariate cells that are *most likely to be treated*.
**Example:** In a study on the causal effect of military service on earnings, the matching estimates were found to be lower than the regression estimates. 
- This occurs because the individuals most likely to join the army (who get heavily weighted in matching) are actually those who benefit the least from the treatment (e.g., they already possess higher ability or education).
    ![](../../assets/notes/y3-p10-topic-7-matching-methods/04.png)

**The Common Support Assumption in OLS**
OLS gives zero weight to covariate cells that lack common support (cells that don't have both treated and untreated observations) - this is same as matching. Mathematically, OLS applies weights proportional to $P(D_i=1|X_i=x)[1-P(D_i=1|X_i=x)]$. If common support is violated, the causal effect estimated is only consistent for the specific covariate cells that maintain common support.

### 7. Simple Matching Processes

![](../../assets/notes/y3-p10-topic-7-matching-methods/05.png)

### 8. Advanced Matching: Propensity Scoring

#### Motivation: Multiple Continuous Covariates

When regressors are discrete (like gender or a binary race variable), matching is quick and simple because there are few covariate cells.
- **One Continuous Regressor:** If we have one continuous variable like Age, we can use "nearest neighbour" matching—finding an untreated person of the exact same age, or if none exist, the person closest in age (e.g., within one year). 
    - If common support is weak, this distance between matches could be quite large.
- **Multiple Continuous Regressors:** Things get extremely tricky if we want to match on age, education, income, race, and gender simultaneously. 
    - A covariate cell becomes impossibly specific: e.g., an African-American woman, 30-32 years old, with 14-15 years of education, earning $100,000 -$110,000. 
    - We cannot hope to find both a treated and an untreated person in every single one of these highly specific cells.

#### The Propensity Score

To solve the curse of dimensionality, Rosenbaum and Rubin (1983) provided an incredibly powerful solution. What if we could combine all our regressors into a single scalar number, and just match on that?

**Definition:** The **propensity score** is defined as the probability of being treated, conditional on your covariates: $p \equiv E[D_i|X_i] = P(D_i=1|X_i)$.

**The Propensity Score Theorem: **If potential outcomes are independent of treatment conditional on the multivariate covariates $X_i$ (the standard CIA), then they are *also* independent of treatment conditional strictly on the scalar propensity score $p(X_i)$.
    - It is the same thing after all, you just collapsed multivariate X into a score
$$
CIA \Rightarrow (Y_{i1}, Y_{i0}) \perp\!\!\!\perp D_i | p(X_i)
$$
**Proof of the Theorem: **To prove this, we just need to show that the probability of being treated, conditional on potential outcomes and the propensity score, does not actually depend on the potential outcomes ($Y_{ji}$).<br>
Step 1: Start with the conditional probability.
Step 2: Apply the Law of Iterated Expectations (conditioning on $X_i$).
Step 3: Since $p(X_i)$ is just a deterministic function of $X_i$, we can drop it from the inner expectation.
Step 4: **Apply the CIA.** Treatment $D_i$ is independent of potential outcomes $Y_{ji}$ conditional on \$X_i\$.
Step 5: Substitute the definition of the propensity score ($E[D_i | X_i] = p(X_i)$).
Step 6: Since $p(X_i)$ is already given in the outer conditioning, the expectation is simply $p(X_i)$. *The final result does not contain *$Y_{ji}$*, we have proven treatment status is independent of potential outcomes conditional on propensity score.*
![](../../assets/notes/y3-p10-topic-7-matching-methods/06.png)
**Benefits:** We no longer need to match on a massive, high-dimensional vector; we only need to match on the simple univariate probability of being treated. We only need to control for factors that actually influence the likelihood of treatment.
1. Propensity Score Matching in Practice<br>Implementing this in practice involves a two-step procedure:
2. **Estimate the Score:** First, estimate the probability of treatment conditional on $X_i$, usually by running a logit or probit regression. (You should include polynomial terms for continuous variables to get a better estimate ).
3. **Match:** Construct the matching estimator by pairing people with similar calculated propensity scores.

#### **Inverse Probability Weighting (IPW)**

Alternatively, you can estimate the causal effect *without* going through the physical matching procedure, using a weighting method. You can correct for non-random sampling by weighting observations by the reciprocal of their probability of selection.

The expected potential outcomes can be rewritten as:
$$
E[Y_{1i}] = E \left[ \frac{Y_i D_i}{p(X_i)} \right]
$$
$$
E[Y_{0i}] = E \left[ \frac{Y_i (1-D_i)}{1-p(X_i)} \right]
$$
**ATE via Weighting:**
$$
E[Y_{1i} - Y_{0i}] = E \left[ \frac{Y_i (D_i - p(X_i))}{p(X_i)(1 - p(X_i))} \right]
$$
**ATET via Weighting:**
$$
E[Y_{1i} - Y_{0i} | D_i=1] = E \left[ \frac{Y_i (D_i - p(X_i))}{P(D_i=1)(1 - p(X_i))} \right]
$$
*(In an actual sample, you simply replace these expectations with the sample averages)*.

#### Diagnostics

The entire objective of matching (and regression) is to compare "like with like" (apples with apples). **The Check:** After performing your matching, you must check if your propensity scores are **balanced** between  treatment and control group.
![](../../assets/notes/y3-p10-topic-7-matching-methods/07.png)
- **The Logic:** If two matched groups are statistically identical in all observable ways, we they are also identical in all unobservable ways. If balance is achieved, the difference in mean outcomes can reasonably be interpreted as true causal effect.
- **How to Check:** In statistical software (like R), we check standardized mean differences, raw empirical quantile-quantile (eQQ) differences, and conduct statistical tests like T-tests and Kolmogorov-Smirnov (KS) tests.
- **Results:** Matching on discrete regressors will typically result in perfect balance (zero differences, p-values of 1). However, matching on continuous variables or propensity scores may fail to achieve perfect balance.
- **Genetic Matching:** If standard matching fails to balance the covariates, researchers can use Genetic Matching—advanced genetic algorithms that iteratively search for the specific matches that yield the best possible balance across all variables.

## Reading

### Q4 2017 - part (d)

Derivation of the validity of the matching estimator
![](../../assets/notes/y3-p10-topic-7-matching-methods/08.png)
