import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummmary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  cancelCheckout = () => {
    this.props.history.goBack();
  };
  continueCheckout = () => {
    this.props.history.replace("/checkout/fill-data");
  };
  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            onCancel={this.cancelCheckout}
            onContinue={this.continueCheckout}
          />
          <Route
            path={`${this.props.match.path}/fill-data`}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
