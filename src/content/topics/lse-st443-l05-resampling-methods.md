---
draft: false
title: "Lecture 5 - Resampling methods"
paper: "ST443 Machine Learning and Data Mining"
year: "M.S. Statistics (LSE)"
section: "Machine learning"
description: "Training, validation and test error, k-fold and leave-one-out cross-validation, choosing k, the one-fit LOOCV shortcut for linear smoothers, the bootstrap, and four bootstrap estimates of test error: gen-0, leave-one-out, .632 and .632+."
order: 5
tags: [statistics, machine-learning, resampling]
---

ST443, LSE, Autumn Term 2026, week 5. Reading: ISLR (2nd edition) Chapter 5, §5.1 to 5.2; ESL (2nd edition) §7.10 to 7.11. Page and figure numbers refer to the printed books.

## Cheat sheet

- **Expected risk (test error):** $R(f)=\mathbb E[\ell(f(X),Y)]$; **empirical risk (training error):** $R_n(f)=\frac1n\sum_{i\in[n]}\ell(f(\mathbf x_i),y_i)$. Losses: squared $(x-y)^2$, 0-1 $\mathbb I(x\ne y)$.
- **Data-rich case:** split train / validation / test (say 50/25/25%): fit / model selection / model assessment.
- **k-fold CV:** indexing $\kappa:[n]\to[k]$; $\hat f^{-j}$ fitted without fold j; $R_{\mathrm{CV}}(\hat f)=\frac1n\sum_{i\in[n]}\ell(\hat f^{-\kappa(i)}(\mathbf x_i),y_i)$. Typical k ∈ {5, 10}; k = n is LOOCV, $\kappa(i)=i$.
- **Hyperparameter selection:** $\hat\alpha=\arg\min_{\alpha\in A}R_{\mathrm{CV}}(\hat f_\alpha)$; final model $f_{\hat\alpha}$ refitted on all n points.
- **Choice of k:** LOOCV (approximately) unbiased, high variance (training sets nearly identical), expensive; smaller k: lower variance, higher bias (trains on $(k-1)n/k$ points); k = 5 to 10 is the usual compromise.
- **LOOCV shortcut** (linear smoother $\hat{\mathbf y}=\mathbf S\mathbf y$, squared loss): $\hat f^{-i}(\mathbf x_i)-y_i=\frac{\hat f(\mathbf x_i)-y_i}{1-S_{ii}}$, so $R_{\mathrm{CV}}=\frac1n\sum_i\big(\frac{y_i-\hat y_i}{1-S_{ii}}\big)^2$: one fit. Exact for least squares ($S_{ii}=h_i$, the leverage).
- **Bootstrap:** B datasets $Z^{*b}$ of n draws **with replacement** from Z; compute $S(Z^{*b})$; use $(S(Z^{*b}))_{b\in[B]}$ to estimate the distribution of S(Z), e.g. $\widehat{\mathrm{SE}}^2=\frac1{B-1}\sum_b(S(Z^{*b})-\bar S^*)^2$.
- **gen-0:** $R^{(0)}_{\mathrm{boot}}=\frac1B\frac1n\sum_b\sum_i\ell(\hat f^{*b}(\mathbf x_i),y_i)$: too optimistic (training and test points overlap).
- **gen-1 (leave-one-out bootstrap):** $R^{(1)}_{\mathrm{boot}}=\frac1n\sum_i\frac1{|C^{-i}|}\sum_{b\in C^{-i}}\ell(\hat f^{*b}(\mathbf x_i),y_i)$, $C^{-i}=\{b:i\notin S_b\}$. Fixes overfitting; biased upward (about 0.632n distinct points per sample, like 2-fold CV).
- **Key probability:** $\mathbb P(i\in S_b)=1-(1-\frac1n)^n\to1-e^{-1}\approx0.632$.
- **gen-2 (.632):** $R^{(0.632)}_{\mathrm{boot}}=0.368R_n+0.632R^{(1)}_{\mathrm{boot}}$.
- **gen-3 (.632+):** $(1-\hat w)R_n+\hat wR^{(1)}_{\mathrm{boot}}$, $\hat w=\frac{0.632}{1-0.368\hat R}\in[0.632,1]$, $\hat R=\frac{R^{(1)}_{\mathrm{boot}}-R_n}{\hat\gamma-R_n}$, no-information rate $\hat\gamma=\frac1{n^2}\sum_{i,j}\ell(\hat f(\mathbf x_i),y_j)$. $\hat R=0$ gives .632; $\hat R=1$ gives gen-1.
- **Key numbers:** Auto, LOOCV and 10-fold CV both pick degree about 2. Classification demo: CV picks $\hat d=4$, true test minimum at d = 3 (test errors 0.201, 0.197, 0.160, 0.162 for d = 1 to 4; Bayes 0.133). ISLR portfolio: α = 0.6, simulated SE 0.083, bootstrap SE 0.087. ESL 1-NN with pure noise: true error 0.5, gen-0 about 0.184, .632 gives 0.316, .632+ gives 0.5.

## The problem: estimating test error

We fit $\hat f$ on the training data. How well will it do on new data? The training error answers a different question (how well it fits points it has already seen), and it falls as the model gets more flexible. We need the test error.

**Recall (L2).** $(X,Y)\sim P\in\mathcal P(\mathcal X\times\mathcal Y)$, training data $\{(\mathbf x_i,y_i)\}_{i\in[n]}$ IID from P, hypothesis class $\mathcal F\subset\mathcal Y^{\mathcal X}$.

$$
R(f)=\mathbb E[\ell(f(X),Y)]=\int_{\mathcal X\times\mathcal Y}\ell(f(x),y)\,dP(x,y)\qquad\text{(expected risk, test error)}
$$

$$
R_n(f)=\int_{\mathcal X\times\mathcal Y}\ell(f(x),y)\,dP_n(x,y)=\frac1n\sum_{i\in[n]}\ell(f(\mathbf x_i),y_i)\qquad\text{(empirical risk, training error)}
$$

$P_n$ is the empirical distribution (mass 1/n on each training point), which is why the integral becomes an average. Losses: squared $\ell(x,y)=(x-y)^2$; 0-1 $\ell(x,y)=\mathbb I(x\ne y)$.

**Ideal world (data-rich).** Split the data in three, say 50%, 25%, 25%:

1. **training set:** fit the model;
2. **validation set:** choose hyperparameters (**model selection**);
3. **test set:** estimate the expected risk of the chosen model (**model assessment**).

Usually we do not have that much data, hence **resampling methods**: resample the data to produce estimates. Two main approaches: cross-validation and the bootstrap. Alternatives later: adjust the training error ($C_p$, AIC, BIC, ...).

> **Why the test set must stay untouched.** If you pick among models by their test-set score, the winning score is the minimum of several noisy numbers, so it is biased downwards. That is a validation set in disguise. A backtest used to select a trading strategy and then quoted as its expected performance has the same problem.

> **ISLR §5.1.1, Figures 5.1-5.2 (pp. 198-200): the validation set approach.** Auto data (mpg on polynomials in horsepower): the 392 observations are split at random into 196 training and 196 validation. The quadratic fit has much lower validation MSE than the linear one; cubic and higher add nothing. Repeating with ten random splits gives ten different curves, which agree only that linear is inadequate. Two drawbacks follow: the estimate is highly variable across splits, and the model is fitted on only half the data, so the validation error tends to **overestimate** the test error of the model fitted on all n. Cross-validation addresses both.

## k-fold cross-validation

**Goal:** estimate $R(\hat f)=\mathbb E[\ell(\hat f(X),Y)]$ without a separate test set.

1. Split the data into k roughly equal parts (here k = 5).
2. For each $i\in[k]$: train on the other parts $[k]\setminus\{i\}$, and compute the prediction error on part i, which was left out of training.
3. Average the k prediction errors, swapping round so each part is left out once.

**Formally.** The indexing function $\kappa:[n]\to[k]$ says which fold observation i belongs to. $\hat f^{-j}$ is fitted on $\{(\mathbf x_i,y_i):\kappa(i)\ne j\}$. Then

$$
R_{\mathrm{CV}}(\hat f)=\frac1n\sum_{i\in[n]}\ell\big(\hat f^{-\kappa(i)}(\mathbf x_i),y_i\big).
$$

The average runs over all n points because the folds rotate: every point is predicted once, by the one model that did not see it, and the loss compares that prediction with what $y_i$ actually was.

- Typical choices: k ∈ {5, 10}; k = n is **leave-one-out cross-validation** (LOOCV), $\kappa(i)=i$.
- Check: with equal folds, $\frac1n\sum_i=\frac1k\sum_{j\in[k]}\frac1{n/k}\sum_{i:\kappa(i)=j}$, so $R_{\mathrm{CV}}$ is the average of the k per-fold errors, as in step 3.

> **ESL §7.10.1 (pp. 241-242)** uses the same κ notation, (7.48). **Figure 7.8 (p. 243), learning curve:** with n = 200, 5-fold CV trains on 160 points, which perform almost like 200, so little bias; with n = 50 it trains on 40, on the steep part of the curve, so CV overestimates the error. Whether k = 5 is biased depends on how steep the learning curve is at $(k-1)n/k$.

## CV for hyperparameter selection

**Setting:** a family of models $\{f(\cdot;\alpha):\alpha\in A\}$ indexed by a hyperparameter. Example: KNN classifier, α := K, A = [10].

1. For each α compute the CV error $R_{\mathrm{CV}}(\hat f_\alpha)=\frac1n\sum_{i\in[n]}\ell\big(\hat f_\alpha^{-\kappa(i)}(\mathbf x_i),y_i\big)$.
2. Pick $\hat\alpha:=\arg\min_{\alpha\in A}R_{\mathrm{CV}}(\hat f_\alpha)$.
3. Final model (competition mode): $f_{\hat\alpha}$ refitted on the whole data set $\{(\mathbf x_i,y_i)\}_{i\in[n]}$.

> **Two cautions.** (a) $R_{\mathrm{CV}}(\hat f_{\hat\alpha})$ is optimistic as an estimate of the chosen model's test error, for the same minimum-of-noisy-numbers reason as above; to assess the selected model honestly you need an outer loop (nested CV) or a test set. (b) **Every** data-driven step must sit inside the folds, including feature screening: see the ESL example in the next section.

> **ESL §7.10.1, Figure 7.9 and the one-standard-error rule (p. 244).** Best-subset classification: the 10-fold CV curve and the true error both have minima at subset size p = 10; with SE bars, the one-SE rule picks the most parsimonious model within one SE of the best, here about p = 9.

## Choosing k: bias and variance

k = n covers every split that leaves out exactly **one** point (n of them), not every partition of the data.

- **k = n (LOOCV):** approximately unbiased, but its variance can be high (very similar training sets), and it can be computationally intense (n fits).
- **Smaller k:** lower variance, but higher bias, since each fit does not use all the training data.
- **k = 5 to 10:** generally reliable, with some computational saving.

> Note that LOOCV trains on n − 1 points, not all n, so it is **approximately** unbiased for the test error of a model fitted on n points (ISLR p. 205 and ESL p. 242 both say "approximately"). The bias is small because n − 1 is close to n.

**Why the variance is higher for LOOCV.**

1. $R_{\mathrm{CV}}$ averages n error terms, each from a model trained on n − 1 points.
2. Any two of these training sets share n − 2 points, so the fitted models, and their errors, are highly positively correlated.
3. For an average of m terms with common variance $\sigma^2$ and pairwise correlation ρ: $\mathrm{var}=\frac{\sigma^2}m+\frac{m-1}m\rho\sigma^2\to\rho\sigma^2$, so averaging barely helps when ρ is close to 1.
4. With k = 5 or 10 the training sets overlap less, ρ is smaller, and the average is less variable.

> **ISLR §5.1.4 (pp. 205-206)** makes the same bias-variance argument: k-fold trains on about $(k-1)n/k$ points, an intermediate bias between LOOCV and the validation set approach, with lower variance than LOOCV. **Figure 5.6 (p. 204):** on the three simulated smoothing-spline examples of Ch 2, LOOCV and 10-fold CV are very close; they sometimes misjudge the level of the test MSE but come close to the right flexibility, which is what model selection needs.

> **ESL §7.10.2, "the wrong and right way" (pp. 245-247).** n = 50 samples in two equal classes, p = 5000 standard Gaussian predictors independent of the labels, so the true error of any classifier is 50%. Wrong recipe: pick the 100 predictors most correlated with the labels using all 50 samples, then cross-validate a 1-nearest-neighbour classifier on them. Average CV error over 50 simulations: 3%. The screening had already seen the left-out samples (their correlations average about 0.28 instead of 0). Right way: redo the screening inside each fold.

## LOOCV for linear smoothers: one fit is enough

**Setting.** Squared loss, and estimates that are **linear smoothers** of y:

$$
\hat{\mathbf y}=\mathbf S\mathbf y,\qquad\mathbf y=(y_i)_{i=1}^n\in\mathbb R^n
$$

with S depending on the inputs only. Examples: linear regression ($\mathbf S=\mathbf H=\mathbf X(\mathbf X^{\mathsf T}\mathbf X)^{-1}\mathbf X^{\mathsf T}$, the hat matrix of L3), ridge regression (later). Then

$$
R_{\mathrm{CV}}(\hat f)=\frac1n\sum_{i=1}^n\big[\hat f^{-i}(\mathbf x_i)-y_i\big]^2
$$

and the "magic":

$$
\hat f^{-i}(\mathbf x_i)-y_i=\frac{\hat f(\mathbf x_i)-y_i}{1-S_{ii}}
$$

where $\hat f$ is fitted **once** on all n points. So LOOCV costs one fit.

**Why it holds for least squares (sketch).**

1. Removing point i changes the coefficients by $\hat{\boldsymbol\beta}-\hat{\boldsymbol\beta}^{-i}=\frac{(\mathbf X^{\mathsf T}\mathbf X)^{-1}\mathbf x_i e_i}{1-h_i}$, where $e_i=y_i-\hat y_i$ and $h_i=S_{ii}$ (Sherman-Morrison rank-one update of $(\mathbf X^{\mathsf T}\mathbf X)^{-1}$).
2. Multiply by $\mathbf x_i^{\mathsf T}$: $\hat y_i-\hat f^{-i}(\mathbf x_i)=\frac{h_ie_i}{1-h_i}$.
3. Hence $y_i-\hat f^{-i}(\mathbf x_i)=e_i+\frac{h_ie_i}{1-h_i}=\frac{e_i}{1-h_i}$, which is the identity above up to sign (it is squared anyway).

**Worked example.** x = (0, 1, 2, 3), y = (1, 2, 2, 5), simple linear regression.

1. Fit: $\hat y=0.7+1.2x$, fitted values (0.7, 1.9, 3.1, 4.3), residuals (0.3, 0.1, −1.1, 0.7).
2. Leverages $h_i=\frac1n+\frac{(x_i-\bar x)^2}{\sum_j(x_j-\bar x)^2}=\frac14+\frac{(x_i-1.5)^2}5$: (0.7, 0.3, 0.3, 0.7).
3. Leave-one-out residuals $e_i/(1-h_i)$: 0.3/0.3 = 1, 0.1/0.7 = 0.143, −1.1/0.7 = −1.571, 0.7/0.3 = 2.333.
4. $R_{\mathrm{CV}}=\frac14(1+0.0204+2.4694+5.4444)=2.234$. Refitting four times by brute force gives the same four residuals.

The end points (leverage 0.7) have their residuals inflated more than three-fold: a high-leverage point pulls the full fit towards itself, so its ordinary residual understates how badly it is predicted when left out.

> **Scope.** The identity is exact for least squares and ridge regression. ESL (7.51) says it holds "for many linear fitting methods"; it is not automatic for every S. For logistic regression, LDA or KNN there is no such shortcut and LOOCV really needs n refits (ISLR p. 203).

> **ISLR §5.1.2, (5.2) and Figure 5.4 (pp. 200-203).** For least squares, $\mathrm{CV}_{(n)}=\frac1n\sum_i\big(\frac{y_i-\hat y_i}{1-h_i}\big)^2$ with $h_i$ the leverage (between 1/n and 1). **ESL §7.10.1, (7.50)-(7.52) (p. 244):** replacing each $S_{ii}$ by the average trace(S)/n gives generalised cross-validation, $\mathrm{GCV}=\frac1n\sum_i\big[\frac{y_i-\hat f(\mathbf x_i)}{1-\mathrm{trace}(\mathbf S)/n}\big]^2$, where trace(S) is the effective number of parameters.

## Regression example: Auto

Aim: predict mpg from powers of horsepower, $f(x)=\beta_0+\beta_1x+\beta_2x^2+\dots+\beta_dx^d$, and choose d.

- Left: the LOOCV curve. Right: 10-fold CV with 9 random splits (9 slightly different curves).
- Both say degree $d\approx2$: the big drop is from d = 1 to d = 2; higher degrees add nothing.
- LOOCV gives one curve because it has no randomness (there is only one way to leave out one point at a time). 10-fold depends on the random fold assignment, but the 9 curves are much closer to each other than the 10 validation-set curves above.

> **ISLR Figure 5.4 (p. 202)** is this slide. Compare with Figure 5.2 (validation set, 10 splits): the spread across random splits shrinks markedly with 10-fold CV, which is the variance point made above.

## Classification example: polynomial logistic regression and KNN

**Models.** Logistic regression with p = 2 and polynomial variants (linear, quadratic, and so on):

$$
\log\frac{p(\mathbf x)}{1-p(\mathbf x)}=\beta_0+\beta_1x_1+\beta_2x_2\quad\text{(linear)}
$$

$$
\log\frac{p(\mathbf x)}{1-p(\mathbf x)}=\beta_0+\beta_1x_1+\beta_2x_1^2+\beta_3x_2+\beta_4x_2^2\quad\text{(quadratic)}
$$

The purple dashed line on the plots is the Bayes decision boundary; black is the fitted boundary for degree d = 1, 2, 3, 4.

**CV curves** (left: degree d; right: KNN against 1/K):

- test error (brown): the target we want to approximate;
- training error (blue): decays with model complexity;
- CV error (black): the approximation.

Left: $\hat d=4\approx3$, where 3 is the minimum of the brown test curve. Not perfect, but reasonable: one degree off the true best, and past it the test curve turns up as the model overfits. Right: the same story for K; CV's minimum lands near the test minimum.

> Note that by eye degree 4 can look best on the boundary plots, but by the true test errors (below) degree 3 is best (0.160) and degree 4 a whisker behind (0.162). CV picks 4, the truth is 3, and the cost of the miss is tiny.

> **ISLR §5.1.5, Figures 5.7-5.8 (pp. 206-208).** Simulated two-class data of Figure 2.13. True test error rates for degrees 1 to 4: 0.201, 0.197, 0.160, 0.162; Bayes error rate 0.133. The CV curve somewhat underestimates the test error but its minimum (degree 4) is next to the test minimum (degree 3), and degrees 3 to 6 have roughly the same test error. The CV error for classification is $\mathrm{CV}_{(n)}=\frac1n\sum_i\mathbb I(y_i\ne\hat y_i)$, (5.4). The slide labels the black curve "2-fold CV" while ISLR's caption for the same figure says 10-fold CV; the reading of the plot is the same.

> **Why the x-axis is 1/K on the KNN panel.** Small K is the flexible end (K = 1 memorises the training set: zero training error). Plotting 1/K puts flexibility increasing to the right, like the polynomial degree on the left panel, so both show the same U-shape for test error and the same falling training error.

## The bootstrap: general idea

The bootstrap is not itself a supervised-learning method. It is a general tool for the sampling distribution of **any** statistic S(Z): a standard error, a confidence interval, the variability of a prediction at a point. In this lecture it is applied to one supervised-learning task, estimating test error (from the next section). ISLR's lead example is a portfolio weight, with no prediction involved (below).

**Setup.** Data set $Z=(z_i)_{i=1}^n$ of n pairs $z_i=(\mathbf x_i,y_i)$.

1. For $b\in[B]$, that is B times: generate n samples from Z **with replacement**, giving $Z^{*b}$; compute $S(Z^{*b})$, say the prediction error at a point.
2. Use $\big(S(Z^{*b})\big)_{b\in[B]}$ to estimate properties of the distribution of S(Z), for example its variance:

$$
\widehat{\mathrm{var}}[S(Z)]=\frac1{B-1}\sum_{b\in[B]}\big(S(Z^{*b})-\bar S^*\big)^2,\qquad\bar S^*=\frac1B\sum_bS(Z^{*b})
$$

**Why it works.** We would like many independent data sets from P, compute S on each and look at the spread. We have only one. The empirical distribution $P_n$ is our best guess of P, and drawing n points with replacement from Z is drawing an IID sample of size n from $P_n$. So the bootstrap replays the sampling experiment with $P_n$ standing in for P.

> **ISLR §5.2, (5.6)-(5.8), Figures 5.9-5.11 (pp. 209-212): investment allocation.** Invest a fraction α in asset X and 1 − α in Y; the variance-minimising weight is $\alpha=\frac{\sigma_Y^2-\sigma_{XY}}{\sigma_X^2+\sigma_Y^2-2\sigma_{XY}}$. Simulation with $\sigma_X^2=1$, $\sigma_Y^2=1.25$, $\sigma_{XY}=0.5$: true α = (1.25 − 0.5)/(1 + 1.25 − 1) = 0.75/1.25 = 0.6. From 1,000 independent simulated data sets of 100 pairs: mean of $\hat\alpha$ = 0.5996, SD = 0.083. From 1,000 **bootstrap** samples of one data set: $\mathrm{SE}_B(\hat\alpha)=0.087$, very close to the 0.083 that needed new data from the population. Figure 5.11 shows the resampling with n = 3: $Z^{*1}$ contains observation 3 twice, observation 1 once and observation 2 not at all.

## Bootstrap estimate of test error, gen-0 (and why it fails)

We make B data sets of size n by random selection **with** replacement, find the error we suffer, and average across all n and then across all B. With $\hat f^{*b}$ the model fitted to the b-th bootstrap data set $Z^{*b}$, the test error is estimated on the training data:

$$
R^{(0)}_{\mathrm{boot}}(\hat f)=\frac1B\frac1n\sum_{b\in[B]}\sum_{i\in[n]}\ell\big(\hat f^{*b}(\mathbf x_i),y_i\big)
$$

**Issue:** bootstrap data sets ≈ training data set, so $R^{(0)}_{\mathrm{boot}}$ is too optimistic.

1. In $R^{(0)}_{\mathrm{boot}}$ the bootstrap samples act as training sets and the original data as the test set.
2. About 63.2% of the original points are inside each bootstrap sample (see below). For those, $\hat f^{*b}$ is being tested on points it was trained on.
3. So most terms are training errors, which are too small for a flexible model; the estimate is pulled towards $R_n$.

The fix is to average, for each point, only over the bootstrap data sets it does not show up in. That is the next estimator.

> **ESL §7.11, (7.54)-(7.55) (pp. 250-251).** 1-nearest-neighbour classifier, two equal classes, labels independent of the predictors, so the true error is 0.5. A training point inside bootstrap sample b is its own nearest neighbour: error 0. Only points outside the sample (probability 0.368) contribute, with error 0.5 on average. So $\mathbb E[R^{(0)}_{\mathrm{boot}}]\approx0.5\times0.368=0.184$, far below 0.5.

## gen-1: the leave-one-out bootstrap

**Idea** (à la cross-validation): for each observation, use only the bootstrap models that did not see it.

$$
R^{(1)}_{\mathrm{boot}}(\hat f)=\underbrace{\frac1n\sum_{i\in[n]}}_{\text{average over samples}}\ \underbrace{\frac1{|C^{-i}|}\sum_{b\in C^{-i}}}_{\text{average over bootstrap sets}\ \not\ni i}\ell\big(\hat f^{*b}(\mathbf x_i),y_i\big)
$$

$$
C^{-i}=\{b\in[B]:i\notin S_b\},\qquad S_b=\{\{i_{b,1},\dots,i_{b,n}\}\}\ \text{(a multiset over }[n]\text{: repeats allowed)}
$$

Here $S_b$ is the multiset of indices drawn in bootstrap sample b, and $C^{-i}$ is a set of **sample labels** b: those samples in which i was never drawn.

**Properties.**

1. It solves the overfitting issue of $R^{(0)}_{\mathrm{boot}}$: every term is a genuine out-of-sample prediction.
2. The average number of **distinct** observations in each $Z^{*b}$ is about 0.632n. So each $\hat f^{*b}$ is effectively trained on fewer distinct points than n, and $R^{(1)}_{\mathrm{boot}}$ is biased **upwards** (pessimistic), much like 2-fold CV.

> **A practical point.** If B is small, some point i may appear in every bootstrap sample, so $C^{-i}=\emptyset$ and its term is undefined. Each sample misses i with probability about 0.368, so with B = 50 the chance that a given i is never missed is $0.632^{50}\approx10^{-10}$. Either take B large enough or drop such terms (ESL p. 251).

## Where 0.632 comes from, and gen-2

**Probability that observation i is in bootstrap sample b.**

1. Complement rule: $\mathbb P(i\in S_b)=1-\mathbb P(i\notin S_b)$.
2. Each of the n draws is uniform on [n] and independent, so each draw misses i (picks any of the points except the i-th) with probability $1-\frac1n$, and all n draws miss it with probability $\big(1-\frac1n\big)^n$: $\mathbb P(i\in S_b)=1-\big(1-\frac1n\big)^n$.
3. Limit: $e^x=\lim_{n\to\infty}\big(1+\frac xn\big)^n$ by definition of e, and with x = −1 this gives $\big(1-\frac1n\big)^n\to e^{-1}=0.368$, so $\mathbb P(i\in S_b)\approx1-e^{-1}=0.632$.

> Note that the limit of $(1-\frac1n)^n$ is $e^{-1}\approx0.368$, not e ≈ 2.718. It must be below 1, being the probability that i is missed by all n draws.

- Small cases: n = 2: $1-(\frac12)^2=0.75$; n = 3 (ISLR's Figure 5.11 size): $1-(\frac23)^3=\frac{19}{27}=0.704$. The limit 0.632 is approached from above.
- Expected number of distinct points: write it as $\sum_{i\in[n]}\mathbb I(i\in S_b)$; by linearity of expectation its mean is $n\big[1-(1-\frac1n)^n\big]\approx0.632n$. This is property 2 above.

**Treatment: the .632 estimator.** gen-1 is too pessimistic, the training error $R_n$ too optimistic; mix them:

$$
R^{(0.632)}_{\mathrm{boot}}(\hat f)=0.368\,R_n(\hat f)+0.632\,R^{(1)}_{\mathrm{boot}}(\hat f)
$$

Think of this as a convex combination: the weights 0.368 + 0.632 = 1, so it lies between $R_n$ and $R^{(1)}_{\mathrm{boot}}$. The 0.368 weight on the optimistic $R_n$ pulls the pessimistic $R^{(1)}_{\mathrm{boot}}$ down. ESL notes the derivation of the weights is complex; the constant comes from 0.632.

## gen-3: the .632+ estimator

**Problem.** The .632 estimator can be off when $R_n(\hat f)$ is close to 0, i.e. when the model overfits: it then trusts a training error that says nothing.

$$
R^{(0.632+)}_{\mathrm{boot}}(\hat f)=(1-\hat w)R_n(\hat f)+\hat wR^{(1)}_{\mathrm{boot}}(\hat f)\in\big[R^{(0.632)}_{\mathrm{boot}}(\hat f),R^{(1)}_{\mathrm{boot}}(\hat f)\big]
$$

$$
\hat w=\frac{0.632}{1-0.368\hat R(\hat f)}\in[0.632,1],\qquad\hat R(\hat f)=\frac{R^{(1)}_{\mathrm{boot}}(\hat f)-R_n(\hat f)}{\gamma(\hat f)-R_n(\hat f)}
$$

$$
\gamma(\hat f)=\frac1{n^2}\sum_{i,j\in[n]}\ell\big(\hat f(\mathbf x_i),y_j\big)
$$

- $\hat R$ is the **relative overfitting rate**: how far gen-1 has moved from the training error towards the worst case.
- γ is the **no-information error rate**: the error of $\hat f$ if inputs and outputs were independent (every prediction scored against every response).

**Extremes.**

1. $\hat R=0$ (no overfitting): $\hat w=0.632/1=0.632$, the .632 estimator, the lower end of the interval.
2. $\hat R=1$ (gen-1 as bad as no information): $\hat w=0.632/(1-0.368)=0.632/0.632=1$, so the estimate is $R^{(1)}_{\mathrm{boot}}$.
3. In between, $\hat w$ increases with $\hat R$: the more overfitting, the more weight on the out-of-sample term.

**Worked example.** $R_n=0.10$, $R^{(1)}_{\mathrm{boot}}=0.30$, γ = 0.50.

1. $\hat R=\frac{0.30-0.10}{0.50-0.10}=0.5$.
2. $\hat w=\frac{0.632}{1-0.368\times0.5}=\frac{0.632}{0.816}=0.7745$.
3. $R^{(0.632+)}_{\mathrm{boot}}=0.2255\times0.10+0.7745\times0.30=0.2549$, against $R^{(0.632)}_{\mathrm{boot}}=0.0368+0.1896=0.2264$. Moderate overfitting moves the estimate about 0.03 towards gen-1.

> **ESL §7.11, (7.57)-(7.62) (pp. 251-253): where .632 breaks.** Same 1-NN pure-noise example as in gen-0: $R_n=0$ (each point is its own neighbour) and $R^{(1)}_{\mathrm{boot}}=0.5$, so .632 gives 0.632 × 0.5 = 0.316, while the true error is 0.5. For .632+: γ = 0.5 for balanced pure-noise classes, so $\hat R=(0.5-0)/(0.5-0)=1$, $\hat w=1$ and the estimate is 0.5, correct. ESL also caps $\hat R$ to [0, 1] (set to 0 if $R^{(1)}_{\mathrm{boot}}\le R_n$ or $\gamma\le R_n$), a detail the slide does not show.

## Summary

- Training, validation and test sets: fit, select, assess. With limited data, resample.
- k-fold CV: every point predicted once by a model that did not see it; k = 5 to 10 balances bias and variance; k = n is LOOCV.
- LOOCV for linear smoothers ($\hat{\mathbf y}=\mathbf S\mathbf y$): one fit, residuals divided by $1-S_{ii}$.
- CV picks hyperparameters (polynomial degree, K in KNN); refit the winner on all data.
- Bootstrap: resample with replacement to approximate a sampling distribution. Four test-error estimators: gen-0 (optimistic), gen-1 leave-one-out (pessimistic), .632 (convex mix), .632+ (adapts the mix to the overfitting rate).

## Traps

- Using the test set to choose between models, then quoting that score as the test error.
- Doing any data-driven step (feature screening, scaling fitted on all data) outside the CV folds (ESL: 3% CV error when the truth is 50%).
- Calling LOOCV exactly unbiased "because it uses all the data"; it trains on n − 1 points and is approximately unbiased.
- Assuming more folds is always better; LOOCV has higher variance because its training sets are almost identical.
- Applying the one-fit LOOCV shortcut to logistic regression, LDA or KNN; it is for linear smoothers under squared loss.
- Forgetting to refit the selected model on all n points.
- Treating the bootstrap as a supervised-learning method; it is a general tool for sampling distributions.
- Writing $(1-\frac1n)^n\to e$; the limit is $e^{-1}\approx0.368$.
- Reporting gen-0 as a test error; for 1-NN on pure noise it gives about 0.18 when the truth is 0.5.
- Mixing up 0.632 and 0.368: 0.632 is the chance a point **is** in a bootstrap sample and the weight on gen-1; 0.368 is the chance it is out and the weight on the training error.
- Calling degree 4 the true best in the classification demo; the test minimum is degree 3.

## Self-check

1. n = 1000, 10-fold CV: how many fits, and how many points in each training set? And for LOOCV with least squares? *10 fits of 900 points each; LOOCV would be 1000 fits of 999, but with least squares the leverage formula needs only one fit.*
2. Why is $R^{(0)}_{\mathrm{boot}}$ optimistic, and what fraction of its terms are in-sample predictions on average? *The bootstrap sets act as training sets and the original data as the test set; about 63.2% of the (i, b) terms have i inside sample b, so they are training errors.*
3. $R_n=0.05$ and $R^{(1)}_{\mathrm{boot}}=0.25$. Compute the .632 estimate. *$0.368\times0.05+0.632\times0.25=0.0184+0.158=0.1764$.*
4. Why does LOOCV give the same answer every time while 10-fold CV does not? *There is exactly one way to leave out one point at a time; 10-fold CV depends on the random assignment κ of points to folds.*
