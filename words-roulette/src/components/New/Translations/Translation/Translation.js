import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

////

const translation = ({ translation, disabled }) => (
  <TextField
    autoFocus
    fullWidth
    label="Translate"
    margin="normal"
    value={translation}
    disabled={disabled}
    // onChange={onChange}
  />
);

translation.defaultProps = {
  disabled: false
};

translation.propTypes = {
  translation: PropTypes.string.isRequired,
  disabled: PropTypes.bool
};

export default translation;
