#!/usr/bin/env node
import * as u from "../../lib/index.mjs";

const input = u.stdin().trim();

let answer1;
let answer2;

for (let i=0; i < input.length; i++) {
	let slice = input.slice(i, i+4);
	if (!answer1 && new Set(slice).size == 4) {
		answer1 = i + 4;
	}
	let slice2 = input.slice(i, i+14);
	if (!answer2 && new Set(slice2).size == 14) {
		answer2 = i + 14;
	}
	if (answer1 && answer2) break;
}

console.log(`Answer 1: ${answer1}`);
console.log(`Answer 2: ${answer2}`);
