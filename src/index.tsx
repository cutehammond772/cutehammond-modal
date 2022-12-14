import React from "react";
import ReactDOM from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import { App } from "./App";
import { createModalMapper, GlobalModalProvider } from "./lib";

import rootReducer from "./demo/reducer";
import rootSaga, { sagaMiddleware } from "./demo/saga";
import GlobalStyles from "./demo/styles";

import { ProfileModal, PROFILE_MODAL } from "./demo/modal/profile";
import { INFO_MODAL, InfoModal } from "./demo/modal/info";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const createStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: [sagaMiddleware],
  });

  sagaMiddleware.run(rootSaga);
  return store;
};

const mapper = createModalMapper(() => ({
  [PROFILE_MODAL]: ProfileModal,
  [INFO_MODAL]: InfoModal,
}));

root.render(
  <Provider store={createStore()}>
    <GlobalStyles />
    <GlobalModalProvider mapper={mapper}>
      <App />
    </GlobalModalProvider>
  </Provider>
);
