import axios from "axios";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const LIKE_POST = "LIKE_POST";
export const DISLIKE_POST = "DISLIKE_POST";
export const CREATE_POST = "CREATE_POST";

export const getAllPosts = (num) => {
  return async (dispatch) => {
    return await axios({
      method: "get",
      url: process.env.REACT_APP_API_URL + "api/post/all",
      withCredentials: true,
    })
      .then((res) => {
        const array = res.data.slice(0, num);
        dispatch({ type: GET_ALL_POSTS, payload: array });
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
        //console.log(res.data);
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
        //console.log(res.data);
        dispatch({ type: DISLIKE_POST, payload: idpost });
      })
      .catch((err) => console.log(err));
  };
};

export const createPost = (data) => {
  return async (dispatch) => {
    return await axios({
      method: "post",
      url: process.env.REACT_APP_API_URL + "api/post/create",
      data: data,
      withCredentials: true,
    })
      .then((res) => {
        console.log("res.data");
        console.log(res.data);
        console.log("data");
        console.log(data);

        const newPost = {
          id_post: res.data.data.id_post,
          post_create: Date.now(),
          post_text: res.data.data.post_text,
          post_url_image: res.data.data.post_url_image,
          post_id_user: data.userData.id_user,
          user_firstname: data.userData.user_firstname,
          user_lastname: data.userData.user_lastname,
          user_url_image: data.userData.user_url_image,
          job_name: data.userData.job_name,
          service_name: data.userData.service_name,
          nbr_likes: 0,
          nbr_comments: 0,
          i_like_post: "no",
          i_comment_post: "no",
        };

        dispatch({ type: CREATE_POST, payload: newPost });
      })
      .catch((err) => console.log(err));
  };
};
