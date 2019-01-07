import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { compose, withHandlers, setDisplayName } from "recompose";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";

import { rouletteSettingsChange } from "../../store/rouletteSettings";

////

const mapStateToProps = state => ({
  count: state.rouletteSettings.count
});

const mapDispatchToProps = dispatch => ({
  onChangeSettings: (name, value) =>
    dispatch(rouletteSettingsChange(name, value))
});

////

const rouletteSettings = compose(
  setDisplayName("RouletteSettings"),

  connect(
    mapStateToProps,
    mapDispatchToProps
  ),

  withHandlers({
    onChange: ({ onChangeSettings }) => name => e => {
      const { value } = e.target;
      if (name && value) {
        onChangeSettings(name, Math.abs(value));
      }
    }
  })
)(({ count, onChange }) => (
  <>
    <Typography align="center" variant="h5">
      Settings
    </Typography>

    <TextField
      fullWidth
      margin="normal"
      label="Number"
      type="number"
      value={count}
      onChange={onChange("count")}
      InputLabelProps={{
        shrink: true
      }}
    />

    <Typography align="center">
      <Fab
        variant="extended"
        aria-label="Start"
        color="primary"
        type="button"
        component={NavLink}
        to="/roulette"
      >
        Start
      </Fab>
    </Typography>
  </>
));

export default rouletteSettings;
