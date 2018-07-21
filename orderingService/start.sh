#!/bin/sh

mkdir -p dist

touch ./dist/app.js

nohup tsc -w

pm2 --no-daemon start process.json