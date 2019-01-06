import React, { Suspense } from "react";

import Layout from "./components/Layout";

////

// ToDo: create fallback component
const app = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Layout />
  </Suspense>
);

export default app;
