import { relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { glob, type Loader } from 'astro/loaders';
import { topicInventory } from '../../scripts/publication.mjs';

export function reviewedTopics(): Loader {
  return {
    name: 'reviewed-topics',
    async load(context) {
      const base = new URL('./src/content/topics/', context.config.root);
      if (context.watcher) {
        // Local development still previews candidates and watches all notes.
        return glob({ base, pattern: '**/*.md' }).load(context);
      }
      // Filter BEFORE Markdown rendering can register a draft's asset imports.
      // Clear cached dev entries, including when there are no reviewed notes.
      context.store.clear();
      const pattern = topicInventory(fileURLToPath(base))
        .filter(note => note.reviewed)
        .map(note => relative(fileURLToPath(base), note.file));
      if (pattern.length) await glob({ base, pattern }).load(context);
    },
  };
}
