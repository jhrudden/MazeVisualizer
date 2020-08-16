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
      isPathColored: false,
      processing: false,
      mazeBuilt: false,
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
    if (!this.state.processing && !this.state.mazeBuilt) {
      this.setState({ processing: true });
      const { grid } = this.state;
      const loadOrder = prims(grid);
      this.visualizePrims(loadOrder);
    }
  }

  async visualizePrims(loadOrder) {
    const { grid, isPathColored } = this.state;

    // TODO: make gradient get possibly a slider or maybe better longer set of colors
    const gradient = [
      "#83FBFA",
      "#8EEFEE",
      "#9AE4E3",
      "#A5D8D7",
      "#B1CDCC",
      "#C8B6B5",
      "#D3AAAA",
      "#DF9F9E",
      "#EA9393",
      "#F68888",
      "#EA9393",
      "#DF9F9E",
      "#D3AAAA",
      "#C8B6B5",
      "#B1CDCC",
      "#A5D8D7",
      "#9AE4E3",
      "#8EEFEE",
    ];

    for (var i = 0; i < loadOrder.length; i++) {
      const currConnection = loadOrder[i];
      const node1 = currConnection[0];
      const node2 = currConnection[1];
      const gradIndex = i % gradient.length;
      connect(node1, node2);
      await waitFor(20);
      node1.showWalls = true;
      node2.showWalls = true;
      if (isPathColored) {
        node2.setColor = gradient[gradIndex];
      }
      this.setState({ grid });
    }
    this.setState({ processing: false, mazeBuilt: true });
  }

  resetGrid() {
    const resetGrid = constructGrid();
    this.setState({ grid: resetGrid, mazeBuilt: false });
  }

  toggleColoredPath() {
    const { isPathColored } = this.state;
    this.setState({ isPathColored: !isPathColored });
  }

  disableWalls() {
    if (this.state.mazeBuilt) {
      const { grid } = this.state;
      for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[0].length; j++) {
          const currItem = grid[i][j];
          currItem.showWalls = !currItem.showWalls;
        }
      }
      this.setState({ grid });
    }
  }

  render() {
    const { grid, mazeBuilt, processing } = this.state;

    return (
      <>
        <TopBar
          prims={() => this.prims()}
          resetGrid={() => this.resetGrid()}
          toggleColoredPath={() => this.toggleColoredPath()}
          disableWalls={() => this.disableWalls()}
          mazeBuilt={mazeBuilt}
          processing={processing}
        />

        <div id="grid">
          {grid.map((row, rowIndx) => {
            return (
              <div key={rowIndx}>
                {row.map((node, nodeIndx) => {
                  const {
                    row,
                    col,
                    isStart,
                    isEnd,
                    showWalls,
                    neighbors,
                    setColor,
                  } = node;
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
                      showWalls={showWalls}
                      neighbors={neighbors}
                      setColor={setColor}
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
    showWalls: false,
    setColor: null,
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

const waitFor = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
