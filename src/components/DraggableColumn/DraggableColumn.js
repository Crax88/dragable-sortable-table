import React from "react";
import { Draggable } from "react-beautiful-dnd";
import ColumnItem from "../ColumnItem/ColumnItem";

const DraggableColumn = ({ items, title, index, dragId }) => {
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
            <h3 {...provided.dragHandleProps}>{title}</h3>
            {items.map((item, idx) => (
              <ColumnItem key={idx} item={item} />
            ))}
          </div>
        );
      }}
    </Draggable>
  );
};

export default DraggableColumn;
