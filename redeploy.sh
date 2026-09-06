#!/usr/bin/env bash
# Rebuild the site and publish it to https://a-lazy-panda.github.io
set -e
cd "$(dirname "$0")"
npm install --no-audit --no-fund
npm run build
git push origin HEAD:main 2>/dev/null || true  # keep source repo current
cd dist
touch .nojekyll
rm -rf .git
git init -q && git checkout -q -b main
git config user.name 'Shivansh Pandey'
git config user.email 'shivanshpandeyuk@gmail.com'
git add -A && git commit -q -m "Deploy $(date +%F_%H:%M)"
git push -f https://github.com/shivanshpandeyuk/shivanshpandeyuk.github.io.git main
echo "Live: https://shivanshpandeyuk.github.io"
