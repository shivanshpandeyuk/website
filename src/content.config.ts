import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// --- Stock pitches ------------------------------------------------------
const pitches = defineCollection({
  loader: glob({ base: './src/content/pitches', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    ticker: z.string(),
    company: z.string(),
    exchange: z.string().optional(),
    sector: z.string().optional(),
    date: z.coerce.date(),
    thesis: z.string(), // one-line stance, shown on cards
    recommendation: z.enum(['Long', 'Short', 'Hold', 'Watch']).optional(),
    status: z.enum(['published', 'draft']).default('published'),
    pdf: z.string().optional(), // e.g. /pitches/APR.pdf
    cover: z.string().optional(), // e.g. /pitches/img/apr/cover.png
    tags: z.array(z.string()).default([]),
    order: z.number().default(0),
  }),
});

// --- Writing (investment + education blog) ------------------------------
const writing = defineCollection({
  loader: glob({ base: './src/content/writing', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    category: z.enum(['Investing', 'Education', 'Notes', 'Other']).default('Other'),
    description: z.string(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

// --- Programming projects ----------------------------------------------
const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    repo: z.string().optional(),
    url: z.string().optional(),
    status: z.enum(['live', 'wip', 'archived']).default('live'),
    order: z.number().default(0),
  }),
});

// --- Dissertations & long-form -----------------------------------------
const dissertations = defineCollection({
  loader: glob({ base: './src/content/dissertations', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    level: z.string(), // e.g. "BA Economics, Cambridge"
    year: z.string(),
    abstract: z.string(),
    pdf: z.string().optional(),
    grade: z.string().optional(),
    tags: z.array(z.string()).default([]),
    order: z.number().default(0),
  }),
});

// --- Cambridge notes (one entry per paper/module) ----------------------
const notes = defineCollection({
  loader: glob({ base: './src/content/notes', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    paper: z.string(), // e.g. "Paper 1: Microeconomics"
    year: z.string(), // e.g. "Year 1"
    term: z.string().optional(),
    description: z.string().default(''),
    files: z
      .array(z.object({ label: z.string(), href: z.string() }))
      .default([]),
    tags: z.array(z.string()).default([]),
    order: z.number().default(0),
  }),
});

const topics = defineCollection({
  loader: glob({ base: './src/content/topics', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    paper: z.string(),
    year: z.string(),
    section: z.string(),
    description: z.string(),
    order: z.number().default(0),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { pitches, writing, projects, dissertations, notes, topics };
