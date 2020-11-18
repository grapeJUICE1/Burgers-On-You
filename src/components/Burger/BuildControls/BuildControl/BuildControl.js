import React from "react";
import classes from "./BuildControl.css";

const BuildControl = (props) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button
        className={classes.Less}
        onClick={props.removeClickHandler}
        disabled={props.shouldButtonBeDisabled}
      >
        Less
      </button>
      <button className={classes.More} onClick={props.addClickHandler}>
        More
      </button>
    </div>
  );
};

export default BuildControl;
