#!/usr/bin/env sh

cd "$(dirname "${BASH_SOURCE[0]}")"
. .env;

day=`date +%-d`
if [[ "$1" ]];
then
  day=$1;
fi

paddedday=`printf "%02d" $day`

year=`date +%Y`;
if [[ "$2" ]];
then
  year=$2;
fi

<${year}/day-${paddedday}/input.txt ${year}/day-${paddedday}/index*