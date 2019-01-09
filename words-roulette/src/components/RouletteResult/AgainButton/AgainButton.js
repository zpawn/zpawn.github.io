import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/es/Typography/Typography";
import Fab from "@material-ui/core/Fab";

import { styles } from "./index";

////

const againButton = ({ classes }) => (
  <Typography align="center" className={classes.root}>
    <Fab
      variant="extended"
      aria-label="Start"
      color="primary"
      type="button"
      component={NavLink}
      to="/roulette/settings"
    >
      Again
    </Fab>
  </Typography>
);

againButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(againButton);
