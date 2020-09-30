import kruskel from "./Kruskel.jsx";
import generateNonPerfect from "./NonPerfect";

export default function nonPerfectKruskel(graph) {
  const edgeList = kruskel(graph);
  return generateNonPerfect(
    graph,
    edgeList,
    Math.floor(graph.length * graph[0].length * 0.1)
  );
}
