#!/usr/bin/env node
import * as u from "../../lib/index.mjs";

const [rulesInput, updatesInput] = u.stdin().trim().split("\n\n");

const rules = rulesInput.split("\n").map((line) => line.split("|").map(Number));
const updates = updatesInput
	.split("\n")
	.map((line) => line.split(",").map(Number));

function updateIsOrdered(update) {
	for (let i = 0; i < update.length; i++) {
		const page = update[i];
		const relevantRules = rules.filter((rule) => rule[0] === page);
		if (
			relevantRules.some(([_, after]) => {
				let afterPosition = update.indexOf(after);
				if (afterPosition === -1) return false;
				if (afterPosition < i) return true;
				else return false;
			})
		) {
			return false;
		}
	}
	return true;
}

const answer1 = updates
	.filter(updateIsOrdered)
	.map((update) => update[Math.floor(update.length / 2)])
	.reduce(u.sum);

const answer2 = updates
	.filter((update) => !updateIsOrdered(update))
	.map((update) => {
		return update.toSorted((a, b) => {
			const relevantRule = rules.find(
				([rA, rB]) => (rA === a && rB === b) || (rA === b && rB === a),
			);
			if (relevantRule) {
				return relevantRule[0] === a ? -1 : 1;
			}
			return 0;
		})[Math.floor(update.length / 2)];
	})
	.reduce(u.sum);

console.log(`Answer 1: ${answer1}`);
console.log(`Answer 2: ${answer2}`);
