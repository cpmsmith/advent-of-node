#!/usr/bin/env node

const fs = require("fs");
const input = fs.readFileSync(0, "utf8");

const numbers = input.trim().split("\n").map(Number);
let a, b, c, foundA = null, foundB = null;

for (a = 0; a < numbers.length - 1; a++) {
	for (b = a + 1; b < numbers.length; b++) {
		if (!foundB) {
			for (c = b + 1; c < numbers.length; c++) {
				if (numbers[a] + numbers[b] + numbers[c] === 2020) {
					foundB = [a, b, c];
					break;
				}
			}
		}
		if (!foundA && numbers[a] + numbers[b] === 2020) {
			foundA = [a, b];
			if (foundB) break;
		}
	}
	if (foundA && foundB) break;
}

console.log(numbers[foundA[0]]*numbers[foundA[1]]);
console.log(numbers[foundB[0]]*numbers[foundB[1]]*numbers[foundB[2]]);
