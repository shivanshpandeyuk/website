---
title: "Lecture 7 - Lagrangean Method"
paper: "Paper 3 — Quantitative Methods"
year: "Year 1 (Part I)"
section: "Mathematics"
description: "Lecture 7 - Lagrangean Method. Notes from the first-year Economics Tripos."
order: 7
tags: ["economics"]
draft: false
---

Slide extracts: University of Cambridge, Part I Paper 3 (Quantitative Methods), Mathematics. Worked examples in the slide extracts are reported from the course material [R]. Textbook results and diagrams (Figures 14.4.1–14.4.2) follow K. Sydsæter, P. Hammond, A. Strøm and A. Carvajal, *Essential Mathematics for Economic Analysis* (5th edn). Handwritten derivations and annotations are the author's own.

Readings from the textbook:14.1-5 
Suggested exercises (ex.) from the textbook:14.1 ex. 1,2,5,8; 14.2 ex. 4,5; 14.3 ex.3,4; 14.4 ex. 1,3; 14.5 ex. 4
![Lecture slide with the author's annotations: a constrained problem max/min f(x, y) s.t. g(x, y) = c is solved by the Lagrange multiplier method — (1) form the Lagrangian L(x, y) = f(x, y) − λ[g(x, y) − c]; (2) set ∂L/∂x and ∂L/∂y to zero, which with the constraint give the first-order conditions f_x − λg_x = 0, f_y − λg_y = 0, g(x, y) − c = 0; (3) solve for x, y, λ to get the solution candidates.](../../assets/notes/year1/4336d5b2a239ed57f109.png)

**Interpretation of the Lagrange multiplier**
![Lecture slide with the author's label "from Lagrangean method": for max f(x, y) s.t. g(x, y) = c with candidate x*(c), y*(c), λ*(c), let f*(c) = f(x*(c), y*(c)); by the chain rule df*/dc = f_x·dx*/dc + f_y·dy*/dc, and since the FOC give f_x = λ*g_x and f_y = λ*g_y at the optimum.](../../assets/notes/year1/47edea578b94010b7c77.png)

Then substituting for all the partial derivatives not in terms of c:
![Lecture slide with the author's annotations: df*/dc = λ*(c)·(g_x·dx*/dc + g_y·dy*/dc); differentiating the constraint g(x*(c), y*(c)) = c gives g_x·dx*/dc + g_y·dy*/dc = 1, hence df*/dc = λ*(c).](../../assets/notes/year1/c9706a7ac7691be8a083.png)
The Lagrange multiplier is the rate at which the optimal value of the objective function changes with respect to changes in the constraint constant. This means if the constraint changes by small amount (differential dc) then:
![Lecture slide: λ*(c) is the rate at which the optimal objective value changes with the constraint constant, so f*(c + dc) − f*(c) ≈ λ*(c)·dc; when c is the available stock of a resource, λ*(c)·dc is the approximate gain from dc more units, and economists call λ a shadow price of the resource.](../../assets/notes/year1/ce2d50db4694c260fa37.png)
![Textbook diagrams (Figures 14.4.1 and 14.4.2) with the author's annotations "tangency of curve and line", "viable, not optimal": left, a 3D constrained-optimisation picture showing the surface z = f(x, y) and the constraint curve g(x, y) = c with points A, B, K; right, the level curves of f in the (x, y) plane touching the constraint g(x, y) = c tangentially at the optimum P.](../../assets/notes/year1/adbd0a71a3de1c08473c.png)
![Lecture slide with the author's annotations "chain rule", "slope at x*": along the level curve {(x, y) : f(x, y) = f(x*, y*)} viewed locally as y(x), differentiating f(x, y(x)) = f(x*, y*) gives f_x + f_y·y'(x) = 0, so y'(x*) = −f_x(x*, y*)/f_y(x*, y*).](../../assets/notes/year1/4ce970fe53b8752bfc10.png)
![Lecture slide: locally the constraint curve {(x, y) : g(x, y) = c} viewed as y(x) has slope y'(x*) = −g_x(x*, y*)/g_y(x*, y*); the level curve and the constraint curve must have the same slope at (x*, y*), so f_x/f_y = g_x/g_y, i.e. f_x/g_x = f_y/g_y; denoting this common value λ and adding the constraint gives Lagrange's FOC.](../../assets/notes/year1/e86f1e56696a062d0f55.png)

**Necessary and Sufficient conditions for method  to work**:
![Lecture slide "FOC are not sufficient. Example.": for max (xy) s.t. y = x², the Lagrangian xy − λ(y − x²) gives FOC y − 2λx = 0, x − λ = 0, y − x² = 0, so x = y = λ = 0; but substituting y = x² into xy gives x³, and x = 0 is neither a maximum nor a minimum of x³, so (0, 0) is not a solution.](../../assets/notes/year1/d315f04a00808b17a900.png)
![Lecture slide with the author's annotation "from the theorem": if (x₀, y₀) satisfies the FOC and is a global maximum of the Lagrangian L(x, y), then for any (x, y) satisfying the constraint the inequality f(x, y) − λ(g − c) ≤ f(x₀, y₀) − λ(g₀ − c) reduces to f(x, y) ≤ f(x₀, y₀), so (x₀, y₀) solves the constrained problem. Theorem (concave/convex Lagrangian): if (x₀, y₀) satisfy the FOC and the Lagrangian is concave, (x₀, y₀) solves the maximisation problem; if it is convex, they solve the minimisation problem.](../../assets/notes/year1/8148022e3ff6a85ca02f.png)
The concavity check of the Lagrangean (see previous lecture)
![Lecture slide with the author's annotation "check for concavity": for max √(ab) s.t. 4a + 9b = 16, the only FOC point was (a, b, λ) = (2, 8/9, 1/12); the Lagrangian L(a, b) = √(ab) − λ(4a + 9b − 16) is concave because for a, b > 0, L₁₁ = −¼a^(−3/2)b^(1/2) ≤ 0 and L₁₁L₂₂ − L₁₂² = 0 ≥ 0, so (a, b) = (2, 8/9) is the global maximum.](../../assets/notes/year1/3affbc38ea8b2b254e22.png)
