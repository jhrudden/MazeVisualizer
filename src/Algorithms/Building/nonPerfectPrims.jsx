import prims from "./Prims.jsx";
import generateNonPerfect from "./NonPerfect";

export default function nonPerfectPrims(graph) {
  const edgeList = prims(graph);
  return generateNonPerfect(
    graph,
    edgeList,
    Math.floor(graph.length * graph[0].length * 0.1)
  );
}
