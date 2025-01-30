import { Attach } from './attach.js';
import { Bounds } from './bounds.js';
import { Stats } from './stats.js';

const RATIO = window.devicePixelRatio;
const HALF = 0.5 / RATIO;
const SIZE = 512;
const FONT = SIZE / 4 + 'px sans-serif';

export class Metrics extends Attach {
  canvas = document.createElement('canvas');

  constructor() {
    super();
    this.elements.push(this.canvas);

    this.canvas.style.border = '1px solid white';

    this.canvas.width = SIZE * RATIO;
    this.canvas.height = SIZE * RATIO;

    this.canvas.style.width = SIZE + 'px';
    this.canvas.style.height = SIZE + 'px';

    this.context = this.canvas.getContext('2d', { willReadFrequently: false });
    this.context.scale(RATIO, RATIO);
    this.context.font = FONT;
    this.context.fillStyle = 'white';
    this.context.strokeStyle = 'red';
    this.context.lineWidth = 1 / RATIO;
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
  }

  bounds() {
    let image = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);

    let top = image.height;
    let bottom = 0;
    let left = image.width;
    let right = 0;
    let empty = true;

    for (let row = 0; row < image.height; row++) {
      for (let col = 0; col < image.width; col++) {
        let pixel = row * image.width + col;
        let i = pixel * 4;
        let r = image.data[i + 0];
        let g = image.data[i + 1];
        let b = image.data[i + 2];

        if (r == 0 && g == 0 && b == 0) {
          continue;
        }

        empty = false;

        top = Math.min(top, row);
        bottom = Math.max(bottom, row);
        left = Math.min(left, col);
        right = Math.max(right, col);
      }
    }

    if (empty) {
      return new Bounds(0, 0, 0, 0);
    }

    return new Bounds(left, top, right - left, bottom - top);
  }

  measure(codepoint) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillText(codepoint.character, SIZE / 2, SIZE / 3);
    let one = this.bounds();
    codepoint.one = one;

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillText(codepoint.character.repeat(2), SIZE / 2, SIZE / 3 * 2);
    let two = this.bounds();
    codepoint.two = two;

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillText(codepoint.character, SIZE / 2, SIZE / 3);
    this.context.fillText(codepoint.character.repeat(2), SIZE / 2, SIZE / 3 * 2);
    this.context.strokeRect(
      one.x / RATIO - HALF,
      one.y  / RATIO - HALF,
      one.width / RATIO + HALF * 4,
      one.height / RATIO + HALF * 4,
    );
    this.context.strokeRect(
      two.x / RATIO - HALF,
      two.y  / RATIO - HALF,
      two.width / RATIO + HALF * 4,
      two.height / RATIO + HALF * 4,
    );
  }
}
