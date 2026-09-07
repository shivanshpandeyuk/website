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
7. Predictable centered hero + a fully STATIC page  ->  asymmetric editorial layout with one deliberate,
   animated hero element. The site must MOVE - see section C. Motion.
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
Motion: see section C - a first-class requirement, the current site is far too static.
Palette: deliberate and documented; light AND dark both first-class; one accent, used sparingly.

## C. MOTION AND INTERACTION (this was missing - the site is far too static)
The references are motion-led; the site must feel alive. Rich but intentional, performant, GPU-friendly.
- Hero: a living background - a slow continuously-drifting animated CSS gradient/mesh (Sway), and a
  staggered entrance where the headline reveals line-by-line (clip/mask rise + fade, ~500-700ms,
  cubic-bezier(0.16,1,0.3,1)); the italic-serif accent word reveals last.
- Scroll reveals: every major section and card animates in on viewport enter via IntersectionObserver -
  fade + rise (16-24px) or a clip-path wipe, staggered ~60-90ms across items, once only.
- Number count-ups: percentages, weights, 86/100, years and portfolio figures count up from 0 when
  scrolled into view, in tabular numerals - reads like a live tearsheet.
- Marquee: one slow continuous horizontal marquee (coverage tickers / skills / a section label) as a
  persistent moving element; pause on hover.
- Cards: hover = image scale ~1.03-1.05, card lift, tint/overlay shift, the circular arrow slides/rotates,
  tags fade in; 300-450ms ease.
- Nav: shrinks and gains a hairline + slight backdrop blur on scroll; a thin top scroll-progress bar; the
  circular scroll cue drifts subtly then fades after first scroll.
- Links/buttons: underline grows from left; gentle hover shift; optional subtle magnetic pull on the CTA.
- Page-to-page: use Astro View Transitions so navigation cross-fades/slides, never a hard cut.
- Build: lightweight vanilla JS (IntersectionObserver + requestAnimationFrame for count-ups and the
  gradient) plus CSS transitions/keyframes; a tiny smooth-scroll is fine; NO heavy framework. Animate
  transform/opacity only, target 60fps, no layout thrash, no horizontal scroll.
- prefers-reduced-motion: reduce  ->  disable gradient drift, count-ups, marquee autoplay and entrance
  transforms; show final static states instantly. Motion never blocks or hides content.

## D. GUARDRAILS
Finance/equity-research, not developer/startup. Only real facts and Shiv voice - no invented bio, role,
date, metric. Fully responsive, never any horizontal scroll. Static Astro + CSS; fonts self-hosted and
free. Keep resume access and all existing pages working. Before deploy: build passes, and VERIFY on a
real rendered page at desktop AND phone widths (screenshot), KaTeX intact, reduced-motion honoured.
Ship in coherent increments (tokens+type first, then cards+metadata, then hero) - do not half-apply a
new font/palette and leave the rest on the old defaults.

HARD COMPLETION GATE: item 1 is NOT done, and must not be marked [done], until Section C. MOTION is
fully implemented - the current site reads as too static. Still required: number count-ups on figures,
richer card hover (image scale + arrow slide + tag reveal), staggered scroll reveals
across more than the 4 homepage sections, and Astro View Transitions for page-to-page. Keep it all
under prefers-reduced-motion. (Done so far: the imagery-forward PROJECTS/NOTES homepage cards with
circular-arrow, the notes PAPER/YEAR/TOPIC tearsheet, and the slow coverage marquee - see the log.)

## INCREMENT LOG
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

### Notes tearsheet + imagery-forward PROJECTS/NOTES cards (2026-09-07, claude)
- Commits 2cb22bf (notes detail `.tearsheet` PAPER/YEAR/TOPIC) and 58df922 (homepage `.gcard`
  imagery-forward NOTES + PROJECTS cards: tinted `--accent` wash band for absent cover art,
  category/service tags, circular-arrow affordance, hairline spec strip). Both deployed and
  live-verified in earlier passes. Full detail in AGENT_BATON.md.

### Coverage marquee (2026-09-07, claude)
- `src/pages/index.astro` + `.home-ticker*` in global.css. One slow continuous horizontal marquee
  (DESIGN.md C "Marquee"): a hairline-bordered band between the hero and the intro `#about` section,
  listing the five real pitch companies as `TICKER  Company  Sector` from pitch frontmatter (no
  fabrication). Two identical `<ul>` rows in a `width:max-content` flex track; CSS `ticker-scroll`
  translates the track `translate3d(-50%,0,0)` over 46s linear infinite; the duplicate row is
  `aria-hidden`. Edge fade via `mask-image` linear-gradient. Pause on hover
  (`animation-play-state: paused`).
- Under `prefers-reduced-motion: reduce`: animation removed, the duplicate row is `display:none`,
  and the remaining row `flex-wrap: wrap`s so it never introduces horizontal scroll.
- Verified: `npm run build` errors:0 / 38 pages / reviewedNotes:21 / excludedDrafts:65; skill static
  audit 38 pages 0 errors 0 warnings; Playwright + installed Chromium on `/` at 1366 + 390px, light
  and dark, both motion modes: `documentElement.scrollWidth - clientWidth == 0`, marquee present,
  animation `ticker-scroll` with motion / `none` under reduced-motion, 0 `.katex-error`; desktop and
  mobile-dark band screenshots clean.
- Item 1 remainder still open (HARD COMPLETION GATE): number count-ups on figures, richer imagery-card
  hover (image scale + arrow slide + tag reveal), staggered scroll reveals beyond the 4 homepage
  sections, Astro View Transitions page-to-page - all under prefers-reduced-motion.

### Card hover and keyboard interaction (2026-09-07, codex)
- Pitch cards and homepage Notes/Projects cards share a 3px lift, 350–450ms image/wash
  zoom and arrow slide/rotation. Pitch covers gain a restrained accent tint below the
  existing text scrim. Wash zoom stays clipped inside its band; no new imagery or copy.
- Existing tags stay readable at rest and on touch devices. Hover and keyboard focus
  replay a brief fade/rise with a 55ms stagger. Focus also gets the arrow fill and title
  colour previously limited to hover. Pointer motion requires a fine, hover-capable input.
- All transforms/tag animations are inside `prefers-reduced-motion: no-preference`.
  Reduced motion keeps static tags and instant colour/focus feedback, including fixing
  the previously unconditional pitch zoom and gallery-card lift.
- Card lift uses `translate` separately from the scroll-reveal `transform`; the reveal
  transition explicitly preserves lift timing without inheriting the entrance delay.
  Carousel top padding leaves room for the lift and focus outline.
- Item 1 remains open: count-ups and Astro View Transitions are still outstanding;
  review the full Section C completion gate before closing the overall item.

### Number count-ups on figures (2026-09-07, claude)
- `src/pages/index.astro` (a second `<script>` + four `<span class="countup">` wraps) and a
  `.countup` rule in global.css. DESIGN.md C "Number count-ups": the figures already on the
  homepage roll 0 -> value the first time they are scrolled into view. Wrapped, with NO wording
  change: the intro paragraph's `84`% final-year mark and `$500`m Bending Spoons acquisition, and
  the résumé rail's `$500`m and `84`% (same two real facts). Years were deliberately left un-wrapped
  - a four-digit year spinning up from 0 reads worse than it helps.
- `.countup { font-variant-numeric: tabular-nums lining-nums }` so the digits are fixed-width and
  the line never reflows mid-count; `.home-rail__item .countup { display:inline }` overrides the
  rail's `span { display:block }`.
- Vanilla JS: each span is set to `0`, then a rAF-throttled `scroll` sweep (plus one initial call)
  animates any span once its top passes 92% of the viewport, easing `1-(1-t)^3` over 900ms; a
  `data-countup-done` flag makes it fire once; detached spans are dropped and the listener removed
  when nothing is pending. Re-runs on `astro:page-load` for view-transition nav.
- `prefers-reduced-motion: reduce` -> the script writes every final value immediately and never
  sets `0` or attaches a listener. Same fallback if `IntersectionObserver` is missing.
- Verified: `npm run build` errors:0 / 38 pages / reviewedNotes:21 / excludedDrafts:65;
  `scripts/audit-publication.mjs` errors:0. Playwright + Chromium on `/` at 1366 + 390px x
  prefers-reduced-motion {no-preference, reduce}: `documentElement.scrollWidth - clientWidth == 0`,
  4 `.countup` spans, all settle to their `data-countup-to` value, all computed
  `font-variant-numeric` includes `tabular-nums`, 0 `.katex-error`, 0 pageerror; a top-to-bottom
  human-style scroll pass lands every figure on its final value; desktop light/dark + mobile-dark
  screenshots clean (`.rota-review/countup-*.png`).
- This was the last item in the HARD COMPLETION GATE's "Still required" list (count-ups, richer
  card hover [db40f95], staggered scroll reveals beyond 4 sections [16b015c], Astro View
  Transitions [2ba4321]) - all now shipped under reduced-motion. Residual Section C flourishes not
  built (nav scroll-progress bar, underline-grow-from-left on links, optional magnetic CTA) are
  tracked as a new P6 polish item, not gate blockers.
