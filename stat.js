import { Attach } from './attach.js';

export class Stat extends Attach {
  dt = document.createElement('dt');
  dd = document.createElement('dd');
  #value = null;
  formatter = value => value;

  constructor(name) {
    super();
    this.elements.push(this.dt);
    this.elements.push(this.dd);
    this.dt.innerText = name;
  }

  get value() {
    return this.#value;
  }

  set value(value) {
    this.#value = value;
    this.dd.innerText = this.formatter(value);
  }
}
