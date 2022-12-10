#!/usr/bin/env node
import * as u from "../../lib/index.mjs";

const input = u
	.inputList()
	.map((l) => (l === "noop" ? l : l.split(" ")))
	.flat(1);

let register = 1;
let strengths = 0;

console.log("Answer 2:\n");

for (let cycle = 1; cycle < input.length + 1; cycle++) {
	if (cycle % 40 === 20) {
		strengths += register * cycle;
	}

	if (Math.abs(register - ((cycle - 1) % 40)) <= 1) process.stdout.write("X");
	else process.stdout.write(" ");

	let arg = Number(input[cycle - 1]);
	if (!Number.isNaN(arg)) {
		register += arg;
	}

	if (cycle % 40 === 0) process.stdout.write("\n");
}

console.log(`\nAnswer 1: ${strengths}`);
