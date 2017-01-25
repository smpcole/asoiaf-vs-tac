#!/bin/bash

git clean -fdx blurbs
rm blurbs.txt 2> /dev/null
touch blurbs.txt

for f in `ls blurbs`; do
	echo $f >> blurbs.txt
	cat blurbs/$f >> blurbs.txt
	echo "" >> blurbs.txt
done
