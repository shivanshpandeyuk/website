---
draft: false
title: "Lecture 11 - Duality"
paper: "Paper 1 — Microeconomics"
year: "Year 1 (Part I)"
section: "Microeconomics"
description: "Utility maximisation and cost minimisation as dual problems, their shared tangency condition, and the Slutsky equation."
order: 11
tags: ["economics"]
---

![Hicks decomposition of a rise in p1: the move from the original bundle X' to the final bundle X'' is split into a substitution effect X' to H' (H' achieves the original utility at the new prices) and an income effect H' to X''](../../assets/notes/year1/efab693ac4db8301cf53.png)
We are interested in the following: 
- Given prices and an indifference curve, what is the minimum cost of affording that utility level? 
- Then compare with an exercise of maximizing utility given fixed income
![Two panels: utility maximisation gives Marshallian demand x*(p, m) where the budget line x·p = m is tangent to the red indifference curve; cost minimisation gives Hicksian demand h(p, u) as the point on the indifference curve IC(u) touched by the lowest budget line](../../assets/notes/year1/66c05d2068102c7bb3d1.png)
The red curve is classic utility maximisation with price and budget. The blue curve is cost minimization with price and utility achievment.

The same conditions hold for both scenarios for the optimal point. 

Given income m and prices p, find the bundle that maximizes utility. Two properties:
	1. Tangency condition (unless we have perfect complements!) 
	2. Be on the budget line x · p = m 

Given utility u and prices p, find the bundle that minimizes costs. Two properties: 
	1. Same tangency condition (unless we have perfect complements!). Otherwise, could increase utility without changing costs, and hence achieve u at lower costs. 
	2. Be on the indifference curve IC(u).

E.g.
![Worked example with u = x1 x2^2, p1 = 1, p2 = 4, m = 6: utility maximisation gives x1* = 2, x2* = 1, u = 2; the reverse cost-minimisation problem for u = 2 uses the same tangency condition and h1 h2^2 = 2, solving to h2* = 1, h1* = 2 and minimal cost 6](../../assets/notes/year1/bef3eda5df6509907dbb.png)

Or more generally:
![The same Cobb-Douglas example with general prices and income: x1* = m/3p1, x2* = 2m/3p2, indirect utility 4m^3 / 27 p1 p2^2; the reverse problem gives h2* = (u · 2p1/p2)^{1/3}, h1* = (u · p2^2/4p1^2)^{1/3}, and substituting u back recovers minimal cost p1 h1 + p2 h2 = m](../../assets/notes/year1/277ec6ac6bc1c390c365.png)

See: [microeconomics - Use of Slutsky equation - Economics Stack Exchange](https://economics.stackexchange.com/questions/12452/use-of-slutsky-equation#:~:text=You%20can%20calculate%20the%20substitution,s1%E2%88%82p1.)

Then generalizing for n dimensions:
![Dot-product notation x·y = x1 y1 + ... + xn yn; utility maximisation (choose x to maximise u(x) subject to x·p ≤ m, solution x*(p, m), the Marshallian demand) set beside cost minimisation (choose x to minimise x·p subject to u(x) ≥ u-bar, solution h(p, u-bar), the Hicksian demand)](../../assets/notes/year1/9485e131a428f1660948.png)
![The duality identities: feeding the maximised utility back into the cost-minimising problem returns the same bundle, h(p, u(x*(p, m))) = x*(p, m), and feeding the minimised cost back as income returns the Hicksian bundle, x*(p, h(p, u-bar)·p) = h(p, u-bar)](../../assets/notes/year1/abcda7ef32d26da1ac03.png)
