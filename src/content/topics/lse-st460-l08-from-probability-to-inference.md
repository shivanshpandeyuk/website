---
draft: false
title: "Lecture 8 - From probability to inference"
paper: "ST460 Statistical Inference"
year: "M.S. Statistics (LSE)"
section: "Statistical inference"
description: "Statistical models, estimands and nuisance parameters, the likelihood, identifiability, the conditional normal regression model and its likelihood, and the design assumptions behind descriptive, predictive and causal readings."
order: 8
tags: [statistics, inference]
---

ST460, LSE, Autumn Term 2026, week 4.

## Cheat sheet

- **Inference reverses probability:** model → data (probability); observed data → information about an estimand (inference). Meaningful only once target and assumptions are explicit.
- **Statistical model:** a family $\mathcal P=\{P_\theta:\theta\in\Theta\}$; parametric if Θ is finite-dimensional. Correct specification: data follow $P_{\theta_0}$ for some unknown $\theta_0\in\Theta$.
- **Estimand:** $\psi(\theta)$, the quantity we want; **nuisance parameter:** a component outside the target. Nuisance ≠ unimportant (σ drives $\mathrm{SE}(\bar X)=\sigma/\sqrt n$).
- **Likelihood:** $L(\theta;\boldsymbol y)=f_\theta^{(n)}(\boldsymbol y)$ as a function of θ with y fixed; IID ⇒ $\prod_i f_\theta(y_i)$. Not a distribution over θ.
- **Bernoulli:** $L(p;\boldsymbol y)=p^s(1-p)^{n-s}$, $s=\sum y_i$; depends on the data only through s.
- **Activity 8.1:** y = (1, 0, 1): $L(0.75)/L(0.50)=0.140625/0.125=1.125$. Data fit p = 0.75 slightly better; says nothing about $\mathbb P(p=0.75)$.
- **Identifiable:** $P_{\theta_1}=P_{\theta_2}\Rightarrow\theta_1=\theta_2$; target identifiable: $P_{\theta_1}=P_{\theta_2}\Rightarrow\psi(\theta_1)=\psi(\theta_2)$.
- **Activity 8.3:** Poisson(α + β): α + β and $\mathbb P(Y=0)=e^{-(\alpha+\beta)}$ identifiable; α/(α + β) not ((1, 3) gives 1/4, (2, 2) gives 1/2, same law).
- **Product:** N(αβ, 1): η = αβ identifiable, α and β separately not.
- **Regression model:** $Y_i\mid\boldsymbol X=\boldsymbol x\sim\mathcal N(\alpha+\beta x_i,\sigma^2)$ independently; β = difference in conditional means one unit of x apart.
- **Normal log-likelihood:** $\ell=-\frac n2\log(2\pi\sigma^2)-\frac1{2\sigma^2}\sum(y_i-\alpha-\beta x_i)^2$; for fixed σ², maximising ℓ ⇔ minimising RSS.
- **Centred design x = (−1, 0, 1):** $3\hat\alpha=y_1+y_2+y_3$, $2\hat\beta=y_3-y_1$. **Activity 8.2:** y = (2, 1, 6) ⇒ $\hat\alpha=3$, $\hat\beta=2$.
- **Causal reading** of β needs design (randomisation) or causal assumptions; **robust SEs** fix unequal variances, not selection bias or confounding.

## Inference reverses the direction of a probability model

**Probability:** start with a model and ask what data may occur, model → distribution of data. **Inference:** observe data and reason about an unknown target, observed data → information about an estimand.

- The reverse problem is meaningful **only after the target and assumptions are explicit**.
- This is the move from probability theory to statistical inference. L1 to L7 built the probability toolkit (laws, LLN, CLT, delta method); from here it is used to learn about θ.

## Start with how the observations came to exist

target population → sampling → measurement → observed data. For experiments also record how treatments were assigned.

- Sampling can introduce selection and dependence; measurement can introduce error; missingness can enter at several stages.
- The probability model should reflect how the data were obtained and the assumptions made about that process.

## A statistical model is a family of distributions

$$
\mathcal P=\{P_\theta:\theta\in\Theta\}
$$

- 𝒫 is the statistical model, $P_\theta$ the distribution indexed by θ, and Θ, the range of inputs, is the **parameter space**.
- **Parametric model:** θ finite-dimensional. Correctly specified ⇒ the data follow $P_{\theta_0}$ for some unknown $\theta_0\in\Theta$.
- Examples for one observation: {Bernoulli(p): 0 ≤ p ≤ 1}, all Bernoulli distributions with p ∈ [0, 1], and {N(μ, σ²): μ ∈ ℝ, σ > 0}, all univariate normal distributions.
- For a sample, also specify the **dependence structure**, e.g. IID.

## Model parameters versus estimands

A **model parameter** θ indexes the distributions. An **estimand** is the quantity we want to learn, the target, written ψ(θ): a component, or a function of several components.

- **Example.** Y ∼ N(μ, σ²), θ = (μ, σ²). Estimating the mean: estimand μ, nuisance σ². Estimating the variance: estimand σ², nuisance μ.
- **"Nuisance" means outside the target of interest; it does not mean unimportant.**

**One Bernoulli model, several estimands.** $Y_1,\dots,Y_n\overset{\text{iid}}{\sim}\text{Bernoulli}(p)$, 0 < p < 1:

- success probability $\psi_1(p)=p$;
- odds $\psi_2(p)=p/(1-p)$;
- probability of at least 10 successes in 20 future independent trials, $\psi_3(p)=\mathbb P_p(S_{20}\ge10)$, $S_{20}\sim\text{Bin}(20,p)$.

Same model, different targets; how we estimate and report uncertainty depends on the target (L7's delta method converts the SE of $\hat p$ into SEs for $\psi_2$ and $\psi_3$).

> **Same idea in coverage work.** One model of a company's monthly churn rate p supports several estimands: p itself, expected customer lifetime 1/p, or the probability net retention falls below a threshold next year. Each needs its own SE; 1/p in particular inherits a much wider interval when p is small (delta method: $|g'(p)|=1/p^2$).

## Likelihood: vary the parameter, hold the data fixed

For observed data $\boldsymbol y=(y_1,\dots,y_n)$ with joint density or PMF $f_\theta^{(n)}$:

$$
L(\theta;\boldsymbol y)=f_\theta^{(n)}(\boldsymbol y)\ \text{ viewed as a function of }\theta,\qquad \text{IID: } L(\theta;\boldsymbol y)=\prod_{i=1}^nf_\theta(y_i).
$$

- Likelihood and density are not the same. The likelihood is a function of θ with a fixed, particular y; the density is a function of y, so y is not fixed. Under IID the product form is immediate.
- **Likelihood compares how well parameter values explain the observed data. It is not a probability distribution over the parameter** (it need not integrate to 1 over θ).

**Bernoulli likelihood.**

1. Probability mass function for one observation: $\mathbb P(Y=y)=p^y(1-p)^{1-y}$, y ∈ {0, 1}.
2. The likelihood of p is the joint probability of the observed sequence:

$$
L(p;y_1,\dots,y_n)=\mathbb P(Y_1=y_1,\dots,Y_n=y_n)\overset{\text{iid}}{=}\prod_{i=1}^np^{y_i}(1-p)^{1-y_i}.
$$

3. Collect exponents:

$$
L(p;\boldsymbol y)=p^{\sum y_i}(1-p)^{\,n-\sum y_i}=p^s(1-p)^{n-s}.
$$

- The likelihood says how probable the observed data are **if** the success rate were p.
- For fixed n, L depends on the data only through s. **Under the IID Bernoulli model, the ordering adds no information about p once s is known.** (This is sufficiency, L10.)

### Activity 8.1: compare the likelihood at two values

Ordered IID sample y = (1, 0, 1), so $L(p;\boldsymbol y)=p^2(1-p)$. Compute $L(0.75)/L(0.50)$; does it give the probability that p = 0.75?

1. $L(0.75)=0.75^2\times0.25=0.140625$.
2. $L(0.50)=0.5^2\times0.5=0.125$.
3. Ratio $=0.140625/0.125=9/8=1.125$.
4. **Interpretation.** The observed data are 1.125 times as probable under p = 0.75 as under p = 0.50: p = 0.75 is a slightly better explanation of the observed data.
5. **No.** It is a ratio of probabilities of the **data** under two hypotheses, not of probabilities of p. In the frequentist model p is a fixed unknown constant; a probability for "p = 0.75" needs a prior (L17).

> Note that a ratio of 1.125 means the likelihood is 12.5% higher, and the safe phrasing is "the data are 12.5% more probable under p = 0.75", not "p = 0.75 is more likely". Also, $p^2(1-p)$ is the probability of the **ordered** sequence (1, 0, 1); $\mathbb P(2\text{ successes in }3)=3p^2(1-p)$ (binomial). The factor 3 cancels in the ratio, so 1.125 is unaffected.

## Identifiability: can the data distribution distinguish parameters?

$$
\theta\text{ identifiable if }P_{\theta_1}=P_{\theta_2}\Rightarrow\theta_1=\theta_2;\qquad \psi(\theta)\text{ identifiable if }P_{\theta_1}=P_{\theta_2}\Rightarrow\psi(\theta_1)=\psi(\theta_2).
$$

- Two different parameter values must produce different data distributions; otherwise no amount of data can tell them apart.
- The observable law may determine a **target** without determining the whole parameter. Identifiability does not guarantee accurate estimation from a finite sample.

### Activity 8.3: which targets can a Poisson identify?

$Y_i\overset{\text{iid}}{\sim}\text{Poisson}(\alpha+\beta)$, α, β > 0. Targets α + β, α/(α + β), $\mathbb P(Y_i=0)$; compare (α, β) = (1, 3) and (2, 2).

1. Both pairs give λ = α + β = 4, so both give **the same law** Poisson(4).
2. **α + β:** identifiable. Equal laws ⇒ equal λ ⇒ equal α + β.
3. **α/(α + β):** not identifiable. (1, 3) gives 1/4, (2, 2) gives 2/4, yet the laws are identical.
4. **$\mathbb P(Y=0)=e^{-(\alpha+\beta)}$:** identifiable, as a function of λ alone. At λ = 4 it is $e^{-4}\approx0.0183$.

The data cannot distinguish pairs with the same sum, because λ = α + β.

**The data can identify a product without its factors.** Y ∼ N(αβ, 1), α, β ∈ ℝ: the law depends on (α, β) only through η = αβ. (1, 2), (2, 1) and (−1, −2) give the same distribution, so η is identifiable while α and β separately are not.

## Nuisance parameters still drive uncertainty

$X_1,\dots,X_n\overset{\text{iid}}{\sim}\mathcal N(\mu,\sigma^2)$, target μ, nuisance σ². But

$$
\mathrm{SE}(\bar X)=\frac{\sigma}{\sqrt n}.
$$

For inference (e.g. how close the sample mean is to the population mean) the answer depends on σ. Hence the need to estimate σ and studentise (L7, Slutsky).

## The running regression model

Conditional on the entire design X = x:

$$
Y_i=\alpha+\beta x_i+\varepsilon_i,\qquad(\varepsilon_1,\dots,\varepsilon_n)^\top\mid\boldsymbol X=\boldsymbol x\sim\mathcal N_n(\mathbf 0,\sigma^2I_n),
$$

equivalently $Y_i\mid\boldsymbol X=\boldsymbol x\sim\mathcal N(\alpha+\beta x_i,\sigma^2)$ independently. Parameter vector (α, β, σ²).

- Each $Y_i$ depends on $x_i$, so the $Y_i$ are independent but not identically distributed: same variance, different means.
- For random predictors, "errors IID" without conditioning on the predictors does **not** ensure this conditional model.

**Slope interpretation.** Under $\mathbb E[Y\mid X=x]=\alpha+\beta x$, $\mathbb E[Y\mid X=x+1]-\mathbb E[Y\mid X=x]=\beta$: β compares conditional means one predictor unit apart, within the range where the model applies.

- Identifying α and β separately needs at least two distinct design values; if every $x_i=x_0$, only $\alpha+\beta x_0$ is identifiable.
- Reading β as the effect of **changing** X needs design or causal assumptions (see the design section below).

## The regression likelihood makes its assumptions visible

1. Conditional density of one response:

$$
f_{Y\mid X=x}(y)=\frac{1}{\sigma\sqrt{2\pi}}\exp\Big\{-\frac{(y-\alpha-\beta x)^2}{2\sigma^2}\Big\}.
$$

2. Conditional independence ⇒ product over i:

$$
L(\alpha,\beta,\sigma^2;\boldsymbol y)=\prod_{i=1}^nf_{Y\mid X=x_i}(y_i)=\prod_{i=1}^n\frac{1}{\sigma\sqrt{2\pi}}\exp\Big\{-\frac{(y_i-\alpha-\beta x_i)^2}{2\sigma^2}\Big\}.
$$

3. Take logs:

$$
\ell=\log L=-\frac n2\log(2\pi\sigma^2)-\frac1{2\sigma^2}\sum_{i=1}^n(y_i-\alpha-\beta x_i)^2.
$$

4. For fixed σ² > 0 the first term is constant in (α, β), and the second is $-\frac{1}{2\sigma^2}\times$RSS, so **maximising ℓ ⇔ minimising the residual sum of squares**.

The likelihood encodes linear conditional means, common conditional variance, normal errors and conditional independence. Each assumption is visible in a factor of the formula.

## Fit the centred regression model

Design x = (−1, 0, 1), σ² > 0 fixed. Minimise

$$
Q(a,b)=(y_1-a+b)^2+(y_2-a)^2+(y_3-a-b)^2.
$$

**Normal equations.**

1. $\partial Q/\partial a=-2(y_1-a+b)-2(y_2-a)-2(y_3-a-b)=-2(y_1+y_2+y_3-3a)$; the b terms cancel because $\sum x_i=0$. Set to 0: $3\hat\alpha=y_1+y_2+y_3$.
2. $\partial Q/\partial b=2(y_1-a+b)-2(y_3-a-b)=2(y_1-y_3+2b)$. Set to 0: $2\hat\beta=y_3-y_1$.
3. Q is a positive-definite quadratic in (a, b), so this stationary point is the minimum.

Centring ($\sum x_i=0$) is what decouples the two equations.

### Activity 8.2: compute and interpret

y = (2, 1, 6).

1. $\hat\alpha=(2+1+6)/3=3$.
2. $\hat\beta=(6-2)/2=2$.
3. **Conditional-means reading.** $\hat\alpha=3$ is the estimated mean response at x = 0 (the centre of the design). $\hat\beta=2$: groups one predictor unit apart differ by an estimated 2 in mean response; fitted means at x = −1, 0, 1 are 1, 3, 5.
4. **Causal reading** would need, for instance, x to be **assigned** at random (or a credible no-confounding argument), plus the linear form holding over the range considered. The regression alone only compares observed groups.

## Design, targets and representativeness

- **Fixed design:** predictor values set in advance; repeated sampling holds them fixed. **Random design:** pairs $(X_i,Y_i)$ sampled, so both vary. With random design we can still condition on observed x; the same conditional likelihood applies without modelling X.
- Random **sampling** and random **treatment assignment** are different design choices. A causal reading of the slope needs appropriate design or causal assumptions.
- **Three targets:** descriptive (how does mean score vary with observed study time?), predictive (what score should we predict for a new student?), causal (how would the mean score change if an intervention increased study time?). Observed differences do not, by themselves, identify the effect of extra study.
- **Selection:** with S = 1 for inclusion, $\mathbb E[Y\mid X=x,S=1]$ may differ from $\mathbb E[Y\mid X=x]$. Income survey example: if higher earners within an age group respond less, respondents' mean income understates the age group's. A larger sample estimates the participants' mean more precisely without making it representative.
- **A straight line can summarise a curve:** with IID pairs and suitable conditions, least squares estimates the best linear predictor in the sampled population, which depends on how common different X values are.
- **Robust SEs** give valid large-sample uncertainty under unequal conditional variances. They leave the fitted line unchanged and do not remove selection bias or establish causality.

## Formulate the problem before choosing a method

1. **Estimand:** what quantity or comparison?
2. **Data collection:** sampling, assignment, measurement.
3. **Model:** distributions and dependence.
4. **Identifiability:** does the observed-data law determine the estimand?
5. **Estimation:** which estimator or fitting rule?
6. **Uncertainty:** which SEs or intervals, and why?

Then ask whether the estimates answer the original question about the intended population.

## Summary

- A statistical model specifies possible distributions for the observed data.
- The estimand expresses the question; nuisance parameters can still affect uncertainty.
- Likelihood holds the observed data fixed and compares parameter values.
- The estimand must be identifiable for consistent estimation across the model.
- A regression likelihood needs assumptions beyond the conditional mean.
- Descriptive, predictive and causal targets need different assumptions.
- Next (L9): estimators judged by loss, risk, bias, variance and consistency.

## Traps

- Treating the likelihood as a probability distribution over θ, or a likelihood ratio as "how much more probable p = 0.75 is".
- Ratio arithmetic: 1.125 is 12.5% higher, not 17.5%.
- Confusing $\mathbb P(\text{sequence})=p^2(1-p)$ with $\mathbb P(2\text{ successes})=3p^2(1-p)$ (harmless in ratios, wrong elsewhere).
- Calling a parameter identifiable because it is "in the model"; check whether equal laws force equal values.
- Thinking nuisance means ignorable: σ sets the SE of $\bar X$.
- Assuming the $Y_i$ in regression are identically distributed (they are not, given different $x_i$).
- Reading a regression slope causally from observational data, or believing robust SEs fix bias.
- Believing a bigger sample cures non-representative selection.

## Self-check

1. IID Bernoulli, n = 10, s = 7. Write L(p) and find the p that maximises it. $p^7(1-p)^3$, *maximised at 0.7.*
2. $Y_i\overset{\text{iid}}{\sim}\mathcal N(\mu_1-\mu_2,1)$. Is $\mu_1$ identifiable? Is $\mu_1-\mu_2$? *No; yes.*
3. Design x = (−1, 0, 1), y = (4, 5, 9). Find $\hat\alpha,\hat\beta$. *6 and 2.5.*
4. Y ∼ Exponential with mean αβ. Which of α, β, αβ, 1/(αβ) are identifiable? *αβ and 1/(αβ) only.*
