import axios from "axios";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

export const GET_USER = "GET_USER";

export const getUser = (uid) => {
  return async (dispatch) => {
    return await axios
      .get(process.env.REACT_APP_API_URL + "api/user/" + uid)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
