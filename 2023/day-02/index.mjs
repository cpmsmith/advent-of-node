#!/usr/bin/env node
import * as u from "../../lib/index.mjs";

const input = u.inputList();

const bag = {
	red: 12,
	green: 13,
	blue: 14,
};

const games = input.map((line) => {
	const [gameName, draws] = line.split(": ");
	const gameNumber = Number(gameName.substring(5));

	const game = {
		number: gameNumber,
		rounds: [{}],
	};

	let round = 0;

	for (const match of draws.matchAll(
		/((?<number>\d+) (?<colour>\w+)(, )?|(?<separator>; ))/g,
	)) {
		if (!match.groups) {
			console.log(match);
			throw new Error("What");
		}
		if (match.groups.separator) {
			game.rounds.push({});
			round++;
			continue;
		}
		game.rounds[round][match.groups.colour] = match.groups.number;
	}
	return game;
});

console.log(games[0]);

const answer1 = games
	.filter((game) =>
		game.rounds.every((round) =>
			Object.entries(round).every(([colour, count]) => count <= bag[colour]),
		),
	)
	.map((game) => game.number)
	.reduce(u.sum);

console.log(`Answer 1: ${answer1}`);

const answer2 = games
	.map((game) =>
		Object.keys(bag)
			.map((colour) =>
				game.rounds
					.map((round) => round[colour] ?? 0)
					.reduce((a, b) => Math.max(a, b)),
			)
			.reduce(u.product),
	)
	.reduce(u.sum);
console.log(`Answer 2: ${answer2}`);
