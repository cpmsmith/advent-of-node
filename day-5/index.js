#!/usr/bin/env node

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split("\n");

const seats = input.map(str => {
  let row = parseInt(str.slice(0, 7).split("").map(ch => ch == "F" ? 0 : 1).join(""), 2);
  let column = parseInt(str.slice(7, 10).split("").map(ch => ch == "L" ? 0 : 1).join(""), 2);
  let id = row * 8 + column;
  return { row, column, id };
})

let answer1 = Math.max(...seats.map(seat => seat.id));

let sorted = seats.sort((a, b) => a.id - b.id);
let answer2;
for (let i = 1; i < sorted.length; i++) {
  if (sorted[i].id == sorted[i+1]?.id - 2) {
    answer2 = sorted[i].id + 1;
    break;
  }
}

console.log(`ANSWER 1: ${answer1}`);
console.log(`ANSWER 2: ${answer2}`);