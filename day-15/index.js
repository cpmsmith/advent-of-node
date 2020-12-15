#!/usr/bin/env node

const fs = require("fs");
const turns = fs.readFileSync(0, "utf8").trim().split(",").map(Number);

let answer1 = null,
  answer2 = null;
const lastTimes = new Map();

turns.slice(0, -1).forEach((v, i) => {
  lastTimes.set(v, i);
})

while (answer1 === null || answer2 === null) {
  let lastNumber = turns[turns.length - 1];
  if (lastTimes.has(lastNumber)) {
    const lastTime = lastTimes.get(lastNumber);
    const newNum = turns.length - (lastTime + 1);
    turns.push(newNum);
  } else {
    turns.push(0);
  }
  lastTimes.set(lastNumber, turns.length - 2);

  if (turns.length === 2020) {
    answer1 = turns[turns.length - 1];
  } else if (turns.length === 30000000) {
    answer2 = turns[turns.length - 1];
  }
}

console.log(`ANSWER 1: ${answer1}`);
console.log(`ANSWER 2: ${answer2}`);