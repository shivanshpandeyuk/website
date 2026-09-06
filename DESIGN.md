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
