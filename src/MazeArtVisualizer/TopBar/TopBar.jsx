import React, { Component } from "react";
import "./TopBar.css";

export default class TopBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { prims, resetGrid } = this.props;
    return (
      <>
        <button onClick={() => prims()}>Build Maze</button>
        <button onClick={() => resetGrid()}>Reset Grid</button>
      </>
    );
  }
}
