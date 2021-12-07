import { combineReducers } from "redux";
import userReducer from "./user.reducer.js";
import postReducer from "./post.reducer.js";

export default combineReducers({
  userReducer,
  postReducer,
});
