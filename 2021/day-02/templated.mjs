#!/usr/bin/env node
import * as u from "../../lib/index.mjs";

// Second solution, testing out my template

const input = u.stdin().split("\n").map(s => {
  let [dir, n] = s.split(" ");
  return [dir, Number(n)];
});

let position = 0,
  depth = 0,
  depth2 = 0;

for (const [dir, n] of input) {
  if (dir === "forward") {
    position += n;
    depth2 += n * depth;
  } else if (dir === "down") {
    depth += n;
  } else if (dir === "up") {
    depth -= n;
  }
}

let answer1 = position * depth;
let answer2 = position * depth2;

console.log(`Answer 1: ${answer1}`);
console.log(`Answer 2: ${answer2}`);