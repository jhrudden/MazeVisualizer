import React, { Component } from "react";
import "./Node.css";

export default class Node extends Component {
  drawWalls() {
    const { neighbors } = this.props;
    let str = "";
    if (neighbors[0] == null) {
      str += " topWall";
    }
    if (neighbors[1] == null) {
      str += " bottomWall";
    }
    if (neighbors[2] == null) {
      str += " leftWall";
    }
    if (neighbors[3] == null) {
      str += " rightWall";
    }
    return str;
  }

  render() {
    const {
      row,
      col,
      isStart,
      isEnd,
      onMouseDown,
      onMouseUp,
      inMaze,
      setColor,
    } = this.props;

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${isStart ? "startNode" : isEnd ? "finishNode" : ""} ${
          inMaze ? this.drawWalls() : ""
        }`}
        style={
          setColor != null
            ? { backgroundColor: setColor, outline: `1px solid ${setColor}` }
            : {}
        }
        onMouseDown={() => onMouseDown(row, col)}
        onMouseUp={() => onMouseUp(row, col)}
      ></div>
    );
  }
}
