---
title: "Lecture 8 - Samples and sampling distributions."
paper: "Paper 3 — Quantitative Methods"
year: "Year 1 (Part I)"
section: "Statistics"
description: "Lecture 8 - Samples and sampling distributions. Notes from the first-year Economics Tripos."
order: 8
tags: ["economics"]
draft: false
---

Slide extracts: University of Cambridge, Part I Paper 3 (Quantitative Methods), Statistics. Worked examples and numerical values in the slide extracts are reported from the course material [R]. Handwritten derivations are the author's own.

1. A sample (of size n) is a collection of random variables (say X_1, X_2,... , X_n) from the population. If the random variables constituting the sample are independently and identically distributed (abbreviated IID), then the sample is said to be **random**.

2. An observation is the known value that each collected random variable assumes (say X 1 = x 1, X 2 = x 2, . . . , X n = x n)

3. A statistic is a function of the sample (say θˆ = θˆ ( X 1, X 2, . . . , X n )). **Therefore, a statistic is itself a random variable.**

This is important, it means that statistics (such as the mean and variance (the sample ones, not the actual ones)) are random variables with moments too
![Lecture slide: useful statistics already met — the sample mean X̄ₙ = Σᵢ Xᵢ / n and the sample variance Σᵢ (Xᵢ − X̄)² / n; because sample statistics are themselves random variables they have a sampling distribution.](../../assets/notes/year1/b629f824481ef3e5418f.png)

Consider the distribution of the sample mean:
![Lecture slide: the mean and variance of the sample mean — in fact X̄ₙ ~ N(µ, σ²/n).](../../assets/notes/year1/a42c0cb822208b03e564.png)
This is calculated from using the definitions of expectaiton and variance. Crucially it requires the assumption of *independence* to hold:
![Lecture slide: using the rules for expectation and variance of sums of independent random variables, E(X̄ₙ) = (1/n) Σᵢ E(Xᵢ) = µ and Var(X̄ₙ) = (1/n²) Σᵢ Var(Xᵢ) = σ²/n.](../../assets/notes/year1/d0e68f9db011698bd7c3.png)
![Lecture slide: intuition for the sampling distribution — take n observations from N(µ, σ²), compute the average, repeat infinitely often; the distribution of all those X̄ₙ is N(µ, σ²/n).](../../assets/notes/year1/98f08ab29ec4ef7a0762.png)

**Estimation and inference**
Statistical inference can be classified into point estimation and interval estimation: in the former case we are interested in assigning a value to an unknown parameter; in the latter case we define an interval within which we have some confidence that the true value of the unknown parameter falls.

Suppose we know (or are prepared to assume as a model) that the random variables X i satisfy E ( X i ) = µ and we are interested in producing an estimate of the parameter µ. Now we know that E ( X¯ n) = µ

**Method of moments estimation, analog estimator (i.e. subbing in the sample value (an observed quantity) for the population moment (a random variable)).**
![Lecture slide: method of moments (analog) estimator — substitute unknown population moments by their sample counterparts, so µ̂ₙ = (1/n) Σᵢ Xᵢ replaces E(X̄ₙ); asymptotic theory studies µ̂ₙ as n → ∞.](../../assets/notes/year1/9059615393eaf51c6683.png)

**method of least squares estimation**
![Lecture slide: least squares set-up — write the data as Xᵢ = µ + εᵢ with IID εᵢ, E(εᵢ) = 0; the variability of the εᵢ is measured by S(µ) = Σᵢ εᵢ² = Σᵢ (Xᵢ − µ)², which given the data depends only on µ.](../../assets/notes/year1/e083423926fe803250a7.png)
E is deviation from mean, the variability is measured by summing squares (resolves negative problem). Then we aim to minimize the sum of the error squares below:
![Lecture slide: the least squares estimator µ̂ₙ = arg min over µ of S(µ) = arg min Σᵢ (Xᵢ − µ)²; to find it, differentiate S(µ) with respect to µ and set to zero, giving dS(µ)/dµ = −2 Σᵢ (Xᵢ − µ).](../../assets/notes/year1/02c835e7296d496b9ec4.png)
The **quantity that minimizes the distance to the random variable u** is the **estimator** for u. We can calculate it from calculus and set it to zero:
![Lecture slide: setting the derivative to zero gives Σᵢ (Xᵢ − µ̂ₙ) = 0, so the least squares estimator is µ̂ₙ = (1/n) Σᵢ Xᵢ — the same as the method of moments estimator in this simple case.](../../assets/notes/year1/32611a9ae4a553117279.png)

Some convenient tips:
1. Can take a montone transformation of S(u) and finding the value of u that minimizes the transformed function can be easier.
2. Different choices of the objective function i.e. S(u) are possible e.g. instead of summing squares could simply sum the absolute values. This would give a different estimator.

**Interval Estimation**
![Lecture slide: interval estimation — confidence intervals for population parameters need the sampling distribution of the estimator; here the data are a random sample from a normal distribution, so µ̂ₙ = (1/n) Σᵢ Xᵢ ~ N(µ, σ²/n).](../../assets/notes/year1/745c36f8b916b87d5986.png)
Transforming back to the z-normal distribution i.e. the pivotal quantity:
![Lecture slide: manipulating expectations and variances gives √n (µ̂ₙ − µ) / σ ~ N(0, 1).](../../assets/notes/year1/9a6c341e54a896f3b6da.png)
The expression on the left depends on things we know µˆ n, and things we do not µ, σ. But the expression on the right is completely specified. We call a function of the data and unknown parameters whose distribution is known a pivotal quantity.

This is similar to the standardisation of a normal variable, but this time we are accounting for the fact that we are using an estimate of the mean from a sample of size n. Hence not x-u over sigma. But sqrtn (uest - u) over sigma.
![Lecture slide: since 95% of an N(0, 1) mass lies in [−1.96, 1.96], a 95% interval for √n(µ̂ₙ − µ)/σ is [−1.96, 1.96], hence a 95% confidence interval for the population mean is µ ∈ [µ̂ₙ − 1.96 σ/√n, µ̂ₙ + 1.96 σ/√n].](../../assets/notes/year1/adb21633a161cc2d6ef2.png)

NOTE: As n->infinity, the estimate tends to u

And note that in order to calculate this confidence interval we have assumed

- Random (i.e. independent) sampling
- The data are generated as N(µ, σ^2)
- We know σ

If we don't know sigma, then we can use the t-distribution. If we don't have a normal variable we can take a large enough sample such that it can be approximated by a normal distribution. If we don't have random sampling then there is a fundamental of the problem.
