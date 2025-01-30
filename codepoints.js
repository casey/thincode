import { Codepoint } from './codepoint.js';

let response = await fetch('unicode.txt');

if (!response.ok) {
  throw new Error('unicode.txt not found');
}

let unicode = await response.text();

let rtl = new Set(["R", "AL", "AN"]);

let classes = new Set([
  "Lm", // letter modifier
  "Sk", // symbol modifier
  "Zs", // whitespace
]);

let prefixes = new Set([
  "C", // control
  "M", // mark
  "Z", // separator
]);


export class Codepoints {
  codepoints = [];
  characters = new Map();

  constructor() {
    for (let line of unicode.split('\n')) {
      let record = line.split(';');

      let n = parseInt(record[0], 16);

      if (n > 0x1FBFF) {
        break;
      }

      let c = record[2];

      if (classes.has(c)) {
        continue;
      }

      if (prefixes.has(c[0])) {
        continue;
      }

      if (rtl.has(record[4])) {
        continue;
      }

      let codepoint = new Codepoint(n);

      this.codepoints.push(codepoint);
      this.characters.set(codepoint.character, codepoint);
    }
  }

  character(character) {
    return this.characters.get(character);
  }
}
