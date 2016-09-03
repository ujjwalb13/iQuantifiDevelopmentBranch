#!/bin/bash
echo "start watching: $(pwd)"
inotifywait -rm -e modify ./scss | while read; do
  compass compile -s compressed --sass-dir scss/ --force
done
