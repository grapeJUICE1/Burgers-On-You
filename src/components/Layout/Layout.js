import React, { Fragment, Component } from "react";
import classes from "./layout.scss";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

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
    return (
      <Fragment>
        <Toolbar pressToggleHandler={this.showSideBarHandler} />
        <SideDrawer
          closed={this.closeSideBarHandler}
          show={this.state.showSideBar}
        />
        <main className={classes.content}>{this.props.children}</main>
      </Fragment>
    );
  }
}

export default Layout;
