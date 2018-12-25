import React, { Component } from "react";

import classes from "./Layout.module.css";
import Router from "./Router";
import Navigation, { NewWordButton } from "./Navigation";

////

class Layout extends Component {
  render() {
    return (
      <div className={classes.Layout}>
        <Navigation />
        <main className={classes.Content}>
          <Router />
          <NewWordButton />
        </main>
      </div>
    );
  }
}

export default Layout;
