import React, { Component } from "react";
import "./TopBar.css";
import Slider from "./Slider/Slider.jsx";
import dfsBuilder from "../../Algorithms/Building/Kruskel";

export default class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingWalls: false,
      colorizePath: false,
    };
  }

  render() {
    const {
      prims,
      resetGrid,
      toggleColoredPath,
      disableWalls,
      processing,
      mazeBuilt,
      updateMazeSize,
      dfs,
      bfs,
      kruskel,
    } = this.props;
    const { showingWalls, colorizePath } = this.state;
    return (
      <div className="navbar">
        <div className="buttons">
          <button className="navbar-contents" onClick={() => resetGrid()}>
            Reset Grid
          </button>
          <div className=" drop-down ">
            <button className="drop-down-btn">Search Maze</button>
            <div className="drop-down-content">
              <a href="#" onClick={() => dfs()}>
                Depth First Search
              </a>
              <a href="#" onClick={() => bfs()}>
                Breadth First Search
              </a>
            </div>
          </div>
          <div className=" drop-down ">
            <button className="drop-down-btn">Build Maze</button>
            <div className="drop-down-content">
              <a href="#" onClick={() => prims()}>
                Prim's
              </a>
              <a href="#" onClick={() => kruskel()}>
                Kruskel's
              </a>
            </div>
          </div>
          <button
            className="navbar-contents"
            onClick={() => {
              if (!processing) {
                this.setState({ colorizePath: !colorizePath });
                toggleColoredPath();
              }
            }}
          >
            Colorized Paths: {!colorizePath ? "Off" : "On"}
          </button>
          <button
            className="navbar-contents"
            onClick={() => {
              if (mazeBuilt) {
                this.setState({ showingWalls: !showingWalls });
                disableWalls();
              }
            }}
          >
            Walls: {!showingWalls ? "Off" : "On"}
          </button>
          <div className="navbar-slider">
            Scale:{" "}
            <Slider
              updateMazeSize={(growthScalar) => updateMazeSize(growthScalar)}
              mazeBuilt={mazeBuilt}
              processing={processing}
            />
          </div>
        </div>
      </div>
    );
  }
}
