import React, { Fragment, Component } from "react";
import classes from "./layout.scss";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

class Layout extends Component {
  state = {
    showSideBar: false,
  };
  showSideBarHandler = () => {
    this.setState({ showSideBar: true });
  };
  closeSideBarHandler = () => {
    this.setState({ showSideBar: false });
  };
  render() {
    let isAuthenticated = this.props.token != null;
    return (
      <Fragment>
        <Toolbar
          pressToggleHandler={this.showSideBarHandler}
          isAuthenticated={isAuthenticated}
        />
        <SideDrawer
          closed={this.closeSideBarHandler}
          show={this.state.showSideBar}
          isAuthenticated={isAuthenticated}
        />
        <main className={classes.content}>{this.props.children}</main>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};
export default connect(mapStateToProps)(Layout);
