#!/usr/bin/env node

const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n").map((s) => s.split(""));

let seats = [...input].map(r => [...r]),
  seats2 = [...input].map(r => [...r]);

/**
 * @param {string[][]} seats
 */
function live(seats) {
  let rows = [...seats].map(r => [...r]);
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    for (let j = 0; j < row.length; j++) {
      const seat = row[j];
      const neighbours = seats
        .slice(Math.max(0, i - 1), Math.min(rows.length, i + 2))
        .map((r) => r.slice(Math.max(0, j - 1), Math.min(r.length, j + 2))).reduce((a, b) => [...a, ...b]);
      if (seat === "L" && neighbours.every(s => s !== "#")) {
        rows[i][j] = "#";
      } else if (seat === "#" && neighbours.filter(s => s === "#").length > 4) {
        rows[i][j] = "L";
      }
    }
  }
  return rows;
}

function countOccupied(seats) {
  return [...seats.map(r => r.join("")).join("")].filter(s => s === "#").length;
}

let lastLength = countOccupied(seats);
while (true) {
  seats = live(seats);
  let newLength = countOccupied(seats);
  if (newLength === lastLength) break;
  else lastLength = newLength;
}

const dirs = [
  [-1, -1],
  [-1,  0],
  [-1,  1],
  [0,  -1],
  [0,   1],
  [1,  -1],
  [1,   0],
  [1,   1],
];

function live2(seats) {
  let didChange = false;
  let rows = [...seats].map(r => [...r]);
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    for (let j = 0; j < row.length; j++) {
      const seat = row[j];
      const neighbours = dirs.map(dir => nearest(seats, i, j, dir[0], dir[1]));
      if (seat === "L" && neighbours.every(s => s !== "#")) {
        rows[i][j] = "#";
        didChange = true;
      } else if (seat === "#" && neighbours.filter(s => s === "#").length >= 5) {
        rows[i][j] = "L";
        didChange = true;
      }
    }
  }
  return [rows, didChange];
}

function nearest(rows, y, x, dy, dx) {
  let i = y, j = x;
  do {
    i += dy;
    j += dx;
  } while (rows[i]?.[j] == ".")
  return rows[i]?.[j];
}

let lastLength2 = countOccupied(input);

while (true) {
  [seats2, didChange] = live2(seats2);
  let newLength2 = countOccupied(seats2);
  if (!didChange) break;
  else lastLength2 = newLength2;
}

console.log(`ANSWER 1: ${countOccupied(seats)}`);
console.log(`ANSWER 2: ${countOccupied(seats2)}`);
