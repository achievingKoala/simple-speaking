#!/bin/sh
set -eu
cd "$(dirname "$0")"
mkdir -p dist
cp index.html app.js tencent-recognition.js pcm-recorder.js complete.wav dist/
