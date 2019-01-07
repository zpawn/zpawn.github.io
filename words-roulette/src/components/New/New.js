import React from "react";
import {
  compose,
  setDisplayName,
  withHandlers,
  withStateHandlers
} from "recompose";
import _cloneDeep from "lodash/cloneDeep";

import TextField from "@material-ui/core/TextField";

import { WordsService } from "../../store/words";
import { initForm } from "./index";
import NewTranslations from "./NewTranslations";
import AddNewTranslation from "./AddNewTranslation";
import Submit from "./Submit";
import Alert from "../UI/Alert";

////

const New = compose(
  setDisplayName("New"),

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

        <AddNewTranslation
          newTranslation={newTranslation}
          onChange={onChange}
          disabled={disabled}
          onAddTranslations={onAddTranslations}
        />

        <Submit onSubmit={onSubmit} disabled={disabled} />
      </form>

      <Alert
        isOpen={isOpenAlert}
        onClose={onCloseAlert}
        message={
          isSuccess
            ? "Translation Created Successfully"
            : "Translation Created Fail"
        }
        variant={isSuccess ? "success" : "error"}
      />
    </>
  )
);

export default New;
