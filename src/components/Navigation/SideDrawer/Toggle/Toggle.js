import React from "react";
import Button from "../../../UI/Button/Button";

const Toggle = (props) => {
  return (
    <Button type="Success" clickHandler={props.clickHandler}>
      Toggle
    </Button>
  );
};

export default Toggle;
