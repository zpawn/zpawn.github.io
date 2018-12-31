import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Router from "../Router";
import Navigation, { NewWordButton } from "../Navigation";
import styles from "./styles";

////

const layout = ({ classes }) => (
  <div className={classes.layout}>
    <Navigation />
    <main className={classes.content}>
      <Router />
      <NewWordButton />
    </main>
  </div>
);

layout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(layout);
