import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "swiper/css";

import { store } from "./features/store";
import App from "./App";

import "react-h5-audio-player/lib/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/globals.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <Router>
      <ToastContainer />
      <App />
    </Router>
  </Provider>
);
