#!/usr/bin/env node
import * as u from "../../lib/index.mjs";

function alphabetize(str) {
  return str.split("").sort().join("");
}
const input = u
  .stdin()
  .trim()
  .split("\n")
  .map((line) => {
    let [unique, final] = line.split(" | ");
    unique = unique.split(" ").map(alphabetize);
    final = final.split(" ").map(alphabetize);
    return [unique, final];
  });

function decipher(patterns) {
  let one = patterns.find((p) => p.length === 2);
  let seven = patterns.find((p) => p.length === 3);
  let four = patterns.find((p) => p.length === 4);
  let eight = patterns.find((p) => p.length === 7);
  let zerosixnine = patterns.filter(p => p.length === 6);
  let fiveSegments = "abcdefg".split("").filter(ch => zerosixnine.every(p => p.includes(ch)));
  let five = patterns.find(p => p.length === 5 && fiveSegments.every(s => p.includes(s)));
  let six = zerosixnine.find(p => !p.includes(one[0]) || !p.includes(one[1]));
  let zero = zerosixnine.find(p => !five.split("").every(ch => p.includes(ch)));
  let nine = zerosixnine.find(p => p != six && p != zero);
  let twothree = patterns.filter(p => p.length === 5 && p != five);
  let two = twothree.find(p => !p.includes(one[0]) || !p.includes(one[1]));
  let three = twothree.find(p => p != two);
  return [zero, one, two, three, four, five, six, seven, eight, nine];
}

let answer1 = input
  .map(([, outs]) => outs.filter((s) => [2, 3, 4, 7].includes(s.length)))
  .flat().length;

console.log(`Answer 1: ${answer1}`);
let answer2 = input.map(([uniques, outs]) => {
  let map = decipher(uniques);
  return Number(outs.map(reading => String(map.indexOf(reading))).join(""));
}).reduce(u.sum);
console.log(`Answer 2: ${answer2}`);
