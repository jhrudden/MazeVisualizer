import Stack from "../DataStructures/Stack";
import { getNeighbors } from "../Utils";

//! need to randomize the wall picking someway
//? look at wikipedia for help
export default function dfsBuilder(graph) {
  const startNodeRow = Math.floor(Math.random() * graph.length);
  const startNodeCol = Math.floor(Math.random() * graph[0].length);
  const startNode = graph[startNodeRow][startNodeCol];
  const worklist = new Stack();
  worklist.insert([startNode, startNode]);
  const mazeDir = new Map();
  const maze = [];
  while (!worklist.isEmpty()) {
    const [u, v] = worklist.remove();
    if (!mazeDir.has(v)) {
      const currentNeighbors = getNeighbors(graph, v);
      for (var i = 0; i < currentNeighbors.length; i++) {
        const currentNeighbor = currentNeighbors[i];
        if (!mazeDir.has(currentNeighbor)) {
          worklist.insert([v, currentNeighbor]);
        }
      }
      maze.push([u, v]);
      mazeDir.set(u, u);
    }
  }
  console.log(maze);
  return maze;
}
