import _ from "lodash";
import {
  FETCH_PROJECTS,
  FETCH_PROJECT,
  DELETE_PROJECT,
  CREATE_PROJECT,
  EDIT_PROJECT,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_PROJECTS:
      let id = 0;
      return {
        ...state,
        ..._.mapKeys(action.payload, `id`),
      };

    case FETCH_PROJECT:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_PROJECT:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_PROJECT:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_PROJECT:
      return _.omit(state, action.payload); //note that payload is just the category id
    default:
      return state;
  }
};
