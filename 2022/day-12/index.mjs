#!/usr/bin/env node
import * as u from "../../lib/index.mjs";

const input = u.inputList().map((l) => Array.from(l));

class Vector {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	add(v) {
		return new Vector(this.x + v.x, this.y + v.y);
	}
	eq(other) {
		return this.x === other.x && this.y === other.y;
	}
}

const directions = Object.values(u.directions).map((d) => new Vector(...d));

class Plane {
	constructor(data) {
		this.data = data;
	}
	static blank(width, height, defaultValue) {
		const data = u.array2D(height, width, defaultValue);
		return new Plane(data);
	}
	get(pos) {
		return this.data[pos.y][pos.x];
	}
	set(pos, value) {
		this.data[pos.y][pos.x] = value;
	}
	inBounds(pos) {
		return pos.y in this.data && pos.x in this.data[pos.y];
	}
}

let start, end;

let width = input[0].length,
	height = input.length;

const map = new Plane(input.map((l, y) =>
	l.map((c, x) => {
		if (c === "S") {
			start = new Vector(x, y);
			return 0;
		} else if (c === "E") {
			end = new Vector(x, y);
			return 25;
		} else return c.charCodeAt(0) - "a".charCodeAt(0);
	}),
));

function dijkstra(startPos, endPos, distances) {
	let unvisited = [];
	for (let x = 0; x < width; x++)
		for (let y = 0; y < height; y++) unvisited.push(new Vector(x, y));

	distances.set(startPos, 0);
	let position;
	do {
		unvisited.sort((a, b) => distances.get(a) - distances.get(b));
		position = unvisited.shift();
		let distance = distances.get(position);
		for (let dir of Object.values(directions)) {
			let step = position.add(dir);
			if (!distances.inBounds(step)) continue;

			if (map.get(step) <= map.get(position) + 1) {
				if (distances.get(step) > distance + 1) {
					distances.set(step, distance + 1);
				}
			}
		}

		if (position.eq(endPos)) {
			return distances.get(position);
		}
	} while (position);
}



console.log(`Answer 1: ${dijkstra(start, end, Plane.blank(width, height, Infinity))}`);

const prefilledDistances = Plane.blank(width, height, Infinity);
for (let x = 0; x < width; x++)
	for (let y = 0; y < height; y++)
		if (map.get(new Vector(x, y)) === 0)
			prefilledDistances.set(new Vector(x, y), 0);

console.log(`Answer 2: ${dijkstra(start, end, prefilledDistances)}`);
