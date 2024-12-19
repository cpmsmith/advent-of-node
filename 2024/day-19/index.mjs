#!/usr/bin/env node
import * as u from "../../lib/index.mjs";

const input = u.stdin().split("\n\n");

const availableTowels = input[0].split(", ");
const desiredPatterns = input[1].split("\n");

function isPatternPossible(pattern) {
	return availableTowels
		.filter((towel) => pattern.startsWith(towel))
		.some((towel) => {
			const remainingPattern = pattern.slice(towel.length);
			return remainingPattern === "" || isPatternPossible(remainingPattern);
		});
}

function patternNumberOfPossibilities(pattern, cache = new Map()) {
	if (cache.has(pattern)) {
		return cache.get(pattern);
	}
	const answer = availableTowels
		.filter((towel) => pattern.startsWith(towel))
		.map((towel) => pattern.slice(towel.length))
		.map((remainingPattern) =>
			remainingPattern === ""
				? 1
				: patternNumberOfPossibilities(remainingPattern, cache),
		)
		.reduce(u.sum, 0);
	cache.set(pattern, answer);
	return answer;
}

const answer1 = desiredPatterns.filter((pattern) =>
	isPatternPossible(pattern),
).length;

const answer2 = desiredPatterns
	.map((pattern) => patternNumberOfPossibilities(pattern))
	.reduce(u.sum);

console.log(`Answer 1: ${answer1}`);
console.log(`Answer 2: ${answer2}`);
