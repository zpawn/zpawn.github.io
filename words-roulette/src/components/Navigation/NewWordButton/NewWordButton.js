import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import { styles } from "./index";

////

const newWordButton = ({ classes }) => (
  <Fab className={classes.fab} color="secondary" component={NavLink} to="/new">
    <AddIcon />
  </Fab>
);

newWordButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(newWordButton);
