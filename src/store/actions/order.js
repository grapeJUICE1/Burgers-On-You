import axios from "../../axios-orders";
import * as actionTypes from "../actions/actionTypes";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData,
  };
};
export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};
export const purchaseBurger = (orderData) => {
  return async (dispatch) => {
    try {
      dispatch(purchaseBurgerStart());
      const res = await axios.post("/orders.json", orderData);
      console.log(res);
      dispatch(purchaseBurgerSuccess(res.data.name, orderData));
    } catch (err) {
      console.log(err);
      dispatch(purchaseBurgerFail(err));
    }
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};
