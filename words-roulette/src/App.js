import React, { Suspense } from "react";
import { Router } from "react-router-dom";
import ThemeProvider from "./hoc/ThemeProvider";

import history from "./history";
import Layout from "./components/Layout";

////

const app = () => (
  <Router history={history}>
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeProvider>
        <Layout />
      </ThemeProvider>
    </Suspense>
  </Router>
);

export default app;
