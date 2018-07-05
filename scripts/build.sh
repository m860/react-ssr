#!/usr/bin/env bash
./node_modules/.bin/webpack --env.NODE_ENV=production
cp package.json dist/