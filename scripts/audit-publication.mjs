import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { filesUnder, publicFiles, topicInventory } from './publication.mjs';

const root = process.cwd();
const dist = join(root, 'dist');
assert(existsSync(join(dist, 'index.html')), 'Build the site before auditing it');
const hash = file => createHash('sha256').update(readFileSync(file)).digest('hex');
const topics = topicInventory(join(root, 'src/content/topics'));
const drafts = topics.filter(note => !note.reviewed);
const reviewed = topics.filter(note => note.reviewed);
const allowedPublic = new Set(publicFiles());
const forbiddenHashes = new Set();
const approvedHashes = new Set();

for (const file of filesUnder(join(root, 'public'))) {
  const path = relative(join(root, 'public'), file);
  if (allowedPublic.has(path)) {
    assert.equal(hash(join(dist, path)), hash(file), `Approved public file changed: ${path}`);
    approvedHashes.add(hash(file));
  } else {
    assert(!existsSync(join(dist, path)), `Unapproved public file emitted: ${path}`);
    forbiddenHashes.add(hash(file));
  }
}

// A source image shared with a reviewed note is permitted. All other candidate
// image bytes must be absent, even under a hashed filename or unused by a page.
const assetRoot = join(root, 'src/assets/notes');
if (existsSync(assetRoot)) {
  const reviewedBodies = reviewed.map(note => ({
    directory: dirname(note.file), body: readFileSync(note.file, 'utf8'),
  }));
  for (const file of filesUnder(assetRoot)) {
    const referenced = reviewedBodies.some(({ directory, body }) =>
      body.includes(relative(directory, file)) || body.includes(`/${relative(root, file)}`));
    if (referenced) approvedHashes.add(hash(file));
    else forbiddenHashes.add(hash(file));
  }
}

for (const file of filesUnder(dist)) {
  const digest = hash(file);
  assert(approvedHashes.has(digest) || !forbiddenHashes.has(digest), `Unreviewed bytes emitted: ${relative(dist, file)}`);
}

// Check the complete note route set, not just a sample of draft filenames.
const expected = new Set(['index.html', ...reviewed.map(note => {
  const id = note.frontmatter.slug ?? relative(join(root, 'src/content/topics'), note.file).replace(/\.md$/, '');
  return `${id}/index.html`;
})]);
const actual = new Set(filesUnder(join(dist, 'notes'))
  .filter(file => file.endsWith('.html'))
  .map(file => relative(join(dist, 'notes'), file)));
assert.deepEqual(actual, expected, 'Production note routes differ from reviewed notes');

console.log(JSON.stringify({
  reviewedNotes: reviewed.length, excludedDrafts: drafts.length,
  approvedPublicFiles: allowedPublic.size, forbiddenHashes: forbiddenHashes.size,
  builtFiles: filesUnder(dist).length, errors: 0,
}));
