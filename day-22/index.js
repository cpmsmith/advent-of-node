#!/usr/bin/env node

const fs = require("fs");
let [deck1, deck2] = fs.readFileSync(0, "utf8").trim().split("\n\n").map(s => s.split("\n").slice(1).reverse().map(Number));

function part1(_deck1, _deck2) {
  const deck1 = [..._deck1],
    deck2 = [..._deck2];

  while (!(deck1.length == 0 || deck2.length == 0)) {
    let card1 = deck1.pop();
    let card2 = deck2.pop();
    (card1 > card2 ? deck1 : deck2).unshift(...[card1, card2].sort((a, b) => a - b));
  }
  
  let winner = deck1.length == 0 ? deck2 : deck1;
  return winner.map((n, i) => n * (i+1)).reduce((a, b) =>  a + b);
}

function subgame(_deck1, _deck2) {
  let deck1 = [..._deck1],
    deck2 = [..._deck2];

  const pastGames = new Map();

  do {
    const gamestate = JSON.stringify([deck1, deck2]);
    if (pastGames.has(gamestate)) break;
    pastGames.set(gamestate);

    let roundwinner = null;
    let topcard1 = deck1.pop(),
      topcard2 = deck2.pop();
    
    if (topcard1 > deck1.length || topcard2 > deck2.length) {
      roundwinner = topcard1 > topcard2 ? 1 : 2;
    } else {
      [roundwinner] = subgame(
        deck1.slice(deck1.length - topcard1, deck1.length),
        deck2.slice(deck2.length - topcard2, deck2.length),
      );
    }

    (roundwinner == 1 ? deck1 : deck2).unshift(...(roundwinner == 1 ? [topcard2, topcard1] : [topcard1, topcard2]));
  } while (deck1.length && deck2.length)

  return [deck1.length ? 1 : 2, deck1, deck2];
}

function part2(_deck1, _deck2) {
  let [_winner, deck1, deck2] = subgame(_deck1, _deck2);
  return (deck1.length ? deck1 : deck2).map((n, i) => n * (i+1)).reduce((a, b) =>  a + b);
}

console.log(`ANSWER 1: ${part1(deck1, deck2)}`);
console.log(`ANSWER 2: ${part2(deck1, deck2)}`);
