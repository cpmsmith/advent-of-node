#!/usr/bin/env node

const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n").map(Number);

function canSum(n, candidates) {
  return candidates.some((c1, i) =>
    candidates.some((c2, j) => j != i && c1 + c2 == n)
  );
}

let answer1 = null;

for (let i = 25; i < input.length; i++) {
  const num = input[i];
  if (!canSum(num, input.slice(i - 25, i))) {
    answer1 = num;
    break;
  }
}

let answer2Set = null;

for (let i = 0; i < input.length; i++) {
  for (let j = 0, acc = 0; j < i; j++) {
    acc += input[i - j];
    if (acc == answer1) {
      answer2Set = input.slice(i - j, i + 1);
      break;
    } else if (acc > answer1) {
      break;
    }
  }
  if (answer2Set) break;
}

console.log(`ANSWER 1: ${answer1}`);
console.log(`ANSWER 2: ${Math.max(...answer2Set) + Math.min(...answer2Set)}`);

// golfed down part 1 after the initial solve:
input.find((n,i,a,p=a.slice(i-25,i))=>i>24&&!p.some(x=>p.some(y=>x!=y&&x+y==n)));
