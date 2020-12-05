import React from "react";

import classes from "./Toggle.css";

const Toggle = (props) => {
  return (
    <div onClick={props.clickHandler} className={classes.Toggle}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Toggle;
