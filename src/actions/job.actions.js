import axios from "axios";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

export const GET_JOBS = "GET_JOBS";

export const getJobs = () => {
  return async (dispatch) => {
    return await axios({
      method: "get",
      url: process.env.REACT_APP_API_URL + "api/job/",
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: GET_JOBS, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
