---
title: "Static panel models: fixed effects and first differences"
paper: "Paper 10 — Econometrics"
year: "Year 3 (Part IIB)"
section: "Micro Econometrics"
description: "Pooled OLS, fixed effects and first differences, with exogeneity assumptions and tests for individual and time effects."
order: 2
tags: ["economics"]
---

## Lecture Notes

See the attached goodnotes PDF

## Tests for individual and time effects (poolability)

This is just an F-test to see whether time dummies and individual dummies are jointly zero. If they are then there is no gain to using a fixed effects model because the error term is purely idiosyncratic. This means we can use a pooled model.
![](../../assets/notes/y3-p10-topic-2-static-panel-models-fe-fd/01.png)

## Additional Problems

## Readings

## SW, Chapter 10

### Notation

![](../../assets/notes/y3-p10-topic-2-static-panel-models-fe-fd/02.png)

### FE Method (with state fixed effects)

Fixed effects regression is a method for controlling for omitted variables in panel<br>data when the omitted variables vary across entities (states) but do not change over<br>time. Consider the following panel model, with an unobserved regressor $Z$ that reflects the fixed characteristics of each individual: 
$$
Y_{it} = \beta_0 +\beta_1X_{it}+\beta_2 Z_{i} +u_{it}
$$
We want to estimate $\beta_1$, the effect on Y of X holding constant the unobserved state characteristics Z.

FE Method as n intercepts
Because Zi varies from one state to the next but is constant over time, the population regression model in Equation (10.9) can be interpreted as having n intercepts,<br>one for each state. So we can write: $\alpha_i = \beta_0 + \beta_2 Z_i$ then we have 
$$
Y_{it} = \alpha_i +\beta_1X_{it} +u_{it}
$$
- here $\alpha_i$ are **entity fixed effects**
- we have no overall intercept term here $\beta_0$ to avoid the multicollinearity

FE Method as common intercept + n-1 dummies
The state-specific intercepts in the fixed effects regression model also can be<br>expressed using binary variables to denote the individual states. Let D1i be a binary variable that equals 1 when i = 1, let D2i equal 1 when i = 2 and so on. 
$$
Y_{it} = \beta_0 + \beta_1X_{it} + \gamma_2 D2_i + \gamma_3 D3_i + \dots +\gamma_nDn_i + u_{it}
$$
***NOTE: We cannot include all n binary variables plus a common intercept, for if we do the regressors will be perfectly multicollinear (the “dummy variable trap” of Section 6.7), so we arbitrarily omit the binary variable D1i for the first group.***

The equivalence
$$
Y_{it} = \beta_0 + \beta_1X_{it} + \gamma_2 D2_i + \gamma_3 D3_i + \dots +\gamma_nDn_i + u_{it}
$$
Compare this with:
$$
Y_{it} = \alpha_i +\beta_1X_{it} +u_{it}
$$
So the estimated models are:
$$
Y_{it} = \beta_0 + \beta_1 X_{it}, \ \ \ \ \ \ Y_{it} = \alpha_i + \beta_1 X_{it} + \gamma_i
$$
Thus we have this linking relationship.
$$
\alpha_i = \beta_0 + \gamma_i
$$

Extended to k regressors
![](../../assets/notes/y3-p10-topic-2-static-panel-models-fe-fd/03.png)
This binary model (10.13) has  k + n regressors (the k X’s, the n - 1 binary variables, and the intercept). Why this fails:
- **Computational Burden:** If $n$ is large (e.g., 10,000 individuals or firms), you are asking the software to invert a matrix with 10,000+ columns. This is "tedious"/”impossible”.
- **Degrees of Freedom: **You use up $n$ degrees of freedom just estimating intercepts.

### **“Entity-demeaned” OLS Algorithm**

Because of this computational impossibility, we rarely run the "Dummy Variable" version of the regression. Instead, we use the Fixed Effects (Within) Estimator.

Method:<br>1. Calculate the time-average for each entity ($\bar{Y}_i$ and $\bar{X}_i$).
<br>2. Subtract the average from the actual values ("demeaning"): 
$$
(Y_{it} - \bar{Y}_i) = \beta_1(X_{it} - \bar{X}_i) + (\alpha_i - \alpha_i) + (u_{it} - \bar{u}_i) \\ \ \\ \implies \tilde Y_{it} = \beta_1 \tilde X_{it} + \tilde u_{it}
$$
3. Notice the unobserved effect $\alpha_i$ disappears (because it is constant over time). 
This estimator is identical to the OLS estimator of $\beta_1$ obtained by estimation of the fixed effects model in Equation (10.11) using n - 1 binary variables

### FE Method (with time fixed effects)

Time Fixed Effects control for variables that change over time but are constant across states (like national safety standards). Suppose we have two ommitted variables, Z and S: 
$$
Y_{it} = \beta_0 +\beta_1 X_{it} + \beta_2 Z_{i} + \beta_3S_t +u_{it}
$$
To control for these unobserved time-varying factors, we add an intercept ($\lambda_t$) for each time period. We remove the common intercept to avoid multi-collinearity.
$$
Y_{it} = \lambda_t+\beta_1 X_{it} +  u_{it}
$$
This can also be estimated using $T-1$ binary dummy variables. So we get: 
$$
Y_{it} = \beta_0 + \beta_1 X_{it} + \delta_2 B2_t + \dots + \delta_T BT_t + u_{it}
$$
- where B2t = 1 if t = 2 and B2t = 0 otherwise, and so forth

### Two-Way Fixed Effects Model

The combined entity and time fixed effects regression model is 
$$
Y_{it} = \beta_1 X_{it} + \alpha_i + \lambda_t + u_{it}
$$
This model can equivalently be represented using a common intercept, n-1 binary entity indicators and T-1 time binary indicators. So, 
$$
Y_{it} = \beta_0 + \beta_1 Xit + \gamma_2D2_i +\dots + \gamma Dn_i
+ \delta_2 B2_t + \dots + d_TBT_t + u_{it}
$$
While the model conceptually includes binary variables for every entity and every time period, estimating it directly (with $n + T +k$ regressors) is computationally inefficient. Econometric software uses shortcuts.

#### The "Double Demeaning" Algorithm

For a balanced panel, software avoids creating all those dummies by removing the variation in means before running the regression.
1. **Calculate Means:** Compute entity mean ($\bar{Y}_i$) and the time-period mean ($\bar{Y}_t$).
2. **Deviate Data:** Construct "demeaned" variables by subtracting these averages from the observations.
    - *Note: Standard algorithms often perform a "double demeaning" where *$Y_{it}^ = Y_{it} - \bar{Y}_i - \bar{Y}_t + \bar{\bar{Y}}$.\*
3. **Estimate:** Run OLS of the deviated $Y$ on the deviated $X$'s.
**Result:** This yields the correct slope coefficients on $X$ without estimating the nuisance parameters ($\alpha_i, \lambda_t$).

#### The Hybrid Approach

Another computational equivalent often used:
1. Deviate $Y$ and $X$ from their **entity means only** (remove $\alpha_i$).
2. Include the **Time Dummies** explicitly in the regression.
3. Estimate $k + T$ coefficients.

#### Special Case: $T = 2$

If you only have two time periods, the Combined Fixed Effects model is mathematically equivalent to the **"DiD" regression** (Section 10.2) *if* you include an intercept.
- **Regression:** $\Delta Y_i = \beta_0 + \beta_1 \Delta X_i + \Delta u_i$
- The intercept in the "differences" regression captures the time fixed effect (the trend common to all entities between period 1 and 2).

### Assumptions for Valid Inference

To perform valid statistical inference (t-tests, confidence intervals) in panel data, we need specific assumptions.

#### Key Concept 10.3: The Fixed Effects Assumptions

The fixed effects estimator is asymptotically normal if:
1. **Strict Exogeneity:** $E(u_{it} \mid X_{i1}, \dots, X_{iT}, \alpha_i) = 0$.
- The error term is uncorrelated with past, present, and future values of $X$.
- So no confounding variable that is omitted even across time
2. **i.i.d. Across Entities:** Observations are independent *across* entities (states), but can be correlated *within* an entity over time.
- As they should be if they are collected at random from a large population
3. **Large Outliers are Unlikely:** Finite fourth moments.
4. **No Perfect Multicollinearity.**

#### The Problem: Autocorrelation

Assumption 2 allows for **Autocorrelation** (Serial Correlation) within an entity.
- **Definition:** What happens in one year ($u_{it}$) is correlated with what happens in the next year ($u_{it+1}$).
- **Example:** If a state has a "bad year" for traffic accidents due to a persistent local recession, it will likely have a "bad year" next year too.
- **Consequence:** The error terms are not independent within a state.

In general, as long as some omitted factors are autocorrelated, then $u_{it}$ will be autocorrelated.

#### The Solution: Clustered Standard Errors

If we use standard OLS standard errors (or even simple Heteroskedasticity-Robust SEs), we assume errors are independent. In panel data, this leads to **incorrectly small standard errors** and false positives (Type I error).
We must use **Clustered Standard Errors (HAC)**:
- **HAC:** Heteroskedasticity- *and* Autocorrelation-Consistent.
- **Logic:** They allow for arbitrary correlation *within* a cluster (state) but assume independence *across* clusters.
- **Impact:** In the Beer Tax example, the standard error increased from **0.25** (wrong) to **0.36** (clustered), making the t-statistic smaller (more conservative).
> Rule of Thumb: Always use Clustered Standard Errors with panel data to account for serial correlation.

## AP, Chapter 5.1-5.2

### 1. The Core Strategy

When we cannot find a good Instrument (IV) for an omitted variable, we turn to **Panel Data** (repeated observations of the same individuals/units over time).
- **Goal:** Control for unobserved **fixed** omitted variables (\$A_i\$).
- **The Trade-off:** We "punt" on comparing levels (e.g., comparing Person A to Person B) and instead rely on comparing **trends** or changes within the same person.

**Motivating Example:** Do Unions raise wages?
- $y_{it}$**:** Log earnings.
- $d_{it}$**:** Union status.
- **Problem:** Workers in unions might have higher unobserved "ability" that would raise their wages anyway.

#### The Assumption

We assume the unobserved confounder ($A_i$) enters the model **additively** and **does not change over time**: 
$$
E[y_{0it} \mid A_i, X_{it}, t] = \alpha + \lambda_t + A_i\gamma + X_{it}\beta
$$
If the causal effect ($\rho$) is also constant, we get the **Fixed Effects Model**: 
$$
y_{it} = \alpha_i + \lambda_t + \rho d_{it} + X_{it}\beta + \varepsilon_{it}
$$
- $\alpha_i$**:** The "Fixed Effect" (absorbs $\alpha + A_i\gamma$). This captures *everything* about the person that doesn't change (IQ, family background, motivation).
- $\lambda_t$**:** Year effects (inflation, macro shocks).

### 2. Estimation: Getting rid of $\alpha_i$

We treat $\alpha_i$ as a parameter to be estimated. However, estimating 5,000 intercepts for 5,000 people is tedious. We use algebraic shortcuts that remove \$\\alpha_i\$ entirely.

#### Method A: Deviations from Means (The "Within" Estimator)

We calculate the average for each individual over time ($\bar{y}_i$) and subtract it from the observation: 
$$
y_{it} - \bar{y}_i = (\lambda_t - \bar{\lambda}) + \rho(d_{it} - \bar{d}_i) + (X_{it} - \bar{X}_i)\beta + (\varepsilon_{it} - \bar{\varepsilon}_i)
$$
- **Result:** $\alpha_i$ is gone (because $\alpha_i - \bar{\alpha}_i = 0$).
- **Intuition:** We are using the variation *within* a person's history to estimate $\rho$.

#### Method B: First Differences

Instead of subtracting the mean, we subtract the previous period ($t-1$):
$\Delta y_{it} = \Delta \lambda_t + \rho \Delta d_{it} + \Delta X_{it}\beta + \Delta \varepsilon_{it}$
- With $T=2$ (two periods), Method A and Method B are algebraically identical. 
- $T>2$, deviations from means is more efficient (assuming homoskedastic errors).

### 3. The Empirical Reality: OLS vs. Fixed Effects

**Freeman (1984) Study:**
Comparing cross-sectional estimates (comparing different people) vs. Fixed Effects (comparing the same person over time).


| **Data Source** | **Cross Section Estimate (OLS)** | **Fixed Effects Estimate** |
| --- | --- | --- |
| **May CPS** | 0.19 | 0.09 |
| **NLS Young Men** | 0.28 | 0.19 |
| **Michigan PSID** | 0.23 | 0.14 |


- **Pattern:** Fixed Effects estimates are consistently **lower** than Cross-Sectional estimates.
- **Interpretation:**
    1. **Selection Bias in OLS:** High-ability people select into unions, making OLS too high. FE fixes this.
    2. **Measurement Error in FE:** (See below).

### 4. The Pitfall: Measurement Error

While FE solves Omitted Variable Bias (OVB), it aggravates any existing **Measurement Error** (Attenuation Bias).

#### Why is Measurement Error worse in Panel Data?

1. **Persistence:** Economic variables (like Union Status) are "sticky"—they don't change much from year to year.
2. **Noise:** Measurement error (misreporting status) changes randomly every year.
3. **The Ratio:** When you difference the data ($\Delta d_{it}$), you reduce the "good" variation (the persistent signal) but keep the "bad" variation (the random noise).
- The **Signal-to-Noise ratio** drops drastically.
> The "Twins" Warning (Bound & Solon, 1999):
Even when using twins to control for family background (a form of Fixed Effects), we might just be amplifying measurement error or focusing on tiny, unrepresentative differences (e.g., birth weight differences in minutes).

#### Solutions to Measurement Error

1. **Instrumental Variables (IV):** Use a second report (e.g., ask the twin about their brother's schooling) to instrument for the first report.
2. **External Validation:** Use outside data to estimate the error rate and adjust $\hat{\rho}$ manually.

## Past Papers

### When do you use static panel method (FE, within transformation) or dynamic panel method (FD, difference transformation)? The former requires strict exogeneity to work but is definitely a lot easier. The latter only needs weak exogeneity, but needs IV methods to work.

### Q3 - 2015 (TWFE)

![](../../assets/notes/y3-p10-topic-2-static-panel-models-fe-fd/05.png)

### Q9 - 2015 Essay

![](../../assets/notes/y3-p10-topic-2-static-panel-models-fe-fd/06.png)
