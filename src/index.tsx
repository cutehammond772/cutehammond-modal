import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./App";
import { createModalMapper, GlobalModalProvider } from "./lib";

import GlobalStyles from "./demo/styles";

import { ProfileModal, PROFILE_MODAL } from "./demo/modal/profile";
import { INFO_MODAL, InfoModal } from "./demo/modal/info";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const mapper = createModalMapper(() => ({
  [PROFILE_MODAL]: ProfileModal,
  [INFO_MODAL]: InfoModal,
}));

root.render(
  <>
    <GlobalStyles />
    <GlobalModalProvider mapper={mapper}>
      <App />
    </GlobalModalProvider>
  </>
);
