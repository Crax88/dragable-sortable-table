import React, { Component } from "react";
import ErrorIndicator from "../ErrorBoundary/ErrorBoundary";
import Preloader from "../Preloader/Preloader";
import { WithDataService } from "../hocs/";
import BookList from "../BookList/BookList";
import ShowColumnWidget from "../ShowColumnWidget/ShowColumnWidget";
import ContextMenu from "../ContextMenu/ContextMenu";

import { connect } from "react-redux";
import { fetchBooks } from "../../store/actions";

class BooksListContainer extends Component {
  observerTarget = null;
  observerCallback = entries => {
    entries.forEach(entrie => {
      if (entrie.isIntersecting) {
        this.props.fetchBooks();
      }
    });
  };
  obsever = new IntersectionObserver(this.observerCallback, {
    root: document.querySelector(".booklist-wrapper"),
    rootMargin: "100px"
  });
  componentDidMount() {
    this.props.fetchBooks();
  }
  componentDidUpdate() {
    if (this.props.books.length) {
      this.obsever.observe(this.observerTarget);
    }
    return true;
  }
  setObserverTarget = ref => {
    this.observerTarget = ref;
  };

  render() {
    const { isLoading, error, books } = this.props;
    const preloader = isLoading ? <Preloader /> : null;
    const errorIndicator = error ? <ErrorIndicator /> : null;
    return (
      <>
        {books.length && (
          <>
            <BookList
              setObserverTarget={this.setObserverTarget}
              books={books}
            />
            <ContextMenu />
            <ShowColumnWidget />
          </>
        )}
        {preloader}
        {errorIndicator}
      </>
    );
  }
}

const mapStateToProps = ({ bookList: { books, isLoading, error } }) => {
  return { books, isLoading, error };
};

const mapDispatchToProps = (dispatch, { dataService }) => {
  return {
    fetchBooks: () => dispatch(fetchBooks(dataService))
  };
};

export default WithDataService(
  connect(mapStateToProps, mapDispatchToProps)(BooksListContainer)
);
