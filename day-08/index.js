#!/usr/bin/env node

const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");

function evaluate(lines, part2 = false) {
  let i = acc = 0,
    alreadyRun = new Set();

  while (i < lines.length) {
    const line = lines[i];
    if (alreadyRun.has(i)) {
      return part2 ? null : acc;
    } else {
      alreadyRun.add(i);
      const [instruction, val] = line.match(/(nop|acc|jmp) ([-+]\d+)/).slice(1);
      if (instruction == "jmp") {
        i += Number(val);
      } else {
        if (instruction == "acc") acc += Number(val);
        i++;
      }
    }
  }
  return acc;
}

let answer2 = null;

for (let j = 0; j < input.length; j++) {
  const line = input[j];
  if (line.startsWith("nop")) {
    let modded = [...input];
    modded[j] = input[j].replace("nop", "jmp");
    answer2 = evaluate(modded, true);
  } else if (line.startsWith("jmp")) {
    let modded = [...input];
    modded[j] = input[j].replace("jmp", "nop");
    answer2 = evaluate(modded, true);
  }
  if (answer2 != null) break;
}

console.log(`ANSWER 1: ${evaluate(input)}`);
console.log(`ANSWER 2: ${answer2}`);
