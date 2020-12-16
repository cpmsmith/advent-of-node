#!/usr/bin/env node

const fs = require("fs");
const [rulesRaw, yourTicketRaw, otherTicketsRaw] = fs.readFileSync(0, "utf8").trim().split("\n\n");

const rules = rulesRaw.split("\n").map(raw => {
  let [name, rangesRaw] = raw.split(": ");
  let ranges = rangesRaw.split(" or ").map(r => {
    let [min, max] = r.match(/\d+/g);
    return { min, max };
  });

  return { name, ranges };
});

let yourTicket = {
  rawFields: yourTicketRaw.split("\n")[1].split(",").map(Number)
};

let otherTickets = otherTicketsRaw.split("\n").slice(1).map(raw => {
  return {
    rawFields: raw.split(",").map(Number)
  };
});

let errorRate = 0,
  notInvalidTickets = [];

for (let i = 0; i < otherTickets.length; i++) {
  const ticket = otherTickets[i];
  let valid = true;
  for (let j = 0; j < ticket.rawFields.length; j++) {
    const field = ticket.rawFields[j];
    if (!rules.some(rule => rule.ranges.some(({ min, max}) => between(field, min, max)))) {
      errorRate += field;
      valid = false;
    }
  }
  if (valid) notInvalidTickets.push(ticket);
}

function between(val, min, max) {
  return min <= val && max >= val;
}

let fieldMap = rules.map(({ name, ranges }) => {
  let candidates = [];
  for (let i = 0; i < yourTicket.rawFields.length; i++) {
    if (notInvalidTickets.every(ticket => ranges.some(({ min, max }) => between(ticket.rawFields[i], min, max)))) {
      candidates.push(i);
    }
  }
  return {
    name, candidates, real: candidates.length === 1 ? candidates[0] : null
  };
});

while (!fieldMap.every(({ real }) => real !== null)) {
  const taken = fieldMap.map(f => f.real).filter(v => v !== null);
  for (let i = 0; i < fieldMap.length; i++) {
    const field = fieldMap[i];
    field.candidates = field.candidates.filter(index => !taken.includes(index));
    if (field.candidates.length === 1) field.real = field.candidates[0];
  }
}

let answer2 = fieldMap.filter(f => f.name.startsWith("departure")).map(f => yourTicket.rawFields[f.real]).reduce((a, b) => a * b);

console.log(`ANSWER 1: ${errorRate}`);
console.log(`ANSWER 2: ${answer2}`);
