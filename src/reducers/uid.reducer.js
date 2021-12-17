import { GET_UID } from "../actions/uid.action.js";
import { isEmpty } from "../components/Utils/isEmpty.js";

const saveUid = sessionStorage.getItem("id_user");

let initialState = !isEmpty(saveUid) ? JSON.parse(saveUid) : {};

export default function uidReducer(state = initialState, action) {
  switch (action.type) {
    case GET_UID:
      return action.payload;

    default:
      return state;
  }
}
