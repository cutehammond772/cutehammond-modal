import * as React from "react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import {
  createDispatchHook,
  createSelectorHook,
  Provider,
  ReactReduxContextValue,
  TypedUseSelectorHook,
} from "react-redux";

import modalReducer from "./reducer";
import modalSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();
const context = React.createContext<ReactReduxContextValue>(null as any);

const store = configureStore({
  reducer: combineReducers({ modal: modalReducer }),
  devTools: process.env.NODE_ENV !== "production",
  middleware: [sagaMiddleware],
});

const beginSaga = () => {
  sagaMiddleware.run(modalSaga);
  return store;
};

const ModalProvider = (props: React.PropsWithChildren) => (
  <Provider context={context} store={beginSaga()}>
    {props.children}
  </Provider>
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = createDispatchHook(context);
export const useAppSelector: TypedUseSelectorHook<RootState> = createSelectorHook(context);

export default ModalProvider;
