---
draft: false
title: "Lecture 3 - Well behaved preferences, Utility"
paper: "Paper 1 — Microeconomics"
year: "Year 1 (Part I)"
section: "Microeconomics"
description: "Assumptions for well-behaved preferences, strict convexity, and representing preferences with a utility function."
order: 3
tags: ["economics"]
---

Lecture slides at: [L3-notes-Micro-2023-24.pdf (cam.ac.uk)](https://www.vle.cam.ac.uk/pluginfile.php/15802831/mod_resource/content/7/L3-notes-Micro-2023-24.pdf)

**Assumptions for well-behaved preferences:**

1. Monotonic Preferences (more over less)

If the consumer strictly prefers more to less, then we say her preferences are **monotonic**.

That is, (x1, x2) ≻ (y1, y2) whenever:

	x1 ≥ y1, and
	x2 ≥ y2, and
	At least one of these inequalities is strict

This ensures that indifference curves are 'downward sloping'.

![Indifference curve of monotonic preferences, downward sloping, separating bundles strictly better than (a1, a2) from those strictly worse](../../assets/notes/year1/012f6b7fbeb05712f53d.png)

NOTE: This has nothing to do with convexity which is instead informally speaking to do with the fact that the consumer 'prefers averages to extremes'.

Again not all preferences are actually monotonic. Somtimes there is a 'bliss' combo:
![Satiation or bliss point: concentric indifference curves around a best bundle A; not monotonic](../../assets/notes/year1/f8a9a3c7ba5f78350fcd.png)

2. Convex Preferences (average preferred to extreme)

Preferences are convex, if for any two equivalent bundles, (x1, x2) ∼ (y1, y2)

And for any weight t between 0 and 1: (tx1 + (1 − t)y1, tx2 + (1 − t)y2) ≿ (x1, x2)

![Any weighted average of bundles x and y lies on the segment joining them, at (tx1 + (1-t)y1, tx2 + (1-t)y2)](../../assets/notes/year1/f9c780ba3b81eb68bca4.png)

NOTE: As t increases from 0 to 1. The weighted averages gets closer to bundle X than bundle Y. [At t = 0, we simply get the relation that (y1,y2) ≿ (x1, x2)]

Of course not all preferences are convex, consider beer and milk which don't 'mix well together'.

![Convex versus non-convex preferences: on the left the average of X and Y is weakly preferred; on the right (beer and milk) it is not](../../assets/notes/year1/bb49bc934bdd96edb46f.png)

**Strictly Convex Preferences**

Preferences are convex, if for any two equivalent bundles, (x1, x2) ∼ (y1, y2)

And for any weight t between 0 and 1: (tx1 + (1 − t)y1, tx2 + (1 − t)y2) ≻ (x1, x2)

![Strictly convex preferences: the midpoint of two indifferent bundles A and B lies on a strictly higher indifference curve](../../assets/notes/year1/1e395b1b6bf1d3a40834.png)

Here consider the midpoint of A and B. This lies on the same indifference curve but were strict convex preferences to hold then the midpoint would lie on a higher indifference curve.

If such comparisons are repeated infinite times we get the result that. Strictly convex preferences ⇒ unique best bundle in B

![Strict convexity implies a unique best bundle: the average of two best bundles is affordable and strictly preferred, a contradiction](../../assets/notes/year1/eedcf4c1631021ffb995.png)

Well-behaved preferences

![Slide defining well-behaved preferences (complete, transitive, continuous, monotone, strictly convex) and asking which condition puts x* on the budget line](../../assets/notes/year1/fff10332c923c9c33263.png)

NOTE: It is the condition of monotonic preferences that ensure the most preferred budget lies ON not below the budget line.

Utility Function

A utility function is a way of assigning a number to every possible consumption bundle such that more-preferred bundles get assigned larger numbers than less-preferred bundles. A utility function exists if for a preference relation over a finite set A of alternatives is complete and transitive.

![A utility function u: A to R represents preferences when a is weakly preferred to b if and only if u(a) is at least u(b)](../../assets/notes/year1/1889ccfd54520bacb8d1.png)

![Worked example: counting u(a) as the number of alternatives weakly less preferred than a reproduces the ranking x1 over x2 ~ x3 over x4](../../assets/notes/year1/c5f8cdb3e87295e9c4c2.png)

E.g.

![Example utility functions: perfect substitutes u = x1 + 3x2, perfect complements u = min{w/2, b}, and a bliss point u = -(x1-a1)^2 - (x2-a2)^2](../../assets/notes/year1/806f6587b5e5604ee836.png)

Perfect Substitutes:
![Indifference curves of u = x1 + 3x2 (perfect substitutes): parallel lines labelled u = 3, 6, 9](../../assets/notes/year1/df709f3965d089ab6e5c.png)

Perfect Complements:
![Indifference curves of u = min{w/2, b} (perfect complements): L-shaped, kinked on b = w/2, labelled u = 1, 2, 3](../../assets/notes/year1/b8655577cc1b687584e8.png)

Exercise skipped as is trivial.

**Past Exam Questions**:
	Exam 2020-21, Q1
	Exam 2017-18 Q3 (a), (b)
