import React, { Component } from "react";
import axios from "../../axios-orders";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
  componentDidMount = async () => {
    this.props.onFetchOrder(this.props.token, this.props.userId);
  };
  render() {
    let orders =
      this.props.orders.length !== 0 &&
      this.props.orders.map((order) => {
        return (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={(+order.price).toFixed(2)}
            status={order.status}
            isDelivered={order.delivered}
          />
        );
      });
    if (this.props.loading) {
      orders = <Spinner />;
    }
    if (this.props.error) {
      orders = <p>Can't Load your orders</p>;
    }
    return (
      <div>
        {orders ? (
          orders
        ) : (
          <h1 style={{ color: "#eee", textAlign: "center" }}>
            No orders made yet... Start By ordering a burger
          </h1>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    error: state.order.error,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrder: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
