import { Attach } from './attach.js';

export class Alphabet extends Attach {
  codepoints = [];
  table = document.createElement('table');

  constructor() {
    super();
    this.elements.push(this.table);
    let head = this.table.createTHead().insertRow();

    let headers = [
      'codepoint',
      'one',
      'ten',
      'advance',
      'glyph',
      'bearing',
    ];

    for (let header of headers) {
      let th = document.createElement("th");
      th.textContent = header;
      head.appendChild(th);
    }

    this.body = this.table.createTBody();
  }

  insert(codepoint) {
    let position = this.position(codepoint);

    this.codepoints.splice(position, 0, codepoint);

    let row = this.body.insertRow(position);

    let values = [
      codepoint,
      codepoint.character,
      codepoint.character.repeat(10),
      codepoint.advance,
      codepoint.glyph,
      codepoint.bearing,
    ];

    for (let value of values) {
      let cell = row.insertCell();
      cell.textContent = value;
    }
  }

  position(codepoint) {
    let left = 0;
    let right = this.codepoints.length - 1;

    while (left <= right) {
      let middle = Math.floor((left + right) / 2);
      let order = codepoint.order(this.codepoints[middle]);

      if (order === -1) {
        right = middle - 1;
      } else if (order === 1) {
        left = middle + 1;
      } else {
        left = middle;
        break;
      }
    }

    return left;
  }

  render() {
    let alphabet = '';

    for (let codepoint of this.codepoints.slice(0, 256)) {
      alphabet += codepoint.character;
    }

    return alphabet;
  }
}
