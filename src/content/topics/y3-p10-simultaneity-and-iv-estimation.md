---
title: "Simultaneity and instrumental variables"
paper: "Paper 10 — Econometrics"
year: "Year 3 (Part IIB)"
section: "Time Series"
description: "Structural and reduced-form equations, identification and instrumental-variable estimation."
order: 50
tags: ["economics"]
---

## Lecture Notes

### Motivation

How do you estimate supply and demand?
![](../../assets/notes/y3-p10-simultaneity-and-iv-estimation/01.png)
You have a scatter point of observations, you see they cluster at equilibrium $(y_1, y_2)$
![](../../assets/notes/y3-p10-simultaneity-and-iv-estimation/02.png)

### Keynesian Consumption-Income

Simultaneity creates an endogeneity problem, specifically the income of an economy is endogenous and consumption also endogenous as they determine each other:
![](../../assets/notes/y3-p10-simultaneity-and-iv-estimation/03.png)
To estimate these structural equations, you begin with writing them in their reduced form i.e. solely in terms of exogenous parameters:
![](../../assets/notes/y3-p10-simultaneity-and-iv-estimation/04.png)
The consumption function (regression of Ct on Yt) does not satisfy the assumptions of the CLRM so application of OLS to the consumption function will yield inconsistent estimate of β

See that because of the bias from:
$$
u_t \rightarrow v_t \rightarrow Y_t \implies Cov(Y_t, u_t) \neq 0
$$

### Instrumental Variables

#### Why we need exogeneity

The general linear model is written as: 
$$
\underbrace{y}_{n \times 1} = \underbrace{X}_{n \times k} \ \underbrace{\beta}_{k \times 1} + \underbrace{u}_{n \times 1}
$$
To solve for $\beta$, multiply the entire equation by the transpose of the regressors ($X'$), we get the moment equation: 
$$
X'y = X'X\beta + X'u
$$
In the **Classical Linear Regression Model (CLRM)**, the OLS estimator is obtained by setting $X'u = 0$, which assumes no correlation between the data and the noise: 
$$
\hat{\beta}_{OLS} = (X'X)^{-1}X'y
$$
For this OLS estimator to be **consistent**, these two classical assumptions must hold as the sample size $n$ approaches infinity:

    1. Finite Variance of Regressors
        $$
        plim \frac{1}{n}X'X = \Sigma_{XX}
        $$
         (where $\Sigma_{XX}$ is a non-singular matrix)

    2. Exogeneity
        $$
        plim \frac{1}{n}X'u = 0
        $$
        (the regressors are uncorrelated with the error)

**The Failure:** With **simultaneity**, the exogeneity assumption no longer holds.<br><br>

#### Instruments

Suppose however that one can find an n × k matrix W containing variables that are: 
- (i) **Exogenous - **contemporaneously uncorrelated with the disturbance term 
    $$
    plim \frac{1}{n}W'u = 0
    $$
- (ii) **Relevant - **correlated with the regressors X
    $$
    plim \frac{1}{n}W'X = \Sigma_{WX} \ \ \ \ s.t. |\Sigma_{WX}| \neq 0
    $$
    - that is to say that the covariance matrix is non-singular 
    - i.e. does not have a determinant of 0

So using the valid instrument $W'$ to multiply through our equation instead we get: 
$$
W'y = W'X\beta + W'u
$$
And from the exogeneity we have **the IV estimator:**
$$
\hat{\beta}_{IV} = (W'X)^{-1} \ W'y
$$
Thus in the consumption function example above the variable **Z would provide a valid instrument for Y,** in the regression of C on Y . 
- Note that by assumption it satisfies both (i) and (ii)
- Think of this as letting us shock the Y curve around without shocking the C curve, then through that we can trace out the consumption schedule

### Tests for Valid Instruments

Analysts must use specific statistical tests to verify that their instruments meet the requirements of exogeneity and relevance.
- **F-tests and Weak Instruments**: Used to check the strength of the relationship between the instrument (W) and the endogenous regressor (X).
- **Hausman Test of Exogeneity**: Used to test the exogeneity of an instrument, though it requires having at least one other instrument already known to be valid
- **Sargan Test**: A test of "over-identifying restrictions" used when you have more instruments than endogenous variables to check if the extra instruments are validly uncorrelated with the error.

#### Why this matters

If instruments fail their core assumptions, the resulting IV estimates can be more biased and less reliable than the original OLS estimates.<br><br>Endogenous Instruments<br>If the instrument is correlated with the error term ($E(\epsilon_i | z_i) \neq 0$), the estimator remains inconsistent
- Even if an instrument is "nearly exogenous" (small correlation with error), it can still cause severe problems if it is also weak

Here is why:
Suppose the true model takes the form of $y_i = \beta x_i + \gamma z_i + \epsilon_i$. You retardedly use z as an instrument for x in this regression so you estimate:
$$
\hat{\beta}_{IV} = \frac{\sum y_i z_i}{\sum x_i z_i} = \beta + \frac{\sum z_i(\gamma z_i + \epsilon_i)}{\sum x_i z_i}
$$
Taking the probability limit ($plim$):
$$
plim \ \hat{\beta}_{IV} = \beta + \gamma \cdot \frac{Var(z)}{Cov(x, z)} 
$$
The bias depends on: <br>1. **The degree of endogeneity (**$\gamma$**)**: 
$$
\text{bias} = \gamma \cdot \frac{Var(z)}{Cov(x, z)} 
$$
- How much the "instrument" actually belongs in the main equation.

2. **The Correlation Ratio**: The ratio of the variance of $z$ to the covariance of $x$ and $z$. 
- If the instrument is weak ($Cov(x, z)$is small), the bias is magnified significantly.

Weak Instruments
Weak instruments occur when $W$ is poorly correlated with $X$ ($E(x_i z_i) \approx 0$)
- **Result**: While theoretically unbiased, estimates become very "dispersed" (large variance)<br>

#### Weak Instrument Rule of Thumb

#### **Rule of Thumb**: Instrument is likely weak, if the F-statistic of the "first-stage" regression \< ** 10**

![](../../assets/notes/y3-p10-simultaneity-and-iv-estimation/05.png)

### 2SLS and 3SLS

#### M equations in time t

Imagine you have $M$ different equations, that were of the form: 
$$
\gamma_{11}y_{1t} + \gamma_{21}y_{2t} + \dots + \gamma_{M1}y_{Mt} + \beta_{11}x_{1t} + \dots + \beta_{K1}x_{Kt} = u_{1t} \\ \vdots \\ \gamma_{1M}y_{1t} + \gamma_{2M}y_{2t} + \dots + \gamma_{MM}y_{Mt} + \beta_{1M}x_{1t} + \dots + \beta_{KM}x_{Kt} = u_{Mt}
$$
- The $y$ terms: These are the variables determined inside the system (Endogenous)
- **The **$x$** terms**: These are variables that come from *outside* (Exogenous)
- **The **$\gamma$** and **$\beta$** values**: these are the "weights" or "slopes" we want to find. 
    - **Normalization**: In equation 1, we usually set $\gamma_{11} = 1$. 
    - This allows you to "solve" for $y_{1t}$ by moving everything else to the other side of the equals sign.<br>
Each equation involves $M$ variables that are decided within the system (**Endogenous** $Y$) and $K$ variables that come from outside (**Exogenous** $X$).

Economists don't want to write M lines every time. They want to "package" them. At any single moment t, we can write all M equations as one line of matrix multiplication: 
$$
\underbrace{ [ y_{1t} \dots y_{Mt} ] }_{y't\text{ (1} \times \text{M)}} \underbrace{ \begin{bmatrix} \gamma_{11} & \dots & \gamma_{1M} \\ \vdots & \ddots & \vdots \\ \gamma_{M1} & \dots & \gamma_{MM} \end{bmatrix} }_{\Gamma \text{ (M} \times \text{M)}} + \underbrace{ [ x_{1t} \dots x_{Kt} ] }_{x't \text{ (1} \times \text{K)}} \underbrace{ \begin{bmatrix} \beta_{11} & \dots & \beta_{1M} \\ \vdots & \ddots & \vdots \\ \beta_{K1} & \dots & \beta_{KM} \end{bmatrix} }_{B \text{ (K} \times \text{M)}} = \underbrace{ [ u_{1t} \dots u_{Mt} ] }_{u'_t \text{ (1} \times \text{M)}}
$$
- The columns in the slope matrix, are the slopes for each specific equation
    - E.g. column 1, has the slopes for equation 1 (consumption)
    - E.g. column 2, has the slopes for equation 2 (income) etc.

We simply write this, at time t as: 
$$
y'_t \ Γ + x'_t \ B = u'
$$

#### Stack from t = 1 to T

But we don’t want to write it for just one point in time t, we stack it for all T time periods. 
Stack this up so that:

$Y = \begin{bmatrix}
y_{11} & y_{21} & \dots & y_{M1} \\
\vdots & \vdots & \ddots & \vdots \\
y_{1t} & y_{2t} & \dots & y_{Mt} \\
\vdots & \vdots & \ddots & \vdots \\
y_{1T} & y_{2T} & \dots & y_{MT}
\end{bmatrix}
\text{ Dimensions: } (T \times M)$
- **Columns**: Each column is the full time-series for one variable (e.g., Column 1 is all Consumption data)
- **Rows**: Each row is a snapshot of the entire system at one specific time t<br>
$X = \begin{bmatrix}
x_{11} & x_{21} & \dots & x_{K1} \\
\vdots & \vdots & \ddots & \vdots \\
x_{1t} & x_{2t} & \dots & x_{Kt} \\
\vdots & \vdots & \ddots & \vdots \\
x_{T1} & x_{T2} & \dots & x_{TK}
\end{bmatrix}
\text{ Dimensions: } (T \times K)$
- **Columns**: Each column is the full time-series for an "outside" driver (e.g., Government Spending)
- **Rows**: Each row is a snapshot of the entire system at one specific time t

We stack those $y'_t$ rows T times over to create the **full **$Y$**matrix: **
$$
\underbrace{Y}_{(T \times M)} \underbrace{\Gamma}_{(M \times M)} + \underbrace{X}_{(T \times K)} \underbrace{B}_{(K \times M)} = \underbrace{U}_{(T \times M)}
$$

#### Get reduced form equation

To actually do the math, we "flip" the system to get Y alone on the LHS by multiplying everything by the inverse of $\Gamma$ 
$$
Y = X \Pi + V
$$
- where $\Pi = -B\Gamma^{-1}$: These are the "Reduced Form" parameters
- **Consistency**: Because $X$ is exogenous (outside the system), it is uncorrelated with the new error $V$
- Now you can finally use OLS/SUR to estimate these values

#### Key assumptions for estimating reduced forms

Before estimating, we make three key assumptions about the structural disturbances.

Assumptions
1. Zero Mean: $E(u_t) = 0$
2. Contemporaneous Correlation: $E(u_t u_t') = \underbrace{\Sigma}_{M\times M}$
    1. This assumes that shocks to different equations (e.g., Ford vs. Chrysler) can be correlated at the same time
3. No Serial Correlation: $E(u_t u_s') = 0$
    1. Shocks today do not affect shocks tomorrow.

We can actually already estimate Y, when we "flipped" the system earlier using $\Gamma^{-1}$, we created a new error term $V = U\Gamma^{-1}$. 
Its variance-covariance matrix is denoted as $\Omega$: .
$$
\Omega = (\Gamma^{-1})' \Sigma \Gamma^{-1}
$$
**Estimation:** Because $V$ is uncorrelated with $X$, we can estimate $\Pi$ and $\Omega$ consistently using OLS or SUR.<br><br>**Usage:** These estimates are perfect for **forecasting** $Y$ given $X$ but they do not immediately reveal the true structural parameters ($\Gamma, B, \Sigma$). To estimate the structural parameters we need to satisfy identification conditions.

#### Identification

If I give you the number **10** (Reduced Form) and tell you it was made by$A+B$ (Structural Form), you can't tell me what A and B are. It could be 5+5, 9+1. This system is **unidentified**. 

We need more "rules" (restrictions) to narrow it down to one answer. Analagously, while we can easily estimate the **Reduced Form** ($Y = X\Pi + V$) using OLS. The **Structural Form** ($Y\Gamma + XB = U$) has way more "unknowns" (parameters) than the Reduced Form has "knowns."
- **The Structural Form** has $M^2$ coefficients in $\Gamma$ and $MK$ coefficients in $B$
- **The Reduced Form** only gives us $MK$ coefficients in $\Pi$

To close this gap $M^2 + MK - MK = M^2$, and solve for the structural parameters, we need to impose $M^2$** restrictions** on the system<br><br>We can do this through two measures:
- Normalization - We force one variable in each equation to have a coefficient of **1**. This just means we are deciding which variable is the "dependent" one (e.g., $y_1$ is Consumption). **This gives us **$M$** restrictions.<br>**
- Exclusion Restrictions - $M^2 - M$  **is how many exclusion restrictions we need. **This is where we use economic theory to introduce new restrictions.
    - *"Variable *$X_3$* affects Income, but it has ZERO direct effect on Consumption."* 
    - By forcing it to be 0, we create a restriction to help solve the puzzle.<br><br>

#### Identification Rules: Rank and Order Conditions

#### **Rule 1: The Order Condition (Counting)**

This is a **necessary** but not sufficient condition. It’s a simple counting rule. For an equation j to be identified, (looking only at the RHS variables): 
$$
\text{Exogenous Variables Excluded from j} \ge \text{Endogenous Variables in RHS of j}
$$
- Every endogenous variable on the right-hand side is correlated with the error.
- To fix it, you need an **instrument**. 
- The instruments available are the exogenous variables ($X$) that are not in that equation already
- E.g. in the $C = aY + u$,      $Y = C + Z$, example:
    - For C, there is 1 endogenous variable on RHS (Y)
        - And there is 1 exogenous variable *excluded* from it(Z)
        - So C may be just-identified (still need to check order)
    - For Y, there is 1 endogenous variable on RHS (C)
        - But there is 0 exogenous var *excluded*
        - So Y is for sure under-identified (no need to check order)
An equation is just-identified when we just meet this criteria. It is *over-identified *when we have more exogenous variable excluded than endogenous included.

#### **Rule 2: The Rank Condition (The "Independence" Test)**

This is the **sufficient** condition. It ensures that the variables you excluded actually have enough "power" to identify the equation.<br>
The Order Condition only tells you if you have enough variables on paper. The **Rank Condition** tells you if those excluded variables actually *do anything* in the rest of the system. Rank condition is sufficient.<br>
If the variables you excluded ($x_3, x_4$) have coefficients of **zero** in every other equation in the system, they are useless. They won't help you "trace out" the first equation.

**STEP 1: Construct the Master Matrix**
Look at Master Matrix of all the coefficients of all equations, $A$, which stacks $\Gamma$ and $B$: 
$$
A = \begin{bmatrix} \Gamma \\ B \end{bmatrix}
$$
If we have $M=3$ equations and $K=2$ exogenous variables, the matrix looks like this: 
$$
A = \begin{bmatrix} \Gamma \\ B \end{bmatrix} = 
\begin{bmatrix} 
\gamma_{11} & \gamma_{12} & \gamma_{13} \\
\gamma_{21} & \gamma_{22} & \gamma_{23} \\
\gamma_{31} & \gamma_{32} & \gamma_{33} \\ \hline
\beta_{11} & \beta_{12} & \beta_{13} \\
\beta_{21} & \beta_{22} & \beta_{23} 
\end{bmatrix} 
\begin{matrix} 
\\ \text{Endogenous Variables } (y) \\ \\ \hline \\ \text{Exogenous Variables } (x) 
\end{matrix}
$$
- Eqn 1 = col 1, Eqn 2= col 2, Eqn 3 = col 3

**STEP 2: Search and destory**<br>To see if **Equation j **is identified, we perform a "Search and Destroy" mission on A:
1. Look at Equation j (the j$^{th}$ column). Identify every variable that **IS** in that equation (i.e. find every row, in column j, where the coefficient $\neq 0$).
2. **Delete** those rows from the entire matrix.
    1. we do not want the variables already in use by equation j
3. **Delete** the column for Equation j itself. 
    1. we do not want to estimate equation j……by using equation j (!!!)

What is left? A sub-matrix made of the other columns (Eq 2 and Eq 3) but only of the excluded rows.

**STEP 3: Rank Check**
Now, look at that remaining sub-matrix $A^*$,  what is its rank? 
We require that an equation j is identified if its submatrix meets the rank condition:
$$
\text{Rank Condition for eqn j: } rank \ A^*_j = M-1
$$
**The system is fully identified if all the equations able to satisfy the rank condition.**

Recall that rank is the number of unique pieces of information in a matrix.

A matrix has "Full Rank" if none of its rows (or columns) can be created by adding or scaling the other rows. E.g.
![](../../assets/notes/y3-p10-simultaneity-and-iv-estimation/06.png)
Now suppose our sub-matrix $A^*$ is indeed a full rank matrix of 2x2 size: 
$$
A^* = \begin{bmatrix} 
\gamma_{32} & \gamma_{33} \\
\beta_{22} & \beta_{23} 
\end{bmatrix} = 
\begin{bmatrix} 
0.8 & 0 \\
0 & 0.5 
\end{bmatrix}
$$
- The **Rank is 2**
- We said our system had M=3 equations so 
$$
\text{LHS:  \ \  \ rank}\  A^* = 2 \\ \ \\  \text{RHS: }M-1 = 3-1 =2
$$
The rank condition is met, the equation is identified!

The equation is under-identified if the excluded variables do not actually affect the other variables e.g. we get that 
$$
A^* = \begin{bmatrix} 0 & 0 \\
0 & 0 
\end{bmatrix}
$$
- the rank is 0
- underidentified

#### Estimation via Indirect Least Squares

**When to use:** Only when the system is **Just-Identified** ($Excl. X = Incl. Y$).
If you can’t estimate the structural slopes ($\Gamma, B$) directly because of endogeneity, you estimate the "clean" Reduced Form slopes ($\Pi$) and then use algebra to work backward.

1. Run OLS on the Reduced Form equation:  
    $$
     Y = X\Pi + V
    $$
    - Because $X$ is exogenous, these $\hat{\Pi}$ estimates are consistent.

1. Use the theoretical link, that we know:
$$
\Pi = -B\Gamma^{-1}
$$
- Since you now have a number for $\hat{\Pi}$, you solve for the original $B$ and $\Gamma$.

**The Catch:** This only works if the system is **Just-Identified**. If it’s over-identified, you’ll have multiple "answers" for the same slope, and you won't know which one to pick.<br><br><br>Still, direct estimation of the structural form is also possible, using some variant of instrumental variables.

#### Estimation via 2SLS

This is the "Direct" way to estimate an over-identified equation. We use the exogenous variables to create a "clean proxy" for the messy endogenous variables.

Consider an equation we seek to estimate, e.g. at one point of time j:
$$
y_j = Y_j \gamma_j + X_j \beta_j + u_j
$$
1. Regress the "messy" $Y_j$ on **all** exogenous variables ($X$) in the system. 
$$
\hat{Y}_j = X(X'X)^{-1}X'Y_j
$$
- Get the fitted values of $Y_j$, save them these are now ‘purified’

1.  Replace the original $Y_j$ in your equation with the "clean" predicted $\hat{Y}_j$ and run OLS:
$$
y_j = \hat{Y}_j\gamma_j + X_j\beta_j + u^*
$$
- The resulting coefficients are consistent.

1. The 2SLS estimator we write in terms of a new matrix $Z_j = [\hat{Y}_j, X_j]$, to replace the old matrix of regressors.
$$
\hat{\delta}_{2SLS} = (\hat Z' \hat Z)^{-1} \hat Z' y
$$

#### Estimation via 3SLS

2SLS is great, but it ignores the fact that the errors in Equation 1 might be correlated with errors in Equation 2, 3SLS is thus a combination of SUR and 2SLS logic.
i.e. Stage 1 = 2SLS, and Stages 2 and 3 are 3SLS:
- **Stage 1:** Run 2SLS on every equation in system to get residuals ($\hat{u}$). Recall that this is what you need to a feasible GLS in a SUR model.
- **Stage 2: **Use those residuals to estimate the contemporaneous covariance matrix
- **Stage 3 (The System Weighting):** Estimate the entire system at once using Generalized Least Squares (GLS). 

Visually what we try to do is use our instruments in each equation, and then stack all the equations in big block: 
$$
\underbrace{
\begin{bmatrix} 
y_1 \\ y_2 \\ \vdots \\ y_M 
\end{bmatrix}
}_{y \ (MT \times 1)}
= 
\underbrace{
\begin{bmatrix} 
Z_1 & 0 & \dots & 0 \\
0 & Z_2 & \dots & 0 \\
\vdots & \vdots & \ddots & \vdots \\
0 & 0 & \dots & Z_M 
\end{bmatrix}
}_{Z \ (MT \times \sum K_i)}
\underbrace{
\begin{bmatrix} 
\delta_1 \\ \delta_2 \\ \vdots \\ \delta_M 
\end{bmatrix}
}_{\delta \ (\text{all coeffs})}
+
\underbrace{
\begin{bmatrix} 
u_1 \\ u_2 \\ \vdots \\ u_M 
\end{bmatrix}
}_{u \ (MT \times 1)}
$$
- $y$: All dependent variables stacked, for all their time history
- $Z$: A "Block Diagonal" matrix. Each $Z_j$ block contains the instruments for that specific equation.
$$
y= Z \delta + u
$$
We want to scale this like a GLS method by some amount $P$, which we shows in the last lecture is the inverse of the contemporaneous covariance matrix. 
$$
\Sigma = \begin{bmatrix} \sigma_{11} & \dots & \sigma_{1M} \\ \vdots & \ddots & \vdots \\ \sigma_{M1} & \dots & \sigma_{MM} \end{bmatrix} \\ \ \\ get \ \Sigma ^{-1}
$$
We then find that the GLS estimator, is close to OLS, we just squeezed in the weighting matrix inside it:  
$$
\hat \delta_{3SLS} = \left[ \hat Z' (\Sigma^{-1} \otimes I) \hat Z \right]^{-1} \hat Z' (\Sigma^{-1} \otimes I) y
$$
Instead of writing Kroenecker product we like to call that matrix $\Omega^{-1}$ so: 
$$
\hat \delta_{3SLS} =\left[ \hat Z' \ \Omega^{-1} \ \hat Z \right]^{-1} \hat Z'\  \Omega^{-1} \  y
$$

## Pesaran Ch.19

## Past Papers

### Q1 - 2015

![](../../assets/notes/y3-p10-simultaneity-and-iv-estimation/07.png)
![](../../assets/notes/y3-p10-simultaneity-and-iv-estimation/08.png)

