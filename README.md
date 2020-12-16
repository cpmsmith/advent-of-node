# Advent of Code 2020
These are my solutions for [Advent of Code 2020](https://adventofcode.com/2020). By and large, they are left as I wrote them at the time—hurriedly, at midnight—so if a solution is bad, that’s the reason. Obviously. In some cases, I cannibalized my part 1 solution for part 2, and was therefore forced to rewrite the file to generate both solutions for posterity, necessarily cleaning it up a bit. When I couldn’t help myself, I wrote a second, improved solution, and included it separately.

## Running
On days whose input is more than a few characters, the programs take input from `stdin`. `download.sh` automatically downloads a given day's input to `day-$N/input.txt`, for convenience.

## Setup
For the download script, you need to grab your session cookie from your browser, and put it in a `.env` file in the root directory, like so:

```sh
COOKIE="session=9f6736f426ce421e127fdd59d4a7ad6563ceec469f6736f426ce421e127fdd59d4a7ad6563ceec469f6736f426ce421e"
```
