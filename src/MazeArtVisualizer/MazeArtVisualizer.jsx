import React, { Component } from "react";

import Node from "./Node/Node.jsx";
import "./MazeArtVisualizer.css";

export default class MazeArtVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
    };
  }

  componentDidMount() {
    const grid = [];
    for (let row = 0; row < 11; row++) {
      const currRow = [];
      for (let col = 0; col < 15; col++) {
        currRow.push(setupNode(row, col));
      }
      grid.push(currRow);
    }
    this.setState({ grid });
  }

  onClick(row, col) {
    const { grid } = this.state;
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const updateNode = {
      ...node,
      isStart: !node.isStart,
    };
    newGrid[row][col] = updateNode;
    this.setState({ grid: newGrid });
    console.log("ree", row, col);
  }

  render() {
    const { grid } = this.state;

    return (
      <div id="grid">
        {grid.map((row, rowIndx) => {
          return (
            <div key={rowIndx}>
              {row.map((node, nodeIndx) => {
                const { row, col, isStart, isEnd } = node;
                return (
                  <Node
                    key={nodeIndx}
                    col={col}
                    row={row}
                    isStart={isStart}
                    isEnd={isEnd}
                    onClick={(row, col) => {
                      this.onClick(row, col);
                    }}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

const setupNode = (row, col) => {
  const node = {
    row,
    col,
    isStart: row === 5 && col === 1,
    isEnd: row === 5 && col === 13,
  };
  return node;
};
