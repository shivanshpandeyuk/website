---
title: "The fundamental problem of causal inference"
paper: "Paper 10 — Econometrics"
year: "Year 3 (Part IIB)"
section: "Micro Econometrics"
description: "Potential outcomes, selection bias and the assumptions needed to identify causal effects."
order: 1
tags: ["economics"]
---

## Lecture Note 1

### 1. Statistics vs. Econometrics

- **Statistics:** Traditionally focuses on **statistical relationships** (correlations, associations).
- **Econometrics:** Focuses on **causal relationships**.
    - *Note:* While we often don't use formal causal notation in standard econometric texts, the goal is almost always to answer: "What happens if we intervene?"

#### Types of Questions

1. **Description:** "How big is the gender wage gap?" (Measurement)
2. **Prediction:** "What will Apple’s stock price be tomorrow?" (Forecasting)
- *Goal:* What **will** happen.
3. **Causal:** "Does playing chess make you smarter?" (Counterfactual)
- *Goal:* What **would** happen if we intervened?
- *Example:* Prediction = "Should I bring an umbrella?" vs. Causation = "Does a rain dance work?"

### 2. Defining Causal Effects

#### The Intervention Definition (Pearl)

A variable $A$ causally affects $B$ if:
$$
Pr(B \mid do(A = a)) \neq Pr(B \mid do(A = a'))
$$
- $do(A=a)$**:** Represents an **intervention** (changing $A$ externally), not just observing $A$.
- **Interpretation:** "All else equal" (ceteris paribus), changing $A$ changes the probability distribution of $B$.
- **Directionality:** Unlike correlation, causation is directional.
- *Example:* Altitude causes Temperature. Cooling the air (changing Temp) does not raise mountains (change Altitude).

#### The Potential Outcomes Framework (Rubin)

This is the standard framework for this course. For individual $i$:
- $Y_{1i}$**:** Outcome if treated ($D=1$).
- $Y_{0i}$**:** Outcome if not treated ($D=0$).
**Individual Causal Effect:**
$$
Effect_i = Y_{1i} - Y_{0i}
$$

#### The Fundamental Problem of Causal Inference

- **Problem:** We never observe both $Y_{1i}$ and $Y_{0i}$ for the same individual at the same time.
- **Reality:** One outcome is observed, the other is a **Missing Counterfactual**.
- **Goal:** Causal inference is essentially a missing data problem—we try to estimate the missing counterfactuals.

### 3. Why Correlation $\neq$ Causation

If we naively compare means ($E[Y|D=1] - E[Y|D=0]$), the result is:
$$
\text{True Causal Effect} + \text{Bias}
$$

#### Three Main Sources of Bias

1. **Spurious Correlation:** Random noise; finding patterns where none exist.
2. **Confounding Variables (Omitted Variable Bias):**
- A third variable $Z$ affects both Treatment $X$ and Outcome $Y$.
- *Example:* Education $\to$ Earnings.
    - *Naive:* Higher education causes higher earnings.
    - *Confounder:* "Ability" or "Background" affects both education choice and earnings potential. The observed relationship mixes the causal effect with **Selection Effects**.
3. **Reverse Causality:**
- $Y$ causes $X$ (or they cause each other simultaneously).
- *Example:* Health $\leftrightarrow$ Hospitals.
    - Sick people go to hospitals.
    - Naive Data: People in hospitals are sicker than people outside.
    - Naive Conclusion: "Hospitals make people ill."

### 4. The Data Problem

#### Experimental Data (The "Gold Standard")

- **Method:** Randomly allocate subjects to Treatment and Control.
- **Benefit:** Randomization ensures that treatment $D$ is uncorrelated with unobserved factors $u$ (confounders).
- **Result:** $E[Y|D=1] - E[Y|D=0]$ is the true causal effect because groups are identical on average *except* for the treatment.

#### Observational Data (The Reality)

- **Problem:** In economics, experiments are often **unethical** or **impossible**.
- *Unethical:* Randomly assigning university education.
- *Impossible:* Randomly assigning race to study judicial bias.
- **Consequence:** We must use observational data where treatment was "selected" by individuals, not assigned by researchers. This introduces **Selection Bias**.

### 5. Solutions: The "Credibility Revolution"

Modern econometrics emphasizes **Research Design** (how we get the variation) over complex statistical fixes.

#### Current Methods Toolkit

- **Randomized Controlled Trials (RCTs):** Generating our own experimental data.
- **Natural Experiments:** Exploiting random variation that happens in the real world.
- **Instrumental Variables (IV/LATE):** Using a variable that affects $X$ but not $Y$ directly.
- **Difference-in-Differences (DiD):** Comparing changes over time between groups.
- **Regression Discontinuity (RDD):** Comparing individuals just above/below a strict cutoff.
- **Matching:** Comparing "similar" individuals.

### 6. Validity

We judge our estimates based on two criteria:

#### Internal Validity

- **Definition:** Are the conclusions valid *for the population being studied*?
- **Requirements:** Unbiasedness, consistency, correct significance levels.
- **Tools:** Robust standard errors (Heteroskedastic/Cluster/HAC).

#### External Validity

- **Definition:** Can the conclusions be **generalized** to other populations, times, or settings?
- **Example:** Does the effect of class size reduction in Tennessee (1980s) apply to the UK (2005)?

## Additional Reading: Linear Regression

> Key Question: "How could I know if this detected correlation is estimating a causal relationship?"

### 1. Linear Regression Recap

#### The Model

The standard linear regression model is estimated via Ordinary Least Squares (OLS):
$y_i = \beta_0 + \beta_1x_{i1} + \dots + \beta_px_{ip} + \varepsilon_i$

#### The Goal: Ceteris Paribus

We want to interpret $\beta_j$ not just as a correlation, but as a causal derivative: 
$$
\beta_j = \frac{\partial E(y|X)}{\partial x_j}
$$
- **Interpretation:** The causal effect of a change in $x_j$ on the expected value of $y$, holding all other factors fixed.

#### The Crucial Assumption

To justify the causal interpretation, we assume **Conditional Mean Independence**: 
$$
E(\varepsilon | x_1, \dots, x_p) = 0
$$
- **Implication:** The average of unobserved factors ($\varepsilon$) is zero for any value of $X$.
- **Logic:** Changing an explanatory variable ($x$) does not change the unobserved factors.
- **Strategy:** We add "controls" (confounders) to the regression to make this assumption more plausible.

### 2. Identification

In Applied Economics, **Identification** generally refers to **"the ability to estimate a causal relationship."**
- **Structural Parameters:** Characterise the true data-generating process (fundamental economic constants).
- **Reduced Form Parameters:** Capture an average causal effect (often policy-relevant).

### 3. Threats to Identification

*Why do we fail to estimate causality?*
The common feature of all threats below is that they cause the regressor to be correlated with the error term: $\text{Corr}(x, \varepsilon) \neq 0$.

#### A. Omitted Variable Bias (OVB)

The most common issue. The true model contains a variable $w$ that we failed to include.
- **Scenario:** True model is $y = \beta_0 + x\beta_1 + \mathbf{w\delta} + \varepsilon$. We estimate without $w$.
- **Result:** If $w$ affects $y$ ($\delta \neq 0$) AND is correlated with $x$, then $\hat{\beta}_1$ is biased. It picks up the influence of $w$.
- **Example:** "Milk Digestion Ability" vs. GDP.
- Correlation exists, but "Milk Digestion" is correlated with geography, history, and institutions (w).
- Simply regressing GDP on Milk Digestion attributes the effect of history to milk.

#### B. Bad Controls (Don't "Condition on Everything")

The temptation is to avoid OVB by adding every variable available. This is dangerous.
- **Definition:** A "Bad Control" is a variable that is **caused by** the treatment ($x$). It is "downstream" of the variable of interest.
- **Mechanism:** Controlling for an intermediate outcome blocks the causal path or induces selection bias (collider bias).
- **Example (Gender Pay Gap):**
- $x$: Gender, $y$: Salary.
- Bad Control: "Job Title" (Executive vs. Entry Level).
- If a company discriminates by not promoting women, Gender $\to$ Job Title.
- If you control for Job Title, you find no gender gap within the title, hiding the true discrimination.
> Rule: Never condition on downstream variables.

#### C. Reverse Causality (Simultaneity)

- **Scenario:** We assume $x \to y$, but in reality $y \to x$ happens simultaneously.
- **Context:** Equilibrium systems (Supply and Demand).
- **Result:** OLS cannot distinguish which direction influence flows.

#### D. Functional Form Misspecification

- **Scenario:** True relationship is non-linear (e.g., $y = \log(x)$), but we fit a linear model.
- **Fix:** Use theory or external info. Do not "specification mine" (running every form until one works).

#### E. Measurement Error

- **Scenario:** We do not observe true $x$, but a noisy version $\tilde{x} = x + u$.
- **Result:** Even if $u$ is random, it creates "attenuation bias" (pushes $\beta$ toward 0). We cannot decompose variation in $y$ correctly.

#### F. Missing Data & Selection Bias

- **Scenario:** Data is not missing at random.
- **Selection Bias:** Whether a data point is observed depends on the dependent variable $y$ (beyond just $x$).
- **Example (Wage Offer):**
- We only see wages for people who work ($w=1$).
- People with high potential wages (e.g., due to unobserved skill $\varepsilon$) are more likely to work.
- Estimating only on workers biases the result.

### 4. Practical Mindset for Part IIB

Since no identification strategy is perfect, adopt a constructive skepticism:
1. **Identify the Threat:** Which of the above is the likely culprit?
2. **Determine Direction:** If the estimate is biased, is it biased *upwards* or *downwards*?
3. **Bounding:** Use the estimate and the known direction of bias to bound where the "true" parameter likely lies.
