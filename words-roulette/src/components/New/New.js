import React from "react";
import { connect } from "react-redux";
import {
  compose,
  withProps,
  withHandlers,
  setDisplayName,
  withStateHandlers
} from "recompose";
import _cloneDeep from "lodash/cloneDeep";

import Typography from "@material-ui/core/Typography";

import { wordSave } from "../../store/words";
import { initForm } from "./index";
import Word from "./Word";
import Translations from "./Translations";
import AddNewTranslation from "./AddNewTranslation";
import Submit from "./Submit";

////

const mapDispatchToProps = dispatch => ({
  onSave: (newWord, newTranslations) =>
    dispatch(wordSave(newWord, newTranslations))
});

////

const New = compose(
  setDisplayName("New"),

  connect(
    null,
    mapDispatchToProps
  ),

  withProps({
    name: "newWord"
  }),

  withStateHandlers(
    {
      form: _cloneDeep(initForm),
      disabled: false,
      isOpenAlert: false,
      isSuccess: true
    },
    {
      onChangeForm: () => form => ({ form }),
      onDisabledHandler: () => disabled => ({ disabled })
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

    onEnableForm: ({ onDisabledHandler }) => () => onDisabledHandler(false)
  }),

  withHandlers({
    onSubmit: ({ form, onSave, onReset, onDisableForm, onEnableForm }) => e => {
      e.preventDefault();
      let { newWord, newTranslation, newTranslations } = _cloneDeep(form);
      newWord = newWord.trim();
      newTranslation = newTranslation.trim();

      if (newWord.length && (newTranslation.length || newTranslations.length)) {
        if (newTranslation.length) {
          newTranslations.push(newTranslation);
        }
        onDisableForm(true);

        onSave(newWord, newTranslations)
          .then(() => onReset())
          .catch(() => onEnableForm())
          .finally(() => onEnableForm());
      }
    }
  })
)(
  ({
    name,
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
        <Typography align="center" variant="h4">
          New Word
        </Typography>

        <Word
          name={name}
          word={newWord}
          onChange={onChange}
          disabled={disabled}
        />

        <Translations translations={newTranslations} disabled={disabled} />

        <AddNewTranslation
          newTranslation={newTranslation}
          onChange={onChange}
          disabled={disabled}
          onAddTranslations={onAddTranslations}
        />

        <Submit onSubmit={onSubmit} disabled={disabled} />
      </form>
    </>
  )
);

export default New;
