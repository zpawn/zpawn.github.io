import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "recompose";
import _has from "lodash/has";
import _isEmpty from "lodash/isEmpty";

import { withStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import { styles } from "./index";
import DottedMenu from "./DottedMenu";

////

const mapStateToProps = state => ({
  words: state.words.items
});

////

const wordsRow = ({ words }) => (
  <TableBody>
    {_isEmpty(words) ? (
      <TableRow>
        <TableCell colSpan={3} align="center">
          Empty
        </TableCell>
      </TableRow>
    ) : (
      Object.keys(words).map(wordId => {
        let t = [];
        if (_has(words[wordId], "translations")) {
          t = Object.keys(words[wordId].translations).map(
            tId => words[wordId].translations[tId].translation
          );
        }

        return (
          <TableRow key={wordId}>
            <TableCell>{words[wordId].name}</TableCell>

            <TableCell>{t.join(", ")}</TableCell>

            <TableCell>
              <DottedMenu />
            </TableCell>
          </TableRow>
        );
      })
    )}
  </TableBody>
);

wordsRow.propTypes = {
  words: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(wordsRow);
