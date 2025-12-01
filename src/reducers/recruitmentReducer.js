import _ from "lodash";
import {
  FETCH_RECRUITMENTS,
  FETCH_RECRUITMENT,
  DELETE_RECRUITMENT,
  CREATE_RECRUITMENT,
  EDIT_RECRUITMENT,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_RECRUITMENTS:
      let id = 0;
      return {
        ...state,
        ..._.mapKeys(action.payload, `id`),
      };

    case FETCH_RECRUITMENT:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_RECRUITMENT:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_RECRUITMENT:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_RECRUITMENT:
      return _.omit(state, action.payload); //note that payload is just the category id
    default:
      return state;
  }
};
