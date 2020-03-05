import React from "react";
import { Draggable } from "react-beautiful-dnd";
import ColumnHeader from "../ColumnHeader/ColumnHeader";
import ColumnItem from "../ColumnItem/ColumnItem";

import "./DraggableColumn.css";

const DraggableColumn = ({ items, title, index, dragId, field }) => {
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
              columnId={dragId}
            />
            {items.map((item, idx) => (
              <ColumnItem key={idx} item={item} field={field} />
            ))}
          </div>
        );
      }}
    </Draggable>
  );
};

export default DraggableColumn;
