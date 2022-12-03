#!/usr/bin/env node
import * as u from "../../lib/index.mjs";

const input = u.stdin().trim().split("\n");

function letterScore(l) {
	if (l > "Z") return l.charCodeAt(0) - "a".charCodeAt(0) + 1;
	else return l.charCodeAt(0) - "A".charCodeAt(0) + 27;
}

let answer1 = input
	.map((l) => [l.slice(0, l.length / 2), l.slice(l.length / 2)])
	.map((ab) => ab.map((comp) => new Set(comp)))
	.map(([a, b]) => new Set([...a].filter((c) => b.has(c))))
	.map((i) => letterScore([...i][0]))
	.reduce(u.sum, 0);

let answer2 = u
	.chunk(input.map(s => new Set(s)), 3)
	.map(
		([a, b, c]) => new Set([...a].filter((item) => b.has(item) && c.has(item)))
	)
	.map((s) => letterScore([...s][0]))
	.reduce(u.sum);

console.log(`Answer 1: ${answer1}`);
console.log(`Answer 2: ${answer2}`);
