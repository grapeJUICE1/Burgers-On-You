import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import classes from "./Auth.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router";
import { updateObj, validate } from "../../shared/utils";

class Auth extends Component {
  state = {
    authForm: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your mail",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
    isSignUp: true,
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== "/")
      this.props.onSetAuthRedirectPath("/");
  }

  inputChangeHandler = (evt, id) => {
    let authFormClone = { ...this.state.authForm };

    authFormClone[id] = updateObj(authFormClone[id], {
      value: evt.target.value,
      touched: true,
      valid: validate(evt.target.value, authFormClone[id].validation),
    });
    const fields = [];
    for (let field in authFormClone) {
      fields.push(authFormClone[field].valid);
    }
    console.log(fields);

    if (!fields.includes(false)) {
      this.setState({ formIsValid: true });
    }
    this.setState({ authForm: authFormClone });
  };

  handleFormSubmit = (evt) => {
    evt.preventDefault();
    this.props.onFormSubmit(
      this.state.authForm.email.value,
      this.state.authForm.password.value,
      this.state.isSignUp
    );
  };

  authModeChangeHandler = () => {
    this.setState((prevState) => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  removeCharFromStr = (str, char) => {
    while (str.includes(char)) {
      str = str.replace(char, " ");
    }
    return str;
  };

  render() {
    const formEl = [];
    for (let key in this.state.authForm) {
      formEl.push({
        id: key,
        config: this.state.authForm[key],
      });
    }
    let form = (
      <Fragment>
        {this.props.isAuthenticated ? (
          <Redirect to={this.props.authRedirectPath} />
        ) : null}
        <form onSubmit={this.handleFormSubmit}>
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

          {this.state.isSignUp ? (
            <Button type="Success" disabled={!this.state.formIsValid}>
              Sign Up
            </Button>
          ) : (
            <Button type="Success" disabled={!this.state.formIsValid}>
              Log In
            </Button>
          )}
        </form>
        <Button type="Danger" clickHandler={this.authModeChangeHandler}>
          Switch to {this.state.isSignUp ? "Login" : "Sign Up"}
        </Button>
      </Fragment>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }
    let errorMessage = null;
    if (this.props.error) {
      const errMsg = this.removeCharFromStr(this.props.error.message, "_");
      errorMessage = <p style={{ color: "red" }}>{errMsg}</p>;
    }
    return (
      <div className={classes.Auth}>
        {errorMessage}
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token != null,
    authRedirectPath: state.auth.authRedirectPath,
    buildingBurger: state.burgerBuilder.building,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFormSubmit: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
