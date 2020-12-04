import React from "react";
import propTypes from "prop-types";
import classes from "./BurgerIngredient.scss";

const BurgerIngredients = ({ type }) => {
  let ingredient = null;
  switch (type) {
    case "bread-bottom":
      ingredient = <div className={classes.BreadBottom}></div>;
      break;
    case "bread-top":
      ingredient = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </div>
      );
      break;
    case "chicken":
      ingredient = <div className={classes.chicken}></div>;
      break;
    case "beef":
      ingredient = <div className={classes.beef}></div>;
      break;
    case "cheese":
      ingredient = <div className={classes.Cheese}></div>;
      break;
    case "lettuce":
      ingredient = <div className={classes.lettuce}></div>;
      break;
    case "onion":
      ingredient = <div className={classes.onion}></div>;
      break;
    case "tomato":
      ingredient = <div className={classes.tomato}></div>;
      break;
    case "sauce":
      ingredient = <div className={classes.sauce}></div>;
      break;
    case "bacon":
      ingredient = <div className={classes.Bacon}></div>;
      break;
    default:
      ingredient = null;
  }
  return ingredient;
};

BurgerIngredients.propTypes = {
  type: propTypes.string.isRequired,
};
export default BurgerIngredients;
