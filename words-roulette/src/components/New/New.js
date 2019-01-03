import React from "react";
import { compose, withHandlers, withState } from "recompose";
import _cloneDeep from "lodash/cloneDeep";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

import { WordService } from "../../store/word";
import { styles, initForm } from "./index";

////

const New = compose(
  withStyles(styles),

  withState("form", "onChangeForm", _cloneDeep(initForm)),

  withHandlers({
    onChange: ({ form, onChangeForm }) => ({ target: { name, value } }) => {
      const updated = _cloneDeep(form);
      updated[name] = value;
      onChangeForm(updated);
    },

    onReset: ({ onChangeForm }) => () => onChangeForm(_cloneDeep(initForm))
  }),

  withHandlers({
    onSubmit: ({ form: { newWord, newTranslate }, onReset }) => e => {
      e.preventDefault();
      newWord = newWord.trim();
      newTranslate = newTranslate.trim();

      if (newWord.length && newTranslate.length) {
        WordService.create(newWord, newTranslate).then(() => onReset());
      }
    }
  })
)(({ classes, onChange, onSubmit, form: { newWord, newTranslate } }) => (
  <form noValidate autoComplete="off">
    <TextField
      autoFocus
      fullWidth
      id="addNewWord"
      label="New Word"
      margin="normal"
      name="newWord"
      value={newWord}
      onChange={onChange}
    />

    <Grid container spacing={8} alignItems="flex-end">
      <Grid item xs>
        <TextField
          fullWidth
          id="addNewTranslate"
          margin="normal"
          label="Translation"
          name="newTranslate"
          value={newTranslate}
          onChange={onChange}
        />
      </Grid>

      <Grid item>
        <IconButton>
          <AddIcon />
        </IconButton>
      </Grid>
    </Grid>

    <Grid
      container
      spacing={8}
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Fab
        className={classes.button}
        variant="extended"
        aria-label="Submit"
        color="primary"
        onClick={onSubmit}
        type="submit"
      >
        Submit
      </Fab>
    </Grid>
  </form>
));

export default New;
