#!/bin/bash -ev

PLUGINS=(
  cleanUrlTracker
  maxScrollTracker
  outboundLinkTracker
  mediaQueryTracker
  pageVisibilityTracker
)

function dev {
  # Prepare autotrack
  autotrack -o static/js/autotrack.js -p $(echo ${PLUGINS[@]} | tr ' ' ',')

  # Generate client bundle
  rollup -c config/rollup.js

  # Cleanup
  rimraf static/js/autotrack.*
}

function prod {
  # Build server side
  babel src -d dist

  dev

  # Copy static files
  cp -rp static dist/

  # Copy over push manifest
  cp -rp src/server/data dist/server/

  # Copy package.json and yarn.lock
  cp *.json dist; cp *.lock dist

  # Cleanup
  rimraf dist/client dist/types
}

if [ -n $NODE_ENV ]; then prod; else dev; fi
