---
draft: false
title: "Lecture 5 - Optimisation II: descent methods, Newton and BFGS"
paper: "ST444 Computational Data Science"
year: "M.S. Statistics (LSE)"
section: "Computation"
description: "Why multi-dimensional optimisation is harder, descent directions, gradient and steepest descent under different norms, exact and backtracking line search, conditioning and convergence rates, stochastic gradient descent, Newton's method, quasi-Newton and BFGS, coordinate descent and the lasso, and choosing a smooth objective."
order: 5
tags: [statistics, computation, optimisation]
---

ST444, LSE, Autumn Term 2026, week 5. Reading: Givens and Hoeting, *Computational Statistics*, Ch. 2; Nocedal and Wright, *Numerical Optimization*, Ch. 3, 6 and 8; Boyd and Vandenberghe, *Convex Optimization*, Ch. 9. Also used: Gentle, *Computational Statistics* (2009), §5.4 and §6.2.

## Cheat sheet

- **Problem:** $\min_{x\in\mathbb R^d}f(x)$, unconstrained, f smooth (first and second partials exist), not necessarily convex.
- **Transects** (1D slices with the other coordinates fixed) are partial views: they can show many minima where there is one, or one peak where there are several. An $n\times n$ grid has $n^2$ points; the two transects through one point see $2n-1$ of them.
- **Generic descent loop:** pick a descent direction $p^k$, pick a step t with $f(x^k+tp^k)<f(x^k)$, set $x^{k+1}=x^k+tp^k$, repeat. Choosing t is a 1D problem (line search).
- **Descent direction:** any p with $\nabla f(x)^\top p<0$; then $f(x+tp)<f(x)$ for all small $t>0$ (first-order Taylor).
- **Second-order Taylor:** $f(x+p)\approx f(x)+\nabla f(x)^\top p+\tfrac12p^\top\nabla^2f(x)p$. Sufficient for a strict local min: $\nabla f(x^*)=0$ and $\nabla^2f(x^*)$ positive definite. PSD Hessian is only necessary ($x^2+y^3$ at 0).
- **Gradient descent:** $p^k=-\nabla f(x^k)$.
- **Steepest descent:** $p^k=\arg\min_v\{\nabla f(x^k)^\top v:\lVert v\rVert=1\}$. $L_2$: $-\nabla f/\lVert\nabla f\rVert_2$ (gradient descent). $L_1$: $-\operatorname{sign}(\partial_if)\,e_i$ with $i=\arg\max_j|\partial_jf|$ (one coordinate). Quadratic norm $\lVert v\rVert_P$: $p\propto-P^{-1}\nabla f$; with $P=\nabla^2f$ this is Newton.
- **Exact line search:** $t=\arg\min_{t>0}f(x^k+tp^k)$; usually not worth the cost.
- **Backtracking (Armijo):** $\alpha\in(0,1)$, $\beta\in(0,1)$; start t = 1, set $t\leftarrow\beta t$ until $f(x^k+tp^k)<f(x^k)+\alpha t\nabla f(x^k)^\top p^k$. Always terminates if $\nabla f\neq0$; the accepted t is 1 or within a factor β of a rejected step. In practice $\alpha<\tfrac12$ (0.1 to 0.3), β 0.5 to 0.8.
- **Stopping:** both $\lVert x^k-x^{k-1}\rVert<\varepsilon$ and $\lVert\nabla f(x^k)\rVert<\varepsilon$.
- **Rates:** gradient / steepest descent linear, $\lVert x^{k+1}-x^*\rVert<\rho\lVert x^k-x^*\rVert$. Newton locally quadratic, $\lVert x^{k+1}-x^*\rVert<C\lVert x^k-x^*\rVert^2$.
- **Conditioning:** quadratic with Hessian condition number κ: exact-line-search GD cuts $f-f^*$ by at most $\big(\frac{\kappa-1}{\kappa+1}\big)^2$ per step. κ = 2: 0.111 per step, 7 steps for $10^{-6}$. κ = 20: 0.819 per step, 70 steps.
- **SGD:** for $f(\beta)=\frac1n\sum_i\ell(\beta;X_i)$ a full gradient costs O(nd); SGD uses a random mini-batch gradient (unbiased, noisy) with decreasing step size. Adam adapts steps per coordinate.
- **Newton:** solve $\nabla^2f(x^k)p^k=-\nabla f(x^k)$, take t = 1, backtrack (halve) if no sufficient decrease. Needs $\nabla^2f(x^k)$ PD; otherwise use $\nabla^2f(x^k)+\gamma I$. Solve by Cholesky (about $d^3/3$ flops, PD test for free); never form the inverse.
- **Cost per iteration:** Newton $O(d^3)$ plus the Hessian ($d^2$ entries); BFGS $O(d^2)$; GD $O(d)$ plus the gradient.
- **Frozen Hessian:** reuse an old Hessian for several steps (it changes little near $x^*$).
- **Quasi-Newton:** $p^k=-[H^{k-1}]^{-1}\nabla f(x^k)$ with H updated cheaply. BFGS: $H^k=H^{k-1}+\frac{yy^\top}{y^\top s}-\frac{H^{k-1}ss^\top H^{k-1}}{s^\top H^{k-1}s}$, $s=x^k-x^{k-1}$, $y=\nabla f(x^k)-\nabla f(x^{k-1})$. Secant condition $H^ks=y$. Stays PD if $H^{k-1}$ is PD and the curvature condition $y^\top s>0$ holds. Non-examinable.
- **Neither Newton nor BFGS** really works for non-smooth problems.
- **Coordinate descent:** minimise over $x_1$, then $x_2$, ..., then $x_d$, each with the others at their latest values; repeat. Any order.
- **Coordinatewise min = global min?** f convex differentiable: yes. f convex non-differentiable: no ($3|x_1-x_2|+|x_1+x_2|$ is stuck at (2, 2) with f = 4; true min 0 at the origin). $f=g+\sum_ih_i(x_i)$ with g convex differentiable and each $h_i$ convex: yes. This covers the lasso.
- **Software:** scipy `minimize` defaults to BFGS (unconstrained); `L-BFGS-B` for large d or bounds; R `optim()` defaults to Nelder-Mead, so ask for `method = "BFGS"`; `glmnet` uses coordinate descent. Rosenbrock from (−1.2, 1): BFGS with gradient 32 iterations; without gradient 114 function evaluations.
- **Choose a smooth objective** when you can: for $\sqrt2$ minimise $(x^2-2)^2$, not $|x^2-2|$.

## Why multi-dimensional optimisation is harder

Last week we minimised a function of one variable. Now $f(x_1,\dots,x_d)$, no constraints, f smooth but not necessarily convex. Why can't we just reuse 1D methods?

There is no generic scheme that reduces a d-dimensional problem to a (d − 1)-dimensional one efficiently. Bisection worked in 1D because a sign change of f′ traps the minimiser in a shrinking interval; in 2D a sign change of one partial derivative traps nothing.

**Transects are partial views.** A transect fixes all coordinates but one and plots f along the remaining one.

- Fix $x_2$ and look at how f varies with $x_1$: the transect shows many local minima.
- But the full surface is a rippled bowl with **one** local minimum, which is global; heading downhill from anywhere reaches it. The slice went through the ripples off-centre, so the rings look like separate wells. This is the issue with partial analysis.
- The opposite failure: the $x_1$- and $x_2$-transects of g each show one peak (near 0.2 and 0.3), suggesting g is unimodal with maximum near (0.2, 0.3). The surface has three peaks. Each transect peak is only a stationary point of that slice, so you miss the full picture.
- Much of this comes from **non-convexity**. For convex differentiable f, a point that is a minimum along every axis is a global minimum (see coordinate descent below), so these illusions cannot hide where the minimum is.

Collapsing 2D to two 1D lines: an $n\times n$ grid has $n^2$ points, but looking partially you see only about 2n of them and miss the richness. In general, in d dimensions there are $n^d$ points, but d transects have n points each. This is the curse of dimensionality.

> **Exact count.** Transects through the same point share that point, so two transects see $2n-1$ grid points, and d transects see $d(n-1)+1$ out of $n^d$. With n = 100: d = 2 gives 199 of 10,000 (2%); d = 5 gives 496 of $10^{10}$. The fraction you inspect vanishes exponentially in d.

**Conclusions.** Plot transects before optimising, and transects through the apparent optimum afterwards (a cheap check that it is at least a minimum along each axis), but remember they are partial views.

## The search direction method

$f(x_1,x_2)=e^{x_1+3x_2-0.1}+e^{x_1-3x_2-0.1}+e^{-x_1-0.1}$: from $x^{(0)}$ there are infinitely many directions to try, some downhill, some not. Hence we use descent directions.

**Why is a descent direction no problem in 1D?** In 1D you can move left or right, and the sign of $f'(x)$ tells you which is downhill ($-\operatorname{sign}f'(x)$), so choosing the direction costs nothing: one number decides it. In d dimensions the directions form a whole sphere and the descent ones a half-space $\{p:\nabla f(x)^\top p<0\}$, so there is a genuine choice. What stays hard in 1D too is the step length.

**Algorithm.**

1. Start with some $x^0$.
2. Determine a descent direction $p^k$: pick a direction.
3. Choose a step size t with $f(x^k+tp^k)<f(x^k)$: choose how far to walk along it.
4. Update $x^{k+1}=x^k+tp^k$, then re-assess at the new point and find the next direction.
5. $k\leftarrow k+1$; back to step 2 until convergence; report $x^*\approx x^k$.

Choosing t is called **line search**. Once a descent direction is set, choosing the step size along it is a problem on a 1D line: $\phi(t)=f(x^k+tp^k)$ is a function of one variable, so last week's tools apply.

## Descent directions and Taylor's theorem

On a contour map the fastest way down is where the height lines are densest, perpendicular to the contours.

**Gradient and Hessian.**

$$
\nabla f(x)=\begin{pmatrix}\partial f/\partial x_1\\ \partial f/\partial x_2\\ \vdots\end{pmatrix},\qquad \nabla^2f(x)=\Big(\frac{\partial^2f}{\partial x_i\partial x_j}\Big)_{i,j}
$$

$$
f(x+p)\approx f(x)+\nabla f(x)^\top p+\tfrac12p^\top\nabla^2f(x)p.
$$

- The 1D analogue is $f(x+p)\approx f(x)+f'(x)p+\frac{f''(x)}2p^2$; $\nabla f(x)^\top p$ is the inner product of the gradient vector and the step p.
- **Sufficient condition:** $x^*$ is a (strict) local minimum if $\nabla f(x^*)=0$ and $\nabla^2f(x^*)$ is positive definite ($y^\top My>0$ for all $y\neq0$).
- Positive **semi**-definite ($y^\top My\ge0$) is only necessary. $f(x,y)=x^2+y^3$ has $\nabla f(0)=0$, $\nabla^2f(0)=\operatorname{diag}(2,0)$, yet $f(0,-\varepsilon)=-\varepsilon^3<0$.

**Why the sufficient condition works.**

1. At $x^*$ the linear term vanishes, so $f(x^*+p)\approx f(x^*)+\tfrac12p^\top\nabla^2f(x^*)p$ (Taylor with $\nabla f(x^*)=0$).
2. PD means $p^\top\nabla^2f(x^*)p\ge\lambda_{\min}\lVert p\rVert^2$ with $\lambda_{\min}>0$ (smallest eigenvalue).
3. For small p this quadratic term dominates the cubic remainder, so $f(x^*+p)>f(x^*)$ for all small $p\neq0$. With only PSD, $\lambda_{\min}=0$ and along that eigenvector the remainder decides, as in $x^2+y^3$.

## Gradient descent

$$
p^k=-\nabla f(x^k),
$$

−1 times the gradient at that point, which is a descent direction.

**Why it descends.**

1. First-order Taylor along $tp^k$: $f(x^k+tp^k)\approx f(x^k)+t\nabla f(x^k)^\top p^k$.
2. Substitute $p^k=-\nabla f(x^k)$: $=f(x^k)-t\lVert\nabla f(x^k)\rVert^2$.
3. If $\nabla f(x^k)\neq0$ the subtracted term is strictly positive and the Taylor remainder is $o(t)$, so for small enough t > 0, $f(x^k+tp^k)<f(x^k)$: we have successfully descended below $f(x^k)$.

Simple, but often slow; not hugely popular in practice (the conditioning section shows why).

> **Any descent direction works the same way.** Step 2 only needs $\nabla f(x^k)^\top p^k<0$. If $p^k=-B^{-1}\nabla f(x^k)$ with B positive definite, then $\nabla f^\top p^k=-\nabla f^\top B^{-1}\nabla f<0$. Gradient descent (B = I), Newton ($B=\nabla^2f$) and BFGS ($B=H^{k-1}$) all fit this template; Gentle calls them "gradient methods".

> **Gentle §6.2, p. 262: direction of search.** Gentle defines a descent direction as any p with $p^\top\nabla f(x)<0$ (an acute angle with $-\nabla f$) and writes the general direction as $Rp=-\nabla f(x)$ for a positive definite R (eq. 6.23); a method of this form is a "gradient method". Practical point: require $p^\top\nabla f(x)<-\epsilon$ for a small $\epsilon>0$ so rounding cannot flip a near-zero inner product. On p. 269 (eq. 6.36) he lists the three choices: R = I (steepest descent), R = Hessian (Newton), R = an approximation (quasi-Newton).

## Steepest descent

Among all unit-length directions, take the one along which f decreases fastest to first order:

$$
p^k=\arg\min_v\big\{\nabla f(x^k)^\top v:\ \lVert v\rVert=1\big\}.
$$

We select whichever direction minimises $\nabla f(x^k)^\top v$, since when this is negative it descends, and we force the direction vector to have norm 1.

> Note that "steepest" does not mean faster than gradient descent: convergence is usually similar whatever the norm. "Steepest" is relative to a chosen norm, the best direction per unit of length measured in that norm. In $L_2$ it **is** gradient descent. The norm matters because it changes which direction counts as steepest ($L_1$ gives coordinate moves; a Hessian-based norm gives Newton).

**Choice of norm.**

- Euclidean $\lVert\cdot\rVert_2$: $p^k=-\nabla f(x^k)/\lVert\nabla f(x^k)\rVert_2$, normalised gradient descent: with the $L_2$ norm this is literally just gradient descent.
- $L_1$ norm $\lVert\cdot\rVert_1$.
- Quadratic norm $\lVert v\rVert_P=(v^\top Pv)^{1/2}$, P positive definite.

**Proof of the $L_2$ case.** From first-order Taylor, $f(x^k+v)\approx f(x^k)+\nabla f(x^k)^\top v$, and we want the most negative value of this. Take d = 2 with $\nabla f=(f_1,f_2)$: minimise $f_1v_1+f_2v_2$ subject to $v_1^2+v_2^2=1$, by a Lagrangian.

1. Lagrangian $L(v,\lambda)=f_1v_1+f_2v_2+\lambda(v_1^2+v_2^2-1)$.
2. $\partial L/\partial v_1=f_1+2\lambda v_1=0$ and $\partial L/\partial v_2=f_2+2\lambda v_2=0$, so $v_1/f_1=v_2/f_2$: v is parallel to $\nabla f$.
3. With the constraint: $v=\pm\nabla f/\lVert\nabla f\rVert_2$.
4. The objective equals $\pm\lVert\nabla f\rVert_2$; the minus sign gives the minimum, $v=-\nabla f/\lVert\nabla f\rVert_2$, which is the same as gradient descent.

> **One-line version, any d.** Cauchy-Schwarz: $\nabla f^\top v\ge-\lVert\nabla f\rVert_2\lVert v\rVert_2=-\lVert\nabla f\rVert_2$, with equality iff $v=-\nabla f/\lVert\nabla f\rVert_2$.

**Pictures.** Draw the unit ball of the norm around x and go as far along $-\nabla f$ as the ball allows.

- $L_2$ ball (circle): the extreme point is exactly along $-\nabla f$: $p=-\nabla f/\lVert\nabla f\rVert_2$, "normalised steepest descent", as shown above.
- $L_1$ ball (diamond): a linear function is minimised over a diamond at a corner $\pm e_i$. So $p=-\operatorname{sign}(\partial f/\partial x_i)\,e_i$ with i the coordinate of largest $|\partial f/\partial x_i|$: move along one axis. The $L_1$ norm gives coordinate descent, not the same as gradient descent.

> **Worked example.** $\nabla f(x)=(2,-5,1)$. $L_2$: $p=(-2,5,-1)/\sqrt{30}=(-0.365,0.913,-0.183)$. $L_1$: the largest $|\partial_if|$ is 5 at i = 2 with negative sign, so $p=+e_2=(0,1,0)$. Both descend: $\nabla f^\top p=-\sqrt{30}=-5.48$ and −5. The $L_2$ direction wins per unit $L_2$ length; the $L_1$ direction wins per unit $L_1$ length (the $L_2$ direction has $L_1$ length 1.46).

> **Quadratic norm.** Minimising $\nabla f^\top v$ subject to $v^\top Pv=1$ gives $v\propto-P^{-1}\nabla f$ (same Lagrangian with $2\lambda Pv$ in place of $2\lambda v$). With $P=\nabla^2f(x^k)$ this is the Newton direction: steepest descent in the Hessian norm is Newton. Equivalently, change variables to $u=P^{1/2}x$ and do gradient descent in u.

## Exact line search

$$
t=\arg\min_{t>0}f(x^k+tp^k),
$$

using last week's 1D methods. The trade-off: we need reasonable progress, but should not spend much time finding the exact optimal distance, since the point is abandoned at the next iteration anyway.

> Note that a big step is not automatically better. Too long a step can increase f (overshooting to the other side of the valley); too short a step makes little progress. We want a step that is good enough and cheap to find. Backtracking does that: it starts long (t = 1) and shortens only as far as needed.

> **Gentle §6.2, pp. 263-264: line searches.** Steps shrinking to 0 do not guarantee convergence to $x^*$. Gentle's example: $f(x)=x^2$, $x^{(0)}=3$, $\alpha^{(0)}=1$, halving the step factor each iteration: the iterates head the right way but converge to 1, not 0. (This works if each step moves a distance $\alpha^{(k)}$ in the unit direction $-\operatorname{sign}(x)$: $3-(1+\tfrac12+\tfrac14+\dots)=3-2=1$. With the literal direction $p=-x$ the first step would land on 0, so read the book's "direction −x" as the unit direction.) He also gives polynomial interpolation of $\rho(\alpha)=f(x^{(k)}+\alpha p^{(k)})$ and golden-section search (Algorithm 6.7, $\tau=(\sqrt5-1)/2$, linear convergence) for the 1D problem, and makes the same effort trade-off.

## Backtracking (Armijo)

**Algorithm**, parameters $\alpha\in(0,1)$, $\beta\in(0,1)$: fix the step at t = 1 initially, then repeat $t\leftarrow\beta t$, so the step size falls at an exponential rate, until

$$
f(x^k+tp^k)<f(x^k)+\alpha\,t\,\nabla f(x^k)^\top p^k\qquad\text{(Armijo rule, sufficient decrease condition).}
$$

**Picture.** Plot $\phi(t)=f(x^k+tp^k)$. The tangent line at 0, $f(x^k)+t\nabla f^\top p^k$, lies below φ near 0 (for convex φ, everywhere). The Armijo line $f(x^k)+\alpha t\nabla f^\top p^k$ is the tangent tilted up by the factor α, so φ starts below it and crosses it at some $t_0$; every $t<t_0$ is acceptable, and the trials t = 1, β, β², ... stop at the first one below $t_0$.

**Why it works.** The Armijo rule is first-order Taylor with α thrown in: it demands a fixed fraction of the decrease that Taylor predicts.

- **Why $\alpha<1$?** For α > 1 the rule may hold for no t > 0; for convex f it never holds, because convexity gives $f(x^k+tp^k)\ge f(x^k)+t\nabla f^\top p^k>f(x^k)+\alpha t\nabla f^\top p^k$ (the last step because $\nabla f^\top p^k<0$ and α > 1).
- **No infinite loop:** for fixed $\alpha\in(0,1)$ and $\nabla f(x^k)\neq0$ there is $t^*>0$ such that the rule holds for every $t\in(0,t^*)$. Proof: $\frac{f(x^k+tp^k)-f(x^k)}{t}\to\nabla f^\top p^k<\alpha\nabla f^\top p^k$ as $t\to0^+$ (definition of the derivative; strict because $\alpha<1$ and the inner product is negative). Since $\beta^m\to0$, some trial passes.
- **Why not start tiny?** The Armijo rule alone does not ensure reasonable progress: tiny steps pass it trivially.
- In practice $\alpha<\tfrac12$ (typically 0.1 to 0.3), β 0.5 to 0.8. Close to the optimum Newton's full step t = 1 then passes the test, which is what gives quadratic convergence.

**Not too short.** Either the accepted t is the initial t = 1, or it is short enough for Armijo but not **too** short: it is within a factor β of the previous trial $t/\beta$, which was rejected for being too long. So it navigates the trade-off.

> **Worked example.** $f(x)=x_1^2+10x_2^2$ from $x^0=(1,1)$: f = 11, $\nabla f=(2,20)$, $p=-\nabla f=(-2,-20)$, $\nabla f^\top p=-404$. Take α = 0.3, β = 0.5. Trials, each as t: point, f, Armijo bound $11-121.2t$:
>
> - t = 1: (−1, −19), f = 3611, bound −110.2: reject.
> - t = 0.5: (0, −9), f = 810, bound −49.6: reject.
> - t = 0.25: (0.5, −4), f = 160.25, bound −19.3: reject.
> - t = 0.125: (0.75, −1.5), f = 23.06, bound −4.15: reject.
> - t = 0.0625: (0.875, −0.25), f = 1.391, bound 3.425: accept.
>
> Accepted t = 1/16, f falls from 11 to 1.39. Exact line search gives $t=\frac{\nabla f^\top\nabla f}{p^\top Ap}=404/8008=0.0504$ and f = 0.809 (A = diag(2, 20)): five cheap function evaluations got most of the way.

> **Gentle §6.2, p. 265: Goldstein-Armijo.** Gentle's sufficient decrease condition (6.26) is the same rule with ≤ and his τ in the role of α, restricted to $\tau\in(0,\tfrac12)$; the step is "the largest value in $1,\tfrac12,\tfrac14,\tfrac18,\dots$" that satisfies it, i.e. backtracking with β = 1/2. He adds the **curvature condition** (6.27), $|p^\top\nabla f(x^{(k)}+\alpha p)|\le\eta\,|p^\top\nabla f(x^{(k)})|$ for some $\eta\in(0,1)$: the slope at the new point must have flattened. That rules out the too-short steps Armijo alone allows (sufficient decrease plus curvature are the strong Wolfe conditions in Nocedal and Wright).

## Termination, rates and conditioning

**Termination**, both: $\lVert x^k-x^{k-1}\rVert<\varepsilon$ (the iterative change has become sufficiently small) and $\lVert\nabla f(x^k)\rVert<\varepsilon$; the same two failure modes as L4's 1D criteria.

**Rate.** Gradient / steepest descent: linear, $\lVert x^{k+1}-x^*\rVert<\rho\lVert x^k-x^*\rVert$ for some $0<\rho<1$.

**Example (Boyd and Vandenberghe Ch. 9).** The function from the search-direction section. With backtracking the iterates zigzag, oscillating a lot and needing many iterations; with exact line search they reach the optimum in fewer, longer steps.

> **That function solved.** By the symmetry $x_2\to-x_2$ the minimiser has $x_2=0$; then $f=2e^{x_1-0.1}+e^{-x_1-0.1}$ and $f'=0$ gives $2e^{x_1}=e^{-x_1}$, so $x_1^*=-\tfrac12\ln2=-0.3466$ and $f^*=e^{-0.1}(2\cdot2^{-1/2}+2^{1/2})=2\sqrt2\,e^{-0.1}=2.5593$. From (−1, 1) with α = 0.1, β = 0.7, backtracking gradient descent needs 29 iterations to reach $f-f^*<10^{-10}$ and Newton 5 (Boyd and Vandenberghe's start may differ).

**Conditioning.** For a quadratic whose Hessian has condition number κ (largest over smallest eigenvalue; Chapter 4), gradient descent with exact line search reduces $f-f^*$ by at most the factor

$$
\Big(\frac{\kappa-1}{\kappa+1}\Big)^2\ \text{per step}.
$$

- κ = 2: factor $(1/3)^2=0.111$; $0.111^k<10^{-6}$ needs $k>6.29$, so 7 steps. For small κ, gradient descent is great.
- κ = 20: factor $(19/21)^2=0.819$; needs $k>69.02$, so 70 steps. Large κ means long thin ellipses, and the algorithm is very slow: $-\nabla f$ points across the valley, not along it, so the path zigzags.
- Newton is unaffected by rescaling the variables (steepest descent in the $\nabla^2f$ norm is Newton). Rescaling helps gradient methods for the same reason centring and scaling fixed the ill-conditioned regression in Chapter 1. This scaling issue motivates second-order algorithms such as Newton's method.

> **Finance analogue.** A regression or mean-variance objective on raw features (market cap in £bn beside returns in decimals) has a huge κ, so gradient descent crawls. Standardising each feature is the cheap diagonal rescaling that pulls κ towards 1; it is why `glmnet` and most ML libraries standardise by default.

> **Gentle §6.2, p. 265 and Fig. 6.8, p. 267: the steepest descent zigzag.** Steepest descent is robust while the gradient is non-zero, goes straight to the solution for circular contours, but zigzags for elliptical ones; "a matrix other than the identity may deform the elliptical contours so they are more circular", and Newton takes the Hessian as that matrix. Fig. 6.8 draws one steepest descent step and one Newton step from the same point: the Newton step points at the minimum, the steepest descent step at right angles to the contour. He also notes (pp. 268-269) that a minimiser can only be located to about $\sqrt{\epsilon_{\text{mach}}}$, because f is flat (quadratic) near $x^*$, whereas a root can be located to about $\epsilon_{\text{mach}}$.

## Stochastic gradient descent

When the objective is an average over n observations,

$$
f(\beta)=\frac1n\sum_{i=1}^n\ell(\beta;X_i),
$$

one exact gradient costs O(nd). n can be huge, which makes the gradient (over all n points, then averaged) very expensive; using a mini-batch instead of all n observations is much cheaper.

- SGD replaces $\nabla f$ by the gradient over a small random batch: each step is cheap, the gradient is **unbiased but noisy**, and the step size is usually decreased over time.
- SGD and its variants (e.g. Adam, which adapts the step size per coordinate) are the standard way to fit large ML models: n and d are far too large for standard second-order methods.
- Plain gradient descent is rarely the method of choice in classical numerical optimisation, but its stochastic version is probably the most widely used optimiser today.

> **Why unbiased, and why decrease the step.** Draw a batch B of size m uniformly at random. Then $E\big[\frac1m\sum_{i\in B}\nabla\ell(\beta;X_i)\big]=\frac1n\sum_{i=1}^n\nabla\ell(\beta;X_i)=\nabla f(\beta)$ (linearity of expectation; each index equally likely). The variance scales roughly like 1/m and does not vanish at $\beta^*$, so with a fixed step the iterates keep jittering around $\beta^*$; shrinking steps (classically $\sum_kt_k=\infty$ and $\sum_kt_k^2<\infty$, e.g. $t_k\propto1/k$) average the noise out.

## Newton's method

Gradient and steepest descent use only the gradient; what if we also use the Hessian?

**Derivation.**

1. Second-order Taylor: $f(x^k+p^k)\approx f(x^k)+\nabla f(x^k)^\top p^k+\tfrac12(p^k)^\top\nabla^2f(x^k)p^k$.
2. Differentiate the right side with respect to $p^k$ term by term (0, $\nabla f(x^k)$, and $\nabla^2f(x^k)p^k$ using symmetry of the Hessian) and set the result to 0:

$$
\nabla^2f(x^k)\,p^k=-\nabla f(x^k)\quad\Longrightarrow\quad p^k=-\big[\nabla^2f(x^k)\big]^{-1}\nabla f(x^k).
$$

3. This is the stationary point of the quadratic model, and a minimum of the model if $\nabla^2f(x^k)$ is positive definite. The inverse needs to exist, and you need positive definiteness.

- With $p^k=x^{k+1}-x^k$, this is analogous to the familiar 1D equation $x^{k+1}=x^k-f'(x^k)/f''(x^k)$: L4's Newton step, with f″ replaced by the Hessian and division by multiplication by its inverse.
- With column vectors, $\frac{\partial}{\partial p}\nabla f^\top p=\nabla f$ (a column), not $\nabla f^\top$.

**Practical issues.** Newton supplies a direction **and** a step length.

1. Usually accept the full step (t = 1) unless it fails to give sufficient decrease; then halve (or $t:=\beta t$) until it does.
2. Newton implicitly requires $\nabla^2f(x^k)$ positive definite, which may fail far from the optimum. Fix: the solution of $Hp=-\nabla f$ is a descent direction for **any** PD H (see gradient descent above), so we may modify the Hessian, e.g. $\nabla^2f(x^k)+\gamma I$ with γ large enough to make it PD.

> Note that strict convexity does not give a positive definite Hessian. $f(x)=x^4$ is strictly convex but $f''(0)=0$; in 2D, $x_1^4+x_2^2$ is strictly convex with $\nabla^2f(0)=\operatorname{diag}(0,2)$, singular. What guarantees PD everywhere is **strong convexity** ($\nabla^2f\succeq mI$ with m > 0), or simply checking PD at the current point. Convexity alone gives only PSD.

> **Why +γI works.** If $\nabla^2f=Q\Lambda Q^\top$, then $\nabla^2f+\gamma I=Q(\Lambda+\gamma I)Q^\top$: same eigenvectors, every eigenvalue shifted up by γ, so any $\gamma>-\lambda_{\min}$ makes it PD. It keeps the off-diagonal entries, so the matrix stays close to H, but the eigenvalue shift is the real reason. It interpolates: γ → 0 gives the Newton direction, γ → ∞ gives $p\approx-\nabla f/\gamma$, a short gradient step (the Levenberg-Marquardt idea).

**Practical Newton algorithm.** Start with k = 0 and $x^0$.

1. Evaluate $f(x^k)$, $\nabla f(x^k)$, $\nabla^2f(x^k)$.
2. Test whether $x^k$ is a minimum (same termination criteria); stop if so.
3. If $\nabla^2f(x^k)$ is not PD, perturb it so that it is.
4. Solve $\nabla^2f(x^k)p^k=-\nabla f(x^k)$ (or with $+\gamma I$).
5. If $f(x^k+p^k)$ is not sufficiently lower than $f(x^k)$, repeatedly halve $p^k$ until it is.
6. Set $x^{k+1}=x^k+p^k$, $k\leftarrow k+1$, and return to step 1.

**Convergence.** Quadratic under regularity conditions: $\lVert x^{k+1}-x^*\rVert<C\lVert x^k-x^*\rVert^2$. The earlier example with α = 0.1, β = 0.7 converges in only 5 steps; the error plot bends sharply down. Newton takes curvature into account and is far better, but if d is large the Hessian has $d^2$ entries and the solve is $O(d^3)$: very expensive.

> **Newton on a quadratic: one step.** $f(x)=x_1^2+10x_2^2$ from (1, 1), as in the backtracking example: $\nabla^2f=\operatorname{diag}(2,20)$, $\nabla f=(2,20)$, so $p=-(1,1)$ and $x^1=(0,0)$, the exact minimiser, whatever κ (here 10). In general for $f=\tfrac12x^\top Ax-b^\top x$ with A PD, $x^1=x^0-A^{-1}(Ax^0-b)=A^{-1}b$ from any start. Backtracking gradient descent from the same point took a step of 1/16 and was still at f = 1.39.

**More thoughts.**

- If $\nabla f$ or $\nabla^2f$ is hard to compute analytically, use finite-difference approximations (L4); this can be very expensive for large d ($d\times d$ entries; solving a $d\times d$ system costs $O(d^3)$). An easy "lazy" idea is not to recalculate H at every iteration: the frozen Hessian.
- Summary of Newton: fast convergence; needs second derivatives and a solve with the Hessian.
- Idea: use the previous iteration's Hessian to estimate the current one (quasi-Newton, below).
- **Solve, don't invert:** compute $p^k$ from $\nabla^2f(x^k)p^k=-\nabla f(x^k)$ by a Cholesky factorisation (about $d^3/3$ operations). It also tests PD for free: if it fails, add γI and retry. Compare Chapter 1: `solve(A, b)`, not `solve(A) %*% b`.

> **Gentle §6.2, pp. 266-268: Newton for optimisation.** Newton is root-finding Newton applied to $\nabla f=0$: the Hessian is the Jacobian of the gradient, and a first-order expansion of $\nabla f$ is a second-order expansion of f. Iteration (6.29) is $x^{(k+1)}=x^{(k)}-H_f(x^{(k)})^{-1}\nabla f(x^{(k)})$; for quadratic f the expansion (6.30) is exact and one step solves the problem. Gentle's boxed principle (p. 266): the form of a mathematical expression and the way it should be evaluated may be quite different, so solve (6.31) $H_fp=-\nabla f$ by Cholesky and set $x^{(k+1)}=x^{(k)}+p^{(k)}$ (6.32). Reliability fixes (pp. 267-268): **damped Newton** with a line search; **modified Cholesky**, adding positive amounts during the factorisation, $H_f+D^{(k)}$ with D diagonal non-negative (6.33), a generalisation of $+\gamma I$; and **trust regions** (6.34)-(6.35): minimise the quadratic model only within $\lVert D^{(k)}s\rVert<\tau^{(k)}$, enlarging τ when actual over predicted decrease is near 1 and shrinking it when that ratio is small or negative. Gentle writes $H_f$ for the Hessian and keeps $\nabla^2$ for the Laplacian. One slip in the book (pp. 261-262): it says strict convexity implies a positive second derivative and a positive definite Hessian; both are false ($x^4$ at 0). The correct direction is that a PD Hessian everywhere implies strict convexity, not conversely.

## Frozen Hessian and quasi-Newton

**Frozen Hessian.** Close to the optimum the Hessian changes little, so keep the Hessian (or its factorisation) from earlier iterations and update it only every few iterations: **Newton with frozen Hessian**. This requires being close to the optimum, and getting H in the first place is still expensive.

**Quasi-Newton.** Instead of recalculating H, update it, which is only an $O(d^2)$ process and avoids inversions. Start with k = 0 and $x^0$; until a stopping criterion holds:

1. Quasi-Newton direction $p^k=-[H^{k-1}]^{-1}\nabla f(x^k)$.
2. Step size t (e.g. backtracking).
3. $x^{k+1}=x^k+tp^k$.
4. Compute $H^k$.
5. $k\leftarrow k+1$.

Methods differ in the rule for step 4. Invented in the 1950s by W. C. Davidon, a physicist, whose paper was rejected and only published in 1991. (A slide aside: Davidon also organised the 1971 break-in at an FBI office in Media, Pennsylvania, which exposed COINTELPRO.)

**BFGS (non-examinable).**

$$
H^k=H^{k-1}+\frac{yy^\top}{y^\top s}-\frac{H^{k-1}ss^\top H^{k-1}}{s^\top H^{k-1}s},\qquad s=x^k-x^{k-1},\quad y=\nabla f(x^k)-\nabla f(x^{k-1}).
$$

The inverse can be updated directly, without inverting a matrix:

$$
[H^k]^{-1}=\Big(I-\frac{sy^\top}{y^\top s}\Big)[H^{k-1}]^{-1}\Big(I-\frac{ys^\top}{y^\top s}\Big)+\frac{ss^\top}{y^\top s}.
$$

> Note that the slide prints this inverse update with a leading minus. With the minus the first term is negative semidefinite and the result could not stay PD. The correct formula (above) has a plus; Gentle's eq. (6.41) agrees, and a numerical check confirms that the plus version equals the inverse of the BFGS $H^k$.

- $H^k$ stays PD only if $y^\top s>0$ (the **curvature condition**).
- **Secant condition** $H^ks=y$ (from Latin secare, "to cut"). Check: $H^ks=H^{k-1}s+y\,\frac{y^\top s}{y^\top s}-H^{k-1}s\,\frac{s^\top H^{k-1}s}{s^\top H^{k-1}s}=y$.
- **Interpretation:** the model $f_{\text{quad}}(z)=f(x^k)+\nabla f(x^k)^\top(z-x^k)+\tfrac12(z-x^k)^\top H^k(z-x^k)$ has gradient $\nabla f(x^k)+H^k(z-x^k)$; at $z=x^{k-1}$ this is $\nabla f(x^k)-H^ks=\nabla f(x^k)-y=\nabla f(x^{k-1})$. The model matches f's gradient at the last two iterates: the d-dimensional secant method.

> **Why $y^\top s>0$ is natural.** By the mean value theorem $y=\bar Hs$ with $\bar H$ the Hessian averaged along the segment, so $y^\top s=s^\top\bar Hs$: positive curvature along the step. For strictly convex f it holds automatically, since $(\nabla f(a)-\nabla f(b))^\top(a-b)>0$; for non-convex f a line search meeting Gentle's curvature condition (6.27) enforces it.

**BFGS example.** A smooth problem with large d (thousands or more). Newton reaches $f-f^*\approx10^{-10}$ in about 9 iterations, BFGS in about 135, yet BFGS is cheaper overall: Newton costs $O(d^3)$ per iteration plus the Hessian, BFGS $O(d^2)$. Take-home: BFGS suits large-scale problems better; if the problem is not smooth, neither Newton nor BFGS will necessarily work.

> **Break-even arithmetic (ignoring constants).** With d = 5000: Newton about $9\times d^3/3\approx3.8\times10^{11}$ flops for the solves alone; BFGS about $135\times d^2\approx3.4\times10^9$. Two orders of magnitude, before counting the $d^2/2\approx1.25\times10^7$ second derivatives Newton must compute each iteration. The iteration counts are read off the slide's plots.

> **Gentle §6.2, pp. 269-272: quasi-Newton.** Gentle derives the secant condition from $H_f(x^{(k+1)})(x^{(k+1)}-x^{(k)})\approx\nabla f(x^{(k+1)})-\nabla f(x^{(k)})$ (6.37), written $B^{(k+1)}s^{(k)}=y^{(k)}$ (6.38), and notes it does not determine B, so symmetry and PD are added. Updates: the **symmetric rank-one** update (6.39), $B_a=\frac{(y-Bs)(y-Bs)^\top}{(y-Bs)^\top s}$, and the rank-two **Broyden family** (6.40) with $\sigma\in[0,1]$: σ = 0 is BFGS, σ = 1 is DFP (Davidon-Fletcher-Powell). Broyden updates keep PD while $y^\top s>0$; otherwise rescale s or skip the update. Updates cost $O(m^2)$; doing them on the inverse via the Woodbury formula gives (6.41), the plus-sign version above. Limited-memory methods store only recent (s, y) pairs and assume the matrix was diagonal 4 or 5 iterations back (L-BFGS). BFGS is the most popular, though some empirical results find SR1 adequate.

## Coordinate descent

First- and second-order methods are the core of optimisation. Coordinate descent is studied less by optimisation specialists and applies less broadly, but is very useful when it applies, especially in statistics. Now f is convex but **not necessarily smooth**.

**Algorithm.** Start with k = 0 and $x^0=(x_1^{(0)},\dots,x_d^{(0)})^\top$. Until a stopping criterion holds, for i = 1, ..., d in turn:

$$
x_i^{(k)}\in\arg\min_{x_i}f\big(x_1^{(k)},\dots,x_{i-1}^{(k)},\,x_i,\,x_{i+1}^{(k-1)},\dots,x_d^{(k-1)}\big),
$$

then $k\leftarrow k+1$. Each update uses the newest values of the coordinates already updated in this sweep.

- In words: pick a starting $x_0$; cycle through all dimensions, minimising over each in turn; arrive at $x_1$; cycle again. This ensures every variable is updated at least once each time. It is like the transects at the start of the lecture: each coordinate step is a full 1D minimisation (a transect minimum), not a partial-derivative step.
- Order is arbitrary: any permutation of $\{1,\dots,d\}$.
- $x^k\to x^*$ under "certain" conditions (next).
- Suits large-scale problems where each 1D problem is quick; extremely useful in high-dimensional statistics, e.g. the **lasso**.

**Theory.**

1. **f convex and differentiable:** if x minimises f along every coordinate axis, is it a global minimiser? **Yes.**
2. **f convex, not differentiable:** **No** (counterexample below).
3. $f(x)=g(x)+\sum_{i=1}^dh_i(x_i)$ **with g convex and differentiable and each $h_i$ convex** (the non-smooth part is **separable**): **Yes.** The proof is an exercise, so it is not written out here. This is the most common case in high-dimensional statistics: replacing $h_i(\cdot)$ with an absolute value recovers the $L_1$ penalty, and for this class of function coordinate descent works.

**Case 1 proof.**

1. x minimises f along axis i and f is differentiable, so the 1D derivative there is 0: $\partial f/\partial x_i(x)=0$ for each i (1D first-order condition).
2. Hence $\nabla f(x)=0$.
3. Convexity (first-order characterisation, L4): $f(y)\ge f(x)+\nabla f(x)^\top(y-x)=f(x)$ for all y, so at x it is minimised and any other point is larger. ∎

**Case 2 counterexample.** Think of folded paper: any point on the sharp ridge is not differentiable.

$$
f(x_1,x_2)=3|x_1-x_2|+|x_1+x_2|.
$$

The obvious global minimum is f = 0 at (0, 0). Fix $x_2=2$ and minimise $3|x_1-2|+|x_1+2|$: for $-2\le x_1\le2$ the slice is $3(2-x_1)+(x_1+2)=8-2x_1$ (decreasing); for $x_1\ge2$ it is $4x_1-4$ (increasing); for $x_1\le-2$ it is $4-4x_1\ge12$. So the slice minimum is at $x_1=2$ with value 4, and by symmetry, fixing $x_1=2$, the minimum is at $x_2=2$. Coordinate descent started anywhere on the ridge $x_1=x_2$ (away from 0) never moves: stuck at (2, 2) with f = 4 against the true minimum 0.

> Note three things about this counterexample. On the ridge $x_1=x_2$ the partial derivatives **do not exist**: at (2, 2) the one-sided derivatives in $x_1$ are −2 (left) and +4 (right), a kink, which is why the slice has its minimum there; coordinate descent finds the point by 1D minimisation, not by solving $\nabla f=0$. (2, 2) is **not a minimum of any kind**, local or global: along the diagonal $f(t,t)=2|t|$, which falls from 4 towards 0 as t goes from 2 to 0. It is only a **coordinatewise** minimum: no single-axis move helps, but a diagonal move does. And the point is about coordinate descent; gradient methods have their own trouble at kinks (no gradient there), but this shows that axis-by-axis minimisation can stall.

> **Lasso-type coordinate step, worked.** Each 1D problem $\min_z\tfrac12z^2-cz+\lambda|z|$ is solved by soft-thresholding, $z=S(c,\lambda)=\operatorname{sign}(c)\max(|c|-\lambda,0)$. Example: $f=\tfrac12(x_1^2+x_2^2)+\tfrac12x_1x_2-2x_1-x_2+\lambda(|x_1|+|x_2|)$ with λ = 0.5.
>
> 1. $x_1$-step: minimise $\tfrac12x_1^2-(2-\tfrac12x_2)x_1+\lambda|x_1|$, so $x_1=S(2-\tfrac12x_2,0.5)$. From (0, 0): $x_1=S(2,0.5)=1.5$.
> 2. $x_2$-step: $x_2=S(1-\tfrac12x_1,0.5)=S(0.25,0.5)=0$.
> 3. Next sweep: $x_1=S(2,0.5)=1.5$, $x_2=0$ again. Converged at (1.5, 0), f = −1.125.
>
> Optimality check by subgradients: in $x_1$, $x_1+\tfrac12x_2-2+\lambda=1.5-2+0.5=0$; in $x_2$, $x_2+\tfrac12x_1-1=-0.25\in[-0.5,0.5]$. Note the **exact zero** in $x_2$: the lasso's variable selection comes straight from the threshold.

> **Gentle has no coordinate descent section; the nearest is Gauss-Seidel, §5.4, pp. 221-222.** Gauss-Seidel solves $Ax=b$ one component at a time with the newest values, $x_i^{(k)}=\frac1{a_{ii}}\big(b_i-\sum_{j<i}a_{ij}x_j^{(k)}-\sum_{j>i}a_{ij}x_j^{(k-1)}\big)$ (eq. 5.43). For A symmetric positive definite this is exactly coordinate descent on $\tfrac12x^\top Ax-b^\top x$: setting the $x_i$-derivative $a_{ii}x_i+\sum_{j\neq i}a_{ij}x_j-b_i$ to zero gives (5.43). Gentle notes the method can be slow and introduces successive over-relaxation (a weighted average of the Gauss-Seidel update and the old value). The book does not cover the non-smooth theory.

## In practice: what you will actually call

- **Python:** `scipy.optimize.minimize(f, x0, jac=grad)` uses BFGS by default for unconstrained problems; `method="L-BFGS-B"` (limited-memory BFGS: keeps only the last few (s, y) pairs, also handles bounds) for large d; `"Newton-CG"` or `"trust-exact"` if you supply the Hessian.
- **R:** `optim()` defaults to Nelder-Mead (derivative-free, not covered), so ask for `method = "BFGS"` or `"L-BFGS-B"`; `nlm()` is Newton-type; `glmnet` (lasso-type problems) uses coordinate descent.
- Supply the gradient if you can, and check it first: `scipy.optimize.check_grad` compares it with finite differences. Automatic differentiation (JAX, PyTorch; in R, torch or TMB) gives exact gradients.
- The slide's example, Rosenbrock from (−1.2, 1.0): with the exact gradient BFGS takes 32 iterations (`.nit`); without it, finite differences need 114 function evaluations (`.nfev`). Counts can shift between SciPy versions.

> **Gentle §6.2, pp. 272-274: Nelder-Mead, the R default.** A derivative-free direct search: keep a simplex of m + 1 points; reflect the worst point through the centroid of the others; expand, contract or shrink (Algorithm 6.8: reflection α > 0, expansion γ > 1, contraction β and shrinkage δ in (0, 1)). In 2D, "a triangle tumbling downhill vertex over edge" (Fig. 6.9). Slow but cheap per step, and it needs only the ordering of function values, so it tolerates noisy f. Gentle warns that the variance-of-f-values stopping rule can stop early when the simplex happens to lie along one contour. Hence the advice to ask `optim()` for BFGS when f is smooth.

## Choosing the function to optimise

Often the objective can be chosen. To compute $\sqrt2$ we can minimise on the interval from 1 to 2 either

$$
f(x)=|x^2-2|\quad(\text{non-smooth})\qquad\text{or}\qquad f(x)=(x^2-2)^2\quad(\text{smooth}).
$$

Rule of thumb: if possible, work with smooth functions, so choose the smooth one.

> **What smoothness buys here.** For $(x^2-2)^2$: $f'=4x(x^2-2)$, $f''=12x^2-8$, and $f''(\sqrt2)=16>0$, so Newton converges quadratically (L4's conditions). $|x^2-2|$ has no derivative at $\sqrt2$, so Newton and BFGS do not apply; golden-section search or bisection on a subgradient would work, but only linearly.

**Finally:** Tukey ("The future of data analysis", Annals of Mathematical Statistics, 1962): an approximate answer to the right question beats an exact answer to the wrong one. The choice of objective function is very important.

## Summary

- In d dimensions, choose a direction, then a step; the step is a 1D line search. Transects are only partial views.
- Any p with $\nabla f^\top p<0$ descends for small t. Gradient descent uses $-\nabla f$; steepest descent depends on the norm ($L_2$: gradient; $L_1$: one coordinate; Hessian norm: Newton).
- Backtracking with the Armijo rule ($\alpha\in(0,1)$, in practice below 1/2) always terminates and avoids both too-long and too-short steps.
- Gradient descent is linear and slow when κ is large; Newton is locally quadratic and scale-invariant but costs $O(d^3)$ per step and needs a PD Hessian (fix with $+\gamma I$; solve by Cholesky).
- Quasi-Newton (BFGS) builds a Hessian approximation from gradient differences satisfying the secant condition; $O(d^2)$ per step; PD kept while $y^\top s>0$.
- SGD replaces the full gradient by a mini-batch gradient; the standard for large ML models.
- Coordinate descent finds the global minimum for convex differentiable f and for smooth-plus-separable f (lasso), but can stall for general non-smooth convex f.
- Prefer smooth objectives; use library BFGS / L-BFGS-B with a checked gradient.

## Traps

- "In 1D there is only one direction": there are two; the sign of f′ picks the downhill one.
- "Steepest descent is faster than gradient descent": convergence is similar; "steepest" depends on the norm, and in $L_2$ it is gradient descent.
- Writing first-order Taylor with "=" instead of "≈".
- "Bigger steps are better": too long overshoots; backtracking balances.
- Armijo with α ≥ 1: may never be satisfied (never, for convex f). With α = 1/2 and strict inequality, the exact minimiser of a quadratic is rejected: $f=x^2$ at x = 1, p = −2, t = 1/2 lands on 0, and $0<1-1=0$ is false.
- Strict convexity ⇒ PD Hessian: false ($x^4$); you need strong convexity.
- PSD Hessian at a stationary point ⇒ minimum: false ($x^2+y^3$).
- Forming $[\nabla^2f]^{-1}$ explicitly: solve by Cholesky instead.
- The leading minus in the slide's inverse BFGS update: it is a plus.
- Calling (2, 2) for $3|x_1-x_2|+|x_1+x_2|$ a local minimum, or saying the partials vanish there: it is only coordinatewise minimal and the partials do not exist.
- Assuming coordinate descent works for any convex f: it needs differentiability or a separable non-smooth part.
- Using R's `optim()` default for a smooth problem: that is Nelder-Mead, not BFGS.
- Reading transect plots as the whole picture: they can invent or hide minima.

## Self-check

1. At a point with $\nabla f=(-1,4,-3)$, give the steepest descent direction in $L_2$ and in $L_1$. *$L_2$: $(1,-4,3)/\sqrt{26}$; $L_1$: the largest absolute component is 4 (positive), so $p=-e_2=(0,-1,0)$.*
2. Backtracking on $f(x)=x^2$ from x = 1 with $p=-f'(1)=-2$, α = 0.3, β = 0.5: which t is accepted? *t = 1 gives f(−1) = 1 against the bound 1 − 0.6 = 0.4, reject; t = 0.5 gives f(0) = 0 against 1 − 0.3 = 0.7, accept. It lands exactly on the minimiser.*
3. Show Newton minimises $\tfrac12x^\top Ax-b^\top x$ (A PD) in one step from any $x^0$. *$\nabla f=Ax-b$, $\nabla^2f=A$, so $x^1=x^0-A^{-1}(Ax^0-b)=A^{-1}b$, where $\nabla f=0$.*
4. Gradient descent with exact line search on a quadratic with κ = 9: worst-case factor per step, and steps to cut $f-f^*$ by $10^{-4}$? *$(8/10)^2=0.64$; $\ln10^{-4}/\ln0.64=20.6$, so 21 steps.*
