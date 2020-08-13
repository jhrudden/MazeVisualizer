import React, { Component } from "react";
import "./TopBar.css";

export default class TopBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { prims, resetGrid, toggleColoredPath, disableWalls } = this.props;
    return (
      <div className="navbar">
        <div className="buttons">
          <button className="navbar-contents" onClick={() => resetGrid()}>
            Reset Grid
          </button>
          <div className=" drop-down ">
            <button className="drop-down-btn">Build Maze</button>
            <div className="drop-down-content">
              <a href="#" onClick={() => prims()}>
                prims
              </a>
            </div>
          </div>
          <button
            className="navbar-contents"
            onClick={() => toggleColoredPath()}
          >
            Colored Paths
          </button>
          <button className="navbar-contents" onClick={() => disableWalls()}>
            Show Walls
          </button>
        </div>
      </div>
    );
  }
}
