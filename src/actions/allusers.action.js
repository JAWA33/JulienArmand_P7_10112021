import axios from "axios";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

export const GET_ALL_USERS = "GET_ALL_USERS";
//for git

export const getAllUsers = () => {
  return async (dispatch) => {
    return await axios({
      method: "get",
      url: process.env.REACT_APP_API_URL + "api/user/all",
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: GET_ALL_USERS, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
