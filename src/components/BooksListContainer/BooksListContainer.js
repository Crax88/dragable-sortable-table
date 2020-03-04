import React, { Component } from "react";
import ErrorIndicator from "../ErrorBoundary/ErrorBoundary";
import Preloader from "../Preloader/Preloader";
import { WithDataService } from "../hocs/";
import BookList from "../BookList/BookList";

import { connect } from "react-redux";
import { fetchBooks } from "../../store/actions";

class BooksListContainer extends Component {
  componentDidMount() {
    this.props.fetchBooks();
  }
  render() {
    const { isLoading, error, books } = this.props;
    const preloader = isLoading ? <Preloader /> : null;
    const errorIndicator = error ? <ErrorIndicator /> : null;
    return (
      <>
        {books.length && <BookList books={books} />}
        {preloader}
        {errorIndicator}
      </>
    );
  }
}

const mapServiceMethodsToProps = dataService => {
  return {
    loadBooks: dataService.getBooksByPage
  };
};

const mapStateToProps = ({ bookList: { books, isLoading, error } }) => {
  return { books, isLoading, error };
};

const mapDispatchToProps = (dispatch, { loadBooks }) => {
  return {
    fetchBooks: () => dispatch(fetchBooks(loadBooks))
  };
};

export default WithDataService(mapServiceMethodsToProps)(
  connect(mapStateToProps, mapDispatchToProps)(BooksListContainer)
);
