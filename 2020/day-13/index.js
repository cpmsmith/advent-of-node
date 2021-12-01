#!/usr/bin/env node

const fs = require("fs");
const [i1, i2] = fs.readFileSync(0, "utf8").trim().split("\n");

const departure = Number(i1),
  lines = i2.split(",").map(l => l == "x" ? l : Number(l)),
  filtered = lines.filter(e => e != "x");

const waits = filtered.map(interval => (Math.ceil(departure / interval) * interval) - departure),
  minWait = Math.min(...waits);
const answer1 = filtered[waits.indexOf(minWait)] * minWait;

const offsets = lines.map((l, n) => [l, n]).filter(([l]) => l != "x").sort(([a], [b]) => b-a);

let answer2 = null,
  i = -offsets[0][1],
  met = 0,
  rate = offsets[0][0];

function product(a, b) {
  return a * b;
}

while (!answer2) {
  i += rate;
  let j = 0;
  for (; j < offsets.length; j++) {
    const [line, offset] = offsets[j];
    if ((i + offset) % line !== 0) break;
  }
  if (j === offsets.length) {
    answer2 = i;
    break;
  } else if (j > met) {
    met = j;
    rate = offsets.slice(0, j).map(([n]) => n).reduce(product);
  }
}

console.log(`ANSWER 1: ${answer1}`);
console.log(`ANSWER 2: ${answer2}`);