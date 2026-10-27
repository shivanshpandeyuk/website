---
draft: false
title: "Lecture 5 - Inequalities and convergence"
paper: "ST460 Statistical Inference"
year: "M.S. Statistics (LSE)"
section: "Statistical inference"
description: "Markov and Chebyshev inequalities, a finite-variance weak law, consistency, convergence in probability, in distribution and almost surely, and how the three modes relate."
order: 5
tags: [statistics, inference]
---

ST460, LSE, Autumn Term 2026, week 3.

## Cheat sheet

- **Markov:** $X\ge0$, $\mathbb E X<\infty$, $a>0$ ⇒ $\mathbb P(X\ge a)\le \mathbb E[X]/a$. Non-negativity is essential.
- **Chebyshev:** finite variance ⇒ $\mathbb P(|X-\mu|\ge\varepsilon)\le\sigma^2/\varepsilon^2$; with $\varepsilon=k\sigma$: $\mathbb P(|X-\mu|<k\sigma)\ge1-1/k^2$.
- **Weak law (finite variance):** IID, mean μ, variance σ² ⇒ $\mathbb P(|\bar X_n-\mu|\ge\varepsilon)\le\sigma^2/(n\varepsilon^2)\to0$.
- **Sample size from Chebyshev:** σ² = 16, ε = 0.5, target 0.10 ⇒ $64/n\le0.10$ ⇒ n ≥ 640. A guarantee, not the actual probability.
- **In probability:** $\mathbb P(|X_n-X|>\varepsilon)\to0$ for every fixed ε > 0.
- **Consistent estimator:** $T_n\xrightarrow{p}\theta$. No rate, no small-sample guarantee. Bias can be present at every n ($\bar X_n+1/n$).
- **In distribution:** $F_{X_n}(x)\to F_X(x)$ at every continuity point of $F_X$. Compares laws, not variables.
- **Almost surely:** $\mathbb P(\lim X_n=X)=1$, outcome by outcome.
- **Hierarchy:** a.s. ⇒ p ⇒ d. Neither arrow reverses in general. Exception: $X_n\xrightarrow{d}c\iff X_n\xrightarrow{p}c$ for a constant c.
- **Counterexamples:** $X_n=1-U$ (d but not p); independent Bernoulli(1/n) (p but not a.s.).
- **Consistency without vanishing variance:** $T_n=n$ w.p. $n^{-2}$, else 0: $T_n\xrightarrow{p}0$ but $\mathrm{Var}(T_n)=1-n^{-2}\to1$.
- **Sufficient condition:** bias → 0 and variance → 0 ⇒ consistent. Not necessary.

## Why we need asymptotics

The big question: how can a random statistic become predictably close to a target?

An estimator is not one random variable but a sequence $T_1,T_2,\dots$, one for each sample size, because its sampling distribution changes with n. The aim is to make precise claims of the form

$$
T_n\ \text{is close to}\ \theta\ \text{with high probability when } n \text{ is large}.
$$

Convergence is the language for how a sequence of random variables behaves as n grows. Lecture 5 builds the tools (inequalities, three modes of convergence); Lecture 6 applies them to sample means (LLN and CLT).

## Markov's inequality: a mean controls a tail

**Intuition.** If a non-negative quantity has a small average, it cannot be large very often: too much mass far out would drag the mean up.

$$
X\ge0,\ \ \mathbb E[X]<\infty,\ \ a>0\ \Longrightarrow\ \mathbb P(X\ge a)\le\frac{\mathbb E[X]}{a}
$$

**Proof.**

1. Define the step function $g(x)=a\,\mathbf 1\{x\ge a\}$: it is 0 for $0\le x<a$ and equals a for $x\ge a$.
2. Pointwise comparison: for every value of a non-negative X,

   $$
   X\ge a\,\mathbf 1\{X\ge a\}
   $$

   If $X<a$ the right side is 0 and $X\ge0$; if $X\ge a$ the right side is a and $X\ge a$. In a picture, the step function sits under the line y = x.
3. Take expectations (expectation preserves ≤):

   $$
   \mathbb E\big[a\,\mathbf 1\{X\ge a\}\big]\le\mathbb E[X]
   $$

4. The expectation of an indicator is a probability, and a comes out as a constant:

   $$
   a\,\mathbb P(X\ge a)\le\mathbb E[X]\ \Longrightarrow\ \mathbb P(X\ge a)\le\tfrac1a\,\mathbb E[X]
   $$

This only holds for non-negative random variables. For a general Y, apply Markov to a non-negative transform such as $|Y|$ or $(Y-\mu)^2$.

> Note that $f_X$ is reserved for the density of X, so the step function gets another name ($g$), and the indicator is of the event $\{x\ge a\}$, not $\{x=a\}$.

**Worked example (slide).** Non-negative loss L with $\mathbb E[L]=2$:

$$
\mathbb P(L\ge10)\le\frac{2}{10}=0.20
$$

- The bound is attained when L = 10 with probability 0.2 and L = 0 otherwise (mean 2 exactly). So Markov cannot be improved without more information.
- The bound holds for every non-negative distribution with this mean; for a specific distribution the true tail may be far smaller.

## Chebyshev's inequality: a variance controls deviations

$$
\mathbb E[X]=\mu,\ \ \mathrm{Var}(X)=\sigma^2<\infty,\ \ \varepsilon>0\ \Longrightarrow\ \mathbb P(|X-\mu|\ge\varepsilon)\le\frac{\sigma^2}{\varepsilon^2}
$$

**Proof.**

1. Square both sides of the event (both sides non-negative, so nothing changes):

   $$
   \mathbb P(|X-\mu|\ge\varepsilon)=\mathbb P\big((X-\mu)^2\ge\varepsilon^2\big)
   $$

2. $(X-\mu)^2$ is non-negative with mean $\sigma^2$, so apply Markov with $a=\varepsilon^2$:

   $$
   \mathbb P\big((X-\mu)^2\ge\varepsilon^2\big)\le\frac{\mathbb E(X-\mu)^2}{\varepsilon^2}=\frac{\sigma^2}{\varepsilon^2}
   $$

An alternative route first divides through by σ², so the variable $(X-\mu)^2/\sigma^2$ has expectation 1, then uses Markov with $a=\varepsilon^2/\sigma^2$. Same answer, one extra step.

**The k-sigma form.** Put $\varepsilon=k\sigma$ and take complements:

$$
\mathbb P(|X-\mu|<k\sigma)\ge1-\frac1{k^2}
$$

- In a picture: the area under $f_X$ between $\mu-k\sigma$ and $\mu+k\sigma$ is at least $1-1/k^2$, whatever the shape of the density.
- Numbers: k = 2 gives at least 75% within two SDs; k = 3 gives at least 88.9%. For a normal the true figures are 95.4% and 99.7%.

> Watch the inequality directions. Markov bounds the upper tail, so the event inside must be $\ge$: $\mathbb P\big((X-\mu)^2/\sigma^2\ge\varepsilon^2/\sigma^2\big)\le\sigma^2/\varepsilon^2$. With $\varepsilon=k\sigma$ the threshold is $\varepsilon^2/\sigma^2=k^2$, not k. The conclusion is a lower bound on the area: $\text{Area}=1-\mathbb P\big((X-\mu)^2/\sigma^2\ge k^2\big)\ge1-1/k^2$.

> **Risk illustration (made-up numbers).** A daily return with mean 0 and SD 1%. Chebyshev guarantees $\mathbb P(|R|\ge3\%)\le1/9\approx11\%$ for any distribution. If returns were normal the figure would be about 0.27%. The gap is the price of assuming nothing about tails; it is why distribution-free risk limits look conservative, and why fat-tailed data can sit much closer to the Chebyshev bound than to the normal figure.

## Averages concentrate when their variance vanishes

For IID $X_i$ with mean μ and variance $\sigma^2<\infty$, Lecture 4 gave $\mathrm{Var}(\bar X_n)=\sigma^2/n$. Apply Chebyshev to $\bar X_n$ (its mean is μ):

$$
\mathbb P(|\bar X_n-\mu|\ge\varepsilon)\le\frac{\mathrm{Var}(\bar X_n)}{\varepsilon^2}=\frac{\sigma^2}{n\varepsilon^2}\ \longrightarrow\ 0
$$

This is a proof of a weak law of large numbers under finite variance (stated formally in Lecture 6).

**Activity 5.1.** IID with variance 16. Smallest n for which Chebyshev guarantees $\mathbb P(|\bar X_n-\mu|\ge0.5)\le0.10$? (Options: 64, 160 or 640.)

1. $\mathbb P(|\bar X_n-\mu|\ge0.5)\le\dfrac{16}{n(0.5)^2}=\dfrac{64}{n}$.
2. Require $64/n\le0.10$ ⇒ $n\ge640$.
3. Does the bound give the actual probability? No. It is a guarantee valid for every distribution with variance 16; the true probability is usually much smaller. If the data were normal, $\bar X_{640}$ has SD $4/\sqrt{640}\approx0.158$, so the true probability is about $\mathbb P(|Z|\ge3.16)\approx0.0016$.

## Convergence in probability

$$
X_n\xrightarrow{p}X\quad\text{if}\quad \mathbb P(|X_n-X|>\varepsilon)\longrightarrow0\ \ \text{for every }\varepsilon>0
$$

- **Order of quantifiers:** fix the tolerance ε first, then let n grow. For every fixed positive tolerance, the probability of exceeding it must tend to zero.
- The limit X may be random or a constant; in estimation it is usually a constant θ.

## Consistency

The estimand θ is the quantity of interest. An estimator $T_n$ of θ is consistent if

$$
T_n\xrightarrow{p}\theta
$$

- It is a property of the estimator under a sequence of sampling models.
- **What it does not say:** no rate, no small-sample guarantee, and no protection if the model or sampling assumptions fail (misspecification, selection).

**Self-study recap: a small bias can coexist with consistency.** $T_n=\bar X_n+1/n$ with IID finite-variance data.

1. $\mathbb E[T_n]=\mu+1/n\ne\mu$: biased at every n.
2. $\bar X_n\xrightarrow{p}\mu$ (previous section) and $1/n\to0$, so $T_n\xrightarrow{p}\mu$: but consistent.

Consistency is about the limiting error, not exact unbiasedness at each n.

## Convergence in distribution

$$
X_n\xrightarrow{d}X\quad\text{if}\quad F_{X_n}(x)\to F_X(x)\ \text{at every continuity point } x \text{ of } F_X
$$

The CDFs become the same.

**Why only continuity points?** Take the constants $X_n=1/n$ and $X=0$. Obviously $X_n\to0$ in every sense. But at the jump x = 0, $F_{X_n}(0)=\mathbb P(1/n\le0)=0$ for every n, while $F_X(0)=1$. Demanding convergence at x = 0 would wrongly reject a sequence that clearly converges. At every other x the CDFs do converge, so excluding the jump points gives the right answer.

> Note that this sequence does converge in distribution to 0: x = 0 is a discontinuity point of $F_X$, so it is excluded from the check. The example justifies the "continuity points" clause; it does not show failure.

## Same distribution, different random variable

**Activity 5.2.** $U\sim\text{Uniform}(0,1)$ and $X_n=1-U$ for every n. Does $X_n\to U$ in distribution, in probability, both or neither?

1. **Distribution.** $1-U$ is also Uniform(0, 1) (reflecting the interval). So $F_{X_n}=F_U$ for all n and $X_n\xrightarrow{d}U$ trivially.
2. **Probability.** $|X_n-U|=|1-2U|$, which does not depend on n:

   $$
   \mathbb P(|1-2U|>\tfrac12)=\mathbb P(U<\tfrac14\ \text{or}\ U>\tfrac34)=\tfrac12\ \not\to0
   $$

   So $X_n\not\xrightarrow{p}U$: the variables never get close.

> Note that $X_n$ is not equal to U (it is 1 − U, which is far from U whenever U is near 0 or 1). What is true is that $X_n$ and U have the same distribution. That gap between "same law" and "same variable" is the whole point of the activity.

**Second example (slide).** Every $X_n\sim\text{Bernoulli}(1/2)$ and $X\sim\text{Bernoulli}(1/2)$ independent of them. Then $X_n\xrightarrow{d}X$, but $\mathbb P(|X_n-X|>1/2)=\mathbb P(X_n\ne X)=1/2$ for every n, no matter how large, so no convergence in probability (which would need this to tend to 0).

Convergence in distribution need not mean the variables are close. It compares laws; the variables need not even live on the same probability space.

## Probability convergence implies distribution convergence

$$
X_n\xrightarrow{p}X\ \Longrightarrow\ X_n\xrightarrow{d}X
$$

- But $X_n\xrightarrow{d}X\not\Rightarrow X_n\xrightarrow{p}X$ (Activity 5.2 is the counterexample).
- **Exception: a constant limit.** $X_n\xrightarrow{d}c\iff X_n\xrightarrow{p}c$. Reason: the limit CDF is a single step at c, so convergence of $F_{X_n}$ at every $x\ne c$ forces $\mathbb P(X_n\le c-\varepsilon)\to0$ and $\mathbb P(X_n\le c+\varepsilon)\to1$, which is exactly $\mathbb P(|X_n-c|>\varepsilon)\to0$. This is the version used for consistency.

## Almost-sure convergence

$$
X_n\xrightarrow{a.s.}X\quad\text{if}\quad\mathbb P\big(\{\omega: X_n(\omega)\to X(\omega)\}\big)=1
$$

- The probability that the realised sequence of $X_n$'s converges to X is one.
- The limit is taken outcome by outcome: fix ω, look at the ordinary sequence of numbers $X_1(\omega),X_2(\omega),\dots$, and ask whether it converges. Exceptional outcomes may exist, but together they have probability zero.
- $X_n\xrightarrow{a.s.}X\Rightarrow X_n\xrightarrow{p}X$. Not used much in this course.

## The implication diagram has one direction

$$
X_n\xrightarrow{a.s.}X\ \Longrightarrow\ X_n\xrightarrow{p}X\ \Longrightarrow\ X_n\xrightarrow{d}X
$$

- **d does not imply p:** Activity 5.2.
- **p does not imply a.s.:** independent $X_n\sim\text{Bernoulli}(1/n)$, n ≥ 2. Then $\mathbb P(|X_n|>1/2)=1/n\to0$, so $X_n\xrightarrow{p}0$. But $X_n=1$ infinitely often with probability one, so no almost-sure convergence. This is the second Borel-Cantelli lemma: independence plus $\sum1/n=\infty$ forces infinitely many 1s. Not examinable.
- **Interpretation:** for most elementary inference, convergence in probability supports consistency, while convergence in distribution supplies approximate sampling distributions.

## Which modes hold for Z/n?

**Activity 5.3.** Z is a real-valued random variable and $X_n=Z/n$. Which modes of convergence to 0 hold?

1. Follow one outcome ω: $Z(\omega)$ is a fixed finite number, so $X_n(\omega)=Z(\omega)/n\to0$ as an ordinary sequence.
2. This holds for every outcome with finite $Z(\omega)$, which is an event of probability one. So $X_n\xrightarrow{a.s.}0$.
3. The strongest mode gives the weaker ones: $X_n\xrightarrow{p}0$ and $X_n\xrightarrow{d}0$.

> Note that $Z/n\to0$ with probability one, and that Z is a single random variable, not a sequence $Z_n$.

No moment condition was needed: Z need not have a mean.

## Large samples do not repair wrong targets or assumptions

Large n does not guarantee accurate estimation. It does not repair:

- a sample drawn from the wrong population;
- persistent dependence that prevents averaging (Lecture 4, Activity 4.3);
- an estimator converging to a value other than the estimand;
- a limiting theorem used without its moment or regularity conditions.

Large-sample results still require the model assumptions to hold.

## Consistency does not require variance to vanish

Let $T_n=n$ with probability $n^{-2}$ and $T_n=0$ otherwise. The target is 0.

1. **Consistency.** For fixed ε > 0 and n > ε, $|T_n|>\varepsilon$ only when $T_n=n$: $\mathbb P(|T_n|>\varepsilon)=n^{-2}\to0$, so $T_n\xrightarrow{p}0$.
2. **Mean.** $\mathbb E[T_n]=n\cdot n^{-2}=n^{-1}$.
3. **Variance.** $\mathbb E[T_n^2]=n^2\cdot n^{-2}=1$, so $\mathrm{Var}(T_n)=1-n^{-2}\to1$.

- Rare large errors keep the variance from vanishing even though large errors become ever less likely.
- **Converse direction:** $\mathrm{Var}(T_n)\to0$ proves consistency only if the mean also approaches the target (bias → 0). Proof via Chebyshev applied around the mean plus the bias shrinking. So "bias → 0 and variance → 0" is sufficient, not necessary.

## Summary

- Markov and Chebyshev turn moments into probability bounds.
- Vanishing variance plus a mean approaching the target establish consistency.
- Consistency means convergence in probability to the estimand.
- Convergence in distribution means convergence of CDFs at continuity points of the limiting CDF.
- Almost sure ⇒ probability ⇒ distribution.
- Next: the LLN describes where sample averages go; the CLT describes the limiting distribution of their scaled errors.

## Traps

- Applying Markov to a variable that can be negative.
- Writing the Markov or Chebyshev event the wrong way round ($\le$ inside instead of $\ge$).
- Substituting $\varepsilon=k\sigma$ and getting threshold k instead of $k^2$.
- Reading a Chebyshev bound as the actual probability (Activity 5.1).
- Saying $X_n=U$ when only the distributions match (Activity 5.2).
- Concluding "no convergence in distribution" from failure at a jump point of $F_X$.
- Reversing an implication arrow (d ⇒ p is false unless the limit is a constant).
- Claiming a consistent estimator must have vanishing variance, or that vanishing variance alone gives consistency.
- Writing "with probability 0" for "with probability one".

## Self-check

1. X ≥ 0 with mean 5. Best distribution-free bound on $\mathbb P(X\ge20)$? *0.25 (Markov).*
2. Mean 100, SD 10. Lower bound on $\mathbb P(80<X<120)$? *k = 2, so at least 0.75.*
3. $X_n\sim\mathcal N(0,1/n)$. Does $X_n\xrightarrow{p}0$? *Yes; Chebyshev gives* $\mathbb P(|X_n|\ge\varepsilon)\le1/(n\varepsilon^2)\to0$.
4. $X_n=(-1)^nZ$ with $Z\sim\mathcal N(0,1)$. Converges in distribution? In probability? *In distribution to N(0, 1) (every* $X_n$ *is N(0, 1) by symmetry); not in probability, since consecutive terms differ by* $2|Z|$.
