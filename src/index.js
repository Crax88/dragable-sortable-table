import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./components/App/App";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import DataService from "./services/DataService";
import { DataServiceProvider } from "./components/dataServiceContext/dataServiceContext";

import store from "./store/store";

const dataService = new DataService();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <DataServiceProvider value={dataService}>
        <App />
      </DataServiceProvider>
    </ErrorBoundary>
  </Provider>,
  document.getElementById("root")
);
