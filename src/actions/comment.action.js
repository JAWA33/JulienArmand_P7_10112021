import axios from "axios";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

export const GET_COMMENTS = "GET_COMMENTS";
export const CREATE_COMMENT = "CREATE_COMMENT";
export const PLUS_COMMENT = "PLUS_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const LESS_COMMENT = "LESS_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";

export const getAllComments = () => {
  return async (dispatch) => {
    return await axios({
      method: "get",
      url: process.env.REACT_APP_API_URL + "api/post/all/comment",
      withCredentials: true,
    })
      .then((res) => {
        console.log("res");
        console.log(res);
        console.log("res.data");
        console.log(res.data);

        dispatch({ type: GET_COMMENTS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const createComment = (idpost, data) => {
  return async (dispatch) => {
    return await axios({
      method: "post",
      url: process.env.REACT_APP_API_URL + "api/post/create/comment/" + idpost,
      data: { comment_text: data.get("comment_text") },
      withCredentials: true,
    })
      .then((res) => {
        const sendComment = {
          comment_text: res.data.data.comment_text,
          id_comment: res.data.data.id_comment,
          comment_id_post: res.data.data.comment_id_post,
          comment_create: Date.now(),
          user_url_image: data.get("user_url_image"),
          comment_id_user: data.get("comment_id_user"),
        };
        const nbrComment = {
          nbr_comments: data.get("nbr_comments"),
          id_post: res.data.data.comment_id_post,
        };

        console.log("nbrComment");
        console.log(nbrComment);

        dispatch({ type: CREATE_COMMENT, payload: sendComment });
        dispatch({ type: PLUS_COMMENT, payload: nbrComment });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteComment = (idcomment, data) => {
  return async (dispatch) => {
    return await axios({
      method: "delete",
      url:
        process.env.REACT_APP_API_URL + "api/post/delete/comment/" + idcomment,
      withCredentials: true,
    })
      .then((res) => {
        const deleteData = {
          id_comment: res.data.data.id_comment,
        };
        console.log("data.deleteComment");
        console.log(data);
        const nbrComment = {
          nbr_comments: data.nbr_comments,
          id_post: data.id_post,
        };

        dispatch({ type: DELETE_COMMENT, payload: deleteData });
        dispatch({ type: LESS_COMMENT, payload: nbrComment });
      })
      .catch((err) => console.log(err));
  };
};

export const updateComment = (idcomment, data) => {
  return async (dispatch) => {
    return await axios({
      method: "put",
      url:
        process.env.REACT_APP_API_URL + "api/post/update/comment/" + idcomment,
      data: data,
      withCredentials: true,
    })
      .then((res) => {
        const updateData = {
          comment_text: res.data.data.comment_text,
          id_comment: res.data.data.id_comment,
        };

        dispatch({ type: UPDATE_COMMENT, payload: updateData });
      })
      .catch((err) => console.log(err));
  };
};
