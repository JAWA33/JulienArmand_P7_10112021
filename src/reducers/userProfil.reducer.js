import { GET_USER_PROFIL } from "../actions/userProfil.action.js";
// For Git
const initialState = {};

export default function userProfilReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_PROFIL:
      return action.payload;

    default:
      return state;
  }
}
