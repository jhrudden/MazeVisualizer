import { search } from "./Search.jsx";
import Stack from "../DataStructures/Stack.jsx";

export default function depthFirstSearch(graph, startCoord, EndCoord) {
  return search(graph, new Stack(), startCoord, EndCoord);
}
