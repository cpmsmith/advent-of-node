#!/usr/bin/env node
import * as u from "../../lib/index.mjs";

const input = u
	.inputList()
	.map((line) => line.split(" "))
	.map(([row, groups]) => [row, groups.split(",").map(Number)]);

function incrementPossibilities(row) {
	let firstQ = row.indexOf("?");
	if (firstQ === -1) return [row];
	return [
		row.slice(0, firstQ) + "." + row.slice(firstQ + 1),
		row.slice(0, firstQ) + "#" + row.slice(firstQ + 1),
	];
}

function isPossible(row, groups) {
	let groupNumber = -1,
		groupLength = null;
	for (const char of row) {
		if (char === "#") {
			if (groupLength === null) {
				groupNumber++;
				if (groupNumber >= groups.length) return false;
				groupLength = 1;
			}
			else groupLength++;
			if (groupLength > groups[groupNumber]) return false;
		} else if (char === ".") {
			if (groupLength !== null && groupLength < groups[groupNumber]) return false;
			groupLength = null;
		} else if (char === "?") {
			return true;
		}
	}
	if (groupLength !== null && groupLength < groups[groupNumber]) return false;
	if (groupNumber < groups.length - 1) return false;
	return true;
}

function allPossibilities(row, groups) {
	let possibilities = [row];
	while (possibilities[0].includes("?")) {
		possibilities = possibilities.flatMap(incrementPossibilities).filter((row) => isPossible(row, groups));
	}
	return possibilities;
}

// for (const [row, groups] of input) {
// 	console.log(row);
// 	console.log(allPossibilities(row, groups).length);
// }
//
const unfoldedInput = input.map(([row, groups]) => [Array(5).fill(row).join("?"), Array(5).fill(groups).flat()]);

// console.log(unfoldedInput);

console.log(`Answer 1: ${input.map(([row, groups]) => allPossibilities(row, groups).length).reduce((a, b) => a + b)}`);
console.log(`Answer 2: ${unfoldedInput.map(([row, groups]) => allPossibilities(row, groups).length).reduce((a, b) => a + b)}`);
