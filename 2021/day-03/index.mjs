#!/usr/bin/env node
import * as u from "../../lib/index.mjs";

const input = u.stdin().trim().split("\n");

const bitLength = input[0].length;

/* It turns out this could've just defaulted to 1 */
function modeSquid(array) {
  let avg = array.reduce(u.sum) / array.length;
  return avg > 0.5 ? 1 : avg < 0.5 ? 0 : null;
}

let gamma = Array(bitLength).fill(0);
for (let i = 0; i < gamma.length; i++) {
  gamma[i] = modeSquid(input.map(line => Number(line[i])));
}

let epsilon = gamma.map(b => Number(!b));

let answer1 = parseInt(gamma.join(""), 2) * parseInt(epsilon.join(""), 2);

let oxygen = input,
  co2 = input;

for (let i = 0; i < bitLength; i++) {
  let mostCommon = modeSquid(oxygen.map(e => Number(e[i]))) ?? 1;
  oxygen = oxygen.filter(e => e[i] == mostCommon);
  if (oxygen.length === 1) {
    oxygen = oxygen[0];
    break;
  }
}
for (let i = 0; i < bitLength; i++) {
  let mostCommon = modeSquid(co2.map(e => Number(e[i]))) ?? 1;
  co2 = co2.filter(e => e[i] != mostCommon);
  if (co2.length === 1) {
    co2 = co2[0];
    break;
  }
}

let answer2 = parseInt(oxygen, 2) * parseInt(co2, 2);

console.log(`Answer 1: ${answer1}`);
console.log(`Answer 2: ${answer2}`);