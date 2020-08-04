import React, { Component } from "react";
import "./Node.css";

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.status = {};
  }

  render() {
    const { isStart, isEnd } = this.props;
    // console.log(isStart);
    return (
      <div
        className={`node ${isStart ? "startNode" : isEnd ? "finishNode" : ""}`}
      ></div>
    );
  }
}
