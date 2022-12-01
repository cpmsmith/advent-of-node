#!/usr/bin/env node
import * as u from "../../lib/index.mjs";

const input = u.stdin().split("\n\n").map(l => l.split("\n").map(Number));

let answer1 = input.map(l => l.reduce(u.sum, 0)).reduce((a, b) => Math.max(a, b), 0),
	answer2 = input.map(l => l.reduce(u.sum, 0)).sort((a, b) => a - b).slice(-3).reduce(u.sum, 0);

console.log(`Answer 1: ${answer1}`);
console.log(`Answer 2: ${answer2}`);
