#!/usr/bin/env node

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const strings = input.split("\n");

const nice = strings.filter(s => (
  s.match(/[aeiou]/g)?.length >= 3 && s.match(/(.)\1/) && !s.match(/(ab|cd|pq|xy)/)
)).length;

console.log(nice);

const nice2 = strings.filter(s => (
  s.match(/(..).*\1/) && s.match(/(.).\1/)
)).length;

console.log(nice2);