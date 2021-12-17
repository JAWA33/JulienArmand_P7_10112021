import { combineReducers } from "redux";
import userReducer from "./user.reducer.js";
import postReducer from "./post.reducer.js";
import commentsReducer from "./comment.reducer.js";
import jobReducer from "./job.reducer.js";
import uidReducer from "./uid.reducer.js";

export default combineReducers({
  userReducer,
  postReducer,
  commentsReducer,
  jobReducer,
  uidReducer,
});
