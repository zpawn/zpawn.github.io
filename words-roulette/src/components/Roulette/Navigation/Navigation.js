import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "recompose";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";

import { styles } from "./index";

////

const mapStateToProps = state => ({
  activeStep: state.roulette.activeStep,
  count: state.rouletteSettings.count
});

////

const navigation = ({ classes, activeStep, count }) => (
  <Paper variant="progress" position="static" className={classes.root}>
    <LinearProgress
      className={classes.progress}
      variant="determinate"
      value={Math.ceil((activeStep / (count - 1)) * 100)}
    />
  </Paper>
);

navigation.propTypes = {
  count: PropTypes.number,
  activeStep: PropTypes.number,
  classes: PropTypes.object
};

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(navigation);
