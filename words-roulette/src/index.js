import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";

import ThemeProvider from "./hoc/ThemeProvider";
import App from "./App";
import "./index.css";
import { store } from "./store";
import history from "./history";

////

const app = (
  <Provider store={store}>
    <Router history={history}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
