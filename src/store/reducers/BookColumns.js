import { UPDATE_COLUMN_ORDER, HIDE_BOOKLIST_COLUMN } from "../actionTypes";

const updateColumnOrder = (state, reorderData) => {
  const {
    bookColumns: { columnOrder }
  } = state;
  const { id, index } = reorderData;
  const columnIdx = columnOrder.findIndex(el => el === id);
  const newOrder = [...columnOrder];
  newOrder.splice(columnIdx, 1);
  newOrder.splice(index, 0, id);
  return {
    ...state.bookColumns,
    columnOrder: newOrder
  };
};

const hideColumn = (state, columnId) => {
  const column = state.bookColumns.columns[columnId];
  column.hided = true;
  return {
    ...state.bookColumns,
    columns: { ...state.bookColumns.columns, [columnId]: column }
  };
};

export const updateColumns = (state, action) => {
  if (state === undefined) {
    return {
      columns: {
        "column-1": {
          id: "column-1",
          title: "id",
          accessor: "id",
          hided: false
        },
        "column-2": {
          id: "column-2",
          title: "Author",
          accessor: "author",
          hided: false
        },
        "column-3": {
          id: "column-3",
          title: "Country",
          accessor: "country",
          hided: false
        },
        "column-4": {
          id: "column-4",
          title: "Image link",
          accessor: "imageLink",
          hided: false
        },
        "column-5": {
          id: "column-5",
          title: "Language",
          accessor: "language",
          hided: false
        },
        "column-6": {
          id: "column-6",
          title: "Wiki link",
          accessor: "link",
          hided: false
        },
        "column-7": {
          id: "column-7",
          title: "Pages",
          accessor: "pages",
          hided: false
        },
        "column-8": {
          id: "column-8",
          title: "Title",
          accessor: "title",
          hided: false
        },
        "column-9": {
          id: "column-9",
          title: "Year",
          accessor: "year",
          hided: false
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
  }
  switch (action.type) {
    case UPDATE_COLUMN_ORDER:
      return updateColumnOrder(state, action.payload);
    case HIDE_BOOKLIST_COLUMN:
      return hideColumn(state, action.payload);
    default:
      return state.bookColumns;
  }
};
