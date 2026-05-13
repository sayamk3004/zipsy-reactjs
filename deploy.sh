#!/bin/bash
set -e

echo ">>> Pulling latest code..."
git pull

echo ">>> Installing dependencies..."
yarn install --frozen-lockfile

echo ">>> Building app..."
yarn run build

echo ">>> Restarting app..."

# If running under Plesk/Passenger, touching this file triggers a restart
mkdir -p tmp
touch tmp/restart.txt

# If using PM2, restart it too
if command -v pm2 &> /dev/null; then
  pm2 reload "6ammart-web-next-js-dev" 2>/dev/null || \
  pm2 start npm --name "6ammart-web-next-js-dev" -- start
fi

echo ">>> Deploy complete!"
