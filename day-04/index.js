#!/usr/bin/env node

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').split("\n").concat("");

const fields = ["byr","iyr","eyr","hgt","hcl","ecl","pid","cid"];

let valid1 = valid2 = 0;
let workingPspt = {};

function between(num, min, max) {
  return num >= min && num <= max;
}

function isValid(k, v) {
  if (v == null) return false;
  switch (k) {
    case "byr":
      return between(Number(v), 1920, 2002);
    case "iyr":
      return between(Number(v), 2010, 2020);
    case "eyr":
      return between(Number(v), 2020, 2030);
    case "hgt":
      let match = v.match(/^(\d+)(in|cm)$/);
      if (!match) return false;
      let num = Number(match[1]),
        unit = match[2];
      return unit == "in" ? between(num, 59, 76) : between(num, 150, 193);
    case "hcl":
      return /^#[0-9a-f]{6}$/.test(v);
    case "ecl":
      return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(v);
    case "pid":
      return /^\d{9}$/.test(v);
    default:
      return false;
  }
}

for (let i = 0; i < input.length; i++) {
  const line = input[i];
  if (line == "" && Object.keys(workingPspt).length > 0) {
    if (fields.every(k => k === "cid" || k in workingPspt)) valid1++;
    if (fields.every(k => k === "cid" || isValid(k, workingPspt[k]))) valid2++;
    workingPspt = {};
  } else {
    line.match(/\w{3}:[\w\d#]+/g)?.forEach(match => {
      let [k, v] = match.split(":");
      workingPspt[k] = v;
    })
  }
}

console.log(`ANSWER 1: ${valid1}`);
console.log(`ANSWER 2: ${valid2}`);