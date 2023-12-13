import fs from "fs";

export function sum(a, b) {
	return a + b;
}

export function product(a, b) {
	return a * b;
}

export function between(num, min, max) {
	return num >= min && num <= max;
}

/** Floored modulo
 *
 * Works how my brain thinks modulo should work -- the remainder's sign matches
 * the divisor's sign, not the dividend's.
 * @param dividend {number} - `a` in `a % b`
 * @param divisor {number} - `b` in `a % b`
 */
export function fMod(dividend, divisor) {
	return ((dividend % divisor) + divisor) % divisor;
}

export function stdin() {
	return fs.readFileSync(0, "utf8");
}

export function inputList() {
	const list = stdin().split("\n");
	if (list[list.length-1] === "") list.pop();
	return list;
}

export function inputNumList() {
	return inputList().map(Number);
}

export function transpose(input) {
	return input[0].map((_, colIndex) => input.map(row => row[colIndex]));
}

/**
 * @param a {Set}
 * @param more {Set[]}
 */
export function intersection(a, ...more) {
	return new Set([...a].filter(i => more.every(s => s.has(i))));
}

/**
 * @param sets {Set[]}
 */
export function union(...sets) {
	return new Set(sets.map(s => Array.from(s)).flat(1));
}

export function chunk(input, chunkSize) {
	const output = Array(Math.ceil(input.length/chunkSize)).fill(null);
	for (let i = 0; i < input.length; i += chunkSize) {
		output[Math.floor(i / chunkSize)] = input.slice(i, i + chunkSize);
	}
	return output;
}

export function array2D(outerLength, innerLength, fill = undefined) {
	return Array(outerLength)
		.fill(null)
		.map(() => Array(innerLength).fill(fill));
}

export const directions = {
	"U": [0, -1],
	"D": [0, 1],
	"L": [-1, 0],
	"R": [1, 0],
};

export const directionsWithDiagonals = {
	...directions,
	"UL": [-1, -1],
	"UR": [1, -1],
	"DL": [-1, 1],
	"DR": [1, 1],
};

export function range(a, b) {
	let min = Math.min(a, b);
	let max = Math.max(a, b);
	return Array.from({ length: max - min + 1 }, (_, i) => i + min);
}
