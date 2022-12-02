#!/usr/bin/env node
import * as u from "../../lib/index.mjs";

const input = u.stdin().trim().split("\n").map((l) => l.split(" "));

let answer1 = 0,
  answer2 = 0;

for (let i = 0; i < input.length; i++) {
  const [col1, col2] = input[i];
  const them = col1.charCodeAt(0) - "A".charCodeAt(0) + 1;
  const me = col2.charCodeAt(0) - "X".charCodeAt(0) + 1;

  const result = u.fMod(me + 1 - them, 3);
  answer1 += me;
  answer1 += result * 3;

  const targetResult = me - 1;
  const response = u.fMod(them + targetResult + 1, 3) + 1;
  answer2 += response;
  answer2 += targetResult * 3;
}

console.log(`Answer 1: ${answer1}`);
console.log(`Answer 2: ${answer2}`);
