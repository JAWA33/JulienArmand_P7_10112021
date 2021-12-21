import { GET_JOBS } from "../actions/job.actions.js";

const initialState = {};

export default function jobReducer(state = initialState, action) {
  switch (action.type) {
    case GET_JOBS:
      return action.payload;

    default:
      return state;
  }
}
// For Git
