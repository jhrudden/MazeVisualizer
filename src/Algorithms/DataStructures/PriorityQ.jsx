export default class PriorityQ {
  constructor() {
    this.queue = [];
  }

  insert(item, weight) {
    this.queue.push([weight, item]);
    this.upHeap(this.queue.length - 1);
  }

  removeMin() {
    const last_index = this.queue.length - 1;
    const temp = this.queue[0];
    this.queue[0] = this.queue[last_index];
    this.queue[last_index] = temp;
    const min = this.queue.pop(last_index);
    this.downHeap(0);

    return min[1];
  }

  upHeap(index) {
    var parent = Math.floor((index - 1) / 2);

    if (index > 0 && this.queue[index][0] < this.queue[parent][0]) {
      const temp = this.queue[parent];
      this.queue[parent] = this.queue[index];
      this.queue[index] = temp;
      index = parent;

      this.upHeap(index);
    }
  }

  downHeap(index) {
    if (index >= this.queue.length - 1) {
      return;
    }
    const l_child_i = index * 2 + 1;
    const r_child_i = index * 2 + 2;

    if (l_child_i <= this.queue.length - 1) {
      var min_child_i = l_child_i;
      if (r_child_i <= this.queue.length - 1) {
        if (this.queue[l_child_i][0] > this.queue[r_child_i][0]) {
          min_child_i = r_child_i;
        }
      }
    } else {
      return;
    }

    if (this.queue[index][0] > this.queue[min_child_i][0]) {
      const temp = this.queue[min_child_i];
      this.queue[min_child_i] = this.queue[index];
      this.queue[index] = temp;
      index = min_child_i;

      this.downHeap(index);
    }
  }

  isEmpty() {
    return this.queue.length == 0;
  }
  size() {
    return this.queue.length;
  }
}
