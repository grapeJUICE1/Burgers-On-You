import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Toggle from "../SideDrawer/Toggle/Toggle";

const Toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <div className={classes.mobileOnly}>
        <Toggle clickHandler={props.pressToggleHandler} />
      </div>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuthenticated={props.isAuthenticated} />
      </nav>
    </header>
  );
};

export default Toolbar;
