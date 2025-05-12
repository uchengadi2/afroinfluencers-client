import _ from "lodash";
import {
  FETCH_SAMPLES,
  FETCH_SAMPLE,
  DELETE_SAMPLE,
  CREATE_SAMPLE,
  EDIT_SAMPLE,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_SAMPLES:
      let id = 0;
      return {
        ...state,
        ..._.mapKeys(action.payload, `id`),
      };

    case FETCH_SAMPLE:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_SAMPLE:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_SAMPLE:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_SAMPLE:
      return _.omit(state, action.payload); //note that payload is just the category id
    default:
      return state;
  }
};
