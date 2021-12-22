import {
  GET_COMMENTS,
  CREATE_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
} from "../actions/comment.action.js";

const initialState = {};

export default function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return action.payload;

    case CREATE_COMMENT:
      return [action.payload, ...state];

    case DELETE_COMMENT:
      return state.filter(
        (data) => data.id_comment != action.payload.id_comment
      );

    case UPDATE_COMMENT:
      return state.map((comment) => {
        if (comment.id_comment == action.payload.id_comment) {
          return {
            ...comment,
            comment_text: action.payload.comment_text,
          };
        } else return comment;
      });

    default:
      return state;
  }
}
