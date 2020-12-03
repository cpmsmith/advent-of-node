#!/usr/bin/env node
const crypto = require('crypto');

const input = "iwrupvqb";

let found1 = found2 = null, i = 0;

while (found1 === null || found2 === null) {
  const hash = crypto.createHash("md5").update(`${input}${i++}`).digest("hex");
  if (i % 1000000 === 0) console.log(`${i}... ${hash}`);
  if (found1 === null && hash.startsWith("00000")) {
    found1 = i - 1;
    console.log(`ANSWER 1: ${found1}`);
  }
  if (found2 === null && hash.startsWith("000000")) {
    found2 = i - 1;
    console.log(`ANSWER 2: ${found2}`);
  }
}
