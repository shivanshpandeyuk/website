---
draft: false
title: "Lecture 7 - Slutsky and the delta method"
paper: "ST460 Statistical Inference"
year: "M.S. Statistics (LSE)"
section: "Statistical inference"
description: "Continuous mapping, Slutsky's theorem, studentisation, Wald intervals, the univariate and multivariate delta method, log and logit scales, and what happens when the derivative is zero or does not exist."
order: 7
tags: [statistics, inference]
---

ST460, LSE, Autumn Term 2026, week 4.

## Cheat sheet

- **Continuous mapping (p):** $T_n\xrightarrow{p}\theta$, g continuous at θ ⇒ $g(T_n)\xrightarrow{p}g(\theta)$. Consistency survives continuous transformations.
- **Continuous mapping (d):** $X_n\xrightarrow{d}X$, g continuous with probability one under the law of X (i.e. $\mathbb P(X\in D_g)=0$) ⇒ $g(X_n)\xrightarrow{d}g(X)$.
- **Slutsky:** $X_n\xrightarrow{d}X$, $Y_n\xrightarrow{p}c$ (a **constant**) ⇒ $X_n+Y_n\xrightarrow{d}X+c$, $X_nY_n\xrightarrow{d}cX$, and if c ≠ 0, $X_n/Y_n\xrightarrow{d}X/c$. No independence needed.
- **Studentisation:** $\sqrt n(T_n-\theta)\xrightarrow{d}\mathcal N(0,\sigma^2)$, $\hat\sigma_n\xrightarrow{p}\sigma>0$ ⇒ $\sqrt n(T_n-\theta)/\hat\sigma_n\xrightarrow{d}\mathcal N(0,1)$.
- **Estimated asymptotic SE:** $\widehat{\mathrm{SE}}(T_n)=\sqrt{\hat V_n/n}$ with $\hat V_n\xrightarrow{p}V$.
- **Wald interval:** $T_n\pm z_{1-\alpha/2}\widehat{\mathrm{SE}}(T_n)$; coverage of the fixed θ tends to 1 − α.
- **Delta method:** $\sqrt n(T_n-\theta)\xrightarrow{d}\mathcal N(0,V)$, V > 0, g differentiable at θ, $g'(\theta)\ne0$ ⇒ $\sqrt n\{g(T_n)-g(\theta)\}\xrightarrow{d}\mathcal N(0,[g'(\theta)]^2V)$.
- **Transformed SE:** $\widehat{\mathrm{SE}}\{g(T_n)\}=|g'(T_n)|\,\widehat{\mathrm{SE}}(T_n)$ (g′ continuous at θ).
- **Activity 7.2 numbers:** $T_n=2$, SE 0.10, φ = 1/θ ⇒ $\hat\phi=0.5$, SE $=2^{-2}\times0.10=0.025$.
- **Log scale:** $\widehat{\mathrm{SE}}(\log T_n)=\widehat{\mathrm{SE}}(T_n)/T_n$; CI for θ: $T_n\exp\{\pm z_{1-\alpha/2}\widehat{\mathrm{SE}}(T_n)/T_n\}$, always positive.
- **Logit scale:** $\sqrt n\{g(\hat p)-g(p)\}\xrightarrow{d}\mathcal N(0,1/\{p(1-p)\})$; back-transform with $h(u)=e^u/(1+e^u)$, stays in (0, 1).
- **Multivariate delta:** $\sqrt n\{g(\boldsymbol T_n)-g(\boldsymbol\theta)\}\xrightarrow{d}\mathcal N(0,\nabla g^\top V\nabla g)$; for p = 2, $g_1^2V_{11}+2g_1g_2V_{12}+g_2^2V_{22}$.
- **Activity 7.3 numbers:** A/B at (2, 1), V = [[1, 1/2], [1/2, 4]] ⇒ ∇g = (1, −2), variance 15 (ignoring covariance gives 17, too large).
- **Zero derivative:** $g(t)=t^2$ at θ = 0 ⇒ $\sqrt nT_n^2\xrightarrow{p}0$; use scale n: $nT_n^2\xrightarrow{d}V\chi^2_1$.
- **Non-differentiable:** $g(t)=|t|$ at 0 ⇒ $\sqrt n|T_n|\xrightarrow{d}|Z|$ (half-normal), by continuous mapping only.

## Why we need tools that reuse one limiting result

Suppose we already have a CLT-type statement

$$
\sqrt n(T_n-\theta)\xrightarrow{d}\mathcal N(0,V).
$$

In practice it is never enough on its own, because we need to:

- replace the unknown V by an estimate;
- transform θ into g(θ) (an odds, a log rate, a ratio);
- combine several estimators;
- build intervals on a scale that respects the parameter space.

**Slutsky handles substitution; the delta method handles smooth transformation.** Continuous mapping underpins both.

## Continuous functions preserve convergence

**Question.** If $X_n$ settles down, does $g(X_n)$ settle down too? Yes, as long as g has no jumps where the limit lives.

$$
X_n\xrightarrow{p}X,\ g\text{ continuous at }X\text{ w.p. 1}\ \Rightarrow\ g(X_n)\xrightarrow{p}g(X);\qquad X_n\xrightarrow{d}X,\ \mathbb P(X\in D_g)=0\ \Rightarrow\ g(X_n)\xrightarrow{d}g(X)
$$

where $D_g$ is the set of discontinuity points of g.

- Discontinuity is allowed on a set of probability 0. That is exactly the condition: g may have jumps, provided the limiting law puts no mass on them.

**Consistency version.** If $T_n\xrightarrow{p}\theta$ and g is continuous at θ, then $g(T_n)\xrightarrow{p}g(\theta)$.

- This is the continuous mapping theorem: if $T_n$ is a consistent estimator of θ, then $g(T_n)$ is a consistent estimator of g(θ).
- Examples: $T_n^2\xrightarrow{p}\theta^2$, $e^{T_n}\xrightarrow{p}e^\theta$, $1/T_n\xrightarrow{p}1/\theta$ (θ ≠ 0).
- **Ratios.** Applying continuous mapping to a ratio needs **joint** convergence of numerator and denominator and $\mathbb P(Y=0)=0$ for the limiting denominator; for a constant limit c this means c ≠ 0.

> **Why θ ≠ 0 matters for 1/T.** If θ = 0, g(t) = 1/t is not continuous at the limit point: $T_n$ can sit just either side of zero and $1/T_n$ swings between ±∞. Same reason a P/E multiple on near-zero earnings is meaningless.

## Slutsky's theorem

**Question.** Given $X_n\xrightarrow{d}X$ and some other sequence $Y_n$ converging to a constant, can they be added, multiplied or divided?

$$
X_n\xrightarrow{d}X,\quad Y_n\xrightarrow{p}c\ \Rightarrow\ X_n+Y_n\xrightarrow{d}X+c,\quad X_nY_n\xrightarrow{d}cX,\quad \frac{X_n}{Y_n}\xrightarrow{d}\frac{X}{c}\ (c\ne0)
$$

- $Y_n\xrightarrow{p}c$ is equivalent to $Y_n\xrightarrow{d}c$, because the limit is a constant.
- **No independence between $X_n$ and $Y_n$ is required**: they can be dependent. The constant probability limit supplies the joint convergence for free.
- What is essential: the limit of $Y_n$ is a **constant**. Convergence in distribution of each sequence separately does not give convergence of sums or ratios in general.

### Activity 7.1: check a claim about a ratio limit

Let Z ∼ N(0, 1) and set $X_n=Y_n=Z$ for every n. Claim: "Slutsky's conditions fail, so $X_n/Y_n$ cannot converge in distribution."

1. **Direct limit.** On the event Z ≠ 0, $X_n/Y_n=Z/Z=1$ for every n. Since $\mathbb P(Z=0)=0$, $X_n/Y_n=1$ with probability one, so $X_n/Y_n\xrightarrow{d}1$ (point mass at 1). The "with probability one" is needed because the ratio is a random variable.
2. **Which condition fails.** The ratio rule needs $Y_n\xrightarrow{p}c$ with c a non-zero **constant**. Here $Y_n=Z$ is a random variable for every n, not converging to a constant, so Slutsky's ratio rule does not apply.
3. **Verdict.** The claim is false. Slutsky's conditions are **sufficient**, not necessary: failing them means the theorem is silent, not that convergence fails.

## Studentisation and the estimated asymptotic SE

**Studentisation.** Suppose $\sqrt n(T_n-\theta)\xrightarrow{d}\mathcal N(0,\sigma^2)$ and $\hat\sigma_n\xrightarrow{p}\sigma>0$.

1. Set $X_n=\sqrt n(T_n-\theta)$, which converges in distribution to N(0, σ²), a distribution.
2. Set $Y_n=\hat\sigma_n$, which converges in probability to σ > 0, a non-zero constant.
3. Slutsky's ratio rule:

$$
\frac{X_n}{Y_n}=\frac{\sqrt n(T_n-\theta)}{\hat\sigma_n}\xrightarrow{d}\frac{1}{\sigma}\mathcal N(0,\sigma^2)=\mathcal N(0,1).
$$

- This is how the Slutsky result is used: the limit is the standard normal. Here σ is the SD of the **limiting law** of $\sqrt n(T_n-\theta)$, and the estimated SE of $T_n$ is $\hat\sigma_n/\sqrt n$.
- This is exactly the step L6 deferred: $\sqrt n(\bar X_n-\mu)/S_n\xrightarrow{d}\mathcal N(0,1)$ under CLT conditions, without normal data.

**Estimated asymptotic SE (self-study recap).** If $\sqrt n(T_n-\theta)\xrightarrow{d}\mathcal N(0,V)$, V > 0, then "for large n"

$$
T_n\ \dot\sim\ \mathcal N\Big(\theta,\frac Vn\Big),\qquad \widehat{\mathrm{SE}}(T_n)=\sqrt{\frac{\hat V_n}{n}},\quad \hat V_n\ge0,\ \hat V_n\xrightarrow{p}V.
$$

- The studentised version again follows from Slutsky's ratio result.
- V is the variance of the **limiting normal law**. Concluding $n\,\mathrm{Var}(T_n)\to V$ needs extra assumptions that control extreme values of $\sqrt n(T_n-\theta)$, roughly "no fat tails". Convergence in distribution does not imply convergence of moments (uniform integrability is the technical condition, not examinable here).

> **Moments can diverge while the law converges.** Let $W_n=\sqrt n(T_n-\theta)$ equal a N(0, 1) draw with probability 1 − 1/n and the value n with probability 1/n. Then $W_n\xrightarrow{d}\mathcal N(0,1)$, but $\mathrm{Var}(W_n)\approx n^2\cdot\frac1n=n\to\infty$. The asymptotic variance is 1; the actual variance explodes.

## Wald confidence intervals

If, by Slutsky, $(T_n-\theta)/\widehat{\mathrm{SE}}(T_n)\xrightarrow{d}\mathcal N(0,1)$, then for 0 < α < 1 an approximate 100(1 − α)% interval is

$$
T_n\pm z_{1-\alpha/2}\,\widehat{\mathrm{SE}}(T_n),
$$

with $z_q$ the q quantile of N(0, 1).

**Derivation.**

1. $\mathbb P\big(-z_{1-\alpha/2}\le(T_n-\theta)/\widehat{\mathrm{SE}}\le z_{1-\alpha/2}\big)\to1-\alpha$ by the limit above and continuity of Φ.
2. Rearrange the event for θ: $T_n-z_{1-\alpha/2}\widehat{\mathrm{SE}}\le\theta\le T_n+z_{1-\alpha/2}\widehat{\mathrm{SE}}$.

- **Interpret carefully:** the **interval is random**, θ is fixed. As n → ∞ the probability that the random interval covers θ tends to 1 − α; for large n about 100(1 − α)% of intervals from repeated samples cover θ.
- This is how frequentists define confidence intervals: a statement about the procedure over repeated samples, not a probability that θ lies in one realised interval.

## The univariate delta method

**Question.** Given how $T_n$ fluctuates around θ, how does $g(T_n)$ fluctuate around g(θ)? Near θ a smooth g is a straight line with slope g′(θ), so errors get multiplied by g′(θ).

**Result.** For a non-degenerate first-order limit, suppose $\sqrt n(T_n-\theta)\xrightarrow{d}\mathcal N(0,V)$ with V > 0, and let g be differentiable at θ with $g'(\theta)\ne0$. Then

$$
\sqrt n\{g(T_n)-g(\theta)\}\xrightarrow{d}\mathcal N\big(0,[g'(\theta)]^2V\big).
$$

This is the key result of the lecture, and the conditions matter.

**Derivation.**

1. **Stochastic Taylor expansion** (differentiability at θ):

$$
g(T_n)-g(\theta)=g'(\theta)(T_n-\theta)+r_n,\qquad r_n=o_p(|T_n-\theta|).
$$

2. **Multiply by $\sqrt n$:**

$$
\sqrt n\{g(T_n)-g(\theta)\}=g'(\theta)\sqrt n(T_n-\theta)+\sqrt n\,r_n.
$$

3. **Remainder vanishes.** $\sqrt n(T_n-\theta)$ is bounded in probability (it converges in distribution), and $r_n/|T_n-\theta|\xrightarrow{p}0$, so $\sqrt n\,r_n\xrightarrow{p}0$.
4. **Leading term.** $g'(\theta)\sqrt n(T_n-\theta)\xrightarrow{d}g'(\theta)\,\mathcal N(0,V)=\mathcal N(0,[g'(\theta)]^2V)$ (continuous mapping, multiplication by a constant).
5. **Slutsky** (sum with a term converging to the constant 0) gives the stated limit.

- **Interpretation:** locally, g multiplies estimation **errors** by g′(θ) and the asymptotic **variance** by $[g'(\theta)]^2$.
- **Why g′(θ) ≠ 0:** if it is zero, the limit is N(0, 0), a point mass; the first-order term carries no information and the right scale changes (see the zero-derivative section below).

## The transformed standard error

Under the delta method conditions, also suppose g′ is continuous at θ. Define

$$
\widehat{\mathrm{SE}}\{g(T_n)\}:=|g'(T_n)|\,\widehat{\mathrm{SE}}(T_n).
$$

- Since $T_n\xrightarrow{p}\theta$, continuous mapping gives $g'(T_n)\xrightarrow{p}g'(\theta)$, so Slutsky allows plugging in the estimated derivative.
- The absolute value keeps the SE non-negative when g is decreasing.
- The non-zero g′(θ) condition is visible here. For large n this is a good approximation to the SE of the random variable $g(T_n)$.

### Activity 7.2: estimate a reciprocal and its standard error

A positive estimator has observed value $T_n=2.00$ and estimated asymptotic SE 0.10. The estimand is φ = 1/θ with θ > 0. Plug-in estimate and delta-method SE: 0.025, 0.05 or 0.20?

1. **Function.** g(t) = 1/t, so $g'(t)=-t^{-2}$.
2. **Plug-in estimate.** $\hat\phi=g(T_n)=1/2.00=0.50$.
3. **SE.** $\widehat{\mathrm{SE}}(\hat\phi)=|g'(T_n)|\,\widehat{\mathrm{SE}}(T_n)=|-2^{-2}|\times0.10=0.25\times0.10=0.025$.
4. **Sign.** g is decreasing, so g′ < 0; the absolute value removes the sign. An SE cannot be negative.

> Note that g is the **function** g(t) = 1/t, and $g(T_n)=1/T_n$ is its value at the estimator. Keeping these apart matters when differentiating: differentiate g in t, then evaluate at $T_n$. The answer also needs the plug-in estimate $\hat\phi=0.5$, not only the SE.

## Log transformation gives multiplicative uncertainty

**Question.** θ > 0 (a rate, a variance, a price). A Wald interval $T_n\pm z\widehat{\mathrm{SE}}$ can dip below zero. Fix: build the interval for log θ, then exponentiate.

1. g(t) = log t, g′(θ) = 1/θ, so $\sqrt n\{\log T_n-\log\theta\}\xrightarrow{d}\mathcal N(0,V/\theta^2)$.
2. Transformed SE: $\widehat{\mathrm{SE}}(\log T_n)=\dfrac{d\log t}{dt}\Big|_{T_n}\widehat{\mathrm{SE}}(T_n)=\widehat{\mathrm{SE}}(T_n)/T_n$.
3. Wald interval for log θ: $\log T_n\pm z_{1-\alpha/2}\,\widehat{\mathrm{SE}}(T_n)/T_n$.
4. Exponentiate the endpoints (exp is increasing):

$$
T_n\exp\Big\{\pm z_{1-\alpha/2}\frac{\widehat{\mathrm{SE}}(T_n)}{T_n}\Big\}.
$$

- The endpoints **divide and multiply** $T_n$ by the same factor: asymmetric on the original scale, always positive.
- The point is the range restriction: a plain Wald CI can breach it, so map to logs. The resulting interval can be very asymmetric.

> **Worked number.** $T_n=2.0$, $\widehat{\mathrm{SE}}=0.5$, 95%. Plain Wald: 2.0 ± 1.96(0.5) = (1.02, 2.98). Log scale: factor $e^{1.96\times0.25}=e^{0.49}=1.632$, interval (2.0/1.632, 2.0×1.632) = (1.23, 3.26). With SE = 1.2 the plain Wald lower end is 2.0 − 2.35 < 0, impossible for a rate; the log interval stays positive. Same logic as quoting a return interval in log returns.

## Logit intervals stay between zero and one

$\hat p=S/n$ with S ∼ Bin(n, p), fixed 0 < p < 1. Log odds (the logit transform) $g(p)=\log\{p/(1-p)\}$, $g'(p)=1/\{p(1-p)\}$.

1. Binomial CLT: $\sqrt n(\hat p-p)\xrightarrow{d}\mathcal N(0,p(1-p))$.
2. Delta method: variance $[g'(p)]^2p(1-p)=\dfrac{1}{p(1-p)}$, so

$$
\sqrt n\{g(\hat p)-g(p)\}\xrightarrow{d}\mathcal N\Big(0,\frac{1}{p(1-p)}\Big).
$$

3. Estimated SE: $\widehat{\mathrm{SE}}\{g(\hat p)\}=1/\sqrt{n\hat p(1-\hat p)}$ for $0<\hat p<1$.
4. Interval for p: apply the inverse logit $h(u)=e^u/(1+e^u)$ to both endpoints of $g(\hat p)\pm z_{1-\alpha/2}/\sqrt{n\hat p(1-\hat p)}$.

- The same delta method gives the distribution of the logit.
- At $\hat p=0$ or 1 the interval is undefined (log 0); these events have probability tending to zero for fixed 0 < p < 1, but they happen in small samples.

> **Worked number.** n = 100, S = 10, 95%. $\hat p=0.10$, logit = log(1/9) = −2.197, SE = $1/\sqrt{100\times0.1\times0.9}=1/3=0.333$. Logit interval: −2.197 ± 0.653 = (−2.851, −1.544); inverse logit gives (0.055, 0.176). Plain Wald: 0.10 ± 1.96(0.03) = (0.041, 0.159). The logit interval is asymmetric about 0.10, as it should be near a boundary.

## The multivariate delta method

If $\sqrt n(\boldsymbol T_n-\boldsymbol\theta)\xrightarrow{d}\mathcal N_p(\mathbf 0,\boldsymbol V)$ and scalar g is differentiable at θ, then

$$
\sqrt n\{g(\boldsymbol T_n)-g(\boldsymbol\theta)\}\xrightarrow{d}\mathcal N\big(0,\nabla g(\boldsymbol\theta)^\top\boldsymbol V\,\nabla g(\boldsymbol\theta)\big),
$$

with V the covariance matrix of the joint limiting law and ∇g the column vector of partial derivatives. This is where the covariance matrix enters.

For p = 2, with $g_j=\partial g/\partial\theta_j(\boldsymbol\theta)$:

$$
\nabla g^\top\boldsymbol V\nabla g=g_1^2V_{11}+2g_1g_2V_{12}+g_2^2V_{22}.
$$

- If this variance is zero, the first-order limit is the constant zero (degenerate; compare the zero-derivative case below).

### Activity 7.3: ratio uncertainty uses covariance

$$
\sqrt n\Big\{\binom{A_n}{B_n}-\binom21\Big\}\xrightarrow{d}\mathcal N_2\Big(\mathbf 0,\begin{pmatrix}1&1/2\\1/2&4\end{pmatrix}\Big).
$$

Consider $\sqrt n(A_n/B_n-2)$. Does ignoring covariance make the limiting variance too large or too small?

1. **Function and gradient.** g(a, b) = a/b. $g_1=1/b$, $g_2=-a/b^2$. At (2, 1): $g_1=1$, $g_2=-2$.
2. **Variance with covariance.**

$$
g_1^2V_{11}+2g_1g_2V_{12}+g_2^2V_{22}=1(1)+2(1)(-2)(\tfrac12)+4(4)=1-2+16=15.
$$

3. **Limit.** $\sqrt n(A_n/B_n-2)\xrightarrow{d}\mathcal N(0,15)$.
4. **Ignoring covariance** gives 1 + 16 = 17, **too large**. Reason: $g_1>0$, $g_2<0$ and $V_{12}>0$, so the cross term $2g_1g_2V_{12}=-2$ is negative. When A and B move together, their ratio moves less.

> Watch for two over-generalisations. First, the sign of the covariance effect depends on g, not only on the covariance: it is the sign of $g_1g_2V_{12}$. For a ratio $g_1g_2<0$, so positive covariance **reduces** the variance; for a sum or product (both partials positive) positive covariance **increases** it. Second, perfect correlation does not make the ratio equal to 1. It makes A an exact linear function of B, A = a + bB. The ratio is constant only when a = 0 (A proportional to B), and then the constant is b, here 2, not 1.

> **Finance analogue.** A P/E built from price and earnings estimates that are positively correlated is less noisy than the two inputs suggest; an EV built by **adding** positively correlated components is noisier. Same formula, opposite sign of $g_1g_2$.

## A zero derivative changes the error scale

Suppose $\sqrt nT_n\xrightarrow{d}Z\sim\mathcal N(0,V)$, V > 0, and take g(t) = t² at θ = 0. Since g′(0) = 0, the first-order limit is valid but **degenerate**: $\sqrt nT_n^2\xrightarrow{p}0$.

1. Rewrite on scale n: $nT_n^2=(\sqrt nT_n)^2$.
2. Continuous mapping with g(z) = z²:

$$
nT_n^2=(\sqrt nT_n)^2\xrightarrow{d}Z^2\sim V\chi^2_1.
$$

- The original limit is normal; after squaring, the limit is not normal but a scaled $\chi^2$.
- Why $V\chi^2_1$: $Z/\sqrt V\sim\mathcal N(0,1)$, so $Z^2=V(Z/\sqrt V)^2\sim V\chi^2_1$.
- Moral: when g′(θ) = 0 the error is of smaller order (1/n, not $1/\sqrt n$) and the limit is not normal.
## Absolute value at zero gives a half-normal limit

Same setting, g(t) = |t| at θ = 0: a V shape, continuous but not differentiable at 0.

$$
\sqrt n|T_n|=|\sqrt nT_n|\xrightarrow{d}|Z|.
$$

- Continuous mapping applies (|·| is continuous); the **linear** delta formula does not (no derivative at 0).
- The limit is half-normal and the $\sqrt n$ scale is retained, unlike the squared case.

## Match the scale to the parameter space

| Parameter | Useful scale | Back-transform u ↦ |
| --- | --- | --- |
| mean or rate θ > 0 | log θ | $e^u$ |
| proportion 0 < θ < 1 | log{θ/(1 − θ)} | $e^u/(1+e^u)$ |
| ratio $r=\theta_1/\theta_2>0$ | log r | $e^u$ |
| effect θ ∈ ℝ | θ | u |

Build the Wald interval on the chosen scale, then back-transform its endpoints. Staying inside the parameter range does not by itself guarantee accurate coverage or validate the model.

## Summary

- Continuous mapping preserves convergence under suitable continuity conditions.
- Slutsky justifies substituting consistent estimators of unknown **constants**.
- The delta method uses derivatives and covariance to approximate transformed uncertainty.
- On the chosen scale, Wald intervals are estimate ± normal quantile × estimated asymptotic SE.
- Zero derivatives, non-differentiable transformations and boundaries need care.
- Next (L8): specify the estimand, model and assumptions these tools serve.

## Traps

- Applying Slutsky when $Y_n$ converges to a random variable (Activity 7.1), or concluding "no convergence" because Slutsky does not apply.
- Forgetting c ≠ 0 in the ratio rule, or θ ≠ 0 for 1/T.
- Treating asymptotic variance V as the limit of $n\,\mathrm{Var}(T_n)$ without extra conditions.
- Dropping the absolute value in $|g'(T_n)|\widehat{\mathrm{SE}}$, or writing g = 1/$T_n$ instead of g(t) = 1/t.
- Using the delta method when g′(θ) = 0 and reporting N(0, 0); switch to scale n (χ² limit).
- Using the delta method at a kink (|t| at 0); only continuous mapping applies.
- Ignoring the covariance term, or assuming positive covariance always reduces variance (it depends on the signs of the partials).
- Plain Wald intervals for positive or bounded parameters that cross the boundary.
- Reading a 95% CI as "95% probability θ is in this interval".

## Self-check

1. $\sqrt n(\bar X_n-\mu)\xrightarrow{d}\mathcal N(0,\sigma^2)$ with μ > 0. Limiting law of $\sqrt n(\bar X_n^2-\mu^2)$? *N(0, 4μ²σ²).*
2. Same, with μ = 0. What is the right scale and limit for $\bar X_n^2$? $n\bar X_n^2\xrightarrow{d}\sigma^2\chi^2_1$.
3. $T_n=4$, $\widehat{\mathrm{SE}}(T_n)=0.4$. Delta-method SE of $\sqrt{T_n}$? $\frac{1}{2\sqrt4}\times0.4=0.1$.
4. In Activity 7.3, what would $V_{12}$ have to be for the limiting variance of $\sqrt n(A_n/B_n-2)$ to be zero? $1-4V_{12}+16=0\Rightarrow V_{12}=17/4$, *which exceeds* $\sqrt{V_{11}V_{22}}=2$, *so it is impossible: the ratio always has positive limiting variance here.*
