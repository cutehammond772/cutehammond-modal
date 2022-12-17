import { take } from "redux-saga/effects";

export const takeExact = function* <T>(action: string, filter: (action: T) => boolean) {
  while (true) {
    const takenAction: T = yield take(action);
    if (!filter(takenAction)) continue;

    return takenAction;
  }
};