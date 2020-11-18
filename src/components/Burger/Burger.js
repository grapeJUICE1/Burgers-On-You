import React from "react";
import classes from "./Burger.scss";

import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";

const Burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ing) =>
      [...Array(props.ingredients[ing])].map((_, i) => (
        <BurgerIngredients type={ing} key={ing + i} />
      ))
    )
    .reduce((arr, el) => arr.concat(el), []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredients type="bread-top" />
      {transformedIngredients}
      <BurgerIngredients type="bread-bottom" />
    </div>
  );
};

// Burger.propTypes = {

// }

export default Burger;
