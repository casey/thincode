import { Stat } from './stat.js';
import { Attach } from './attach.js';

export class Stats extends Attach {
  element = document.createElement('dl');
  stats = new Map();

  constructor() {
    super();
    this.elements.push(this.element);
  }

  stat(name) {
    let stat = this.stats.get(name);

    if (stat) {
      return stat;
    }

    stat = new Stat(name);

    this.stats.set(name, stat);

    stat.attach(this.element);

    return stat;
  }
}
