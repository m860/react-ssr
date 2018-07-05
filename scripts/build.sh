#!/usr/bin/env bash
./node_modules/webpack/bin/webpack.js --env.NODE_ENV=production
cp package.json dist/