import _ from "lodash";
import {
  FETCH_COURSE_INSTRUCTOR,
  FETCH_COURSE_INSTRUCTORS,
  EDIT_COURSE_INSTRUCTOR,
  DELETE_COURSE_INSTRUCTOR,
  CREATE_COURSE_INSTRUCTOR,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_COURSE_INSTRUCTORS:
      let id = 0;
      return {
        ...state,
        ..._.mapKeys(action.payload, `id`),
      };

    case FETCH_COURSE_INSTRUCTOR:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_COURSE_INSTRUCTOR:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_COURSE_INSTRUCTOR:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_COURSE_INSTRUCTOR:
      return _.omit(state, action.payload); //note that payload is just the category id
    default:
      return state;
  }
};
