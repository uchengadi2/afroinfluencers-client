import _ from "lodash";
import {
  FETCH_BRANDS,
  FETCH_BRAND,
  DELETE_BRAND,
  CREATE_BRAND,
  EDIT_BRAND,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_BRANDS:
      let id = 0;
      return {
        ...state,
        ..._.mapKeys(action.payload, `id`),
      };

    case FETCH_BRAND:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_BRAND:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_BRAND:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_BRAND:
      return _.omit(state, action.payload); //note that payload is just the category id
    default:
      return state;
  }
};
