#!/usr/bin/env node
import * as u from "../../lib/index.mjs";

const input = u.stdin().trim().split("\n\n");

const locksInput = input.filter((text) => text.startsWith("#"));
const keysInput = input.filter((text) => text.endsWith("#"));

const [locks, keys] = [locksInput, keysInput].map((raw) =>
	raw.map((text) =>
		u
			.rotate(text.split("\n").map((line) => line.split("")))
			.map((row) => row.filter((cell) => cell === "#").length - 1),
	),
);

const answer1 = u.cartesianProduct(locks, keys)
	.filter(([lock, key]) => key.every((row, i) => row + lock[i] <= 5)).length;

console.log(`Answer 1: ${answer1}`);
console.log(`Answer 2: ${answer2}`);
