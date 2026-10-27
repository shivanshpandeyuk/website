---
draft: false
title: "Lecture 4 - Optimisation I: convexity, bisection and Newton"
paper: "ST444 Computational Data Science"
year: "M.S. Statistics (LSE)"
section: "Computation"
description: "Types of optimisation problem, local and global minima, convexity, bisection on the derivative, forward and central finite differences, Newton's method with its convergence rate and failure modes, robust 1D methods and Horner's rule."
order: 4
tags: [statistics, computation, optimisation]
---

ST444, LSE, Autumn Term 2026, week 4. Reading: Givens and Hoeting, *Computational Statistics*, Ch. 2; Nocedal and Wright, *Numerical Optimization*, Ch. 2, 3 and 6 to 8. Also used: Gentle, *Computational Statistics* (2009), §3.4 and §6.1; Boyd and Vandenberghe, *Convex Optimization*, §3.1.

## Cheat sheet

- **General problem:** min or max $f(x_1,\dots,x_d)$ subject to functional constraints $g_i(x)\ge0$ or $=0$ and set constraints $x\in S$. Maximising f is minimising −f.
- **Discrete** ($S=\mathbb Z^d$) is usually harder than **continuous** ($S=\mathbb R^d$): combinatorial explosion, 10 variables with 10 values each give $10^{10}$ candidates.
- **Constrained** is usually harder than **unconstrained**. Equality constraints only: the Lagrangian $L(x,\lambda)=f(x)+\lambda g(x)$ turns it into a stationary-point problem in d + (number of constraints) variables. Linear objective and constraints: a linear programme (simplex, exponential worst case by Klee-Minty 1972; interior-point methods polynomial).
- **Stationary point:** $\nabla f(x)=0$. In 1D it is a local min, local max or inflection point. Global min ⇒ local min, not conversely.
- **Convex:** $tf(x)+(1-t)f(y)\ge f(tx+(1-t)y)$ for all x, y and $t\in[0,1]$. In 1D, smooth with $f''\ge0$ everywhere ⇒ convex.
- **Theorem:** for convex f, any local minimum is a global minimum. For differentiable convex f on ℝ, $f'(x)=0\iff x$ minimises f.
- **Bisection** on f′: needs $f'(a)<0<f'(b)$ and f′ continuous. Halve the bracket each step; $l_{k+1}=l_k/2$, error $\le C2^{-k}$ (linear rate, ratio 1/2). Iterations to width ε: $\lceil\log_2((b-a)/\varepsilon)\rceil$, e.g. 27 for ε = $10^{-8}$ on [0, 1].
- **Finite differences:** forward $\frac{f(x+\varepsilon)-f(x)}{\varepsilon}=f'(x)+O(\varepsilon)$; central $\frac{f(x+\varepsilon)-f(x-\varepsilon)}{2\varepsilon}=f'(x)+O(\varepsilon^2)$. Central is better. ε cannot be too small (rounding): roughly $\varepsilon\approx10^{-8}$ forward, $10^{-5}$ to $10^{-6}$ central in double precision.
- **Newton (1D optimisation):** $x^{k+1}=x^k-\frac{f'(x^k)}{f''(x^k)}$, from linearising f′ at $x^k$ and setting it to 0. Stop when **both** $|x^k-x^{k-1}|$ and $|f'(x^k)|$ are small; also cap iterations; relative tolerance $|x^k-x^{k-1}|\le\varepsilon(1+|x^k|)$.
- **Linear rate:** $\frac{|x^{k+1}-x^*|}{|x^k-x^*|}\le\rho<1$. **Quadratic:** $\frac{|x^{k+1}-x^*|}{|x^k-x^*|^2}\le C$.
- **Newton error recursion:** $x^{k+1}-x^*=\frac{f^{(3)}(\tilde x)}{2f''(x^k)}(x^k-x^*)^2$. Quadratic if $|f''|$ is bounded away from 0, $|f^{(3)}|$ is bounded and $x^0$ is close to $x^*$. Correct digits roughly double each step.
- **Failures:** bad start (oscillation, divergence to ∞); $f=\frac34x^{4/3}$ gives $x^{k+1}=-2x^k$ (diverges from any $x^0\ne0$); $f=\frac13|x|^3$ gives $x^{k+1}=\frac12x^k$ (linear only, since $f''(0)=0$). Even convex smooth $f=\sqrt{1+x^2}$: $x^{k+1}=-(x^k)^3$, diverges for $|x^0|>1$.
- **Robust 1D in practice:** golden-section (bracket shrinks by 0.618 per step), Brent (bracket plus secant / inverse quadratic steps): R `optimize()`, `uniroot()`; Python `scipy.optimize.minimize_scalar`, `brentq`.
- **Statistics link:** Newton on −log-likelihood uses observed information; Fisher scoring uses expected information; they coincide for canonical-link GLMs, and `glm()`'s IRLS is Newton.
- **Horner:** $p(x)=a_0+x(a_1+x(a_2+\dots+x\,a_n))$: n multiplications, n additions.

## What is optimisation?

Given a real-valued function of d variables, where is it smallest (or largest), possibly with restrictions on where to look? Optimisation is the mathematical discipline concerned with finding maxima and minima of functions, possibly subject to constraints.

**General form.**

$$
\min_{x}\ (\text{or }\max)\ f(x_1,\dots,x_d)\quad\text{subject to}\quad g_i(x_1,\dots,x_d)\ge0\text{ or }=0,\quad (x_1,\dots,x_d)\in S.
$$

- f is the **objective function**; the $g_i$ are **functional constraints**; S gives **set constraints**; $x_1,\dots,x_d$ are the **decision variables**.
- Only minimisation is treated: maximising f is the same as minimising −f.
- An analytical optimum is often hard to find for an arbitrary f, so the course approaches the problem numerically.

**Types of models.** Stochastic (probabilistic information on the data) vs deterministic (data certain). Deterministic splits into discrete/integer ($S=\mathbb Z^d$) and continuous ($S=\mathbb R^d$); each can be convex (f and the feasible set convex) or non-convex; convex problems split into linear (f and the g's linear) and nonlinear.

## Discrete vs continuous

Discrete optimisation combines combinatorics, graph theory and linear programming to optimise over discrete structures; the travelling salesman problem (Lecture 3) is the standard example.

- Discrete problems are typically **harder** because of the **combinatorial explosion**: two variables with 10 values each give 10 × 10 = 100 candidates; ten such variables give $10^{10}$.
- The rest of the course focuses on continuous optimisation.

## Constrained vs unconstrained

Unconstrained: min $f(x_1,\dots,x_d)$. Constrained: the same with restrictions. One objective, $f(x,y)=x^2+2y^2$, under four regimes:

1. **Unconstrained.** $f\ge0$ with equality only at (0, 0): minimum 0 at the origin.
2. **x > 0.** f can be made as close to 0 as desired (take y = 0, x → 0⁺) but x = 0 is excluded: the infimum 0 is **not attained**, so there is no minimiser. Strict inequalities give open feasible sets; this is why constraints are normally written with ≥.
3. **−2 < x < 5, y ≥ 1.** Minimise each term separately: $x^2$ is smallest at x = 0 (allowed), $2y^2$ at the boundary y = 1. Minimum **2 at (0, 1)**: the constraint is active in y only.
4. **x + y = 2** (Lagrange). $L=x^2+2y^2+\lambda(x+y-2)$.
   1. $\partial L/\partial x=2x+\lambda=0$ and $\partial L/\partial y=4y+\lambda=0$, so $2x=4y$, i.e. x = 2y.
   2. Substitute into x + y = 2: 3y = 2, so y = 2/3, x = 4/3.
   3. Value $16/9+8/9=24/9=8/3$. Check by substitution: $(2-y)^2+2y^2$ has derivative $-2(2-y)+4y=6y-4=0$ at y = 2/3.

The constraint can exclude the region where the unconstrained optimum lives, so the constrained optimum sits on the boundary of the feasible set.

**Why constrained is harder.**

- With **equality constraints only**, the **method of Lagrange multipliers** converts the problem into finding stationary points of an unconstrained function with (original variables + number of equality constraints) variables. In 2D with one constraint: $L(x_1,x_2,\lambda)=f(x_1,x_2)+\lambda g(x_1,x_2)$.
- If the **objective and all hard constraints are linear**, it is a **linear programming problem**, solved by the **simplex method**: fast in practice **but exponential in the worst case** (Klee-Minty, 1972). Interior-point methods solve LPs in polynomial time.

## Local minimum, global minimum, stationary point

- A **global minimum** is the smallest value of f over the given set. A **local minimum** is a minimum within some neighbourhood.
- Every global minimum is a local minimum; a local minimum need not be global.
- A **stationary (critical) point** is where all partial derivatives vanish, i.e. the gradient is zero. One equation per input variable: a function of two inputs (a surface in 3D) needs both $\partial f/\partial x=0$ and $\partial f/\partial y=0$.
- In 1D a stationary point is a local max, a local min or an inflection point. So $f'(x)=0$ is necessary for an interior minimum of a differentiable f, not sufficient.

## Convex vs non-convex

**Intuition.** Pick any two points on the graph and join them with a straight chord. f is convex if the graph never rises above that chord.

**Definition.** $f:\mathbb R^d\to\mathbb R$ is convex if for all x, y and all $t\in[0,1]$

$$
t\,f(x)+(1-t)\,f(y)\ \ge\ f\big(tx+(1-t)y\big).
$$

- Left side: the point a fraction t along the chord between $(x,f(x))$ and $(y,f(y))$. Right side: the function at the matching input. In 1D with end points $x_1,x_2$ (any two points, not necessarily symmetric about anything), the chord point is $tf(x_1)+(1-t)f(x_2)$; watch the brackets.
- In 2D, the surface value at the mixed input sits below the chord between the two end points.

**Convexity, continuity and differentiability.**

- **Not always differentiable:** $f(x)=|x|$ is convex (the chord inequality is the triangle inequality) but has no derivative at 0. Similarly $\max(x,0)$.
- **Continuous on an open interval:** a convex f on (a, b) is continuous there; at interior points it even has left and right derivatives. On a **closed** interval it can jump at the end points: f = 1 at x = 0 and f = 0 on (0, 1] is convex on [0, 1] but not continuous at 0.
- **Continuous does not imply convex:** sin x is continuous and not convex.

**Convex functions are common.**

- Least squares $\lVert y-X\beta\rVert^2$ is convex in β (its Hessian $2X^\top X$ is positive semidefinite).
- In 1D, a smooth f with $f''(x)\ge0$ for all x is convex. The "for all x" matters: $f''\ge0$ at one point says nothing.
- Many non-convex functions are **locally convex**, for example in the wells around a local and a global optimum, so convex-problem techniques can still be used near a minimum.

### Theorem: any local minimum of a convex function is a global minimum

**Setting.** f convex on a convex set, $x^*$ a local minimum: there is r > 0 with $f(z)\ge f(x^*)$ whenever $\lVert z-x^*\rVert<r$.

1. **Suppose not.** Then some y has $f(y)<f(x^*)$.
2. **Walk from** $x^*$ **towards y.** For $t\in(0,1]$ let $z_t=(1-t)x^*+ty$. Its distance from $x^*$ is $t\lVert y-x^*\rVert$, which is less than r once t is small enough.
3. **Apply convexity:** $f(z_t)\le(1-t)f(x^*)+tf(y)$.
4. **Use step 1:** since $f(y)<f(x^*)$ and t > 0, the right side is strictly less than $(1-t)f(x^*)+tf(x^*)=f(x^*)$.
5. So points $z_t$ arbitrarily close to $x^*$ have $f(z_t)<f(x^*)$, contradicting local minimality. Hence no such y exists and $x^*$ is global. ∎

> Contradiction is natural here because "local" is a statement about a neighbourhood and the aim is to rule out one bad point anywhere. But "for any" does not demand contradiction in general: many universal statements are proved directly (fix an arbitrary x and argue). Pick the method by structure, not by the word.

> **Corollary.** If f is convex and differentiable on ℝ, then $f'(x^*)=0$ ⇒ $x^*$ is a global minimiser. Reason: convexity gives $f(y)\ge f(x^*)+f'(x^*)(y-x^*)$ for all y (the tangent lies below the graph), and the last term is 0.

> **Boyd and Vandenberghe, §3.1.** §3.1.1 (definition), §3.1.3 first-order condition $f(y)\ge f(x)+\nabla f(x)^\top(y-x)$, §3.1.4 second-order condition $\nabla^2f\succeq0$. The tangent-below-the-graph inequality is the general-d version of the corollary above.

## The role of optimisation in statistics

A real-world problem, plus reasonable assumptions, abstraction, data and simplifications, gives a **statistical model with a few parameters**: this is the objective function. An **optimisation algorithm** produces the fitted model; interpretation gives a solution; then ask whether it makes sense and, if not, change the model or assumptions.

> Precisely: the model defines the objective, e.g. the negative log-likelihood $-\ell(\theta)$ or a residual sum of squares; the parameters are the decision variables. MLE, least squares, ridge, lasso and logistic regression are all instances.

## Choosing a method; the problem in focus

The method depends on: the size d; whether $\nabla f$ and the Hessian $\nabla^2f$ are available; the accuracy required; global or local minimum; and the convexity of f.

The focus is the **unconstrained smooth (convex)** problem $\min_{x\in\mathbb R^d}f(x)$, starting with d = 1.

## One-dimensional optimisation: bisection

**Idea.** If f is differentiable and x minimises it, then $f'(x)=0$. For convex f the converse holds too, so minimising f is **equivalent to finding a root of f′**. Aim: find x with $|x-x^*|<\varepsilon$, or a sequence $x^k$ with $|x^k-x^*|<\varepsilon$ for large k.

**Bracket.** Suppose f′ can be evaluated anywhere and there are a < b with $f'(a)<0$ and $f'(b)>0$, f′ continuous. By the intermediate value theorem f′ has a zero in (a, b).

**Algorithm.**

1. If b − a is sufficiently small, return a (or b, or anything between) and stop. This is the base case, since a ≈ b.
2. Else compute the midpoint c = (a + b)/2.
3. Evaluate f′(c).
4. Replace either (a, f′(a)) or (b, f′(b)) by (c, f′(c)) so that a zero crossing stays inside the new interval: if f′(c) < 0 set a = c, else set b = c.

> The method needs opposite signs at the two ends: $f'(a_1)<0$ on the left and $f'(b_1)>0$ on the right. The brackets $[a_k,b_k]$ are nested, with midpoints $c_2,c_3,\dots$.

**Worked example.** Minimise $f(x)=x^4/4-2x$, so $f'(x)=x^3-2$, $f''(x)=3x^2\ge0$ (convex), $x^*=2^{1/3}=1.259921$. Bracket [0, 2]: f′(0) = −2 < 0, f′(2) = 6 > 0.

| k | c | f′(c) | new bracket |
| --- | --- | --- | --- |
| 1 | 1 | −1 | [1, 2] |
| 2 | 1.5 | 1.375 | [1, 1.5] |
| 3 | 1.25 | −0.047 | [1.25, 1.5] |
| 4 | 1.375 | 0.600 | [1.25, 1.375] |
| 5 | 1.3125 | 0.261 | [1.25, 1.3125] |

After 5 steps the width is $2/2^5=0.0625$. It is the same root as `brentq(lambda x: x**3 - 2, 0, 2)` = 1.2599210498949451.

## Numerical differentiation

What if f′ is unknown? Approximate it by finite differences. Which of these is better?

$$
\text{(1) forward: } f'(x)\approx\frac{f(x+\varepsilon)-f(x)}{\varepsilon},\qquad \text{(2) central: } f'(x)\approx\frac{f(x+\varepsilon)-f(x-\varepsilon)}{2\varepsilon}.
$$

(1) is the definition of the derivative. (2) is the average of the forward and backward differences: $\frac12\Big[\frac{f(x+\varepsilon)-f(x)}{\varepsilon}+\frac{f(x)-f(x-\varepsilon)}{\varepsilon}\Big]=\frac{f(x+\varepsilon)-f(x-\varepsilon)}{2\varepsilon}$.

**Theorem.**

$$
\frac{f(x+\varepsilon)-f(x)}{\varepsilon}=f'(x)+O(\varepsilon),\qquad \frac{f(x+\varepsilon)-f(x-\varepsilon)}{2\varepsilon}=f'(x)+O(\varepsilon^2).
$$

Proof by Taylor expansion (f three times continuously differentiable):

1. Expand: $f(x+\varepsilon)=f(x)+\varepsilon f'(x)+\tfrac12\varepsilon^2f''(x)+\tfrac16\varepsilon^3f'''(x)+O(\varepsilon^4)$.
2. Same with −ε: $f(x-\varepsilon)=f(x)-\varepsilon f'(x)+\tfrac12\varepsilon^2f''(x)-\tfrac16\varepsilon^3f'''(x)+O(\varepsilon^4)$.
3. **Forward:** rearrange step 1 and divide by ε: $\frac{f(x+\varepsilon)-f(x)}{\varepsilon}=f'(x)+\tfrac12\varepsilon f''(x)+O(\varepsilon^2)$. The leading error is $\tfrac12\varepsilon f''(x)$: O(ε).
4. **Central:** subtract step 2 from step 1. The even-order terms ($f(x)$ and $\tfrac12\varepsilon^2f''$) cancel: $f(x+\varepsilon)-f(x-\varepsilon)=2\varepsilon f'(x)+\tfrac13\varepsilon^3f'''(x)+O(\varepsilon^5)$.
5. Divide by 2ε: $\frac{f(x+\varepsilon)-f(x-\varepsilon)}{2\varepsilon}=f'(x)+\tfrac16\varepsilon^2f'''(x)+O(\varepsilon^4)$. Leading error $\tfrac16\varepsilon^2f'''(x)$: O(ε²). ∎

So the central difference is better: halving ε cuts its error by about 4, the forward error by about 2. It costs the same two function evaluations.

**ε cannot be too small** (the error curve turns noisy for ε below about $10^{-15}$). Each evaluation of f carries a rounding error of about $u|f|$ with machine epsilon $u\approx2.2\times10^{-16}$; dividing by ε amplifies it to about $u|f|/\varepsilon$. Total error ≈ truncation + rounding.

> **Numbers (f = sin, x = 1, true f′ = cos 1).** Errors of forward / central: ε = 0.1: 4.3e−2 / 9.0e−4; ε = 0.01: 4.2e−3 / 9.0e−6; ε = 1e−4: 4.2e−5 / 9.0e−10; ε = 1e−6: 4.2e−7 / 2.8e−11; ε = 1e−8: 3.0e−9 / 2.6e−9; ε = 1e−10: 5.8e−8 / 5.8e−8; ε = 1e−12: 4.3e−5 / 1.2e−5. The constants match the theory: $\tfrac12\sin1=0.42$ and $\tfrac16\cos1=0.090$. Below about $10^{-6}$ (central) or $10^{-8}$ (forward) rounding takes over. Balancing the two error terms gives $\varepsilon\approx\sqrt u\approx1.5\times10^{-8}$ for forward and $\varepsilon\approx u^{1/3}\approx6\times10^{-6}$ for central differences (up to scale factors).

**Extensions.**

1. **Higher-order derivatives.** Add steps 1 and 2 instead: the odd terms cancel, giving $\frac{f(x+\varepsilon)-2f(x)+f(x-\varepsilon)}{\varepsilon^2}=f''(x)+\tfrac1{12}\varepsilon^2f^{(4)}(x)+O(\varepsilon^4)$. Check: sin at x = 1 with ε = 1e−4 gives −0.8414709818 vs −sin 1 = −0.8414709848. Rounding is worse here (division by ε²), so ε must be larger.
2. **More than one dimension.** Perturb one coordinate at a time with unit vectors $e_i$: $\partial f/\partial x_i\approx\frac{f(x+\varepsilon e_i)-f(x-\varepsilon e_i)}{2\varepsilon}$. A full central-difference gradient costs 2d evaluations of f; a Hessian about $O(d^2)$.

> **Gentle, §3.4, pp. 132-133: Richardson extrapolation.** If a computed quantity has error $ch^n$ in a step h, computing it at h and rh and combining as $x_R=\frac{x_{rh}-r^nx_h}{1-r^n}$ (eq. 3.22) removes the leading error. Applied to the forward difference (n = 1, r = 1/2), $2D(\varepsilon/2)-D(\varepsilon)$ is $O(\varepsilon^2)$ accurate, the same order as the central difference: the same "cancel the leading Taylor term" idea as step 4. Watch for the second difference on p. 132, printed as $\Delta^2x_n=x_{n+2}-2x_{n-1}+x_n$; it should be $x_{n+2}-2x_{n+1}+x_n$, as the definition just above it implies.

## Newton's method

Bisection uses **only the sign of the first derivative**. If f″ is also known, Newton's method (Newton-Raphson) does better.

**Derivation.**

1. Linearise f′ at the current point (first-order Taylor): $f'(x^{k+1})\approx f'(x^k)+f''(x^k)(x^{k+1}-x^k)$.
2. The next point should be stationary: set $f'(x^{k+1})\approx0$.
3. Solve for $x^{k+1}$ (needs $f''(x^k)\ne0$):

$$
x^{k+1}=x^k-\frac{f'(x^k)}{f''(x^k)}.
$$

- Equivalently, $x^{k+1}$ minimises the quadratic model $f(x^k)+f'(x^k)(x-x^k)+\tfrac12f''(x^k)(x-x^k)^2$ when $f''(x^k)>0$. If $f''(x^k)<0$ the step heads for a maximum: Newton finds stationary points, not specifically minima.
- Stop when $|x^k-x^{k-1}|$ **and** $|f'(x^k)|$ are both small; beyond that there is no point doing more.

**Picture.** The curve plotted is f′, not f. Draw its tangent $f'(x^0)+f''(x^0)(x-x^0)$ at $x^0$; where the tangent crosses zero is $x^1$; repeat to $x^2$, approaching $x^*$.

**Worked example, same f as in bisection:** $f'(x)=x^3-2$, $f''(x)=3x^2$, so $x^{k+1}=x^k-\frac{(x^k)^3-2}{3(x^k)^2}$, start $x^0=1$.

| k | $x^k$ | $\lvert x^k-x^*\rvert$ |
| --- | --- | --- |
| 1 | 1.333333 | 7.3e−2 |
| 2 | 1.263889 | 4.0e−3 |
| 3 | 1.259933 | 1.2e−5 |
| 4 | 1.2599210500 | 1.2e−10 |

Four Newton steps beat 5 bisection steps (error 0.06) by eight orders of magnitude. The ratios $e_{k+1}/e_k^2$ are 0.74, 0.79, 0.79, approaching $\frac{f'''(x^*)}{2f''(x^*)}=\frac{6x^*}{6(x^*)^2}=1/x^*=0.794$ (see the error recursion below).

**History.** Raphson published the method in *Analysis Aequationum Universalis* (1690); Newton's similar formula in the *Method of Fluxions* appeared only in 1736. The modern calculus form x − f(x)/f′(x) is due to Thomas Simpson (1740), who also noted its use for optimisation by setting the derivative to zero. Stigler's law: no scientific discovery is named after its original discoverer (Stigler credited it to Merton, so the law obeys itself).

## Convergence criteria

**Template:** $x^0$ = initial guess; k = 0; while (???): $x^{k+1}=x^k-f'(x^k)/f''(x^k)$, k = k + 1. What goes in the while? Candidates: $|x^k-x^{k-1}|<\varepsilon$ and $|f'(x^k)|<\varepsilon$.

- Also cap the iterations: stop at $k=k_{\max}$ and **report failure**.
- Use a relative tolerance when x is large: $|x^k-x^{k-1}|\le\varepsilon(1+|x^k|)$, with ε chosen small. The "1 +" keeps it sensible when $x^k$ is near 0.

**Why both checks.**

- **A Δx check is needed.** If f′ is very flat, $|f'(x^k)|<\varepsilon$ although $x^*$ is far away. The step $|x^k-x^{k-1}|$ is still large, which reveals that the iterates have not settled.
- **An f′(x) check is needed.** If f′ is very steep, the step is tiny although $f'(x^k)$ is still far from zero.
- Each check alone can be fooled by the shape of f′; together they guard against both failure modes.

## Theory: rates of convergence

**Definitions.** For a sequence $x^k\to x^*$:

$$
\text{linear: }\frac{|x^{k+1}-x^*|}{|x^k-x^*|}\le\rho\in(0,1),\qquad \text{quadratic: }\frac{|x^{k+1}-x^*|}{|x^k-x^*|^2}\le C,\qquad\text{for all sufficiently large }k.
$$

Linear: the error shrinks by a fixed factor (a fixed number of correct digits gained per step). Quadratic: the new error is proportional to the square of the old one (the number of correct digits roughly doubles).

**Bisection.** With $l_k$ the bracket length, $l_{k+1}\le\frac12l_k$, so $|x^{k+1}-x^*|\le C2^{-k}$: resembling a linear rate with ρ = 1/2, one bit per step.

**Newton's error recursion.**

1. Taylor's theorem with Lagrange remainder, f′ expanded at $x^k$ and evaluated at $x^*$: $0=f'(x^*)=f'(x^k)+f''(x^k)(x^*-x^k)+\tfrac12f^{(3)}(\tilde x)(x^*-x^k)^2$, for some $\tilde x$ between $x^k$ and $x^*$.
2. Definition of the Newton step: $0=f'(x^k)+f''(x^k)(x^{k+1}-x^k)$.
3. Subtract 1 from 2; the $f'(x^k)$ and $f''(x^k)x^k$ terms cancel: $f''(x^k)(x^{k+1}-x^*)=\tfrac12f^{(3)}(\tilde x)(x^k-x^*)^2$.
4. Divide by $f''(x^k)$:

$$
x^{k+1}-x^*=\frac{f^{(3)}(\tilde x)}{2f''(x^k)}\,(x^k-x^*)^2.
$$

So Newton converges **quadratically** if:

1. $|f''|$ is **bounded away from zero** (else the denominator blows the constant up);
2. $|f^{(3)}|$ is **bounded above**;
3. the start $x^0$ is **not too far** from $x^*$ (needed so that $C|x^0-x^*|<1$, making the errors shrink).

Then $|x^{k+1}-x^*|\le\delta^{2^k}$ for some fixed $0<\delta<1$ and large k.

> **Where** $\delta^{2^k}$ **comes from.** Let $e_k=|x^k-x^*|$ and $e_{k+1}\le Ce_k^2$. Multiply by C: $Ce_{k+1}\le(Ce_k)^2$. Iterating, $Ce_k\le(Ce_0)^{2^k}$, so with $\delta=Ce_0<1$ the error is at most $\delta^{2^k}/C$. Condition 3 is exactly $Ce_0<1$.

**Linear vs quadratic in practice.**

- Bisection halves the bracket each time, so it needs $\lceil\log_2((b-a)/\varepsilon)\rceil$ iterations: **27** to reach ε = $10^{-8}$ from [0, 1] (check: $\log_2 10^8=26.58$).
- Newton near $x^*$ roughly doubles the correct digits per step: about 1, 2, 4, 8, 16.
- So once it is close, Newton needs only a handful of steps, **but it must get close first**. On a plot of error against k, the quadratic curve can start above the linear one and cross it late (around k = 17 in the lecture's example), then plunge.

> **Gentle §6.1, pp. 246-251: bisection vs Newton on the same root-finding problem.** Gentle solves $g(x)=x^3-4x^2+18x-115=0$ (eq. 6.4), single root x = 5 (check: 125 − 100 + 90 − 115 = 0); here g plays the role of f′. Bisection from [2, 9] (Table 6.1, p. 248): first step midpoint 5.5, g(5.5) = 29.375 > 0, so the upper end moves to 5.5; the bracket after 35 steps has length $7\cdot2^{-35}$ (about $2\times10^{-10}$). Each bisection step gains one bit, and bisection needs continuity but not differentiability. Newton (Fig. 6.2, p. 250) uses $g'(x)=3x^2-8x+18$, which is never 0 (discriminant 64 − 216 < 0), so step 1 of Algorithm 6.3 is always defined. From $x^0=9$: 6.6085, 5.3826, 5.0278, 5.00016, 5.000000005, then 5 to machine precision: six Newton steps against 35 bisection steps. The convergence analysis (p. 251) is the same Taylor-with-remainder argument as above, stated for root finding: the ratio $\frac{x_0-x^{(k+1)}}{(x_0-x^{(k)})^2}$ tends to $\frac{g''}{2g'}$ evaluated near the root.
>
> Definitions (§3.4, p. 131): Gentle calls the exponent r in $\lim\Delta(x^{(k+1)},x_0)/\Delta(x^{(k)},x_0)^r=c$ the **rate** and c the **rate constant** ("Q-linear", "Q-quadratic"); ratio 0 for r = 1 is **superlinear**. The lecture's ≤ version for all large k is the bound form of the same idea.

## When Newton's method fails

**Example one: bad starting point.** On a wiggly f′, the tangent from a poor start can send the iterates back and forth between two points (oscillation) or out along a flat tail where f′ → 0 but never reaches zero (converges to ∞).

- Remedies: a **hybrid**, with bisection for the first few iterations and Newton afterwards; or try multiple starting points.

**Example two: divergence.** $f(x)=\frac34x^{4/3}$, stationary point $x^*=0$.

1. $f'(x)=x^{1/3}$, $f''(x)=\frac13x^{-2/3}$.
2. Newton step: $x^{k+1}=x^k-\frac{(x^k)^{1/3}}{\frac13(x^k)^{-2/3}}=x^k-3x^k=-2x^k$.
3. From $x^0=1$: −2, 4, −8, …; $|x^k|=2^k|x^0|$, sign alternating.

From **any** $x^0\ne0$, however close to 0, the iterates move away: the error doubles each step. The cause is f″: it blows up as x → 0 ($f''(x)=\frac13|x|^{-2/3}$), so f′ is steep at the root but flat away from it, and the tangent from $x^k$ overshoots to $-2x^k$. In the theory's terms, f′ is not differentiable at $x^*$ and $f^{(3)}$ is unbounded near 0, so condition 2 fails and no start is "close enough".

**Convex and smooth is not enough:** $f(x)=\sqrt{1+x^2}$.

1. $f'(x)=\frac{x}{\sqrt{1+x^2}}$, $f''(x)=(1+x^2)^{-3/2}>0$ (convex, infinitely differentiable, minimum at 0).
2. Newton step: $x-\frac{x(1+x^2)^{-1/2}}{(1+x^2)^{-3/2}}=x-x(1+x^2)=-x^3$.
3. So $x^{k+1}=-(x^k)^3$: if $|x^0|<1$ it converges (fast: 0.5 → −0.125 → 0.00195 → −7.5e−9); if $|x^0|=1$ it oscillates between ±1 forever; if $|x^0|>1$ it diverges (1.1 → −1.331 → 2.358 → −13.1 → 2253).

Convexity guarantees that a stationary point is the minimum; it does **not** guarantee that pure Newton reaches it. f″ decays like $|x|^{-3}$ in the tails, so far-out steps are huge.

**Example three: subquadratic rate.** $f(x)=\frac13|x|^3$, $x^*=0$.

1. $f'(x)=\operatorname{sgn}(x)\,x^2$, $f''(x)=\operatorname{sgn}(x)\cdot2x=2|x|$.
2. Newton: $x^{k+1}-x^*=x^k-\frac{\operatorname{sgn}(x^k)(x^k)^2}{2|x^k|}=x^k-\frac{x^k}2=\frac12(x^k-x^*)$.
3. Linear rate with ratio 1/2: from $x^0=1$, 0.5, 0.25, 0.125, 0.0625.

> This is Newton converging at the **same linear rate as bisection** (error halves each step), not bisection itself: there is no bracket, and the iterates approach from one side only. The reason is condition 1: $f''(x^*)=0$, so $|f''|$ is not bounded away from zero and the quadratic constant $\frac{f^{(3)}}{2f''}$ blows up near the solution.

> **General pattern.** If f′ has a root of multiplicity m (i.e. $f''(x^*)=0$ when m ≥ 2), Newton is linear with ratio $(m-1)/m$. Here $f'=\operatorname{sgn}(x)x^2$ behaves like a double root, m = 2, ratio 1/2.

## Robust 1D methods in practice

- **Golden-section search:** like bisection but on f itself, no derivatives; the bracket shrinks by a factor 0.618 per step ($(\sqrt5-1)/2=0.6180$). R's `optimize()` combines it with parabolic interpolation (Brent's method).
- **Brent's root finder:** keeps a bracket like bisection but takes secant or inverse quadratic interpolation steps when they behave; always converges and is usually fast. The "bad starting point" hybrid done carefully. R `uniroot()`; Python `scipy.optimize.brentq`.
- **In statistics:** Newton-Raphson for maximum likelihood takes f = −log-likelihood, so f″ is the **observed information**. **Fisher scoring** uses the expected information instead; for GLMs with canonical link (e.g. logistic regression) the two coincide, and `glm()` fits by IRLS, i.e. Newton's method.
- Examples: `minimize_scalar(lambda x: (x - 2)**2).x` returns 1.9999999999999998 (Brent); `brentq(lambda x: x**3 - 2, 0, 2)` returns 1.2599210498949451, and $2^{1/3}=1.25992104989487$.

> **Finance analogue.** Solving for a bond's yield to maturity or an option's implied volatility is 1D root finding. Newton on implied vol uses vega as the derivative and is fast near the answer, but vega is tiny deep in or out of the money, which is condition 1 failing; production code brackets first (Brent) for exactly that reason.

> **Gentle §6.1, pp. 251-257: secant and regula falsi.** The secant method replaces the derivative in Newton's step by the slope through the last two iterates (Algorithm 6.4); like Newton, the two points need not bracket the root, so it can fail from a poor start. Regula falsi (Algorithm 6.5, the "Illinois" modification) keeps a bracket as in bisection but places the new point where the secant crosses zero; it generally converges more slowly than the secant method. Brent's method combines these ideas. Gentle's Figures 6.3 and 6.4 (pp. 252-253) show two Newton failures caused by a starting point too far from the zero. Gentle also calls the finite-difference version of Newton (eq. 6.9) the "discrete Newton's method", essentially the secant method.

## Interlude: Horner's method

Evaluate $p(x)=a_0+a_1x+a_2x^2+\dots+a_nx^n$ at $x_0$.

1. **How?** Nest the brackets: $p(x_0)=a_0+x_0\big(a_1+x_0(a_2+\dots+x_0(a_{n-1}+x_0a_n))\big)$. Algorithm: $b_n=a_n$; for i = n − 1 down to 0, $b_i=a_i+x_0b_{i+1}$; return $b_0$.
2. **How many operations?** Horner: n multiplications and n additions. Naive term-by-term with fresh powers: $\sum_{i=1}^ni=n(n+1)/2$ multiplications; with powers built up incrementally: 2n − 1 multiplications. Additions are n in every version.
3. **Optimal?** For a general polynomial evaluated once, yes: n additions and n multiplications are needed. With preprocessing of the coefficients for repeated evaluation, fewer multiplications are possible.

**Example.** $p(x)=2x^3-6x^2+2x-1$ at $x_0=3$: $b_3=2$; $b_2=-6+3\cdot2=0$; $b_1=2+3\cdot0=2$; $b_0=-1+3\cdot2=5$. Direct check: 54 − 54 + 6 − 1 = 5.

> **Why it is in an optimisation lecture.** Newton on a polynomial f needs f′ and f″ at each iterate; Horner's recursion run on the $b_i$ again gives $p'(x_0)$ at the same cost, and it is also more stable numerically than summing powers.

## Traps

- Sign at the left bracket: bisection needs $f'(a)<0<f'(b)$, not both positive.
- Missing brackets in the chord: $tf(x_1)+(1-t)f(x_2)$.
- "Convex ⇒ differentiable": false, |x|. "Continuous ⇒ convex": false, sin x. Convex on an open interval ⇒ continuous: true; at closed end points it can jump.
- $f''(x)\ge0$ at a point is not convexity; it is needed for all x.
- Stationary point ≠ minimum (inflection points, maxima). Newton finds stationary points and can head to a maximum when $f''(x^k)<0$.
- Strict-inequality constraints can leave the minimum unattained (the x > 0 example).
- Stopping on $|f'(x^k)|$ alone (fooled by flat f′) or on $|\Delta x|$ alone (fooled by steep f′).
- Taking ε as small as possible in finite differences: rounding error grows like $u/\varepsilon$.
- Calling the $\frac13|x|^3$ case "bisection": it is Newton at bisection's linear rate.
- Assuming convex + smooth ⇒ Newton converges: $\sqrt{1+x^2}$ diverges from $|x^0|>1$.
- Forgetting the iteration cap: an algorithm must terminate (Gentle pp. 243-244).

## Self-check

1. How many bisection steps reduce a bracket of length 4 to below $10^{-6}$? $\lceil\log_2(4\times10^6)\rceil=\lceil21.93\rceil=22$.
2. Newton for minimising $f(x)=x-\ln x$ (x > 0): write the step and the limit. $f'=1-1/x$, $f''=1/x^2$, so $x^{k+1}=x^k-(x^k)^2(1-1/x^k)=2x^k-(x^k)^2$; *converges to 1 for* $0<x^0<2$, *since* $1-x^{k+1}=(1-x^k)^2$: *exactly quadratic.*
3. Using the Taylor expansions above, find the error order of $\frac{-3f(x)+4f(x+\varepsilon)-f(x+2\varepsilon)}{2\varepsilon}$. *The ε² terms cancel (4·½ε² − ½(2ε)² = 0), so f′(x) + O(ε²).*
4. Newton on $f'(x)=x^2$ (i.e. $f=x^3/3$) from $x^0=1$: rate? $x^{k+1}=x^k/2$, *linear with ratio 1/2, because* $f''(0)=0$.
