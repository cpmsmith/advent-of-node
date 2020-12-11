#!/usr/bin/env node

const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n").map(Number);

let answer1 = null;

let max = Math.max(...input),
  device = max + 3,
  diffs = [...input, 0].sort((a, b) => a - b).map((n, i, a) => (a[i+1] ?? device) - n);

answer1 = diffs.filter(n => n == 1).length * diffs.filter(n => n == 3).length;

let answer2 = 0,
  appended = [0, ...input.sort((a, b) => a - b), device];

let factors = appended.map((n, i, a) => {
  if (n === 0) return 1;
  let count = 0, j = i-1;
  while (j >= i-3) {
    if (a[j] >= n-3) count++;
    j--;
  }
  return count;
});

function sum(a, b) {
  return a + b;
}

let fib = [1];
for (let i = 1; i < appended.length; i++) {
  const factor = factors[i];
  fib.push(fib.slice(i-factor, i).reduce(sum))
}

answer2 = fib[fib.length-1];

console.log(`ANSWER 1: ${answer1}`);
console.log(`ANSWER 2: ${answer2}`);
