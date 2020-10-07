// Root reducer file brings together all of our other reducers

import { combineReducers } from "redux";
import alertReducer from "./alertReducer";
// import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
  alert: alertReducer,
  auth: authReducer,
  // error: errorReducer,
});
