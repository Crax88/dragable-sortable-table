import React from "react";
import { Draggable } from "react-beautiful-dnd";
import ColumnHeader from "../ColumnHeader/ColumnHeader";
import ColumnItem from "../ColumnItem/ColumnItem";

import { connect } from "react-redux";
import { sortBooks } from "../../store/actions";

import "./DraggableColumn.css";

const DraggableColumn = ({
  items,
  title,
  index,
  dragId,
  field,
  sortBooks,
  prop,
  ascending
}) => {
  return (
    <Draggable index={index} draggableId={dragId}>
      {(provided, snapshot) => {
        const className = snapshot.isDragging
          ? "booklist-column draggin"
          : "booklist-column";
        return (
          <div
            className={className}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <ColumnHeader
              title={title}
              dragHandleProps={[provided.dragHandleProps]}
              field={field}
            />
            {items.map((item, idx) => (
              <ColumnItem key={idx} item={item} />
            ))}
          </div>
        );
      }}
    </Draggable>
  );
};
const mapStateToProps = ({ bookList: { field, ascending } }) => {
  return {
    prop: field,
    ascending
  };
};
export default connect(mapStateToProps, { sortBooks })(DraggableColumn);
