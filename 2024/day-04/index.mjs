#!/usr/bin/env node
import * as u from "../../lib/index.mjs";

const input = u.inputList().map((s) => s.split(""));

function skewGrid(arr2d) {
	const result = [];
	for (let y = 0; y < arr2d.length + arr2d[0].length - 1; y++) {
		result[y] = [];
		for (let x = 0; x < arr2d[0].length; x++) {
			result[y][x] = arr2d[y - (arr2d[0].length - 1 - x)]?.[x] ?? " ";
		}
	}
	return result;
}

function unskewCoordinates(y, x) {
	return [y - (input[0].length - 1 - x), x];
}

function unrotateCoordinates(y, x) {
	return [input.length - 1 - x, y];
}

let answer1 = 0;
let rotatingView = input;

const diagonalMasPoints = u.array2D(input.length, input[0].length, 0);

for (let i = 0; i < 4; i++) {
	for (const [view, diagonal] of [
		[rotatingView, false],
		[skewGrid(rotatingView), true],
	]) {
		for (let j = 0; j < view.length; j++) {
			const row = view[j];
			let found = [...row.join("").matchAll(/XMAS/g)].length;
			answer1 += found;

			if (diagonal) {
				for (const match of row.join("").matchAll(/MAS/g)) {
					let [yPos, xPos] = unskewCoordinates(j, match.index + 1);
					for (let k = 0; k < i; k++) {
						[yPos, xPos] = unrotateCoordinates(yPos, xPos);
					}
					diagonalMasPoints[yPos][xPos] += 1;
				}
			}
		}
	}
	rotatingView = u.rotate(rotatingView);
}

const answer2 = diagonalMasPoints
	.map((row) => row.map((cell) => cell === 2))
	.flat()
	.filter(Boolean).length;

console.log(`Answer 1: ${answer1}`);
console.log(`Answer 2: ${answer2}`);
