---
title: "Budget constraints, taxes and fixed fees"
paper: "Paper 1 — Microeconomics"
year: "Year 1 (Part I)"
section: "Microeconomics"
description: "Budget sets, relative prices and taxes, with worked examples on an unchanged budget line and shopping across stores with entry fees."
order: 1
tags: [economics, consumer-theory]
---

Lecture slides: [L1-notes-Micro-2023-24.pdf](https://www.vle.cam.ac.uk/pluginfile.php/15781371/mod_resource/content/5/L1-notes-Micro-2023-24.pdf). Reading: Varian, Chapter 2.

## Consumer choice and the budget set

Consumer choice: choosing the best consumption bundle that can be afforded. (Varian)

**Consumption bundle:** a list of two numbers, $(x_1,x_2)$.

- $x_1$: weight/quantity of good 1.
- $x_2$: weight/quantity of good 2.

Consider a person with a budget of £4 choosing to buy good A (£1 per kg) vs good B (£2 per kg).

Thus,

$$\text{cost}=x_1+2x_2,$$

yielding the budget line

$$x_1+2x_2=4.$$

![Budget set for goods costing £1 and £2 per kilogram: affordable bundles lie below the line joining (0, 2) and (4, 0).](/notes/figures/budget/budget-set.svg)

So in general the budget set is defined as the set of bundles such that

$$B=\{(x_1,x_2):p_1x_1+p_2x_2\le m,\ x_1,x_2\ge0\}.$$

Assume positive prices and income: $p_1,p_2,m>0$.

We can reduce parameters by picking a **numeraire good**. The entire budget-line equation can be divided by this numeraire price, $p_2$, to give us

$$\frac{p_1}{p_2}x_1+x_2=\frac{m}{p_2}.$$

Considering more than two goods, we can consider $x_1$ as the consumption good and $x_2$ as the amount of money set aside for everything else, i.e. $x_2$ is a **composite good**. If it is measured in money, its price is one.

## Changes in price and income

The intercepts are $m/p_1$ and $m/p_2$; the slope is $-p_1/p_2$.

A change in the price of good 1 pivots the line around the $x_2$ intercept. A change in income shifts the line in parallel, holding prices fixed. Fixed fees and quantity discounts can give non-linear budget boundaries.

## Taxes and subsidies

| Policy | Effect |
| --- | --- |
| Quantity tax | Raises the price of a good from $p$ to $p+t$. |
| Quantity subsidy | Reduces the price of a good from $p$ to $p-s$. |
| Value (ad valorem) tax | Raises the price of a good from $p$ to $(1+\sigma)p$, where $\sigma$ is the tax rate. |
| Ad valorem subsidy | Reduces the price of a good from $p$ to $(1-\sigma)p$, where $\sigma$ is the subsidy rate. |
| Lump-sum tax | Regardless of behaviour, a fixed amount of money is taken from the budget. Budget falls from $m$ to $m-u$: a shift inward. |
| Lump-sum subsidy | Regardless of behaviour, a fixed amount of money is added to the budget. Budget rises from $m$ to $m+u$: a shift outward. |

For the usual downward-sloping budget line, the resulting prices must stay positive: $s<p$ and $0\le\sigma<1$ for the subsidies above.

## Exercise 1: an unchanged budget line

A budget line is given by $p_1x_1+p_2x_2=m$. The government imposes a lump-sum subsidy of $u$, a quantity tax $t_1$ on good 1, and an ad valorem tax $\tau_2$ on good 2.

Find the condition on $u,t_1,\tau_2$ such that the new budget line coincides with the original budget line.

The new budget line is

$$(p_1+t_1)x_1+(1+\tau_2)p_2x_2=m+u.$$

For it to coincide with the original line, both prices and income must increase in the same proportion:

$$\frac{p_1+t_1}{p_1}=1+\tau_2=\frac{m+u}{m}.$$

So the condition is

$$\boxed{\frac{t_1}{p_1}=\tau_2=\frac{u}{m}}.$$

The quantity tax and lump-sum subsidy are amounts; the ad valorem tax is a rate. They are not generally equal to one another.

## Exercise 2: entrance fees at two shops

Suppose Bob has £100 that he can spend to buy sweets from shops A and B. Shop A charges an entrance fee of £10 and sells chocolate candies and ice cream at prices of £5 and £10 per kilogram, respectively. Shop B charges an entrance fee of £20 and sells identical chocolate candies and ice cream at prices of £10 and £5 per kilogram.

Plotting the weight of chocolate candies on the horizontal axis and weight of ice cream on the vertical axis, draw Bob's budget set.

If Bob goes to shop A, he is left with £90 to spend, and the associated budget line is $5x+10y=90$, that is, $x+2y=18$.

If Bob goes to shop B, he is left with £80 to spend, and the associated budget line is $10x+5y=80$, that is, $2x+y=16$.

We should also consider the line corresponding to shopping at **both shops**. Bob pays £30 in entrance fees, then buys chocolate at A and ice cream at B, each for £5 per kilogram. This gives $5x+5y=70$, or $x+y=14$.

The overall budget frontier is the maximum of the three affordable options:

$$
y=\begin{cases}
16-2x,&0\le x\le2,\\
14-x,&2\le x\le10,\\
9-\frac{x}{2},&10\le x\le18.
\end{cases}
$$

![Bob's budget frontier follows shop B from (0, 16) to (2, 12), both shops to (10, 4), and shop A to (18, 0). Affordable bundles lie below it.](/notes/figures/budget/two-shops.svg)

There are **three segments and two interior kinks**, at $(2,12)$ and $(10,4)$. The budget set is not convex: the midpoint $(9,8)$ of the affordable intercepts $(0,16)$ and $(18,0)$ is unaffordable.
