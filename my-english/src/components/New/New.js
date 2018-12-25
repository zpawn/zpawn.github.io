import React from "react";
import TextField from "@material-ui/core/TextField";

////

const New = () => (
  <form noValidate autoComplete="off">
    <TextField
      autoFocus
      fullWidth
      id="standard-name"
      label="Name"
      margin="normal"
    />
  </form>
);

export default New;
