import React from "react";
import { connect } from "react-redux";
import {
  compose,
  lifecycle,
  withProps,
  withHandlers,
  setDisplayName,
  withStateHandlers,
  withPropsOnChange
} from "recompose";
import _has from "lodash/has";
import _cloneDeep from "lodash/cloneDeep";

import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";

import { wordUpdate } from "../../store/words";
import { Word } from "../New";

////

const mapStateToProps = state => ({
  words: state.words.items
});

const mapDispatchToProps = dispatch => ({
  onUpdate: word => dispatch(wordUpdate(word))
});

////

const word = compose(
  setDisplayName("Word"),

  connect(
    mapStateToProps,
    mapDispatchToProps
  ),

  withProps({
    name: "word"
  }),

  withStateHandlers(
    {
      wordId: null,
      word: ""
    },
    {
      onWordId: () => wordId => ({ wordId }),
      onWord: () => word => ({ word })
    }
  ),

  withHandlers({
    onChangeWord: ({ word, onWord }) => ({ target: { value } }) =>
      onWord({
        ...word,
        name: value
      }),

    onChangeTranslation: ({ word, onWord }) => id => ({
      target: { value }
    }) => {
      if (_has(word, `translations.${id}`)) {
        const updated = _cloneDeep(word);
        updated.translations[id].translation = value;
        onWord(updated);
      }
    },

    onSave: ({ word, onUpdate }) => () => onUpdate(word)
  }),

  lifecycle({
    componentDidMount() {
      const {
        words,
        onWord,
        onWordId,
        match: {
          params: { id }
        }
      } = this.props;

      id && onWordId(id);

      if (_has(words, id)) {
        onWord(words[id]);
      }
    }
  }),

  withPropsOnChange(["words"], ({ wordId, words, onWord }) => {
    if (_has(words, wordId)) {
      onWord(words[wordId]);
    }
  })
)(
  ({
    name,
    wordId,
    word,
    words,
    onSave,
    onChangeWord,
    onChangeTranslation
  }) => {
    if (!wordId || !_has(words, wordId) || !word) {
      return <CircularProgress color="secondary" />;
    }

    return (
      <>
        <Word name={name} word={word.name} onChange={onChangeWord} />

        {Object.keys(word.translations).map(id => (
          <TextField
            key={id}
            autoFocus
            fullWidth
            id="Translation"
            label="Translation"
            margin="normal"
            value={word.translations[id].translation}
            onChange={onChangeTranslation(id)}
          />
        ))}

        <Fab
          variant="extended"
          aria-label="Submit"
          color="primary"
          onClick={onSave}
          type="submit"
        >
          Save
        </Fab>
      </>
    );
  }
);

export default word;
