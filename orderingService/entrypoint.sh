#!/bin/sh

mkdir -p dist

touch ./dist/app.js

pm2 --no-daemon start process.json

nohup tsc -w &