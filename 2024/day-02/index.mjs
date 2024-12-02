#!/usr/bin/env node
import * as u from "../../lib/index.mjs";

const input = u.inputList().map((s) => s.split(" ").map(Number));

function safe(levels) {
	const diffs = levels.slice(0, -1).map((a, i) => a - levels[i + 1]);
	return (
		diffs.every((a) => a >= 1 && a <= 3) ||
		diffs.every((a) => a <= -1 && a >= -3)
	);
}

const answer1 = input.filter(safe).length;
console.log(`Answer 1: ${answer1}`);

function safeWithOneSkip(levels) {
	if (safe(levels)) return true;

	const diffs = levels.slice(0, -1).map((a, i) => a - levels[i + 1]);
	const [ups, downs] = [
		diffs.map((a) => u.between(a, -1, -3)),
		diffs.map((a) => u.between(a, 1, 3)),
	];
	const firstNotUp = ups.indexOf(false),
		firstNotDown = downs.indexOf(false);
	for (const firstUnsafe of [firstNotUp, firstNotDown]) {
		if (firstUnsafe !== -1) {
			const [removeFirst, removeSecond] = [
				levels.filter((_, i) => i !== firstUnsafe),
				levels.filter((_, i) => i !== firstUnsafe + 1),
			];
			if (safe(removeFirst) || safe(removeSecond)) {
				return true;
			}
		}
	}
	return false;
}

const answer2 = input.filter(safeWithOneSkip).length;
console.log(`Answer 2: ${answer2}`);
