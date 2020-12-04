import React from "react";
import classes from "./PremadeBurger.css";
import Burger from "../Burger/Burger";

function PremadeBurger(props) {
  return (
    <div className={classes.container}>
      <h2 className={classes.burger_name}>{props.title}</h2>

      <div className={classes.ingredient_div}>
        <span className={classes.ingredient_div_label}>Ingredients: </span>
        {Object.keys(props.ingredients).map((ing, key) =>
          props.ingredients[ing] !== 0 ? (
            <span className={classes.ingredient_box} key={key}>
              {ing} ({props.ingredients[ing]})
            </span>
          ) : null
        )}
        <h3 className={classes.burger_price_label}>
          Price: <strong>${props.price}</strong>
        </h3>
      </div>
      <div className={classes.preview_burger}>
        <Burger ingredients={props.ingredients} />
      </div>
    </div>
  );
}

export default PremadeBurger;
