import React, { Component, Fragment } from "react";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import PremadeBurger from "../../components/PremadeBurger/PremadeBurger";
import Spinner from "../../components/UI/Spinner/Spinner";
import { withRouter } from "react-router";
import { getBurgerPrice } from "../../shared/utils";

import classes from "./PremadeBurgers.css";

class PremadeBurgers extends Component {
  componentDidMount() {
    if (!this.props.burgers) this.props.onFetchPremadeBurgers();
  }

  continueToCheckout(ing, price) {
    this.props.onInitPurchase();
    this.props.onProceedToCheckout(ing, price);
    this.props.history.push("/checkout");
  }
  continueToBurgerBuilder(ing, price) {
    this.props.onProceedToCheckout(ing, price);
    this.props.history.push("/");
  }
  render() {
    if (!this.props.burgers) {
      setTimeout(() => {
        this.props.onFetchPremadeBurgers();
      }, 600000);
    }
    const premadeBurgersArray = this.props.burgers
      ? Object.entries(this.props.burgers).map((e) => ({ [e[0]]: e[1] }))
      : null;

    let premadeBurgers;
    if (this.props.error) {
      premadeBurgers = (
        <h1>Cant load premade burgers because {this.props.error.message}</h1>
      );
    }
    if (this.props.loading) {
      premadeBurgers = <Spinner />;
    } else {
      premadeBurgers = premadeBurgersArray
        ? premadeBurgersArray.map((burger, key) => {
            const burgerTitle = Object.keys(burger)[0];
            const burgerIngredients = burger[burgerTitle].ingredients;
            return (
              <Fragment key={key}>
                <PremadeBurger
                  price={getBurgerPrice(burgerIngredients)}
                  title={burgerTitle}
                  ingredients={burgerIngredients}
                />
                <div className={classes.proceedButtonDiv}>
                  <button
                    className={classes.ProceedButton}
                    onClick={() =>
                      this.continueToCheckout(
                        burgerIngredients,
                        getBurgerPrice(burgerIngredients)
                      )
                    }
                  >
                    Proceed To Checkout
                  </button>
                  <button
                    className={classes.ProceedButton}
                    onClick={() =>
                      this.continueToBurgerBuilder(
                        burgerIngredients,
                        getBurgerPrice(burgerIngredients)
                      )
                    }
                  >
                    Edit on BurgerBuilder
                  </button>
                  <hr />
                </div>
              </Fragment>
            );
          })
        : null;
    }

    return (
      <>
        <div>{premadeBurgers}</div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    burgers: state.premadeBurgers.burgers,
    loading: state.premadeBurgers.loading,
    error: state.premadeBurgers.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchPremadeBurgers: () => dispatch(actions.fetchPremadeBurgers()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onProceedToCheckout: (ing, price) =>
      dispatch(actions.setIngredients(ing, price)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PremadeBurgers));
