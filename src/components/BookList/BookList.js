import React, { Component } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import DraggableColumn from "../DraggableColumn/DraggableColumn";

import { connect } from "react-redux";

class BookList extends Component {
  handleDragEnd = result => {
    console.log(result);
  };
  render() {
    const { columnOrder, columns, books } = this.props;
    return (
      <DragDropContext onDragEnd={this.handleDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided, snapshot) => {
            const className = snapshot.isDraggingOver
              ? "booklist-wrapper draggin-over"
              : "booklist-wrapper";
            return (
              <div
                className={className}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {columnOrder.map((columnId, idx) => {
                  const column = columns[columnId];
                  const columnData = books.map(book => book[column.accessor]);
                  return (
                    <DraggableColumn
                      key={column.id}
                      items={columnData}
                      title={column.title}
                      index={idx}
                      dragId={columnId}
                    />
                  );
                })}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
    );
  }
}

const mapStateToProps = ({ bookColumns: { columns, columnOrder } }) => {
  return {
    columns,
    columnOrder
  };
};

export default connect(mapStateToProps)(BookList);
