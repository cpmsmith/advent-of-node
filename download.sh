#!/usr/bin/env sh

. .env;

if [[ -z $COOKIE ]];
then
  echo "\$COOKIE not set in .env";
  exit 1;
fi

if [[ -z $1 ]];
then
  echo "Missing day number";
  exit 1;
fi

paddedday=`printf "%02d" $1`

year=`date +%Y`;
# todo: make this send other years' downloads to the practice folder
if [[ "$2" ]];
then
  year=$2;
fi

curl -H "Cookie: $COOKIE" https://adventofcode.com/${year}/day/$1/input >day-${paddedday}/input.txt;
