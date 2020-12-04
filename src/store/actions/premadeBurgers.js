import axios from "../../axios-orders";
import * as actionTypes from "../actions/actionTypes";

export const fetchPremadeBurgersStart = () => {
  return {
    type: actionTypes.FETCH_PREMADE_BURGERS_START,
  };
};
export const fetchPremadeBurgersSuccess = (burgers) => {
  return {
    type: actionTypes.FETCH_PREMADE_BURGERS_SUCCESS,
    burgers,
  };
};

export const fetchPremadeBurgersFail = (error) => {
  return {
    type: actionTypes.FETCH_PREMADE_BURGERS_FAIL,
    error,
  };
};

export const fetchPremadeBurgers = () => {
  return async (dispatch) => {
    dispatch(fetchPremadeBurgersStart());
    try {
      const res = await axios.get(`/premade.json`);
      dispatch(fetchPremadeBurgersSuccess(res.data));
    } catch (err) {
      dispatch(fetchPremadeBurgersFail(err));
    }
  };
};
