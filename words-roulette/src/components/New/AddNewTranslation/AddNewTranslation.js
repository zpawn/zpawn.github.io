import React from "react";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

////

const addNewTranslation = ({
  newTranslation,
  onChange,
  disabled,
  onAddTranslations
}) => (
  <Grid container spacing={8} alignItems="flex-end">
    <Grid item xs>
      <TextField
        fullWidth
        id="addNewTranslations"
        margin="normal"
        label="Translation"
        name="newTranslation"
        value={newTranslation}
        onChange={onChange}
        disabled={disabled}
      />
    </Grid>

    <Grid item>
      <IconButton onClick={onAddTranslations} disabled={disabled}>
        <AddIcon />
      </IconButton>
    </Grid>
  </Grid>
);

addNewTranslation.defaultProps = {
  newTranslation: "",
  disabled: false
};

addNewTranslation.propTypes = {
  newTranslation: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  onAddTranslations: PropTypes.func
};

export default addNewTranslation;
