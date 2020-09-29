import kruskel from "./Kruskel.jsx";

//! maybe randomly select a edge and add one of its borders to edge list
export default function nonPerfectKruskel(graph) {
  const edgeList = kruskel(graph);
  var edgesToCut = Math.floor(edgeList.length * 0.05);
  while (edgesToCut > 0) {
    edgeList.pop(Math.floor(Math.random() * edgeList.length));
    edgesToCut--;
  }
  return edgeList;
}
