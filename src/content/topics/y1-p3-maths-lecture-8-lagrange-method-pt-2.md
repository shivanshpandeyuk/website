---
title: "Lecture 8 - Lagrange method pt.2"
paper: "Paper 3 — Quantitative Methods"
year: "Year 1 (Part I)"
section: "Mathematics"
description: "Lecture 8 - Lagrange method pt.2. Notes from the first-year Economics Tripos."
order: 8
tags: ["economics"]
draft: false
---

Slide extracts: University of Cambridge, Part I Paper 3 (Quantitative Methods), Mathematics. The worked example is reported from the course material [R]. Textbook results follow K. Sydsæter, P. Hammond, A. Strøm and A. Carvajal, *Essential Mathematics for Economic Analysis* (5th edn). Notes and annotations are the author's own.

Readings from the textbook:14.1-5 
Suggested exercises (ex.) from the textbook:
14.1 ex. 1,2,5,8; 
14.2 ex. 4,5; 
14.3 ex.3,4; 
14.4 ex. 1,3; 
14.5 ex. 4

**Lagrange in action:**
Example 1
![Lecture slide: an agent has utility U(c₁, c₂) = 2 + 3(c₁^(1/3) − 1) + 3β(c₂^(1/3) − 1), where c₁, c₂ ≥ 0 are consumption in periods 1 and 2 and β is the discount factor. (a) Solve the utility-maximisation problem subject to c₁ + c₂ = 1. (b) With an added bequest z, so U(c₁, c₂, z) = that expression + z, β = 0.4 and constraint c₁ + c₂ + z = 1 with c₁, c₂, z ≥ 0, solve the problem.](../../assets/notes/year1/aae9acdb094c4dd29c5a.png)
Consider part (a), problem of maximising u(c1,c2), under constraint c1+c2=1 where:
$$u(c_1,c_2) = 2 + 3(c_1^\frac13-1)+3B(c_2^\frac13-1)$$
METHOD 1 (rewriting in terms of a single variable, c1, then maximising as per usual):
1. **Rewrite in terms of c1:** c1+c2 = 1 => c2 = 1-c1 substitute into eqn. above to get:
$$u(c_1) = 2 + 3(c_1^\frac13-1)+3B((1-c_1)^\frac13-1)$$
2. **F.O.C:** sets u'(c_1) = 0
Solving that gives the results, 
$$c_1 = \frac1{1+B^\frac32}$$
Likewise c2 can be found by using, c2 = 1-c1

3. **S.O.C:** Check that u''(c_1) < 0
If yes, then is local maxima.

4. **Checking the two boundary points (corners of the constraint)** if it is global maxima:
	1. So checking  utility at point: {c1 = 0, c2 = 1}
	2. Then checking utilitay at point: {c1 = 1, c2 = 0}

METHOD 2 (lagrangean constrained optimisation)
![Lecture slide: part (a) — the problem is equivalent to max 3c₁^(1/3) + 3βc₂^(1/3) s.t. c₁ + c₂ = 1 since the constant terms do not affect the choice; ignoring c₁, c₂ > 0, the Lagrangian L = 3c₁^(1/3) + 3βc₂^(1/3) − λ(c₁ + c₂ − 1) has FOC c₁^(−2/3) − λ = 0, βc₂^(−2/3) − λ = 0, c₁ + c₂ − 1 = 0; the first two give c₁^(−2/3) = βc₂^(−2/3), then the third gives c₁(1 + β^(3/2)) = 1, so c₁* = 1/(1 + β^(3/2)) and c₂* = β^(3/2)/(1 + β^(3/2)).](../../assets/notes/year1/1bdd14e2bfe56211a9fb.png)
We have to check if the candidate point meets the Hessian condition (a matrix that corresponds to the partial derivitaives of the function L: L_11, L_12, L_21, L_22), as we ignored the above conditions of c1>0 and c2>0 it is possible that the solution is not an interior solution but a corner/boundary solution. The hessian check tells us if the solution is interior, and that implies our candidate point is the required solution:
![Lecture slide: the Hessian of L(c₁, c₂, λ) for any λ is the diagonal matrix with entries −(2/3)c₁^(−5/3) and −(2β²/3)c₂^(−5/3); L₁₁ < 0 and L₁₁L₂₂ − (L₁₂)² > 0 at all interior points, so L is strictly concave and the critical point found is the global maximum.](../../assets/notes/year1/9783e2df57ba113a6396.png)

part (b)
METHOD 1 is impractical in this case, by substituting we can clear one variable. That leaves two variables to work with. Instead we use METHOD 2.
Maximise: $$u(c_1,c_2, z) = 2 + 3(c_1^\frac13-1)+3B(c_2^\frac13-1)+z$$
s.t.
$$c1 + c2 + z = 1$$
![Lecture slide: part (b) — maximising 3c₁^(1/3) + 3βc₂^(1/3) + z s.t. c₁ + c₂ + z = 1 with c₁, c₂, z ≥ 0; ignoring the non-negativity conditions, L = 3c₁^(1/3) + 3βc₂^(1/3) + z − λ(c₁ + c₂ + z − 1) with FOC c₁^(−2/3) − λ = 0, βc₂^(−2/3) − λ = 0, 1 − λ = 0 and the constraint; the third gives λ = 1, so c₁ = 1 and c₂ = β^(3/2), and the constraint then gives z = −β^(3/2), which contradicts z > 0, so there is no interior solution.](../../assets/notes/year1/5705eb96eb3ff03c4803.png)
**NOTE: It is very important to understand what assumptions are made in the Lagrangean method** that *we assume that the variables that are changing are positive.* (so we can spot discrepancies as per above). 

This could be spotted easily  via some economic thinking, and so more easily solved:
![Lecture slide: at least one of c₁, c₂, z is zero at the optimum; reasoning economically, with all three goods priced at 1 the marginal utility of c₁ is c₁^(−2/3), which exceeds 1 (the marginal utility of z) whenever c₁ < 1, so the consumer spends nothing on z until c₁ exceeds one unit; the budget constraint prevents spending more than 1 on c₁, so the optimal z is 0 and the problem reduces to part (a).](../../assets/notes/year1/d6d3a17749d662f04e1d.png)
