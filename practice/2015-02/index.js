#!/usr/bin/env node

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();

const sizes = input.split("\n").map(s => s.match(/^(\d+)x(\d+)x(\d+)$/).slice(1).map(Number));

let totalPaper = 0;
let totalRibbon = 0;

for (let i = 0; i < sizes.length; i++) {
  const dimensions = sizes[i];
  const areas = dimensions.map((n, j, a) => n * a[(j + 1) % a.length]);

  const rowreq = areas.map(a => a * 2).reduce((a,b) => a + b) + Math.min(...areas);
  totalPaper += rowreq;

  const mainRibbon = dimensions.sort((a, b) => a - b).slice(0, 2).map(n => n * 2).reduce((a, b) => a + b);
  totalRibbon += mainRibbon;
  const bow = dimensions.reduce((a, b) => a * b);
  totalRibbon += bow;


  // console.log(dimensions, areas, rowreq, mainRibbon, bow);
  // throw "yo";
}

console.log(`ANSWER 1: ${totalPaper}`);
console.log(`ANSWER 2: ${totalRibbon}`);