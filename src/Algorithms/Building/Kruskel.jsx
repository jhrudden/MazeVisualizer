import PriorityQ from "../DataStructures/PriorityQ";
import { getNeighbors } from "../Utils";

export default function kruskel(graph) {
  const [worklist, subsets] = kruskelHelper(graph);
  const edgeList = [];
  while (!worklist.isEmpty()) {
    const [u, v] = worklist.removeMin();
    const originParent = findParentOfSubset(subsets, u);
    const incidentParent = findParentOfSubset(subsets, v);
    if (originParent != incidentParent) {
      edgeList.push([u, v]);
      subsets.delete(originParent);
      subsets.set(originParent, v);
    }
  }
  return edgeList;
}

function kruskelHelper(graph) {
  const subsets = new Map();
  const worklist = new PriorityQ();
  const rowCount = graph.length;
  const colCount = graph[0].length;
  for (var i = 0; i < rowCount; i++) {
    for (var j = 0; j < colCount; j++) {
      const currentNode = graph[i][j];
      subsets.set(currentNode, currentNode);
      const currentNeighbors = getNeighbors(graph, currentNode);
      currentNeighbors.map((neighbor) =>
        worklist.insert(
          [currentNode, neighbor],
          Math.floor(Math.random() * rowCount * colCount)
        )
      );
    }
  }
  return [worklist, subsets];
}

function findParentOfSubset(subset, key) {
  while (subset.get(key) != key) {
    key = subset.get(key);
  }
  return key;
}
