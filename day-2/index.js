#!/usr/bin/env node

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8');

const reg = /^(\d+)-(\d+) (\w): (\w+)$/;
const db = input.trim().split("\n").map(String).map((data) => {
	const match = data.match(reg);
	return [Number(match[1]), Number(match[2]), match[3], match[4]];
});

let validOne = 0,
	validTwo = 0;

for (const row of db) {
	const [min, max, char, pwd] = row;

	const count = pwd.split("").filter(c => c === char).length;
	if (count >= min && count <= max) validOne++;

	if ((pwd[min - 1] === char) !== (pwd[max - 1] === char)) validTwo++;
}

console.log(`ANSWER 1: ${validOne}`);
console.log(`ANSWER 2: ${validTwo}`);
