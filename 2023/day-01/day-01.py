#!/usr/bin/env python3
import re
from argparse import ArgumentParser

charMap = {
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9",
}


def main():
    parser = ArgumentParser()
    parser.add_argument("input", help="Input file", default=None, nargs="?")
    args = parser.parse_args()
    with open(args.input or 0, "r") as file:
        lines = file.readlines()
    print(f"Answer 1: {answer1(lines)}")
    print(f"Answer 2: {answer2(lines)}")


def answer1(lines):
    return sum(
        int(digits[0] + digits[-1])
        for digits in (re.findall("\d", line) for line in lines)
    )


def answer2(lines):
    return sum(
        int(digits[0] + digits[-1])
        for digits in (
            [
                charMap.get(digit, digit)
                for digit in re.findall(f"(?=(\d|{'|'.join(charMap.keys())}))", line)
            ]
            for line in lines
        )
    )


if __name__ == "__main__":
    main()
