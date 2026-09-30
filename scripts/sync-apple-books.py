#!/usr/bin/env python3
"""Sync the /reading bookshelf from the Apple Books library on this Mac.

What it touches, per book in src/content/books/*.md (matched by appleBooksFile):
  status, progress, finished, added   <- refreshed from Apple Books
Everything else (title, series, genre, rating, take, the Markdown write-up)
is left exactly as written.

Books that are new to the library get a fresh entry and their cover is
extracted from the EPUB. Samples and non-EPUB items (PDFs, documents) are
skipped. Books removed from the library are left alone.

Runs from redeploy.sh before each build. Safe to run by hand:
  python3 scripts/sync-apple-books.py
Exits 0 without changes if the library cannot be read (e.g. no disk access).
"""
import datetime
import glob
import os
import re
import sqlite3
import subprocess
import sys
import zipfile
import xml.etree.ElementTree as ET

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BOOKS = os.path.join(ROOT, 'src', 'content', 'books')
ASSETS = os.path.join(ROOT, 'src', 'assets', 'books')
LIB = os.environ.get('APPLE_BOOKS_LIB') or os.path.expanduser('~/Library/Containers/com.apple.iBooksX/Data/Documents/BKLibrary')
APPLE_EPOCH = 978307200  # Core Data dates count from 2001-01-01


def day(ts):
    return None if ts is None else datetime.datetime.utcfromtimestamp(ts + APPLE_EPOCH).strftime('%Y-%m-%d')


def slugify(s):
    return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')


def clean_title(t):
    t = re.sub(r'\s*\(.*?\)\s*$', '', t or '')          # "Dark Age (Red Rising Series Book 5)"
    t = re.sub(r'\s*:\s*(THE|A|AN)\b.*$', '', t)          # "Jade City: THE WORLD FANTASY ..."
    t = re.sub(r'^\S+\s+\d+\s+-\s+', '', t)               # "Warlord 01 - The Winter King"
    return t.strip()


def clean_author(a):
    a = (a or '').strip()
    if ',' in a and a.count(',') == 1:                    # "Sanderson, Brandon"
        last, first = [x.strip() for x in a.split(',')]
        a = f'{first} {last}'
    return a


def extract_cover(epub_path, out_jpg):
    NS = {'c': 'urn:oasis:names:tc:opendocument:xmlns:container', 'opf': 'http://www.idpf.org/2007/opf'}
    if os.path.isdir(epub_path):
        rd = lambda n: open(os.path.join(epub_path, n), 'rb').read()
    else:
        z = zipfile.ZipFile(epub_path)
        rd = z.read
    opf_path = ET.fromstring(rd('META-INF/container.xml')).find('.//c:rootfile', NS).get('full-path')
    opf = ET.fromstring(rd(opf_path))
    base = os.path.dirname(opf_path)
    metas = {(m.get('name') or ''): (m.get('content') or '') for m in opf.iter('{http://www.idpf.org/2007/opf}meta')}
    href = None
    items = list(opf.find('opf:manifest', NS).findall('opf:item', NS))
    for it in items:
        if 'cover-image' in (it.get('properties') or ''):
            href = it.get('href')
    if not href and metas.get('cover'):
        href = next((it.get('href') for it in items if it.get('id') == metas['cover']), None)
    if not href:
        href = next((it.get('href') for it in items if (it.get('media-type') or '').startswith('image/') and 'cover' in (it.get('href') or '').lower()), None)
    if not href:
        return False
    raw = rd(os.path.normpath(os.path.join(base, href)).replace(os.sep, '/'))
    tmp = out_jpg + '.src'
    open(tmp, 'wb').write(raw)
    # sips ships with macOS: convert to JPEG and cap the long edge.
    subprocess.run(['sips', '-s', 'format', 'jpeg', '-Z', '960', tmp, '--out', out_jpg], check=True, capture_output=True)
    os.remove(tmp)
    return True


def set_field(text, key, value):
    """Replace or insert `key: value` inside the frontmatter block."""
    head, sep, rest = text.partition('\n---\n')
    lines = head.split('\n')
    pat = re.compile(rf'^{key}:')
    if value is None:
        lines = [l for l in lines if not pat.match(l)]
    else:
        new = f'{key}: {value}'
        for i, l in enumerate(lines):
            if pat.match(l):
                lines[i] = new
                break
        else:
            # keep status fields together, before the comment block if present
            at = next((i for i, l in enumerate(lines) if l.startswith('appleBooksFile:')), len(lines))
            lines.insert(at, new)
    return '\n'.join(lines) + sep + rest


def main():
    dbs = sorted(glob.glob(os.path.join(LIB, 'BKLibrary-*.sqlite')))
    if not dbs:
        print('sync-apple-books: library not found, skipping')
        return
    try:
        con = sqlite3.connect(f'file:{dbs[-1]}?mode=ro', uri=True)
        rows = con.execute('SELECT ZTITLE, ZAUTHOR, ZISFINISHED, ZREADINGPROGRESS, ZDATEFINISHED, ZCREATIONDATE, ZPATH, ZISSAMPLE FROM ZBKLIBRARYASSET').fetchall()
    except sqlite3.Error as e:
        print(f'sync-apple-books: cannot read library ({e}), skipping')
        return

    existing = {}
    for f in glob.glob(os.path.join(BOOKS, '*.md')):
        m = re.search(r'^appleBooksFile:\s*"?(.+?)"?\s*$', open(f).read(), re.M)
        if m:
            existing[m.group(1)] = f

    changed = created = 0
    for title, author, fin, prog, dfin, added, path, sample in rows:
        fn = os.path.basename(path or '')
        if sample or not fn.lower().endswith('.epub'):
            continue
        pct = round((prog or 0) * 100)
        status = 'finished' if fin else ('reading' if pct >= 5 else 'shelf')
        fields = {
            'status': status,
            'progress': 100 if status == 'finished' else pct,
            'finished': day(dfin) if fin else None,
            'added': day(added),
        }
        target = existing.get(fn)
        if target is None:
            t = clean_title(title)
            slug = slugify(t)
            target = os.path.join(BOOKS, slug + '.md')
            if os.path.exists(target):
                continue
            cover_ok = False
            try:
                cover_ok = extract_cover(path, os.path.join(ASSETS, slug + '.jpg'))
            except Exception as e:  # noqa: BLE001 - report and carry on
                print(f'  cover failed for {fn}: {e}')
            if not cover_ok:
                print(f'  skipped {fn}: no cover found')
                continue
            open(target, 'w').write('\n'.join([
                '---', f'title: "{t}"', f'author: "{clean_author(author)}"', 'genre: "Unsorted"',
                f'cover: "../../assets/books/{slug}.jpg"', f'status: {status}', f'progress: {fields["progress"]}',
                f'appleBooksFile: "{fn}"',
                '# Your own words, add whenever you like (all optional):',
                '# series: "Series name"', '# seriesIndex: 1', '# rating: 4', '# take: "One line on the book"',
                '---', '', '<!-- Optional longer write-up goes here, in Markdown. It fills the right-hand page. -->', '']))
            created += 1
        before = open(target).read()
        after = before
        for k, v in fields.items():
            after = set_field(after, k, v)
        if after != before:
            open(target, 'w').write(after)
            changed += 1
    print(f'sync-apple-books: {changed} updated, {created} new')


if __name__ == '__main__':
    try:
        main()
    except Exception as e:  # never block a deploy
        print(f'sync-apple-books: error, skipping ({e})', file=sys.stderr)
