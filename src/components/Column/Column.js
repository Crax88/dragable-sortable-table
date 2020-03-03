import React from "react";
import { Draggable } from "react-beautiful-dnd";

import "./Column.css";

const Column = props => {
  const { lable, items, index, id, accessor, onSort, onChange } = props;
  if (!items) return null;
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => {
        const className = snapshot.isDragging ? "column dragged" : "column";
        return (
          <div
            className={className}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <h3
              onClick={() => onSort(accessor)}
              className="column-header"
              {...provided.dragHandleProps}
            >
              {lable}
            </h3>
            {items.map((item, idx) => (
              <div
                onBlur={onChange}
                data-itemid={item.id}
                data-itemfield={accessor}
                key={item.id}
              >
                {item.item}
              </div>
            ))}
          </div>
        );
      }}
    </Draggable>
  );
};

export default Column;
