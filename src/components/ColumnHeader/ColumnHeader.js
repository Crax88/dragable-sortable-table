import React from "react";

import { connect } from "react-redux";
import { sortBooks } from "../../store/actions";
import "./ColumnHeader.css";

const ColumnHeader = ({ dragHandleProps, title, field, prop, sortBooks }) => {
  return (
    <h3
      className="column-header"
      {...dragHandleProps[0]}
      onClick={() => sortBooks(field)}
    >
      {title}
    </h3>
  );
};
const mapStateToProps = ({ bookList: { field } }) => {
  return {
    prop: field
  };
};

export default connect(mapStateToProps, { sortBooks })(ColumnHeader);
