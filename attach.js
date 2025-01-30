export class Attach {
  elements = [];

  attach(parent) {
    for (let element of this.elements) {
      parent.append(element)
    }
  }
}
