import React from "react";
import classes from "./Input.css";

const Input = (props) => {
  let inputElement = null;
  let inputClass = [classes.InputElement];
  if (props.invalid && props.touched) {
    inputClass.push(classes.Invalid);
  }
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          {...props.elementConfig}
          value={props.value}
          className={inputClass.join(" ")}
          onChange={props.changeHandler}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          {...props.elementConfig}
          value={props.value}
          className={inputClass.join(" ")}
          onChange={props.changeHandler}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClass.join(" ")}
          onChange={props.changeHandler}
          value={props.value}
        >
          {props.elementConfig.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          {...props.elementConfig}
          value={props.value}
          className={inputClass.join(" ")}
          onChange={props.changeHandler}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
