import _ from "lodash";
import {
  FETCH_INSTRUCTOR,
  FETCH_INSTRUCTORS,
  EDIT_INSTUCTOR,
  DELETE_INSTRUCTOR,
  CREATE_INSTRUCTOR,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_INSTRUCTORS:
      let id = 0;
      return {
        ...state,
        ..._.mapKeys(action.payload, `id`),
      };

    case FETCH_INSTRUCTOR:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_INSTRUCTOR:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_INSTUCTOR:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_INSTRUCTOR:
      return _.omit(state, action.payload); //note that payload is just the category id
    default:
      return state;
  }
};
