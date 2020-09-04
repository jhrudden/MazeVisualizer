import { search } from "./search.jsx";
import Queue from "./Queue.jsx";

export function breadthFirstSearch(graph, startCoord, EndCoord) {
  return search(graph, new Queue(), startCoord, EndCoord);
}
