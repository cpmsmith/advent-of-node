#!/usr/bin/env node

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8');
const landscape = input.trim().split("\n").map(String);

let width = landscape[0].length;

function traverse(dx, dy) {
  let count = 0;
  for (let y = 0, x = 0; y < landscape.length; y += dy) {
    const spot = landscape[y][x];
    if (spot === "#") count++;
    x = (x + dx) % width;
  }
  return count;
}

let secondTrees = traverse(1, 1) * traverse(3, 1) * traverse(5, 1) * traverse(7, 1) * traverse(1, 2);


console.log(`ANSWER 1: ${traverse(3, 1)}`);
console.log(`ANSWER 2: ${secondTrees}`);