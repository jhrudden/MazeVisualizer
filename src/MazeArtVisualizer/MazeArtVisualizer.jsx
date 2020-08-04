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

  render() {
    const { grid } = this.state;

    return (
      <div id="grid" onClick={this.handleClick}>
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
                    handleClick={(col, row) => this.handleClick(col, row)}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }

  handleClick(col, row) {
    // const grid = this.state.grid;
    // const newGrid = grid.slice();
    // const node = newGrid[row][col];
    // const newNode = {
    //   ...node,
    //   isStart: !node.isStart,
    // };
    // newGrid[row][col] = newNode;
    // this.setState({ nodes: newGrid });
    console.log(col, row);
  }
}

const setupNode = (row, col) => {
  const node = {
    col,
    row,
    isStart: row === 5 && col === 1,
    isEnd: row === 5 && col === 13,
  };
  console.log(node);
  return node;
};
