---
title: "Error correction and Granger causality"
paper: "Paper 10 — Econometrics"
year: "Year 3 (Part IIB)"
section: "Time Series"
description: "Error-correction models, predictive causality, regression diagnostics and forecast intervals."
order: 80
tags: ["economics"]
---

#### The Big 4

#### **1. Autocorrelation (The Memory Check)**

- **The Question:** Did we leave any historical momentum in the error term?
- **The Test:** **Breusch-Godfrey LM Test** (or Ljung-Box Q-Test).
- **The Danger:** Unbiased coefficients, but artificially tiny standard errors. You will think fake relationships are statistically significant.
- **The Fix:** Add more lags of $Y$ or $X$ to your ARDL model until the test comes back clean.

#### **2. Heteroskedasticity (The Volatility Check)**

- **The Question:** Is the variance of the errors constant, or does it explode during certain periods (volatility clustering)?
- **The Test:** **ARCH-LM Test** (crucial for financial time series) or **Breusch-Pagan / White Test**.
- **The Danger:** Just like autocorrelation, your coefficients are unbiased, but your standard errors and $t$-statistics are entirely wrong.
- **The Fix:** Do not change the model. Tell your software to calculate **HAC (Newey-West) Robust Standard Errors**, which mathematically correct the \$t\$-statistics for the volatility.

#### **3. Parameter Stability (The Structural Break Check)**

- **The Question:** Did the true economic relationship ($\beta$) stay constant across the entire dataset, or did a regime shift (like a financial crisis or policy change) break the model?
- **The Test:** **CUSUM** and **CUSUM of Squares (CUSUMSQ)** tests. These plot the cumulative sum of your recursive residuals. If the line crosses the critical boundary, your parameters have broken. (You can also use a **Chow Test** if you know the exact date of the break).
- **The Danger:** You are averaging two completely different economic regimes into one meaningless coefficient.
- **The Fix:** Introduce **Dummy Variables** to account for the structural break, allowing the intercept or slope to shift after that specific date.

#### **4. Functional Form (The Misspecification Check)**

- **The Question:** Did you draw a straight line when the true relationship is a curve?
- **The Test:** **Ramsey RESET Test**.
- **The Danger:** Omitted variable bias. Your estimates are biased and inconsistent.
- **The Fix:** Transform your variables (e.g., take the natural log) or add non-linear terms (like $X^2$) to the equation.

#### **5. Normality (The Distribution Check)**

- **The Question:** Are the residuals perfectly bell-shaped, or do they have massive outliers (fat tails / skewness)?
- **The Test:** **Jarque-Bera Test**.
- **The Danger:** If the sample size is small, non-normal errors mean your \$F\$-tests and \$t\$-tests are technically invalid.
- **The Fix:** If you have a massive sample size (\$T \\to \\infty\$), the Central Limit Theorem usually bails you out. If not, look for massive outliers in your data and account for them with impulse dummy variables.

#### **The Cheat Sheet Summary Table**



| **Diagnostic Target** | **The Standard Test to Run** | **What it means if you fail** | **How to cure it** |
| --- | --- | --- | --- |
| **Serial Correlation** | Breusch-Godfrey LM | Wrong standard errors. | Add more lags to ARDL. |
| **Heteroskedasticity** | ARCH-LM / White | Wrong standard errors. | Use HAC / Newey-West errors. |
| **Stability** | CUSUM / CUSUMSQ | Meaningless, averaged \$\\beta\$. | Add structural break dummies. |
| **Functional Form** | Ramsey RESET | Biased/Inconsistent \$\\beta\$. | Use Logs, Squares, etc. |
| **Normality** | Jarque-Bera | Invalid p-values in small \$T\$. | Add outlier dummies or get more data. |



## Lecture Notes

### Recap: ARDL Model

#### SR and LR responses

The short run response, is what happens to $y_t$ to a change in $x_t$, by partial differentiation.
$$
y_t =  α+ϕ_1y_{t−1} +...+ϕ_hy_{t−h} +β_0x_t +β_1x_{t−1} +β_2x_{t−2} +...+β_kx_{t−k} +u_t \\ \ \\ \implies \frac{\partial y_t}{\partial x_t} = \beta_0
$$

The long run response is the new steady-state for $y^*$
$$
y^*=  α+ϕ_1y^* +...+ϕ_hy^* +β_0x^* +β_1x^* +...+β_kx^*
$$
So we can collect terms, to get that 
$$
y^*(1 - \sum \phi) = \alpha + x^*(\sum \beta)
$$
Thus, the LR response is as required: 
$$
\frac{\partial y^*}{\partial x^*} = \frac{\sum_{i=0}^k \beta_{i}}{1-\sum_{j=1}^h \phi_j}
$$

### ECM Models

This is just a differenced ARDL model, to see this try the simple ARDL(1,1) specification then:
$$
y_t = \alpha + \phi_1 y_{t-1} + \beta_0 x_t + \beta_1 x_{t-1} + u_t
$$
Rewrite it as 
$$
\Delta y_t = \alpha + \beta_0 \Delta x_t - (1-\phi)(y_{t-1} - \frac{\beta_0+\beta_1}{1-\phi} x_{t-1}) + u_t
$$

Recall:
- SR impact  = $\beta_0$
- LR impact = $\frac{\beta_0 + \beta_1 +...}{1-\phi_1+...}$ 

So we have separated out the short-run and long-run impact of changes in $x_t$. This is error-correcting, because **the error between **$x_t$** and its long-run relation with **$y_t$** **acts to correct the future values of $y_t$

**Long Run Equilibrium**
This is from the term 
$$
y_{t-1} - \frac{\beta_0+\beta_1}{1-\phi} x_{t-1}
$$
If this term is zero, then last period y was in its LR value. 
- If $y_{t-1}$ is too high
- This term is positive
- Multiplying that positive error by the negative coefficient causes $\Delta y_t$ to **decrease**.
- Thus $-(1-\phi)$ is the speed of adjustment 
- This is error correction.

**Short-run Impact**
There is still of course a short run dynamic capture by $\beta_0$ which is how y immediately reacts to changes in x

Eventually in the long run we hit the LR propensity of x on y, $\frac{\beta_0+\beta_1}{1-\phi}$<br><br>
ARDL(k,h)
![](../../assets/notes/y3-p10-ecms-and-granger-causality/01.png)
![](../../assets/notes/y3-p10-ecms-and-granger-causality/02.png)

### Forecasting with Regression Models

#### Conditional Forecasts (1-step ahead)

Suppose we have the simple regression model 
$$
y_t = \alpha + \beta x_t + u_t \ \ \  \ u\sim (0, \sigma^2)
$$
The optimal prediction at time t, with $x_{t+1}$ known is denoted 
$$
y^*_{t+1} = E[y_{t+1} | \Omega_t, x_{t+1}] \\ \ \\ = \alpha + \beta x_{t+1} +E[u_{t+1} | \Omega _t , x_{t+1}]  \\ \ \\ = \alpha + \beta x_{t+1}
$$
We don’t know the structural parameters, a feasible forecast has to estimate these paramaters. Thus the feasible, optimal forecast is:
$$
\hat y^*_{t+1} = \hat \alpha + \hat \beta x_{t+1}
$$
This now leaves a problem, we do not know $x_{t+1}$. This is conditional on having this knowledge.
- E.g. let’s say x is interest rates
- you plug in your view of interest rates in the future
- and then back out what that means for house prices next period
- it is conditional because implicitly assuming a direction of causality here

#### Confidence Intervals (1-step ahead)

We have variance coming from two things, the white noise error, u, and the accuracy of our estimates for $\alpha, \beta$. 

Suppose, we are doing k regressors, including the constant. 
- Our dataset of observed regressors is thus, the full $X_T = T \times k$ matrix.
- Our dataset of observed outcomes is thus, the full $Y_T = T\times 1$ matrix.

The column vector of regressors at their current time values, time t, is $x_t$. The current value of the outcome at time t is still $y_t$. $\hat \beta$ is the horizontal vector of slope estimates.

Our optimal next step ahead forecast is recall: 
$$
\hat y^*_{T+1} = x_{T+1}^{* \prime} \  \hat \beta = \hat \beta_0 + \hat \beta_1 x_1 + \hat \beta_2 x_2 +...
$$
Writing this in terms of the full data sets 
$$
\hat y^*_{T+1} = x_{T+1}^{* \prime} \times \hat \beta = x_{T+1}^{* \prime} \times[(X^{\prime}_T X_T)^{-1} (X^{\prime}_T Y_T)]
$$
- Recall from the OLS formula in matrix form
    ![](../../assets/notes/y3-p10-ecms-and-granger-causality/03.png)
The larger the variance of u, and the less precise our measure of $\beta$ the wider our confidence interval gets.

**Forecast Error**
$$
e_{T+1} = y_{T+1} - \hat{y}_{T+1}
$$
Substitute the model, y = x’ B so that: 
$$
e_{T+1} = (x^{* \prime}_{T+1}\beta + u_{T+1}) - x^{* \prime}_{T+1}\widehat{\beta} \\ \ \\ e_{T+1} = u_{T+1} - x^{* \prime}_{T+1}(\widehat{\beta} - \beta)

$$
**Error Variance**
$$
Var(e_{T+1}) = Var(u_{T+1}) + Var(x^{* \prime}_{T+1}(\widehat{\beta} - \beta))
$$
We need to use the matrices rules of taking variance here (Var $\beta$ = 0 as constant)
$$
Var(e_{T+1}) = \sigma^2 + Var(x^{* \prime}_{T+1}(\widehat{\beta}))
$$
The latter term by matrix rules is
$$
Var(e_{T+1}) = \sigma^2+x^{* \prime}_{T+1} [Var(\widehat{\beta})] x^*_{T+1}
$$
And from standard OLS theory
$$
Var \ \hat \beta = \sigma^2(X'_TX_T)^{-1}
$$
![](../../assets/notes/y3-p10-ecms-and-granger-causality/04.png)

**Standard Errors**
Now we put it all back together into one "Standard Error" formula:
$$
\text{Standard Error} = \sqrt{\sigma^2 + \sigma^2 x^{* \prime}_{T+1}(X'_T X_T)^{-1} x^*_{T+1}}
$$
Factor out the $\sigma^2$, and also recognise we don’t know it we estimate it as $\hat \sigma^2_u$
$$
\text{Standard Error} = \widehat{\sigma}_u \times \sqrt{1 + x^{* \prime}_{T+1}(X'_T X_T)^{-1} x^*_{T+1}}
$$

**95% confidence interval**
Finally, we use the property of the Normal Distribution. For a 95% interval, roughly 95% of data falls within 1.96 standard deviations of the mean: 
$$
\text{Forecast} \pm 1.96 \times (\text{Standard Error})
$$
Hence we get the 95% confidence interval of the next-step ahead forecast as:
$$
\widehat{y}^*_{T+1} \pm 1.96 \widehat{\sigma}_u \sqrt{1 + x^{* \prime}_{T+1}(X'_T X_T)^{-1} x^*_{T+1}}
$$
[Watch the accompanying video on YouTube](https://www.youtube.com/watch?v=4D4R9jgNp6E)

**Interpret**
![](../../assets/notes/y3-p10-ecms-and-granger-causality/05.png)

#### Evaluating Forecasts

We make estimates of forecasted outcomes from h =1, to H. 
We then compare it to the actualized outcomes over the next h periods (or we reserve h periods of data for forecasting)
![](../../assets/notes/y3-p10-ecms-and-granger-causality/06.png)
The typical method is the MSPE, the mean squared prediction error.
- Prediction error is $y_{t+h} - \hat y_{t+h}$
- Then you square it
- Then you sum it up for all H periods, and take the mean

### Granger Causality

#### Definition

Let the philosophers think about what causality is in time series models. **The most useful definition of causality is as given by Granger. **
Granger defines causality starting from an assumption about temporal ordering, that the future cannot cause the past **so that only past values of x could possibly “cause” y.**
- But temporal ordering and causality are (probably) different things.

And basically it is: *does knowledge of x, help me predict y?  Does the history of x **have marginal predictive significance***

#### A variable $x$ Granger-causes $y$ if: 

- $y$ can be better predicted using the histories of *both *$x$ and $y$ 
- than just using the history of $y$ alone.

#### Testing for GC

Usually we do two different tests. Testing for Granger causality both wayss

First just y against its history and x’s history
$$
y_t = \alpha_0  + \sum^K_{k=1}\beta_k y_{t-k} + \sum ^J _{j=1} \gamma_j x_{t-j} + u_t
$$
- Then the hypotheses are 
$$
H_0: \gamma_j = 0  \ \ \ \ (\text{no GC}) \\ \ \\ H_1: \gamma_j \neq  0 \ \ \ \text{x GC y}
$$
- The test-statistic is F-test
$$
F > F^{CV}\implies\text{reject null} \implies x \text{ granger causes }y
$$

Then x  against its history and y’s history
    $$
    x_t = \alpha'_0  + \sum^K_{k=1}\beta'_k y_{t-k} + \sum ^J _{j=1} \gamma'_j x_{t-j} + v_t
    $$
- Then the hypotheses are
    $$
    H_0: \gamma_j' = 0  \ \ \ \ (\text{no GC}) \\ \ \\ H_1: \gamma_j' \neq  0 \ \ \ \text{y GC x}
    $$
- The test-statistic is F-test
    $$
    F' > F^{CV}\implies\text{reject null} \implies y \text{ granger causes }x
    $$

If you reject the null in both tests, then there is two way granger causality.

## Pesaran Ch.6

#### ECM Models

![](../../assets/notes/y3-p10-ecms-and-granger-causality/07.png)
More generally written as
![](../../assets/notes/y3-p10-ecms-and-granger-causality/08.png)
If x is stationary, then so is y. Otherwise both are non-stationary
![](../../assets/notes/y3-p10-ecms-and-granger-causality/09.png)

## Pesaran Ch.22

The concept of Granger causality is based on the idea that because a cause occurs before its effect, if event X is the cause of event Y, then X should proceed Y. This principle is used to determine if past values of one time series can predict the future values of another.
![](../../assets/notes/y3-p10-ecms-and-granger-causality/10.png)
Granger Causality is NOT causality (umbrella scenario)
![](../../assets/notes/y3-p10-ecms-and-granger-causality/11.png)
- umbrella does not cause rain; but precedes it and its information is helpful for predicting rain

## Past Questions

### Q8 - 2015 Essay

![](../../assets/notes/y3-p10-ecms-and-granger-causality/12.png)
