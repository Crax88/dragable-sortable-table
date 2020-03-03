import { updateColumns } from "./BookColumns";
import { updateBookList } from "./BookList";

const reducer = (state, action) => {
  return {
    bookList: updateBookList(state, action),
    bookColumns: updateColumns(state, action)
  };
};

export default reducer;
