import { combineReducers } from "redux";

import ordersReducer from "./ordersReducer";
import productsReducer from "./productsReducer";
import profileReducer from "./profileReducer";
import errorsReducer from "./errorsReducer";

export default combineReducers({
  ordersReducer: ordersReducer,
  productsReducer: productsReducer,
  profileReducer: profileReducer,
  errorsReducer: errorsReducer
});
