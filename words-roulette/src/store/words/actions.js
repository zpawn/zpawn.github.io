import _has from "lodash/has";

import { WordsService } from "./index";
import { TranslationsService } from "../translations";

////

const actionTypes = {
  WORDS_FETCH_START: "WORDS_FETCH_START",
  WORDS_FETCH_SUCCESS: "WORDS_FETCH_SUCCESS",
  WORDS_FETCH_FAIL: "WORDS_FETCH_FAIL",
  WORD_UPDATE_SUCCESS: "WORD_UPDATE_SUCCESS",
  WORD_SAVE_SUCCESS: "WORD_SAVE_SUCCESS",
  WORD_REMOVE_SUCCESS: "WORD_REMOVE_SUCCESS"
};

const wordsFetchStart = () => ({
  type: actionTypes.WORDS_FETCH_START
});

const wordsFetchSuccess = words => ({
  type: actionTypes.WORDS_FETCH_SUCCESS,
  words
});

const wordsFetchFail = () => ({
  type: actionTypes.WORDS_FETCH_FAIL
});

const wordUpdateSuccess = word => ({
  type: actionTypes.WORD_UPDATE_SUCCESS,
  word
});

const wordSaveSuccess = word => ({
  type: actionTypes.WORD_SAVE_SUCCESS,
  word
});

const wordRemoveSuccess = wordId => ({
  type: actionTypes.WORD_REMOVE_SUCCESS,
  wordId
});

////

const wordsFetch = () => async dispatch => {
  dispatch(wordsFetchStart());

  const wordsPromise = await WordsService.findAll();
  const translationsPromise = await TranslationsService.findAll();

  Promise.all([wordsPromise, translationsPromise])
    .then(([words, translations]) => {
      const data = {};
      if (!words.length && !translations.length) {
        return;
      }

      words.forEach(word => (data[word.id] = word));
      translations.forEach(({ wordId, ...t }) => {
        if (!_has(data, wordId)) {
          return;
        }

        if (!_has(data, `${wordId}.translations`)) {
          data[wordId].translations = {};
        }

        data[wordId].translations[t.id] = t;
      });

      dispatch(wordsFetchSuccess(data));
    })
    .catch(() => dispatch(wordsFetchFail()));
};

const wordUpdate = word => async dispatch => {
  WordsService.update(word)
    .then(() => dispatch(wordUpdateSuccess(word)))
    .catch(err => {
      // ToDo: handle this error (Show alert)
    });
};

const wordSave = (newWord, newTranslations) => dispatch => {
  return WordsService.save(newWord, newTranslations)
    .then(({ word }) => {
      dispatch(wordSaveSuccess(word));
      // ToDo: show success Alert
    })
    .catch(err => {
      // ToDo: show error Alert
      throw new Error(err.message || "Word created failure");
    });
};

const wordRemove = wordId => (dispatch, getState) => {
  const {
    words: { items }
  } = getState();

  if (!_has(items, wordId)) {
    // ToDo: show error Alert with message: Doesn't isset word
    return;
  }

  const translationIds = Object.keys(items[wordId].translations);

  const wordPromise = WordsService.remove(wordId);
  const translationsPromise = TranslationsService.remove(translationIds);

  Promise.all([wordPromise, translationsPromise])
    .then(() => {
      dispatch(wordRemoveSuccess(wordId));
      // ToDo: show success Alert
    })
    .catch(err => {
      // ToDo: show error Alert
    });
};

////

export { wordSave, wordsFetch, wordUpdate, wordRemove, actionTypes };
