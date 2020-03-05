import React from "react";

import { connect } from "react-redux";
import { sortBooks, toggleColumnVisibility } from "../../store/actions";

import "./ColumnHeader.css";

const ColumnHeader = props => {
  const {
    dragHandleProps,
    title,
    field,
    prop,
    sortBooks,
    ascending,
    columnId,
    toggleColumnVisibility
  } = props;

  const indicator =
    prop !== field ? null : ascending ? (
      <span>&#8595;</span>
    ) : (
      <span>&#8593;</span>
    );

  return (
    <h3 className="column-header" {...dragHandleProps[0]}>
      <span className="column-header-title" onClick={() => sortBooks(field)}>
        {title}
      </span>
      {indicator}
      <span
        onClick={e => toggleColumnVisibility(columnId)}
        className="column-hide tool"
        data-tool="hide column"
      >
        &#x2612;
      </span>
    </h3>
  );
};

const mapStateToProps = ({ bookList: { field, ascending } }) => {
  return {
    prop: field,
    ascending
  };
};

export default connect(mapStateToProps, { sortBooks, toggleColumnVisibility })(
  ColumnHeader
);
