#!/bin/bash
set -e

echo ">>> Pulling latest code..."
git pull

echo ">>> Installing dependencies..."
yarn install --frozen-lockfile

echo ">>> Stopping server before build to prevent chunk mismatch..."
if command -v pm2 &> /dev/null; then
  pm2 stop "6ammart-web-next-js-dev" 2>/dev/null || true
fi

echo ">>> Building app..."
yarn run build

echo ">>> Starting server with new build..."
if command -v pm2 &> /dev/null; then
  pm2 start "6ammart-web-next-js-dev" 2>/dev/null || \
  pm2 start server.js --name "6ammart-web-next-js-dev"
fi

# Trigger Plesk/Passenger restart if PM2 is not the runner
mkdir -p tmp
touch tmp/restart.txt

echo ">>> Deploy complete!"
