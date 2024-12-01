#!/usr/bin/env node
import * as u from "../../lib/index.mjs";

const input = u.inputList().map((s) => s.split("   ").map(Number));

const [left, right] = [0, 1]
	.map((i) => input.map((a) => a[i]))
	.map((a) => a.sort());

const answer1 = left.map((a, i) => Math.abs(a - right[i])).reduce(u.sum);

const rightFrequencies = right.reduce(
	(a, b) => a.set(b, (a.get(b) ?? 0) + 1),
	new Map(),
);

const answer2 = left
	.map((a) => a * (rightFrequencies.get(a) ?? 0))
	.reduce(u.sum);

console.log(`Answer 1: ${answer1}`);
console.log(`Answer 2: ${answer2}`);
