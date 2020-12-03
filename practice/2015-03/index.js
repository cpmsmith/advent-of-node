#!/usr/bin/env node

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();

let x = y = x1 = y1 = x2 = y2 = 0,
  houses1 = {
    "0,0": 1
  }, houses2 = { ...houses1 };

for (let i = 0; i < input.length; i++) {
  const direction = input[i];
  const robo = Boolean(i % 2);
    if (direction === "<") {
      x--;
      robo ? x2-- : x1--; 
    } else if (direction === ">") {
      x++;
      robo ? x2++ : x1++; 
    } else if (direction === "^") {
      y--;
      robo ? y2-- : y1--; 
    } else if (direction === "v") {
      y++;
      robo ? y2++ : y1++; 
    }
  const coords1 = `${x},${y}`;
  const coords2 = robo ? `${x2},${y2}` : `${x1},${y1}`;
  if (houses1[coords1] === undefined) houses1[coords1] = 0;
  if (houses2[coords2] === undefined) houses2[coords2] = 0;
  houses1[coords1]++;
  houses2[coords2]++;
}

console.log(`ANSWER 1: ${Object.values(houses1).filter(n => n >= 1).length}`);
console.log(`ANSWER 2: ${Object.values(houses2).filter(n => n >= 1).length}`);