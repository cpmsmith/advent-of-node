#!/usr/bin/env node

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split("\n\n");

function unique(value, index, self) {
  return self.indexOf(value) === index;
}

let answer1 = input.map(group => {
  return a = group.split("\n").join().split("").filter(unique).filter(a => /\w/.test(a)).length;
}).reduce((a, b) => a + b);

let letters = "qwertyuiopasdfghjklzxcvbnm";

let answer2 = input.map(group => {
  let count = 0;
  let inds = group.split("\n");
  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    if (inds.every((ind) => ind.includes(letter))) count++;
  }
  return count;
}).reduce((a, b) => a + b)

console.log(`ANSWER 1: ${answer1}`);
console.log(`ANSWER 2: ${answer2}`);