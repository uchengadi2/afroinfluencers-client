import _ from "lodash";
import {
  FETCH_NICHES,
  FETCH_NICHE,
  EDIT_NICHE,
  DELETE_NICHE,
  CREATE_NICHE,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_NICHES:
      let id = 0;
      return {
        ...state,
        ..._.mapKeys(action.payload, `id`),
      };

    case FETCH_NICHE:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_NICHE:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_NICHE:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_NICHE:
      return _.omit(state, action.payload); //note that payload is just the category id
    default:
      return state;
  }
};
