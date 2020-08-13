import React, { Component } from "react";
import "./TopBar.css";

export default class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingWalls: false,
      colorizePath: false,
    };
  }

  render() {
    const { prims, resetGrid, toggleColoredPath, disableWalls } = this.props;
    const { showingWalls, colorizePath } = this.state;
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
            onClick={() => {
              this.setState({ colorizePath: !colorizePath });
              toggleColoredPath();
            }}
          >
            Colorized Paths: {!colorizePath ? "Off" : "On"}
          </button>
          <button
            className="navbar-contents"
            onClick={() => {
              this.setState({ showingWalls: !showingWalls });
              disableWalls();
            }}
          >
            Walls: {!showingWalls ? "Off" : "On"}
          </button>
        </div>
      </div>
    );
  }
}
