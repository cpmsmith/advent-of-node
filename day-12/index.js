#!/usr/bin/env node

const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n").map(s => [s.slice(0, 1), Number(s.slice(1))]);

let orientations = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

let ship1 = [0, 0],
  heading1 = 0,
  ship2 = [0, 0],
  waypoint = [10, -1];

for (let i = 0; i < input.length; i++) {
  const [instruction, value] = input[i];
  switch (instruction) {
    case "N":
      ship1[1] -= value;
      waypoint[1] -= value;
      break;
    case "S":
      ship1[1] += value;
      waypoint[1] += value;
      break;
    case "E":
      ship1[0] += value;
      waypoint[0] += value;
      break;
    case "W":
      ship1[0] -= value;
      waypoint[0] -= value;
      break;
    case "L":
      heading1 = (heading1 + 4 - ((value/90)%4)) % 4;
      for (let i = 0; i < value/90; i++) {
        waypoint = [waypoint[1], waypoint[0]*-1];
      }
      break;
    case "R":
      heading1 = (heading1 + (value/90)) % 4;
      for (let i = 0; i < value/90; i++) {
        waypoint = [waypoint[1]*-1, waypoint[0]];
      }
      break;
    case "F":
      ship1 = ship1.map((v, i) => v + (orientations[heading1][i] * value));
      ship2 = ship2.map((v, i) => v + (waypoint[i] * value));
      break;
  }
}

console.log(`ANSWER 1: ${Math.abs(ship1[0]) + Math.abs(ship1[1])}`);
console.log(`ANSWER 2: ${Math.abs(ship2[0]) + Math.abs(ship2[1])}`);