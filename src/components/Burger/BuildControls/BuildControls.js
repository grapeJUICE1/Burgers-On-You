import React from "react";
import classes from "./BuildControls.css";

import BuildControl from "./BuildControl/BuildControl";
import { connect } from "react-redux";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];
const BuildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map((ctr) => (
        <BuildControl
          key={ctr.label}
          label={ctr.label}
          type={ctr.type}
          addClickHandler={() => props.onAddIngredient(ctr.type)}
          removeClickHandler={() =>
            props.onRemoveIngredient(ctr.type, props.self)
          }
          shouldButtonBeDisabled={props.disabledInfo[ctr.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}
      >
        {props.isAuthenticated ? "Order Now" : "Sign Up to Continue"}
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token != null,
  };
};
export default connect(mapStateToProps)(BuildControls);
