import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

////

const newTranslation = ({ translation, disabled }) => (
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

newTranslation.defaultProps = {
  disabled: false
};

newTranslation.propTypes = {
  translation: PropTypes.string.isRequired,
  disabled: PropTypes.bool
};

export default newTranslation;
