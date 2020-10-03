import React, { Component } from "react";
import "./TopBar.css";
import Slider from "./Slider/Slider.jsx";
import dfsBuilder from "../../Algorithms/Building/Kruskel";

export default class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingWalls: false,
    };
  }

  render() {
    const {
      prims,
      resetGrid,
      disableWalls,
      processing,
      mazeBuilt,
      updateMazeSize,
      dfs,
      bfs,
      kruskel,
      nonPerfect,
      resetPath,
    } = this.props;
    const { showingWalls } = this.state;
    return (
      <div className="navbar">
        <div className="buttons">
          <div className=" drop-down ">
            <button className="drop-down-btn">Build Maze</button>
            <div className="drop-down-content">
              <a href="#" onClick={() => prims()}>
                Prim's
              </a>
              <a href="#" onClick={() => kruskel()}>
                Kruskel's
              </a>
              <a href="#" onClick={() => nonPerfect()}>
                Non-Perfect
              </a>
            </div>
          </div>
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
          <button className="navbar-contents" onClick={() => resetGrid()}>
            Reset Grid
          </button>
          <button className="navbar-contents" onClick={() => resetPath()}>
            Reset Path
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
