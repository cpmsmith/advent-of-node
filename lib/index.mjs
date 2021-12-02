import fs from "fs";
import path from "path";

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
