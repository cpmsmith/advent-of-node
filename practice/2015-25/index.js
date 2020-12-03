#!/usr/bin/env node

let target = [3019, 3010];

function nextCode(prev) {
  return (prev * 252533) % 33554393;
}

function triangle(x, y) {
  let n = x + y - 1;
  return ((n * (n + 1))/2) - (y-1);
}

let startPos = triangle(6, 6),
  tracker = 27995004,
  endPos = triangle(...target);

for (let i = startPos; i < endPos; i++) {
  tracker = nextCode(tracker);
}
console.log(tracker);