---
title: "Non-stationary time series and ARIMA"
paper: "Paper 10 — Econometrics"
year: "Year 3 (Part IIB)"
section: "Time Series"
description: "Deterministic trends, unit roots and differencing; separating trends from cycles using Beveridge–Nelson and the HP filter."
order: 20
tags: ["economics"]
---

## Lecture Notes

### Non Stationary Models

The previous lecture note explained how ARMA is suitable for modelling any (at least weakly) stationary time series.

But what if there is no stationarity? What if the mean (first moment) or even the second and third etc. moments change over time.

There are two popular methods of modeling such processes.
- Deterministic Time Trend **(TREND STATIONARY)**
    - This is ‘trend-stationary’ modelling
    - It is stationary after being de-trended

- Specify the Unit Root Process **(DIFFERENCE STATIONARY)**
    - This can of order I(1), I(2)… etc.
    - These are ARIMA(p,d,q) which become ARMA(p,q) after being differenced d times
        ![](../../assets/notes/y3-p10-non-stationary-time-series-trends-and-cycles-arima/01.png)

### Trend-Stationary Models

If $y_t$ is trend stationary it has all the properties of a stationary process, except that the mean changes with time.
- It has finite variance
- A “shock” only has temporary effect on $y_t$
    - As the auto-correlation coefficient $\rho_s$ decreases steadily in magnitude for large enough $s$
- The expected length of time between crossings of the trend of $y_t$ is finite
- It has no unit root
**None of these characteristics hold for a model with a unit root**

### Testing for Unit Root

#### Motivation

The test for unit root is critical in determining whether to use a trend-stationary or difference-stationary model
Trend Stationary($H_1 = no\ unit \ root)$
- The trend dominates and in the long-run, forecasts are *entirely* determined by the trend. The best forecast is thus the unconditional trend.
- Forecast variance eventually falls until it reaches unconditional variance.
- **Where we are today does NOT matter<br>**
Difference Stationary ($H_0 = unit \ root)$
- If there is a unit root, then past values **DO MATTER**, full memory
- The best forecast is not some unconditional trend, it is today’s values plus drift terms
    - And this gets harder to forecast further into the future i.e. the variance gets wider and wider 

Under $H_0$, there is unit root and this part dominates.
- So model it as a unit root process (ARIMA)
Under $H_1,$ there is no unit root and so the trend dominates.
- So model it as trend stationary process

#### DF Test

Estimating, 
$$
y_t = \alpha + \delta t + \rho y_{t-1}
$$
The hypotheses, 
$$
H_0: \rho =1 \ \ \ vs. \ \ \ H_1: |\rho| < 1
$$
We estimate this by least squares, but the LS estimator actually comes from three different tables depending on
- no intercept + no trend
- Intercept + Trend
- Intercept + no trend

Also, we like to test for ‘zero’ so really we rewrite this into 
$$
\Delta y_t = \alpha +\delta t + (\rho-1)y_{t-1} \\ \ \\ \Delta y_y = \alpha + \delta t + \beta y_{t-1}
$$
And now we estimate using the t-statistic if 
$$
H_0: \beta = 0 \ \  \ vs. \ \ \ H_1: |\beta| < 0
$$
We calculate the test-statistic 
$$
t^{DF} = \frac{\hat \beta}{\sigma_{\hat \beta}}
$$
And check if it is significant against the DF critical values

**NB: Test has low power against local alternatives *unless* sample very large. **

#### Augmented DF test

Really, you should first run diagnostic checks to see if the errors are serially correlated. **(i.e. run Durbin Watson, Breusch-Godfrey tests for serial correlation)**

When the Dickey-Fuller regression has serially correlated errors, it is usual to add lag dependent variables $\Delta y_{t-s}$ to the RHS. We choose the amount of lags based on our information criterion (Shwarz, Akaike)

Sufficient lags should be added to remove serial correlation in the residuals

#### Other Unit Root Tests

Phillips-Perron Test
![](../../assets/notes/y3-p10-non-stationary-time-series-trends-and-cycles-arima/02.png)
- robust to **heteroskedasticity and auto-correlation**

KPSS test
What if we ant the null to be stationarity instead? This is it
![](../../assets/notes/y3-p10-non-stationary-time-series-trends-and-cycles-arima/03.png)
- basically the numerator $S_t^2$ is the 1-period variance
- the denominator is the long term variance $\bar \sigma ^2$

Variance-Ratio Test
For a trend stationary process, the variance of the difference between $y_{t+h}-y_t$ should tend to 0 (because the variance of the whole process colappses down to a deterministi trend).
![](../../assets/notes/y3-p10-non-stationary-time-series-trends-and-cycles-arima/04.png)

### Over Differencing

Over-differencing is when you difference by more than the order of the process
Here is why, suppose we have an I(O) process with $\rho < 1$
$$
y_t = \rho y_{t-1} + \epsilon_t
$$
Take the first difference
$$
\Delta y_t = \rho \Delta y_{t-1} + \epsilon_t - \epsilon_{t-1}
$$
Now we have introduced an MA error term with a unit root! $\epsilon_t - \epsilon_{t-1}$, we did the opposite of removing a unit root.

Were we to actually estimate $\Delta y_t$ using this AR(1) structure 
- Red flag that you over-differenced, is if you get autocorrelation, $\rho_1$  = -1/2
- Another red flag is if your $R^2 > DW$ … it suggests there is a spurious regression

### Trend and Cycle

We don’t have to draw an absolute line at just a trend-stationary process or a unit-root process. **We can say that this non-stationary process is a combination of the two processes.**

The former is the deterministic ‘trend’ and the latter is the stochastic ‘cycle’

Unfortunately there’s an infinite number of ways in which one can try and fit a trend and cycle, from sketching by hand a curve that loosely follows the underlying series, to rather more sophisticated statistical decomposition

#### A time series will have 4 components:



| **Feature** | **Stochastic Trend (AR with a unit root)** | **Deterministic Trend** | **Stochastic Cycle (AR with stationarity)** | **Deterministic Seasonality** |
| --- | --- | --- | --- | --- |
| Movement | **Permanent Shocks.** A random shock permanently shifts the future path. | **Perfectly Predictable.** Moves exactly according to a fixed function of time. | **Temporary Shocks.** Shocks cause fluctuations, but the series "forgets" them and reverts to the mean. | **Strict Calendar Repetition.** Perfectly predictable, repeating shapes dictated strictly by the time of year (e.g., quarters, months). |
| **Stationary** | **Difference-Stationary / **$I(1)$. | **Trend-Stationary**. (subtract trend) | **Stationary / **$I(0)$. | **Seasonally-Stationary**. (subtract season means) |
| **Variance as **$t \to \infty$ | **Infinite.** The series wanders aimlessly; forecasts become infinitely uncertain. | **Finite (around the trend).** | **Finite.** The series has a constant, bounded variance. | **Finite (around the seasonal means).** |
| **Classic Model** | Unit Root ARMA process:<br>$y_t = y_{t-1} + \epsilon_t$ | Linear Trend:<br>$y_t = \alpha + \beta t + \epsilon_t$ | Stationary ARMA Process:<br>$c_t = \rho c_{t-1} + \epsilon_t$ | Quarterly Dummies:<br>$y_t = \alpha + \gamma_1 Q_1 + \gamma_2 Q_2 + \gamma_3 Q_3 + \epsilon_t$ |
| **Effect on the Data** | Dictates an unpredictable, compounding long-run trajectory. | Dictates a predictable, fixed long-run trajectory. | Dictates the short-run booms and busts *around* the long-run trajectory. | Creates strict, identical peaks and troughs at exact calendar intervals. |
| **Pitfall of Mis-spec** | **The Nelson-Kang Trap:** OLS detrending forces infinite variance into a fixed box, creating **spurious periodicity**. An ADF test will falsely conclude it is stationary. | **Over-Differencing:** First-differencing ($\Delta y_t$) introduces a non-invertible MA(1) error with a unit root. The ADF test breaks down as error term now endogenous. | **Over-Differencing / Spurious Regression:** Differencing a stationary cycle induces artificial autocorrelation. Red flag: $R^2 > DW$`, autcorr at -1/2` | **Omitted Variable Bias:** Trying to model rigid seasonality with a wandering ARMA process. This leaves massive, uncaptured serial correlation in your residuals at seasonal lags. |
| **The Fix** | **Do not pre-detrend.** Run the ADF test on the raw data, explicitly including a time trend ($\delta t$). The test will  evaluate $H_0$ (Stochastic Trend) against no such thing. | **Do not difference.** Run the ADF test on the raw data, explicitly including a time trend ($\delta t$). If the test rejects $H_0$ (proving it is trend-stationary), *then* you can safely use OLS detrending. | **Do not difference.** If the series looks visually flat (no long-run growth), run the ADF test with an intercept but *no* time trend. Once $H_0$ is rejected, proceed straight to ARMA modeling. | **Check ACF and use Dummies.** Check the ACF for massive spikes at exact seasonal lags (e.g., 4, 8, 12). Add dummy variables directly to the regression to absorb it, check if they are significant jointly with the F-test. |



### Beveridge and Nelson Decomposition

Suppose we did an ADF, find $y_t$ is indeed a unit root process. We tried candidate models, and arrived at ARIMA(1,1,1) as the best model.
    - ARIMA (1,1,1) is an ARMA(1,1) after 1 differencing
    - So $\Delta y_t$ is an ARMA (1,1)
Generally we write ARMA(1,1) as 
$$
\Delta y_t - \lambda \Delta y_{t-1} -c \  =  \epsilon_t + \theta \epsilon_{t-1} \ 
$$
**But for ease, rewrite the constant, ‘c’ as **$\alpha(1-\lambda)$** so we can attribute this as a de-meaning of the difference terms see:**
Then, 
$$
\Delta y_t = \alpha(1-\lambda) + \lambda \Delta y_{t-1} + \epsilon_t + \theta \epsilon_{t-1}
$$
**Which means (or could just start straight from here).**
$$
(\Delta y_t - \alpha) = \lambda(\Delta y_{t-1}-\alpha) +(\epsilon_t + \theta \epsilon_{t-1})
$$
now using lag variables
$$
(\Delta y_t - \alpha) = \lambda L(\Delta y_{t}-\alpha) +(1+\theta L) \epsilon_t \\ \ \\ \implies (1-\lambda L)(\Delta y_t - \alpha) = (1+\theta L) \epsilon_t \\ \ \\ \implies \Delta y_t = \alpha + \frac{1+ \theta L}{1 - \lambda L} \epsilon_t
$$
**KEY STEP**
We are going to shoe-horn the term below, into the equation above:
$$
\frac{1+\theta}{1-\lambda} \epsilon_t
$$
By adding and subtracting it to the RHS:
$$
\Delta y_t = \alpha + (\frac{1+\theta}{1-\lambda})\epsilon_t +(\frac{1+ \theta L}{1- \lambda L} - \frac{1+\theta}{1-\lambda})\epsilon_t
$$
Now focusing on that final term, note that it can be written as a single fraction 
![](../../assets/notes/y3-p10-non-stationary-time-series-trends-and-cycles-arima/05.png)
If we substitute that into the above
$$
\Delta y_t = \alpha + (\frac{1+\theta}{1-\lambda})\epsilon_t -[\frac{\theta + \lambda}{(1-\lambda L)(1-\lambda)}](1-L)\epsilon_t \\ \ \\ (1-L) y_t = \alpha + (\frac{1+\theta}{1-\lambda})\epsilon_t -[\frac{\theta + \lambda}{(1-\lambda L)(1-\lambda)}](1-L)\epsilon_t 
$$
Simplify by dividing through, note that $(1-L)^{-1}$ is infinite sum geometric series of all past lagged values
$$
y_t = [(1-L)^{-1} \alpha] + (\frac{1+\theta}{1-\lambda}) \ [(1-L)^{-1}\epsilon_t] -\frac{\theta+\lambda}{1-\lambda} \ [(1-\lambda L)^{-1} \epsilon_t] 
$$
- The past lagged values of the intercept is just $\alpha+\alpha+... = \alpha t$
- The past lagged values of the error term is $\sum_{i=1}^t\epsilon_i$
- The final term is stationary because $\lambda < 1$, so it doesn’t give us an infinute sum it dampens
- Finally add $y_0$, as all our summations were from $t=1$

This gives us the BN Decomposition 
$$
y_t = y_0 + \underbrace {\alpha t + \frac{1+\theta}{1-\lambda}\sum_{i=1}^t\epsilon_i}_{\text{trend}} - \underbrace {\frac{\theta+\lambda}{1-\lambda}(1-\lambda L)^{-1} \epsilon_t}_{\text{cycle}}
$$
![](../../assets/notes/y3-p10-non-stationary-time-series-trends-and-cycles-arima/06.png)
And in general if
![](../../assets/notes/y3-p10-non-stationary-time-series-trends-and-cycles-arima/07.png)

### HP Filter

The HP filter also seeks to decompose y into a non-stationary time trend and a stationary residual cycle 
$$
y_t = g_t + c_t
$$
- $g_t, c_t$ are not observable, we want to get the trend $g_t$

Solve the minimisation of:
$$
min \ \ \ \sum^T_{t=1}(y_t-g_t)^2 + \lambda \sum_{t=2}^{T-1}[(g_{t+1}-g_t)-(g_t-g_{t-1})]^2
$$

The HP filter does this by trading off:
- Minimising the distance of the trend g’s from the observed y’s 
- The change in the slope of the g’s (level of curvature)
- The weight $\lambda$ is how much we care more about getting the trend to follow the data than about smoothness

The tradeoff is obvious; the smoothest trend is a straight line. It predicts nothing. Whereas the least smooth trend is literally the data itself.
![](../../assets/notes/y3-p10-non-stationary-time-series-trends-and-cycles-arima/08.png)

This is not a forecasting method, it is literally curve fitting.
It also shows us that there is no single unique trend-cycle decomposition, this is because we are always choosing how to allocate between the two
![](../../assets/notes/y3-p10-non-stationary-time-series-trends-and-cycles-arima/09.png)

## Pesaran Chapter 15

The simplest Unit root process is the randowm walk. All unit root processes are generalisations of this random walk
![](../../assets/notes/y3-p10-non-stationary-time-series-trends-and-cycles-arima/10.png)

A unit root process can have a drift term between deltas
![](../../assets/notes/y3-p10-non-stationary-time-series-trends-and-cycles-arima/11.png)

**Difference stationary processes are not trend stationary**
For a random walk, we have perfect memory which means infinite variance as time increases and shocks have permanent effects.
![](../../assets/notes/y3-p10-non-stationary-time-series-trends-and-cycles-arima/12.png)
![](../../assets/notes/y3-p10-non-stationary-time-series-trends-and-cycles-arima/13.png)
For a trend stationary process, the trend dominates
![](../../assets/notes/y3-p10-non-stationary-time-series-trends-and-cycles-arima/14.png)
The issue of whether economic time series are **trend stationary** or<br>**first difference stationary** (also known as the ‘unit root’ problem) has been the subject of intensive research

**Dickey Fuller**
![](../../assets/notes/y3-p10-non-stationary-time-series-trends-and-cycles-arima/15.png)
Or if we have serial correlation use an ADF
![](../../assets/notes/y3-p10-non-stationary-time-series-trends-and-cycles-arima/16.png)
Note: There is a size-power trade-off, can’t just use loads of lags.
Note: ADF test not great at detecting situations where the parameter is very close to 1 (near unity)

## Pesaran Chapter 16

HP
![](../../assets/notes/y3-p10-non-stationary-time-series-trends-and-cycles-arima/17.png)
BND
![](../../assets/notes/y3-p10-non-stationary-time-series-trends-and-cycles-arima/18.png)
![](../../assets/notes/y3-p10-non-stationary-time-series-trends-and-cycles-arima/19.png)
![](../../assets/notes/y3-p10-non-stationary-time-series-trends-and-cycles-arima/20.png)
![](../../assets/notes/y3-p10-non-stationary-time-series-trends-and-cycles-arima/21.png)

## Past Questions

### Q1 2016 - Linear Trend vs HP Filter vs BN Decomposition

![](../../assets/notes/y3-p10-non-stationary-time-series-trends-and-cycles-arima/22.png)
The key manipulation to keep in mind is that we are minimising deviations of the observations from our estimated trend $\tau$. But we are also minimising growth in the trend, because we do not want it to be too jumpy. We write growth as the second difference. And finally, of course we are doing this as squared sums.
$$
\Delta^2(\tau_{t+1}) = \Delta(\tau_{t+1}-\tau_t) - \Delta(\tau_t - \tau_{t-1}) = Change \  in \ slope \\ \ \\ \implies Change \ in \ slope = \tau_{t+1} - 2 \tau_t + \tau_{t-1}
$$

![](../../assets/notes/y3-p10-non-stationary-time-series-trends-and-cycles-arima/23.png)
A simple linear trend plotted on the in-sample-data seems to give very similar results as from the HP method. On this in-sample data, we have the $\hat y$ from linear trend and the $\tau_t$ from the HP decomposition method.
So why should we use the HP-model to genereate forecasts out-of-sample? 
*Just because they perform similary in-sample does not mean they will perform as well out of sample. The key point is from the ADF statistic, we have an I(1) residual in the the linear trend model. I(1) residual is SHIT for forecasting it diverges!*
![](../../assets/notes/y3-p10-non-stationary-time-series-trends-and-cycles-arima/24.png)
![](../../assets/notes/y3-p10-non-stationary-time-series-trends-and-cycles-arima/25.png)

### Q1 2017 - What is Non-Stationarity. Testing for it.

![](../../assets/notes/y3-p10-non-stationary-time-series-trends-and-cycles-arima/26.png)
![](../../assets/notes/y3-p10-non-stationary-time-series-trends-and-cycles-arima/27.png)
![](../../assets/notes/y3-p10-non-stationary-time-series-trends-and-cycles-arima/28.png)
![](../../assets/notes/y3-p10-non-stationary-time-series-trends-and-cycles-arima/29.png)
![](../../assets/notes/y3-p10-non-stationary-time-series-trends-and-cycles-arima/30.png)
![](../../assets/notes/y3-p10-non-stationary-time-series-trends-and-cycles-arima/31.png)
