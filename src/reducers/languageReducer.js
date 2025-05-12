import _ from "lodash";
import {
  FETCH_LANGUAGE,
  FETCH_LANGUAGES,
  EDIT_LANGUAGE,
  DELETE_LANGUAGE,
  CREATE_LANGUAGE,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_LANGUAGES:
      let id = 0;
      return {
        ...state,
        ..._.mapKeys(action.payload, `id`),
      };

    case FETCH_LANGUAGE:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_LANGUAGE:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_LANGUAGE:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_LANGUAGE:
      return _.omit(state, action.payload); //note that payload is just the category id
    default:
      return state;
  }
};
