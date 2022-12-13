import axios from "../../axios-orders";
import * as actionTypes from "../actions/actionTypes";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData,
    message: "Thank you, your order has been placed"
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
export const purchaseBurger = (orderData, token) => {
  return async (dispatch) => {
    try {
      dispatch(purchaseBurgerStart());
      const res = await axios.post("/orders.json?auth=" + token, orderData);
      dispatch(purchaseBurgerSuccess(res.data.name, orderData));
    } catch (err) {
      dispatch(purchaseBurgerFail(err));
    }
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders,
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrders = (token, userId) => {
  return async (dispatch) => {
    dispatch(fetchOrdersStart());
    try {
      const fetchedOrders = [];
      const res = await axios.get(
        `/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`
      );
      for (let key in res.data) {
        fetchedOrders.push({
          ...res.data[key],
          id: key,
        });
      }
      dispatch(fetchOrdersSuccess(fetchedOrders));
    } catch (err) {
      dispatch(fetchOrdersFail(err));
    }
  };
};
