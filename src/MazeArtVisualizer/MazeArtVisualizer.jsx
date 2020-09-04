import React, { Component } from "react";

import Node from "./Node/Node.jsx";
import "./MazeArtVisualizer.css";
import { prims } from "../Algorithms/prims.jsx";
import TopBar from "./TopBar/TopBar.jsx";
import { connect } from "../Algorithms/Utils";
import { depthFirstSearch } from "../Algorithms/DFS.jsx";
import { breadthFirstSearch } from "../Algorithms/BFS.jsx";

const BASE_COL_COUNT = 15;
const BASE_ROW_COUNT = 10;
const MAX_COL_COUNT = 45;
const MAX_ROW_COUNT = 30;
const GROWTH_INCREMENT = [1, 3];

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
      colCount: BASE_COL_COUNT,
      rowCount: BASE_ROW_COUNT,
      startCoord: null,
      endCoord: null,
    };
  }
  componentDidMount() {
    const { colCount, rowCount } = this.state;
    const startCoord = [Math.floor(rowCount / 2) - ((rowCount - 1) % 2), 1];
    const endCoord = [
      Math.floor(rowCount / 2) - ((rowCount - 1) % 2),
      colCount - 2,
    ];
    const grid = constructGrid(colCount, rowCount, startCoord, endCoord);
    const hasStart = true;
    const hasEnd = true;
    this.setState({ grid, hasStart, hasEnd, startCoord, endCoord });
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
      this.setState({
        grid: newGrid,
        hasStart: !hasStart,
      });
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
      const newStart = [node.row, node.col];
      const newNode = {
        ...node,
        isStart: true,
      };
      newGrid[row][col] = newNode;
      this.setState({
        grid: newGrid,
        hasStart: !hasStart,
        startCoord: newStart,
      });
    } else if (!hasEnd && !isStart) {
      const newEnd = [node.row, node.col];
      const newNode = {
        ...node,
        isEnd: true,
      };
      newGrid[row][col] = newNode;
      this.setState({ grid: newGrid, hasEnd: !hasEnd, endCoord: newEnd });
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
      await waitFor(10);
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
    const { colCount, rowCount, startCoord, endCoord } = this.state;
    const resetGrid = constructGrid(colCount, rowCount, startCoord, endCoord);
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

  updateMazeSize(sliderVal) {
    const {
      mazeBuilt,
      processing,
      colCount,
      rowCount,
      startCoord,
      endCoord,
    } = this.state;
    if (!mazeBuilt && !processing) {
      this.setState(
        {
          colCount: BASE_COL_COUNT + sliderVal * GROWTH_INCREMENT[1],
          rowCount: BASE_ROW_COUNT + sliderVal * GROWTH_INCREMENT[0],
        },
        () => {
          var newGrid = constructGrid(
            this.state.colCount,
            this.state.rowCount,
            startCoord,
            endCoord
          );
          console.log(newGrid.length, newGrid[0].length);
          this.setState({ grid: newGrid });
        }
      );
    }
  }

  async dfs() {
    const { mazeBuilt } = this.state;
    if (mazeBuilt) {
      const { grid, startCoord, endCoord } = this.state;
      const searchAndPath = depthFirstSearch(grid, startCoord, endCoord);
      this.setState({ isPathColored: true });
      this.searchVisualizer(searchAndPath[0], searchAndPath[1]);
    }
  }
  async bfs() {
    const { mazeBuilt } = this.state;
    if (mazeBuilt) {
      const { grid, startCoord, endCoord } = this.state;
      const searchAndPath = breadthFirstSearch(grid, startCoord, endCoord);
      this.setState({ isPathColored: true });
      this.searchVisualizer(searchAndPath[0], searchAndPath[1]);
    }
  }

  async searchVisualizer(searchArea, path) {
    const { grid } = this.state;
    for (var i = 0; i < searchArea.length; i++) {
      await waitFor(10);
      searchArea[i].setColor = "#9bdbd7";
      this.setState({ grid });
    }
    await waitFor(10);
    this.pathVisualizer(path);
  }

  async pathVisualizer(path) {
    const { grid } = this.state;
    for (var i = 0; i < path.length; i++) {
      await waitFor(10);
      path[i].setColor = "brown";
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
          updateMazeSize={(growthScalar) => this.updateMazeSize(growthScalar)}
          dfs={() => this.dfs()}
          bfs={() => this.bfs()}
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

const setupNode = (row, col, startCoord, endCoord) => {
  const node = {
    row,
    col,
    isStart: row === startCoord[0] && col === startCoord[1],
    isEnd: row === endCoord[0] && col === endCoord[1],
    neighbors: [null, null, null, null],
    showWalls: false,
    setColor: null,
  };
  return node;
};

const constructGrid = (colNum, rowNum, startCoord, endCoord) => {
  const grid = [];
  // always want start and end to init on opposite sides of middle row
  for (let row = 0; row < rowNum; row++) {
    const currRow = [];
    for (let col = 0; col < colNum; col++) {
      currRow.push(setupNode(row, col, startCoord, endCoord));
    }
    grid.push(currRow);
  }
  return grid;
};

const waitFor = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
