---
title: "Lecture 6 - Multivariable Optimisation"
paper: "Paper 3 — Quantitative Methods"
year: "Year 1 (Part I)"
section: "Mathematics"
description: "Lecture 6 - Multivariable Optimisation. Notes from the first-year Economics Tripos."
order: 6
tags: ["economics"]
draft: false
---

Slide extracts: University of Cambridge, Part I Paper 3 (Quantitative Methods), Mathematics. Worked examples in the slide extracts are reported from the course material [R]. Textbook results follow K. Sydsæter, P. Hammond, A. Strøm and A. Carvajal, *Essential Mathematics for Economic Analysis* (5th edn). Handwritten derivations and annotations are the author's own.

Readings from the textbook: 13.1-3 
Suggested exercises (ex.) from the textbook: 13.1 Ex.1-3; 13.2 Ex. 2-4, 13.3 Ex. 1,2,5,6.
![Lecture slide: a firm produces f(K, L) units from K units of capital and L units of labour; with output price p and input prices r and w, profit is pf(K, L) − rK − wL, and the profit-maximising firm solves max over K, L of that expression subject to K ≥ 0, L ≥ 0. K and L are choice variables; p, r, w are exogenous.](../../assets/notes/year1/e577000fa1d4efa8fde1.png)

In this case profit is the objective function, under inputs capital and labour. 

**First-order conditions for problem of maximising profit**
The partial derivatives wrt to K,L are equal to zero:
![Lecture slide: the first-order conditions for choosing K and L to maximise π(K, L) are π_K(K*, L*) = 0 and π_L(K*, L*) = 0.](../../assets/notes/year1/dc5f0fc57817dc0a045a.png)
So that in genereal we have the following:
![Lecture slide: if x* in the interior of the domain is a local maximum or minimum of a partially differentiable f, then f_i(x₁*, …, x_n*) = 0 for every argument i; f is the objective function, x₁…x_n the choice variables and D the constraint set.](../../assets/notes/year1/f4c8f1cf10d08bb048fa.png)

**Second order conditions**
In 2-D there are saddle points which mean that the second order condition is no longer as simple for checking its a maximium.
![Lecture slide: for one variable, f''(x) < 0 is sufficient to confirm a maximum, but checking ∂²f/∂x_i² < 0 for each variable separately is not sufficient when n > 1.](../../assets/notes/year1/6638aab33f2ad7db6d9f.png)
This is because partial derivatives check how the changes occur along an axis - consider moving 45 degrees ish in both axes then:
![Lecture slide: for f(x, y) = −x² + 4xy − y² on R², the FOC give (x, y) = 0 as the only critical point and both own second partials equal −2 < 0, yet 0 is not a local maximum because moving along (t, t) gives f(t, t) = 2t² > 0; such critical points are saddle points.](../../assets/notes/year1/54e849379c350673f207.png)
Graphically this looks like:
![3D surface plot of a saddle-shaped function: the surface curves downward along one diagonal and upward along the other.](../../assets/notes/year1/508153fe25cfdd6a1a82.png)
![Lecture slide: values of f along a line through 0 and (a, b) define φ(t) = f(at, bt); had 0 been a local maximum of f it would be a local maximum of every such φ(t), which could be checked with univariate FOC and SOC.](../../assets/notes/year1/c68adee352a90b6042e4.png)
The issue is that we are considering changes assuming the other is constant. Instead, we should consider x and y being variable and differentiate in that way. i.e. in the above example check the second derivative is < 0 for all *combos* of a,b. That requires taking **the total derivative**.

**The chain rule in two dimensions**
![Lecture slide with the author's handwritten label "total derivative — chain rule again": for f(x, y) with continuous partials and differentiable x(t), y(t), d/dt f(x(t), y(t)) = f_x x'(t) + f_y y'(t); with x = at, y = bt this is a·f_x + b·f_y, and applying the chain rule again gives a²f_xx + 2ab·f_xy + b²f_yy.](../../assets/notes/year1/2af1a2a098d3a3c6aa38.png)
(recall the formula): ![Textbook extract, section 9.5 "Total Differentials and Approximations": for z = f(x, y) whose partial derivatives exist, the total differential of z is dz = f_x(x, y)·dx + f_y(x, y)·dy.](../../assets/notes/year1/ffb6da9a8070befd982f.png)

Let's consider checking whether there is an extremum at zero:
![Lecture slide: if 0 is an interior local maximum of f(x, y) with continuous second partials, then φ(t) = f(at, bt) has a local maximum at 0 for all (a, b); sufficient conditions are φ'(0) = 0 (from the FOC) and φ''(0) = a²f_xx(0) + 2ab·f_xy(0) + b²f_yy(0) < 0 for all (a, b) ≠ 0.](../../assets/notes/year1/5a77b70cf17960914b87.png)
Now completing the square, then checking what is needed for the SOC:![Lecture slide with the author's annotations: completing the square in φ''(0) gives f_xx(0)·(a + b·f_xy(0)/f_xx(0))² + b²·[(f_xx(0)f_yy(0) − f_xy(0)²)/f_xx(0)]; this is negative for all (a, b) ≠ 0 iff f_xx(0) < 0 and f_xx(0)f_yy(0) − f_xy(0)² > 0, which also forces f_yy(0) < 0, so the Hessian is negative definite.](../../assets/notes/year1/d3ce8ffadcd4cc69484c.png)
Consider the following logic:
1. On the one hand if we let the second term be zero then the first term has to be negative which implies fxx(0) < 0.
2. we select a and b such that the the first term turns to zero. In that case the second term has to be negative. For that to hold the second fraction has to be negative, yet we already defined fxx(0) as negative thus the numerator must be positive. 
3. Looking closer at the numerator we can also deduce fyy(0)<0
Together this means the Hessian matrix is **negative-definite**. 
*NOTE: All 3 forms of the conditions are equivalent and can also be used see: *

So in summary:
![Lecture slide: for f(x): D → R on D ⊆ R² with continuous second partials, if x* is an interior extremum with f₁₁(x*) < 0 and f₁₁f₂₂ − f₁₂² > 0 then x* is a local maximum ("Hessian negative definite"); with f₁₁(x*) > 0 and the same determinant condition it is a local minimum ("Hessian positive definite"); both statements generalise to n dimensions.](../../assets/notes/year1/556ef38eed73b996b49d.png)
Here the inequalities are strict because only considering x*.

For example  consider the following maximisation problem:
![Lecture slide: a firm produces K^(1/3)L^(1/2) units sold at unit price 5, with input prices 3 for K and 2 for L; the problem is to maximise π(K, L) = 5K^(1/3)L^(1/2) − 3K − 2L s.t. K, L ≥ 0, and a positive output level corresponds to an interior solution.](../../assets/notes/year1/30afe7d213a7b7f2022b.png)
Then, 1. using the FOC to find the point and  2. checking the SOC if it's a maximum
![Lecture slide with the author's annotation "f_KK < 0, f_KK·f_LL − f_KL² > 0": the FOC give K* = 5⁶/6⁶ and L* = 5⁶/(2⁴6⁴), and the second-order conditions for a local maximum are verified directly, so (K*, L*) is a local maximum.](../../assets/notes/year1/00fa4303e8be389b312a.png)

This is a global maximum in the instance that the function is **concave**. It is a global minimum in the instance that the function is **convex**. *NOTE: convexity and concavity are defined on only convex domains.*
![Lecture slide: on a convex domain D ⊆ R² with continuous second partials, if f₁₁(x) ≤ 0 and f₁₁f₂₂ − f₁₂² ≥ 0 for all interior x then x* is a global maximum and f is concave; with f₁₁(x) ≥ 0 instead and the same determinant condition, f is convex and x* is a global minimum.](../../assets/notes/year1/17640231bd7efe72897f.png)
(NOTE: That we are considering this for any point, x in the domain)

Recall **convex domain** can be considered visually
![Author's freehand sketch on a dark background: a roughly circular shape labelled "convex domain" beside two irregular shapes labelled "not convex".](../../assets/notes/year1/6393f207486e2a9aaefb.png)
