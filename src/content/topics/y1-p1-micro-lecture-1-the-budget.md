---
title: "Budget constraints, taxes and fixed fees"
paper: "Paper 1 — Microeconomics"
year: "Year 1 (Part I)"
section: "Microeconomics"
description: "Budget sets, relative prices and taxes, with worked examples on an unchanged budget line and shopping across stores with entry fees."
order: 1
tags: [economics, consumer-theory]
---

## The budget set

A consumption bundle tells us how much of each good a consumer buys. With two goods, write it as $(x_1,x_2)$. If prices are $p_1,p_2>0$ and income is $m>0$, the affordable bundles satisfy

$$
p_1x_1+p_2x_2\leq m,\qquad x_1,x_2\geq0.
$$

This is the **budget set**. Its boundary, where the consumer spends the whole budget, is the **budget line**:

$$
x_2=\frac{m}{p_2}-\frac{p_1}{p_2}x_1.
$$

The vertical intercept is $m/p_2$, the horizontal intercept is $m/p_1$, and the slope is $-p_1/p_2$. Buying one more unit of good 1 requires giving up $p_1/p_2$ units of good 2 if total spending stays fixed.

For example, take a £4 budget, with good 1 costing £1 per kg and good 2 costing £2 per kg. The budget line is $x_1+2x_2=4$.

![The affordable set lies on or below the line joining 4 kg of good 1 and 2 kg of good 2. Its slope is minus one half.](/notes/figures/budget/budget-set.svg)

## Relative prices and the numeraire

Dividing the constraint by $p_2$ gives

$$
\frac{p_1}{p_2}x_1+x_2\leq\frac{m}{p_2}.
$$

Good 2 is now the **numeraire**: we measure prices and purchasing power in units of that good. This changes the units in which we describe the budget, not the bundles the consumer can afford.

We can also let the second axis represent money spent on everything other than good 1. That composite good then has a price of one, giving $p_1x_1+x_2\leq m$.

## Changes in prices and income

An increase in income moves both intercepts outwards, with the slope unchanged. A fall in income shifts the line inwards.

An increase in $p_1$, holding $p_2$ and $m$ fixed, reduces the horizontal intercept. The vertical intercept stays at $m/p_2$, so the budget line becomes steeper. A change in a price changes both relative prices and purchasing power.

Taxes and subsidies can enter through prices or through the consumer's available income:

| Policy | Change to the constraint |
| --- | --- |
| Per-unit tax of $t$ on a good | Its price rises from $p$ to $p+t$. |
| Per-unit subsidy of $s$ | Its price falls from $p$ to $p-s$, assuming the resulting price stays positive. |
| Ad valorem tax at rate $\tau$ | Its price becomes $(1+\tau)p$. |
| Ad valorem subsidy at rate $\sigma$ | Its price becomes $(1-\sigma)p$, with $0\leq\sigma<1$ to keep the price positive. |
| Lump-sum tax of $v$ | Available income falls from $m$ to $m-v$. |
| Lump-sum subsidy of $u$ | Available income rises from $m$ to $m+u$. |

## Worked example: when does the budget line stay unchanged?

Suppose the government gives a lump-sum subsidy $u$, taxes each unit of good 1 by $t_1$, and applies an ad valorem tax $\tau_2$ to good 2. The new budget line is

$$
(p_1+t_1)x_1+(1+\tau_2)p_2x_2=m+u.
$$

To describe the same line as before, all three coefficients must be multiplied by the same positive factor $\lambda$:

$$
p_1+t_1=\lambda p_1,\qquad
(1+\tau_2)p_2=\lambda p_2,\qquad
m+u=\lambda m.
$$

Since $p_2>0$, the middle condition gives $\lambda=1+\tau_2$. Therefore

$$
\boxed{\frac{t_1}{p_1}=\tau_2=\frac{u}{m}},\qquad 1+\tau_2>0.
$$

It is the **proportional changes** that must agree. Equating $t_1$, $\tau_2$ and $u$ directly would compare a tax per unit, a percentage and a cash amount.

For a quick check, take $p_1=4$, $p_2=7$ and $m=100$. A 25% tax on good 2, a tax of 1 per unit of good 1 and a subsidy of 25 produce $5x_1+8.75x_2=125$. Dividing by 1.25 recovers the original line, $4x_1+7x_2=100$.

## Worked example: two shops with entry fees

A consumer has £100 to spend on chocolate $x$ and ice cream $y$, both measured in kg. Shop A charges £10 to enter, then £5 per kg of chocolate and £10 per kg of ice cream. Shop B charges £20 to enter, then £10 per kg of chocolate and £5 per kg of ice cream.

There are three relevant shopping choices:

| Shopping choice | Money left after entry | Budget line |
| --- | --- | --- |
| A only | £90 | $5x+10y=90$, or $y=9-x/2$ |
| B only | £80 | $10x+5y=80$, or $y=16-2x$ |
| Both shops | £70 | Buy chocolate at A and ice cream at B: $5x+5y=70$, or $y=14-x$. |

For each quantity of chocolate, the consumer can choose the shopping arrangement that leaves the most ice cream. The outer boundary is therefore the upper envelope of these three lines, wherever quantities are non-negative.

The B-only line meets the both-shops line at $(2,12)$. The both-shops line meets the A-only line at $(10,4)$. This gives

$$
y_{\max}(x)=
\begin{cases}
16-2x,&0\leq x\leq2,\\
14-x,&2\leq x\leq10,\\
9-x/2,&10\leq x\leq18.
\end{cases}
$$

![The budget frontier runs from 0 kg chocolate and 16 kg ice cream to 2 and 12, then to 10 and 4, and finally to 18 and 0. Shopping at both stores is best along the middle segment.](/notes/figures/budget/two-shops.svg)

There are **three segments and two interior corners**. Comparing only A with B misses the middle segment, where paying both entry fees is worthwhile. The fixed fees also make the budget set non-convex: a mixture of two affordable bundles need not itself be affordable.

## Sources

Based on my Cambridge first-year microeconomics notes and the worked examples accompanying [Lecture 1: the budget](https://www.vle.cam.ac.uk/pluginfile.php/15781371/mod_resource/content/5/L1-notes-Micro-2023-24.pdf). The original notes also refer to Chapter 2 of Hal Varian's *Intermediate Microeconomics*. The diagrams here are drawn from the equations above.
