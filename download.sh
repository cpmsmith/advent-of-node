#!/usr/bin/env sh

cd "$(dirname "${BASH_SOURCE[0]}")"
. .env;

if [[ -z $COOKIE ]];
then
  echo "\$COOKIE not set in .env";
  exit 1;
fi

day=`date +%-d`
if [[ "$1" ]];
then
  day=$1;
fi

paddedday=`printf "%02d" $day`

year=`date +%Y`;
# TODO: make this send other years' downloads to the practice folder
if [[ "$2" ]];
then
  year=$2;
fi

curl -H "Cookie: $COOKIE" https://adventofcode.com/${year}/day/$day/input >${year}/day-${paddedday}/input.txt;
