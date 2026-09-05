---
title: This website
date: 2026-09-04
description: My notes, research and code in one place, with readable equations and a search across the site.
repo: https://github.com/A-Lazy-Panda/A-Lazy-Panda.github.io
tags: [Astro, TypeScript, web]
status: live
order: 5
---

I wanted somewhere to keep the work itself: a pitch you can read on the page, a derivation you can follow without opening another file, and the code behind a result. The notes and research had accumulated in different folders; this site gives me somewhere to bring them together and keep improving them.

I use Astro to turn Markdown into static pages. The content collections give each type of work its own structure, while the layout and CSS stay shared. KaTeX renders the equations during the build, and Pagefind generates the search index from the finished pages. Reading an article does not require a live content service.

The less visible part is getting the source material into a condition worth publishing. A successful import can still leave a broken equation, a misplaced chart or a claim that needs checking. I keep the original material and import records separately, then review the page and its figures before publication. The build checks catch missing links and rendering errors; they cannot decide whether the argument is right.
