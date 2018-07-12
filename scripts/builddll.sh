#!/usr/bin/env bash
rm -fr build
./node_modules/.bin/webpack --config=webpack/webpack.dll.config.js --progress --quiet