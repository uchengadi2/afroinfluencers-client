import _ from "lodash";
import {
  FETCH_COURSE_MENTOR,
  FETCH_COURSE_MENTORS,
  EDIT_COURSE_MENTOR,
  DELETE_COURSE_MENTOR,
  CREATE_COURSE_MENTOR,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_COURSE_MENTORS:
      let id = 0;
      return {
        ...state,
        ..._.mapKeys(action.payload, `id`),
      };

    case FETCH_COURSE_MENTOR:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_COURSE_MENTOR:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_COURSE_MENTOR:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_COURSE_MENTOR:
      return _.omit(state, action.payload); //note that payload is just the category id
    default:
      return state;
  }
};
