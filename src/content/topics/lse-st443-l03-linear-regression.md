---
draft: false
title: "Lecture 3 - Linear regression"
paper: "ST443 Machine Learning and Data Mining"
year: "M.S. Statistics (LSE)"
section: "Machine learning"
description: "Least squares from the normal equations, the projection picture, t- and F-tests, confidence sets, measures of fit, and where KNN regression beats a straight line."
order: 3
tags: [statistics, machine-learning, regression]
---

ST443, LSE, Autumn Term 2026, week 3. Reading: ISLR (2nd edition) Chapter 3; ESL 3.2. Page and table numbers refer to ISLR.

## Cheat sheet

- **Model:** $Y=\beta_0+\beta_1X_1+\dots+\beta_pX_p+\epsilon$, $\epsilon\sim\mathcal N(0,\sigma^2)$; in matrix form $\mathbf y=\mathbf X\boldsymbol\beta+\boldsymbol\epsilon$, $\mathbf X\in\mathbb R^{n\times(p+1)}$ with a leading column of 1s.
- **RSS:** $\mathrm{RSS}(\boldsymbol\beta)=\|\mathbf y-\mathbf X\boldsymbol\beta\|_2^2$. **RSE** $=\sqrt{\mathrm{RSS}/(n-p-1)}$.
- **Gradient:** $\partial\mathrm{RSS}/\partial\boldsymbol\beta=-2(\mathbf y-\mathbf X\boldsymbol\beta)^{\mathsf T}\mathbf X$; Hessian $2\mathbf X^{\mathsf T}\mathbf X\succeq0$, so RSS is convex.
- **Normal equations:** $\mathbf X^{\mathsf T}(\mathbf y-\mathbf X\boldsymbol\beta)=\mathbf 0\iff\mathbf X^{\mathsf T}\mathbf X\boldsymbol\beta=\mathbf X^{\mathsf T}\mathbf y$. Residuals are orthogonal to the columns of X.
- **Full column rank:** $\hat{\boldsymbol\beta}=(\mathbf X^{\mathsf T}\mathbf X)^{-1}\mathbf X^{\mathsf T}\mathbf y$, $\hat{\mathbf y}=\mathbf H\mathbf y$, $\mathbf H=\mathbf X(\mathbf X^{\mathsf T}\mathbf X)^{-1}\mathbf X^{\mathsf T}$, $\mathbf H^2=\mathbf H=\mathbf H^{\mathsf T}$.
- **p = 1:** $\hat\beta_1=\sum(x_i-\bar x)(y_i-\bar y)/\sum(x_i-\bar x)^2$, $\hat\beta_0=\bar y-\hat\beta_1\bar x$.
- **Rank deficient:** $\hat{\boldsymbol\beta}$ is not unique, but $\hat{\mathbf y}$ still is.
- **Fixed design, normal errors:** $\hat{\boldsymbol\beta}\sim\mathcal N\big(\boldsymbol\beta,\sigma^2(\mathbf X^{\mathsf T}\mathbf X)^{-1}\big)$; $\hat\sigma^2=\mathrm{RSS}/(n-p-1)$ is unbiased; $(n-p-1)\hat\sigma^2\sim\sigma^2\chi^2_{n-p-1}$, independent of $\hat{\boldsymbol\beta}$.
- **t-test** of $\beta_j=0$: $z_j=\hat\beta_j/\mathrm{SE}(\hat\beta_j)$, $\mathrm{SE}(\hat\beta_j)=\hat\sigma\sqrt{v_j}$, $v_j=[(\mathbf X^{\mathsf T}\mathbf X)^{-1}]_{jj}$; under $H_0$, $z_j\sim t_{n-p-1}$.
- **F-test (nested):** $F=\dfrac{(\mathrm{RSS}_0-\mathrm{RSS}_1)/(p_1-p_0)}{\mathrm{RSS}_1/(n-p_1-1)}\sim F_{p_1-p_0,\,n-p_1-1}$ under $H_0$. For one coefficient, $F=z_j^2$.
- **CI:** $\hat\beta_j\pm z^{(1-\alpha/2)}\mathrm{SE}(\hat\beta_j)$; 95% is roughly $\hat\beta_j\pm2\,\mathrm{SE}$. The joint set for $\boldsymbol\beta$ is an ellipsoid centred at $\hat{\boldsymbol\beta}$ with shape $\mathbf X^{\mathsf T}\mathbf X$.
- **Fit:** $R^2=1-\mathrm{RSS}/\mathrm{TSS}\in[0,1]$; for p = 1, $R^2=r^2$.
- **Tweaks:** dummy variables, interactions $X_1X_2$, polynomial features $\varphi(X)=(1,X,X^2)$. All still linear in $\boldsymbol\beta$.
- **KNN regression:** $\hat f(x_0)=\frac1K\sum_{x_i\in\mathcal N_0}y_i$; small K is rough, large K is smooth; it struggles when p is large.

## Recap: determinants by Gaussian elimination

The lecture opened with extra slides added to Lecture 1.

Laplace (cofactor) expansion along the first row of a 3 × 3 matrix:

$$
\det\begin{pmatrix}a&b&c\\d&e&f\\g&h&i\end{pmatrix}=a\det\begin{pmatrix}e&f\\h&i\end{pmatrix}-b\det\begin{pmatrix}d&f\\g&i\end{pmatrix}+c\det\begin{pmatrix}d&e\\g&h\end{pmatrix}
$$

Gaussian elimination scales better than Laplace. Every row operation is multiplication by an elementary matrix with a known determinant:

1. **Swap two rows** ($\begin{pmatrix}0&1\\1&0\end{pmatrix}$): det = −1, so the determinant flips sign.
2. **Scale a row by c** (diag(c, 1)): det = c.
3. **Add c × one row to another** ($\begin{pmatrix}1&c\\0&1\end{pmatrix}$): det = 1, so the determinant is unchanged.

Reduce to triangular form, multiply the diagonal, and correct for the swaps and scalings. Elimination costs about $n^3$ operations; naive Laplace expansion costs about $n!$, which is hopeless beyond n ≈ 10.

## Probability recap: densities

A continuous distribution P on $\mathbb R^d$ is represented by a density f with

$$
f(\mathbf x)\ge0\ \ \forall\mathbf x,\qquad\int_{\mathbb R^d}f(\mathbf x)\,d\mathbf x=1,\qquad\mathbb P(X\in B)=\int_Bf_X(\mathbf x)\,d\mathbf x
$$

It all integrates to 1, and the probability of B is the integral of the density over B, for any measurable B. The alternatives are the CDF $F(\mathbf z)=\mathbb P(X\le\mathbf z)$ coordinate-wise, and the characteristic function $\varphi_X(\mathbf t)=\mathbb E[e^{i\langle\mathbf t,X\rangle}]$, where t is a vector in $\mathbb R^d$. For now the pdf does the job.

## Moments and covariance

**d = 1.** $\mathbb E[X]=\int xf(x)\,dx$ and $\mathbb E[X^n]=\int x^nf(x)\,dx$, because $\mathbb E[g(X)]=\int g(x)f(x)\,dx$.

$$
\mathrm{cov}(X,Y)=\mathbb E[(X-\mathbb EX)(Y-\mathbb EY)]=\mathbb E[XY]-\mathbb E[X]\mathbb E[Y],\quad \mathrm{var}(X)=\mathrm{cov}(X,X),\quad \mathrm{corr}(X,Y)=\frac{\mathrm{cov}(X,Y)}{\sigma(X)\sigma(Y)}
$$

- $\mathrm{cov}(X,a)=0$; covariance is symmetric; $\mathrm{cov}(aX,bY)=ab\,\mathrm{cov}(X,Y)$; shifts do not matter.
- $\mathrm{var}(X)\ge0$, with $\mathrm{var}(X)=0\iff X\equiv c$ almost surely.
- $\mathrm{corr}\in[-1,1]$, and $|\mathrm{corr}|=1\iff X=aY+b$.

**d ≥ 1.** The vector integral $\int\mathbf xf(\mathbf x)\,d\mathbf x$ is the continuous version of $\sum x\,p(x)$.

$$
\mathrm{cov}(X,Y)=\mathbb E\big[(X-\mathbb EX)(Y-\mathbb EY)^{\mathsf T}\big]\in\mathbb R^{d_1\times d_2},\qquad \mathrm{var}(X)=\mathrm{cov}(X,X)
$$

- $\mathbb E[\mathbf AX+\mathbf b]=\mathbf A\mathbb E[X]+\mathbf b$.
- $\mathrm{var}(X)$ is symmetric and positive semidefinite: $\mathbf v^{\mathsf T}\mathrm{var}(X)\mathbf v=\mathrm{var}(\mathbf v^{\mathsf T}X)\ge0$.
- $\mathrm{var}(\mathbf AX+\mathbf b)=\mathbf A\,\mathrm{var}(X)\mathbf A^{\mathsf T}$ and $\mathrm{cov}(\mathbf AX+\mathbf b,\mathbf CY+\mathbf d)=\mathbf A\,\mathrm{cov}(X,Y)\mathbf C^{\mathsf T}$. These two lines give the distribution of $\hat{\boldsymbol\beta}$ below.

## The "celebrity" distributions

**Multivariate normal** $X\sim\mathcal N(\mathbf m,\boldsymbol\Sigma)$:

$$
f_X(\mathbf x)=(2\pi)^{-d/2}[\det\boldsymbol\Sigma]^{-1/2}\exp\!\Big(-\tfrac12(\mathbf x-\mathbf m)^{\mathsf T}\boldsymbol\Sigma^{-1}(\mathbf x-\mathbf m)\Big)
$$

$\mathbb EX=\mathbf m$ and $\mathrm{var}X=\boldsymbol\Sigma$ characterise it completely, and it is closed under affine maps: $\mathbf AX+\mathbf b\sim\mathcal N(\mathbf A\mathbf m+\mathbf b,\mathbf A\boldsymbol\Sigma\mathbf A^{\mathsf T})$.

**Chi-squared** with k degrees of freedom: $\chi^2_k=\sum_{i=1}^kX_i^2$ with $X_i$ IID N(0, 1), i.e. square k standard normals and add them up. Mean k, variance 2k. Its pdf uses the gamma function $\Gamma(z)=\int_0^\infty t^{z-1}e^{-t}dt$, which is like a factorial but continuous: $\Gamma(n)=(n-1)!$.

**Student t** with ν > 0 degrees of freedom: bell-shaped with heavier tails than the normal. Mean 0 for ν > 1; variance ν/(ν − 2) for ν > 2. ν = 1 is the Cauchy, and ν → ∞ gives N(0, 1).

**F** with $(d_1,d_2)$ degrees of freedom: $X=\dfrac{U_1/d_1}{U_2/d_2}$ with $U_1\sim\chi^2_{d_1}$ independent of $U_2\sim\chi^2_{d_2}$. Mean $d_2/(d_2-2)$ for $d_2>2$.

Why these four: $\hat{\boldsymbol\beta}$ is normal, $\hat\sigma^2$ is χ², their ratio gives t for a single coefficient, and a ratio of two χ² quantities gives F for groups of coefficients.

> This is the same machinery as ST460. There $\sqrt n(\bar X-\mu)/S\sim t_{n-1}$; here $(\hat\beta_j-\beta_j)/\mathrm{SE}(\hat\beta_j)\sim t_{n-p-1}$. The sample mean is the special case p = 0, an intercept only.

## The linear regression model

$$
Y=f_{\boldsymbol\beta}(X)+\epsilon,\qquad f_{\boldsymbol\beta}(X)=\beta_0+\sum_{j}\beta_jX_j,\qquad\epsilon\sim\mathcal N(0,\sigma^2)
$$

$\boldsymbol\beta\in\mathbb R^{p+1}$ includes the intercept. Simple and interpretable, with many generalisations to come.

## Least squares

Given IID realisations $(\mathbf x_i,y_i)_{i=1}^n$, minimise the residual sum of squares:

$$
\mathrm{RSS}(\boldsymbol\beta)=\sum_{i}\Big[y_i-\beta_0-\sum_jx_{i,j}\beta_j\Big]^2=\|\mathbf y-\mathbf X\boldsymbol\beta\|_2^2\ \to\ \min_{\boldsymbol\beta\in\mathbb R^{p+1}}
$$

with $\mathbf y\in\mathbb R^n$ and $\mathbf X$ the $n\times(p+1)$ matrix whose i-th row is $(1,\mathbf x_i^{\mathsf T})$. On the plane-fit picture, the vertical sticks are the residuals being squared.

- **RSE** $=\sqrt{\mathrm{RSS}/(n-p-1)}$: the RSS rescaled into the units of Y.
- For sales ≈ β₀ + β₁ TV, RSS as a function of $(\beta_0,\beta_1)$ is a bowl. Its contours are nested ellipses and the least squares estimate sits at the bottom.

> **ISLR §3.1, Tables 3.1 and 3.2.** Regressing sales (thousands of units) on TV budget (thousands of dollars) over 200 markets gives $\hat\beta_0=7.0325$, $\hat\beta_1=0.0475$: an extra \$1,000 of TV spend goes with about 47.5 more units sold. RSE = 3.26, so actual sales miss the true line by about 3,260 units on average, roughly a 23% error on mean sales of about 14,000. R² = 0.612.

## What regression answers

For sales ≈ β₀ + β₁ TV + β₂ radio + β₃ newspaper:

1. **Is there any relation?** $H_0:\boldsymbol\beta=\mathbf 0$: the F statistic.
2. **How strong?** RSE and R².
3. **Which media matter?** $H_0:\beta_j=0$ for a given j: the t-test.
4. **How large is each effect?** A confidence interval for $\beta_j$, or a confidence set for $\boldsymbol\beta$.
5. **Would non-linearity help?** Polynomial regression and feature maps.

## Solving the least squares problem

**Step 1: expand.** Using $\|\mathbf v\|^2=\mathbf v^{\mathsf T}\mathbf v$:

$$
\mathrm{RSS}(\boldsymbol\beta)=\mathbf y^{\mathsf T}\mathbf y-2\mathbf y^{\mathsf T}\mathbf X\boldsymbol\beta+\boldsymbol\beta^{\mathsf T}\mathbf X^{\mathsf T}\mathbf X\boldsymbol\beta
$$

Careful here: the two cross terms $\mathbf y^{\mathsf T}\mathbf X\boldsymbol\beta$ and $\boldsymbol\beta^{\mathsf T}\mathbf X^{\mathsf T}\mathbf y$ are equal scalars (one is the transpose of the other), which is where the 2 comes from.

**Step 2: differentiate**, using $\partial(\mathbf c^{\mathsf T}\mathbf a)/\partial\mathbf a=\mathbf c^{\mathsf T}$ and $\partial(\mathbf a^{\mathsf T}\mathbf B\mathbf a)/\partial\mathbf a=\mathbf a^{\mathsf T}(\mathbf B+\mathbf B^{\mathsf T})$, with $\mathbf B=\mathbf X^{\mathsf T}\mathbf X$ symmetric:

$$
\frac{\partial\mathrm{RSS}}{\partial\boldsymbol\beta}=-2\mathbf y^{\mathsf T}\mathbf X+2\boldsymbol\beta^{\mathsf T}\mathbf X^{\mathsf T}\mathbf X=-2(\mathbf y^{\mathsf T}-\boldsymbol\beta^{\mathsf T}\mathbf X^{\mathsf T})\mathbf X
$$

**Step 3: the Hessian.**

$$
\frac{\partial^2\mathrm{RSS}}{\partial\boldsymbol\beta\,\partial\boldsymbol\beta^{\mathsf T}}=2\mathbf X^{\mathsf T}\mathbf X\succeq0
$$

It is positive semidefinite because $\mathbf v^{\mathsf T}\mathbf X^{\mathsf T}\mathbf X\mathbf v=\|\mathbf X\mathbf v\|^2\ge0$, i.e. it can be rewritten as an inner product. For a matrix the right condition is positive semidefinite, not "> 0": a PSD Hessian everywhere makes RSS convex, so any point where the gradient vanishes is a global minimum. Positive definite (X of full column rank) also makes it unique.

**Step 4: normal equations.** Set the gradient to zero:

$$
\mathbf X^{\mathsf T}(\mathbf y-\mathbf X\boldsymbol\beta)=\mathbf 0\iff\mathbf X^{\mathsf T}\mathbf X\boldsymbol\beta=\mathbf X^{\mathsf T}\mathbf y
$$

Each column of X has zero inner product with the residual vector, so the residual is orthogonal to the columns of X.

**Step 5: solve.** If X has full column rank, $(\mathbf X^{\mathsf T}\mathbf X)^{-1}$ exists:

$$
\hat{\boldsymbol\beta}=(\mathbf X^{\mathsf T}\mathbf X)^{-1}\mathbf X^{\mathsf T}\mathbf y,\qquad \hat{\mathbf y}=\mathbf X\hat{\boldsymbol\beta}=\underbrace{\mathbf X(\mathbf X^{\mathsf T}\mathbf X)^{-1}\mathbf X^{\mathsf T}}_{=:\mathbf H}\mathbf y
$$

$(\mathbf X^{\mathsf T}\mathbf X)^{-1}\mathbf X^{\mathsf T}$ is the pseudo-inverse, and H is the hat matrix: it puts the hat on y. Prediction at a new point is $\hat f(\mathbf x_0)=(1,\mathbf x_0^{\mathsf T})\hat{\boldsymbol\beta}$.

## The p = 1 formulas

$$
\hat\beta_1=\frac{\sum_i(x_i-\bar x)(y_i-\bar y)}{\sum_i(x_i-\bar x)^2},\qquad\hat\beta_0=\bar y-\hat\beta_1\bar x
$$

From the normal equations:

1. The intercept column gives $\sum_i(y_i-\beta_0-\beta_1x_i)=0$, i.e. $\bar y=\beta_0+\beta_1\bar x$. The line passes through $(\bar x,\bar y)$, which gives $\hat\beta_0$.
2. The x column gives $\sum_ix_i(y_i-\beta_0-\beta_1x_i)=0$. Substitute $\beta_0=\bar y-\beta_1\bar x$ to get $\sum_ix_i\big[(y_i-\bar y)-\beta_1(x_i-\bar x)\big]=0$.
3. Since $\sum(y_i-\bar y)=\sum(x_i-\bar x)=0$, $x_i$ can be replaced by $x_i-\bar x$, which gives $\hat\beta_1$.

So $\hat\beta_1=\widehat{\mathrm{cov}}(x,y)/\widehat{\mathrm{var}}(x)$, which is exactly how a CAPM beta is estimated from stock returns on market returns.

## The projection picture

$$
\mathbf X^{\mathsf T}\big(\mathbf y-\underbrace{\mathbf X\hat{\boldsymbol\beta}}_{\hat{\mathbf y}}\big)=\mathbf 0
$$

$\hat{\mathbf y}$ is the point in the column space of X closest to y, and the residual $\mathbf y-\hat{\mathbf y}$ drops perpendicularly onto it. H is the projection matrix; an orthogonal projection satisfies $\mathbf P^2=\mathbf P=\mathbf P^{\mathsf T}$, and for H, $\mathbf H^2=\mathbf X(\mathbf X^{\mathsf T}\mathbf X)^{-1}\mathbf X^{\mathsf T}\mathbf X(\mathbf X^{\mathsf T}\mathbf X)^{-1}\mathbf X^{\mathsf T}=\mathbf H$. Projecting twice changes nothing.

When $(\mathbf X^{\mathsf T}\mathbf X)^{-1}$ does not exist (linearly dependent columns, a duplicated predictor, or p + 1 > n):

- $\hat{\boldsymbol\beta}$ might not be unique; infinitely many solve the normal equations.
- $\hat{\mathbf y}$ is still unique, because the projection onto the column space does not depend on which combination spans it.
- Software usually detects it and drops a column or reports NA.

Note that $\mathbf X^{\mathsf T}\mathbf X$ is always positive semidefinite. Non-invertible means it is not positive definite: some $\mathbf v\ne\mathbf 0$ has $\mathbf X\mathbf v=\mathbf 0$, so it has a zero eigenvalue.

## Distribution of the estimator (fixed design)

With X fixed, $\mathbf y=\mathbf X\boldsymbol\beta+\boldsymbol\epsilon$ and $\boldsymbol\epsilon\sim\mathcal N(\mathbf 0,\sigma^2\mathbf I)$, so $\mathbf y\sim\mathcal N(\mathbf X\boldsymbol\beta,\sigma^2\mathbf I)$. Apply the affine rule with $\mathbf A=(\mathbf X^{\mathsf T}\mathbf X)^{-1}\mathbf X^{\mathsf T}$:

1. Mean: $(\mathbf X^{\mathsf T}\mathbf X)^{-1}\mathbf X^{\mathsf T}\mathbf X\boldsymbol\beta=\boldsymbol\beta$, so $\hat{\boldsymbol\beta}$ is unbiased.
2. Covariance: $\mathbf A(\sigma^2\mathbf I)\mathbf A^{\mathsf T}=(\mathbf X^{\mathsf T}\mathbf X)^{-1}\sigma^2$.

$$
\hat{\boldsymbol\beta}\sim\mathcal N\big(\boldsymbol\beta,\ (\mathbf X^{\mathsf T}\mathbf X)^{-1}\sigma^2\big)
$$

> Watch for the covariance written as $(\mathbf X\mathbf X^{\mathsf T})^{-1}\sigma^2$. That matrix is n × n and usually singular; the right one is the (p+1) × (p+1) matrix above. Also, this is not the Gauss–Markov (BLUE) result: Gauss–Markov says OLS is the best linear unbiased estimator under uncorrelated, equal-variance errors without assuming normality. Normal errors give the stronger statement here, the exact sampling distribution.

**Estimating σ².**

$$
\hat\sigma^2=\frac{\mathrm{RSS}}{n-p-1},\qquad\mathbb E[\hat\sigma^2]=\sigma^2,\qquad(n-p-1)\hat\sigma^2\sim\sigma^2\chi^2_{n-p-1}
$$

Dividing by n − p − 1 makes it unbiased, because p + 1 parameters were estimated. $\hat\sigma^2$ is independent of $\hat{\boldsymbol\beta}$, and combining the two gives tests and intervals for any subset of coefficients.

## Testing one coefficient: the t-test

$H_0:\beta_j=0$ against $H_1:\beta_j\ne0$:

$$
z_j=\frac{\hat\beta_j}{\hat\sigma\sqrt{v_j}}=\frac{\hat\beta_j}{\mathrm{SE}(\hat\beta_j)},\qquad v_j=\big[(\mathbf X^{\mathsf T}\mathbf X)^{-1}\big]_{jj},\qquad z_j\overset{H_0}{\sim}t_{n-p-1}
$$

Under $H_0$, $\hat\beta_j/(\sigma\sqrt{v_j})\sim\mathcal N(0,1)$; replacing σ by the independent χ²-based $\hat\sigma$ turns it into a t. Reject at level α if $|z_j|$ exceeds the $t_{n-p-1}$ quantile, or equivalently if the p-value $\mathbb P(|t_{n-p-1}|\ge|z_j|)$ is below α. For a two-sided test it has to be $|z_j|$.

**Standard errors when p = 1.**

$$
\mathrm{SE}^2(\hat\beta_0)=\hat\sigma^2\Big[\frac1n+\frac{\bar x^{\,2}}{\sum_i(x_i-\bar x)^2}\Big],\qquad\mathrm{SE}^2(\hat\beta_1)=\frac{\hat\sigma^2}{\sum_i(x_i-\bar x)^2}
$$

The more spread out the $x_i$, the smaller $\mathrm{SE}(\hat\beta_1)$: wide x pins the slope down. It is $\bar x^{\,2}$, not $\bar x$, in the first formula (ISLR (3.8); check the units).

> **ISLR Table 3.1.** For sales on TV, $\mathrm{SE}(\hat\beta_0)=0.4578$ and $\mathrm{SE}(\hat\beta_1)=0.0027$, giving t-statistics of 15.36 and 17.67, both p < 0.0001. **Table 3.4** (multiple regression): TV 0.046 (t 32.81), radio 0.189 (t 21.89), newspaper −0.001 (t −0.18, p = 0.86). Newspaper looks significant on its own but not once radio is in: the two are correlated (0.35), so newspaper had been taking credit for radio.

## Testing a group: the F-test

Compare a model with $p_1+1$ parameters against a smaller nested one with $p_0+1$ (the +1 is the constant). $H_0$: the $p_1-p_0$ extra coefficients are all zero.

$$
F=\frac{(\mathrm{RSS}_0-\mathrm{RSS}_1)/(p_1-p_0)}{\mathrm{RSS}_1/(n-p_1-1)}\ \overset{H_0}{\sim}\ F_{p_1-p_0,\ n-p_1-1}
$$

- The numerator is how much RSS the extra predictors remove, per predictor; the denominator is the noise level in the big model. A large F rejects the smaller model.
- Dropping one coefficient gives $F=z_j^2$, so the t- and F-tests agree.
- For large n, $F_{p_1-p_0,\,n-p_1-1}\approx\chi^2_{p_1-p_0}/(p_1-p_0)$.
- "Is there any relation at all?" is the case $p_0=0$: $F=\dfrac{(\mathrm{TSS}-\mathrm{RSS})/p}{\mathrm{RSS}/(n-p-1)}$.

> **ISLR Tables 3.2 and 3.6.** Sales on TV alone: F = 312.1, and $17.67^2=312.2$, so $F=t^2$. Sales on all three media: F = 570 on (3, 196) degrees of freedom.

## Confidence intervals and confidence sets

**One coefficient**, level $1-\alpha$:

$$
\Big(\hat\beta_j-z^{(1-\alpha/2)}\mathrm{SE}(\hat\beta_j),\ \hat\beta_j+z^{(1-\alpha/2)}\mathrm{SE}(\hat\beta_j)\Big)
$$

$z^{(0.975)}=1.96\approx2$, so the usual 95% interval is $\hat\beta_j\pm2\,\mathrm{SE}(\hat\beta_j)$. Strictly the quantile comes from $t_{n-p-1}$, which is close to the normal for large n.

> **ISLR p. 67.** 95% CIs: $\beta_1\in[0.042,0.053]$ and $\beta_0\in[6.130,7.935]$. Check: $0.0475\pm2(0.0027)=[0.0421,0.0529]$. Each extra \$1,000 of TV spend goes with 42 to 53 more units sold on average.

**The whole vector.** Since $(\boldsymbol\beta-\hat{\boldsymbol\beta})^{\mathsf T}\mathbf X^{\mathsf T}\mathbf X(\boldsymbol\beta-\hat{\boldsymbol\beta})/\sigma^2\sim\chi^2_{p+1}$,

$$
C_\beta=\Big\{\boldsymbol\beta:(\boldsymbol\beta-\hat{\boldsymbol\beta})^{\mathsf T}\underbrace{\mathbf X^{\mathsf T}\mathbf X}_{=:\mathbf M}(\boldsymbol\beta-\hat{\boldsymbol\beta})\le\underbrace{\hat\sigma^2\big(\chi^2_{p+1}\big)^{(1-\alpha)}}_{=:r^2}\Big\}
$$

With $\langle\mathbf a,\mathbf b\rangle_{\mathbf M}=\mathbf a^{\mathsf T}\mathbf M\mathbf b$ (an inner product when $\mathbf M\succ0$), $C_\beta$ is a ball of radius r in the M-norm centred at $\hat{\boldsymbol\beta}$. In ordinary Euclidean terms it is an ellipsoid. It is a confidence set (region) for the whole vector; an interval is the one-dimensional case. $\mathbf X^{\mathsf T}\mathbf X$ is a $(p+1)\times(p+1)$ matrix; the whole quadratic form around it is the scalar. Using the χ² quantile treats $\hat\sigma^2$ as if it were σ²; the exact version uses $(p+1)F^{(1-\alpha)}_{p+1,\,n-p-1}$.

> Why an ellipse: its axes are the eigenvectors of $\mathbf X^{\mathsf T}\mathbf X$. If two predictors are highly correlated, $\mathbf X^{\mathsf T}\mathbf X$ has a small eigenvalue along their difference and the ellipse is long and thin in that direction. The data pin down the sum of their effects but not how to split it, which is the newspaper and radio story above in geometric form.

## Measures of fit

**RSE** $=\sqrt{\mathrm{RSS}/(n-p-1)}$ measures lack of fit in the units of Y.

$$
R^2=1-\frac{\mathrm{RSS}}{\mathrm{TSS}},\qquad\mathrm{RSS}=\sum_i(y_i-\hat y_i)^2,\qquad\mathrm{TSS}=\sum_i(y_i-\bar y)^2
$$

TSS is the total variability in the response and RSS what is left after the regression, so R² is the share of the variability in Y explained by X. For p = 1, $R^2=r^2$, the squared sample correlation.

> **ISLR pp. 69–71.** Sales on TV: R² = 0.612, and the correlation is 0.7822, with $0.7822^2=0.612$. All three media: R² = 0.897, RSE = 1.69. R² never falls when you add a predictor, even a useless one, so a small rise is not evidence.

## Extending the linear model

**Dummy variables.** Credit card balance ≈ β₀ + β₁ × (owns a house). β₀ is the average balance of non-owners and β₀ + β₁ that of owners.

> **ISLR Table 3.7.** $\hat\beta_0=509.80$, $\hat\beta_1=19.73$ (SE 46.05, p = 0.67): no evidence of a real difference. Coding owners as 0 instead flips the sign with identical fitted values.

**Interactions.** $Y=\beta_0+\beta_1X_1+\beta_2X_2+\beta_3X_1X_2+\epsilon=(\beta_1+\beta_3X_2)X_1+\dots$, so the slope on $X_1$ depends on $X_2$.

> **ISLR Table 3.9.** Adding TV × radio (coefficient 0.0011, t = 20.73) lifts R² from 89.7% to 96.8%, so the interaction explains 69% of what the additive model missed.

**Polynomial features.** mpg on horsepower is curved, so fit $\text{mpg}=\beta_0+\beta_1\,\text{hp}+\beta_2\,\text{hp}^2=\langle\boldsymbol\beta,\varphi(X)\rangle$ with $\varphi(X)=(1,X,X^2)$. It is still linear in $\boldsymbol\beta$, so everything above applies unchanged; only the features changed. The feature-map idea comes back with kernels.

> **ISLR Table 3.10.** $\widehat{\text{mpg}}=56.90-0.466\,\text{hp}+0.0012\,\text{hp}^2$, R² 0.688 against 0.606 for the straight line. A degree-5 fit wiggles at the edges without a real gain.

## Linear regression versus KNN regression

|  | Linear regression | KNN regression |
| --- | --- | --- |
| Type | parametric | non-parametric |
| Pros | easy to fit and interpret, tests available | flexible, no shape assumed |
| Cons | forces a linear f | needs many points near $x_0$ |

Given K and a prediction point $x_0$, let $\mathcal N_0$ be the K training points nearest to $x_0$ and average their responses:

$$
\hat f(x_0)=\frac1K\sum_{x_i\in\mathcal N_0}y_i
$$

There is no forced degree and K can be anything. With K = 3 and neighbours y = 2.0, 2.6, 3.1, $\hat f(x_0)=7.7/3=2.567$. Another point has a different set of three nearest neighbours, because $\mathcal N_0$ is recomputed for every query, which is why the fitted surface is a staircase. KNN gives no β's to test, so it is less interpretable: it just predicts $y_0$ as $\hat f(x_0)$.

- K = 1 is rough (low bias, high variance); K = 9 is smoother (more bias, less variance).
- If the truth is exactly linear, linear regression wins for every K. Slightly non-linear: KNN only edges ahead for K ≥ 4. Strongly non-linear: KNN wins for every K shown.
- KNN gets harder as the input dimension grows, because neighbours stop being near: the curse of dimensionality.

> How fast neighbourhoods empty out: with data uniform on $[0,1]^p$, a cube holding 10% of the points needs edge $0.1^{1/p}$, which is 0.10 for p = 1, 0.32 for p = 2 and 0.79 for p = 10. At p = 10 the "nearest" 10% span 79% of each axis.

Kernels do not cure this: kernel smoothing is a weighted KNN and needs local data just as much. What helps is imposing structure: a parametric or additive model, variable selection and regularisation, or dimension reduction. If a few eigenvalues of the covariance matrix carry most of the variance, the data effectively live in fewer than p dimensions, which is the idea behind PCA.

> **ISLR §3.5.** With 50 training points, KNN beats linear regression on a non-linear truth when p = 1 or 2, but for p ≥ 3 or 4 linear regression wins, because 50 points spread over many dimensions leave no near neighbours. Parametric methods tend to win when there are few observations per predictor.

## Traps

- Writing the covariance of $\hat{\boldsymbol\beta}$ as $(\mathbf X\mathbf X^{\mathsf T})^{-1}\sigma^2$; it is $(\mathbf X^{\mathsf T}\mathbf X)^{-1}\sigma^2$.
- Saying a non-invertible $\mathbf X^{\mathsf T}\mathbf X$ is "not PSD": it is always PSD, it just fails to be PD.
- "Hessian > 0" for a matrix: say PSD (convex, global minimum) or PD (unique minimum).
- $\bar x$ instead of $\bar x^{\,2}$ in $\mathrm{SE}(\hat\beta_0)$.
- Forgetting the absolute value in a two-sided p-value.
- Dividing RSS by n instead of n − p − 1.
- Calling a joint confidence region an interval.
- Saying OLS projects onto a space spanned by Σ: it projects onto the column space of X.
- Expecting kernels to remove the curse of dimensionality for local methods.
- Reading a significant simple-regression coefficient as significant in the multiple regression (newspaper).
- Judging a model by R² alone when adding predictors.

## Self-check

1. Why does the fitted line pass through $(\bar x,\bar y)$? *The intercept column's normal equation is* $\sum_i(y_i-\hat y_i)=0$.
2. n = 50, p = 4. Degrees of freedom for a one-coefficient t-test? *50 − 4 − 1 = 45.*
3. $\hat\beta_j=0.30$, SE 0.12. Approximate 95% CI and decision at 5%? *[0.06, 0.54]; z = 2.5 > 2, reject* $\beta_j=0$.
4. Show H is idempotent and that $\mathbf I-\mathbf H$ is also a projection. $(\mathbf I-\mathbf H)^2=\mathbf I-2\mathbf H+\mathbf H^2=\mathbf I-\mathbf H$, *and it is symmetric; it projects onto the residual space.*
