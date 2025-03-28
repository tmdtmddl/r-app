import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./app/Home";
import Layout from "./layouts/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Layout}>
          <Route index Component={Home} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
