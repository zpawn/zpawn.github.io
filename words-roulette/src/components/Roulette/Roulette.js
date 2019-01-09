import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  compose,
  setPropTypes,
  setDisplayName,
  withPropsOnChange
} from "recompose";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

import { rouletteInit } from "../../store/roulette";
import { styles } from "./index";
import Controls from "./Controls";
import Navigation from "./Navigation";

////

const mapStateToProps = state => ({
  isSuccessWords: state.words.success
});

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
    mapStateToProps,
    mapDispatchToProps
  ),

  withPropsOnChange(["isSuccessWords"], ({ onInit }) => onInit())
)(({ isSuccessWords }) => {
  return !isSuccessWords ? (
    <CircularProgress color="secondary" />
  ) : (
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
  );
});

export default roulette;
