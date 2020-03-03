import React from "react";
import dataService from "../../services/dataService";
import { DataServiceProvider } from "../dataServiceContext/dataServiceContext";
import BooksPage from "../pages/BooksPage";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import "./App.css";

const App = () => {
  const service = new dataService();
  return (
    <ErrorBoundary>
      <DataServiceProvider value={service}>
        <BooksPage />
      </DataServiceProvider>
    </ErrorBoundary>
  );
};

export default App;
