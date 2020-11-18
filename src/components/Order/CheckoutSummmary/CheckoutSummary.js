import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

import classes from "./CheckoutSummary.css";

const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it taste's well</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button type="Success" clickHandler={props.onContinue}>
        Continue
      </Button>
      <Button type="Danger" clickHandler={props.onCancel}>
        Cancel
      </Button>
    </div>
  );
};

export default CheckoutSummary;
