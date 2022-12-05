#!/usr/bin/env node
import * as u from "../../lib/index.mjs";

const input = u
	.stdin()
	.trim()
	.split("\n")
	.map((l) => l.split(",").map((e) => e.split("-").map(Number)));

function contained(pair) {
	const [[aa, ab], [ba, bb]] = pair;
	return (aa <= ba && ab >= bb) || (ba <= aa && bb >= ab);
}

function overlap([[aa, ab], [ba, bb]]) {
	return (
		u.between(aa, ba, bb) ||
		u.between(ab, ba, bb) ||
		u.between(ba, aa, ab) ||
		u.between(bb, aa, ab)
	);
}

let answer1 = input.filter(contained).length;
let answer2 = input.filter(overlap).length;

console.log(`Answer 1: ${answer1}`);
console.log(`Answer 2: ${answer2}`);
