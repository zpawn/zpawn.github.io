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

import CircularProgress from "@material-ui/core/CircularProgress";

import { rouletteInit } from "../../store/roulette";
import { styles } from "./index";
import QA from "./QA";
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

  withPropsOnChange(
    ["isSuccessWords"],
    ({ onInit, isSuccessWords }) => isSuccessWords && onInit()
  )
)(({ isSuccessWords }) => {
  return !isSuccessWords ? (
    <CircularProgress color="secondary" />
  ) : (
    <>
      <QA />
      <Navigation />
      <Controls />
    </>
  );
});

export default roulette;
