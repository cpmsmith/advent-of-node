#!/usr/bin/env node
import * as u from "../../lib/index.mjs";

const input = u.stdin().trim().split(",").map(Number);
let answer1, answer2;

let aggregate = Array(9).fill(0);
for (const fish of input) {
  aggregate[fish]++;
}

for (let i = 1; i <= 256; i++) {
  aggregate = aggregate.map((_, counter, allFish) => {
    if (counter == 8) return allFish[0];
    else if (counter == 6) return allFish[7] + allFish[0];
    else return allFish[counter+1];
  });

  if (i === 80) answer1 = aggregate.reduce(u.sum);
}

answer2 = aggregate.reduce(u.sum);

console.log(`Answer 1: ${answer1}`);
console.log(`Answer 2: ${answer2}`);