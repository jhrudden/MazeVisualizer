import React, { Component } from "react";
import "./Node.css";

export default class Node extends Component {
  render() {
    const { row, col, isStart, isEnd, onClick } = this.props;
    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${isStart ? "startNode" : isEnd ? "finishNode" : ""}`}
        onClick={() => onClick(row, col)}
      ></div>
    );
  }
}
