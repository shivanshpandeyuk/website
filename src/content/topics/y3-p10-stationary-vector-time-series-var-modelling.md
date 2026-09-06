---
draft: false
title: "Vector autoregressions"
paper: "Paper 10 — Econometrics"
year: "Year 3 (Part IIB)"
section: "Time Series"
description: "Reduced-form and structural VARs, identification, stability and impulse responses."
order: 60
tags: ["economics"]
---

Part IIB Econometrics (Paper 10), Time Series. Reading: Pesaran, *Time Series and Panel Data Econometrics*, Ch. 21.

## Lecture Notes

### Moving Away from Structural Models

Before VARs, macroeconomists used huge systems of equations with strict **Exclusion Restrictions** (deciding certain variables didn't affect others). 
Two major papers destroyed this approach:

#### The Lucas Critique (1976)

- **The Idea:** People change their behavior when government policies change.
- **The Problem:** If you estimate a model based on old policy data, those "slopes" (parameters) will disappear the moment you change the rules. Your model becomes a "useless" map of a country that no longer exists.
- **The Solution:** Focus on "deep structural parameters" (like how much people value future money) which don't change with policy. *Micro-foundations not massive model.*

#### The Sims Critique (1980) → VAR relevant

- **The Idea:** Most theory-based restrictions are "incredible" (untested and arbitrary).
- **The Problem:** Why assume Interest Rates don't affect GDP today? Theory might say so, but "Reality" (the title of his paper) often says otherwise.
- **The Solution:** Treat **everything as endogenous**. Let every variable influence every other variable. This is the **VAR approach**.

### Defining a VAR Model

#### Why it’s called "Vector Autoregression"

- **Regression:** Predicting a variable using other variables.
- **Auto (Self):** Predicting a variable using its own past.
- **Vector:** Doing it for a whole group of variables at once.

#### What is the regressor $x_t$?

In a VAR, we don't just have one dependent variable; we have a "vector" of variables. 
If we are studying the relationship between Money Growth ($\Delta m_t$) and Output Growth ($\Delta y_t$), we package them into a single object: 
$$
x_t = \begin{bmatrix} \Delta m_t \\ \Delta y_t \end{bmatrix}
$$
Instead of one equation, we are now solving for the movement of this entire block of data over time.

#### Structural Form

Sims argued that in the real world, all variables influence each other contemporaneously. And that all lags of variables also influence today’s variables.
We represent these "instant" impacts using the matrix $A_0$, and in this 1-lag model, the impact of any t-1 variables with $A_1$
$$
\underbrace{
\begin{bmatrix} 
1 & a_{12}^0 \\
a_{21}^0 & 1 
\end{bmatrix}
}_{A_0}
\underbrace{
\begin{bmatrix} 
\Delta m_t \\ 
\Delta y_t 
\end{bmatrix}
}_{x_t}
=
\underbrace{
\begin{bmatrix} 
a_{11}^1 & a_{12}^1 \\
a_{21}^1 & a_{22}^1 
\end{bmatrix}
}_{A_1}
\underbrace{
\begin{bmatrix} 
\Delta m_{t-1} \\ 
\Delta y_{t-1} 
\end{bmatrix}
}_{x_{t-1}}
+
\underbrace{
\begin{bmatrix} 
\varepsilon_{1t} \\ 
\varepsilon_{2t} 
\end{bmatrix}
}_{\varepsilon_t}
$$
- **The 1s on the diagonal:** Normalisation — it just means the first row is "the money equation" and the second is "the output equation."
- **The $a_{12}^0, \ \  a_{21}^0$:** these are the **Contemporaneous Effects**.
    - They represent how much $y$ affects $m$ *right now*, and vice versa.
    - i.e. $a_{12}^p$ is the slope for equation 1, from the change in variable 2, at lag p.
- **The $\epsilon$ terms:** These are the "Structural Shocks"—the pure, independent surprises (e.g., a sudden central bank decision).

More generally, for a VAR model with p lags we write this as: 
$$
A_0 x_t = A_1 x_{t-1} + A_2 x_{t-2} + \dots + A_p x_{t-p} + \varepsilon_t
$$
and as usual assume the errors are serially uncorrelated
- $\epsilon_{t}^{n}$  are serially uncorrelated shocks with covariance matrix $\Sigma_\varepsilon$

### Reduced Form

The Structural Form is impossible to estimate directly because if you look at it there is a simultaneity problem, e.g. look at multiplying out $A_0 x_t$:
$$
\underbrace{
\begin{bmatrix} 
1 & a_{12}^0 \\
a_{21}^0 & 1 
\end{bmatrix}
}_{A_0}
\underbrace{
\begin{bmatrix} 
x_{1t} \\ 
x_{2t} 
\end{bmatrix}
}_{x_t} 
=
\begin{bmatrix} 
x_{1t} + a_{12}^0 x_{2t} \\
a_{21}^0 x_{1t} + 1x_{2t}
\end{bmatrix}
$$
If you put this back into the full structural equation ($A_0 x_t = A_1 x_{t-1} + \varepsilon_t$), Equation 1 looks like this: 
$$
x_{1t} + \mathbf{a_{12}^0 x_{2t}} = (\text{lags}) + \varepsilon_{1t}
$$
To fix this, we multiply the entire system by the inverse, $A_0^{-1}$ so **today's variables** ($x_t$) are all alone on the left-hand side, and we don’t have both $x_{1t}, x_{2t}$ on LHS: 
$$
x_t = \underbrace{A_0^{-1}A_1}_{C_1} x_{t-1} + \underbrace{A_0^{-1}A_2}_{C_2} x_{t-2} + \dots + \underbrace{A_0^{-1}A_p}_{C_p} x_{t-p} + \underbrace{A_0^{-1}\varepsilon_t}_{e_t}
$$
- That is in vector form, you can see each individual equation is also reduced form

We write this as C’s and this is now the **VAR(p) model:**
$$
x_t = C_1 x_{t-1} + C_2 x_{t-2} + \dots + C_p x_{t-p} + e_t
$$
- **The Coefficients ($C_1 \dots C_p$):** These are the **Reduced Form** parameters. We can estimate these perfectly using **OLS** (equation-by-equation).
- **The Residuals ($e_t$):** These are "Reduced Form" errors. They are **not** pure; they are a mathematical mix of the original structural shocks $\varepsilon_t$.

### Multivariate Wold Decomposition (VMA → VAR)

The VAR model isn't just a convenient guess; it is mathematically grounded in Wold’s Decomposition Theorem.

Recall from Wold’s decomposition that any stationary vector of variables, $x_t$, can be represented as a infinite sum of past structural shocks: 
$$
x_t = \Theta(L)\varepsilon_t = \sum_{h=0}^{\infty} \theta_h \varepsilon_{t-h}
$$
- This is a VMA, a **vector moving average** representation
- $\Theta(L)$ is a matrix polynomial in the lag operator $L$
    $$
    \Theta(L) = \theta_0 + \theta_1 L^1 + \theta_2 L^2 + \dots + \theta_h L^h
    $$
- But these $\theta_i$, these are actually matrices, they are n x n matrices

So in our 2 equation case, the Wold representation of the vector $x_t$ looks like this:
    $$
    \begin{bmatrix} \Delta m_t \\ \Delta y_t \end{bmatrix} = 
\underbrace{\begin{bmatrix} \theta_{11}^0 & \theta_{12}^0 \\ \theta_{21}^0 & \theta_{22}^0 \end{bmatrix}}_{\theta_0} \begin{bmatrix} \varepsilon_{1t} \\ \varepsilon_{2t} \end{bmatrix} + 
\underbrace{\begin{bmatrix} \theta_{11}^1 & \theta_{12}^1 \\ \theta_{21}^1 & \theta_{22}^1 \end{bmatrix}}_{\theta_1} \begin{bmatrix} \varepsilon_{1,t-1} \\ \varepsilon_{2,t-1} \end{bmatrix} + 
\dots
    $$
We can't estimate the VMA because shocks are invisible. However, if the system is invertible, we can write $\Theta(L)$ as a ratio of two polynomials, $a(L)^{-1}b(L)$, and get a VARMA representation instead: 
$$
x_t = a(L)^{-1}b(L) \epsilon_t \\ \implies a(L)x_t = b(L)\varepsilon_t
$$
If b(L) = 1, then we remove the MA component so 
$$
a(L) x_t = \varepsilon_t
$$
This is the pure VAR model we found from before. And this is what makes us happy to use ‘past data’.
- As long as vector $x_t$ is stationary
- Then it has a pure VMA representation
- Which also has a pure VAR representation
    - Which means past observations can be used to represent hidden past shocks

### Identification

#### What do we know?

Now that we know a VAR is a valid way to represent the economy, we face the problem that the reduced form alone does not fully identify the structural parameter the $A's$
$$
x_t = C_1 x_{t-1} + C_2 x_{t-2} + \dots + C_p x_{t-p} + e_t
$$
Sure, we can recover estimates $\hat C_1, \hat C_2,..., \hat C_p$ and the covariance matrix $\hat \Sigma$, 
- And, to be honest that is good enough if we only want to do forecasting, and do not actually care about the underlying parameters what they are.
- Once the variables to be included have been chosen VAR model fitting really involves only one parameter: the model order p.
    - For that, use information criteria evaluated over a range of model orders.

But we are often also interested in the true structural model, because this tells us something about the structure of the economy. 

To do that we need to check if we can actually identify the structural model.

#### How many restrictions do we need for identification?

**The "Knowns" (Reduced Form)**
- **The $'C'$ matrices:** There are $p$ of these matrices, each sized $n \times n$. 
    - That is $pn^2$ parameters.
- The Covariance Matrix $\Sigma$: This is the n x n error matrix of e, not structural error matrix
    - Because it's symmetric, it has $\frac{n(n+1)}{2}$ unique parameters.

- Total known parameters = $[pn^2 + n(n+1)/2]$

**The “Unknowns” (Structural Form)**
- **The $A$ matrices ($A_0, A_1, \dots, A_p$):** There are $p+1$ matrices (including $A_0$). 
    - That is $(p+1)n^2$ parameters.
- **The Structural Covariance** $\Sigma_\varepsilon$: This is the n x n structural shock matrix, 
    - Symmetric, so it also has $n(n+1)/2$ parameters.
- **Total Unknowns:** $[(p+1)n^2 + n(n+1)/2]$

**The "Gap”**
So the gap is drive entirely by the size of the $A_0$ matrix, see this by subtraction: 
$$
[(p+1)n^2 + \dots] - [pn^2 + \dots] = \mathbf{n^2}
$$
This is why we need exactly $n^2$ **restrictions** to identify the model.

#### What restrictions do we make? (3 types)

**Type 1: Normalisation ($n$ restrictions)**
Recall, we set the diagonal of $A_0$ to **1**, that diagonal we no longer have to estimate it.
$$
\underbrace{
\begin{bmatrix} 
1 & a_{12}^0 \\
a_{21}^0 & 1 
\end{bmatrix}
}_{A_0}
$$
- This just lets us say "Equation 1 is the equation for $x_{1t}$." 
- We need a further $n(n-1)$ restrictions

**Type 2: Assume orthogonal shocks**
We assume that structural shocks (like a "Technology shock" vs a "Monetary policy shock") are completely uncorrelated. 
The assumption that the structural shocks are orthogonal can be written as: 
$$
E(\varepsilon\varepsilon') = I \implies \Sigma = A_0^{-1}(A_0^{-1})'
$$
- This forces the off-diagonal elements of $\Sigma_\varepsilon$ to be **Zero**.
- There are $n(n-1)/2$, off diagonal spots in the matrix.
- We need a further $n(n+1)/2$ restrictions 

This is often thought a natural assumption since it follows from the modelling strategy in which unobserved structural shocks are viewed as distinct phenomena 

Interaction still happens  onto other variables, just not error to error
    - Instead, only through what is embodied in the economic model, as represented by the lag structure.
    - i.e. In our 2x2 case, any contemporaneous cross equation impacts arise through non-zero values of a12 and a21, not direct from error to error.

**Type 3A: Either use recursive identification**

**Type 3B: Or use long run restrictions**

#### 3A: Recursive Restriction - Sims

This is the default restriction. It is a "Short-Run"  strategy as it makes assumptions about what happens **instantly** (within the same time period $t$)

**The Core Concept: Waterfall Effect**<br>In a standard VAR, everything affects everything. Recursive identification puts a stop to that.

We assume the economy works like a waterfall:
- Variable 1 hits everything below it instantly
    - There is nothing before itself that influences it; it is the leader.
- Variable 2 hits everything below it instantly, 
    - Only hits Variable 1 (which is above), with a **lag** (tomorrow).
- Variable $n$ hits nothing instantly; 
    - it only reacts to the others and waits until tomorrow to influence them.

**Mathematically what does this mean?**
It means the $A_0$ matrix is now **Lower Triangular**. This means every cell above the diagonal is set to zero. 

Consider a a 3-variable system: ($x_1 = \text{Bank Rate}, x_2 = \text{Inflation}, x_3 = \text{GDP}$), we apply recursive restriction to make its $A_0$ matrix lower triangular 
$$
\underbrace{
\begin{bmatrix} 
1 & 0 & 0 \\
a_{21}^0 & 1 & 0 \\
a_{31}^0 & a_{32}^0 & 1 
\end{bmatrix}
}_{A_0}
\begin{bmatrix} 
x_{1t} \\ 
x_{2t} \\ 
x_{3t} 
\end{bmatrix}
= \text{lags}+ \begin{bmatrix} 
\varepsilon_{1t} \\ 
\varepsilon_{2t} \\ 
\varepsilon_{3t} 
\end{bmatrix}
$$
- **Row 1 (The Leader):** $1x_{1t} = (\text{lags}) + \varepsilon_{1t}$. Notice there is no $x_2$ or $x_3$ here. Interest rates are determined only by their own history and a pure shock.
- **Row 2:** $a_{21}^0 x_{1t} + 1x_{2t} = \dots$ Inflation ($x_2$) can be hit by Interest Rates ($x_1$) **instantly**.
- **Row 3 (The Follower):** $a_{31}^0 x_{1t} + a_{32}^0 x_{2t} + 1x_{3t} = \dots$. GDP ($x_3$) is hit by **both** $x_1$ and $x_2$ instantly.

Sims argued that many economic interactions have a natural "order" due to information lags or stickiness. This is typical chains of reasoning.

<br>This perfectly closes the identification gap, because the $A_0$ matrix is n x n, so by setting all upper traiangle cells to 0 we get exactly n(n-1)/2 restrictions.<br><br>
**Sensitivity Problem**
There is a big catch with Option 3A: **The results depend on the order you choose.**
If you put GDP first and Interest Rates last, you are assuming GDP hits Interest Rates instantly, but Interest Rates don't hit GDP until next month. This will produce different **Impulse Response Functions** than if you flipped the order.
> Key Exam Tip: When using a Cholesky/Recursive identification, you must justify the ordering of your variables based on economic theory (e.g., "Variables that are more 'sluggish' should be placed later in the vector", “The most exogenous variable in SR is placed first in the vector”).

#### 3B: Long-run Restriction - Blanchard and Quah (1989)

Instead of forcing $A_0$ (the instant effects) to be lower triangular, Blanchard and Quah force the **Long-Run Impact Matrix** to be lower triangular.

They distinguish between two types of shocks based on their persistence.
- Supply-side (Real): Have a permanent effect on the level of variables like GDP (e.g., a new technology makes the economy more productive forever).
- Demand-side (Nominal): Have a transitory effect. They might move GDP today, but eventually, the effect dies out, and GDP returns to its "natural" level.

So, let’s show this for a 2 variable economy.
Phillips economy where we have that Output Growth ($\Delta y_t$) and Unemployment ($u_t$)
$$
\bold x_t = \begin{bmatrix} \Delta y_{t} \\ u_{t} \end{bmatrix}
$$
- In their formulation both structural shocks will have a zero long run effect on unemployment and the growth of output, this is because they are stationary variables so can’t have growth in LR.
- **But *level* of output can be higher in the LR**

Recall from the Wold Decomposition that $x_t = \Theta(L)\varepsilon_t = [\theta_1 + \dots \theta_h] \varepsilon_t$. 

And recall the long-run impact of a shock is the **sum of all its effects over time:**
$$
\text{Long Run Effect} = \sum_{h=0}^{\infty} \theta_h = \bar{\Theta}
$$
This matrix, $\bar{\Theta}$, is the LR cumulative impact matrix. We set its upper triangle to zero. So in our Phillips economy, 
$$
\begin{bmatrix} \Delta y_{LR} \\ u_{LR} \end{bmatrix} = 
\begin{bmatrix} 
\bar{\theta}_{11} & \mathbf{0} \\
\bar{\theta}_{21} & \bar{\theta}_{22} 
\end{bmatrix}
\begin{bmatrix} \varepsilon_{Supply} \\ \varepsilon_{Demand} \end{bmatrix}
$$
- The Zero ($\bar{\theta}_{12} = 0$): This represents the restriction. It says Demand Shock ($\varepsilon_{Demand}$) has zero total effect on the level of output in the long run.
- The Supply Shock *is* allowed to change the level of output permanently.

Just like in Option A, this "Zero" provides the final $n(n-1)/2$ restriction needed to solve the system.
-  In a 2-variable system, you need that extra **1** restriction.
- By deciding that one shock is "neutral" in the long run, you provide that 1 restriction.
- The math then works backward from the long run to figure out what the short-run $A_0$  matrix must have looked like to make that long-run result possible.

Note that this relies on the Wold theorem to try and do the difficult task of figuring out what the original representation looks like, though we know it is theoretically possible.

Pros
- **Theory-Driven:** It doesn't matter which variable you "list first" in your software. What matters is which **shock** you restrict to be neutral.
- **Short-run freedom:** No need for any ordering in the first place

Cons
- **Stationarity Requirement:** For this to work, the variables in $x_t$ must be stationary (like growth rates $\Delta y_t$). If you used the *level* of GDP, it wouldn't return to a mean, and the "sum of impacts" wouldn't be well-defined.
- This gets really hard to justify beyond this real and nominal framework<br><br>

### Impulse Response Functions

#### Definition

An impulse response function measures the time profile of the effect of shocks at a give point in time on the values of the variables in a dynamical system in the future.

An IRF is a conceptual experiment. It answers the question: 
> "If a specific structural shock ($\varepsilon$) hits the economy today, how will all the variables in the vector $x$ evolve over the next $h$ periods?”

We write this, as the **impulse response of a shock:** $I_y$
$$
I_y(h, \delta, \Omega^0_{t-1}) = \underbrace{E(y_{t+h} | \text{Shock hits at } t)}_{\text{Scenario A}} - \underbrace{E(y_{t+h} | \text{No shock hits at } t)}_{\text{Scenario B}}
$$
- assume no other shocks in the system between t and t+h
- impulse response shows the isolated "ripple effect" of that one shock in h periods.

#### IRFs in different functions

**Univariate AR(1)**
$$
y_t = \rho y_{t-1} + \epsilon_t
$$
- The effect of a shock amount $\delta$,  is simply 
$$
I_y = \rho^h \delta
$$
- E.g. if $\rho =0.5$, then the impulse at point h, is after h halvings went through, it eventually dies out

**Univariate MA(1)**
$$
y_t = \phi \epsilon_{t-1} + \epsilon_t
$$
- The effect of a shock $\delta$, is simply 
$$
I_y = \delta (\frac{1-\phi^{h+1}}{1-\phi})
$$

**VAR**
The  impulse response functions are then traced out by the coefficients of the MA representation of $\bold x_t$ which is: 
$$
\bold x_t = \Theta(L) \varepsilon_t
$$
Each $\theta_h$ is a matrix whose $(i,j)$-th element gives the effect of shock $j$ on element $x_i$ at horizon $h$
**Long Run:** If the system is stationary, the IRF must eventually return to **0**.
