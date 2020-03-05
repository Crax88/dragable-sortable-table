import React, { Component } from "react";

import { connect } from "react-redux";
import { updateBookField } from "../../store/actions";

import "./ContextMenu.css";

class ContextMenu extends Component {
  state = {
    visible: false,
    bookId: null,
    bookField: null,
    x: null,
    y: null,
    copied: ""
  };
  target = null;
  componentDidMount() {
    document
      .querySelector(".booklist-wrapper")
      .addEventListener("contextmenu", e => {
        e.preventDefault();
        this.target = e.target;
        this.setState({
          visible: true,
          bookId: e.target.dataset.itemid,
          bookField: e.target.dataset.itemfield,
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
        this.setState({
          copied: this.target.innerText
        });
        break;
      case "paste":
        const { bookId, bookField, copied } = this.state;
        this.props.updateBookField(bookId, bookField, copied);
        this.setState({
          copied: null
        });
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
            {this.state.copied && (
              <button onClick={e => this.handleClick(e, "paste")}>Paste</button>
            )}
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

export default connect(null, { updateBookField })(ContextMenu);
