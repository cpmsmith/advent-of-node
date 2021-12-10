#!/usr/bin/env node
import * as u from "../../lib/index.mjs";

const input = u.stdin().trim().split("\n");

const openers = ["[", "(", "{", "<"];
const closers = ["]", ")", "}", ">"];

let scores1 = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};
let scores2 = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

function parse(chunk) {
  let stack = [];
  for (let i = 0; i < chunk.length; i++) {
    const char = chunk[i];
    if (openers.includes(char)) {
      stack.push(char);
      continue;
    } else if (
      closers.indexOf(char) === openers.indexOf(stack[stack.length - 1])
    ) {
      stack.pop();
      continue;
    } else {
      return i;
    }
  }
  return stack.reverse();
}

let parsed = input.map(parse);

let answer1 = 0;
let completionScores = [];
for (let i = 0; i < input.length; i++) {
  const chunk = input[i];
  const result = parsed[i];
  if (typeof result === "number") {
    answer1 += scores1[chunk[result]];
  } else if ("length" in result && result.length > 0) {
    let score = 0;
    for (const char of result) {
      score = score * 5;
      score += scores2[closers[openers.indexOf(char)]];
    }
    completionScores.push(score);
  }
}
let answer2 = completionScores.sort((a, b) => a - b)[
  Math.floor(completionScores.length / 2)
];

console.log(`Answer 1: ${answer1}`);
console.log(`Answer 2: ${answer2}`);
