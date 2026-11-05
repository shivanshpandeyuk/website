---
draft: false
title: "Lecture 9 - Point estimators and criteria"
paper: "ST460 Statistical Inference"
year: "M.S. Statistics (LSE)"
section: "Statistical inference"
description: "Loss and risk, the bias-variance identity, unbiasedness, risk of the sample proportion, shrinkage and the bias-variance trade-off, consistency, the method of moments and when it fails, and estimating equations."
order: 9
tags: [statistics, inference]
---

ST460, LSE, Autumn Term 2026, week 6.

## Cheat sheet

- **Estimator vs estimate:** $T=T(X)$ is a random variable (a rule fixed before the data); its realised value is a number. Bias, variance and risk are properties of the rule over repeated samples from $P_\theta$.
- **Losses:** squared $(\hat\theta-\theta)^2$, absolute $|\hat\theta-\theta|$, indicator $\mathbf 1\{|\hat\theta-\theta|>c\}$. Loss is a modelling choice, not given by the likelihood.
- **Risk:** $R(\theta,T)=\mathbb E_\theta\{L(\theta,T)\}$, a function of θ. Squared-error risk = MSE.
- **Bias-variance identity** ($\mathbb E_\theta T^2<\infty$): $\mathrm{MSE}_\theta(T)=\mathrm{Var}_\theta(T)+b_\theta(T)^2$, $b_\theta(T)=\mathbb E_\theta T-\theta$.
- **Activity 9.1:** MSE₁ = 0 + 9 = 9, MSE₂ = 1 + 4 = 5: the biased $T_2$ wins.
- **Unbiased estimators:** MSE = variance; prefer the smaller variance, but the ranking can depend on θ. Unbiasedness is an average over hypothetical samples.
- **Bernoulli:** $\hat p=\bar X$ unbiased, $R(p,\hat p)=p(1-p)/n\le1/(4n)$, maximum at p = 1/2.
- **Shrinkage** $T_c=c\hat p$, 0 < c < 1: bias $(c-1)p$, $\mathrm{MSE}=c^2p(1-p)/n+(c-1)^2p^2$; inconsistent unless p = 0.
- **Activity 9.2:** $\bar X\sim\mathcal N(\mu,4)$, $T=\bar X/2$: $\mathrm{MSE}(T)=1+\mu^2/4$ (2 at μ = 2, 5 at μ = 4), $\mathrm{MSE}(\bar X)=4$. Neither dominates; crossover at $|\mu|=2\sqrt3\approx3.46$.
- **Consistency:** $T_n\xrightarrow{p}\theta$, a large-n property; risk is an expectation at a fixed n. Neither implies the other.
- **Method of moments:** solve $m_j(\hat\theta)=\frac1n\sum_iX_i^j$, j = 1, …, k; check existence, uniqueness, parameter space.
- **Poisson:** $\hat\lambda_{MM}=\bar X$, unbiased, variance λ/n; an all-zero sample gives 0, outside (0, ∞).
- **Uniform(0, θ):** $m_1=\theta/2\Rightarrow\hat\theta=2\bar X$.
- **Activity 9.3:** exponential, $\mathbb E X=1/\lambda$, $\bar x=0.4\Rightarrow\hat\lambda=1/0.4=2.5$; consistency by LLN + continuous mapping.
- **Normal:** $\hat\mu=\bar X$, $\hat\sigma^2=\frac1n\sum(X_i-\bar X)^2$ (biased by $-\sigma^2/n$, consistent).
- **Estimating equation:** $\sum_i\psi(X_i,\theta)=0$ with $\mathbb E_\theta\psi(X_i,\theta)=0$; moments use $\psi=h(X)-\mathbb E_\theta h(X)$.

## An estimator is judged against a criterion

The same data can support many estimators of the same target. Saying one is "better" needs three ingredients: a **loss**, a **sampling model** and a **parameter space**.

$$
\text{estimator}+\text{criterion}+\text{model}\ \Longrightarrow\ \text{performance statement}
$$

- "Best" is always shorthand for best **under specified assumptions** and a **specified criterion**.

## An estimator is a rule applied before seeing the sample

For data $X=(X_1,\dots,X_n)$ from $P_\theta$, an **estimator** is a statistic $T=T(X)$ used to estimate an estimand g(θ). Its realised value is an **estimate**.

- Three objects: g(θ) is fixed and unknown; the estimator T(X) is random; the estimate T(x) is the known number obtained after observing x.
- Sampling distribution, bias and risk are properties of the **rule** under repeated samples from $P_\theta$. **Do not confuse the random estimator with the number obtained after observing data.**

> Note that $P_\theta$ is a distribution, not a random variable: X is the random variable and $P_\theta$ its law.

## Loss measures the consequence of an estimation error

A loss $L(\theta,\hat\theta)$ is the cost of reporting $\hat\theta$ when the truth is θ. With tolerance c > 0, squared error, absolute error and indicator loss:

$$
L(\theta,\hat\theta)=(\hat\theta-\theta)^2,\qquad L(\theta,\hat\theta)=|\hat\theta-\theta|,\qquad L(\theta,\hat\theta)=\mathbf 1\{|\hat\theta-\theta|>c\}.
$$

- Different losses can rank the same estimators differently. Loss is part of the inferential problem; the likelihood does not determine it.

> **Choosing a loss.** Squared error punishes one large miss more than several small ones, so it suits a forecast feeding a DCF where a big error compounds. Indicator loss suits a covenant test: all that matters is whether you land within c of the threshold. Same estimators, different winners.

## Risk averages loss over repeated samples

$$
R(\theta,T)=\mathbb E_\theta\{L(\theta,T)\}.
$$

- Risk is the average, or expected, loss of the estimator. T(X) is random, the expectation integrates X out, and what is left depends only on θ.
- Risk is a **function** of the unknown θ, not usually one number. Under squared-error loss, $R(\theta,T)=\mathbb E_\theta[(T-\theta)^2]=\mathrm{MSE}_\theta(T)$.
- **Estimator comparisons may change across the parameter space** (the shrinkage section below shows this concretely).

## The bias-variance identity

Where does squared error come from? Split the error into a random part (T around its own mean) and a fixed part (its mean around the truth).

$$
\mathrm{MSE}_\theta(T)=\mathbb E_\theta[(T-\theta)^2]=\mathrm{Var}_\theta(T)+b_\theta(T)^2,\qquad b_\theta(T)=\mathbb E_\theta[T]-\theta,
$$

valid whenever $\mathbb E_\theta[T^2]<\infty$. This derivation is in the exam scope.

**Derivation.**

1. Add and subtract the mean: the deviation of T from its mean (random) plus the bias (fixed).

$$
T-\theta=\{T-\mathbb E_\theta T\}+\{\mathbb E_\theta T-\theta\}=\{T-\mathbb E_\theta T\}+b_\theta.
$$

2. Square and take expectations; $b_\theta$ comes out of the expectation because it is a constant.

$$
\mathbb E_\theta[(T-\theta)^2]=\mathbb E_\theta[(T-\mathbb E_\theta T)^2]+2b_\theta\,\mathbb E_\theta[T-\mathbb E_\theta T]+b_\theta^2.
$$

3. The cross term is zero, since $\mathbb E_\theta[T-\mathbb E_\theta T]=0$.
4. The first term is $\mathrm{Var}_\theta(T)$ by definition, giving $\mathrm{MSE}=\mathrm{Var}+\text{bias}^2$.

- This is the variance-bias trade-off in minimising MSE. **A small bias can reduce MSE if the reduction in variance exceeds the added squared bias.**

### Activity 9.1: compare two squared-error risks

At a fixed θ, $T_1$ has bias 0 and variance 9; $T_2$ has bias 1 and variance 4. Which has smaller MSE? What does unbiasedness alone not guarantee?

1. $\mathrm{MSE}(T_1)=9+0^2=9$.
2. $\mathrm{MSE}(T_2)=4+1^2=5$.
3. **Answer:** $T_2$, despite its bias. Unbiasedness does not guarantee small error: an unbiased estimator can have a variance so large that a slightly biased one is closer to θ on average.

- This compares at **one** θ. A full comparison needs the two risk functions across Θ.

## Unbiasedness alone does not determine precision

If $T_1,T_2$ are both unbiased for θ, then $\mathrm{MSE}_\theta(T_j)=\mathrm{Var}_\theta(T_j)$, so under squared-error loss prefer the lower variance. The comparison still depends on the model and may depend on θ.

- **Interpretation warning:** unbiasedness is **an average statement over hypothetical samples**. An estimator may be unbiased only on average; it does not mean the realised estimate is close to the target.

## Squared-error risk of the sample proportion

$X_i\overset{\text{iid}}{\sim}\text{Bernoulli}(p)$, $\hat p=\bar X$.

1. $\mathbb E_p[\hat p]=p$, so $\hat p$ is unbiased and the bias is 0.
2. $\mathrm{Var}_p(\hat p)=\mathrm{Var}(X_1)/n=p(1-p)/n$ (independence).
3. Bias-variance: $R(p,\hat p)=\mathbb E[(\hat p-p)^2]=0^2+p(1-p)/n$, so just the variance here.
4. Maximise over p ∈ [0, 1]: $p(1-p)$ is a downward parabola with vertex at p = 1/2, value 1/4, so

$$
R(p,\hat p)=\frac{p(1-p)}{n}\le\frac{1}{4n}.
$$

- The risk varies with p; it is smallest near the boundaries and largest at p = 1/2.

## Shrinkage exposes the bias-variance trade-off

For the shrinkage estimator $T_c=c\hat p$ with 0 < c < 1:

1. Bias: $\mathbb E[T_c]-p=cp-p=(c-1)p$, so shrinking introduces bias.
2. Variance: $c^2\,\mathrm{Var}(\hat p)=c^2p(1-p)/n$, so it reduces variance.
3. Hence

$$
\mathrm{MSE}_p(T_c)=c^2\frac{p(1-p)}{n}+(c-1)^2p^2.
$$

- Whether shrinkage improves MSE depends on p, n and c: it helps when p is small (little bias to pay) and n is small (lots of variance to save).
- For fixed c < 1, $T_c\xrightarrow{p}cp$, so it is **inconsistent** unless p = 0. Low risk at a given n and consistency are different properties.

### Activity 9.2: when does shrinking help?

$\bar X\sim\mathcal N(\mu,4)$ and $T=\bar X/2$. Compare MSEs at μ = 2 and μ = 4. Does either have smaller MSE at both?

1. **Laws.** $T\sim\mathcal N(\mu/2,\,4/4)=\mathcal N(\mu/2,1)$.
2. **Sample mean.** Unbiased, so $\mathrm{MSE}(\bar X)=4+0=4$ at every μ.
3. **Shrunk estimator.** Bias $=\mathbb E[T]-\mu=\mu/2-\mu=-\mu/2$, so

$$
\mathrm{MSE}(T)=1+\frac{\mu^2}{4}.
$$

4. **μ = 2:** $\mathrm{MSE}(T)=1+1=2<4$. T wins.
5. **μ = 4:** $\mathrm{MSE}(T)=1+4=5>4$. $\bar X$ wins.
6. **Answer:** neither estimator has smaller MSE at both values. The ranking flips at $1+\mu^2/4=4$, i.e. $|\mu|=2\sqrt3\approx3.46$.

> Note that the bias of T is $-\mu/2$, not $\mu/2$: $\mu/2$ is $\mathbb E[T]$. The squared bias $\mu^2/4$ is the same either way, but the sign matters as soon as biases are added or the direction of error is reported. And stopping at μ = 2 would suggest T is simply better; at μ = 4 it is worse. Risk rankings depend on the parameter.

> **Shrinkage in practice.** Adjusted betas pull a regression beta towards 1; the adjustment commonly quoted by data vendors is $0.67\hat\beta+0.33$. Same trade: add bias towards a prior centre, cut variance. It helps when the true beta is near 1 and hurts for a genuine outlier, exactly the μ = 2 versus μ = 4 split above.

## Consistency is a limiting property, not a complete ranking

$$
T_n\text{ consistent for }\theta\iff T_n\xrightarrow{p}\theta.
$$

- That is, P(|error| > ε) → 0 as n → ∞, for any fixed ε.
- Two consistent estimators can have very different finite-sample bias, variance or tails; a low-risk estimator at one n need not be consistent (shrinkage, above).
- **Consistency** asks whether the probability of exceeding any fixed error tolerance tends to zero; **risk** measures expected loss at a specified, finite sample size.

## Method of moments

If the model says the population mean should be m₁(θ), and the sample says $\bar X$, choose θ to make them agree. With k unknowns, match k moments.

$$
m_j(\theta)=\mathbb E_\theta[X^j],\qquad m_j(\hat\theta)=\frac1n\sum_{i=1}^nX_i^j,\quad j=1,\dots,k,
$$

assuming $\theta\in\mathbb R^k$ and the first k moments are finite.

- **Check that a solution exists, is unique and lies in the parameter space.**

**Poisson mean.** $X_i\overset{\text{iid}}{\sim}\text{Poisson}(\lambda)$, $\mathbb E_\lambda X_i=\lambda$, so $\hat\lambda_{MM}=\bar X=\frac1n\sum_iX_i$.

- LLN ⇒ $\bar X\xrightarrow{p}\lambda$: consistent. Unbiased, variance λ/n.
- If Θ = (0, ∞) excludes 0, an **all-zero sample** gives $\hat\lambda=0$, outside the space: the moment equation has no solution in Θ, so the MM estimator does not always work.
- How likely: $\mathbb P(\text{all zero})=e^{-n\lambda}$; for n = 10, λ = 0.1 that is $e^{-1}\approx0.37$. Not a curiosity for rare events.

**Uniform endpoint.** $X_i\overset{\text{iid}}{\sim}U[0,\theta]$.

1. First moment: $m_1(\theta)=\mathbb E_\theta X=\int_0^\theta x\cdot\frac1\theta\,dx=\frac\theta2$.
2. Match: $m_1(\hat\theta)=\hat\theta/2=\bar X$.
3. Solve: $\hat\theta_{MM}=2\bar X$, the MM estimator for θ.

- Unbiased ($\mathbb E[2\bar X]=\theta$) with variance $4\cdot\frac{\theta^2}{12n}=\frac{\theta^2}{3n}$, using Var U[0, θ] = θ²/12.

> **A parameter-space failure you can see.** Sample (1, 1, 7): $\bar x=3$, $\hat\theta_{MM}=6$, yet one observation is 7 > 6. The estimate is logically impossible: the data prove θ ≥ 7. Method of moments ignores the support restriction; the maximum, which L10 shows is sufficient, does not.

### Activity 9.3: estimate a lifetime rate by moments

IID exponential lifetimes with rate λ > 0, $\mathbb E X=1/\lambda$, observed $\bar x=0.4$. Moment estimate of λ, and which convergence result justifies consistency?

1. Match: $m_1(\hat\lambda)=1/\hat\lambda=\bar x$.
2. Solve: $\hat\lambda_{MM}=1/\bar x=1/0.4=2.5$.
3. **Consistency.** LLN: $\bar X\xrightarrow{p}1/\lambda$. Continuous mapping (L7) with g(t) = 1/t, continuous at 1/λ > 0: $1/\bar X\xrightarrow{p}\lambda$.

> Note that reporting $\hat\lambda=\bar x=0.4$ is the sample mean, not the rate: the model moment is $m_1(\lambda)=1/\lambda$, not λ, so a mean lifetime of 0.4 means 2.5 failures per unit time. And the LLN alone gives consistency of $\bar X$ for 1/λ; continuous mapping is also needed to transfer it to $1/\bar X$.

**Two normal moments identify two parameters.** $X_i\overset{\text{iid}}{\sim}\mathcal N(\mu,\sigma^2)$: $\mathbb E X=\mu$, $\mathbb E X^2=\mu^2+\sigma^2$.

1. First moment: $\hat\mu=\bar X$.
2. Second moment: $\hat\mu^2+\hat\sigma^2=\frac1n\sum X_i^2$.
3. Subtract: $\hat\sigma^2=\frac1n\sum X_i^2-\bar X^2=\frac1n\sum(X_i-\bar X)^2$.

- Denominator n, so biased: $\mathbb E\hat\sigma^2=\frac{n-1}{n}\sigma^2$, bias $-\sigma^2/n$; consistent since the bias vanishes and the LLN applies.

> Note the two different objects: $\overline{X^2}=\frac1n\sum X_i^2$ (mean of squares) and $\bar X^2=(\frac1n\sum X_i)^2$ (square of the mean). Written the same way, $\hat\sigma^2=\overline{X^2}-\bar X^2$ reads as zero. The identity behind the second moment is $\mathbb E X^2=\mathrm{Var}X+(\mathbb EX)^2$.

## Estimating equations generalise moment matching

$$
\sum_{i=1}^n\psi(X_i,\theta)=0.
$$

- If $\mathbb E_\theta[\psi(X_i,\theta)]=0$ and regularity conditions hold, a solution can be consistent and asymptotically normal.
- **Moment estimators** in general use $\psi(X,\theta)=h(X)-\mathbb E_\theta[h(X)]$. Poisson: h(x) = x, $\psi=x-\lambda$.
- Later, likelihood scores and regression normal equations appear as particular estimating equations (L8's normal equations already are).

## When moment methods fail

- The required population moment may not exist (e.g. Cauchy has no mean).
- The equations may have several solutions or none.
- A solution may fall outside the parameter space (Poisson all-zero; uniform 1, 1, 7).
- A high-order sample moment may be extremely unstable.

If distinct parameter values have the same model moments, matching cannot distinguish them even with large n (an identifiability failure, L8).

## Summary

- Loss states how errors are valued; risk averages loss over samples and is a function of θ.
- MSE = variance + squared bias.
- Unbiasedness and consistency answer different questions from risk.
- Method of moments supplies estimators but not automatic optimality.
- Support, identification and moment existence remain essential.
- Next (L10): sufficiency asks which part of the sample retains all model-based information about the parameter.

## Traps

- Confusing the estimator T(X) (random), the estimate T(x) (number) and the estimand g(θ) (fixed, unknown).
- Comparing estimators at one θ and declaring a winner; risk is a function (Activity 9.2).
- Writing $\mathbb E[T]$ where the bias $\mathbb E[T]-\theta$ is meant.
- In method of moments, setting the parameter equal to the sample moment instead of the model moment: $\hat\lambda=\bar x$ for an exponential.
- Writing $\overline{X^2}$ and $\bar X^2$ the same way.
- Assuming unbiased ⇒ close to θ, or consistent ⇒ low risk at your n.
- Forgetting to check that a moment solution lies in Θ (all-zero Poisson sample; uniform with max above $2\bar x$).
- Citing only the LLN for consistency of a transformed moment estimator; continuous mapping is also needed.

## Self-check

1. $X_i\overset{\text{iid}}{\sim}\text{Bernoulli}(p)$, n = 25. Maximum risk of $\hat p$? *1/(4 × 25) = 0.01.*
2. In the shrinkage example, with n = 10, p = 0.1, c = 0.5, is $T_c$ better than $\hat p$? *MSE($\hat p$) = 0.009; MSE($T_c$) = 0.25 × 0.009 + 0.25 × 0.01 = 0.00475. Yes.*
3. $X_i\overset{\text{iid}}{\sim}$ Geometric on {1, 2, …} with mean 1/p. Method-of-moments estimator of p? *$1/\bar X$.*
4. Sample from U[0, θ]: (2, 3, 10). Method-of-moments estimate, and is it admissible as a value of θ? *2 × 5 = 10; just admissible (θ ≥ 10 required), on the boundary.*
