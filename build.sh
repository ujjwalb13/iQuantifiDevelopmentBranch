#!/bin/sh

grunt build
rsync -av --delete dist/index.html dist/css dist/images dist/js ./release
