import {
  GET_ALL_POSTS,
  LIKE_POST,
  DISLIKE_POST,
  CREATE_POST,
} from "../actions/post.actions.js";

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

    default:
      return state;
  }
}
