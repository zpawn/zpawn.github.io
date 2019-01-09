import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers, setDisplayName } from "recompose";
import _has from "lodash/has";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import { rouletteChangeAnswer } from "../../../store/roulette";

////

const mapStateToProps = state => ({
  step: state.roulette.activeStep,
  steps: state.roulette.steps,
  words: state.words.items
});

const mapDispatchToProps = dispatch => ({
  onChangeAnswer: (key, answer) => dispatch(rouletteChangeAnswer(key, answer))
});

////

const qa = compose(
  setDisplayName("Q&A"),

  connect(
    mapStateToProps,
    mapDispatchToProps
  ),

  withHandlers({
    onChange: ({ onChangeAnswer }) => key => ({ target: { value } }) =>
      onChangeAnswer(key, value)
  })
)(({ onChange, step, steps, words }) => {
  if (!_has(steps, step)) {
    return null;
  }

  const { answer, wordId /*question*/ } = steps[step];

  return (
    <>
      <Typography align="center" variant="h3">
        {words[wordId].name}
      </Typography>

      <TextField
        autoFocus
        fullWidth
        label="Your answer"
        margin="normal"
        value={answer}
        onChange={onChange(step)}
      />
    </>
  );
});

export default qa;
