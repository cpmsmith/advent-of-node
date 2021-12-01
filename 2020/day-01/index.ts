#!/usr/bin/env deno run --allow-read
/// <reference path="../deno-runtime.d.ts" />

const input = Deno.readTextFileSync("/dev/stdin");
const numbers = input.trim().split("\n").map(Number);

let foundA: [number, number] | null = null,
	foundB: [number, number, number] | null = null;

for (let a = 0; a < numbers.length - 1; a++) {
	for (let b = a + 1; b < numbers.length; b++) {
		if (!foundB) {
			for (let c = b + 1; c < numbers.length; c++) {
				if (numbers[a] + numbers[b] + numbers[c] === 2020) {
					foundB = [numbers[a], numbers[b], numbers[c]];
					break;
				}
			}
		}
		if (!foundA && numbers[a] + numbers[b] === 2020) {
			foundA = [numbers[a], numbers[b]];
			if (foundB) break;
		}
	}
	if (foundA && foundB) break;
}

if (!foundA || !foundB) throw "Something ain't work";

function product(a: number, b: number) {
	return a * b;
}

console.log(`Part 1: ${foundA.reduce(product)}`);
console.log(`Part 2: ${foundB.reduce(product)}`);
