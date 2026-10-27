---
draft: false
title: "Lecture 4 - Classification"
paper: "ST443 Machine Learning and Data Mining"
year: "M.S. Statistics (LSE)"
section: "Machine learning"
description: "Logistic regression fitted by maximum likelihood with Newton's method and coordinate descent, multinomial and softmax coding, LDA, QDA, naive Bayes and kernel density estimation, error rates and ROC curves, and Poisson regression as a GLM."
order: 4
tags: [statistics, machine-learning, classification]
---

ST443, LSE, Autumn Term 2026, week 4. Reading: ISLR (2nd edition) Chapter 4, §4.1 to 4.6. Page and table numbers refer to ISLR.

## Cheat sheet

- **Setting:** $Y\in\mathcal Y$, $C=|\mathcal Y|$ classes; training data $\{(\mathbf x_i,y_i)\}_{i\in[n]}\subset\mathbb R^p\times\mathcal Y$; $\tilde{\mathbf x}=(1,\mathbf x)\in\mathbb R^{p+1}$.
- **Logistic function:** $L(z)=e^z/(1+e^z)$, increasing from 0 to 1; $L/(1-L)=e^z$.
- **Logistic regression (C = 2):** $p(\mathbf x)=L(\langle\boldsymbol\beta,\tilde{\mathbf x}\rangle)\iff\log\frac{p(\mathbf x)}{1-p(\mathbf x)}=\langle\boldsymbol\beta,\tilde{\mathbf x}\rangle$ (log odds linear). Boundary $\{p=1/2\}=\{\langle\boldsymbol\beta,\tilde{\mathbf x}\rangle=0\}$: a hyperplane.
- **Log-likelihood:** $\ell(\boldsymbol\beta)=\sum_{y_i=1}\log p(\mathbf x_i)+\sum_{y_i=0}\log(1-p(\mathbf x_i))$; gradient $\mathbf X^{\mathsf T}(\mathbf y-\mathbf p)$, Hessian $-\mathbf X^{\mathsf T}\mathbf W\mathbf X$, $\mathbf W=\mathrm{diag}(p_i(1-p_i))$. Concave, so a stationary point is the maximum.
- **Bernoulli MLE:** $\hat p=\frac1n\sum y_i$.
- **Newton:** root of f: $x_{n+1}=x_n-f(x_n)/f'(x_n)$; optimum: $x_{n+1}=x_n-f'(x_n)/f''(x_n)$; in $\mathbb R^p$: $\mathbf x_{n+1}=\mathbf x_n-[\mathbf H_f(\mathbf x_n)]^{-1}\nabla f(\mathbf x_n)$. Cost: a $p\times p$ solve per step.
- **Coordinate descent:** cycle through coordinates, minimising f exactly in one coordinate at a time; $f(\mathbf x^0)\ge f(\mathbf x^1)\ge\dots$
- **Multinomial (baseline C):** $p_c=e^{\langle\boldsymbol\beta_c,\tilde{\mathbf x}\rangle}/(1+\sum_{j<C}e^{\langle\boldsymbol\beta_j,\tilde{\mathbf x}\rangle})$, $p_C=1/(1+\sum_{j<C}e^{\langle\boldsymbol\beta_j,\tilde{\mathbf x}\rangle})$; $\log(p_c/p_C)=\langle\boldsymbol\beta_c,\tilde{\mathbf x}\rangle$.
- **Softmax coding:** $p_c=e^{\langle\bar{\boldsymbol\beta}_c,\tilde{\mathbf x}\rangle}/\sum_{j\in[C]}e^{\langle\bar{\boldsymbol\beta}_j,\tilde{\mathbf x}\rangle}$; $\log(p_c/p_{c'})=\langle\bar{\boldsymbol\beta}_c-\bar{\boldsymbol\beta}_{c'},\tilde{\mathbf x}\rangle$. Same predictions as baseline coding.
- **Generative route:** $p_c(\mathbf x)=\pi_cf_c(\mathbf x)/\sum_j\pi_jf_j(\mathbf x)$, classify by $\arg\max_cp_c(\mathbf x)$.
- **LDA:** $f_c=\mathcal N(\boldsymbol\mu_c,\boldsymbol\Sigma)$ (shared Σ); $\delta_c(\mathbf x)=\log\pi_c+\mathbf x^{\mathsf T}\boldsymbol\Sigma^{-1}\boldsymbol\mu_c-\frac12\boldsymbol\mu_c^{\mathsf T}\boldsymbol\Sigma^{-1}\boldsymbol\mu_c$: linear. p = 1, C = 2, equal priors, $\mu_1<\mu_2$: class 1 iff $x<(\mu_1+\mu_2)/2$.
- **LDA plug-ins:** $\hat\pi_c=n_c/n$, $\hat{\boldsymbol\mu}_c$ = class mean, $\hat{\boldsymbol\Sigma}=\frac1{n-C}\sum_c\sum_{y_j=c}(\mathbf x_j-\hat{\boldsymbol\mu}_c)(\mathbf x_j-\hat{\boldsymbol\mu}_c)^{\mathsf T}$.
- **QDA:** $f_c=\mathcal N(\boldsymbol\mu_c,\boldsymbol\Sigma_c)$; $\delta_c(\mathbf x)=-\frac12(\mathbf x-\boldsymbol\mu_c)^{\mathsf T}\boldsymbol\Sigma_c^{-1}(\mathbf x-\boldsymbol\mu_c)-\frac12\log|\boldsymbol\Sigma_c|+\log\pi_c$: quadratic. Covariance parameters: LDA $p(p+1)/2$, QDA $Cp(p+1)/2$.
- **Naive Bayes:** $f_c(\mathbf x)=\prod_jf_{c,j}(x_j)$ (independence within class); each $f_{c,j}$ by a 1D normal, histogram/KDE, or empirical pmf.
- **KDE:** $\hat f(x)=\frac1{nh}\sum_iK\big(\frac{x-x_i}h\big)$; in $\mathbb R^p$: $\hat f_{\mathbf H}(\mathbf x)=\frac1n\sum_iK_{\mathbf H}(\mathbf x-\mathbf x_i)$, $K_{\mathbf H}(\mathbf x)=|\mathbf H|^{-1/2}K(\mathbf H^{-1/2}\mathbf x)$.
- **Log odds against the baseline:** logistic and LDA linear; QDA quadratic; naive Bayes additive (GAM); KNN non-parametric.
- **Errors:** FPR = FP/N (Type I, 1 − specificity), TPR = TP/P (power, sensitivity, recall), PPV = $\mathrm{TP}/P^*$ (precision). ROC: TPR against FPR over all thresholds; AUC 0.5 = random, 1 = perfect.
- **Poisson regression:** $\lambda(\mathbf x)=e^{\langle\boldsymbol\beta,\tilde{\mathbf x}\rangle}$; one unit of $x_j$ multiplies the mean by $e^{\beta_j}$.
- **GLM links:** identity (Gaussian), logit $\log\frac\mu{1-\mu}$ (Bernoulli), log (Poisson): $\eta(\mathbb E[Y\mid X=\mathbf x])=\langle\boldsymbol\beta,\tilde{\mathbf x}\rangle$.
- **Default data numbers:** logistic on balance $\hat\beta_0=-10.6513$, $\hat\beta_1=0.0055$; $\hat p(1000)=0.0058$, $\hat p(2000)=0.586$. LDA at threshold 0.5: 252/333 = 75.7% of defaulters missed, 23/9667 = 0.2% false alarms; at 0.2: 138/333 = 41.4% and 235/9667 = 2.4%.

## Questions from Lecture 3

**Why other norms than $\|\cdot\|_2$?** They measure fit or regularise: $\|\cdot\|_2$ for OLS; $\|\cdot\|_1$ the Lasso penalty, giving sparsity; $\|\cdot\|_{\mathbf M}$ the confidence set of Lecture 3; Frobenius and nuclear norms in recommender systems; $\|\cdot\|_{L^p}$ smoothing splines; $\|\cdot\|_{\mathcal H_k}$ kernel methods.

**Why does the determinant identity with a factor 2 hold?**

$$
\mathbf A=\begin{pmatrix}2&4&6\\3&3&7\\0&0&-2\end{pmatrix},\qquad\tilde{\mathbf A}=\begin{pmatrix}1&2&3\\3&3&7\\0&0&-2\end{pmatrix},\qquad|\mathbf A|=2|\tilde{\mathbf A}|
$$

1. $\tilde{\mathbf A}$ is $\mathbf A$ after $R_1\to\frac12R_1$, i.e. $\tilde{\mathbf A}=\mathbf E\mathbf A$ with $\mathbf E=\mathrm{diag}(\frac12,1,1)$.
2. Determinants multiply: $|\mathbf E||\mathbf A|=|\tilde{\mathbf A}|$ with $|\mathbf E|=\frac12$, so $|\mathbf A|=2|\tilde{\mathbf A}|$.
3. Alternatively, the determinant is linear in each row separately.
4. Check, expanding along the last row: $|\mathbf A|=-2(2\cdot3-4\cdot3)=12$ and $|\tilde{\mathbf A}|=-2(1\cdot3-2\cdot3)=6$.

**How to think of $\mathbf A\mathbf x$ and $\mathbf y^{\mathsf T}\mathbf B$?** $\mathbf A\mathbf x=\sum_i\mathbf a_ix_i$ is a combination of the **columns** of A with weights x; $\mathbf y^{\mathsf T}\mathbf B=\sum_jy_j\mathbf b_j^{\mathsf T}$ is a combination of the **rows** of B with weights y. This is why the OLS fitted values $\mathbf X\hat{\boldsymbol\beta}$ live in the column space of X.

## What classification is

In Lecture 3 the output was quantitative ($Y\in\mathbb R$). Now the output is **qualitative** (categorical): $Y\in\mathcal Y$ with $C=|\mathcal Y|$ categories. Examples: eye colour, fraudulent against valid transaction, stroke / drug overdose / epileptic seizure. The aim is to classify well on **unseen** data.

**Prototype: the Default data.** Will an individual default, given annual income and monthly credit card balance? On the boxplots, defaulters have large balances, while income is not very informative. Balance is the good indicator.

**Reading a boxplot.** $Q_1,Q_2,Q_3$ are the lower quartile, median and upper quartile; $\mathrm{IQR}=Q_3-Q_1$. The box runs from $Q_1$ to $Q_3$ with $Q_2$ inside. Upper whisker: the largest sample in $[Q_3,Q_3+1.5\,\mathrm{IQR}]$; lower: the smallest in $[Q_1-1.5\,\mathrm{IQR},Q_1]$. Outliers are the points outside the whiskers.

## Why not linear regression? The logistic model

With $Y\in\{0,1\}$ the target is $p(\mathbf x):=\mathbb P(Y=1\mid X=\mathbf x)$, and $\mathbb P(Y=0\mid X=\mathbf x)=1-p(\mathbf x)$.

**Linear attempt:** $p(\mathbf x)=\beta_0+\sum_j\beta_jx_j=\langle\boldsymbol\beta,\tilde{\mathbf x}\rangle$, $\tilde{\mathbf x}=(1,\mathbf x)\in\mathbb R^{p+1}$, where the 1 carries the intercept and x is the p-dimensional input. The problem: it gives "probabilities" outside [0, 1]. What is wanted is a monotone function with values in (0, 1).

**Decision rules once p is known:** the Bayes-classifier rule $\hat Y(\mathbf x)=1$ iff $p(\mathbf x)>\frac12$; a conservative lender might use $p(\mathbf x)>0.1$. The model takes $\mathbf x_0$, finds $p(\mathbf x_0)$ and classifies; the threshold can be adjusted as needed.

**The logistic function.**

$$
L(z)=\frac{e^z}{1+e^z}=1-\frac1{1+e^z},\qquad\lim_{z\to-\infty}L=0,\quad\lim_{z\to\infty}L=1,\quad L\ \text{increasing}
$$

Derivation of the odds identity (†):

1. Rearrange: $\frac{e^z}{1+e^z}=\frac{e^z+1-1}{1+e^z}=1-\frac1{1+e^z}$.
2. Hence $1-L(z)=\frac1{1+e^z}$.
3. Divide: $\frac{L(z)}{1-L(z)}=e^z$. (†)

**The model.** Keep a linear function but pass it through L, with $z=\langle\boldsymbol\beta,\tilde{\mathbf x}\rangle$:

$$
p(\mathbf x)=L(\langle\boldsymbol\beta,\tilde{\mathbf x}\rangle)=\frac{e^{\beta_0+\sum_j\beta_jx_j}}{1+e^{\beta_0+\sum_j\beta_jx_j}}
$$

Apply (†) and take logs on both sides, which gives back a linear form:

$$
\frac{p(\mathbf x)}{1-p(\mathbf x)}=e^{\langle\boldsymbol\beta,\tilde{\mathbf x}\rangle}\quad\Longrightarrow\quad\log\frac{p(\mathbf x)}{1-p(\mathbf x)}=\langle\boldsymbol\beta,\tilde{\mathbf x}\rangle\quad(\text{log odds, or logit})
$$

**Decision boundary** (Bayes rule $p>\frac12$) is linear:

1. $\log\frac p{1-p}=0$
2. $\iff\frac p{1-p}=e^0=1$
3. $\iff p=1-p\iff p=\frac12$. So the boundary is $\{\mathbf x:\langle\boldsymbol\beta,\tilde{\mathbf x}\rangle=0\}$, a hyperplane.

> Note that the log odds is a property of one observation's class probability. The log-likelihood $\ell(\boldsymbol\beta)$ below is a different object: a sum over the whole sample, used to fit β.

> Reading β: one unit more of $x_j$ adds $\beta_j$ to the log odds, i.e. multiplies the odds by $e^{\beta_j}$. It does not add a fixed amount to the probability: the change in p depends on the position on the S-curve (largest near p = 0.5, tiny near 0 or 1). A credit scorecard's points are additive on the log odds scale for exactly this reason.

## Maximum likelihood estimation

**Idea.** Take a parametric family $\{f_\theta:\theta\in\Theta\}$. Before, $x\mapsto f_\theta(x)$ was read with θ fixed (non-negative, integrates to one). Now fix the observed data x and read $\theta\mapsto\mathcal L(\theta):=f_\theta(x)$, the **likelihood**; choose the θ that makes the observed data most probable:

$$
\max_{\theta\in\Theta}\mathcal L(\theta)
$$

For IID data the density factorises into a product, and (if $\mathcal L>0$) the log turns it into a sum, which is easier to optimise:

$$
\max_{\theta\in\Theta}\ \ell(\theta):=\log\mathcal L(\theta)
$$

> The likelihood is the same function $f_\theta(x)$ read in θ instead of x, for any sample size, even n = 1. Large samples are where the MLE earns its good properties (consistency, asymptotic normality: ST460), not where the definition comes from.

**Worked example: Bernoulli.** $y_1,\dots,y_n$ IID Bernoulli(p), $f_p(y)=p^y(1-p)^{1-y}$, $y\in\{0,1\}$, θ = p.

1. Product of the n pmfs: $\mathcal L(p)=\prod_ip^{y_i}(1-p)^{1-y_i}=\Big[\prod_{y_i=1}p\Big]\Big[\prod_{y_i=0}(1-p)\Big]=p^{S}(1-p)^{n-S}$, $S=\sum_iy_i$.
2. Log, now a sum: $\ell(p)=S\log p+(n-S)\log(1-p)$.
3. Differentiate and set to zero: $\frac Sp-\frac{n-S}{1-p}=0\iff S(1-p)=(n-S)p\iff\hat p=\frac Sn$.
4. Second derivative $-\frac S{p^2}-\frac{n-S}{(1-p)^2}<0$, so this is the maximum.

- Example: 3 defaults in 10 loans gives $\hat p=0.3$ and $\ell(0.3)=3\log0.3+7\log0.7=-6.109$.

## Fitting logistic regression

Replace the single p by $p(\mathbf x_i)$, which depends on β through the logistic function:

$$
\mathcal L(\boldsymbol\beta)=\Big[\prod_{y_i=1}p(\mathbf x_i)\Big]\Big[\prod_{y_i=0}(1-p(\mathbf x_i))\Big],\qquad\ell(\boldsymbol\beta)=\sum_{y_i=1}\log p(\mathbf x_i)+\sum_{y_i=0}\log(1-p(\mathbf x_i))
$$

There is no closed form; it is maximised numerically by **Newton's method** or **coordinate descent**.

**Gradient and Hessian** (what is needed to run either method).

1. Rewrite: $\ell(\boldsymbol\beta)=\sum_i\big[y_i\langle\boldsymbol\beta,\tilde{\mathbf x}_i\rangle-\log(1+e^{\langle\boldsymbol\beta,\tilde{\mathbf x}_i\rangle})\big]$, using $\log p=z-\log(1+e^z)$ and $\log(1-p)=-\log(1+e^z)$.
2. Differentiate, since $\frac d{dz}\log(1+e^z)=L(z)$: $\nabla\ell=\sum_i(y_i-p_i)\tilde{\mathbf x}_i=\mathbf X^{\mathsf T}(\mathbf y-\mathbf p)$.
3. Differentiate again, since $L'(z)=L(z)(1-L(z))$: $\mathbf H_\ell=-\sum_ip_i(1-p_i)\tilde{\mathbf x}_i\tilde{\mathbf x}_i^{\mathsf T}=-\mathbf X^{\mathsf T}\mathbf W\mathbf X\preceq0$.
4. So ℓ is concave: any point with zero gradient is the global maximum (compare Lecture 3, where RSS is convex). Newton's step is $\boldsymbol\beta\leftarrow\boldsymbol\beta+(\mathbf X^{\mathsf T}\mathbf W\mathbf X)^{-1}\mathbf X^{\mathsf T}(\mathbf y-\mathbf p)$, a weighted least squares solve each iteration (IRLS).

> If a hyperplane separates the two classes perfectly, ℓ keeps increasing as ‖β‖ grows and no finite MLE exists; software then reports huge coefficients and warnings. Regularisation (Ch 6) fixes this.

> **ISLR §4.3.2 to 4.3.3, Table 4.1 (p. 136).** Default on balance: $\hat\beta_0=-10.6513$ (SE 0.3612), $\hat\beta_1=0.0055$ (SE 0.0002, z = 24.9). One more dollar of balance adds 0.0055 to the log odds. Predictions (pp. 136-137): a balance of \$1,000 gives $\hat p=e^{-10.6513+5.5}/(1+e^{-10.6513+5.5})=0.00576$; \$2,000 gives 0.586. The z-statistic plays the role of the t-statistic in Lecture 3.
>
> **Table 4.2 (p. 137), dummy predictor:** student[Yes] 0.4049 on intercept −3.5041: $\hat p$ = 0.0431 for students against 0.0292 for non-students.
>
> **Table 4.3 and (4.8) to (4.9) (pp. 138-139), confounding:** with balance, income (\$000) and student together, the student coefficient turns **negative** (−0.6468). A student with balance \$1,500 and income \$40k: $\hat p=0.058$; a non-student with the same balance and income: 0.105. Students carry higher balances, so unconditionally they default more, but at a given balance they default less. Same story as newspaper and radio in Lecture 3.

## Coordinate descent

**Problem:** $\min_{\mathbf x\in\mathbb R^p}f(\mathbf x)$. **Idea:** solve 1D problems, one coordinate at a time.

1. Input $\mathbf x^0$; set k = 0.
2. For i = 1, …, p (coordinates already updated in this sweep use their new values):

   $$
   x_i^{k+1}:=\arg\min_{x\in\mathbb R}f(x_1^{k+1},\dots,x_{i-1}^{k+1},x,x_{i+1}^k,\dots,x_p^k)
   $$
3. k ← k + 1; repeat until convergence. Each step cannot increase f, so $f(\mathbf x^0)\ge f(\mathbf x^1)\ge\dots$

For two variables: choose $(x_0,y_0)$; fix y, differentiate with respect to x and set to zero; then fix x, differentiate with respect to y and set to zero; repeat from the new candidate. On the contour plot: on a fixed slice find the argmin, then on the perpendicular slice through it find the argmin, and so on.

**Worked example** with the slide's function $f(x,y)=5x^2-6xy+5y^2$.

1. $\partial f/\partial x=10x-6y=0\Rightarrow x=0.6y$; $\partial f/\partial y=10y-6x=0\Rightarrow y=0.6x$.
2. Start $(x^0,y^0)=(1,1)$. Sweep 1: $x^1=0.6$, then $y^1=0.6\cdot0.6=0.36$.
3. Sweep 2: $x^2=0.216$, $y^2=0.1296$. Sweep 3: $x^3=0.0778$, $y^3=0.0467$.
4. Each sweep multiplies y by 0.36, so the iterates zigzag into the minimum (0, 0) geometrically, as in the staircase on the slide.

> Why it can be slow: the zigzag factor 0.36 = 0.6² comes from the cross term −6xy. The more the contours are tilted ellipses (strongly correlated coordinates), the closer the factor is to 1 and the more sweeps it needs. With no cross term it would finish in one sweep. Coordinate descent returns in Ch 6 because each 1D Lasso step has a closed form.

## Newton's method

**Root finding.** Goal: x with f(x) = 0.

1. Linearise at the current $x_n$ (draw the tangent): $f(x)\approx f(x_n)+f'(x_n)(x-x_n)=:\hat f(x)$.
2. Solve $\hat f(x)=0$:

   $$
   x_{n+1}=x_n-\frac{f(x_n)}{f'(x_n)}
   $$

3. Repeat until $f(x_n)\approx0$. All that is needed is f and f′.

**Worked example:** $f(x)=x^2-2$, $x_0=1$: $x_1=1-\frac{-1}2=1.5$, $x_2=1.5-\frac{0.25}3=1.416667$, $x_3=1.414216$; $\sqrt2=1.414214$. The number of correct digits roughly doubles each step (quadratic convergence).

**Optimisation.** Apply the same recipe to $f'(x)=0$:

$$
x_{n+1}=x_n-\frac{f'(x_n)}{f''(x_n)}
$$

and in $p\ge1$ dimensions, to $\nabla f(\mathbf x)=\mathbf 0$:

$$
\mathbf x_{n+1}=\mathbf x_n-[\mathbf H_f(\mathbf x_n)]^{-1}\nabla f(\mathbf x_n),\qquad\mathbf H_f(\mathbf x)=\Big[\frac{\partial^2f}{\partial x_i\partial x_j}(\mathbf x)\Big]_{i,j=1}^p
$$

H is the Hessian. For logistic regression, f := ℓ and x := β.

> Note that $f'(x)=0$ only finds a **stationary point** (maximum, minimum or saddle). For logistic regression it is the maximum because ℓ is concave; in general check $f''<0$ (or a negative definite Hessian).

Newton is computationally heavy for large p: each step forms a $p\times p$ Hessian ($O(np^2)$) and solves a linear system ($O(p^3)$). Hence quasi-Newton methods (e.g. BFGS), which build a Hessian approximation from gradients, or coordinate descent.

## More than two classes: multinomial logistic regression

Emergency room: $\mathcal Y=\{\text{stroke},\ \text{drug overdose},\ \text{epileptic seizure}\}$, C = 3.

> Note that the 3 here is C, the number of classes; p is the number of predictors. The model is fitted by maximum likelihood exactly as in the binary case.

**Baseline coding.** Fix a baseline class b := C and model, for $c\in[C-1]$:

$$
p_c(\mathbf x)=\frac{e^{\langle\boldsymbol\beta_c,\tilde{\mathbf x}\rangle}}{1+\sum_{j\in[C-1]}e^{\langle\boldsymbol\beta_j,\tilde{\mathbf x}\rangle}}
$$

Derivation of $p_C$:

1. Probabilities sum to one: $p_C=1-\sum_{c\in[C-1]}p_c$.
2. Write $z:=\sum_{j\in[C-1]}e^{\langle\boldsymbol\beta_j,\tilde{\mathbf x}\rangle}$, so the non-baseline probabilities sum to $\frac z{1+z}$.
3. $p_C=1-\frac z{1+z}=\frac{1+z-z}{1+z}=\frac1{1+z}$.
4. Divide: $\log\frac{p_c(\mathbf x)}{p_C(\mathbf x)}=\langle\boldsymbol\beta_c,\tilde{\mathbf x}\rangle$. The log odds of c against the baseline C (not against "not c") are linear again.

The choice of baseline does not change predictions; only the meaning of the coefficients changes.

**Softmax coding.** No baseline; parameters $(\bar{\boldsymbol\beta}_c)_{c\in[C]}$ and

$$
(p_c(\mathbf x))_{c=1}^C=S\big((\langle\bar{\boldsymbol\beta}_c,\tilde{\mathbf x}\rangle)_{c=1}^C\big),\qquad S(\mathbf z)=\Big(\frac{e^{z_c}}{\sum_{j\in[C]}e^{z_j}}\Big)_{c=1}^C
$$

In short, $p_c(\mathbf x)$ = softmax(linear function). Log odds between any two classes:

1. By definition: $\log\frac{p_c}{p_{c'}}=\log\frac{e^{\langle\bar{\boldsymbol\beta}_c,\tilde{\mathbf x}\rangle}}{e^{\langle\bar{\boldsymbol\beta}_{c'},\tilde{\mathbf x}\rangle}}$ (the denominators cancel).
2. $e^a/e^b=e^{a-b}$ and linearity of the inner product: $=\log e^{\langle\bar{\boldsymbol\beta}_c-\bar{\boldsymbol\beta}_{c'},\tilde{\mathbf x}\rangle}$.
3. log inverts exp: $=\langle\bar{\boldsymbol\beta}_c-\bar{\boldsymbol\beta}_{c'},\tilde{\mathbf x}\rangle$.

> Why softmax: not differentiability, since the logistic function is itself smooth ($L'=L(1-L)$), and with C = 2 softmax **is** the logistic: $\frac{e^{z_1}}{e^{z_1}+e^{z_2}}=L(z_1-z_2)$. The reason is symmetry: no class is singled out as baseline, which is convenient in neural networks (Ch 10). The price: adding the same vector to every $\bar{\boldsymbol\beta}_c$ leaves all probabilities unchanged, so the parameters are not identifiable without a constraint.

## Generative models: the Bayes route

So far $p_c(\mathbf x)$ was modelled directly. Now model how the data are generated within each class:

1. **Priors** $(\pi_c)_{c=1}^C$: how common each class is before seeing x.
2. **Class-conditional densities** $f_c(\mathbf x):=f_{X\mid Y=c}(\mathbf x)$: what x looks like inside class c.
3. **Bayes' theorem** ($\mathbb P(A\mid B)=\mathbb P(B\mid A)\mathbb P(A)/\mathbb P(B)$) flips this into the **posterior**:

   $$
   p_c(\mathbf x)=\frac{\pi_cf_c(\mathbf x)}{\sum_{j\in[C]}\pi_jf_j(\mathbf x)}
   $$

4. Classify to the largest posterior: $\hat Y(\mathbf x)=\arg\max_cp_c(\mathbf x)$. The denominator is the same for every c, so this is $\arg\max_c\pi_cf_c(\mathbf x)$.

> In plain words: logistic regression asks "given this borrower, how likely is default?" directly. A generative model asks "what do defaulters' balances look like, what do non-defaulters' look like, and how common is default?", then uses Bayes to answer the first question. Example: a 3% default rate, and a \$2,000 balance is 20 times more typical of defaulters than of non-defaulters ($f_1/f_0=20$). Posterior odds = prior odds × likelihood ratio = (0.03/0.97) × 20 = 0.619, so $p=0.619/1.619=0.38$.

**Ingredients.** $\pi_c$ is easy: the fraction of training samples in class c. $f_c$ is hard: density estimation. Hence simplifying assumptions, for all c:

- **LDA:** $f_c=\mathcal N(\boldsymbol\mu_c,\boldsymbol\Sigma)$ (one shared covariance);
- **QDA:** $f_c=\mathcal N(\boldsymbol\mu_c,\boldsymbol\Sigma_c)$;
- **naive Bayes:** $f_c(\mathbf x)=\prod_{j=1}^pf_{c,j}(x_j)$.

> Watch for: no classifier here handles a class unseen in training, logistic regression included, so this is not a weakness of the generative route. The naive-Bayes-specific problem is an unseen **level** of a qualitative predictor within a class: its empirical pmf is 0, which zeroes the whole product $\prod_jf_{c,j}$. The usual fix is to add a small count to every cell (Laplace smoothing).

## LDA with p = 1, C = 2

Assume $f_c(x)=\frac1{\sqrt{2\pi}\sigma}e^{-\frac1{2\sigma^2}(x-\mu_c)^2}$: normal, with the same σ in both classes. Compare posteriors:

1. $p_1(x)\gtrless p_2(x)\iff\log p_1(x)\gtrless\log p_2(x)$ (log is increasing).
2. The denominators of $p_1,p_2$ are equal and cancel, as do the $\frac1{\sqrt{2\pi}\sigma}$ factors: $\log\pi_1-\frac{(x-\mu_1)^2}{2\sigma^2}\gtrless\log\pi_2-\frac{(x-\mu_2)^2}{2\sigma^2}$.
3. Expand $(x-\mu_c)^2=x^2-2x\mu_c+\mu_c^2$; the $-\frac{x^2}{2\sigma^2}$ term is on both sides and cancels:

   $$
   \underbrace{\log\pi_1+\frac{x\mu_1}{\sigma^2}-\frac{\mu_1^2}{2\sigma^2}}_{=:\delta_1(x)}\ \gtrless\ \underbrace{\log\pi_2+\frac{x\mu_2}{\sigma^2}-\frac{\mu_2^2}{2\sigma^2}}_{=:\delta_2(x)}
   $$

4. $\delta_c$ are the (population) **discriminant functions**; each is linear in x.

> Note that $p_c(x)$ is the **posterior probability**, not the odds, and $\log p_c(x)$ is a **log posterior**, not a log-likelihood. The likelihood part is $f_c(x)$; the posterior also contains the prior $\pi_c$.

**Equal priors** $\pi_1=\pi_2$ (an equal fraction of the sample in each class):

1. The $\log\pi$ terms cancel; multiply by $2\sigma^2$: $2x\mu_1-\mu_1^2\gtrless2x\mu_2-\mu_2^2$.
2. Rearrange: $2x(\mu_1-\mu_2)\gtrless\mu_1^2-\mu_2^2=(\mu_1+\mu_2)(\mu_1-\mu_2)$.
3. Divide by $2(\mu_1-\mu_2)$, which is **negative** when $\mu_1<\mu_2$, so the inequality flips: choose class 1 iff

   $$
   x<\frac{\mu_1+\mu_2}2
   $$

So the rule asks which side of the average of the two class means the point falls: below the midpoint ⇒ class 1 (the class with the smaller mean), above ⇒ class 2.

**Demo.** $\mu_1=-1.25$, $\mu_2=1.25$, so the boundary is 0: class 1 to the left, class 2 to the right. With 20 samples per class, the estimated boundary (solid) sits slightly left of the Bayes boundary (dashed).

> **ISLR §4.4.1, Figure 4.4 (pp. 143-145).** The same example with $\sigma_1^2=\sigma_2^2=1$ and $\pi_1=\pi_2=0.5$: Bayes boundary x = 0. With 20 training points per class, the LDA boundary is the midpoint of the two sample means, slightly left of 0. Test error: Bayes 10.6%, LDA 11.1%, so LDA is 0.5 points above the best possible. The slide's version of this illustration uses σ = 1/2 rather than σ² = 1; the boundary is 0 either way.

**Estimation (plug-in).** $\pi_c,\mu_c,\sigma^2$ are unknown:

$$
\hat\pi_c=\frac{n_c}n,\qquad\hat\mu_c=\frac1{n_c}\sum_{j:y_j=c}x_j,\qquad\hat\sigma^2=\frac1{n-C}\sum_{c\in[C]}\sum_{j:y_j=c}(x_j-\hat\mu_c)^2
$$

$\hat\sigma^2$ is the pooled within-class variance (dividing by n − C for unbiasedness, as with n − p − 1 in Lecture 3). Then $\hat\delta_c(x)=\log\hat\pi_c+\frac{x\hat\mu_c}{\hat\sigma^2}-\frac{\hat\mu_c^2}{2\hat\sigma^2}$, linear: hence the name.

**Worked example.** Class 1: {−2, −1, 0}; class 2: {1, 3, 5}.

1. $\hat\pi_1=\hat\pi_2=\frac12$, $\hat\mu_1=-1$, $\hat\mu_2=3$.
2. Within-class squared deviations: 1 + 0 + 1 = 2 and 4 + 0 + 4 = 8; $\hat\sigma^2=\frac{2+8}{6-2}=2.5$.
3. Boundary: the midpoint $\frac{-1+3}2=1$.
4. Check at x = 0.5: $\hat\delta_1=\frac{0.5(-1)}{2.5}-\frac1{5}+\log\frac12=-0.4+\log\frac12$; $\hat\delta_2=\frac{0.5\cdot3}{2.5}-\frac9{5}+\log\frac12=-1.2+\log\frac12$. $\hat\delta_1>\hat\delta_2$, so class 1.
5. Unequal priors, $\pi_1=\frac13$, $\pi_2=\frac23$: setting $\delta_1=\delta_2$ gives $x^*=\frac{\mu_1+\mu_2}2+\frac{\sigma^2\log(\pi_2/\pi_1)}{\mu_1-\mu_2}=1+\frac{2.5\log2}{-4}=0.567$. The boundary moves towards class 1's mean: the more common class 2 claims more of the line.

## LDA for p ≥ 1

$$
f_c(\mathbf x)=\frac1{(2\pi)^{p/2}|\boldsymbol\Sigma|^{1/2}}e^{-\frac12(\mathbf x-\boldsymbol\mu_c)^{\mathsf T}\boldsymbol\Sigma^{-1}(\mathbf x-\boldsymbol\mu_c)}
$$

The same steps as for p = 1 (the quadratic term $-\frac12\mathbf x^{\mathsf T}\boldsymbol\Sigma^{-1}\mathbf x$ is shared and cancels, and $\boldsymbol\mu_c^{\mathsf T}\boldsymbol\Sigma^{-1}\mathbf x=\mathbf x^{\mathsf T}\boldsymbol\Sigma^{-1}\boldsymbol\mu_c$ since Σ is symmetric) give

$$
\delta_c(\mathbf x)=\log\pi_c+\mathbf x^{\mathsf T}\boldsymbol\Sigma^{-1}\boldsymbol\mu_c-\frac12\boldsymbol\mu_c^{\mathsf T}\boldsymbol\Sigma^{-1}\boldsymbol\mu_c
$$

The p = 1 case is recovered with $\boldsymbol\Sigma=\sigma^2$. The Bayes boundary between classes i and j is $\{\mathbf x:\delta_i(\mathbf x)=\delta_j(\mathbf x)\}$, a hyperplane. Plug-ins: $\hat\pi_c$, $\hat{\boldsymbol\mu}_c$ as before and

$$
\hat{\boldsymbol\Sigma}=\frac1{n-C}\sum_{c\in[C]}\sum_{j:y_j=c}(\mathbf x_j-\hat{\boldsymbol\mu}_c)(\mathbf x_j-\hat{\boldsymbol\mu}_c)^{\mathsf T},\qquad\hat Y(\mathbf x)=\arg\max_c\hat\delta_c(\mathbf x)
$$

> **ISLR §4.4.2, Figure 4.6 (p. 147).** Three classes, p = 2, 20 observations per class: the LDA boundaries (solid) are close to the Bayes boundaries (dashed); test error 0.0770 against the Bayes rate 0.0746.

## LDA on the Default data: errors and thresholds

n = 10,000, C = 2 (default yes/no), p = 2 (balance, student status). Confusion matrix at the Bayes threshold 0.5 (rows predicted, columns true):

| Predicted / True | No | Yes | Total |
| --- | --- | --- | --- |
| No | 9644 | 252 | 9896 |
| Yes | 23 | 81 | 104 |
| Total | 9667 | 333 | 10000 |

1. Default predicted though no default: 23/9667 = 0.2%.
2. No default predicted though default: 252/333 = 75.7%, high.
3. Overall training error: (23 + 252)/10000 = 2.75%, which looks good only because 96.7% of people do not default: predicting "no" for everyone already gives 3.33%.

**Why?** The Bayes classifier minimises the overall error rate, but the card company cares most about missed defaulters. **Fix:** lower the threshold to $\hat p_{\text{default}}(\mathbf x)>0.2$:

| Predicted / True | No | Yes | Total |
| --- | --- | --- | --- |
| No | 9432 | 138 | 9570 |
| Yes | 235 | 195 | 430 |
| Total | 9667 | 333 | 10000 |

Missed defaulters fall from 75.7% to 41.4% (138/333); false alarms rise only from 0.2% to 2.4% (235/9667). Overall error rises from 2.75% to 3.73%: the right threshold depends on the cost of each error, not on the error rate. On the threshold plot, as the threshold falls the blue curve (missed defaulters) falls and the orange (false alarms) rises.

> **ISLR Tables 4.4 and 4.5 (pp. 148, 150)**: the same two matrices. Precision, from Table 4.7's definitions: at 0.5, 81/104 = 77.9% of predicted defaulters do default; at 0.2, 195/430 = 45.3%. Lowering the threshold catches more defaulters, but more of those flagged are false.

**Names for the errors** (rows predicted, columns true; "+" = non-null, here default):

| Name | Definition | Synonyms |
| --- | --- | --- |
| False positive rate | FP/N | Type I error, 1 − specificity |
| True positive rate | TP/P | 1 − Type II error, power, sensitivity, recall |
| Positive predictive value | $\mathrm{TP}/P^*$ | precision, 1 − false discovery proportion |
| Negative predictive value | $\mathrm{TN}/N^*$ |  |

**ROC curve:** TPR against FPR as the threshold runs over all values. Ideal: the top-left corner. **AUC** (area under the curve) summarises it: 0.95 for LDA on Default (good); 0.5 is random guessing.

- At threshold 0.5, (FPR, TPR) = (0.002, 0.243); at 0.2, (0.024, 0.586). Two points on the curve.

> AUC in words: the probability that a randomly chosen defaulter gets a higher score than a randomly chosen non-defaulter. In credit risk the Gini coefficient that model validators quote is 2 × AUC − 1, so AUC 0.95 is Gini 0.90.

## QDA

Allow each class its own covariance: $f_c=\mathcal N(\boldsymbol\mu_c,\boldsymbol\Sigma_c)$. Now $-\frac12\mathbf x^{\mathsf T}\boldsymbol\Sigma_c^{-1}\mathbf x$ differs across classes and does not cancel, and neither does $|\boldsymbol\Sigma_c|$:

$$
\delta_c(\mathbf x)=-\frac12(\mathbf x-\boldsymbol\mu_c)^{\mathsf T}\boldsymbol\Sigma_c^{-1}(\mathbf x-\boldsymbol\mu_c)-\frac12\log|\boldsymbol\Sigma_c|+\log\pi_c\qquad(\text{quadratic in }\mathbf x)
$$

**Trade-off.** Covariance parameters: LDA $\frac{p(p+1)}2$ (Σ symmetric), QDA $C\frac{p(p+1)}2$. More flexible, more data-hungry.

- Example: p = 10, C = 3: LDA 55, QDA 165 covariance parameters. p = 50: 1,275 against 3,825. With a few hundred observations QDA's covariance estimates become very noisy, so LDA's bias can be the better deal (bias-variance again).

## Naive Bayes

**Assumption:** within each class the features are independent, $f_c(\mathbf x)=\prod_{j\in[p]}f_{c,j}(x_j)$. One p-dimensional density becomes p one-dimensional ones. Posterior:

$$
p_c(\mathbf x)=\frac{\pi_c\prod_{j\in[p]}f_{c,j}(x_j)}{\sum_{i\in[C]}\pi_i\prod_{j\in[p]}f_{i,j}(x_j)}
$$

**Estimating** $f_{c,j}$:

- quantitative $X_j$: (1) $X_j\mid Y=c\sim\mathcal N(\mu_{c,j},\sigma_{c,j}^2)$, i.e. QDA with each $\boldsymbol\Sigma_c$ diagonal; or (2) a non-parametric estimate such as a histogram or KDE;
- qualitative $X_j$: the empirical pmf of $X_j$ within class c.

> Note that the diagonal matrices are class-specific and hold variances, not standard deviations: $\boldsymbol\Sigma_c=\mathrm{diag}(\sigma_{c,1}^2,\dots,\sigma_{c,p}^2)$.

> **ISLR §4.4.4, Figure 4.10 (p. 156).** Toy example: p = 3, C = 2, $\hat\pi_1=\hat\pi_2=0.5$, new point $\mathbf x^*=(0.4,1.5,1)$. Class 1: $\hat f_{11}(0.4)=0.368$, $\hat f_{12}(1.5)=0.484$, $\hat f_{13}(1)=0.226$; class 2: 0.030, 0.130, 0.616. Numerators: $0.5\times0.368\times0.484\times0.226=0.0201$ and $0.5\times0.030\times0.130\times0.616=0.0012$, so $\Pr(Y=1\mid\mathbf x^*)=0.0201/0.0213=0.944$. **Table 4.8 (p. 156):** naive Bayes on Default at threshold 0.5 misses 244 of 333 defaulters (73.3%) against LDA's 252 (75.7%), with 46 false alarms against 23.

## Kernel density estimation

**Idea:** a smoothed histogram. Given samples $(x_i)_{i=1}^n$ from a pdf f, a smoothing kernel $K:\mathbb R\to\mathbb R_{\ge0}$ and bandwidth h > 0:

$$
\hat f(x)=\frac1n\sum_{i\in[n]}K_h(x-x_i)=\frac1{hn}\sum_{i\in[n]}K\Big(\frac{x-x_i}h\Big)
$$

Each data point contributes a small bump of width about h; the estimate is their average. Small h: spiky (orange curve, h = 0.05); large h: oversmoothed. Kernels in the table: uniform, triangular, Epanechnikov $\frac34(1-u^2)\mathbb I_{[-1,1]}$, quartic, triweight, tricube, Gaussian, cosine, logistic, sigmoid; all integrate to 1.

**Worked example.** Points {0, 1, 3}, Gaussian kernel, h = 1, at x = 1: $\hat f(1)=\frac13[\varphi(1)+\varphi(0)+\varphi(2)]=\frac13[0.2420+0.3989+0.0540]=0.2316$.

**In $\mathbb R^p$:** bandwidth matrix $\mathbf H\succ0$, $K_{\mathbf H}(\mathbf x)=|\mathbf H|^{-1/2}K(\mathbf H^{-1/2}\mathbf x)$, $\hat f_{\mathbf H}(\mathbf x)=\frac1n\sum_iK_{\mathbf H}(\mathbf x-\mathbf x_i)$. A common choice is the Gaussian $K(\mathbf x)=(2\pi)^{-p/2}e^{-\frac12\|\mathbf x\|_2^2}$. The three contour panels: H a multiple of I (circles), diagonal (axis-aligned ellipses), full (tilted ellipses).

## Comparing the methods through log odds

Against the baseline class C, $\log\frac{p_c(\mathbf x)}{p_C(\mathbf x)}=\log\frac{\pi_cf_c(\mathbf x)}{\pi_Cf_C(\mathbf x)}$.

**LDA.**

1. Substitute the normal densities (the normalising constants are equal and cancel): $\log\frac{\pi_c}{\pi_C}-\frac12(\mathbf x-\boldsymbol\mu_c)^{\mathsf T}\boldsymbol\Sigma^{-1}(\mathbf x-\boldsymbol\mu_c)+\frac12(\mathbf x-\boldsymbol\mu_C)^{\mathsf T}\boldsymbol\Sigma^{-1}(\mathbf x-\boldsymbol\mu_C)$.
2. Expand both quadratics; $\mathbf x^{\mathsf T}\boldsymbol\Sigma^{-1}\mathbf x$ cancels:

   $$
   =\underbrace{\log\frac{\pi_c}{\pi_C}-\frac12(\boldsymbol\mu_c+\boldsymbol\mu_C)^{\mathsf T}\boldsymbol\Sigma^{-1}(\boldsymbol\mu_c-\boldsymbol\mu_C)}_{=:a_c}+\mathbf x^{\mathsf T}\underbrace{\boldsymbol\Sigma^{-1}(\boldsymbol\mu_c-\boldsymbol\mu_C)}_{=:\mathbf b_c}=a_c+\sum_{j\in[p]}b_{c,j}x_j
   $$

3. Linear in x, the same form as logistic regression. The difference is only how the coefficients are fitted: LDA through the Gaussian plug-ins, logistic regression by maximising the conditional likelihood.

**QDA:** $a_c+\sum_jb_{c,j}x_j+\sum_{j,l}q_{c,j,l}x_jx_l$, quadratic. **Naive Bayes:** $\log\frac{\pi_c}{\pi_C}+\sum_{j\in[p]}\log\frac{f_{c,j}(x_j)}{f_{C,j}(x_j)}=a_c+\sum_jg_{c,j}(x_j)$: a sum of one-variable functions, a **generalised additive model**. The sum runs over the predictors, $j\in[p]$.

**KNN classifier** (non-parametric, covered shortly): expected to win when the boundary is highly non-linear, n is large and p small. QDA can win with a non-linear boundary and only moderate n, since it is parametric.

> Choosing between them (ISLR §4.5): LDA beats logistic regression when the Gaussian assumption roughly holds (it uses the extra structure); logistic regression is safer when it does not. LDA, QDA and naive Bayes are nested in assumptions: naive Bayes with Gaussian margins is QDA with diagonal $\boldsymbol\Sigma_c$; LDA is QDA with all $\boldsymbol\Sigma_c$ equal.

## Poisson regression and GLMs

**Bikeshare.** Y = number of users of a bike sharing scheme; X = month, hour, weekday/weekend, temperature, weather. Linear regression can predict negative or non-integer counts, so model Y as **Poisson**:

$$
\mathbb P(Y=k)=\frac{e^{-\lambda}\lambda^k}{k!},\quad k\in\{0,1,\dots\},\qquad\mathbb E Y=\mathrm{var}\,Y=\lambda
$$

Let the mean depend on X through a log-linear form, which keeps it positive: $\lambda(\mathbf x)=e^{\beta_0+\sum_j\beta_jx_j}$. **MLE:** maximise over $\boldsymbol\beta\in\mathbb R^{p+1}$ the likelihood $\prod_{i\in[n]}\frac{e^{-\lambda(\mathbf x_i)}\lambda(\mathbf x_i)^{y_i}}{y_i!}$.

> Note that this product is the likelihood, although ISLR (4.38) labels it $\ell(\boldsymbol\beta)$; in practice its log is maximised.

> **ISLR Table 4.11 (p. 168)**: temp 0.79, weathersit cloudy/misty −0.08, light rain/snow −0.58, heavy rain/snow −0.93 (baseline clear skies). Reading with $\lambda=e^{\langle\boldsymbol\beta,\tilde{\mathbf x}\rangle}$: light rain multiplies expected riders by $e^{-0.58}=0.56$, i.e. 44% fewer than in clear weather, holding the rest fixed; heavy rain by $e^{-0.93}=0.39$. Temperature is on a normalised scale in this data set, so 0.79 is per unit of that scale ($e^{0.79}=2.2$). The month and hour coefficients (Figure 4.15) are highest in spring and autumn and at commuting peaks, lowest in January and overnight.

**One frame for all three (GLM).**

1. Linear regression (Gaussian): $\mathbb E[Y\mid X=\mathbf x]=\langle\boldsymbol\beta,\tilde{\mathbf x}\rangle$.
2. Logistic regression (Bernoulli): $\mathbb E[Y\mid X=\mathbf x]=\mathbb P(Y=1\mid X=\mathbf x)=\frac{e^{\langle\boldsymbol\beta,\tilde{\mathbf x}\rangle}}{1+e^{\langle\boldsymbol\beta,\tilde{\mathbf x}\rangle}}$.
3. Poisson regression: $\mathbb E[Y\mid X=\mathbf x]=e^{\langle\boldsymbol\beta,\tilde{\mathbf x}\rangle}$.

A **link function** η makes each linear: $\eta(\mathbb E[Y\mid X=\mathbf x])=\langle\boldsymbol\beta,\tilde{\mathbf x}\rangle$ with $\eta(\mu)=\mu$, $\eta(\mu)=\log\frac\mu{1-\mu}$ and $\eta(\mu)=\log\mu$ respectively.

**Exponential family.** Gaussian, Bernoulli and Poisson all have the form

$$
\log f_\theta(\mathbf x)=\langle\boldsymbol\eta(\theta),T(\mathbf x)\rangle-A(\theta)+B(\mathbf x)
$$

with natural parameter $\boldsymbol\eta(\theta)$ and sufficient statistic $T(\mathbf x)$; the same link trick gives Gamma regression and negative binomial regression.

- Check for Poisson: $\log\frac{e^{-\lambda}\lambda^k}{k!}=k\log\lambda-\lambda-\log k!$, so $T(k)=k$, natural parameter $\log\lambda$, $A=\lambda$, $B=-\log k!$. The natural parameter is exactly the log link.

## Summary

- Logistic regression: log odds linear in x; fitted by MLE with Newton (IRLS) or coordinate descent.
- Multiclass: baseline (multinomial) or softmax coding; same predictions.
- Generative models via Bayes' rule: LDA (linear), QDA (quadratic), naive Bayes (additive); KDE for non-parametric class densities.
- Errors: confusion matrix, threshold choice, FPR/TPR, ROC and AUC.
- Poisson regression and the GLM frame: linear, logistic and Poisson regression are special cases.

## Traps

- Reading $\beta_j$ in logistic regression as a change in probability; it is a change in **log odds** ($e^{\beta_j}$ multiplies the odds).
- Confusing the log odds (one observation) with the log-likelihood (whole sample).
- Saying the likelihood is defined "for large samples"; it is $f_\theta(x)$ read in θ, for any n.
- Calling a stationary point of Newton's iteration a maximum without concavity or a second-derivative check.
- Writing p (predictors) for C (classes) in the multinomial model.
- Saying softmax is used because the logistic is not differentiable; with C = 2 they coincide.
- Labelling posteriors $p_c(x)$ as odds, or log posteriors as log-likelihoods.
- Forgetting that the inequality flips when dividing by $\mu_1-\mu_2<0$ in the LDA midpoint rule.
- Dividing $\hat{\boldsymbol\Sigma}$ by n instead of n − C.
- Judging a classifier on an imbalanced data set by overall error (2.75% looks good while 75.7% of defaulters are missed).
- Counting QDA parameters as C times LDA's in total; those counts are for the covariance part only (the means add Cp in both).
- Treating the naive Bayes assumption as "features independent"; it is independence **within each class**.

## Self-check

1. Logistic regression gives $\hat\beta_0=-3$, $\hat\beta_1=0.5$. At x = 4, what is $\hat p$, and by what factor do the odds change per unit of x? $z=-1$, $\hat p=e^{-1}/(1+e^{-1})=0.269$; *the odds multiply by* $e^{0.5}=1.65$.
2. Show that with C = 2 the softmax probabilities equal a logistic function of a single linear predictor. $\frac{e^{z_1}}{e^{z_1}+e^{z_2}}=\frac{e^{z_1-z_2}}{1+e^{z_1-z_2}}=L(\langle\bar{\boldsymbol\beta}_1-\bar{\boldsymbol\beta}_2,\tilde{\mathbf x}\rangle)$.
3. One step of Newton for $\max\ell(p)$ with S = 3, n = 10, from $p_0=0.5$. $\ell'(0.5)=6-14=-8$, $\ell''(0.5)=-12-28=-40$, *so* $p_1=0.5-(-8)/(-40)=0.3$: *exact in one step here.*
4. LDA, p = 1, $\mu_1=0$, $\mu_2=2$, σ² = 1, $\pi_1=0.8$. Where is the boundary? $x^*=1+\frac{\log(0.2/0.8)}{0-2}=1+0.693=1.693$; *class 1 for x below it.*
