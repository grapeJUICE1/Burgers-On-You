import React from "react";
import classes from "./Order.css";

const Order = (props) => {
  console.log(props.ingredients);
  let ingredients = props.ingredients ? (
    Object.keys(props.ingredients).map((ing, key) => (
      <span
        style={{
          margin: "0 8px",
          display: "inline-block",
          textTransform: "capitalize",
          border: "1px solid #eee",
          padding: "5px",
        }}
      >
        {ing} ({props.ingredients[ing]})
      </span>
    ))
  ) : (
    <span
      style={{
        margin: "0 8px",
        display: "inline-block",
        textTransform: "capitalize",
        border: "1px solid #eee",
        padding: "5px",
      }}
    >
      Only Bread
    </span>
  );
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredients}</p>
      <p>
        Price: <strong>USD {props.price}</strong>
      </p>
    </div>
  );
};

export default Order;
