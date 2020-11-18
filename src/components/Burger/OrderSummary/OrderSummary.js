import React, { Fragment } from "react";
import Button from "../../UI/Button/Button";
const OrderSummary = (props) => {
  const orderInfo = Object.keys(props.ingredients).map((ing) => (
    <li key={ing}>
      <span style={{ textTransform: "capitalize" }}>{ing}</span>:
      {props.ingredients[ing]}
    </li>
  ));
  return (
    <Fragment>
      <h3>Your Burger:</h3>
      <p>Contains the following ingredients:</p>
      <ul>{orderInfo}</ul>
      <p>
        <strong>Total Price: {props.totalPrice.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout ?...</p>
      <Button type="Danger" clickHandler={props.purchaseCancelHandler}>
        Cancel
      </Button>
      <Button type="Success" clickHandler={props.purchaseContinueHandler}>
        Continue -{">"}
      </Button>
    </Fragment>
  );
};

export default OrderSummary;
