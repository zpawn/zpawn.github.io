import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { queryClient } from "./query";
import { App } from "./App";
import { ErrorFallback } from "./components";
import { Spinner } from "./components/common";

TimeAgo.addDefaultLocale(en);

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Spinner/>}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <App />
          </ErrorBoundary>
        </Suspense>
      </QueryClientProvider>
    </HashRouter>
  </React.StrictMode>
);
