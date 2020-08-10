import React, { Component } from "react";
import "./TopBar.css";

export default class TopBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { prims, resetGrid } = this.props;
    return (
      <div className="navbar">
        <div className="m-build-dropdown">
          <button className="m-build-dropbtn">Build Maze &#x25BC;</button>
          <div className="m-build-content">
            <a href="#" onClick={() => prims()}>
              Prims
            </a>
          </div>
        </div>
        <button className="navBar-buttons" onClick={() => resetGrid()}>
          Reset Grid
        </button>
      </div>
    );
  }
}
