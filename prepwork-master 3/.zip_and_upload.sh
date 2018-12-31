#!/bin/bash
# Zip and upload exercises

# Verbose outpu
set +x
# Exit on error
set -e

#zip -u ../zips/$i.zip $i* jasmine-2.4.1/*

cd 2_your_toolbox
for i in Exercise1_arrays_and_strings Exercise2_functions Exercise3_arrays_and_functions Exercise4_objects Exercise5_libraries; do
  git archive -v HEAD --format=zip --prefix=${i}/ -o ../zips/${i}.zip $i* jasmine-2.4.1/*
done

cd ..

cd 3_js_arcade
  git archive -v HEAD --format=zip --prefix=1Tic_Tac_Toe/ -o ../zips/1Tic_Tac_Toe.zip 1Tic_Tac_Toe* jasmine/*
  git archive -v HEAD --format=zip --prefix=2Hangman/ -o ../zips/2Hangman.zip 2Hangman* jasmine/* img/hangman*.png
  git archive -v HEAD --format=zip --prefix=3Towers_of_Hanoi/ -o ../zips/3Towers_of_Hanoi.zip 3Towers_of_Hanoi* jasmine/*
cd ..

cd zips
aws --profile=horizons s3 sync --exclude .DS_Store . s3://horizons-static/prepwork/3_js_arcade
