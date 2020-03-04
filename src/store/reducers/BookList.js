import {
  FETCH_BOOKS_REQUEST,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE
} from "../actionTypes";

export const updateBookList = (state, action) => {
  if (state === undefined) {
    return {
      books: [],
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
      return {
        books: [...state.bookList.books, ...action.payload],
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
    default:
      return state.bookList;
  }
};
