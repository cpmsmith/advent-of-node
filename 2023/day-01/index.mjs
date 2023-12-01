#!/usr/bin/env node
import * as u from "../../lib/index.mjs";

const input = u.inputList();

const answer1 = input
	.map((l) => Array.from(l.matchAll(/\d/g)))
	.map((d) => d.at(0) + d.at(-1))
	.map(Number)
	.reduce(u.sum);

const charMap = {
	one: "1",
	two: "2",
	three: "3",
	four: "4",
	five: "5",
	six: "6",
	seven: "7",
	eight: "8",
	nine: "9",
};

const answer2 = input
	.map((l) =>
		Array.from(
			l.matchAll(/(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g),
		).map(([,d]) => d),
	)
	.map((matches) => matches.map((str) => charMap[str] ?? str))
	.map((d) => d.at(0) + d.at(-1))
	.map(Number)
	.reduce(u.sum);

console.log(`Answer 1: ${answer1}`);
console.log(`Answer 2: ${answer2}`);
