import { UPDATE_COLUMN_ORDER } from "../actionTypes";

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

export const updateColumns = (state, action) => {
  if (state === undefined) {
    return {
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
  }
  switch (action.type) {
    case UPDATE_COLUMN_ORDER:
      return updateColumnOrder(state, action.payload);
    default:
      return state.bookColumns;
  }
};
