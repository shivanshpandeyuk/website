// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { unified } from '@astrojs/markdown-remark';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { rmSync } from 'node:fs';
import { stagePublicFiles } from './scripts/publication.mjs';

function reviewedPublicFiles() {
  let staging;
  return {
    name: 'reviewed-public-files',
    hooks: {
      'astro:config:setup': ({ command, config, updateConfig }) => {
        if (command !== 'build') return;
        staging = stagePublicFiles(fileURLToPath(config.root));
        updateConfig({ publicDir: pathToFileURL(`${staging}/`) });
      },
      'astro:build:done': () => {
        if (staging) rmSync(staging, { recursive: true });
      },
    },
  };
}

// Change `site` to your final URL (custom domain, GitHub Pages, SRCF, etc.).
// Kept at the root ("/") base so the build is host-agnostic: it works on a
// user GitHub Pages site (shivanshpandey.github.io), Netlify, or your own domain
// with zero changes.
export default defineConfig({
  site: 'https://a-lazy-panda.github.io',
  base: '/',
  trailingSlash: 'ignore',
  image: {
    layout: 'constrained',
    responsiveStyles: true,
  },
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [[rehypeKatex, { strict: false, trust: false, macros: { '\\Tau': 'T' } }]],
    }),
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      wrap: true,
    },
  },
  integrations: [reviewedPublicFiles(), mdx(), sitemap()],
});
