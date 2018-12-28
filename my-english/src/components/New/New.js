import React from "react";
import { compose, withHandlers, withStateHandlers } from "recompose";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

import styles from "./styles";

////

const New = compose(
  withStyles(styles),

  withStateHandlers(
    {
      newWord: "",
      newTranslate: "",
      newTranslates: []
    },
    {
      onNewWordHandler: () => ({ target: { value } }) => ({ newWord: value }),
      onNewTranslateHandler: () => ({ target: { value } }) => ({
        newTranslate: value
      }),
      onNewTranslatesHandler: []
    }
  ),

  withHandlers({
    onSubmit: ({ newWord, newTranslate }) => () => {
      // ToDo: handle submit
    }
  })
)(
  ({
    classes,
    newWord,
    onNewWordHandler,
    newTranslate,
    onNewTranslateHandler,
    onSubmit
  }) => (
    <form noValidate autoComplete="off">
      <TextField
        autoFocus
        fullWidth
        id="addNewWord"
        label="New Word"
        margin="normal"
        value={newWord}
        onChange={onNewWordHandler}
      />

      <Grid container spacing={8} alignItems="flex-end">
        <Grid item xs>
          <TextField
            fullWidth
            id="addNewTranslate"
            margin="normal"
            label="Translation"
            value={newTranslate}
            onChange={onNewTranslateHandler}
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
        >
          Submit
        </Fab>
      </Grid>
    </form>
  )
);

export default New;
