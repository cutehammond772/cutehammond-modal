import { combineReducers } from "redux";
import modalReducer from "../lib/redux";

const rootReducer = combineReducers({
  modal: modalReducer,
});

type RootState = ReturnType<typeof rootReducer>;

export type { RootState };
export default rootReducer;
