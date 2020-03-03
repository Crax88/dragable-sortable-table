import React, { Component } from "react";
import Preloader from "../Preloader/Preloader";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";

const withData = View => {
  return class extends Component {
    state = {
      data: null,
      isLoading: false,
      error: false,
      page: 1,
      pageSize: 20,
      morePages: true
    };

    componentDidMount() {
      this.update();
    }

    update() {
      console.log(this.state);
      if (!this.state.morePages) return;
      this.setState({
        isLoading: true
      });
      this.props
        .getData(this.state.page, this.state.pageSize)
        .then(data => {
          this.setState({
            data,
            isLoading: false,
            page: this.state.page + 1,
            morePages: data.length > 0 ? true : false
          });
        })
        .catch(() => {
          this.setState({
            isLoading: false,
            error: true
          });
        });
    }

    render() {
      const { data, isLoading, error } = this.state;
      const preloader = isLoading ? <Preloader /> : null;
      const errorIndicator = error ? <ErrorIndicator /> : null;
      return (
        <>
          <View {...this.props} data={data} onLoad={this.update} />
          {preloader}
          {errorIndicator}
        </>
      );
    }
  };
};

export default withData;
