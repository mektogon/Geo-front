import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "swiper/css";

import { store } from "./features/store";
import App from "./App";

import "react-toastify/dist/ReactToastify.css";
import "./assets/css/globals.scss";
import "reactjs-popup/dist/index.css";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <Router>
      <ToastContainer />
      <App />
    </Router>
  </Provider>
);
