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

year=`date +%Y`;
if [[ "$2" ]];
then
  year=$2;
fi

curl -H "Cookie: $COOKIE" https://adventofcode.com/${year}/day/$1/input >day-$1/input.txt;