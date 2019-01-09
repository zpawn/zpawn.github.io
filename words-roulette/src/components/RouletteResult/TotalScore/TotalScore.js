import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers, setDisplayName } from "recompose";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

////

const mapStateToProps = state => ({
  count: state.rouletteSettings.count,
  words: state.words.items,
  steps: state.roulette.steps
});

////

const totalScore = compose(
  setDisplayName("RouletteTotalScore"),

  connect(mapStateToProps),

  withHandlers({
    getValidScore: ({ words, steps }) => () => {
      return steps.reduce((result, step) => {
        const { answer, wordId } = step;
        const { translations } = words[wordId];

        const t = Object.keys(translations).map(id =>
          translations[id].translation.toLowerCase()
        );
        const isValid = t.includes(answer.toLowerCase());

        if (isValid) {
          result += 1;
        }

        return result;
      }, 0);
    }
  })
)(({ count, getValidScore }) => (
  <Grid container justify="space-around" alignItems="flex-end">
    <Grid item>
      <Typography>Score:</Typography>
    </Grid>

    <Grid item>
      <Typography variant="h3">
        {getValidScore()}/{count}
      </Typography>
    </Grid>
  </Grid>
));

export default totalScore;
