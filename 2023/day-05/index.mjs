#!/usr/bin/env node
import * as u from "../../lib/index.mjs";

const input = u.stdin();

const sections = input.split("\n\n");

const seeds1 = sections.shift().substr(7).trim().split(" ").map(Number);

function mapThroughRange(input, range) {
	const [to, from, length] = range;
	if (!u.between(input, from, from + length - 1)) return null;
	return to + (input - from);
}

const maps = sections.map((m) => {
	const [id, ...map] = m.split("\n");
	const ranges = map.map((l) => l.split(" ").map(Number));
	const [from, to] = id.substr(0, id.length - 5).split("-to-");

	return {
		from,
		to,
		ranges,
	};
});

const mapThroughAll = (seed) => {
	let value = seed;
	for (const map of maps) {
		for (const range of map.ranges) {
			let newValue = mapThroughRange(value, range);
			if (newValue !== null) {
				value = newValue;
				break;
			}
		}
	}
	return value;
};

const locations1 = seeds1.map(mapThroughAll);

console.log(`Answer 1: ${locations1.reduce((a, b) => Math.min(a, b))}`);

const seeds2 = u.chunk(seeds1, 2);

function reverseMap(input, range) {
	const [to, from, length] = range;
	if (!u.between(input, to, to + length - 1)) return null;
	return from + (input - to);
}

function reverseMapThroughAll(seed) {
	let value = seed;
	for (let i = maps.length - 1; i >= 0; i--) {
		const map = maps[i];
		for (const range of map.ranges) {
			let newValue = reverseMap(value, range);
			if (newValue !== null) {
				value = newValue;
				break;
			}
		}
	}
	return value;
}

for (let i = 0; true; i++) {
	const unmapped = reverseMapThroughAll(i);
	if (i % 1000000 === 0) console.log(i);
	if (
		seeds2.some(([seedStart, seedLength]) =>
			u.between(unmapped, seedStart, seedStart + seedLength - 1),
		)
	) {
		console.log(`Answer 2: ${i}`);
		break;
	}
}

console.log(`Answer 2: ${answer2}`);
