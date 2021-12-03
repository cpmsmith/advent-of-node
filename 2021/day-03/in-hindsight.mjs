#!/usr/bin/env node
import * as u from "../../lib/index.mjs";

const input = u.stdin().trim().split("\n").map(row => row.split("").map(Number));

function mostCommon(array) {
  return Number((array.reduce(u.sum) / array.length) >= 0.5);
}

let transposed = u.transpose(input);
let gamma = transposed.map(row => mostCommon(row));
let epsilon = gamma.map(b => Number(!b));
let answer1 = parseInt(gamma.join(""), 2) * parseInt(epsilon.join(""), 2);

let oxygen = input,
  co2 = input;

for (let i = 0; oxygen.length > 1 || co2.length > 1; i++) {
  if (oxygen.length > 1) {
    let common = mostCommon(oxygen.map(r => r[i]));
    oxygen = oxygen.filter(r => r[i] == common);
  }
  if (co2.length > 1) {
    let common = mostCommon(co2.map(r => r[i]));
    co2 = co2.filter(r => r[i] != common);
  }
}

let answer2 = parseInt(oxygen[0].join(""), 2) * parseInt(co2[0].join(""), 2)

console.log(`Answer 1: ${answer1}`);
console.log(`Answer 2: ${answer2}`);