import React, { Suspense } from "react";

import Preload from "./hoc/Preload";
import Layout from "./components/Layout";

////

// ToDo: create fallback component
const app = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Preload />
    <Layout />
  </Suspense>
);

export default app;
