#!/usr/bin/env node

// my kingdom for a dict comprehension

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split("\n");

let rules = input.map(line => {
  let [_i, colour, contents] = line.match(/^(.*) bags contain (.*)\.$/);
  return {
    colour,
    contents: contents.split(", ").map(r => r.match(/(\d+) (.*) bags?/)?.slice(1))
  }
})

function getcontainers(colours, found = []) {
  let newfound = rules.filter(rule => rule.contents.find(r => colours.includes(r?.[1]))).map(rule => rule.colour).filter(c => !found.includes(c));
  if (newfound.length > 0) {
    return getcontainers(newfound, found.concat(...newfound));
  }
  return found;
}

const sum = (a, b) => a + b;

function getcontents(colour) {
  let rule = rules.find(r => r.colour === colour);
  if (rule.contents[0] === undefined) return 1;
  else return rule.contents.map(([n, co]) => Number(n) * getcontents(co)).reduce(sum) + 1;
}

console.log(`ANSWER 1: ${getcontainers(["shiny gold"]).length}`);
console.log(`ANSWER 2: ${getcontents("shiny gold") - 1}`);