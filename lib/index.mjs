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

export function stdin() {
	return fs.readFileSync(0, "utf8");
}

export function inputList() {
	return stdin().split("\n");
}

export function inputNumList() {
	return inputList().map(Number);
}

export function transpose(input) {
	return input[0].map((_, colIndex) => input.map(row => row[colIndex]));
}

export function chunk(input, chunkSize) {
	const output = Array(Math.ceil(input.length/chunkSize)).fill(null);
	for (let i = 0; i < input.length; i += chunkSize) {
		output[Math.floor(i / chunkSize)] = input.slice(i, i + chunkSize);
	}
	return output;
}