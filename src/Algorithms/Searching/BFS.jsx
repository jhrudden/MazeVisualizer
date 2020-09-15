import { search } from "./Search.jsx";
import Queue from "../DataStructures/Queue.jsx";

export default function breadthFirstSearch(graph, startCoord, EndCoord) {
  return search(graph, new Queue(), startCoord, EndCoord);
}
