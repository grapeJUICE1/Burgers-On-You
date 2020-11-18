import React, { Component } from "react";
import axios from "../../../axios-orders";

import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.css";

export default class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name",
        },
        value: "",
        validation: {
          required: true,
          minLength: 4,
          maxLength: 20,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP CODE",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
          touched: false,
        },
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your mail",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        validation: {},
        valid: true,
      },
    },
    formIsValid: false,
    loading: false,
  };

  validate = (val, rule) => {
    let isValid = true;
    if (rule.required) {
      isValid = val.trim() !== "" && isValid;
    }
    if (rule.minLength) {
      isValid = val.length >= rule.minLength && isValid;
    }
    if (rule.maxLength) {
      isValid = val.length <= rule.maxLength && isValid;
    }
    return isValid;
  };
  inputChangeHandler = (evt, id) => {
    let orderFormClone = { ...this.state.orderForm };
    let orderFormElementClone = { ...orderFormClone[id] };
    orderFormElementClone.value = evt.target.value;
    orderFormElementClone.touched = true;
    orderFormElementClone.valid = this.validate(
      orderFormElementClone.value,
      orderFormElementClone.validation
    );
    orderFormClone[id] = orderFormElementClone;
    // for(let)
    this.setState({ orderForm: orderFormClone });
  };
  orderHandler = async (evt) => {
    evt.preventDefault();
    this.setState({ loading: true });
    try {
      const contactData = {};
      for (let input in this.state.orderForm) {
        contactData[input] = this.state.orderForm[input];
      }
      const order = {
        ingredients: this.props.ingredients,
        price: this.props.price,
        orderData: contactData,
      };
      await axios.post("/orders.json", order);
      this.setState({ loading: false });
      this.props.history.push("/");
    } catch (err) {
      console.log(err);
      this.setState({ loading: false });
    }
  };
  render() {
    const formEl = [];
    for (let key in this.state.orderForm) {
      formEl.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formEl.map((el) => (
          <Input
            key={el.id}
            elementType={el.config.elementType}
            elementConfig={el.config.elementConfig}
            value={el.config.value}
            changeHandler={(evt) => this.inputChangeHandler(evt, el.id)}
            invalid={!el.config.valid}
            touched={el.config.touched}
          />
        ))}
        <Button type="Success" disabled={!this.state.formIsValid}>
          Order
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}
