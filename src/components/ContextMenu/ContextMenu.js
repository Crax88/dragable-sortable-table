import React, { Component } from "react";

import "./ContextMenu.css";

class ContextMenu extends Component {
  state = {
    visible: false,
    x: null,
    y: null
  };
  target = null;
  componentDidMount() {
    document
      .querySelector(".scroll-root")
      .addEventListener("contextmenu", e => {
        e.preventDefault();
        this.target = e.target;
        this.setState({
          visible: true,
          x: e.clientX,
          y: e.clientY
        });
      });
    document.addEventListener("click", e => {
      if (e.target.classList.contains("contextBtn")) {
        return;
      }
      e.preventDefault();
      this.setState({
        visible: false
      });
    });
  }
  handleClick = (e, action) => {
    e.preventDefault();
    switch (action) {
      case "change":
        this.target.contentEditable = true;
        this.target.focus();
        break;
      case "delete":
        this.target.contentEditable = true;
        this.target.focus();
        this.target.innerText = "";
        this.target.blur();
        break;
      case "copy":
        navigator.clipboard.writeText(this.target.innerText);
        break;
      default:
    }
    this.setState({
      visible: false
    });
  };
  render() {
    const style = {
      position: "absolute",
      top: this.state.y,
      left: this.state.x
    };
    return (
      <div style={style} className="cMenu">
        {!this.state.visible ? null : (
          <>
            <button
              className="contextBtn"
              onClick={e => this.handleClick(e, "change")}
            >
              Change
            </button>
            <button
              className="contextBtn"
              onClick={e => this.handleClick(e, "copy")}
            >
              Copy to clipboard
            </button>
            <button
              className="contextBtn"
              onClick={e => this.handleClick(e, "delete")}
            >
              Delete
            </button>
          </>
        )}
      </div>
    );
  }
}

export default ContextMenu;
