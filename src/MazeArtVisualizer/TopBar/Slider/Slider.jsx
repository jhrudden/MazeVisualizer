import React, { Component } from "react";

import "./Slider.css";

export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pastSliderValue: 0,
      value: 0,
    };
  }

  render() {
    const { value, pastSliderValue } = this.state;
    const { updateMazeSize, mazeBuilt, processing } = this.props;
    return (
      // TODO: fix bugs with slider cutting of more than it needs to by over running threshold
      // ?? since sliding slider very fast has the target value also skip values, then make value
      // ?? of slider directly affect maze size, instead of having changes in target have a constant affect
      <input
        type="range"
        className="slider"
        min={0}
        max={8}
        value={value}
        onChange={(e) => {
          console.log(e.target.value);
          if (!mazeBuilt && !processing) {
            if (pastSliderValue < e.target.value) {
              updateMazeSize(e.target.value);
              this.setState({ value: e.target.value });
            } else {
              updateMazeSize(e.target.value);
              this.setState({ value: e.target.value });
            }

            this.setState({ pastSliderValue: e.target.value });
          }
        }}
      ></input>
    );
  }
}
