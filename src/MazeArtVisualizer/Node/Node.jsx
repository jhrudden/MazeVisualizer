import React, { Component } from "react";
import "./Node.css";

export default class Node extends Component {
  render() {
    const { row, col, isStart, isEnd, onMouseDown, onMouseUp } = this.props;
    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${isStart ? "startNode" : isEnd ? "finishNode" : ""}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseUp={() => onMouseUp(row, col)}
      ></div>
    );
  }
}
