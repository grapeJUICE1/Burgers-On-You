import React from "react";
import classes from "./BuildControls.css";

import BuildControl from "./BuildControl/BuildControl";
import { connect } from "react-redux";

const controls = [
  { label: "Chicken Patty", type: "chicken" },
  { label: "Beef Patty", type: "beef" },
  { label: "Beef Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Regular Sauce", type: "sauce" },
  { label: "Lettuce", type: "lettuce" },
  { label: "Tomato", type: "tomato" },
  { label: "Onion", type: "onion" },
  { label: "Yogurt Sauce", type: "yogurt-sauce" },
  { label: "Veg Patty", type: "veg-patty" },
];
const BuildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price <strong>{`$${props.price}`}</strong>
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
