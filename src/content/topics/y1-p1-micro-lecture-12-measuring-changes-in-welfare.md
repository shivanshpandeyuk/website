---
draft: false
title: "Lecture 12 - Measuring changes in welfare"
paper: "Paper 1 — Microeconomics"
year: "Year 1 (Part I)"
section: "Microeconomics"
description: "The expenditure and indirect utility functions, and measuring welfare changes with compensating and equivalent variation."
order: 12
tags: ["economics"]
---

Readings: Hal R. Varian, *Intermediate Microeconomics*, Chapter 14. [R]

Figures: University of Cambridge, Part I Microeconomics lecture-slide extracts, with study annotations. Numerical examples in the slides are reported teaching examples [R].

## Quasi-linear preferences

Denoting by $w(n)$ the consumer’s maximum willingness to pay for n apples, her consumer surplus associated with holding n apples is $w(n) - pn$ where $p$ is the unit price of apples.

Such preferences are called **quasi-linear** and can be represented by a utility function:

$$
u(a,x)=v(a)+x
$$

in which x is interpreted as money (spent on all consumption other than good a).

![Annotated lecture slide: quasi-linear utility and the interior optimum, where marginal utility per pound is equal across goods.](../../assets/notes/year1/ee344a75d8723c6d4e88.png)

i.e. at an interior optimal choice, marginal utility per pound spent on each type of good (money, good a) is equal to one. It also means that the utility associated with another addition of good a is equal to the price of good a.

![Lecture slide: interior demand for the non-money good is independent of income under quasi-linear preferences; the numerical illustration is reported from the slide.](../../assets/notes/year1/1afbb5d2c579cde42650.png)

## Expenditure Function

For non quasi-linear preferences we consider the least amount of money required to move up to a new indifference curve as the size of the change in welfare.

![Lecture example: welfare improvement as the difference between minimum expenditure at two utility levels, holding prices fixed.](../../assets/notes/year1/7e0af8091966c1354d71.png)

NOTE: Clearly the cost required to move from u' to u'' depends on the prices.
(visually)

![Lecture diagram: the cost of moving between the same two indifference curves depends on the reference prices.](../../assets/notes/year1/3d2c0bf48002828ec707.png)

**Expenditure Function**, **e(p,u) where u is a utility to be met**

![Lecture slide: Hicksian demand minimises expenditure for a target utility; expenditure is the cost of that bundle.](../../assets/notes/year1/c93fd6cd971583f1e8b0.png)

## Indirect utility function

$v(p,m)$ <--- not a normal utility function as it takes inputs price and income

![Lecture slide: Marshallian demand maximises utility given prices and income; expenditure at the resulting utility recovers income.](../../assets/notes/year1/c0b6e3ab6a68ed100562.png)

![Annotated slide: compare the status quo and proposed utilities using expenditure at common reference prices.](../../assets/notes/year1/42e1abe07b3366ea25be.png)

## EQUIVALENT VARIATION

(a view from the status quo)
i.e. To see the impact of a price change in monetary terms, we ask **how much money should have been given _before_ the price change** to **leave a consumer at the same utility level he attains _after_ the price change.**

![Annotated slide: equivalent variation evaluates the new utility at the original prices, then subtracts original income.](../../assets/notes/year1/f8c51aa0356ae6614834.png)

Varian — for a price increase, the maximum amount of income that the consumer would be willing to pay to avoid the price change.

![Lecture slide: equivalent variation uses status quo prices to compare the proposed state with the original state.](../../assets/notes/year1/83fe1888d474668ef1b7.png)

## COMPENSATING VARIATION

(a view at the new state)
i.e. measures the change in income that would be adequate to compensate the consumer for the change in price.

![Lecture slide: compensating variation uses new prices and measures income removable after a welfare improvement.](../../assets/notes/year1/e1e23ec19628fbf5e8fa.png)

Varian — for a price increase, the amount of money that the consumer would have to be paid to compensate him for a price change

## Visually

Under equivalent variation we focus on the old prices, that is we consider a new theoretical budget line that is parallel to the old budget line and shift it up/down to the new indifference curve under the new utility level. Then the difference between the old budget line and the theoretical budget line gives the EV see:

![Lecture diagram: EV compares parallel budget lines at old prices; CV compares parallel budget lines at new prices.](../../assets/notes/year1/e293979ee2e680179450.png)

Now consider compensating variation, as this is based on new prices we create a new theoretical budget line that is parallel to the new (blue) budget line and shift it back onto the old indifference curve. The difference between the two curves gives the amount of income that needs to be removed to bring utility back to its old level.

E.g./

![Lecture Cobb–Douglas example: a fall in the first price raises utility; expenditure differences give EV and CV. See the correction below for the duplicated income subtraction.](../../assets/notes/year1/21023fff0795c7ca8923.png)

Correction to the slide: the CV line has an extra subtraction of $m$. It should read $CV=m-e(p_1^{\prime\prime},p_2,u^{\prime})=3(1-2^{-1/3})$. [C]

## Shephard’s Lemma

To interpret this in terms of Hicksian demand.

![Lecture slide: Shephard’s lemma gives Hicksian demand as the price derivative of expenditure; integration gives CV and EV for a single price change.](../../assets/notes/year1/dc8f4ec0cf2bb3f27912.png)

![Lecture diagram: sliding a tangent along a fixed indifference curve gives the Hicksian-demand integral for EV or CV.](../../assets/notes/year1/4766536c8fdd8ee258d6.png)

E.g/ Using the same example from above should yield the same result:

![Lecture example: integrating Hicksian demand reproduces the expenditure-based EV and CV calculations.](../../assets/notes/year1/27a99f940ac5ffbb13ac.png)

## Comparing Marshallian demand with Hicksian demand

For price changes:

![Lecture slide: consumer surplus integrates Marshallian demand; CV and EV integrate Hicksian demand at the old and new utility levels.](../../assets/notes/year1/3b23e1b18aad394bca9b.png)

![Annotated lecture diagram: Hicksian demand follows a fixed indifference curve, while Marshallian demand follows the price-consumption curve.](../../assets/notes/year1/efeddd226d00ade2ecaa.png)

Important to recall that $p_2 = 1$. [R]
