import _ from "lodash";
import {
  FETCH_MENTOR,
  FETCH_MENTORS,
  EDIT_MENTOR,
  DELETE_MENTOR,
  CREATE_MENTOR,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_MENTORS:
      let id = 0;
      return {
        ...state,
        ..._.mapKeys(action.payload, `id`),
      };

    case FETCH_MENTOR:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_MENTOR:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_MENTOR:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_MENTOR:
      return _.omit(state, action.payload); //note that payload is just the category id
    default:
      return state;
  }
};
