#!/usr/bin/env node
import * as u from "../../lib/index.mjs";

const maps = u
	.stdin()
	.split("\n\n")
	.map((i) => i.split("\n"));

function strReverse(str) {
	return str.split("").reverse().join("");
}

function isSymmetricalAtPoint(str, point) {
	let left = strReverse(str.slice(0, point)),
		right = str.slice(point);
	let smaller, larger;
	if (left.length < right.length) {
		smaller = left;
		larger = right;
	} else {
		smaller = right;
		larger = left;
	}
	return larger.slice(0, smaller.length) === smaller;
}

function findVerticalSymmetry(map) {
	let symmetricPoints = u.range(1, map[0].length - 1);
	for (let row of map) {
		symmetricPoints = symmetricPoints.filter((i) =>
			isSymmetricalAtPoint(row, i),
		);
		if (symmetricPoints.length === 0) {
			return null;
		}
	}
	return symmetricPoints[0];
}

function transposeStringArray(arr) {
	return u
		.transpose(arr.map((str) => str.split("")))
		.map((row) => row.join(""));
}

function findSymmetry(map) {
	let symmetry = findVerticalSymmetry(map);
	if (symmetry !== null) {
		return [true, symmetry];
	}
	symmetry = findVerticalSymmetry(transposeStringArray(map));
	if (symmetry !== null) {
		return [false, symmetry];
	}
	return null;
}

const answer1 = maps
	.map((map) => findSymmetry(map))
	.map(([isVertical, symmetry]) => (isVertical ? symmetry : symmetry * 100))
	.reduce(u.sum);

console.log(`Answer 1: ${answer1}`);

function findSmudge(map) {
	const midpoints = u.range(1, map[0].length - 1);
	const isSymmetricInRow = midpoints.map((point) =>
		map.map((row) => isSymmetricalAtPoint(row, point)),
	);
	const smudgeCol = isSymmetricInRow.findIndex(
		(symmetryRows) =>
			symmetryRows.filter(Boolean).length === symmetryRows.length - 1,
	);
	if (smudgeCol === -1) return null;
	return smudgeCol + 1;
}

function findSmudgedSymmetry(map) {
	let symmetry = findSmudge(map);
	if (symmetry !== null) {
		return [true, symmetry];
	}
	symmetry = findSmudge(transposeStringArray(map));
	if (symmetry !== null) {
		return [false, symmetry];
	}
	return null;
}

const answer2 = maps
	.map((map) => findSmudgedSymmetry(map))
	.map(([isVertical, symmetry]) => (isVertical ? symmetry : symmetry * 100))
	.reduce(u.sum);

console.log(`Answer 2: ${answer2}`);
