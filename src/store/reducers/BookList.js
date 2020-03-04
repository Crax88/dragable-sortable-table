import {
  FETCH_BOOKS_REQUEST,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE,
  SORT_BOOKS
} from "../actionTypes";

const sortBooksItems = (books, ascending, field) => {
  if (!books.length) return [];
  return [...books].sort((a, b) => {
    if (typeof [a[field]] === "number") {
      return ascending ? a[field] - b[field] : b[field] - a[field];
    }
    if (ascending) {
      return a[field] > b[field] ? 1 : -1;
    }
    return b[field] > a[field] ? 1 : -1;
  });
};

export const updateBookList = (state, action) => {
  if (state === undefined) {
    return {
      books: [],
      total: 0,
      ascending: true,
      field: "id",
      curPage: 1,
      pageSize: 20,
      isLoading: false,
      error: false
    };
  }
  switch (action.type) {
    case FETCH_BOOKS_REQUEST:
      return {
        ...state.bookList,
        isLoading: true
      };
    case FETCH_BOOKS_SUCCESS:
      const books = [...state.bookList.books, ...action.payload];
      const {
        bookList: { ascending, field }
      } = state;
      return {
        books: sortBooksItems(books, ascending, field),
        total: state.bookList.total + action.payload.length,
        ascending,
        field,
        curPage: state.bookList.curPage + 1,
        pageSize: 20,
        isLoading: false,
        error: false
      };
    case FETCH_BOOKS_FAILURE:
      return {
        ...state.bookList,
        isLoading: false,
        error: action.payload
      };
    case SORT_BOOKS: {
      const {
        bookList: { books, ascending }
      } = state;
      return {
        ...state.bookList,
        books: sortBooksItems(books, ascending, action.payload),
        ascending: !ascending,
        field: action.payload
      };
    }
    default:
      return state.bookList;
  }
};
