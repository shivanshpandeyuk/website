---
draft: false
title: "Lecture 4 - MRS, MU"
paper: "Paper 1 — Microeconomics"
year: "Year 1 (Part I)"
section: "Microeconomics"
description: "Deriving the marginal rate of substitution, marginal utility as a partial derivative, and how convexity shapes the MRS."
order: 4
tags: ["economics"]
---

Lecture slides at: [L4-notes-Micro-2023-24.pdf (cam.ac.uk)](https://www.vle.cam.ac.uk/pluginfile.php/15849931/mod_resource/content/6/L4-notes-Micro-2023-24.pdf)

**Understanding Substitution:**
![With monotonic preferences, D1 and D2 have opposite signs; the value of D1 units of good 1 plus D2 units of good 2 is zero](../../assets/notes/year1/9fffad058ef28f846ad1.png)

Taking the limit we can now define MRS:

![MRS as the slope of the tangent to the indifference curve at (x1, x2), obtained as the limit of D2/D1](../../assets/notes/year1/7d2c62d87b9a52555027.png)

As the value of MRS gets larger, the more important good 1 is relative to good 2. The gradient gets steeper implying the consumer is willing to give up greater quantities of good 2 for a unit of good 1.

**Deriving MRS**

![Defining c(t) as the compensating change in good 2 that keeps (x1 + t, x2 + c(t)) on the same indifference curve; MRS is the limit of c(t)/t as t goes to 0](../../assets/notes/year1/6e188bbd4f961de11940.png)

NOTE: As t increases, good 2 becomes more valuable

(x1, x2) ∼ (x1 + t, x2 + c(t)) means as t changes, c(t) adjusts to keep the new bundle on the IC of (x1, x2). Clearly c(0) = 0, *because no change in chocolate requires no change in fruit gum candies*.

Hence, ![MRS_{1,2}(x1, x2) = lim c(t)/t = lim (c(t) - c(0))/t as t goes to 0, using c(0) = 0](../../assets/notes/year1/19191a9382a5a96ab8f1.png)
	We defined MRS = slope of tangent as t->0 for first equation. Then for second equation we used result c(0) = 0. This then tells us that the MRS = c'(t) at the point t=0.

Next we try to compute this value of c'(0) using the function *u*. 
NOTE: u depends on x1, x2, which depend on t. Then consider the following:

![Annotated slide: partial derivatives of u and the chain rule d/dt u(f(t), g(t)) = u1 f'(t) + u2 g'(t)](../../assets/notes/year1/39454bdefc0adbd66825.png)
![Annotated derivation: differentiating the constant u(x1 + t, x2 + c(t)) and evaluating at t = 0 gives c'(0) = -u1/u2](../../assets/notes/year1/8384a2a68b3531a2e90b.png)
  ![MRS_{1,2}(x1, x2) = -u1(x1, x2)/u2(x1, x2)](../../assets/notes/year1/890e119b7b738bea56a8.png)
  This is an alternative definition of the MRS. It is the ratio of "importance" of each good in terms of their utility.

**Defining MU (recalling partial derivatives):**
![Marginal utility of good 1 as the partial derivative of u with respect to its first argument: MU1(x1, x2) = u1(x1, x2)](../../assets/notes/year1/b35c6e63d3a6194b55b9.png)
E.g.
![Worked example: for u = sqrt(x1) + 2x2, MRS_{1,2} = -u1/u2 = -1/(4 sqrt(x1)), independent of x2](../../assets/notes/year1/062b9d78ad2d4eb928bb.png)

**MRS and Convexity**
![How convexity shapes the MRS: sliding along the indifference curve, |MRS| rises for non-convex preferences, is non-increasing for convex, and strictly decreasing for strictly convex](../../assets/notes/year1/215b60fa03a156ce9f58.png)

**Exercise**:
![Exercise: for the indifference curve x1 x2 = 12 through (3, 4), compute MRS_{1,2}, evaluate it at another bundle, describe its behaviour as x1 grows, and ask whether MRS can be positive](../../assets/notes/year1/d005d634d760d3cd28ce.png)
Q1.1) The IC is: $$x_2 = 12 / x_1$$So the slope of the tangent is given by $$dx_2/dx_1 = -6/x_1^2$$So substituting x1 = 3, gives us MRS(3,4) = -2/3

Q1.2) Consider the point (1,12):

So substituting x1 = 1, gives us MRS(1,12) = -6

Q1.3) The function $$ MRS = -6/x_1^2$$Tends to zero as x_1 tends to infinity. That is to say that the absolute value of the MRS declines as further goods of x_1 are consumed. 

(Steep gradient for low x1, shallow gradient for large x1)

In layman's terms, the fewer goods of x1 being consumed the more willing the consumer is to trade their consumption of x2 for a singular unit of x1. 

Q2) For MRS to be positive preferences must be non-monotonic to enable an upward sloping indifference curve. An example can be the case of *saturation* where there is a *bliss point* and the further a point is away from it, the less utility derived from it. E.g/ beer and milk consumption.

**Reading:** 
Varian, chapters 3,4.

**Past exam question:** 
Exam 2009-10 Q6.
