#!/usr/bin/env node
import * as u from "../../lib/index.mjs";

let [stacks, moves] = u
	.stdin()
	.split("\n\n")
	.map((c) => c.split("\n"));

stacks.pop();
stacks = stacks.map((s) => Array.from(s));
stacks = u
	.transpose(stacks)
	.filter((s) => s.some((l) => /[A-Z]/.test(l)))
	.map((s) => s.filter((c) => Boolean(c.trim())).reverse());

let stacks2 = stacks.map((s) => s.map((i) => i));

for (let move of moves) {
	if (!move) continue;
	const [, num, src, dest] = move.match(/move (\d+) from (\d+) to (\d+)/);
	for (let i = 0; i < num; i++) {
		let obj = stacks[src - 1].pop();
		stacks[dest - 1].push(obj);
	}

	stacks2[dest - 1].splice(
		stacks2[dest - 1].length,
		0,
		...stacks2[src - 1].splice(stacks2[src - 1].length - num)
	);
}

let answer1 = stacks.map((s) => s[s.length - 1]).join("");
let answer2 = stacks2.map((s) => s[s.length - 1]).join("");

console.log(`Answer 1: ${answer1}`);
console.log(`Answer 2: ${answer2}`);
