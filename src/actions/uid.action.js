import axios from "axios";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

export const GET_UID = "GET_UID";

export const getUid = () => {
  return async (dispatch) => {
    return await axios({
      method: "get",
      url: process.env.REACT_APP_API_URL + "jwtid",
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: GET_UID, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
