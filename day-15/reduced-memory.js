#!/usr/bin/env node

// The original solution didn't need that array at all – this is ~80% easier on memory

const fs = require("fs");
const turns = fs.readFileSync(0, "utf8").trim().split(",").map(Number);

let answer1 = null,
  answer2 = null;
const lastTimes = new Map();

turns.slice(0, -1).forEach((v, i) => {
  lastTimes.set(v, i);
});

let turnNumber = turns.length,
  lastNumber = turns[turns.length - 1];

while (answer1 === null || answer2 === null) {
  let newNum = null;
  if (lastTimes.has(lastNumber)) {
    const lastTime = lastTimes.get(lastNumber);
    newNum = turnNumber - (lastTime + 1);
  } else {
    newNum = 0;
  }

  if (turnNumber === 2020) {
    answer1 = lastNumber;
  } else if (turnNumber === 30000000) {
    answer2 = lastNumber;
  }

  lastTimes.set(lastNumber, turnNumber - 1);
  lastNumber = newNum;
  turnNumber++;
}

console.log(`ANSWER 1: ${answer1}`);
console.log(`ANSWER 2: ${answer2}`);