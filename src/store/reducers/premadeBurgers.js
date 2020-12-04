import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../../shared/utils";

const initialState = {
  burgers: null,
  loading: false,
  error: false,
  //   purchased: false,
};

const fetchPremadeBurgersStartHandler = (state, action) => {
  return updateObj(state, {
    loading: true,
    error: false,
  });
};
const fetchPremadeBurgersSuccessHandler = (state, action) => {
  return updateObj(state, {
    burgers: action.burgers,
    loading: false,
    error: false,
  });
};

const fetchPremadeBurgersFailHandler = (state, action) => {
  return updateObj(state, {
    loading: false,
    error: action.error,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PREMADE_BURGERS_START:
      return fetchPremadeBurgersStartHandler(state, action);
    case actionTypes.FETCH_PREMADE_BURGERS_SUCCESS:
      return fetchPremadeBurgersSuccessHandler(state, action);
    case actionTypes.FETCH_PREMADE_BURGERS_FAIL:
      return fetchPremadeBurgersFailHandler(state, action);
    default:
      return state;
  }
};

export default reducer;
