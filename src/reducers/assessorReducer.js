import _ from "lodash";
import {
  FETCH_ASSESSOR,
  FETCH_ASSESSORS,
  EDIT_ASSESSOR,
  DELETE_ASSESSOR,
  CREATE_ASSESSOR,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_ASSESSORS:
      let id = 0;
      return {
        ...state,
        ..._.mapKeys(action.payload, `id`),
      };

    case FETCH_ASSESSOR:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_ASSESSOR:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_ASSESSOR:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_ASSESSOR:
      return _.omit(state, action.payload); //note that payload is just the category id
    default:
      return state;
  }
};
