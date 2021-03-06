import PriorityQ from "../DataStructures/PriorityQ.jsx";
import { getNeighbors } from "../Utils";

// Uses Prim's Randomized Algorithm to add all cells, node by node, to a Maze.
// Algorthm goes as follows
// - choose a random start node and add its neighbors to a worklist
// - randomly select a node to the worklist and if it isn't in the maze,
// then add it

//! change vertices to hashmap

export default function prims(graph) {
  const randRow = Math.floor(Math.random() * graph.length);
  const randCol = Math.floor(Math.random() * graph[0].length);
  const firstInWork = graph[randRow][randCol];
  const graphSize = graph.length * graph[0].length;
  const worklist = new PriorityQ();
  worklist.insert(
    [firstInWork, firstInWork],
    Math.floor(Math.random() * graphSize)
  );
  const addInOrder = [];
  const vertices = new Map();

  while (vertices.size < graphSize) {
    const currEdge = worklist.removeMin();
    const [u, v] = currEdge;

    if (!vertices.has(v)) {
      const incidentNeighbors = getNeighbors(graph, v);
      vertices.set(v, v);
      addInOrder.push(currEdge);
      for (var i = 0; i < incidentNeighbors.length; i++) {
        const neighbor = incidentNeighbors[i];
        worklist.insert([v, neighbor], Math.floor(Math.random() * graphSize));
      }
    }
  }
  return addInOrder;
}
