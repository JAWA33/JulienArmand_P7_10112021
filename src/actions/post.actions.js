import axios from "axios";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const LIKE_POST = "LIKE_POST";
export const DISLIKE_POST = "DISLIKE_POST";

export const getAllPosts = () => {
  return async (dispatch) => {
    return await axios({
      method: "get",
      url: process.env.REACT_APP_API_URL + "api/post/all",
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: GET_ALL_POSTS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const likePost = (idpost) => {
  return async (dispatch) => {
    return await axios({
      method: "get",
      url: process.env.REACT_APP_API_URL + "api/post/like/" + idpost,
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.data);
        dispatch({ type: LIKE_POST, payload: idpost });
      })
      .catch((err) => console.log(err));
  };
};

export const dislikePost = (idpost) => {
  return async (dispatch) => {
    return await axios({
      method: "delete",
      url: process.env.REACT_APP_API_URL + "api/post/like/" + idpost,
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.data);
        dispatch({ type: DISLIKE_POST, payload: idpost });
      })
      .catch((err) => console.log(err));
  };
};
