// Uses Prim's Randomized Algorithm to add all cells, node by node, to a Maze.
// Algorthm goes as follows
// - choose a random start node and add its neighbors to a worklist
// - randomly select a node to the worklist and if it isn't in the maze,
// then add it

export function prims(graph) {
  const randRow = Math.floor(Math.random() * graph.length);
  const randCol = Math.floor(Math.random() * graph[0].length);
  const firstInWork = graph[randRow][randCol];
  const worklist = [firstInWork];
  const addInOrder = [[firstInWork, firstInWork]];
  var connectFrom = new Map();
  const vertices = [firstInWork];
  const graphSize = graph.length * graph[0].length;
  while (vertices.length < graphSize) {
    const currVal = worklist.pop(Math.floor(Math.random * worklist.length));
    if (connectFrom.currVal == null || connectFrom.currVal != currVal) {
      const curNeighbors = getNeighbors(graph, currVal);
      for (var i = 0; i < curNeighbors.length; i++) {
        const neighbor = curNeighbors[i];
        if (connectFrom.neighbor == null) {
          connectFrom[neighbor] = currVal;
          worklist.push(neighbor);
        }
        console.log(connectFrom);
      }
      addInOrder.push([connectFrom.currVal, currVal]);
      connectFrom[currVal] = currVal;
      vertices.push(currVal);
    }
    console.log(worklist.length);
  }
  return addInOrder;
}

export function connect(node1, node2) {
  if (node1.row < node2.row) {
    node1.neighbors[0] = node2;
    node2.neighbors[1] = node1;
  } else if (node1.row > node2.row) {
    node1.neighbors[1] = node2;
    node2.neighbors[0] = node1;
  } else if (node1.col < node2.col) {
    node1.neighbors[3] = node2;
    node2.neighbors[2] = node1;
  } else if (node1.col > node2.col) {
    node1.neighbors[2] = node2;
    node2.neighbors[3] = node1;
  }
}

function getNeighbors(graph, node) {
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
