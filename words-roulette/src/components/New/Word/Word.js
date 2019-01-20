import React from "react";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";

////

const word = ({ name, word, onChange, disabled }) => (
  <TextField
    autoFocus
    fullWidth
    id="Word"
    label="Word"
    margin="normal"
    name={name}
    value={word}
    onChange={onChange}
    disabled={disabled}
  />
);

word.defaultProps = {
  disabled: false
};

word.propTypes = {
  name: PropTypes.string.isRequired,
  word: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default word;
