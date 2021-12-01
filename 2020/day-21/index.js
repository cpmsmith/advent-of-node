#!/usr/bin/env node

const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");

const dishes = input.map(str => {
  const [ingredients, allergens] = str.split(" (contains ");
  return {
    ingredients: ingredients.split(" "),
    allergens: allergens.slice(0, -1).split(", "),
  };
});

const allergenmap = new Map();

for (const dish of dishes) {
  for (const all of dish.allergens) {
    if (allergenmap.has(all)) {
      let newCandidates = allergenmap.get(all);
      newCandidates = newCandidates.filter(ing => dish.ingredients.includes(ing));
      allergenmap.set(all, newCandidates);
    } else {
      allergenmap.set(all, dish.ingredients);
    }
  }
}

while (Array.from(allergenmap.values()).some(i => Array.isArray(i))) {
  let figured = Array.from(allergenmap.entries()).find(([_a, is]) => Array.isArray(is) && is.length == 1);
  allergenmap.set(figured[0], figured[1][0]);
  allergenmap.forEach((v, k) => {
    if (typeof v == "string") return;
    allergenmap.set(k, v.filter(i => i !== figured[1][0]));
  });
}

let allergenIngredients = Array.from(allergenmap.values());

console.log(`ANSWER 1: ${dishes.map(d => d.ingredients).flat(Infinity).filter(i => !allergenIngredients.includes(i)).length}`);
console.log(`ANSWER 2: ${Array.from(allergenmap.entries()).sort((a, b) => a[0].localeCompare(b[0])).map(a => a[1]).join()}`);
