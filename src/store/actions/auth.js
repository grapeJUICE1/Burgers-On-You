import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: authData.idToken,
    userId: authData.localId,
  };
};
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};
export const authTimeOut = (expTime) => {
  return (dispatch) => {
    setTimeout(() => dispatch(logout()), expTime * 1000);
  };
};
export const auth = (email, password, isSignup) => {
  return async (dispatch) => {
    dispatch(authStart());
    try {
      const authData = {
        email,
        password,
        returnSecureToken: true,
      };
      let url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBsU2XMloBLOaRDHTNF3dEezI4N7jh9hmY";

      if (!isSignup) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBsU2XMloBLOaRDHTNF3dEezI4N7jh9hmY";
      }
      const res = await axios.post(url, authData);
      const expirationDate = new Date(
        new Date().getTime() + res.data.expiresIn * 1000
      );
      localStorage.setItem("token", res.data.idToken);
      localStorage.setItem("expirationDate", expirationDate);
      localStorage.setItem("expirationTime", res.data.expiresIn);
      localStorage.setItem("userId", res.data.localId);
      console.log(res);
      dispatch(authSuccess(res.data));
      dispatch(authTimeOut(+res.data.expiresIn));
    } catch (err) {
      console.log(err.response.data.error);
      dispatch(authFail(err.response.data.error));
    }
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const autoLogIn = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      const userId = localStorage.getItem("userId");
      if (expirationDate >= new Date()) {
        console.log(token);
        const authData = {
          idToken: token,
          localId: userId,
        };
        dispatch(authSuccess(authData));
        dispatch(authTimeOut(localStorage.getItem("expirationTime")));
      }
    }
  };
};
