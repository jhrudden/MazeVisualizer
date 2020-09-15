export default class Stack {
  constructor() {
    this.stack = [];
  }

  insert(value) {
    this.stack.push(value);
  }

  remove() {
    return this.stack.pop();
  }
}
