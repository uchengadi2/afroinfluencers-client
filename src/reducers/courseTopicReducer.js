import _ from "lodash";
import {
  FETCH_COURSE_TOPIC,
  FETCH_COURSE_TOPICS,
  EDIT_COURSE_TOPIC,
  DELETE_COURSE_TOPIC,
  CREATE_COURSE_TOPIC,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_COURSE_TOPICS:
      let id = 0;
      return {
        ...state,
        ..._.mapKeys(action.payload, `id`),
      };

    case FETCH_COURSE_TOPIC:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_COURSE_TOPIC:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_COURSE_TOPIC:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_COURSE_TOPIC:
      return _.omit(state, action.payload); //note that payload is just the category id
    default:
      return state;
  }
};
