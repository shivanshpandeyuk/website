import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { parseFrontmatter } from '@astrojs/markdown-remark';

export function filesUnder(directory) {
  return readdirSync(directory, { recursive: true, withFileTypes: true })
    .filter(entry => entry.isFile())
    .map(entry => join(entry.parentPath, entry.name));
}

export function topicInventory(directory) {
  return filesUnder(directory).filter(file => file.endsWith('.md')).map(file => {
    const { frontmatter } = parseFrontmatter(readFileSync(file, 'utf8'));
    return { file, reviewed: frontmatter.draft === false, frontmatter };
  });
}

// Explicit publication list. Add assets here only after their content review.
// Loose files in public/ remain available to local development, never to builds.
export function publicFiles() {
  return JSON.parse(readFileSync(new URL('./public-files.json', import.meta.url), 'utf8'));
}

export function stagePublicFiles(root) {
  const cache = join(root, '.astro');
  mkdirSync(cache, { recursive: true });
  const staging = mkdtempSync(join(cache, 'reviewed-public-'));
  for (const file of publicFiles()) {
    if (file.startsWith('/') || file.split('/').includes('..')) {
      throw new Error(`Invalid public file path: ${file}`);
    }
    const target = join(staging, file);
    mkdirSync(dirname(target), { recursive: true });
    copyFileSync(join(root, 'public', file), target);
  }
  return staging;
}
