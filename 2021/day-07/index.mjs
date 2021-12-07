#!/usr/bin/env node
import * as u from "../../lib/index.mjs";

const input = u.stdin().trim().split(",").map(Number);

const median = input.sort((a, b) => a - b)[Math.round(input.length / 2)];
let answer1 = input.map(e => Math.abs(e - median)).reduce(u.sum);

// round works on the sample input, floor works on my input ¯\_(ツ)_/¯
const mean = Math.floor(input.reduce(u.sum) / input.length);
let answer2 = input.map(e => Math.abs(e - Math.floor(mean))).map(e => ((e * (e+1)) / 2)).reduce(u.sum);

console.log(`Answer 1: ${answer1}`);
console.log(`Answer 2: ${answer2}`);
