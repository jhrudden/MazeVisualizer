import React, { Component } from "react";

import Node from "./Node/Node.jsx";
import "./MazeArtVisualizer.css";

export default class MazeArtVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      hasStart: false,
      hasEnd: false,
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
    const hasStart = true;
    const hasEnd = true;
    this.setState({ grid, hasStart, hasEnd });
  }

  onMouseDown(row, col) {
    const { grid, hasStart, hasEnd } = this.state;
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const { isStart, isEnd } = node;
    if (isStart) {
      const newNode = {
        ...node,
        isStart: false,
      };
      newGrid[row][col] = newNode;
      this.setState({ grid: newGrid, hasStart: !hasStart });
    } else if (isEnd) {
      const newNode = {
        ...node,
        isEnd: false,
      };
      newGrid[row][col] = newNode;
      this.setState({ grid: newGrid, hasEnd: !hasEnd });
    }
  }

  onMouseUp(row, col) {
    const { grid, hasStart, hasEnd } = this.state;
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const { isEnd, isStart } = node;
    if (!hasStart && !isEnd) {
      const newNode = {
        ...node,
        isStart: true,
      };
      newGrid[row][col] = newNode;
      this.setState({ grid: newGrid, hasStart: !hasStart });
    } else if (!hasEnd && !isStart) {
      const newNode = {
        ...node,
        isEnd: true,
      };
      newGrid[row][col] = newNode;
      this.setState({ grid: newGrid, hasEnd: !hasEnd });
    }
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
                    onMouseDown={(row, col) => {
                      this.onMouseDown(row, col);
                    }}
                    onMouseUp={(row, col) => {
                      this.onMouseUp(row, col);
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
