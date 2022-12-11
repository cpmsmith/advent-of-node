#!/usr/bin/env node
import * as u from "../../lib/index.mjs";

const input = u.stdin();

let monkeys = [];

let opmap = {
	"*": u.product,
	"+": u.sum,
};

let allTests;

class Monkey {
	constructor(inp) {
		let [_, start, operation, test, ifTrue, ifFalse] = inp.match(
			new RegExp(
				"Monkey \\d:\n" +
					"\\s*Starting items: (.*)\n" +
					"\\s*Operation: new = old (.*)\n" +
					"\\s*Test: divisible by (.*)\n" +
					"\\s*If true: throw to monkey (.*)\n" +
					"\\s*If false: throw to monkey (.*)"
			)
		);

		this.items = start.split(", ").map(Number);
		this.operation = operation.split(" ");
		this.test = Number(test);
		this.ifTrue = Number(ifTrue);
		this.ifFalse = Number(ifFalse);

		this.inspected = 0;
	}

	turn = (divide) => {
		while (this.items.length > 0) {
			let item = this.items.shift();

			let operand =
				this.operation[1] === "old" ? item : Number(this.operation[1]);

			if (!divide) item = item % allTests;

			item = opmap[this.operation[0]](item, operand);

			this.inspected++;

			if (divide) item = Math.floor(item / 3);

			if (item % this.test === 0) {
				monkeys[this.ifTrue].items.push(item);
			} else {
				monkeys[this.ifFalse].items.push(item);
			}
		}
	};
}

function business(monkeys) {
	return monkeys
		.sort((a, b) => a.inspected - b.inspected)
		.slice(-2)
		.map((m) => m.inspected)
		.reduce(u.product, 1);
}

monkeys = input.split("\n\n").map((i) => new Monkey(i));
allTests = monkeys.map((m) => m.test).reduce(u.product, 1);

for (let i = 0; i < 20; i++) {
	for (let monkey of monkeys) {
		monkey.turn(true);
	}
}

console.log(`Answer 1: ${business(monkeys)}`);

monkeys = input.split("\n\n").map((i) => new Monkey(i));

for (let i = 0; i < 10000; i++) {
	for (let monkey of monkeys) {
		monkey.turn(false);
	}
}

console.log(`Answer 2: ${business(monkeys)}`);
