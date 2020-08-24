import { getNeighbors } from "./Utils.jsx";

export function depthFirstSearch(graph, startCoord, EndCoord) {
  const endNode = graph[EndCoord[0]][EndCoord[1]];
  var currentNode = graph[startCoord[0]][startCoord[1]];
  const worklist = [];
  const visitedList = new Map();
  const roadtrip = [];

  console.log(currentNode.col, endNode.col, currentNode.row, endNode.row);
  // Might need to use a different type of equality
  while (currentNode.col != endNode.col || currentNode.row != endNode.row) {
    console.log(currentNode.col, endNode.col, currentNode.row, endNode.row);
    const currentNeighbors = currentNode.neighbors;

    for (var i = 0; i < currentNeighbors.length; i++) {
      if (
        currentNeighbors[i] != null &&
        !visitedList.has(currentNeighbors[i])
      ) {
        worklist.push(currentNeighbors[i]);
      }
    }
    roadtrip.push(currentNode);
    visitedList.set(currentNode, currentNode);

    currentNode = worklist.pop(0);
  }
  return roadtrip;
}
