#!/usr/bin/env node
import * as u from "../../lib/index.mjs";

const input = u.stdin().trim().split("\n");

let disk = {};
let cwd = [];
let totalSize = 0;

for (const line of input) {
	if (line.startsWith("$")) {
		let command = line.slice(2);
		if (command.startsWith("cd ")) {
			let target = command.slice(3);
			if (target === "..") cwd.pop();
			else cwd.push(target);
		}
	} else {
		let d = disk;
		for (const dir of cwd) {
			if (dir === "") continue;
			if (!(dir in d)) d[dir] = {};
			d = d[dir];
		}
		if (!line.startsWith("dir ")) {
			let [size, name] = line.split(" ");
			size = Number(size);
			d[name] = size;
			totalSize += size;
		}
	}
}

let under100Ks = [];

let spaceRequired = totalSize - 40000000;
let smallestDeletee = undefined;

function walk(file) {
	let total = 0;
	if (typeof file === "number") return file;
	for (const sub in file) {
		total += walk(file[sub]);
	}
	if (total <= 100000) under100Ks.push(total);
	if ((!smallestDeletee || total < smallestDeletee) && total >= spaceRequired)
		smallestDeletee = total;
	return total;
}

walk(disk);

console.log(`Answer 1: ${under100Ks.reduce(u.sum, 0)}`);
console.log(`Answer 2: ${smallestDeletee}`);
