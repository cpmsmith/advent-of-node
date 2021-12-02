#!/usr/bin/env sh

cd "$(dirname "${BASH_SOURCE[0]}")"
. .env;

if [[ -z $1 ]];
then
  echo "Missing day number";
  exit 1;
fi

paddedday=`printf "%02d" $1`

year=`date +%Y`;
if [[ "$2" ]];
then
  year=$2;
fi

<${year}/day-${paddedday}/input.txt ${year}/day-${paddedday}/index*