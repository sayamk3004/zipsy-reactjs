#!/bin/bash
# Manual emergency deploy — normally GitHub Actions handles this automatically.
set -e

cd /var/www/vhosts/zipsy.co.uk/httpdocs

echo ">>> Pulling latest code..."
git pull origin main

echo ">>> Installing dependencies..."
yarn install --frozen-lockfile

echo ">>> Stopping server..."
pm2 stop "6ammart-web-next-js-dev" 2>/dev/null || true

echo ">>> Building (takes ~3 minutes on this server)..."
NODE_OPTIONS="--max-old-space-size=1536" yarn build

echo ">>> Starting server..."
pm2 restart "6ammart-web-next-js-dev" 2>/dev/null || \
  pm2 start server.js --name "6ammart-web-next-js-dev"
pm2 save

mkdir -p tmp && touch tmp/restart.txt

pm2 list
echo ">>> Done!"
