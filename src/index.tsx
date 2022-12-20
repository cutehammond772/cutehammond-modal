import React from "react";
import ReactDOM from "react-dom/client";

import GlobalModalProvider from "./lib/dev/modal/provider";

import { App } from "./demo/App";
import GlobalStyles from "./demo/styles";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <>
    <GlobalStyles />
    <GlobalModalProvider>
      <App />
    </GlobalModalProvider>
  </>
);
