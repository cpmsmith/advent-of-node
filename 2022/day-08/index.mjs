#!/usr/bin/env node
import * as u from "../../lib/index.mjs";

const input = u
	.stdin()
	.trim()
	.split("\n")
	.map((l) => Array.from(l));
const rotated = u.transpose(input);

const visible = Array(input.length)
	.fill(null)
	.map(() => Array(input[0].length).fill(0));
const scores = Array(input.length)
	.fill(null)
	.map(() => Array(input[0].length).fill(0));

function isVisible(row, i) {
	return (
		row.slice(0, i).every((h) => h < row[i]) ||
		row.slice(i + 1).every((h) => h < row[i])
	);
}

function getViewCount(path, highest) {
	let count = 0;
	for (const tree of path) {
		count++;
		if (tree >= highest) {
			break;
		}
	}
	return count;
}

function getScenicScore(x, y) {
	const row = input[y],
		col = rotated[x];

	return [
		getViewCount(row.slice(0, x).reverse(), row[x]),
		getViewCount(row.slice(x + 1), row[x]),
		getViewCount(col.slice(0, y).reverse(), col[y]),
		getViewCount(col.slice(y + 1), col[y]),
	].reduce(u.product, 1);
}

for (let y = 0; y < input.length; y++) {
	const line = input[y];
	for (let x = 0; x < line.length; x++) {
		if (isVisible(line, x) || isVisible(rotated[x], y)) visible[y][x] = 1;
		scores[y][x] = getScenicScore(x, y);
	}
}

let answer1 = visible.map((l) => l.reduce(u.sum, 0)).reduce(u.sum, 0);
let answer2 = Math.max(...scores.map((l) => Math.max(...l)));

console.log(`Answer 1: ${answer1}`);
console.log(`Answer 2: ${answer2}`);
