import React, { Component } from "react";

import Node from "./Node/Node.jsx";
import "./MazeArtVisualizer.css";
import prims from "../Algorithms/Building/Prims.jsx";
import TopBar from "./TopBar/TopBar.jsx";
import { connect } from "../Algorithms/Utils";
import depthFirstSearch from "../Algorithms/Searching/DFS.jsx";
import breadthFirstSearch from "../Algorithms/Searching/BFS.jsx";
import kruskel from "../Algorithms/Building/Kruskel.jsx";
import nonPerfectPrims from "../Algorithms/Building/nonPerfectPrims.jsx";

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
      processing: false,
      mazeBuilt: false,
      colCount: BASE_COL_COUNT,
      rowCount: BASE_ROW_COUNT,
      startCoord: null,
      endCoord: null,
      hasPath: false,
      pathProcessessing: false,
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
    const { grid, hasStart, hasEnd, processing, mazeBuilt } = this.state;
    if (mazeBuilt || processing) {
      return;
    }
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
      this.visualizeBuild(loadOrder);
    }
  }

  kruskel() {
    if (!this.state.processing && !this.state.mazeBuilt) {
      this.setState({ processing: true });
      const { grid } = this.state;
      const loadOrder = kruskel(grid);
      this.visualizeBuild(loadOrder);
    }
  }

  nonPerfect() {
    if (!this.state.processing && !this.state.mazeBuilt) {
      this.setState({ processing: true });
      const { grid } = this.state;
      const loadOrder = nonPerfectPrims(grid);
      this.visualizeBuild(loadOrder);
    }
  }

  async visualizeBuild(loadOrder) {
    const { grid } = this.state;

    for (var i = 0; i < loadOrder.length; i++) {
      const currConnection = loadOrder[i];
      const node1 = currConnection[0];
      const node2 = currConnection[1];
      connect(node1, node2);
      await waitFor(10);
      node1.showWalls = true;
      node2.showWalls = true;
      this.setState({ grid });
    }
    this.setState({ processing: false, mazeBuilt: true });
  }

  resetGrid() {
    const { colCount, rowCount, startCoord, endCoord, hasPath } = this.state;
    const resetGrid = constructGrid(colCount, rowCount, startCoord, endCoord);
    this.setState({ grid: resetGrid, mazeBuilt: false, hasPath: false });
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
    const { mazeBuilt, processing } = this.state;
    if (!mazeBuilt && !processing) {
      this.setState(
        {
          colCount: BASE_COL_COUNT + sliderVal * GROWTH_INCREMENT[1],
          rowCount: BASE_ROW_COUNT + sliderVal * GROWTH_INCREMENT[0],
        },
        () => {
          // check start and end nodes are not outside the scaled window
          const { startCoord, endCoord, rowCount, colCount } = this.state;

          var newGrid = constructGrid(
            this.state.colCount,
            this.state.rowCount,
            updateIfOutOfBounds(startCoord, rowCount, colCount),
            updateIfOutOfBounds(endCoord, rowCount, colCount)
          );

          this.setState({
            grid: newGrid,
            endCoord: endCoord,
            startCoord: startCoord,
          });
        }
      );
    }
  }

  async dfs() {
    const { mazeBuilt, hasPath, pathProcessessing } = this.state;
    if (mazeBuilt && !hasPath && !pathProcessessing) {
      const { grid, startCoord, endCoord } = this.state;
      this.setState({ pathProcessessing: true });
      const searchAndPath = depthFirstSearch(grid, startCoord, endCoord);
      this.searchVisualizer(searchAndPath[0], searchAndPath[1]);
    }
  }
  async bfs() {
    const { mazeBuilt, hasPath, pathProcessessing } = this.state;
    if (mazeBuilt && !hasPath && !pathProcessessing) {
      const { grid, startCoord, endCoord } = this.state;
      this.setState({ pathProcessessing: true });
      const searchAndPath = breadthFirstSearch(grid, startCoord, endCoord);
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
    await waitFor(5);
    this.pathVisualizer(path);
    this.setState({ hasPath: true });
  }

  async pathVisualizer(path) {
    const { grid, pathProcessessing } = this.state;

    for (var i = 0; i < path.length; i++) {
      await waitFor(10);
      path[i].setColor = "#a6e0c0";
      this.setState({ grid });
    }
    this.setState({ pathProcessessing: false });
  }

  resetPath() {
    const { grid, pathProcessessing, mazeBuilt, hasPath } = this.state;
    if (!pathProcessessing && mazeBuilt) {
      const newGrid = grid.slice();
      for (var i = 0; i < newGrid.length; i++) {
        for (var j = 0; j < newGrid[i].length; j++) {
          newGrid[i][j].setColor = "white";
        }
      }
      this.setState({ grid: newGrid, hasPath: false });
    }
  }

  render() {
    const { grid, mazeBuilt, processing } = this.state;

    return (
      <>
        <TopBar
          prims={() => this.prims()}
          resetGrid={() => this.resetGrid()}
          disableWalls={() => this.disableWalls()}
          mazeBuilt={mazeBuilt}
          processing={processing}
          updateMazeSize={(growthScalar) => this.updateMazeSize(growthScalar)}
          dfs={() => this.dfs()}
          bfs={() => this.bfs()}
          kruskel={() => this.kruskel()}
          nonPerfect={() => this.nonPerfect()}
          resetPath={() => this.resetPath()}
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

const updateIfOutOfBounds = (coord, rowBound, colBound) => {
  console.log("start", coord, rowBound, colBound);
  if (coord[0] >= rowBound) {
    coord[0] = rowBound - 1;
  }
  if (coord[1] >= colBound) {
    coord[1] = colBound - 1;
  }
  console.log("end", coord);
  return coord;
};
