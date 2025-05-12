import _ from "lodash";
import {
  FETCH_COURSE_LESSON,
  FETCH_COURSE_LESSONS,
  EDIT_COURSE_LESSON,
  DELETE_COURSE_LESSON,
  CREATE_COURSE_LESSON,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_COURSE_LESSONS:
      let id = 0;
      return {
        ...state,
        ..._.mapKeys(action.payload, `id`),
      };

    case FETCH_COURSE_LESSON:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_COURSE_LESSON:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_COURSE_LESSON:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_COURSE_LESSON:
      return _.omit(state, action.payload); //note that payload is just the category id
    default:
      return state;
  }
};
