import React from "react";

import { connect } from "react-redux";
import { toggleColumnVisibility } from "../../store/actions";

import "./ShowColumnWidget.css";

const ShowColumnWidget = ({ hidedColumns, toggleColumnVisibility }) => {
  if (!hidedColumns.length) return null;
  return (
    <div className="widget">
      <span>Show Columns</span>
      {hidedColumns.map(column => {
        return (
          <button
            onClick={() => toggleColumnVisibility(column.id)}
            key={column.id}
          >
            {column.title}
          </button>
        );
      })}
    </div>
  );
};

const mapStateToProps = ({ bookColumns: { columns } }) => {
  return {
    hidedColumns: Object.values(columns).filter(column => column.hided)
  };
};

export default connect(mapStateToProps, { toggleColumnVisibility })(
  ShowColumnWidget
);
