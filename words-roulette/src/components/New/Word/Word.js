import React from "react";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";

////

const word = ({ word, onChange, disabled }) => (
  <TextField
    autoFocus
    fullWidth
    id="addNewWord"
    label="New Word"
    margin="normal"
    name="newWord"
    value={word}
    onChange={onChange}
    disabled={disabled}
  />
);

word.propTypes = {
  word: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default word;
