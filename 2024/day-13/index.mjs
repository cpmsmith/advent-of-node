#!/usr/bin/env node
import * as u from "../../lib/index.mjs";

const gameMatch = new RegExp(
	[
		"Button A: X\\+(\\d+), Y\\+(\\d+)",
		"Button B: X\\+(\\d+), Y\\+(\\d+)",
		"Prize: X=(\\d+), Y=(\\d+)",
	].join("\n"),
	"m",
);

const input = u
	.stdin()
	.split("\n\n")
	.map((chunk) => {
		const match = chunk.match(gameMatch);
		if (!match) throw new Error("Invalid input");
		return {
			vecA: [parseInt(match[1]), parseInt(match[2])],
			vecB: [parseInt(match[3]), parseInt(match[4])],
			prizePos: [parseInt(match[5]), parseInt(match[6])],
		};
	});

function matrixMultiply(vector, matrix) {
	const [x, y] = vector;
	const [[a, c], [b, d]] = matrix;
	return [x * a + y * b, x * c + y * d];
}

function inverse2DMatrix(matrix) {
	const [[a, c], [b, d]] = matrix;
	const det = a * d - b * c;
	return [
		[d / det, -c / det],
		[-b / det, a / det],
	];
}
function calculateCost({ vecA, vecB, prizePos }) {
	const matrix = [
		[vecA[0], vecA[1]],
		[vecB[0], vecB[1]],
	];
	const invMatrix = inverse2DMatrix(matrix);
	const invPrizePos = matrixMultiply(prizePos, invMatrix);
	const rounded = invPrizePos.map((v) => [v, Math.round(v)]);
	// Fudging around floating point errors
	if (rounded.some(([orig, round]) => Math.abs(orig - round) > 0.0001))
		return 0;
	const [aPresses, bPresses] = rounded.map(([, round]) => round);
	return aPresses * 3 + bPresses;
}

const answer1 = input.map(calculateCost).reduce(u.sum);

console.log(`Answer 1: ${answer1}`);

const input2 = input.map(({ vecA, vecB, prizePos }) => ({
	vecA,
	vecB,
	prizePos: prizePos.map((v) => v + 10000000000000),
}));
const answer2 = input2.map(calculateCost).reduce(u.sum)

console.log(`Answer 2: ${answer2}`);
