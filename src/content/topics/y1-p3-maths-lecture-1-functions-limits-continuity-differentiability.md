---
draft: false
title: "Lecture 1 - Functions, limits, continuity, differentiability"
paper: "Paper 3 — Quantitative Methods"
year: "Year 1 (Part I)"
section: "Mathematics"
description: "Functions, one-sided and two-sided continuity, differentiability, and why differentiability implies continuity but not the reverse."
order: 1
tags: ["economics"]
---

Lecture slide extracts and the worked distribution-function example are from the Part I Mathematics course, University of Cambridge; the red annotations and notes are the author's.

**Reading**

- Main textbook (compulsory): Sydsaeter, K., P. Hammond, A. Strom, and A. Carvajal (2016) Essential Mathematics for Economic Analysis (5th edition), Pearson Education. 
- Supplementary textbook (optional): Pemberton, M., and Rau, N. (2016) Mathematics for Economists: an Introductory Textbook (4th edition), Manchester University Press.

*A good book for those who have done Further Maths modules at A-Level, or who plan to take optional Mathematics paper in Part IIA. Can be borrowed from Marshall Library.*

**Exercises**
![Lecture slide: textbook readings 4.1-4.10, 5.1-5.3, 5.6, 6.1-6.2, 6.5, 7.8-7.9 and suggested exercises, referenced by chapter and section.](../../assets/notes/year1/7c265467c3cad035b896.png)

**Functions**
Functions have a singular output (range) for a given input (domain). Invertible functions are one to one mappings.

**Continuity** (One-sided)

- Suppose that $f(x)$ is defined on interval $(c, b]$. If $f(x)$ tends to $f(b)$ as $x$ tends to $b$ from left, then we say that $f$ is left-continuous at $x = b$.
- Similarly, if $f(x)$ is defined on $[a, c)$ and tends to $f(a)$ as $x$ tends to $a$ from right, then we say that $f$ is right-continuous at $x = a$

**Continuity**
When both left and right continuity agree to the same value there is continuity at that point.

Function with domain $D = \mathbb{R}$ is called continuous everywhere (or simply, continuous) if it is continuous at any point $x_0$ in $\mathbb{R}$
![Lecture slide examples: a k-th degree polynomial is continuous everywhere; the function equal to 1 on rationals and 0 on irrationals is discontinuous everywhere.](../../assets/notes/year1/10fab8e8e03e0e2ceb1c.png)
Now instead consider for example stock prices, they are not continuous because they must always take a rational value.

**Differentiability**
![Lecture slide: f is differentiable at x0 if the limit of (f(x) - f(x0)) / (x - x0) as x tends to x0 exists; that limit is the derivative, the slope of the tangent.](../../assets/notes/year1/c2b9b278334257e03f91.png)

**NOTE: Differentiability ⇒ Continuity but NOT vice versa.**

Consider for example, $f(x) = |x|$. This is continuous everywhere but can not be differentiated at $x=0$.

Marginal quantities use differentiation (even though this is technically an approximation of a unit change) it is justifiable when dealing with extremely large numbers.

**Demonstrating functions and continuity**

![Worked example: a Bernoulli(1/2) random variable has a step CDF that is right-continuous but jumps at 0 and 1; its quantile function is defined by the infimum, with annotations.](../../assets/notes/year1/f7c40f0902f4fefa5d01.png)
