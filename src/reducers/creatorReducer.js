import _ from "lodash";
import {
  FETCH_CREATORS,
  FETCH_CREATOR,
  DELETE_CREATOR,
  CREATE_CREATOR,
  EDIT_CREATOR,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_CREATORS:
      let id = 0;
      return {
        ...state,
        ..._.mapKeys(action.payload, `id`),
      };

    case FETCH_CREATOR:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_CREATOR:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_CREATOR:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_CREATOR:
      return _.omit(state, action.payload); //note that payload is just the category id
    default:
      return state;
  }
};
