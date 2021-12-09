#!/usr/bin/env node
import * as u from "../../lib/index.mjs";

const input = u.stdin().trim().split("\n").map((l) => l.split("").map(Number));

let answer1 = 0;
let lowPoints = [];
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[0].length; j++) {
    const cell = input[i][j];
    if (neighbours(i, j).every(([i2, j2]) => cell < input[i2][j2])) {
      lowPoints.push([i, j]);
      answer1 += cell + 1;
    }
  }
}

function unique(value, index, self) {
  return self.indexOf(value) === index;
}

function neighbours(y, x) {
  return [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]
    .map(([dy, dx]) => [dy + y, dx + x])
    .filter(
      ([y2, x2]) =>
        u.between(y2, 0, input.length - 1) &&
        u.between(x2, 0, input[0].length - 1)
    );
}

function fill(coords) {
  // coords is a string so that `indexOf` will work in `unique`
  let [y, x] = coords.split(",").map(Number);
  let area = [coords];
  for (const [y2, x2] of neighbours(y, x)) {
    if (input[y2][x2] > input[y][x] && input[y2][x2] != 9) {
      area = area.concat(fill([y2, x2].join(",")));
    }
  }
  return area.filter(unique);
}

let allBasins = lowPoints.map(([y, x]) => fill([y, x].join(",")));
let answer2 = allBasins.map((b) => b.length).sort((a, b) => b - a).slice(0, 3).reduce(u.product);

console.log(`Answer 1: ${answer1}`);
console.log(`Answer 2: ${answer2}`);
