---
title: Reproducible treatment-effect workflow (Stata + R)
date: 2024-01-26
description: A parallel Stata/R implementation of AIPW estimation with randomisation inference and step-down multiple-testing correction, written up as a workflow guide.
tags: [Stata, R, causal-inference, reproducibility]
status: live
order: 30
---

A worked, reproducible pipeline for estimating average treatment effects and doing inference honestly. Every step is implemented **twice — once in Stata, once in R** — so the two can be cross-checked against each other.

What it covers:

- **AIPW by strata** — augmented inverse-probability-weighting estimators of the ATE.
- **Randomisation vs. bootstrap distributions** — building the null by re-randomising treatment, and comparing to the bootstrap, rather than leaning on asymptotics.
- **Step-down p-values** — a Romano–Wolf-style multiple-testing correction so that "significant" survives testing many outcomes at once.
- A LaTeX **workflow guide** documenting the master scripts, the simulation programs, and the output tables so the whole thing reruns end to end.

The point of the project was less any single result than the discipline: a clean separation of simulation, estimation and output, and inference that doesn't quietly assume the thing it's trying to test.
