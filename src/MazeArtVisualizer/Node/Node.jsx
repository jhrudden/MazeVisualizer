import React, { Component } from "react";
import "./Node.css";
import startPointImage from "../../Images/startPoint.png";
import endPointImage from "../../Images/endPoint.png";

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
      showWalls,
      setColor,
    } = this.props;

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${showWalls ? this.drawWalls() : ""}`}
        style={setColor != null ? { backgroundColor: setColor } : {}}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseUp={() => onMouseUp(row, col)}
      >
        <img
          src={startPointImage}
          style={
            isStart
              ? {
                  display: "block",
                  width: "30px",
                  height: "30px",
                  opacity: "0.9",
                }
              : { display: "none" }
          }
          alt="start point icon"
        ></img>
        <img
          src={endPointImage}
          style={
            isEnd
              ? {
                  display: "block",
                  width: "30px",
                  height: "30px",
                  opacity: "0.9",
                }
              : { display: "none" }
          }
          alt="end point icon"
        ></img>
      </div>
    );
  }
}
