---
title: "Difference-in-differences"
paper: "Paper 10 — Econometrics"
year: "Year 3 (Part IIB)"
section: "Micro Econometrics"
description: "Parallel trends, two-way fixed effects and treatment effects when timing differs across groups."
order: 5
tags: ["economics"]
---

## Lecture Notes

### 1. Introduction and Intuition

Difference-in-Differences (DiD) is a quasi-experimental tool used to identify causal effects of a binary treatment (e.g., a new government policy). It is distinct from panel data because it uses observations of larger cohorts (like states or countries) over time rather than tracking specific individuals.

#### The Logic: "Two Wrongs Make a Right"

DiD combines two imperfect experimental designs to create a valid one by removing specific biases.
1. **The "Before and After" Comparison:**
- *Method:* Compare the same unit before and after treatment.
- *Drawback:* Fails to control for **time trends**. For example, if unemployment rises after a minimum wage hike, it might just be due to a recession, not the policy.

1. **The "Treated vs. Non-Treated" Comparison:**
- *Method:* Compare treated units to non-treated units at the same time.
- *Drawback:* Fails to control for **selection bias**. Treated regions might simply be wealthier or have different industrial structures than non-treated regions .

**The Solution:** DiD subtracts the "control" group's change from the "treatment" group's change. By doing so, it removes the time trend (assumed common to both) and the group-specific differences (assumed constant).

DiD requires:<br>• Data with a time dimension: at least two repeated cross sections<br>• An exogenous treatment: no self-selection into the event and no change of behaviour in antcipation of the event<br>• Measure the outcomes of interest before and after the event<br>• Two groups: one is impacted by the event and the other is not

### 2. The DiD Estimator (Derivation)

We formally derive the estimator using the Potential Outcomes framework.

#### Notation

- $Y_{ist}$: Outcome for individual $i$ in state $s$ at time $t$.
- $s \in \{Treated, Control\}$: The group indicator (e.g., NJ vs PA).
- $t \in \{Pre, Post\}$: The time indicator (e.g., Feb vs Nov).
- $D_{st}$: A dummy variable equal to 1 if state $s$ is treated in period $t$.

#### The Structural Assumption

We assume the outcome is determined by three additive components: a state fixed effect ($\gamma_s$), a time fixed effect ($\lambda_t$), and the treatment effect ($\beta$).
$$
E[Y_{ist} | s, t] = \gamma_s + \lambda_t + \beta D_{st}
$$

#### Step-by-Step Subtraction

To isolate $\beta$, we calculate the conditional expectations for all four groups:
1. **Control Group (Pre):** $E[Y|C, Pre] = \gamma_C + \lambda_{Pre}$
2. **Control Group (Post):** $E[Y|C, Post] = \gamma_C + \lambda_{Post}$
3. **Treated Group (Pre):** $E[Y|T, Pre] = \gamma_T + \lambda_{Pre}$
4. **Treated Group (Post):** $E[Y|T, Post] = \gamma_T + \lambda_{Post} + \beta$ (This is the only group with the treatment active)

**First Difference (Time Difference within groups):**
- Change in Control: $(\gamma_C + \lambda_{Post}) - (\gamma_C + \lambda_{Pre}) = \lambda_{Post} - \lambda_{Pre}$ 
- (This captures the pure time trend).
- Change in Treated: $(\gamma_T + \lambda_{Post} + \beta) - (\gamma_T + \lambda_{Pre}) = (\lambda_{Post} - \lambda_{Pre}) + \beta$ 
- (This captures the time trend + treatment effect).

**Second Difference (Difference between groups):**
Subtract the Control change from the Treated change: 
$$
[(\lambda_{Post} - \lambda_{Pre}) + \beta] - [\lambda_{Post} - \lambda_{Pre}] = \beta
$$
Thus, the DiD estimator is:
$$
\hat{\beta}_{DiD} = (\bar{Y}_{T, Post} - \bar{Y}_{T, Pre}) - (\bar{Y}_{C, Post} - \bar{Y}_{C, Pre})
$$
![](../../assets/notes/y3-p10-topic-5-did/01.png)

### 3. Key Identification Assumption: Parallel Trends

The math above relies entirely on the **Parallel Trends Assumption**.
**Definition:** In the absence of treatment, the average outcomes for the treated and control groups would have followed parallel paths.
- That is to say there is selection bias only in the levels; not changing over time.
![](../../assets/notes/y3-p10-topic-5-did/02.png)
Parallel trends is not “verified” by software. It is a maintained hypothesis.
**Formal Statement:** 
$$
E[Y_{0}|T, Post] - E[Y_{0}|T, Pre] = E[Y_{0}|C, Post] - E[Y_{0}|C, Pre]
$$
- **Crucial Note:** This assumption implies that the selection bias ($\gamma_T - \gamma_C$) is stable over time.

#### Verifying the Assumption

You cannot prove this assumption holds because you never observe the counterfactual (treated unit without treatment). 
However, you can check **Pre-Trends**:
- If data exists for multiple periods *before* the treatment, you can plot them.
- If the lines are parallel prior to the treatment, it increases confidence that they would have remained parallel in the absence of the shock.
- *Warning:* If pre-trends diverge, the DiD design is invalid.
- Still, parallel pre-trends does not mean there is necessarily parallel post-trends. You also cannot rule out shocks that coincide with the treatment itself.
![](../../assets/notes/y3-p10-topic-5-did/03.png)

### 4. Regression Implementation

While simple averages work, regression is preferred because it provides standard errors and allows use to throw in control variables.

#### The Basic Equation

$$
Y_{ist} = \alpha + \gamma Treat_s + \lambda Post_t + \beta (Treat_s \times Post_t) + \epsilon_{ist}
$$
- $\alpha$: Constant term (Baseline for Control, Pre).
- $Treat_s$: Dummy for the treatment group (Captures the group difference $\gamma_T - \gamma_C$).
- $Post_t$: Dummy for the post-period (Captures the common time trend $\lambda_{Post} - \lambda_{Pre}$).
- We are assuming that this time trend is common! This is parallel trends.
- $Treat_s \times Post_t$: Interaction term. This variable is 1 **only** for the treated group in the post-period. Its coefficient, $\beta$, is the DiD estimate.

#### Extension: Fixed Effects

For more complex data with multiple units and time periods, we replace the simple dummies with fixed effects:
$$
Y_{it} = \alpha + \mu_i + \delta_t + \beta D_{it} + \epsilon_{it}
$$
- $\mu_i$: Individual/State fixed effects (absorbs all time-invariant unit characteristics).
- $\delta_t$: Time fixed effects (absorbs all unit-invariant time shocks).
- $\beta$: Is the treatment effect as before.
- This is mathematically equivalent to the basic DiD but scales to larger datasets.

### 5. Case Studies

#### A. Minimum Wage: Card and Krueger (1994)

- **Context:** NJ raised minimum wage (\$4.25 to \$5.05) in 1992; PA did not.
- **Analysis:** Compared employment in restaurants in NJ (Treated) vs PA (Control).
- **Result:** Employment in NJ actually *increased* relative to PA (DiD estimate +2.76). This contradicted standard economic theory.
- **Critique (Parallel Trends):** Looking at a longer time series, employment trends in NJ and PA were volatile and often moved in opposite directions *before* the policy. 
    - *This suggests the parallel trends assumption likely did not hold, making PA a poor counterfactual .*

#### B. School Term Length: Pischke (2007)

- **Context:** German states shifted school start dates, resulting in "short school years" for specific cohorts.
- **Analysis:** Compared grade repetition rates between affected states and Bavaria (Control).
    ![](../../assets/notes/y3-p10-topic-5-did/04.png)
- **Visual Evidence:** The graph shows nearly identical flat trends for both groups, followed by a sharp "jump" for the affected cohorts, then a return to baseline. This provides strong visual support for the parallel trends assumption.

#### C. The Mariel Boatlift (1980)

- **Context:** Sudden influx of 125,000 Cuban immigrants to Miami.
- **Design:** Compared Miami (Treated) to Atlanta, Houston, LA, and Tampa (Controls).
- **Result:** No significant effect on native wages or unemployment compared to the control cities.

### 6. SUTVA and the Control Group Trade-off

A major challenge in DiD is selecting the control group. There is a fundamental trade-off:
1. **Similarity (Pro-Parallel Trends):** You want control units that are very similar to the treated unit (e.g., neighbouring states) so their trends likely match.
2. **Interference (Anti-SUTVA):** If units are *too* close (geographically or economically), the treatment might "spill over".
    1. Geographic spillover
    2. Market Interactions
    3. Migration and commuting responses
    - *Example:* If NJ raises wages, PA workers might commute to NJ. This reduces labor supply in PA, artificially raising wages there. This violates the Stable Unit Treatment Value Assumption (SUTVA), as the control group is indirectly affected .
**Conclusion:** Improving the parallel trends assumption (by picking similar neighbors) often worsens the SUTVA assumption (by increasing spillover risk).

### 7. Advanced Extensions

#### Treatment Intensity (Continuous Treatment)

Instead of a binary (0/1) treatment, the "treatment" can be continuous.
**Example (Card 1992):** Federal minimum wage increase.
![](../../assets/notes/y3-p10-topic-5-did/05.png)
- **Variation:** The *impact* depends on what fraction of people in a state were earning below the new minimum. 
    - *This is more nuanced then just slapping 1 or 0.*
    - In contrast to the NJ/PA study, the interaction term was ’turned off or turned on’, the interaction term now is ’turned off or turned on t*o some degree’.*
- **Model: **Card actually first differenced the regression and worked with<br>state averages before estimating it, i.e. the model is
$$
\Delta \bar{Y}_s = \lambda + \beta (\text{Fraction Affected}_s) + \Delta \epsilon_s
$$
- **Interpretation:** Allows estimation of how the outcome scales with the *intensity* of the shock.
    ![](../../assets/notes/y3-p10-topic-5-did/06.png)

#### Event Study (Leads and Lags)

To formally test parallel trends and dynamic effects, we expand the regression to include leads and lags of the treatment that occurs in year 0.
$$
Y_{it} = \mu_i + \delta_t + \sum_{\tau = -K}^{-1} \rho_{\tau} (Treat \times \text{Year}_{\tau}) + \sum_{\tau = 0}^{L} \beta_{\tau} (Treat \times \text{Year}_{\tau}) + \epsilon_{it}
$$
- **Pre-treatment placebo coefficients (**$\rho$**):** These should be jointly equal to zero. 
    - If they are significant, not zero, then "parallel pre-trends" is violated.
- **Post-treatment coefficients (**$\beta$**):** These show the dynamic path of the effect (e.g., we should expect, does the effect fade over time?).
![](../../assets/notes/y3-p10-topic-5-did/07.png)

### 8. Credibility Checklits

![](../../assets/notes/y3-p10-topic-5-did/08.png)

## SW Chapter 13.4

If the treatment in a quasi-experiment is “as if” randomly assigned, conditional<br>on some observed variables W, then the treatment effect can be estimated using<br>the differences regression (13.2). Because the researcher does not have control<br>over the randomization, however, some differences might remain between the<br>treatment and control groups even after controlling for W. 

One way to adjust for those remaining differences between the two groups is to compare not the outcomes Y, but the change in the outcomes pre- and post-treatment, thereby adjusting for differences in pre-treatment values of Y in the two groups.
![](../../assets/notes/y3-p10-topic-5-did/09.png)

Or in regression notation it is
![](../../assets/notes/y3-p10-topic-5-did/10.png)

This assumes that the trend of the treated group counterfactually would have been the same as the control group. It is absolutely necessary there is this **parallel trends.**
![](../../assets/notes/y3-p10-topic-5-did/11.png)

We can of course add other regressors
![](../../assets/notes/y3-p10-topic-5-did/12.png)

We can even extend to further periods using the panel data regression methods of using time and state fixed effects.

## AP Chapter 5.2

DiD is a version of Fixed Effects estimation used when the regressor of interest varies at a group level (like a state or cohort) rather than the individual level.

#### The Canonical Example: Minimum Wages (Card & Krueger 1994)

- **Context:** New Jersey (NJ) raised the minimum wage. Pennsylvania (PA) did not.
- **Goal:** Estimate the effect of the hike on employment.
- **Naive Approach 1 (Cross-Section):** Compare NJ to PA after the hike. 
    - *Problem:* NJ and PA might have permanent economic differences (State Effects).
- **Naive Approach 2 (Time-Series):** Compare NJ Before vs. After. 
    - *Problem:* The economy might have slowed down or sped up generally during that time (Time Trends).
**The Solution:** Compare the *change* in NJ to the *change* in PA.

#### Deriving the DiD Estimator

We assume potential outcomes ($Y_{0ist}$) in the absence of treatment follow an additive structure:
$$
E[Y_{0ist} | s, t] = \gamma_s + \lambda_t
$$
- $\gamma_s$: Fixed State Effect (NJ is permanently different from PA).
- $\lambda_t$: Fixed Time Effect (November is different from February for everyone).

The observed outcome includes the treatment effect $\delta$:
$$
Y_{ist} = \gamma_s + \lambda_t + \delta D_{st} + \epsilon_{ist}
$$

To isolate $\delta$, we calculate the conditional means:
1. **PA (Control), Before:** $E[Y | PA, Feb] = \gamma_{PA} + \lambda_{Feb}$
2. **PA (Control), After:** $E[Y | PA, Nov] = \gamma_{PA} + \lambda_{Nov}$
3. **NJ (Treatment), Before:** $E[Y | NJ, Feb] = \gamma_{NJ} + \lambda_{Feb}$
4. **NJ (Treatment), After:** $E[Y | NJ, Nov] = \gamma_{NJ} + \lambda_{Nov} + \delta$

**First Difference (Time):**
- $\Delta PA = (\gamma_{PA} + \lambda_{Nov}) - (\gamma_{PA} + \lambda_{Feb}) = \lambda_{Nov} - \lambda_{Feb}$ (Captures the time trend).
- $\Delta NJ = (\gamma_{NJ} + \lambda_{Nov} + \delta) - (\gamma_{NJ} + \lambda_{Feb}) = (\lambda_{Nov} - \lambda_{Feb}) + \delta$ (Captures Time Trend + Treatment).

**Second Difference (Difference-in-Differences):**
$$
\Delta NJ - \Delta PA = [(\lambda_{Nov} - \lambda_{Feb}) + \delta] - [\lambda_{Nov} - \lambda_{Feb}] = \delta
$$

#### Regression Implementation

In practice, we estimate this using a regression with interaction terms:
$$
Y_{ist} = \alpha + \beta_1 (NJ_s) + \beta_2 (Post_t) + \delta (NJ_s \times Post_t) + \epsilon_{ist}
$$
- $NJ_s$: Dummy for Treatment Group (absorbs $\gamma_s$).
- $Post_t$: Dummy for Post-period (absorbs $\lambda_t$).
- $NJ_s \times Post_t$: Turns on **only** for the treated group in the post period. The coefficient $\delta$ is the DiD estimator.

#### The Critical Assumption: Parallel Trends

DiD relies entirely on the **Parallel Trends Assumption**: *In the absence of treatment, the treatment and control groups would have evolved in parallel.*
$$
E[Y_{1ist} - Y_{0ist} | s, t] = \delta
$$
- This comes from the assumption we make of $\delta$
![](../../assets/notes/y3-p10-topic-5-did/13.png)
We cannot prove this assumption (we cannot see the counterfactual), but we can test it holds in the pre-treatment phase, call this the **Pre-Trends**.
- If we have data for multiple periods before the treatment, we plot them.
- If the trends for Treatment and Control are parallel prior to the policy change, it strengthens the argument that they would have remained parallel after it too.
- *Note on Card & Krueger (2000):* Follow-up data showed that employment trends in NJ and PA were actually quite volatile and dissimilar in other years, casting some doubt on PA as a perfect counterfactual.
    ![](../../assets/notes/y3-p10-topic-5-did/14.png)
    ![](../../assets/notes/y3-p10-topic-5-did/15.png)

#### Extensions of DiD

**1. Continuous Treatment Intensity (Card 1992)**
Treatment isn't always binary (0/1). Card (1992) studied the federal minimum wage increase.
- *Variation:* The "bite" of the federal increase varied by state. High-wage states (California) were barely affected; low-wage states (Mississippi) were heavily affected.
- *Model:* 
$$
\Delta \bar{Y}_s = \lambda + \delta (\text{Fraction Affected}_s) + \Delta \epsilon_s
$$
- Instead of a dummy, the regressor is the "Fraction Affected," allowing us to utilize variation in treatment intensity across all 50 states.

**2. Granger Causality Testing (Leads and Lags)**
To rigorously test the design, we can estimate a model with leads and lags:
$$
Y_{ist} = \gamma_s + \lambda_t + \sum_{\tau=0}^m \delta_{-\tau} D_{s, t-\tau} + \sum_{\tau=1}^q \delta_{+\tau} D_{s, t+\tau} + X_{ist}\beta + \epsilon_{ist}
$$
- **Lags (**$\delta_{-\tau}$**):** Post-treatment effects. We expect these to be non-zero (the policy has an effect).
- **Leads (**$\delta_{+\tau}$**):** Pre-treatment effects (Anticipation). **Crucial Check:** These coefficients should be zero. If the "effect" happens *before* the policy is implemented, the parallel trends assumption is violated (causality is running backward or trends differ).

**3. State-Specific Trends**
If parallel trends look violated (e.g., one state is growing faster than another regardless of the policy), we can add state-specific time trends:
$$
Y_{ist} = \gamma_s + \lambda_t + \delta D_{st} + \gamma_{1s} \cdot t + \epsilon_{ist}
$$
- This allows each state to have its own linear growth rate.
- *Risk:* This is a very demanding specification. If the treatment effect evolves slowly over time, the state-specific trend can "absorb" the treatment effect, killing a real result.

**4. Triple Differences (DDD)**
If we are worried that there is a shock specific to the NJ-Time cell (e.g., a localized recession in NJ exactly when the tax hit), we can use a third difference (Yelowitz 1995).
    *Idea:* Find a group *within* NJ that should **not** be affected by the policy.
        - *Example:* Medicaid expansion affects children, but not the elderly.
    *Method:* Compare (NJ Children - PA Children) - (NJ Elderly - PA Elderly).
        - This removes any shocks that affect *everyone* in NJ at that specific time.

## Past Question

### Q4 - 2016: DiD using a TWFE Regression

![](../../assets/notes/y3-p10-topic-5-did/16.png)

![](../../assets/notes/y3-p10-topic-5-did/17.png)

![](../../assets/notes/y3-p10-topic-5-did/18.png)

![](../../assets/notes/y3-p10-topic-5-did/19.png)

### Q4 - 2017: DiD using a TWFE Regression

![](../../assets/notes/y3-p10-topic-5-did/20.png)

![](../../assets/notes/y3-p10-topic-5-did/21.png)

![](../../assets/notes/y3-p10-topic-5-did/22.png)

Non-random assignment does not just mean violation of parallel trends, it may also mean a violation of strict exogeneity, if the assignment itself is endogenous then past errors → consumption path → selection assignment, this makes CP variable endogenous → OVB. The past error’s effect is being confused as treatment effect!

![](../../assets/notes/y3-p10-topic-5-did/23.png)
