# shivanshpandey.github.io

Personal site — Cambridge economics notes, equity research and stock pitches, writing, programming projects, and dissertation. Built with [Astro](https://astro.build); static output, no runtime dependencies.

## Run it

```bash
npm install
npm run dev      # local dev server at http://localhost:4321
npm run build    # static build into dist/
npm run preview  # preview the built site
```

Node 18+ (you have 22/24, both fine).

## Where things live

```
src/
  consts.ts              # your name, socials, nav — edit links here
  content.config.ts      # schemas for each content type
  content/
    pitches/*.md         # one file per stock pitch
    writing/*.md         # blog posts (investing + education)
    notes/*.md           # one file per Cambridge paper
    projects/*.md        # programming/quant projects
    dissertations/*.md   # long-form research
  pages/                 # routes
  layouts/Base.astro     # page shell, <head>, theme
  components/            # header, footer
  styles/global.css      # the whole design system + colours
public/
  pitches/*.pdf          # pitch decks that get embedded
  dissertations/*.pdf
  favicon.svg
```

## Add a stock pitch

1. Drop the deck PDF in `public/pitches/` (e.g. `my-pitch.pdf`).
2. Create `src/content/pitches/my-pitch.md`:

```md
---
ticker: XYZ
company: Example Corp
exchange: NYSE
sector: Software
date: 2026-01-31
recommendation: Long        # Long | Short | Hold | Watch
thesis: One-line stance shown on the card.
status: published           # published | draft (draft = hidden)
pdf: /pitches/my-pitch.pdf   # optional
tags: [software]
order: 60                    # higher = nearer the top
---

Your write-up in Markdown. Use [R]/[C]/[E]/[U] tags on figures.
```

`status: draft` keeps a pitch off the live site until you're ready.

## Add a blog post

Create `src/content/writing/my-post.md` with `title`, `date`, `category` (Investing / Education / Notes / Other), `description`, then the body. Set `draft: true` to hide it.

## Add notes to a paper

Edit the paper's file in `src/content/notes/` and fill the `files` list:

```md
files:
  - { label: "Full revision notes (PDF)", href: "/notes/y2-micro.pdf" }
```

Put the PDF in `public/notes/` first. **Only upload your own work** — not textbooks or faculty handouts.

## Fonts

The site uses a system serif/sans stack by default (renders as Palatino/Iowan + system UI on your Mac) so it has zero external dependencies. To switch to Newsreader + Inter, uncomment the Google Fonts block in `src/layouts/Base.astro`.

## Deploy

Run `npm run build`, inspect the output, then use `./redeploy.sh` to publish to
https://a-lazy-panda.github.io via the existing `gh-pages` branch.

Production loads only topic notes explicitly marked `draft: false`, before
Markdown processing can emit their images. Local development previews all topics.
Review a candidate's content, figures, maths and mobile rendering before publishing it.

Production copies only the files listed in `scripts/public-files.json` from
`public/`. Add a file to that list only after review; unlisted files stay local.
The build also runs `scripts/audit-publication.mjs` to check the complete note
route set and scan all output files for unreviewed source bytes, including renamed
copies. This complements the static link audit and rendered-page review.
