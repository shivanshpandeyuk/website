---
draft: false
title: "Lecture 6 - LLN, CLT and studentisation"
paper: "ST460 Statistical Inference"
year: "M.S. Statistics (LSE)"
section: "Statistical inference"
description: "The weak law of large numbers, the classical CLT and the √n scale, standard errors, the binomial normal approximation and continuity correction, studentisation and the exact t, and where the theorems fail."
order: 6
tags: [statistics, inference]
---

ST460, LSE, Autumn Term 2026, week 3.

## Cheat sheet

- **LLN (where does it go?):** IID, $\mathbb E|X_i|<\infty$ ⇒ $\bar X_n\xrightarrow{p}\mu$. With finite variance, Chebyshev proves it: $\mathbb P(|\bar X_n-\mu|>\varepsilon)\le\sigma^2/(n\varepsilon^2)$.
- **CLT (how does it fluctuate?):** IID, $0<\sigma^2<\infty$ ⇒ $\sqrt n(\bar X_n-\mu)/\sigma\xrightarrow{d}\mathcal N(0,1)$; equivalently $\bar X_n\ \dot\sim\ \mathcal N(\mu,\sigma^2/n)$.
- **Rate:** error is of order $1/\sqrt n$; halving the SE needs 4× the data.
- **Fixed vs shrinking tolerance:** $\mathbb P(|\bar X_n-\mu|<\sigma)\to1$ (LLN); $\mathbb P(|\bar X_n-\mu|<\sigma/\sqrt n)\to2\Phi(1)-1\approx0.6827$ (CLT).
- **Standard error:** $\mathrm{SE}(T_n)=\sqrt{\mathrm{Var}(T_n)}$; $\mathrm{SE}(\bar X_n)=\sigma/\sqrt n$. SD describes observations, SE describes the estimator.
- **Example:** mean 10, variance 9, n = 100 ⇒ SE 0.3, z = 2, $\mathbb P(\bar X_{100}>10.6)\approx0.0228$ (approximation).
- **Binomial:** $(K_n-np)/\sqrt{np(1-p)}\xrightarrow{d}\mathcal N(0,1)$; poor when np or n(1 − p) is small.
- **Continuity correction:** Bin(200, 0.3), $\mathbb P(S\ge70)\approx1-\Phi\big((69.5-60)/\sqrt{42}\big)\approx0.071$ (exact 0.073).
- **Studentisation:** $T_n=\sqrt n(\bar X_n-\mu)/S_n\xrightarrow{d}\mathcal N(0,1)$ under CLT conditions (Slutsky, Lecture 7).
- **Exact t:** normal IID data ⇒ $\sqrt n(\bar X_n-\mu)/S_n\sim t_{n-1}$ for every n ≥ 2. $t_\nu=Z/\sqrt{U/\nu}$, $Z\perp U\sim\chi^2_\nu$.
- **Cauchy:** $\bar X_n\sim\text{Cauchy}(0,1)$ for every n. No mean, no LLN, no CLT.
- **Dependence:** common covariance γ > 0 ⇒ $\mathrm{Var}(\bar X_n)\to\gamma$; the IID SE $\sigma/\sqrt n$ is then wrong.

## The LLN and CLT answer different questions

For IID observations with mean μ and $0<\sigma^2<\infty$:

$$
\underbrace{\bar X_n\xrightarrow{p}\mu}_{\text{LLN: where does it go?}}\qquad\text{and}\qquad\underbrace{\frac{\sqrt n(\bar X_n-\mu)}{\sigma}\xrightarrow{d}\mathcal N(0,1)}_{\text{CLT: how does it fluctuate?}}
$$

- LLN: the sample mean converges in probability to the population mean.
- Consistency gives the limiting value; a limiting distribution describes the scaled estimation error.

> Note that the standardised sample mean converges in distribution to N(0, 1), not to μ. The unscaled $\bar X_n$ goes to μ (LLN); once μ is subtracted and the result multiplied by $\sqrt n/\sigma$, the error is blown up to a fixed scale and its shape tends to the standard normal.

## A weak law makes the sample mean consistent

**Statement.** If $X_1,X_2,\dots$ are IID with $\mathbb E[X_i]=\mu$ and finite variance, then $\bar X_n\xrightarrow{p}\mu$, i.e. $\bar X_n-\mu\xrightarrow{p}0$.

**Proof (Chebyshev, from Lecture 5).**

1. $\mathbb E[\bar X_n]=\mu$ and $\mathrm{Var}(\bar X_n)=\sigma^2/n$ (Lecture 4, uses independence).
2. Chebyshev applied to $\bar X_n$ with tolerance ε:

   $$
   \mathbb P(|\bar X_n-\mu|>\varepsilon)\le\frac{\sigma^2/n}{\varepsilon^2}=\frac{\sigma^2}{n\varepsilon^2}\longrightarrow0
   $$

- Notation: write $\mathrm{Var}(\bar X_n)$ for $\sigma^2/n$, since $S^2$ is reserved for the sample variance.
- **Weaker condition:** for IID data, $\mathbb E|X_i|<\infty$ is enough for the LLN. Finite variance is only needed for this short Chebyshev proof.
- No law works without conditions on dependence and tails (see the Cauchy and dependence sections below).

## The LLN gives concentration, not a normal approximation

$\bar X_n\xrightarrow{p}\mu$ says that fixed errors become unlikely. It does not give:

- the shape of the sampling distribution;
- the rate at which the error shrinks;
- probabilities for shrinking error tolerances;
- whether a normal approximation is accurate at the observed n.

## The classical CLT

If $X_1,X_2,\dots$ are IID with $\mathbb E[X_i]=\mu$ and $0<\mathrm{Var}(X_i)=\sigma^2<\infty$:

$$
\frac{\sqrt n(\bar X_n-\mu)}{\sigma}\xrightarrow{d}\mathcal N(0,1)
\qquad\Longleftrightarrow\qquad
\bar X_n\ \dot\sim\ \mathcal N\Big(\mu,\frac{\sigma^2}{n}\Big)\ \text{for large } n
$$

- The first statement is the convergence theorem; the "≈" version is the approximation it licenses for practical use.
- The standardised form subtracts the mean and divides by the standard error $\sigma/\sqrt n$: σ is the SD of the observations, $\sigma/\sqrt n$ the SE of the sample mean, and the standardised error is $(\bar X_n-\mu)/(\sigma/\sqrt n)$.
- Assumptions: IID, finite and positive variance. No normality of the data is needed.

## Why √n is the natural scale

1. $\mathrm{Var}(\bar X_n-\mu)=\sigma^2/n$, so the unscaled error shrinks like $1/\sqrt n$ and its distribution collapses to a point.
2. Multiplying by $\sqrt n$ keeps the variance fixed at σ², giving a non-degenerate limit (the limiting distribution has positive variance):

   $$
   \sqrt n(\bar X_n-\mu)\xrightarrow{d}\mathcal N(0,\sigma^2)
   $$

- Multiply by a faster rate and the variance explodes; by a slower one and it still collapses. $\sqrt n$ is the only scale that gives a finite, non-zero spread.
- **Interpretation:** SE ∝ $1/\sqrt n$, so halving the standard error needs about four times as many independent observations.

## Fixed versus shrinking error tolerances

**Activity 6.1.** IID, mean μ, variance $0<\sigma^2<\infty$. Limits of $\mathbb P(|\bar X_n-\mu|<\sigma)$ and $\mathbb P(|\bar X_n-\mu|<\sigma/\sqrt n)$?

1. **Fixed tolerance σ.** By the LLN, $\mathbb P(|\bar X_n-\mu|\ge\sigma)\to0$, so $\mathbb P(|\bar X_n-\mu|<\sigma)\to1$.
2. **Shrinking tolerance σ/√n.** Rewrite in standardised form:

   $$
   \mathbb P\Big(|\bar X_n-\mu|<\frac{\sigma}{\sqrt n}\Big)=\mathbb P\Big(\Big|\frac{\sqrt n(\bar X_n-\mu)}{\sigma}\Big|<1\Big)\ \longrightarrow\ \mathbb P(|Z|<1)=2\Phi(1)-1\approx0.6827
   $$

   by the CLT ($Z\sim\mathcal N(0,1)$).

So they do not both tend to one. Consistency alone says nothing about tolerances that shrink with n.

> Watch three points here. The activity does not assume normality, only mean μ and finite variance, which is why the answer uses the CLT. The LLN gives no rate; the √n rate comes from the CLT. And it is $\mathbb P(|Z|<1)=2\Phi(1)-1$, whereas $\mathbb P(Z<1)=\Phi(1)\approx0.841$.

## Standard errors

SD refers to the population, the original random variable; SE refers to sampling, the estimator.

$$
\mathrm{SE}(T_n)=\sqrt{\mathrm{Var}(T_n)}\ \text{under the sampling model},\qquad \mathrm{SE}(\bar X_n)=\frac{\sigma}{\sqrt n}
$$

The SE is not the SD of the raw observations, and it is not the realised estimation error $\bar x-\mu$ (which is unknown).

## Standardise using the standard error

**Activity 6.2.** IID with mean 10 and variance 9. Approximate $\mathbb P(\bar X_{100}>10.6)$. Is the SE 3, 0.3 or 0.03? Is the result exact?

1. SD of observations $=\sqrt9=3$. SE of $\bar X_{100}=3/\sqrt{100}=0.3$.
2. Standardise:

   $$
   \frac{10.6-10}{3/\sqrt{100}}=\frac{0.6}{0.3}=2
   $$

3. CLT: $\mathbb P(\bar X_{100}>10.6)\approx\mathbb P(Z>2)=1-\Phi(2)\approx0.0228$.
4. Not exact. IID and finite variance only give a limit theorem; nothing guarantees accuracy at n = 100.

> Note that the question gives only the mean and variance, not normality, so $\bar X_{100}\ \dot\sim\ \mathcal N(10,9/100)$ is approximate (by the CLT), not exact. The denominator in the standardisation is the SE, 0.3, on both sides.

## The CLT for binomial counts

If $K_n\sim\text{Bin}(n,p)$ with fixed $0<p<1$, then $K_n=\sum_{i=1}^nX_i$ with IID $X_i\sim\text{Bernoulli}(p)$, which have mean p and variance $p(1-p)$. Hence

$$
\frac{K_n-np}{\sqrt{np(1-p)}}\xrightarrow{d}\mathcal N(0,1),\qquad K_n\ \dot\sim\ \mathcal N\big(np,\ np(1-p)\big)
$$

- $\bar X_n=K_n/n$ is a sample mean. Dividing numerator and denominator by n gives exactly the CLT for $\bar X_n$ with μ = p, σ² = p(1 − p).
- Quality deteriorates when np or n(1 − p) is small: these are the expected numbers of successes and of failures.

> Note that np is the expected number of successes and n(1 − p) the expected number of failures; the variance is np(1 − p). The standardisation of $\bar X_n$ needs the √n: $(\bar X_n-p)\big/\sqrt{p(1-p)/n}$, which equals the expression above.

## Continuity correction (self-study recap)

A count takes integer values; the normal is continuous. Treat each integer k as the interval $(k-\tfrac12,k+\tfrac12)$.

**Example.** $S\sim\text{Bin}(200,0.30)$: $\mathbb E S=60$, $\mathrm{Var}S=200(0.3)(0.7)=42$, $\mathrm{SD}=\sqrt{42}\approx6.48$.

1. $\{S\ge70\}=\{S>69.5\}$ on the continuous scale.
2. $z=(69.5-60)/6.48\approx1.47$.
3. $\mathbb P(S\ge70)\approx1-\Phi(1.47)\approx0.071$.

Check: the exact binomial value is 0.073. Without the correction, $(70-60)/6.48=1.54$ gives about 0.061, noticeably worse.

## Is n = 100 enough?

**Activity 6.3.** $A\sim\text{Bin}(100,0.5)$ and $B\sim\text{Bin}(100,0.01)$. "Both have n = 100, so both are well approximated by a normal." Agree?

1. **A:** expected successes 50, failures 50. Symmetric; normal approximation plausible.
2. **B:** expected successes $100\times0.01=1$, failures 99. Very skewed, with $\mathbb P(B=0)=0.99^{100}\approx0.366$. A normal centred at 1 with SD ≈ 0.99 puts substantial mass below 0, which is impossible for a count.
3. A has the better normal approximation. Sample size alone does not determine approximation quality; the expected counts do.

This sort of approximation is good at the centre and poor at the tails. The slides show this with Bin(n, 0.1) for n = 10, 100, 1000 (np = 1, 10, 100): central agreement improves quickly, extreme-tail accuracy can stay poor.

## Studentisation: replacing the unknown σ

Usually σ is unknown. Replace it with the sample SD:

$$
T_n=\frac{\sqrt n(\bar X_n-\mu)}{S_n},\qquad S_n^2=\frac1{n-1}\sum_{i=1}^n(X_i-\bar X_n)^2,\ n\ge2
$$

- Under the CLT conditions, $S_n\xrightarrow{p}\sigma>0$ and $T_n\xrightarrow{d}\mathcal N(0,1)$. (Set $T_n=0$ when $S_n=0$; that event has probability tending to zero.)
- The substitution is justified by Slutsky's theorem (Lecture 7).
- Replacing σ by $S_n$ introduces more variability, so convergence to the standard normal is slower: for small n, $T_n$ has heavier tails than N(0, 1). For normal data that extra variability is exactly the t-distribution.

## Normal samples give an exact Student t (self-study recap)

If $X_1,\dots,X_n\overset{\text{iid}}{\sim}\mathcal N(\mu,\sigma^2)$, n ≥ 2, σ² > 0, then exactly

$$
\frac{\sqrt n(\bar X_n-\mu)}{S_n}\sim t_{n-1}
$$

**Where it comes from (links to Lecture 4).**

1. $Z=\sqrt n(\bar X_n-\mu)/\sigma\sim\mathcal N(0,1)$.
2. $U=(n-1)S_n^2/\sigma^2\sim\chi^2_{n-1}$, and $\bar X_n\perp\!\!\!\perp S_n^2$.
3. Divide: $\dfrac{Z}{\sqrt{U/(n-1)}}=\dfrac{\sqrt n(\bar X_n-\mu)/\sigma}{S_n/\sigma}=\dfrac{\sqrt n(\bar X_n-\mu)}{S_n}$. The σ cancels.
4. By definition $t_\nu$ is the law of $Z/\sqrt{U/\nu}$ with $Z\perp U$, so this is $t_{n-1}$.

This quantity has a t distribution regardless of μ and σ (it is pivotal). It is no longer N(0, 1) but a t; as n → ∞, $t\to\mathcal N(0,1)$ anyway.

## A valid CLT can still be a poor approximation

- Skewness, heavy tails (with finite variance) and rare events can leave the finite-sample distribution far from normal.
- **Practical check:** there is no universal threshold for "large enough". Quality depends on the underlying distribution and on how far into the tail the estimate goes. Rules of thumb exist, but only as rules of thumb.
- Central probabilities may be accurate while extreme-tail probabilities remain poor.

## Cauchy averages do not stabilise

Standard Cauchy density $f(x)=\dfrac{1}{\pi(1+x^2)}$, $x\in\mathbb R$. If $X_1,\dots,X_n$ are IID Cauchy(0, 1), then

$$
\bar X_n\sim\text{Cauchy}(0,1)\quad\text{for every } n
$$

- No finite mean, but the median is 0. The sample mean has the same Cauchy distribution, so it is a useless estimator of the centre of a Cauchy distribution.
- The tails decay like $1/x^2$, so $\mathbb E|X|=\int|x|f(x)\,dx$ diverges: no mean, no variance, and both the LLN and the classical CLT assumptions fail. More observations do not automatically make an average well behaved.
- The sample median is consistent for the centre here, which is why robust estimators matter with heavy tails.

## Dependence can stop the variance shrinking

If $\mathrm{Var}(X_i)=\sigma^2$ and $\mathrm{Cov}(X_i,X_j)=\gamma>0$ for $i\ne j$ (from Lecture 4):

$$
\mathrm{Var}(\bar X_n)=\frac{\sigma^2}{n}+\frac{n-1}{n}\gamma\ \longrightarrow\ \gamma
$$

- The covariance does not fall out as n → ∞.
- The IID formula $\sigma/\sqrt n$ would go to zero while the true SE tends to $\sqrt\gamma>0$. Clustered and time-series data need dependence-aware theory.

## Conditions checklist

1. What statistic is changing with n?
2. Are the observations independent (or weakly dependent, or clustered)?
3. Are they identically distributed, or is there a trend?
4. Does the required mean or variance exist?
5. Is the approximation used in the centre or the far tail?

State the theorem and the conditions together.

## Summary

- The LLN makes averages consistent under suitable conditions.
- The CLT gives a standard normal limit for the standardised sample mean.
- Standard errors describe estimator variability under repeated sampling.
- Studentisation replaces the unknown σ by a consistent estimate.
- Without finite variance or independence, the classical IID CLT need not hold.
- Next (Lecture 7): Slutsky and the delta method transfer limiting results to new statistics.

## Traps

- Saying the standardised mean converges to μ (it converges in distribution to N(0, 1)).
- Attributing a √n rate to the LLN.
- Using the SD of the observations (3) where the SE (0.3) belongs.
- Writing $\sim$ (exact) when the CLT only gives $\dot\sim$.
- $\mathbb P(Z<1)$ versus $\mathbb P(|Z|<1)$.
- Trusting a normal approximation because n is large while np is small (Bin(100, 0.01)).
- Confusing n(1 − p) (expected failures) with the variance np(1 − p).
- Using the t-distribution as exact for non-normal data, or the IID SE for dependent data.
- Applying the LLN or CLT to Cauchy-type heavy tails.

## Self-check

1. IID with mean 50, SD 20, n = 400. Approximate $\mathbb P(\bar X>52)$. *SE = 1, z = 2, about 0.023.*
2. To cut the SE from 1 to 0.25, how many observations instead of 400? *16× more, 6,400.*
3. $K\sim\text{Bin}(400,0.5)$. Approximate $\mathbb P(K\ge220)$ with a continuity correction. *Mean 200, SD 10, z = 1.95, about 0.026 (exact 0.026).*
4. n = 10 normal observations, σ unknown. Which distribution does $\sqrt{10}(\bar X-\mu)/S$ follow? $t_9$ *exactly.*
