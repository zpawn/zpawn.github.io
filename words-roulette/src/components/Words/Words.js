import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import _isEmpty from "lodash/isEmpty";
import _has from "lodash/has";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

////

const mapStateToProps = state => ({
  words: state.words.items
});

////

const words = ({ words }) => (
  <List>
    {_isEmpty(words) ? (
      <ListItem>
        <ListItemText primary="Empty" />
      </ListItem>
    ) : (
      Object.keys(words).map(wordId => {
        let t = [];
        if (_has(words[wordId], "translations")) {
          t = Object.keys(words[wordId].translations).map(
            tId => words[wordId].translations[tId].translation
          );
        }

        return (
          <ListItem key={wordId}>
            <ListItemText
              primary={words[wordId].name}
              secondary={t.join(", ")}
            />
          </ListItem>
        );
      })
    )}
  </List>
);

words.propTypes = {
  words: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(words);
