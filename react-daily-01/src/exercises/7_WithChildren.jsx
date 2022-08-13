import React, { Component } from "react";

/**
 * Implement a function component that accepts children in props
 * and render them inside a div
 */
export default class WithChildren extends Component {
  constructor(props) {
    super(props);
    this.state = {
      child: "",
    };
  }
  render() {
    return <div>{this.state.child}</div>;
  }
}
