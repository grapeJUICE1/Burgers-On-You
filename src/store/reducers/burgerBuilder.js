import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../../shared/utils";

const initialState = {
  ingredients: null,
  totalPrice: 2,
  error: false,
  building: false,
};

const INGREDIENT_PRICES = {
  salad: 0.2,
  cheese: 0.5,
  meat: 1.7,
  bacon: 1.5,
};

const addIngredient = (state, action) => {
  return updateObj(state, {
    ingredients: updateObj(state.ingredients, {
      [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
    }),
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true,
  });
};
const removeIngredient = (state, action) => {
  return updateObj(state, {
    ingredients: updateObj(state.ingredients, {
      [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
    }),
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    building: true,
  });
};

const setIngredients = (state, action) => {
  if (state.ingredients !== null) return state;
  return updateObj(state, {
    ingredients: action.ingredients,
    totalPrice: 2,
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
