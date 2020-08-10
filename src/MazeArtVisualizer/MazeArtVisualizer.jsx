import React, { Component } from "react";

import Node from "./Node/Node.jsx";
import "./MazeArtVisualizer.css";
import { prims, connect } from "../Algorithms/prims.jsx";
import TopBar from "./TopBar/TopBar.jsx";

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
    const grid = constructGrid();
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
    } else {
      return;
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
    } else {
      return;
    }
  }

  prims() {
    const { grid } = this.state;
    const loadOrder = prims(grid);
    this.visualizePrims(loadOrder);
  }

  visualizePrims(loadOrder) {
    const { grid } = this.state;
    for (var i = 0; i < loadOrder.length; i++) {
      const currConnection = loadOrder[i];
      const node1 = currConnection[0];
      const node2 = currConnection[1];
      if (node1 != node2) {
        connect(node1, node2);
        setTimeout(() => {
          node1.inMaze = true;
          node2.inMaze = true;

          this.setState({ grid });
        }, 50 * i);
      }
    }
    // console.log(this.state.grid);
  }

  resetGrid() {
    const resetGrid = constructGrid();
    this.setState({ grid: resetGrid });
  }

  render() {
    const { grid } = this.state;

    return (
      <>
        <TopBar prims={() => this.prims()} resetGrid={() => this.resetGrid()} />

        <div id="grid">
          {grid.map((row, rowIndx) => {
            return (
              <div key={rowIndx}>
                {row.map((node, nodeIndx) => {
                  const { row, col, isStart, isEnd, inMaze, neighbors } = node;
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
                      inMaze={inMaze}
                      neighbors={neighbors}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const setupNode = (row, col) => {
  const node = {
    row,
    col,
    isStart: row === 5 && col === 1,
    isEnd: row === 5 && col === 13,
    neighbors: [null, null, null, null],
    inMaze: false,
  };
  return node;
};

const constructGrid = () => {
  const grid = [];
  for (let row = 0; row < 10; row++) {
    const currRow = [];
    for (let col = 0; col < 15; col++) {
      currRow.push(setupNode(row, col));
    }
    grid.push(currRow);
  }
  return grid;
};
