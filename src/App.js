import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import * as actions from "./store/actions/index";
import Layout from "./components/Layout/Layout";
import Logout from "./containers/Auth/Logout/Logout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Spinner from "./components/UI/Spinner/Spinner";

const Checkout = React.lazy(() => {
  return import("./containers/Checkout/Checkout");
});

const Orders = React.lazy(() => {
  return import("./containers/Orders/Orders");
});

const Auth = React.lazy(() => {
  return import("./containers/Auth/Auth");
});

const PremadeBurgers = React.lazy(() => {
  return import("./containers/Premade/PremadeBurgers");
});

class App extends Component {
  componentDidMount() {
    this.props.onAutoLogIn();
  }
  render() {
    let routes;
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" render={() => <Checkout />} />
          <Route path="/orders" render={() => <Orders />} />
          <Route path="/premade" render={() => <PremadeBurgers />} />
          <Route path="/auth" render={() => <Auth />} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path="/premade" render={() => <PremadeBurgers />} />
          <Route path="/auth" render={() => <Auth />} />
          <Route path="/" component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <Layout>
        <Suspense fallback={<Spinner />}>{routes}</Suspense>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token != null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAutoLogIn: () => dispatch(actions.autoLogIn()),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
