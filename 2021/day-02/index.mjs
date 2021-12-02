#!/usr/bin/env node
import { stdin } from "../../lib/index.mjs";

const input = stdin().split("\n").map(s => {
  let [dir, count] = s.split(" ");
  return [dir, Number(count)]
});

function partOne() {
  let depth = 0,
    position = 0;
  
  for (const [dir, count] of input) {
    switch (dir) {
      case "forward":
        position += count;
        break;
      case "down":
        depth += count;
        break;
      case "up":
        depth -= count;
        break;
    }
  }
  return depth * position;
}

function partTwo() {
  let aim = 0,
    depth = 0,
    position = 0;
  
  for (const [dir, count] of input) {
    switch (dir) {
      case "forward":
        position += count;
        depth += aim * count;
        break;
      case "down":
        aim += count;
        break;
      case "up":
        aim -= count;
        break;
    }
  }

  return depth * position;
}

console.log(`Answer 1: ${partOne()}`);
console.log(`Answer 2: ${partTwo()}`);