import React, { Component } from "react";
import axios from "../../axios-orders";

import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
  state = {
    orders: [],
    loading: false,
    error: null,
  };
  componentDidMount = async () => {
    this.setState({ loading: true });
    try {
      const fetchedOrders = [];
      const res = await axios.get("/orders.json");
      for (let key in res.data) {
        fetchedOrders.push({
          ...res.data[key],
          id: key,
        });
      }
      this.setState({ orders: fetchedOrders, loading: false });
    } catch (err) {
      console.log(err);
      this.setState({ loading: false, error: err });
    }
  };
  render() {
    let orders =
      this.state.orders.length !== 0 &&
      this.state.orders.map((order) => {
        return (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={(+order.price).toFixed(2)}
          />
        );
      });
    if (this.state.loading) {
      orders = <Spinner />;
    }
    if (this.state.error) {
      orders = <p>Can't Load your orders</p>;
    }
    return <div>{orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
