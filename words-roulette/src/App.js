import React, { Suspense } from "react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./store";
import ThemeProvider from "./hoc/ThemeProvider";
import history from "./history";
import Layout from "./components/Layout";

////

const app = () => (
  <Provider store={store}>
    <Router history={history}>
      {/* ToDo: create fallback component */}
      <Suspense fallback={<div>Loading...</div>}>
        <ThemeProvider>
          <Layout />
        </ThemeProvider>
      </Suspense>
    </Router>
  </Provider>
);

export default app;
