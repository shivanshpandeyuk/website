---
draft: false
title: "Lecture 10 - Data reduction and improvement"
paper: "ST460 Statistical Inference"
year: "M.S. Statistics (LSE)"
section: "Statistical inference"
description: "Sufficiency and the factorisation theorem, sufficient statistics for Bernoulli, normal and exponential-family models, why the sum fails for a uniform endpoint, ancillary statistics, Rao-Blackwell improvement, and what a sufficient summary cannot tell you about the model."
order: 10
tags: [statistics, inference]
---

ST460, LSE, Autumn Term 2026, week 6.

## Cheat sheet

- **Sufficiency:** T(X) sufficient for θ if the conditional law $\mathcal L_\theta(X\mid T)$ does not depend on θ. Always relative to a model $\{P_\theta:\theta\in\Theta\}$.
- **Factorisation theorem:** with a common reference measure, T sufficient ⇔ $f_\theta(x)=g_\theta\{T(x)\}\,h(x)$, h free of θ. All θ-dependence, including support restrictions, must pass through T.
- **Bernoulli:** $f_p(x)=p^S(1-p)^{n-S}$, S = ΣXᵢ sufficient; given S = s every sequence has probability $1/\binom ns$.
- **Likelihood ratios** depend on the data only through a sufficient T: $f_{\theta_1}(x)/f_{\theta_2}(x)=g_{\theta_1}(T)/g_{\theta_2}(T)$.
- **Activity 10.1:** (1, 1, 0, 0) and (1, 0, 1, 0) both have likelihood $p^2(1-p)^2$; order adds no information about p under IID but can still help check IID.
- **Normal, σ² known:** $\sum(X_i-\mu)^2=\sum(X_i-\bar X)^2+n(\bar X-\mu)^2$ ⇒ $\bar X$ sufficient for μ.
- **Normal, both unknown:** $(\sum X_i,\sum X_i^2)$ sufficient for (μ, σ²); equivalently $(\bar X,S^2)$.
- **Exponential family** $h(x)\exp\{\eta(\theta)^\top t(x)-A(\theta)\}$: $\sum_it(X_i)$ sufficient.
- **Non-uniqueness:** one-to-one functions of a sufficient T are sufficient; X itself is trivially sufficient. Minimal sufficiency asks for the smallest.
- **Activity 10.3:** Uniform(0, θ), (1, 4) vs (2, 3): at θ = 3.5 likelihoods 0 vs 1/12.25 ≈ 0.082; at θ = 5 both 1/25 = 0.04. Same sum, different likelihood ratios ⇒ sum not sufficient; the max is.
- **Ancillary:** distribution free of θ (e.g. residuals $X_i-\bar X$ in a normal location model). Sufficient retains θ-information; ancillary carries none on its own.
- **Rao-Blackwell:** $U^*=\mathbb E[U\mid T]$, T sufficient ⇒ same bias and $\mathrm{MSE}(U)-\mathrm{MSE}(U^*)=\mathbb E\{\mathrm{Var}(U\mid T)\}\ge0$.
- **Bernoulli Rao-Blackwell:** $\mathbb E[X_1\mid S]=S/n=\bar X$; variance p(1 − p) falls to p(1 − p)/n.
- **Activity 10.2:** n = 8, S = 3: $\mathbb E[X_1\mid S]=S/8$, estimate 0.375; $\mathrm{Var}(S/8)=p(1-p)/8$ vs $\mathrm{Var}(X_1)=p(1-p)$, an 8-fold reduction.
- **Uniform Rao-Blackwell:** $U=2X_1$ unbiased for θ; $\mathbb E[2X_1\mid M]=\frac{n+1}{n}M$, M = max.
- **Scope:** conditioning cannot fix misspecification, selection, the wrong target or the wrong loss.

## Can a summary retain all parameter information?

If I tell you only the number of successes in 1,000 coin flips, have I thrown away anything that helps you estimate p? Under IID Bernoulli, no. That is the idea of sufficiency.

- A statistic T(X) summarises the sample in fewer numbers. Sufficiency asks whether knowing the full data adds information about θ once T is known.
- **Sufficiency is a model-relative statement about parameter information.**

## Definition: the conditional data distribution is parameter-free

$$
T(X)\text{ is sufficient for }\theta\iff\mathcal L_\theta(X\mid T)\text{ does not depend on }\theta.
$$

- T is sufficient if this conditional distribution is invariant to θ. The definition says what sufficiency means but is not easy to work with; the factorisation theorem (next) is how you check it.
- **Once T is known, the remaining variation in the full sample contains no further information about θ under the stated model.**
- Assumption: sufficiency is always relative to a family $\{P_\theta:\theta\in\Theta\}$.

> **Why "parameter-free conditional law" means "no information".** Think of generating the data in two stages: first draw T from a law that depends on θ, then draw X given T from a law that does not. The second stage is pure noise as far as θ is concerned: a statistician who only saw T could simulate a fake full sample with exactly the right distribution without knowing θ.

## The factorisation theorem

Suppose all joint PMFs or densities $f_\theta$ use a common reference measure (counting, or Lebesgue on the same sample space). Then

$$
T(X)\text{ sufficient}\iff f_\theta(x)=g_\theta\{T(x)\}\,h(x)\quad\text{for some }g_\theta\ge0,\ h\ge0,\ h\text{ free of }\theta.
$$

- g depends on θ, and on x only through T; h is the part without θ.
- **All** parameter dependence, including **support restrictions**, must pass through T (this is what Activity 10.3 tests).
- Recipe: **factor the joint density or mass function and identify which statistics appear with the parameter.**

## Bernoulli: the success count is sufficient

$X_i\overset{\text{iid}}{\sim}\text{Bernoulli}(p)$, $S=\sum_iX_i$.

1. Joint PMF by independence:

$$
f_p(x)=\prod_{i=1}^np^{x_i}(1-p)^{1-x_i}.
$$

2. Collect exponents: the p-exponents sum to $x_1+\dots+x_n=s$ and the (1 − p)-exponents to $(1-x_1)+(1-x_2)+\dots=n-s$, so

$$
f_p(x)=p^{S}(1-p)^{n-S}.
$$

3. Factorisation with $g_p(s)=p^s(1-p)^{n-s}$ and h(x) = 1: S is sufficient.
4. **Check via the definition:** for any binary x with Σxᵢ = s,

$$
\mathbb P(X=x\mid S=s)=\frac{p^s(1-p)^{n-s}}{\binom ns p^s(1-p)^{n-s}}=\frac{1}{\binom ns},
$$

which does not depend on p.

- So we do not need all of x₁, …, xₙ, just s = Σxᵢ, the sufficient statistic.

## Sufficiency preserves likelihood comparisons

If T is sufficient, for any θ₁, θ₂, wherever the denominator is positive,

$$
\frac{f_{\theta_1}(x)}{f_{\theta_2}(x)}=\frac{g_{\theta_1}\{T(x)\}\,h(x)}{g_{\theta_2}\{T(x)\}\,h(x)}=\frac{g_{\theta_1}\{T(x)\}}{g_{\theta_2}\{T(x)\}}.
$$

The h(x) cancels, so the ratio depends on the data only through T.

- **Interpretation:** data reduction is exact for inference **within** the model, but it does not preserve information about model misspecification or data provenance.

### Activity 10.1: what information does order add?

Under IID Bernoulli(p), 0 < p < 1, compare the ordered samples (1, 1, 0, 0) and (1, 0, 1, 0). Do their likelihoods differ? Could order still help check the IID assumption?

1. Both have s = 2, n = 4, so both have $L(p)=p^2(1-p)^2$.
2. **The likelihoods do not differ:** for every p the ratio is 1, so order carries no information about p under the model.
3. **Order can still check the model.** Long runs, a trend or alternation suggest dependence (autocorrelation, say) or drift, which would violate IID. Sufficiency is silent about that because it assumes the model.

> Note that the likelihood of an **ordered** sequence has no binomial coefficient (the same point as L8 Activity 8.1). $\binom42=6$ is the number of sequences with S = 2, so it appears in $\mathbb P(S=2)=6p^2(1-p)^2$ and in the conditional probability $\mathbb P(X=x\mid S=2)=1/6$ above.

## Normal mean with known variance

$X_i\overset{\text{iid}}{\sim}\mathcal N(\mu,\sigma^2)$, σ² known.

**Decomposition.**

1. Add and subtract $\bar X$:

$$
\sum_i(X_i-\mu)^2=\sum_i\{(X_i-\bar X)+(\bar X-\mu)\}^2.
$$

2. Expand:

$$
=\sum_i(X_i-\bar X)^2+2(\bar X-\mu)\sum_i(X_i-\bar X)+n(\bar X-\mu)^2.
$$

3. The cross term is zero because $\sum_i(X_i-\bar X)=0$; the last term is n times a constant.
4. Hence

$$
\sum_i(X_i-\mu)^2=\sum_i(X_i-\bar X)^2+n(\bar X-\mu)^2.
$$

5. Plug into the joint density, splitting the parameter-free part from the parameter-dependent part:

$$
f_\mu(x)=\underbrace{(2\pi\sigma^2)^{-n/2}\exp\Big\{-\frac{\sum(x_i-\bar x)^2}{2\sigma^2}\Big\}}_{h(x)}\ \underbrace{\exp\Big\{-\frac{n(\bar x-\mu)^2}{2\sigma^2}\Big\}}_{g_\mu(\bar x)}.
$$

h is free of μ because σ² is known.

6. Factorisation: $\bar X$ is sufficient for μ.

> Note that neither sum is σ²: σ² is the fixed known variance, while $\sum(X_i-\bar X)^2$ is a random sum of squares with expectation $(n-1)\sigma^2$. What makes $\sum(x_i-\bar x)^2$ belong in h is that it is free of μ.

## Both normal parameters unknown

$$
f_{\mu,\sigma^2}(x)\propto(\sigma^2)^{-n/2}\exp\Big\{-\frac{\sum x_i^2-2\mu\sum x_i+n\mu^2}{2\sigma^2}\Big\}.
$$

1. Expand $\sum(x_i-\mu)^2=\sum x_i^2-2\mu\sum x_i+n\mu^2$.
2. The data enter only through $\sum x_i$ and $\sum x_i^2$; everything else is a function of (μ, σ²), with h(x) = $(2\pi)^{-n/2}$.
3. So $T(X)=(\sum X_i,\sum X_i^2)$ is sufficient for (μ, σ²).

- One-to-one: $(\bar X,S^2)$ with $S^2=\frac{1}{n-1}\{\sum X_i^2-n\bar X^2\}$ is equally sufficient (see non-uniqueness below).

> Note three things on this slide. $(\sigma^2)^{-n/2}$ contains no **data** but does contain a parameter, which is why it sits in $g_\theta$, not in h. $\sum X_i$ and $\sum X_i^2$ are the sum and the sum of squares; they **determine** the sample mean and variance (one-to-one), which is why either pair works, but $\sum X_i^2$ alone is not the sample variance. And with σ² unknown, $\bar X$ alone is **not** sufficient: a second summary is needed for σ².

## Exponential families display their sufficient statistics

$$
f_\theta(x)=h(x)\exp\{\eta(\theta)^\top t(x)-A(\theta)\}\ \Longrightarrow\ T(X)=\sum_{i=1}^nt(X_i)\ \text{sufficient (factorisation).}
$$

t(x) and η(θ) are matching vectors, h is parameter-free, A(θ) normalises.

- **Bernoulli:** $p^x(1-p)^{1-x}=\exp\{x\log\frac p{1-p}+\log(1-p)\}$: t(x) = x.
- **Poisson:** $\frac{1}{x!}\exp\{x\log\lambda-\lambda\}$: t(x) = x, so ΣXᵢ.
- **Normal:** t(x) = (x, x²), matching the section above.
- Uniform(0, θ) is **not** an exponential family: its support depends on θ.

## A sufficient statistic is not unique

- If T is sufficient and q is one-to-one, q(T) is sufficient. Adding irrelevant components also preserves sufficiency.
- The full sample X is trivially sufficient but provides no useful reduction.
- **Minimality:** sufficiency alone does not say T is the smallest summary that retains all parameter information; **minimal sufficiency**, what we really care about, addresses that. Proofs not examinable.

## Can the sum be sufficient for a uniform endpoint?

### Activity 10.3

IID Uniform(0, θ) samples (1, 4) and (2, 3) both have sum 5. Likelihood $\theta^{-2}\mathbf 1\{\max_ix_i\le\theta\}$. Compare at θ = 3.5 and θ = 5. Can the sum be sufficient?

1. **Joint density:**

$$
f_\theta(x)=\prod_{i=1}^2\frac1\theta\mathbf 1\{0\le x_i\le\theta\}=\theta^{-2}\,\mathbf 1\{\max_ix_i\le\theta\}\quad(x_i\ge0).
$$

2. **θ = 3.5:** L(3.5; 1, 4) = 0 because 4 > 3.5; L(3.5; 2, 3) = $1/3.5^2=1/12.25\approx0.0816$.
3. **θ = 5:** both equal $1/25=0.04$.
4. The ratio L(5)/L(3.5) is 0.04/0.0816 = 0.49 for (2, 3) but infinite (0.04/0) for (1, 4). Same sum but different likelihood comparisons, so the sum is evidently **not** sufficient.
5. **What is sufficient:** take $g_\theta(m)=\theta^{-2}\mathbf 1\{m\le\theta\}$ with $m=\max_ix_i$ and h(x) = 1{all xᵢ ≥ 0}. So $M=\max_iX_i$ is sufficient.

> Note that a factorisation does exist; it just runs through the **maximum**, not the sum. The precise statement is that no factorisation exists in which θ meets the data only through Σxᵢ, because the indicator 1{max xᵢ ≤ θ} cannot be written as a function of the sum. Write the condition as 1{xᵢ ≤ θ for **all** i}.

## Ancillary statistics

A(X) is **ancillary** if its distribution does not depend on θ. Its marginal law cannot distinguish parameter values, though it can help with conditional analysis or model checking. No technical derivation is required.

- Normal location model, σ² known: the residual vector $(X_1-\bar X,\dots,X_n-\bar X)$ has a law free of μ (shifting every Xᵢ by μ leaves the residuals unchanged).
- **A sufficient statistic retains information about the parameter; an ancillary statistic has a parameter-free distribution.**
- Link to Activity 10.1: the order of a Bernoulli sample given S is noise for p, yet it is exactly what you inspect to test IID.

## Rao-Blackwell: conditioning on a sufficient statistic reduces MSE

Let U estimate g(θ) with finite second moment and T be sufficient. Define

$$
U^*=\mathbb E_\theta[U\mid T].
$$

Sufficiency ensures U\* does not depend on θ, so it is a genuine statistic. Under squared-error loss, $\mathrm{MSE}_\theta(U^*)\le\mathrm{MSE}_\theta(U)$.

**Derivation.**

1. **Tower law:** $\mathbb E[U^*]=\mathbb E[\mathbb E(U\mid T)]=\mathbb E[U]$, so $\mathrm{Bias}(U^*)=\mathrm{Bias}(U)$.
2. **Total variance:**

$$
\mathrm{Var}(U)=\mathbb E\{\mathrm{Var}(U\mid T)\}+\mathrm{Var}\{\mathbb E(U\mid T)\}=\mathbb E\{\mathrm{Var}(U\mid T)\}+\mathrm{Var}(U^*).
$$

3. The first term is an expectation of a non-negative quantity, so $\mathrm{Var}(U)\ge\mathrm{Var}(U^*)$.
4. Add the common squared bias to both sides:

$$
\mathrm{MSE}(U)=b^2+\mathrm{Var}(U)\ \ge\ b^2+\mathrm{Var}(U^*)=\mathrm{MSE}(U^*),
$$

with $\mathrm{MSE}(U)-\mathrm{MSE}(U^*)=\mathbb E\{\mathrm{Var}(U\mid T)\}\ge0$.

- Unbiasedness is preserved but is not required for the improvement.
- Equality iff U is already a function of T (then Var(U | T) = 0).
- Where sufficiency is used: without it, $\mathbb E_\theta[U\mid T]$ could depend on θ and you could not compute it.

> Note that Rao-Blackwell guarantees **no worse**, with strict improvement whenever U is not already a function of T. The size of the gain is $\mathbb E\{\mathrm{Var}(U\mid T)\}$, which can be small. In the Bernoulli case below it happens to be large (a factor n).

**One Bernoulli observation improves to the sample proportion.** $U=X_1$ is unbiased for p; S = ΣXᵢ is sufficient.

1. By symmetry (IID), $\mathbb E[X_1\mid S]=\mathbb E[X_2\mid S]=\dots=\mathbb E[X_n\mid S]$.
2. Their sum is $\mathbb E[\sum X_i\mid S]=S$.
3. So $\mathbb E[X_1\mid S]=S/n=\bar X$.
4. Variances: $\mathrm{Var}(X_1)=p(1-p)$, $\mathrm{Var}(\bar X)=p(1-p)/n$.

Rao-Blackwellisation turns $X_1$ into the sample proportion.

### Activity 10.2: calculate a conditional estimate

n = 8 IID Bernoulli(p) trials, observed S = 3. Find $\mathbb E[X_1\mid S]$ and compare its sampling variance with that of $X_1$.

1. From above, $\mathbb E[X_1\mid S]=S/8$. Direct check: given S = 3, $X_1=1$ in $\binom72=21$ of the $\binom83=56$ equally likely sequences, so $\mathbb P(X_1=1\mid S=3)=21/56=3/8$.
2. **Estimate:** 3/8 = 0.375.
3. **Sampling variance:** $\mathrm{Var}(S/8)=\frac{8p(1-p)}{64}=\frac{p(1-p)}{8}$, against $\mathrm{Var}(X_1)=p(1-p)$: eight times smaller, for every p.

> Note that once S = 3 is observed, E(X₁ | S = 3) = 3/8 is a number, and its variance is 0. The comparison is between the **estimators** E(X₁ | S) = S/8 (random through S) and X₁. Compute the rule's variance before plugging in the data, as in L9.

**Uniform example.** $X_i\overset{\text{iid}}{\sim}U(0,\theta)$, M = max Xᵢ sufficient (Activity 10.3). Start from the unbiased $U=2X_1$.

1. Given M, one observation equals M and the other n − 1 are IID U(0, M).
2. Hence $\mathbb E[\sum_iX_i\mid M]=M+(n-1)\frac M2=\frac{(n+1)M}{2}$.
3. By symmetry, $\mathbb E[X_1\mid M]=\frac1n\cdot\frac{(n+1)M}{2}=\frac{(n+1)M}{2n}$.
4. So $U^*=\mathbb E[2X_1\mid M]=\frac{n+1}{n}M$, unbiased for θ, and it can never fall below the largest observation (unlike $2\bar X$ in L9).

> Note that a conditional expectation given M is a function of M only; it cannot branch on the value of Xᵢ itself. With probability 1/n the i-th observation is the maximum (contributing M), otherwise it is uniform on (0, M) (contributing M/2), giving E(Xᵢ | M) = M/n + (n − 1)M/(2n) = (n + 1)M/(2n).

> **Check by numbers.** n = 5, θ = 10: $\mathrm{Var}(2\bar X)=\theta^2/(3n)=6.67$; $\mathrm{Var}\{\frac{n+1}{n}M\}=\frac{\theta^2}{n(n+2)}=100/35=2.86$. Rao-Blackwell more than halves the variance here, and the gap widens with n (order 1/n versus 1/n²).

## Rao-Blackwell improves the rule, not the model

Conditioning on a sufficient statistic cannot repair:

- a misspecified sampling distribution;
- selection into the observed sample;
- a target that differs from the model parameter;
- a loss function for which the proposed comparison is invalid.

Sufficiency preserves parameter information under the assumed sampling model.

## A sufficient summary can hide evidence against the model

In the Bernoulli IID model, S is sufficient for p. **Yet the order of zeros and ones can reveal time trends, clustering or dependence that violate IID.**

- A sufficient statistic preserves information about p **conditional on the model being true**; diagnostics may need aspects of the data that are irrelevant to p within that model.
- So sufficiency only holds if the underlying model specification was correct in the first place.

> **Coverage analogue.** A company's annual revenue total is a fine summary if quarters are IID draws around a level. It hides a collapsing Q4 run-rate. Sufficiency for the level parameter says nothing about whether the level model is right; you still look at the quarterly sequence.

## Summary

- Sufficiency makes the conditional law of the full data parameter-free.
- Factorisation identifies sufficient statistics when densities share a reference measure.
- Exponential families provide finite-dimensional reductions naturally.
- Rao-Blackwellisation can reduce squared-error risk (never increase it).
- Reduction under a model does not replace model checking.
- Next (L11): likelihood turns the retained parameter information into an estimation criterion.

## Traps

- Using the definition to check sufficiency when factorisation is far quicker.
- Forgetting support restrictions: for U(0, θ) the indicator carries θ, so the max (not the sum) is sufficient.
- Calling a factor "parameter-free" because it contains no x, e.g. $(\sigma^2)^{-n/2}$.
- Treating ΣXᵢ² as the sample variance; it is a sum of squares that, with ΣXᵢ, determines S².
- Claiming $\bar X$ is sufficient for (μ, σ²) when σ² is unknown.
- Putting a binomial coefficient in the likelihood of an ordered sequence (Activity 10.1).
- Computing the variance of a realised conditional expectation (a number) instead of the estimator E(U | T) (Activity 10.2).
- Writing E(Xᵢ | M) as a function of Xᵢ.
- Believing Rao-Blackwell always gives a big gain, or that it fixes a wrong model.
- Concluding from sufficiency that the order of observations is useless; it is still a model check.

## Self-check

1. $X_i\overset{\text{iid}}{\sim}\text{Poisson}(\lambda)$. Factorise and name a sufficient statistic. *$f=\lambda^{\sum x_i}e^{-n\lambda}\cdot\prod(1/x_i!)$; ΣXᵢ.*
2. $X_i\overset{\text{iid}}{\sim}\text{Exponential}(\lambda)$. Sufficient statistic? *$\lambda^ne^{-\lambda\sum x_i}$, so ΣXᵢ.*
3. $X_i\overset{\text{iid}}{\sim}U(\theta,\theta+1)$. Is the max alone sufficient? *No; the indicator is 1{min ≥ θ}1{max ≤ θ + 1}, so (min, max) is needed.*
4. Bernoulli, n = 10, U = X₁. What is $\mathbb E\{\mathrm{Var}(U\mid S)\}$ when p = 0.5? *The MSE gap: p(1 − p) − p(1 − p)/10 = 0.25 − 0.025 = 0.225.*
