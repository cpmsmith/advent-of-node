#!/usr/bin/env node
import * as u from "../../lib/index.mjs";

const input = u.inputList();

const cards = input.map((line) => {
	const [game, numbers] = line.substring(5).split(": ");
	const [winners, card] = numbers
		.split(" | ")
		.map((set) => set.split(" ").filter(Boolean).map(Number));
	return {
		game: Number(game),
		card,
		winners,
	};
});

function winCount({ card, winners }) {
	return card.filter((c) => winners.includes(c)).length;
}

const answer1 = cards
	.map((card) => {
		const wins = winCount(card);
		if (!wins) return 0;
		return 2 ** (wins - 1);
	})
	.reduce(u.sum);

console.log(`Answer 1: ${answer1}`);

const cardCopies = Array(cards.length).fill(1);

for (let i = 0; i < cards.length; i++) {
	const card = cards[i];
	const wins = winCount(card);
	for (let j = 1; j <= wins; j++) {
		cardCopies[i + j] += cardCopies[i];
	}
}

console.log(`Answer 2: ${cardCopies.reduce(u.sum)}`);
