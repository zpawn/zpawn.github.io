import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

////

const newTranslate = ({ translate, disabled }) => (
  <TextField
    autoFocus
    fullWidth
    label="Translate"
    margin="normal"
    value={translate}
    disabled={disabled}
    // onChange={onChange}
  />
);

newTranslate.defaultProps = {
  disabled: false
};

newTranslate.propTypes = {
  translate: PropTypes.string.isRequired,
  disabled: PropTypes.bool
};

export default newTranslate;
