# DESIGN BRIEF v2 - remove vibe-coded defaults, adopt a real finance-editorial system

Shiv: the site reads as templated/vibe-coded in places. Remove EVERY generic default (listed below)
and replace it with a deliberate, finance/equity-research editorial system drawn from three references
he chose: sway.capital (dark, iridescent gradient, huge LIGHT-weight grotesk, teal accent, asset-manager
confidence), unseen.co/projects/crosswire (light editorial, grotesk + ITALIC-SERIF display accent,
tearsheet spec-sheet metadata, asymmetric whitespace), fuselabcreative.com (big imagery-forward project
cards with category+service tags, large title, circular-arrow affordance).

Keep the smooth motion. Finance feel, NOT coding. Real content and Shiv voice only, no fabrication.

## A. VIBE-CODED DEFAULTS TO REMOVE (audit src/styles/global.css + every component; replace all instances)
1. --font-sans: Inter  ->  a distinctive self-hosted grotesk with real character. Use a FREE, legally
   redistributable face (never pirate Haffer / Neue Montreal). Good matches for the references feel:
   General Sans or Switzer (Fontshare, free), Schibsted Grotesk, or Hanken Grotesk. Self-host woff2 in
   public/fonts via @font-face. Inter / system-ui may remain only as the last fallback, never primary.
2. Add an ITALIC-SERIF DISPLAY accent face (the Unseen move) for one or two words per headline, large:
   Fraunces (variable, optical sizes + true italic) or Instrument Serif. Use sparingly for emphasis.
3. --font-mono: JetBrains Mono used for tickers / percentages / provenance  ->  DROP mono as a design
   motif (it reads as coding). Keep a mono ONLY inside real code blocks in notes. Render tickers,
   percentages, years and all figures in the sans/serif with font-variant-numeric: tabular-nums
   lining-nums so numbers align like a research tearsheet.
4. --accent #35618a (generic ink blue) and --mark #b8552f (borrowed terracotta)  ->  choose ONE
   deliberate, documented accent used with restraint (a considered deep tone, or a single confident
   vivid like the references teal/green). Remove the leftover terracotta default.
5. --shadow (the double soft drop-shadow)  ->  remove generic card shadows. Cards are led by imagery and
   hairline borders, or one intentional elevation. No blanket box-shadow.
6. --radius 10px / --radius-sm 7px applied uniformly  ->  set radii with intent: near-sharp on text
   surfaces (Sway/Unseen), a deliberate larger radius only on imagery cards (Fuselab ~14-16px).
7. Predictable centered hero + uniform section rhythm + fade-up-on-everything  ->  asymmetric editorial
   layout, one deliberate hero element, intentional scroll-aware motion (not blanket AOS on every block).
8. Lazy pill chips / status dots / any emoji  ->  remove or make deliberate.

## B. THE NEW SYSTEM
Type: light/regular-weight grotesk at large display sizes, tight tracking (about -0.01 to -0.02em);
  one italic-serif accent word per major headline; tabular lining numerals everywhere numbers appear.
Project + pitch cards (Fuselab): full-bleed real page preview or restrained mock; small category +
  service tags top; large title; circular-arrow affordance; deliberate radius; border/imagery led, no
  soft shadow; smooth hover (lift + reveal). Link to the real notes / pitches / projects / dissertation.
Metadata as a tearsheet (Unseen): uppercase micro-labels + values. Pitches: TICKER / SECTOR / DATE /
  STANCE. Projects: ROLE / DATE / STACK / OUTCOME. Notes: PAPER / YEAR / TOPIC. Real values only.
Hero: one deliberate immersive element - a restrained animated CSS gradient (Sway) OR a strong static
  visual - with a large light-weight headline, ONE italic-serif accent word, confident asymmetric
  placement, a thin circular scroll / arrow affordance. Not a default centered text block.
Motion: smooth and scroll-aware (Sway/Unseen), intentional per section, respect prefers-reduced-motion.
Palette: deliberate and documented; light AND dark both first-class; one accent, used sparingly.

## C. GUARDRAILS
Finance/equity-research, not developer/startup. Only real facts and Shiv voice - no invented bio, role,
date, metric. Fully responsive, never any horizontal scroll. Static Astro + CSS; fonts self-hosted and
free. Keep resume access and all existing pages working. Before deploy: build passes, and VERIFY on a
real rendered page at desktop AND phone widths (screenshot), KaTeX intact, reduced-motion honoured.
Ship in coherent increments (tokens+type first, then cards+metadata, then hero) - do not half-apply a
new font/palette and leave the rest on the old defaults.

## D. INCREMENT LOG
### Increment 1 - tokens + type (2026-09-07, claude)
- Fonts self-hosted in public/fonts (woff2, SIL OFL, no external requests):
  - Sans / display: Hanken Grotesk (latin + latin-ext, weight axis 400-700). Replaces Inter/system-ui
    as `--font-sans`. All headings, brand, card/row titles, resume rail now use it at light weight
    (h1/h2 480, tracking -0.02em). (Schibsted Grotesk was tried first and rejected: its Google-Fonts
    build has a broken `tnum` feature that spaces out punctuation under tabular-nums.)
  - Italic-serif accent: Fraunces italic (`--font-accent`), used by `.accent` (one/two headline words -
    wired per-page in later increments) and `.prose blockquote`.
- Mono dropped as a motif: `--font-mono` kept ONLY for `.prose code` / `pre` (real code). Tickers,
  provenance tags and figures render in the sans with `font-variant-numeric: tabular-nums lining-nums`
  (also set on `body`).
- One accent colour, documented: deep teal-green `--accent` #1f5d4e (light) / #7cc9ac (dark), with
  `--accent-2` and `--accent-soft`. Old ink-blue #35618a and terracotta `--mark` #b8552f removed.
- Shadows: `--shadow` token and every `box-shadow` removed. Cards/dissertation feature/figures now lift
  on hover via border-colour + a 2px translate only; imagery led by hairline borders.
- Radii with intent: `--radius` 6px and `--radius-sm` 4px (near-sharp text surfaces); new
  `--radius-card` 14px for imagery cards (`.pcard`, `.pitch-hero`) only.
- Not yet done (later increments): tearsheet metadata blocks, imagery-forward card layout with
  category+service tags and circular-arrow, asymmetric hero + scroll affordance, per-headline accent
  words, scroll-aware motion review.

### Increment 2 - pitch cards + tearsheet metadata (2026-09-07, claude)
- `PitchCard.astro` reworked to the Fuselab imagery card: category/venue tags (sector + exchange),
  large grotesk title, 2-line thesis clamp, a TICKER/STANCE/DATE tearsheet strip on a hairline rule,
  and a circular-arrow affordance top-right (fills on hover; arrow-nudge under
  `prefers-reduced-motion: no-preference`). Used on the homepage carousel and `/pitches`.
- Pitch detail pages get an Unseen-style `.tearsheet` spec strip (TICKER / EXCHANGE / SECTOR / DATE /
  STANCE) - uppercase micro-labels + tabular values on a hairline top border. `.tearsheet` CSS is
  generic so projects/notes can reuse it. All values from real pitch frontmatter.

### Increment 3 - asymmetric hero + scroll affordance + accent word (2026-09-07, claude)
- Homepage hero (`src/pages/index.astro`, `.home-hero` in global.css) made asymmetric: text children
  capped at `max-width: 40rem` so the column stays left-weighted with deliberate right-side
  whitespace; on >=48rem a `padding-right: 4rem` reserves the right gutter.
- One restrained immersive element: a `.home-hero::before` radial wash in `--accent`
  (`color-mix ... 24%`, opacity .55) top-right, drifting via `hero-drift` 22s
  ease-in-out alternate. Frozen under `prefers-reduced-motion: reduce`.
- Thin circular scroll affordance: `.home-hero__scroll` - a 2.75rem hairline circle with a down-arrow
  SVG, `href="#about"` (the intro `<section id="about">`), `aria-label`. On >=48rem it is
  `position: absolute; right:0; bottom:.15rem` (bottom-right of the hero, ~20px clear of the
  "Currently" line); on mobile it stacks under the hero text. Arrow `hero-nudge` bob only under
  `prefers-reduced-motion: no-preference`; smooth scroll already `auto` under reduced-motion globally.
- Per-headline italic-serif accent word wired: hero `<h1>` now reads
  "Economics, *statistics*, and equity research." with "statistics" in `<span class="accent">`
  (Fraunces italic, `--font-accent`). One word only, per DESIGN.md B "sparingly". No wording change.
- Scroll-aware motion reviewed: kept as-is. Load entrance is limited to `.home-hero > *` (staggered
  `home-rise`); scroll reveal is IntersectionObserver-gated on `.home__main > section.reveal` only
  (4 sections), not blanket AOS; JS bails entirely under `prefers-reduced-motion: reduce`.
- Verified: `npm run build` errors:0 / 38 pages; skill static audit 38 pages 0 errors 0 warnings;
  Chrome headless via Playwright - documentElement overflowX == 0 at 390 / 980 / 1366px, light and
  dark; accent word renders Fraunces italic; affordance bottom-right desktop / stacked mobile;
  reduced-motion freezes both keyframes.
- Increment 3 done. Item 1 remainder still open: imagery-forward treatment + circular-arrow for the
  PROJECTS and NOTES homepage cards (no cover art yet), notes `.tearsheet` (PAPER/YEAR/TOPIC).
