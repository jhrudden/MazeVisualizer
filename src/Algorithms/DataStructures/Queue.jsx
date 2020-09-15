export default class Queue {
  constructor() {
    this.queue = [];
  }

  insert(value) {
    this.queue.push(value);
  }

  remove() {
    return this.queue.shift();
  }
}
