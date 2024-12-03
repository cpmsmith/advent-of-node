#!/usr/bin/env node
import * as u from "../../lib/index.mjs";

const input = u.stdin();

const validMults = input.matchAll(/mul\((\d+),(\d+)\)/g);

let answer1 = Array.from(validMults)
	.map((m) => parseInt(m[1]) * parseInt(m[2]))
	.reduce((a, b) => a + b, 0);

const instructions = input.matchAll(
	/(mul\((\d+),(\d+)\)|(don't\(\))|(do\(\)))/g,
);

let lastInstruction = null;
let answer2 = 0;

for (const instruction of instructions) {
	if (instruction[1].startsWith("m")) {
		if (lastInstruction !== "don't()") {
			answer2 += parseInt(instruction[2]) * parseInt(instruction[3]);
		}
	} else {
		lastInstruction = instruction[1];
	}
}

console.log(`Answer 1: ${answer1}`);
console.log(`Answer 2: ${answer2}`);
