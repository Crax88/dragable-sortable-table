import React, { Component } from "react";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";

class ErrorBoundary extends Component {
  state = {
    error: false
  };
  componentDidCatch() {
    this.setState({ error: true });
  }
  render() {
    return this.state.error ? <ErrorIndicator /> : this.props.children;
  }
}

export default ErrorBoundary;
