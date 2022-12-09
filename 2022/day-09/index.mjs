#!/usr/bin/env node
import * as u from "../../lib/index.mjs";

const input = u.inputList();

function vAdd(a, b) {
	return a.map((c, i) => c + b[i]);
}

function vNear(a, b) {
	return a.every((c, i) => Math.abs(c - b[i]) <= 1);
}

function snake(knots) {
	const rope = Array(knots)
		.fill(null)
		.map(() => [0, 0]);
	const tailVisited = new Set();

	function visit([x, y]) {
		tailVisited.add(`${x},${y}`);
	}

	visit(rope[0]);
	for (const line of input) {
		let [dir, dist] = line.split(" ");
		dist = Number(dist);

		for (let i = 0; i < dist; i++) {
			rope[0] = vAdd(rope[0], u.directions[dir]);
			for (let j = 0; j < rope.length - 1; j++) {
				if (!vNear(rope[j], rope[j + 1]))
					rope[j + 1] = rope[j + 1].map((t, xy) => {
						const diff = rope[j][xy] - t;
						return t + Math.min(Math.max(diff, -1), 1);
					});
			}
			visit(rope.at(-1));
		}
	}

	return tailVisited.size;
}

console.log(`Answer 1: ${snake(2)}`);
console.log(`Answer 2: ${snake(10)}`);
