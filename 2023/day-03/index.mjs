#!/usr/bin/env node
import * as u from "../../lib/index.mjs";

const input = u.inputList();

const partNumbers = input.flatMap((line, lineNumber) =>
	Array.from(line.matchAll(/(\d+)/g))
		.filter((match) =>
			u
				.range(match.index, match.index + match[0].length - 1)
				.some((col) =>
					Object.values(u.directionsWithDiagonals).some(([x, y]) =>
						(input[lineNumber + y]?.[col + x] ?? ".").match(/[^.0-9]/),
					),
				),
		)
		.map((match) => ({
			number: Number(match[0]),
			lineNumber,
			col: match.index,
			width: match[0].length,
		})),
);

const answer1 = partNumbers.map((part) => part.number).reduce(u.sum);

console.log(`Answer 1: ${answer1}`);

const answer2 = input
	.flatMap((line, lineNumber) =>
		Array.from(line.matchAll(/\*/g))
			.map((match) => ({
				match,
				adjacentParts: partNumbers.filter(
					(part) =>
						u.between(match.index, part.col - 1, part.col + part.width) &&
						u.between(lineNumber, part.lineNumber - 1, part.lineNumber + 1),
				),
			}))
			.filter(({ adjacentParts }) => adjacentParts.length === 2)
			.map(({ adjacentParts }) =>
				adjacentParts.map((part) => part.number).reduce(u.product),
			),
	)
	.reduce(u.sum);

console.log(`Answer 2: ${answer2}`);
