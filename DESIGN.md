# Design cues (from sunnypatel.net) — LIGHT touch, FINANCE style, not a rebuild

Shiv likes the reference's SMOOTHNESS and its project-card presentation, but his site must read as
FINANCE / equity-research, NOT developer/coding. The reference leans dev (monospace "coding" font,
a terminal card, 01/02 code-style numbering). Do NOT copy that flavour. Keep his current homepage,
layout, content and voice; borrow only the two things below.

## 1. Keep the smoothness (this is the main positive)
Buttery, restrained motion: fade+rise on section enter (~400ms), smooth hover on links/cards
(underline grow, slight lift). Respect prefers-reduced-motion. No parallax gimmicks, no bounce.

## 2. Project / selected-work cards (he called these cool)
Restyle the projects + selected-work cards: a real page preview or restrained browser-chrome mock on
top, title left, year right-aligned, one-line muted description, small status dot where true ("Live",
"Ongoing"). Subtle hover (lift + border warm). Cards link to the real notes/pitches/projects/dissertation.

## Finance styling, NOT coding
- NO monospace / terminal / "code" font anywhere as a design motif. NO terminal or "SESSION" card.
  NO dev-style 01/02 numbered kickers that read as code.
- Instead: a premium editorial/finance feel. A refined serif or a sharp confident grotesk for display;
  clean sans for body. Use TABULAR (lining) numerals for any figures/years/percentages so numbers align
  like a tearsheet. Sophisticated, restrained palette; one subtle accent, used sparingly.
- Think equity-research / buy-side polish: serious, data-forward, uncluttered. Not startup-dev, not
  ultra-minimal.

## Do NOT
- Do not switch the whole site to near-black or a cinematic hero. Do not enlarge display type to
  reference scale. Do not add a monospace/terminal aesthetic. Keep current layout, resume access, content.

Verify on a real rendered page (desktop + phone) before deploy: no overflow, KaTeX intact.
