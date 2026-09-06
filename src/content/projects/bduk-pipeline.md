---
title: BDUK broadband evaluation pipeline
date: 2026-01-15
description: The R codebase behind my dissertation — panel construction, genetic matching, heterogeneity-robust DiD, event studies, Bacon decomposition and Monte Carlo, from raw Ofcom data to final figures.
tags: [R, causal-inference, panel-data, data-engineering]
status: live
order: 20
---

The empirical engine behind [the broadband-subsidies dissertation](/dissertations). It takes raw administrative and physical-measurement data and produces the paper's estimates and every figure.

Roughly what it does:

- **Panel construction** from Ofcom exchange data, BDUK allocations, ONS postcode and demographic files, and ThinkBroadband speed measurements — cleaned into a matched exchange-level panel.
- **Genetic matching** to build a credible control group for the endogenously-selected treated areas.
- **Heterogeneity-robust difference-in-differences** as the main estimator, with **event-study** pre-trend diagnostics, a **Goodman–Bacon decomposition**, and **placebo-in-time** and **Monte Carlo** robustness.
- Reproducible figure/table exports (the event-study plots, love plots, common-support and density diagnostics) generated straight from the scripts.

Built in R with a scripted, staged structure (inputs → cleaning → matching → estimation → exports) so the results regenerate from source.
