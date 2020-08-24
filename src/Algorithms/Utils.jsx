export function getNeighbors(graph, node) {
  const { col, row } = node;
  const neighbors = [];
  if (col > 0) {
    neighbors.push(graph[row][col - 1]);
  }
  if (row > 0) {
    neighbors.push(graph[row - 1][col]);
  }
  if (graph.length - 1 > row) {
    neighbors.push(graph[row + 1][col]);
  }
  if (graph[0].length - 1 > col) {
    neighbors.push(graph[row][col + 1]);
  }
  return neighbors;
}

export function connect(node1, node2) {
  if (node1.row < node2.row) {
    node1.neighbors[1] = node2;
    node2.neighbors[0] = node1;
  } else if (node1.row > node2.row) {
    node1.neighbors[0] = node2;
    node2.neighbors[1] = node1;
  } else if (node1.col < node2.col) {
    node1.neighbors[3] = node2;
    node2.neighbors[2] = node1;
  } else if (node1.col > node2.col) {
    node1.neighbors[2] = node2;
    node2.neighbors[3] = node1;
  }
}
