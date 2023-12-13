#!/usr/bin/env node
import * as u from "../../lib/index.mjs";

const input = u.inputList().map((line) => line.split(" ").map(Number));

function derivative(list) {
	const d = [];
	for (let i = 0; i < list.length - 1; i++) {
		d.push(list[i + 1] - list[i]);
	}
	return d;
}

function deriveUntilZero(list) {
	let iterations = 0;
	let levels = [list];
	while (levels.at(-1).some((x) => x !== 0)) {
		levels.push(derivative(levels.at(-1)));
	}
	return levels;
}

function extrapolate(levels) {
	// I should really just suck it up and make a deep copy function
	let result = Array.from(levels).map((l) => [...l]);
	for (let i = levels.length - 1; i > 0; i--) {
		result[i - 1].push(result[i].at(-1) + result[i - 1].at(-1));
	}
	return result;
}

const answer1 = input
	.map(deriveUntilZero)
	.map(extrapolate)
	.map((levels) => levels[0].at(-1))
	.reduce(u.sum);

console.log(`Answer 1: ${answer1}`);

function reverseExtrapolate(levels) {
	let result = Array.from(levels).map((l) => [...l]);
	for (let i = levels.length - 1; i > 0; i--) {
		result[i - 1].unshift(result[i - 1].at(0) - result[i].at(0));
	}
	return result;
}

const answer2 = input
	.map(deriveUntilZero)
	.map(reverseExtrapolate)
	.map((levels) => levels[0].at(0))
	.reduce(u.sum);
console.log(`Answer 2: ${answer2}`);
