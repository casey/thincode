export class Codepoint {
  one = null;
  two = null;

  constructor(codepoint) {
    this.codepoint = codepoint;
    this.character = String.fromCodePoint(codepoint);
  }

  order(other) {
    if (this.bearing >= 0 && other.bearing < 0) {
      return -1;
    }

    if (this.bearing < 0 && other.bearing >= 0) {
      return 1;
    }

    if (this.advance < other.advance) {
      return -1;
    }

    if (this.advance > other.advance) {
      return 1;
    }

    return 0;
  }

  toString() {
    return `0x${this.codepoint.toString(16).toUpperCase().padStart(5, '0')}`;
  }

  get glyph() {
    return this.one.width;
  }

  get bearing() {
    return this.two.width - this.one.width * 2;
  }

  get advance() {
    return this.glyph + this.bearing;
  }
}
