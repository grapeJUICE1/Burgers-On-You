import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

export const failedToFetchIngredients = () => {
  return {
    type: actionTypes.FAILED_TO_FETCH_INGREDIENTS,
  };
};
export const initIngredient = (ingredients) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        "https://burgers-on-you.firebaseio.com/ingredients.json"
      );
      dispatch(setIngredients(res.data));
    } catch (err) {
      dispatch(failedToFetchIngredients());
    }
  };
};
