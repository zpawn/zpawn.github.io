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

import { ThemeProvider } from "styled-components";
import { Scrollbar, lightTheme } from "@deskpro/deskpro-ui";
import "flatpickr/dist/themes/light.css";
import "modern-normalize/modern-normalize.css";
import "tippy.js/dist/tippy.css";
import "tippy.js/dist/border.css";
import "simplebar/dist/simplebar.min.css";
import "@deskpro/deskpro-ui/dist/deskpro-ui.css";
import "@deskpro/deskpro-ui/dist/deskpro-custom-icons.css";
import "simplebar/dist/simplebar.min.css";

TimeAgo.addDefaultLocale(en);

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={lightTheme}>
          <Suspense fallback={"Loading..."}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <App />
            </ErrorBoundary>
          </Suspense>
          </ThemeProvider>
      </QueryClientProvider>
    </HashRouter>
  </React.StrictMode>
);
