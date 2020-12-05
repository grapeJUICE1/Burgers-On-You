import React from "react";
import classes from "./Order.css";

const Order = (props) => {
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
        key={key}
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
        Status : &nbsp; &nbsp;
        <strong>{props.isDelivered ? "Delivered" : props.status}</strong>
      </p>
      <p>
        Price : &nbsp; &nbsp;&nbsp;&nbsp;<strong>USD {props.price}</strong>
      </p>
      {props.isDelivered ? (
        <p style={{ color: "green", textAlign: "center" }}>
          {" "}
          <strong>The Order Was Delivered</strong>
        </p>
      ) : (
        <p style={{ color: "red", textAlign: "center" }}>
          {" "}
          <strong>The Order is not Delivered yet</strong>
        </p>
      )}
    </div>
  );
};

export default Order;
