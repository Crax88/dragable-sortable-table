import React from "react";
import "./Header.css";

const Header = ({ total }) => {
  return (
    <header>
      <h3>Drag'n'Drop Table</h3>
      <span>Books loaded: {total}</span>
    </header>
  );
};

export default Header;
