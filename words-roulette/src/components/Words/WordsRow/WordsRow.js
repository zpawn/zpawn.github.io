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

import { wordRemove } from "../../../store/words";
import { styles } from "./index";
import DottedMenu from "./DottedMenu";

////

const mapStateToProps = state => ({
  words: state.words.items
});

const mapDispatchToProps = dispatch => ({
  onWordRemove: id => dispatch(wordRemove(id))
});

////

const wordsRow = ({ words, onWordRemove }) => (
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
              <DottedMenu wordId={wordId} onWordRemove={onWordRemove} />
            </TableCell>
          </TableRow>
        );
      })
    )}
  </TableBody>
);

wordsRow.propTypes = {
  words: PropTypes.object.isRequired,
  onWordRemove: PropTypes.func.isRequired
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(wordsRow);
