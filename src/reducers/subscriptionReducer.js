import _ from "lodash";
import {
  FETCH_SUBSCRIPTIONS,
  FETCH_SUBSCRIPTION,
  DELETE_SUBSCRIPTION,
  CREATE_SUBSCRIPTION,
  EDIT_SUBSCRIPTION,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_SUBSCRIPTIONS:
      let id = 0;
      return {
        ...state,
        ..._.mapKeys(action.payload, `id`),
      };

    case FETCH_SUBSCRIPTION:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_SUBSCRIPTION:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_SUBSCRIPTION:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_SUBSCRIPTION:
      return _.omit(state, action.payload); //note that payload is just the category id
    default:
      return state;
  }
};
