#!/usr/bin/env bash
rm -fr dist
export NODE_ENV=production
./node_modules/.bin/webpack --config=webpack/webpack.spa.config.js --progress --quiet
