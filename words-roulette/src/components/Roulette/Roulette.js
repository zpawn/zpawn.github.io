import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose, lifecycle, setPropTypes, setDisplayName } from "recompose";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import { rouletteInit } from "../../store/roulette";
import { styles } from "./index";
import Controls from "./Controls";
import Navigation from "./Navigation";

////

const mapDispatchToProps = dispatch => ({
  onInit: () => dispatch(rouletteInit())
});

////

const roulette = compose(
  setDisplayName("Roulette"),

  withStyles(styles),

  setPropTypes({
    classes: PropTypes.object
  }),

  connect(
    null,
    mapDispatchToProps
  ),

  lifecycle({
    componentDidMount() {
      this.props.onInit();
    }
  })
)(() => (
  <>
    <Typography align="center" variant="h3">
      roulette
    </Typography>

    <TextField
      autoFocus
      fullWidth
      id="answer"
      label="Your answer"
      margin="normal"
      name="answer"
      // value={newWord}
      // onChange={onChange}
      // disabled={disabled}
    />

    <Navigation />

    <Controls />
  </>
));

export default roulette;
