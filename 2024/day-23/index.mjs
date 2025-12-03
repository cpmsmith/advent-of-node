#!/usr/bin/env node
import * as u from "../../lib/index.mjs";

const input = u.inputList().map((line) => line.split("-"));

/** @type Map<string, Computer> */
const allComputers = new Map();
class Computer {
	constructor(id) {
		this.id = id;
		this.linkedIds = [];
		allComputers.set(id, this);
	}
	static getComputer(id) {
		if (!allComputers.has(id)) {
			new Computer(id);
		}
		return allComputers.get(id);
	}
	addLink(id) {
		this.linkedIds.push(id);
		const other = Computer.getComputer(id);
		other.linkedIds.push(this.id);
	}
	getLinks() {
		return this.linkedIds.map((id) => Computer.getComputer(id));
	}
	getHigherLinks() {
		return this.getLinks().filter((link) => link.id > this.id);
	}
	hasLink(id) {
		return this.linkedIds.includes(id);
	}
}

for (const connection of input) {
	const [a, b] = connection;
	Computer.getComputer(a).addLink(b);
}

const trios = Array.from(allComputers.values()).flatMap((computer) => {
	return computer.getHigherLinks().flatMap((link) =>
		link
			.getHigherLinks()
			.filter((link2) => link2.getLinks().includes(computer))
			.map((link2) => [computer, link, link2]),
	);
});

/**
 * Find the maximal cliques (complete subgraphs) in a graph.
 *
 * Note: according to Wikipedia there's a more efficient version
 * involving a "pivot vertex". Might be necessary for larger graphs.
 *
 * @param {Set<Computer>} r
 * @param {Set<Computer>} p
 * @param {Set<Computer>} x
 * @returns {Set<Computer>[]}
 */
function bronKerbosch(r, p, x) {
	if (p.size === 0 && x.size === 0) {
		return [r];
	}
	let maxSets = [];
	for (const v of p) {
		maxSets.push(
			...bronKerbosch(
				u.union(new Set(r), new Set([v])),
				u.intersection(new Set(p), new Set(v.getLinks())),
				u.intersection(new Set(x), new Set(v.getLinks())),
			),
		);
		p.delete(v);
		x.add(v);
	}
	return maxSets;
}

let maximalCliques = bronKerbosch(
	new Set(),
	new Set(allComputers.values()),
	new Set(),
);

const answer1 = trios.filter((trio) =>
	trio.some((comp) => comp.id.startsWith("t")),
).length;

const answer2 = Array.from(
	maximalCliques.toSorted((a, b) => b.size - a.size)[0],
)
	.map((c) => c.id)
	.toSorted()
	.join(",");

console.log(`Answer 1: ${answer1}`);
console.log(`Answer 2: ${answer2}`);
