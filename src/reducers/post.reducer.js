import {
  GET_ALL_POSTS,
  LIKE_POST,
  DISLIKE_POST,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
} from "../actions/post.actions.js";
import { PLUS_COMMENT, LESS_COMMENT } from "../actions/comment.action.js";

const initialState = {};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
      return action.payload;

    case LIKE_POST:
      return state.map((data) => {
        if (action.payload === data.id_post) {
          return {
            ...data,
            nbr_likes: ++data.nbr_likes,
            i_like_post: "yes",
          };
        } else {
          return data;
        }
      });

    case DISLIKE_POST:
      return state.map((data) => {
        if (action.payload === data.id_post) {
          return {
            ...data,
            nbr_likes: --data.nbr_likes,
            i_like_post: "no",
          };
        } else {
          return data;
        }
      });

    case CREATE_POST:
      return [action.payload, ...state];

    case UPDATE_POST:
      return state.map((data) => {
        if (data.id_post == action.payload.id_post) {
          return {
            ...data,
            post_text: action.payload.post_text,
            post_url_image: action.payload.post_url_image,
            post_video: action.payload.post_video,
          };
        } else return data;
      });

    case DELETE_POST:
      return state.filter((data) => data.id_post != action.payload.id_post);

    case PLUS_COMMENT:
      return state.map((data) => {
        if (data.id_post == action.payload.id_post) {
          return {
            ...data,
            nbr_comments: ++action.payload.nbr_comments,
          };
        } else return data;
      });

    case LESS_COMMENT:
      return state.map((data) => {
        if (data.id_post == action.payload.id_post) {
          return {
            ...data,
            nbr_comments: --action.payload.nbr_comments,
          };
        } else return data;
      });

    default:
      return state;
  }
}
