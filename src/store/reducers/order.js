import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../../shared/utils";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
  error: false,
};

const fetchOrdersStartHandler = (state, action) => {
  return updateObj(state, {
    loading: true,
    error: false,
  });
};
const fetchOrdersSuccessHandler = (state, action) => {
  return updateObj(state, {
    orders: action.orders,
    loading: false,
    error: false,
  });
};

const fetchOrdersFailHandler = (state, action) => {
  return updateObj(state, {
    loading: false,
    error: true,
  });
};

const purchaseInitHandler = (state, action) => {
  return updateObj(state, {
    purchased: false,
    error: false,
  });
};

const purchaseStartHandler = (state, action) => {
  return updateObj(state, {
    loading: true,
    error: false,
  });
};

const purchaseSuccessHandler = (state, action) => {
  const newOrder = updateObj(action.orders, {
    id: action.orderId,
  });
  return updateObj(state, {
    loading: false,
    purchased: true,
    error: false,
    orders: state.orders.concat(newOrder),
  });
};

const purchaseFailHandler = (state, action) => {
  return updateObj(state, {
    loading: false,
    error: true,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStartHandler(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccessHandler(state, action);
    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchOrdersFailHandler(state, action);
    case actionTypes.PURCHASE_INIT:
      return purchaseInitHandler(state, action);
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseStartHandler(state, action);
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseSuccessHandler(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseFailHandler(state, action);
    default:
      return state;
  }
};

export default reducer;
