import React, { Component } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import DraggableColumn from "../DraggableColumn/DraggableColumn";

import { connect } from "react-redux";
import { reorderColumns } from "../../store/actions";

import "./BookList.css";

class BookList extends Component {
  handleDragEnd = result => {
    const { destination, source, draggableId, type } = result;
    if (!destination) return;
    if (
      destination.droppable === source.droppable &&
      destination.index === source.index
    ) {
      return;
    }
    if (type === "column") {
      this.props.reorderColumns(draggableId, destination.index);
    }
  };

  render() {
    const { columnOrder, columns, books, setObserverTarget } = this.props;
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
                  const columnData = books.map(book => {
                    return { id: book.id, title: book[column.accessor] };
                  });
                  if (column.hided) return null;
                  return (
                    <DraggableColumn
                      key={column.id}
                      items={columnData}
                      title={column.title}
                      index={idx}
                      dragId={columnId}
                      field={column.accessor}
                    />
                  );
                })}
                {provided.placeholder}
                <div
                  className="observer-target"
                  ref={ref => setObserverTarget(ref)}
                ></div>
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

// const mapDispatchToProps = (dispatch) => {
//   return {
//     reorderColumn: (id, index) => dispatch(reorderColumns)
//   }
// }

export default connect(mapStateToProps, { reorderColumns })(BookList);
