import _ from "lodash";
import {
  FETCH_COURSE_ASSESSOR,
  FETCH_COURSE_ASSESSORS,
  EDIT_COURSE_ASSESSOR,
  DELETE_COURSE_ASSESSOR,
  CREATE_COURSE_ASSESSOR,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_COURSE_ASSESSORS:
      let id = 0;
      return {
        ...state,
        ..._.mapKeys(action.payload, `id`),
      };

    case FETCH_COURSE_ASSESSOR:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_COURSE_ASSESSOR:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_COURSE_ASSESSOR:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_COURSE_ASSESSOR:
      return _.omit(state, action.payload); //note that payload is just the category id
    default:
      return state;
  }
};
