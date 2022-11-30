import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { json } from "react-router-dom";

const initialState = {};

const composeFunc =
  process.env.NODE_ENV === "development" ? composeWithDevTools : compose;

const composeEnhancers = composeFunc(applyMiddleware(thunk));

const store = createStore(
  rootReducer(),
  localStorage["todo"] ? JSON.parse(localStorage["todo"]) : initialState,
  composeEnhancers
);

store.subscribe(() => {
  localStorage["todo"] = JSON.stringify(store.getState());
});

export default store;
