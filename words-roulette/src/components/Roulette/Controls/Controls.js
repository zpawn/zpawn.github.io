import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose, setPropTypes, withHandlers, setDisplayName } from "recompose";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import DoneIcon from "@material-ui/icons/Done";
import PrevIcon from "@material-ui/icons/ChevronLeft";
import NextIcon from "@material-ui/icons/ChevronRight";

import { rouletteChangeStep } from "../../../store/roulette";
import { styles } from "./index";

////

const mapStateToProps = state => ({
  activeStep: state.roulette.activeStep
});

const mapDispatchToProps = dispatch => ({
  onChangeStep: step => dispatch(rouletteChangeStep(step))
});

////

const controls = compose(
  setDisplayName("Controls"),

  setPropTypes({
    classes: PropTypes.object.isRequired
  }),

  connect(
    mapStateToProps,
    mapDispatchToProps
  ),

  withHandlers({
    onPrevStep: ({ activeStep, onChangeStep }) => () => {},

    onNextStep: ({ activeStep, onChangeStep }) => () => {}
  })
)(({ classes }) => (
  <Typography align="center">
    <Fab variant="extended" aria-label="Previous" color="default" type="button">
      <PrevIcon />
    </Fab>

    <Fab
      className={classes.button}
      variant="extended"
      aria-label="Finish"
      color="primary"
      type="button"
    >
      <DoneIcon className={classes.iconAnswer} />
      Finish
    </Fab>

    <Fab variant="extended" aria-label="Next" color="default" type="submit">
      <NextIcon />
    </Fab>
  </Typography>
));

export default withStyles(styles)(controls);
