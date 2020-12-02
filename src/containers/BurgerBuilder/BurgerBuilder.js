import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import axios from "../../axios-orders";

import * as actions from "../../store/actions/index";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: null,
  };
  componentDidMount() {
    this.props.onInitIngredients();
  }
  purchaseHandler = () => {
    if (this.state.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };
  purchaseContinueHandler = async () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  updatePurchaseHandler = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((ing) => ingredients[ing])
      .reduce((sum, el) => sum + el, 0);

    return sum > 0;
  };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = this.props.error ? (
      <h3>Ingredients can't be loaded</h3>
    ) : (
      <Spinner />
    );
    let orderSummary = null;

    if (this.props.ings) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            onAddIngredient={this.props.onAddIngredient}
            ordered={this.purchaseHandler}
            onRemoveIngredient={this.props.onRemoveIngredient}
            disabledInfo={disabledInfo}
            purchasable={this.updatePurchaseHandler(this.props.ings)}
            price={this.props.price}
          />
        </Fragment>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancelHandler={this.purchaseCancelHandler}
          purchaseContinueHandler={this.purchaseContinueHandler}
          totalPrice={this.props.price}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          cancelOrder={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token != null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingredientName) =>
      dispatch(actions.addIngredient(ingredientName)),
    onRemoveIngredient: (ingredientName) =>
      dispatch(actions.removeIngredient(ingredientName)),
    onInitIngredients: (ingredientName) => dispatch(actions.initIngredient()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
