#!/usr/bin/env node

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();

let floor = 0;
let firstBasement = null;

for (let i = 0; i < input.length; i++) {
  switch (input[i]) {
    case "(":
      floor++;
      break;
    case ")":
      floor--;
      break;
  }

  if (floor < 0 && firstBasement === null) firstBasement = i + 1;
}

console.log(`ANSWER 1: ${floor}`);
console.log(`ANSWER 2: ${firstBasement}`);