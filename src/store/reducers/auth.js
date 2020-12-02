import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../utils";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/",
};

const authStartHandler = (state, action) => {
  return updateObj(state, { loading: true, error: null });
};

const logout = (state, action) => {
  return updateObj(state, initialState);
};
const authSuccessHandler = (state, action) => {
  return updateObj(state, {
    loading: false,
    token: action.token,
    userId: action.userId,
    error: null,
  });
};
const authFailHandler = (state, action) => {
  return updateObj(state, {
    loading: false,
    error: action.error,
  });
};

const setAuthRedirectPathHandler = (state, action) => {
  return updateObj(state, { authRedirectPath: action.path });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStartHandler(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccessHandler(state, action);
    case actionTypes.AUTH_FAIL:
      return authFailHandler(state, action);
    case actionTypes.AUTH_LOGOUT:
      return logout(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPathHandler(state, action);
    default:
      return state;
  }
};

export default reducer;
