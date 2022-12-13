import { all, fork } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";
import modalSaga from "../lib/saga";

export const sagaMiddleware = createSagaMiddleware();

export default function* rootSaga() {
  yield all([fork(modalSaga)]);
}
