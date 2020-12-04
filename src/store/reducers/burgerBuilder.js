import * as actionTypes from "../actions/actionTypes";
import { updateObj, getBurgerPrice } from "../../shared/utils";

const initialState = {
  ingredients: null,
  totalPrice: 2.0,
  error: false,
  building: false,
};

const addIngredient = (state, action) => {
  const updatedIngredients = updateObj(state.ingredients, {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  });
  return updateObj(state, {
    ingredients: updatedIngredients,
    totalPrice: getBurgerPrice(updatedIngredients),
    building: true,
  });
};
const removeIngredient = (state, action) => {
  const updatedIngredients = updateObj(state.ingredients, {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  });
  return updateObj(state, {
    ingredients: updatedIngredients,
    totalPrice: getBurgerPrice(updatedIngredients),
    building: true,
  });
};

const setIngredients = (state, action) => {
  return updateObj(state, {
    ingredients: action.ingredients,
    totalPrice: action.price ? action.price : 2,
    error: false,
    building: false,
  });
};

const failedToFetchIngredients = (state, action) => {
  return updateObj(state, {
    ingredients: action.ingredients,
    error: true,
  });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FAILED_TO_FETCH_INGREDIENTS:
      return failedToFetchIngredients(state, action);
    default:
      return state;
  }
};

export default reducer;
