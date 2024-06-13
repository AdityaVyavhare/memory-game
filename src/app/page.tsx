"use client";
import React from "react";
import Home from "./components/Home";
import { store } from "./store/store";
import { Provider } from "react-redux";
const page = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

export default page;
