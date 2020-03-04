import React from "react";
import Header from "../Header/Header";
import HomePage from "../pages/HomePage";

import "./App.css";

const App = () => {
  return (
    <>
      <Header total={20} />
      <main className="container">
        <HomePage />
      </main>
    </>
  );
};

export default App;
