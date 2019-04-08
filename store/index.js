import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const middlewares = [thunk];
const initialState = {};
const enhancer = composeWithDevTools({
  // Options: https://github.com/jhen0409/react-native-debugger#options
})(applyMiddleware(...middlewares));

const store = createStore(rootReducer, initialState, enhancer);

export default store;
