import fs from "fs";

export function sum(a, b) {
	return a + b;
}

export function product(a, b) {
	return a * b;
}

export function between(num, boundA, boundB) {
	return (num >= boundA && num <= boundB) || (num >= boundB && num <= boundA);
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

/**
 * Stdin as a string
 * @return {string}
 */
export function stdin() {
	return fs.readFileSync(0, "utf8");
}

/**
 * Stdin as a string, split by newlines
 * @return {string[]}
 */
export function inputList() {
	const list = stdin().split("\n");
	if (list[list.length-1] === "") list.pop();
	return list;
}

/**
 * Stdin split by newlines, then parsed as numbers
 * @return {number[]}
 */
export function inputNumList() {
	return inputList().map(Number);
}

/**
 * Flip a 2d array on the diagonal axis
 *
 * @template T {unknown}
 * @param input {readonly T[][]}
 * @returns {T[][]}
 *
 * @example
 * ```js
 * transpose([
 *   [1, 2],
 *   [3, 4],
 * ]);
 * // => [
 * //   [1, 3],
 * //   [2, 4],
 * // ]
 * ```
 */
export function transpose(input) {
	return input[0].map((_, colIndex) => input.map(row => row[colIndex]));
}

/**
 * Rotate a 2d array 90 degrees clockwise
 *
 * @template T {unknown}
 * @param arr2d {readonly T[][]}
 * @returns {T[][]}
 *
 * @example
 * ```js
 * rotate([
 *   [1, 2],
 *   [3, 4],
 * ]);
 * // => [
 * //   [3, 1],
 * //   [4, 2],
 * // ]
 * ```
 */
export function rotate(arr2d) {
	return arr2d[0].map((_, colIndex) =>
		arr2d.map((row) => row[colIndex]).reverse(),
	);
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

const redAnsiCode = '\x1b[31m';
const resetAnsiCode = '\x1b[0m';
/**
 * Highlight a substring of text
 * @param text {string}
 * @param from {number}
 * @param to {number}
 * @returns {string}
 */
export function highlight(text, from, to) {
	return text.slice(0, from) + redAnsiCode + text.slice(from, to) + resetAnsiCode + text.slice(to);
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
