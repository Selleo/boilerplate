#!/bin/sh
set -e

COMMAND="${1:-server}"

if [ $COMMAND = "server" ]; then
  echo "Starting server..."
  node --max-old-space-size=1024 ./main.js
elif [ $COMMAND = "migrate" ]; then
  echo "Running migrations..."
  node ./drizzle-migrate.js
else
  echo "Usage: entrypoint.sh [server|migrate]"
  exit 1
fi