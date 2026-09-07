---
title: "Lecture 5 - Joint Probabilities"
paper: "Paper 3 — Quantitative Methods"
year: "Year 1 (Part I)"
section: "Statistics"
description: "Lecture 5 - Joint Probabilities. Notes from the first-year Economics Tripos."
order: 5
tags: ["economics"]
draft: false
---

Slide extracts: University of Cambridge, Part I Paper 3 (Quantitative Methods), Statistics. Worked examples and numerical values in the slide extracts are reported from the course material [R]. Handwritten derivations are the author's own.

**DISCRETE**
If we have two random variables we can consider their joint behaviour. In the discrete case that is:
![Lecture slide: properties of the joint probability mass function — 0 ≤ P(x, y) ≤ 1 for all (x, y), and the double sum of P(xᵢ, yⱼ) over i and j equals 1.](../../assets/notes/year1/8be393ce46690b7772a9.png)
When working with several random variables we sometimes need to consider the probability distribution or the density of a single component, e.g. P(x) or f(x). 

Discrete Marginals:
In this context we refer to P(x) as the marginal probability mass function of X and to f(x) as the marginal density of X. Sometimes people write P_XY as the joint and P_X and P_Y (equivalently f_XY (x, y) and f_X(x) and f_Y(y)) as the joint and marginals.
![Lecture slide: the marginal mass function from the joint — P_X(x) = Σ_j P_XY(x, yⱼ) and P_Y(y) = Σ_i P(xᵢ, y), i.e. summing over the rows for X and over the columns for Y.](../../assets/notes/year1/2e90b879166d15a6462f.png)

see the example here; P(x=2) = P(x=2|y=0) + P(x=2|y=1) + ... :
![Handwritten worked example: a joint table for X (rows 2–12) against Y (columns 0–5) with entries in multiples of 1/36; the X = 2 row has only P(2, 0) = 1/36, so the marginal P_X(2) = 1/36.](../../assets/notes/year1/5e5b299fbbc7f03ccb06.png)

**CONTINUOUS**
For continuous random variables the joint probability density function is now a function of two (or more) variables f(x, y). Again we have f(x, y) ≥ 0 for all x and y. Where in the discrete case we have double summations in the continuous case we have to use integrals. So to evaluate probabilities we have the joint probability density function satisfies the double integral:
![Lecture slide: P(a ≤ X ≤ b, c ≤ Y ≤ d) is the double integral of f(x, y) over y from c to d then over x from a to b, integrating in y first with x held constant.](../../assets/notes/year1/d415aa67db48423d7d88.png)
[NOTE: You will not be required to evaluate double integrals as part of this course].

Continuous Marginals:
![Lecture slide: marginal densities — f_X(x) is the integral of f_XY(x, y) over all y, and f_Y(y) is the integral of f_XY(x, y) over all x; the ideas extend to n random variables.](../../assets/notes/year1/444921a0ee7b11075653.png)
The marginal for x assumes that x is a constant. That means y is variable and so we intgrate f(x,y) with respect to y while treating x as a constant. [Finally yielding a function solely in terms of x as expected]. 

The limits when integrating wrt to y will be y1 and y2. Corresponding to the values of x1 and x2.

NOTE: whenever you define a function don't forget to define its domain.

NOTE: It is possible to find marginals from a joint distribution, but you cannot find a joint distribution from the marginals (unless the two events are independent).

Conditional density functions:
![Lecture slide: the conditional density P(x | y) = P(x, y) / P(y) for P(y) > 0, equivalently f(x | y) = f(x, y) / f(y) for f(y) > 0, also written f_{X|Y}(x | y) = f_XY(x, y) / f_Y(y).](../../assets/notes/year1/7cb8ec138a54bd10571b.png)

Naturally for independent events that means:
![Lecture slide: for independent events P(x, y) = P(x)·P(y), so P(x | y) = P(x, y) / P(y) = P(x)·P(y) / P(y) = P(x).](../../assets/notes/year1/fbe594d1817c4908c1c1.png)
