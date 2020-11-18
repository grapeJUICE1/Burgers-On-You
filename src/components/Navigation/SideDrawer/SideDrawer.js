import React, { Fragment } from "react";
import classes from "./SideDrawer.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";

import Logo from "../../Logo/Logo";

const SideDrawer = (props) => {
  let SidebarClasses = [classes.SideDrawer, classes.Close];
  if (props.show) SidebarClasses = [classes.SideDrawer, classes.Open];
  return (
    <Fragment>
      <Backdrop show={props.show} clicked={props.closed} />
      <div className={SidebarClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Fragment>
  );
};

export default SideDrawer;
