import React from "react";
import { connect } from "react-redux";

import "./Header.css";

const Header = ({ total }) => {
  return (
    <header>
      <h3>Drag'n'Drop Table</h3>
      <span>Books loaded: {total}</span>
    </header>
  );
};
const mapStateToProps = ({ bookList: { total } }) => {
  return { total };
};
export default connect(mapStateToProps)(Header);
