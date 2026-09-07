---
draft: false
title: "Lecture 8 - Extensions of Solow Model"
paper: "Paper 2 — Macroeconomics"
year: "Year 1 (Part I)"
section: "Macroeconomics"
description: "Extensions of the Solow model: the Golden Rule saving rate, transition dynamics, absolute versus conditional convergence, and the augmented Solow model with labour-augmenting technological progress (MPK − δ = n + g)."
order: 8
tags: ["economics"]
---

Lecture notes and slide extracts: [Chryssi Giannitsarou](https://sites.google.com/site/giannitsarou/), University of Cambridge, Part I Macroeconomics. Teaching examples and values in slide extracts are reported from the course material [R]. Several diagrams are textbook extracts from N. Gregory Mankiw, *Macroeconomics*, and C. I. Jones, *Macroeconomics*.

Topics:
- The Golden rule 
- Transition 
- Absolute and conditional convergence 
- Where do we go from here? 
- Exogenous technological progress

**The Golden Rule**
There are multiple different steady states under the Solow model. The 'best' steady state under the golden rule is the one that maximises consumption per person. **THAT IS WE ARE PICKING THE SAVING RATE THAT CORREPONDS TO THE GOLDEN RULE (NOT CAPITAL STOCK)** 

In the Solow Model the exogenous variables are s and n. As such these are the variables that change.

In the steady state consumption is:
![Equation: c* = (1 − s) f(k*).](../../assets/notes/year1/25b90fcf19cacfbb8332.png)
Recognising that savings rate influences both (1-s) and k* then we end up with a function of c* against s that looks like:
![Lecture slide "Steady state consumption": a hump-shaped curve of steady-state consumption per person c* against the saving rate s, peaking at an interior saving rate marked "maximum consumption".](../../assets/notes/year1/f3ceb8b02beda3991887.png)

The golden rule level of capital is found by considering consumption:
![Handwritten derivation defining the Golden Rule capital stock k*_gold as the steady-state k that maximises consumption: c* = y* − i* = f(k*) − (δ + n)k*, using i* = (δ + n)k* since Δk = 0 in steady state.](../../assets/notes/year1/b4a09eb0466023890f95.png)
The largest c visually represented as the largest gap between the two curves:
![Lecture slide "The golden rule capital stock": f(k*) and the (δ + n)k* line plotted against steady-state capital per worker; k*_gold is where the vertical gap between them, c*_gold, is largest.](../../assets/notes/year1/3d854673a81af94ce2fe.png)
**NOTE: MPK = Investment, at where c* is maximised. That is to say investment is continued until the contribution of capital(per worker) to product is equal to the costs of investment**. See:
![Lecture slide: c* = f(k*) − (δ + n)k* is biggest where the slope of the production function equals the slope of the break-even investment line, i.e. MPK = δ + n.](../../assets/notes/year1/2c2d127193cc920098fc.png)
**Very important to note that K* gold is not where depreciation and production intersect. The k* at that point is what you would arrive at if you were to save as max as possible without having more depreciation than production.**

**See that k* gold is achieved where the slope of the production function equals tha tof the depreciation curve i.e. where there is the largest gap between production and depreciation arising from the equation that: $$c^* = f(k^*) - (d+n)k^*$$** Also via calculus:
![Slide deriving the Golden Rule condition: maximising f(k*) − (δ + n)k* over k* gives the first-order condition f′(k*) = MPK = δ + n.](../../assets/notes/year1/5cac5e62cd8dc7ebb138.png)

**Transition to the GR steady state:**
The economy does NOT have a tendency to move toward the Golden Rule steady state. Achieving the Golden Rule requires that policymakers adjust savings rate s. This adjustment leads to a new steady state with higher consumption

Economy with too much capital:
![Lecture slide: time paths of output y, consumption c and investment i for an economy with k* above k*_gold; lowering s raises consumption at every point in time, so k > k*_gold is dynamically inefficient.](../../assets/notes/year1/66c704e43f7a19aca879.png)

Economy with too little capital:
![Lecture slide: time paths of y, c and i for an economy with k* below k*_gold; raising s causes an initial drop in consumption then higher consumption for future generations, so k < k*_gold is dynamically efficient.](../../assets/notes/year1/d6aa32736b46352c034b.png)

**Solow model and Convergence**
![Handwritten slide rearranging Δk = s f(k) − (δ + n)k into the growth rate of capital g_k = Δk/k = s·f(k)/k − (δ + n); the f(k)/k term falls as k rises while (δ + n) is constant.](../../assets/notes/year1/fcc411d79b0dfb81a09b.png)
In the above case using a sort of cobb-douglas production function shows that growth reduces as capital stock per person increases (the implicatation is there is convergence between capital rich and capital poor countries). Visually:
![Lecture slide "Growth rate graph": s·f(k)/k is a downward-sloping curve cut by the horizontal δ + n line; the vertical gap (the capital growth rate) is larger at k_POOR than at k_RICH, both below the steady state k*.](../../assets/notes/year1/5397e9856d82178f5885.png)
If the world behaves like the Solow model, we should observe convergence if countries differ only with respect to initial capital and share same s, n, δ. Then poor countries should grow faster and we would expect a negative relationship between initial income and growth.

Such convergence is observed when we consider only the cluster of developed economies there is a clear negative relation between GDP/capita and growth:
![Scatter plot of 1960–2017 per-capita GDP growth against per-capita GDP in 1960 for a set of rich economies, with a downward-sloping fitted line — faster growth from lower starting income among developed countries.](../../assets/notes/year1/c5462866fd5afcb1777d.png)
E.g./ The great divergence:
![Scatter plot "GDP per capita and growth rates" for a wide sample of countries, 1960–2017: no clear relationship between 1960 income and later growth across the full sample, with the fitted curve annotated "developed" and the poorer countries annotated "no longer holds".](../../assets/notes/year1/d51bde9929a8f8a5eacb.png)

This doesn't mean the Solow model fails.

- In samples of countries with similar savings & pop. growth rates, income gaps shrink about 2%/year
- In larger samples, if one controls for differences in saving, population growth, and human capital, incomes converge by about 2%/year

Consider for example a country being poor due to its low saving rate:
![Lecture slide: two s·f(k̂)/k̂ curves for countries with different saving rates cut by the δ + n line; the low-saving country converges to a lower steady-state capital per worker than the high-saving country.](../../assets/notes/year1/51feb38d0bd07987e1f3.png)
What the Solow model really predicts is conditional convergence - **countries converge to their own steady states, which are determined by saving, population growth, and productivity**. And this prediction comes true in the real world and is consistent with the great divergence.

**EVALUATING THE SOLOW MODEL**
*Strengths*
1. Gives us: **long run = steady state**
2. The principle of **transition dynamics** – allows for understanding of differences in growth rates across countries – a country further from k* grows faster
*Weaknesses*
1. It focuses on investment and capital and so does not provide a theory of sustained long‐run economic growth.
2. The much more important factor of productivity A is still unexplained 
3. Doesn't explain why countries have different investment and productivity rates 
4. A more complicated model could endogenise the investment rate

These weaknesses are the precursor to introducing technology in the production function. Either through *exogeneous growth theory* or *endogenous growth theory*. 

**Romer's Augmented Solow Growth Model**
Augmented Solow growth model: 
- A new variable: E = labour efficiency 
- Technological progress is labour‐augmenting. (hence the indice is same)
![Production function Y = F(K, LE) = K^α (LE)^(1−α) = E^(1−α) K^α L^(1−α), with labour efficiency E entering as labour-augmenting technology.](../../assets/notes/year1/a336b19e36c8f89a3b62.png)
![Slide: technology raises labour efficiency at the exogenous rate g = ΔE/E; LE is the number of effective workers, and labour efficiency has the same effect on output as a larger labour force.](../../assets/notes/year1/4b7e90477a64e2a1b44f.png)
**NOTE: Working in terms of the effective worker then we get:**
y = Y / LE and k = K / LE. (Intuitively, the effective worker is thought of as 'the worker with tools and jacket' as opposed to just worker)
![Slide: per effective worker, saving and investment are s·y = s·f(k) and the fundamental equation of the augmented Solow model is Δk = s·f(k) − (δ + n + g)k.](../../assets/notes/year1/547f76987856bf894818.png)
NOTE: The 'break-even investment' term that is tacked on. It consists of:
![Slide breaking down break-even investment: δk to replace depreciating capital, nk to equip new workers, and gk to equip the new effective workers created by technological progress.](../../assets/notes/year1/c1564e9ded1c7aeef5c2.png)
Using differentiation wrt to k* for the golden rule steady state again:
![Slide finding the Golden Rule in the augmented model: c* = f(k*) − (δ + n + g)k* is maximised when MPK = δ + n + g, equivalently MPK − δ = n + g.](../../assets/notes/year1/0c3211ebe560d1ce66b3.png)
Importantly this leads to a new long run growth rate that is non-zero:
![Table of long-run growth rates in the augmented Solow model: capital and output per effective worker grow at 0, output per worker (Y/L) grows at g, and total output Y grows at n + g.](../../assets/notes/year1/e90d98ccf54b1378c282.png)

Important takeaways:
1. Per capita variables grow at rate of exogenous technological progress g 
2. Policy changes have *level*, but not growth effects
3. We have not explained where technological growth comes from

**POLICY**
Policy can be used to determine the correct saving rate by considering how:
![Lecture slide "Evaluating the rate of saving": compare MPK − δ with n + g; if MPK − δ > n + g the economy is below the Golden Rule and should raise s, if it is less the economy is above and should lower s; most countries save less than they should.](../../assets/notes/year1/5d30471d8421b90addb5.png)
