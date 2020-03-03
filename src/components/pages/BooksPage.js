import React, { Component } from "react";
import { withDataService } from "../hocs/";
import Preloader from "../Preloader/Preloader";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";
import Column from "../Column/Column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ContextMenu from "../ContextMenu/ContextMenu";

import "./BooksPage.css";

class BooksPage extends Component {
  state = {
    data: null,
    isLoading: true,
    error: false,
    pageSize: 20,
    curPage: null,
    nextPage: true,
    sortOrderAsc: true,
    sortingProp: null,
    columns: {
      "column-1": {
        id: "column-1",
        title: "id",
        accessor: "id"
      },
      "column-2": {
        id: "column-2",
        title: "Author",
        accessor: "author"
      },
      "column-3": {
        id: "column-3",
        title: "Country",
        accessor: "country"
      },
      "column-4": {
        id: "column-4",
        title: "Image link",
        accessor: "imageLink"
      },
      "column-5": {
        id: "column-5",
        title: "Language",
        accessor: "language"
      },
      "column-6": {
        id: "column-6",
        title: "Wiki link",
        accessor: "link"
      },
      "column-7": {
        id: "column-7",
        title: "Pages",
        accessor: "pages"
      },
      "column-8": {
        id: "column-8",
        title: "Title",
        accessor: "title"
      },
      "column-9": {
        id: "column-9",
        title: "Year",
        accessor: "year"
      }
    },
    columnOrder: [
      "column-1",
      "column-2",
      "column-3",
      "column-4",
      "column-5",
      "column-6",
      "column-7",
      "column-8",
      "column-9"
    ]
  };
  callback = entries => {
    if (entries[0].isIntersecting) {
      this.update();
    }
  };
  scrollIndicator = React.createRef();
  observer = new IntersectionObserver(this.callback, {
    root: document.querySelector(this.refs.scrollRoot),
    rootMargin: "200px"
  });
  componentDidMount() {
    this.update();
  }
  componentDidUpdate() {
    if (this.state.data) {
      this.observer.observe(this.scrollIndicator.current);
    }
    if (!this.state.nextPage) {
      this.observer.unobserve(this.scrollIndicator.current);
    }
  }

  update = () => {
    const { curPage, pageSize, nextPage } = this.state;
    if (!nextPage) return;
    const page = curPage ? curPage + 1 : 1;
    this.setState({
      isLoading: true
    });
    this.props
      .getData(page, pageSize)
      .then(data => {
        this.setState({
          data: this.state.data ? [...this.state.data, ...data] : data,
          isLoading: false,
          curPage: page,
          nextPage: data.length ? true : false
        });
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          error: true
        });
      });
  };
  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;
    if (!destination) return;
    if (
      destination.droppable === source.droppable &&
      destination.index === source.index
    ) {
      return;
    }
    if (type === "column") {
      const order = [...this.state.columnOrder];
      order.splice(source.index, 1);
      order.splice(destination.index, 0, draggableId);
      this.setState({
        columnOrder: order
      });
    }
  };
  setSortProp = prop => {
    this.setState({
      sortingProp: prop,
      sortOrderAsc: !this.state.sortOrderAsc
    });
  };
  sort = data => {
    const { sortingProp, sortOrderAsc } = this.state;
    if (!sortingProp) return data;
    return data.sort((a, b) => {
      if (typeof a[sortingProp] == "number") {
        return sortOrderAsc
          ? a[sortingProp] - b[sortingProp]
          : b[sortingProp] - a[sortingProp];
      }
      if (sortOrderAsc) {
        return a[sortingProp] > b[sortingProp] ? -1 : 1;
      }
      return b[sortingProp] > a[sortingProp] ? -1 : 1;
    });
  };
  onContextMenu = (e, id, prop) => {
    e.preventDefault();
    console.log(e, id, prop);
  };
  onChange = e => {
    const itemId = e.target.dataset.itemid;
    const field = e.target.dataset.itemfield;
    const value = e.target.innerText;
    const idx = this.state.data.findIndex(el => el.id === parseInt(itemId));
    const item = { ...this.state.data[idx] };
    item[field] = value;
    const newData = [
      ...this.state.data.slice(0, idx),
      item,
      ...this.state.data.slice(idx + 1)
    ];
    e.target.contentEditable = false;
    this.setState({ data: newData });
  };
  render() {
    const { data, isLoading, error, columns, columnOrder } = this.state;
    const preloader = isLoading ? <Preloader /> : null;
    const errorIndicator = error ? <ErrorIndicator /> : null;
    const refIndicator = this.scrollIndicator;
    const sorted = data ? this.sort(data) : null;
    return (
      <div className="scroll-root" ref="scrollRoot">
        {data && (
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable
              droppableId="all-columns"
              direction="horizontal"
              type="column"
            >
              {(provided, snapshot) => {
                const className = snapshot.isDraggingOver
                  ? "table-wrapper dragged-over"
                  : "table-wrapper";

                return (
                  <div
                    className={className}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {columnOrder.map((columnId, idx) => {
                      const column = columns[columnId];
                      const columnItems =
                        data &&
                        sorted.map(item => ({
                          item: item[column.accessor],
                          id: item.id
                        }));
                      return (
                        <Column
                          onSort={this.setSortProp}
                          onChange={this.onChange}
                          key={columnId}
                          id={columnId}
                          index={idx}
                          lable={column.title}
                          accessor={column.accessor}
                          items={columnItems}
                          // onContextMenu={this.onContextMenu}
                        />
                      );
                    })}
                    <div
                      className={
                        snapshot.isDraggingOver
                          ? "indicator to-bottom"
                          : "indicator"
                      }
                      ref={refIndicator}
                    ></div>
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </DragDropContext>
        )}
        <ContextMenu />
        {preloader}
        {errorIndicator}
      </div>
    );
  }
}

const mapServiceMethodsToProps = dataService => {
  return {
    getData: dataService.getBooksByPage
  };
};

export default withDataService(mapServiceMethodsToProps)(BooksPage);
