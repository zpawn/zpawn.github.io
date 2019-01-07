import React from "react";
import { compose, withHandlers, withStateHandlers } from "recompose";
import _cloneDeep from "lodash/cloneDeep";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

import { WordsService } from "../../store/words";
import { styles, initForm } from "./index";
import NewTranslations from "./NewTranslations";
import Alert from "../UI/Alert";

////

const New = compose(
  withStyles(styles),

  withStateHandlers(
    {
      form: _cloneDeep(initForm),
      disabled: false,
      isOpenAlert: false,
      isSuccess: true
    },
    {
      onChangeForm: () => form => ({ form }),
      onDisabledHandler: () => disabled => ({ disabled }),
      isOpenAlertHandler: () => isOpenAlert => ({ isOpenAlert }),
      isSuccessHandler: () => isSuccess => ({ isSuccess })
    }
  ),

  withHandlers({
    onChange: ({ form, onChangeForm }) => ({ target: { name, value } }) => {
      const updated = _cloneDeep(form);
      updated[name] = value;
      onChangeForm(updated);
    },

    onAddTranslations: ({ form, onChangeForm }) => () => {
      const updated = _cloneDeep(form);

      if (!updated.newTranslation.length) {
        return;
      }

      updated.newTranslations.push(updated.newTranslation);
      updated.newTranslation = "";

      onChangeForm(updated);
    },

    onReset: ({ onChangeForm }) => () => onChangeForm(_cloneDeep(initForm)),

    onDisableForm: ({ onDisabledHandler }) => () => onDisabledHandler(true),

    onEnableForm: ({ onDisabledHandler }) => () => onDisabledHandler(false),

    onOpenAlert: ({ isOpenAlertHandler }) => () => isOpenAlertHandler(true),

    onCloseAlert: ({ isOpenAlertHandler }) => () => isOpenAlertHandler(false),

    onCreatedSuccess: ({ isSuccessHandler }) => () => isSuccessHandler(true),

    onCreatedFail: ({ isSuccessHandler }) => () => isSuccessHandler(false)
  }),

  withHandlers({
    onSubmit: ({
      form,
      onReset,
      onDisableForm,
      onEnableForm,
      onOpenAlert,
      onCreatedSuccess,
      onCreatedFail
    }) => e => {
      e.preventDefault();
      let { newWord, newTranslation, newTranslations } = _cloneDeep(form);
      newWord = newWord.trim();
      newTranslation = newTranslation.trim();

      if (newWord.length && (newTranslation.length || newTranslations.length)) {
        if (newTranslation.length) {
          newTranslations.push(newTranslation);
        }
        onDisableForm(true);

        WordsService.save(newWord, newTranslations)
          .then(() => {
            onCreatedSuccess();
            onEnableForm();
            onReset();
          })
          .catch(() => {
            onEnableForm();
            onCreatedFail();
          })
          .finally(() => onOpenAlert());
      }
    }
  })
)(
  ({
    classes,
    disabled,
    onChange,
    onSubmit,
    isSuccess,
    isOpenAlert,
    onOpenAlert,
    onCloseAlert,
    onAddTranslations,
    form: { newWord, newTranslation, newTranslations }
  }) => (
    <>
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
          disabled={disabled}
        />

        <NewTranslations translations={newTranslations} disabled={disabled} />

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
            disabled={disabled}
          >
            Submit
          </Fab>
        </Grid>
      </form>

      <Alert
        isOpen={isOpenAlert}
        onClose={onCloseAlert}
        message={
          isSuccess
            ? "Translation Created Successfully"
            : "Translation Created Fail"
        }
      />
    </>
  )
);

export default New;
