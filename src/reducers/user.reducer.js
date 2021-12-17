import { GET_USER, UPDATE_USER, DELETE_USER } from "../actions/user.actions.js";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;

    case UPDATE_USER:
      return state.map((data) => {
        if (data.id_user == action.payload.get("id_user")) {
          return {
            ...data,
            user_firstname: action.payload.get("user_firstname"),
            user_lastname: action.payload.get("user_lastname"),
            user_phone: action.payload.get("user_phone"),
            user_age: action.payload.get("user_age"),
            user_bio: action.payload.get("user_bio"),
            user_skill: action.payload.get("user_skill"),
            user_hobbie: action.payload.get("user_hobbie"),
            user_url_image: action.payload.get("user_url_image"),
            job_name: action.payload.get("job_name"),
            service_name: action.payload.get("service_name"),
          };
        } else return data;
      });

    case DELETE_USER:
      return state.filter((data) => data.id_user != action.payload.id_user);

    default:
      return state;
  }
}
