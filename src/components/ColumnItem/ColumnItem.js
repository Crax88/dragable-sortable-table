import React from "react";

import { connect } from "react-redux";
import { updateBookField } from "../../store/actions";

import "./ColumnItem.css";

const ColumnItem = ({ item, field, updateBookField }) => {
  return (
    <div
      onBlur={e => updateBookField(item.id, field, e.target.innerText)}
      data-itemid={item.id}
      data-itemfield={field}
      className="column-item"
    >
      {item.title}
    </div>
  );
};

export default connect(null, { updateBookField })(ColumnItem);
