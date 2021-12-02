#!/usr/bin/env node
import { stdin, sum } from "../../lib/index.mjs";

const input = stdin().split("\n").map(Number);

let increases = 0;
let slidingIncreases = 0;

for (let i=1; i < input.length; i++) {
	if (input[i] > input[i-1]) increases++;
	if (i >= 3 && (input.slice(i-2, i+1).reduce(sum) > input.slice(i-3, i).reduce(sum))) slidingIncreases++;
}

console.log(`Answer 1: ${increases}`);
console.log(`Answer 2: ${slidingIncreases}`);
