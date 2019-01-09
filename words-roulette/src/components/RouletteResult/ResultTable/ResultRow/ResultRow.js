import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "recompose";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/es/Typography/Typography";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";

import { styles } from "./index";

////

const mapStateToProps = state => ({
  steps: state.roulette.steps,
  words: state.words.items
});

////

const resultRow = ({ classes, steps, words }) => (
  <TableBody>
    {steps.map(({ question, answer, wordId }) => {
      const { translations } = words[wordId];
      const t = Object.keys(translations).map(id =>
        translations[id].translation.toLowerCase()
      );
      const isValid = t.includes(answer.toLowerCase());

      return (
        <TableRow key={wordId}>
          <TableCell padding="none" align="center">
            {isValid ? (
              <DoneIcon className={classes["valid"]} />
            ) : (
              <ClearIcon className={classes["error"]} />
            )}
          </TableCell>

          <TableCell padding="dense">{words[wordId].name}</TableCell>

          <TableCell padding="dense">
            <Typography className={classes[isValid ? "valid" : "error"]}>
              {answer ? answer : "---"}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {t.join(", ")}
            </Typography>
          </TableCell>
        </TableRow>
      );
    })}
  </TableBody>
);

resultRow.propTypes = {
  steps: PropTypes.array,
  classes: PropTypes.object.isRequired,
  words: PropTypes.object
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(resultRow);
