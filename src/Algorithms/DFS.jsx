import { search } from "./search.jsx";
import Stack from "./Stack.jsx";

export function depthFirstSearch(graph, startCoord, EndCoord) {
  return search(graph, new Stack(), startCoord, EndCoord);
}
