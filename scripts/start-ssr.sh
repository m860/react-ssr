#!/usr/bin/env bash
rm -fr dist
export NODE_ENV=development
./node_modules/.bin/webpack --config=webpack/webpack.ssr.config.js --watch
