import {
  FETCH_BOOKS_REQUEST,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE,
  UPDATE_COLUMN_ORDER,
  SORT_BOOKS,
  HIDE_BOOKLIST_COLUMN
} from "../actionTypes";

const booksRequested = () => {
  return {
    type: FETCH_BOOKS_REQUEST
  };
};

const booksLoaded = books => {
  return {
    type: FETCH_BOOKS_SUCCESS,
    payload: books
  };
};

const booksError = error => {
  return {
    type: FETCH_BOOKS_FAILURE,
    payload: error
  };
};

export const reorderColumns = (id, index) => dispatch => {
  dispatch({
    type: UPDATE_COLUMN_ORDER,
    payload: { id, index }
  });
};

export const hideColumn = columnId => dispatch => {
  dispatch({
    type: HIDE_BOOKLIST_COLUMN,
    payload: columnId
  });
};

export const sortBooks = filed => dispatch => {
  console.log("gfgfdgfd");
  dispatch({
    type: SORT_BOOKS,
    payload: filed
  });
};

export const fetchBooks = getBooks => (dispatch, getState) => {
  const page = getState().bookList.curPage;
  const size = getState().bookList.pageSize;
  dispatch(booksRequested());
  getBooks(page, size)
    .then(data => dispatch(booksLoaded(data)))
    .catch(err => dispatch(booksError(err)));
};
