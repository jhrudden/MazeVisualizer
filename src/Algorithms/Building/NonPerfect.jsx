import { getNeighbors } from "../Utils";

//! maybe randomly select a edge and add one of its borders to edge list
export default function generateNonPerfect(graph, edgeList, wallsToBreakDown) {
  var edgesToCut = wallsToBreakDown;
  while (edgesToCut > 0) {
    var nodeOfInterest =
      graph[Math.floor(Math.random() * graph.length)][
        Math.floor(Math.random() * graph[0].length)
      ];
    const neighbors = getNeighbors(graph, nodeOfInterest);
    var foundEdge = false;
    neighbors.map((node) => {
      if (!foundEdge && !edgeExist([node, nodeOfInterest], edgeList)) {
        foundEdge = true;
        edgeList.push([node, nodeOfInterest]);
      }
    });
    if (foundEdge) {
      edgesToCut--;
    }
  }
  return edgeList;
}

function edgeExist(edgeOfInterest, edgeList) {
  const [u, v] = edgeOfInterest;
  return edgeList.includes([u, v]) || edgeList.includes([v, u]);
}
