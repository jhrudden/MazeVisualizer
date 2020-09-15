import Stack from "../DataStructures/Stack";
import { getNeighbors } from "../Utils";

//! need to find a way to have some sort of connection or edge that is added to maze array before it is output
export default function dfsBuilder(graph) {
  const startNodeRow = Math.floor(Math.random() * graph.length);
  const startNodeCol = Math.floor(Math.random() * graph[0].length);
  var currentNode = graph[startNodeRow][startNodeCol];
  const worklist = new Stack();
  worklist.insert(currentNode);
  const mazeDir = new Map();
  const maze = [];
  while (!worklist.isEmpty()) {
    currentNode = worklist.remove();
    if (!mazeDir.has(currentNode)) {
      const currentNeighbors = getNeighbors(graph, currentNode);
      for (var i = 0; i < currentNeighbors.length; i++) {
        const currentNeighbor = currentNeighbors[i];
        if (!mazeDir.has(currentNeighbor)) {
          worklist.insert(currentNeighbor);
        }
      }
      maze.push(currentNode);
      mazeDir.set(currentNode, currentNode);
    }
  }
  console.log(maze);
  return maze;
}
