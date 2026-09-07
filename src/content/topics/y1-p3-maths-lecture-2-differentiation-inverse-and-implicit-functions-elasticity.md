---
title: "Lecture 2 - differentiation, inverse and implicit functions, elasticity"
paper: "Paper 3 — Quantitative Methods"
year: "Year 1 (Part I)"
section: "Mathematics"
description: "Lecture 2 - differentiation, inverse and implicit functions, elasticity. Notes from the first-year Economics Tripos."
order: 2
tags: ["economics"]
draft: false
---

Slide extracts: University of Cambridge, Part I Paper 3 (Quantitative Methods), Mathematics. Worked examples in the slide extracts are reported from the course material [R]. Textbook results follow K. Sydsæter, P. Hammond, A. Strøm and A. Carvajal, *Essential Mathematics for Economic Analysis* (5th edn). Handwritten derivations are the author's own.

Basic rules for limits:
![Lecture slide: limit laws — if lim f(x) = A and lim g(x) = B as x → a, then the limit of the sum, product, quotient (B ≠ 0) and rth power behave as expected.](../../assets/notes/year1/d1a6af26ce17c81694fb.png)

Basic rules for derivatives:
![Lecture slide: differentiation rules at x = a — sum, constant multiple, product rule, and quotient rule with (g(a))² in the denominator.](../../assets/notes/year1/7ce4bf3c7578b61b9000.png)

Derivative of inverse function:
From leibniz notation
![Lecture slide: (dx/dy)(dy/dx) = 1.](../../assets/notes/year1/6bf298b3a631a6227b4e.png)
So if function is f(x). And we let inverse equal g(x). Then, **g'(x) = 1/f'(g(x))**

E.g/
![Handwritten worked example: f(x) = sin(x) on [−π/2, π/2] with inverse g(y) = arcsin(y); differentiating gives g'(y) = 1/cos(arcsin y) = 1/√(1 − y²).](../../assets/notes/year1/65e06358d1ebf1c6dfa3.png)

Implicit Function
![Lecture slide: implicit functions — demand D = P⁻¹ and supply S = e^{P−1} give equilibrium price Pᵉ = 1; with a per-unit tax τ the equilibrium 1/(Pᵉ(τ) + τ) = e^{Pᵉ(τ)−1} defines Pᵉ(τ) implicitly, differentiated by differentiating both sides. Author's annotation: Pᵉ defined by D = S, so implicit in τ.](../../assets/notes/year1/d489935ac0d7349ea9ed.png)

Elasticity of f wrt x
![Lecture slide: for f differentiable at x with f(x) ≠ 0, the elasticity of f with respect to x is (x / f(x)) f'(x).](../../assets/notes/year1/240eee12668bd0881bbf.png)

Conveniently this is equivalent to the logarithmic derivative of f(x) at x:
![Lecture slide: (x/f(x)) f'(x) = (f'(x)/f(x)) / (1/x) = d ln f(x) / d ln x — the elasticity as a logarithmic derivative.](../../assets/notes/year1/536d328f943838b8fbd8.png)

e.g. Consider finding the elasticity of quantity demanded with respect to price (PED):
1.  PED = dD/dP * (P/D)
2.  PED = d ln(D) / d ln(P) i.e. derivative of ln(D) over derivative of ln(P) both wrt price.
