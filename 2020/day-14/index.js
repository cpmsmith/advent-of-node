#!/usr/bin/env node

const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");

let mask = null;

let values1 = new Map(),
  values2 = new Map();

function sum(a, b) {
  return a + b;
}

function replaceChar(str, location, char) {
  return str.substring(0, location) + char + str.substring(location + 1);
}

function explode(address, mask) {
  let exploded = [address];
  for (let i = 0; i < mask.length; i++) {
    const char = mask[i];
    if (char === "1") {
      for (let j = 0; j < exploded.length; j++) {
        exploded[j] = replaceChar(exploded[j], i, "1");
      }
    } else if (char === "X") {
      let prevLength = exploded.length;
      for (let j = 0; j < prevLength; j++) {
        exploded[j] = replaceChar(exploded[j], i, "0");
        let tempString = exploded[j];
        tempString = replaceChar(tempString, i, "1");
        exploded.push(tempString);
      }
    }
  }
  return exploded;
}

for (let i = 0; i < input.length; i++) {
  const instruction = input[i];
  if (instruction.startsWith("mask")) {
    mask = instruction.slice(7);
  } else {
    let [addr, value] = instruction.match(/\d+/g);
    values1.set(
      addr,
      parseInt(
        Number(value).toString(2).padStart(36, "0").split("").map((c, i) => (mask[i] != "X" ? mask[i] : c)).join(""),
        2
      )
    );
    for (const eAddr of explode(
      Number(addr).toString(2).padStart(36, "0"),
      mask
    )) {
      values2.set(eAddr, Number(value));
    }
  }
}

console.log(`ANSWER 1: ${Array.from(values1.values()).reduce(sum)}`);
console.log(`ANSWER 2: ${Array.from(values2.values()).reduce(sum)}`);

// console.log(explode("000000000000000000000000000000011010", "000000000000000000000000000000X1101X"));
