import { getNeighbors } from "./Utils.jsx";

export function depthFirstSearch(graph, startCoord, EndCoord) {
  const endNode = graph[EndCoord[0]][EndCoord[1]];
  var currentNode = graph[startCoord[0]][startCoord[1]];
  const worklist = [];
  const comeFrom = new Map();
  const roadtrip = [];
  comeFrom.set(currentNode, currentNode);

  // Might need to use a different type of equality
  while (currentNode.col != endNode.col || currentNode.row != endNode.row) {
    const currentNeighbors = currentNode.neighbors;

    for (var i = 0; i < currentNeighbors.length; i++) {
      if (currentNeighbors[i] != null && !comeFrom.has(currentNeighbors[i])) {
        worklist.push(currentNeighbors[i]);
        comeFrom.set(currentNeighbors[i], currentNode);
      }
    }
    roadtrip.push(currentNode);

    currentNode = worklist.pop(0);
  }
  const returnPair = [roadtrip, getPath(comeFrom, endNode)];
  return returnPair;
}

function getPath(comeFrom, endNode) {
  var currentNode = endNode;
  const path = [];
  while (comeFrom.get(currentNode) != currentNode) {
    path.splice(0, 0, currentNode);
    currentNode = comeFrom.get(currentNode);
  }
  return path;
}
