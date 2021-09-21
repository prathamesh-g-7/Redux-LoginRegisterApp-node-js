import { createStore, combineReducers } from "redux";
import { applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import reducer from "../reducer/reducer";
const ThunkMiddleware = require("redux-thunk").default;

const logger = createLogger();

const rootReducer = combineReducers({
  reducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(ThunkMiddleware, logger)
);

export default store;
