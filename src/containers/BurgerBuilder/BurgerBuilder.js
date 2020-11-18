import React, { Component, Fragment } from "react";
import axios from "../../axios-orders";

import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.2,
  cheese: 0.5,
  meat: 1.7,
  bacon: 1.5,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: null,
  };

  componentDidMount = async () => {
    try {
      const res = await axios.get(
        "https://burgers-on-you.firebaseio.com/ingredients.json"
      );
      this.setState({ ingredients: res.data });
    } catch (err) {
      this.setState({ error: true });
    }
  };
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseContinueHandler = async () => {
    try {
      const queryParams = [];
      for (let i in this.state.ingredients) {
        queryParams.push(
          `${encodeURIComponent(i)}=${encodeURIComponent(
            this.state.ingredients[i]
          )}`
        );
      }
      queryParams.push(`price=${this.state.totalPrice}`);
      const queryString = queryParams.join("&");
      this.props.history.push({
        pathname: "/checkout",
        search: `?${queryString}`,
      });
    } catch (err) {
      console.log(err);
    }
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  updatePurchaseHandler = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((ing) => ingredients[ing])
      .reduce((sum, el) => sum + el, 0);

    this.setState({ purchasable: sum > 0 });
  };
  addIngredientHandler = (type) => {
    const currentCount = this.state.ingredients[type];
    const updatedCount = currentCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const currentTotalPrice = this.state.totalPrice;
    const IngredientPrice = INGREDIENT_PRICES[type];
    const newPrice = currentTotalPrice + IngredientPrice;

    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchaseHandler(updatedIngredients);
  };
  removeIngredientHandler = (type) => {
    const currentCount = this.state.ingredients[type];
    if (currentCount <= 0) {
      return;
    }
    const updatedCount = currentCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const currentTotalPrice = this.state.totalPrice;
    const IngredientPrice = INGREDIENT_PRICES[type];
    const newPrice = currentTotalPrice - IngredientPrice;

    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchaseHandler(updatedIngredients);
  };
  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = this.state.error ? (
      <h3>Ingredients can't be loaded</h3>
    ) : (
      <Spinner />
    );
    let orderSummary = null;

    if (this.state.ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            onAddIngredient={this.addIngredientHandler}
            ordered={this.purchaseHandler}
            onRemoveIngredient={this.removeIngredientHandler}
            disabledInfo={disabledInfo}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice}
          />
        </Fragment>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCancelHandler={this.purchaseCancelHandler}
          purchaseContinueHandler={this.purchaseContinueHandler}
          totalPrice={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);
