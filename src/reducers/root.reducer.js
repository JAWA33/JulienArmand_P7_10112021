import { combineReducers } from "redux";
import userReducer from "./user.reducer.js";
import postReducer from "./post.reducer.js";
import commentsReducer from "./comment.reducer.js";
import jobReducer from "./job.reducer.js";
import uidReducer from "./uid.reducer.js";
import allUsersReducer from "./allusers.reducer.js";
import userProfilReducer from "./userProfil.reducer.js";
// For Git
export default combineReducers({
  userReducer,
  postReducer,
  commentsReducer,
  jobReducer,
  uidReducer,
  allUsersReducer,
  userProfilReducer,
});
