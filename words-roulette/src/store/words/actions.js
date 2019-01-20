import _has from "lodash/has";

import { WordsService } from "./index";
import { TranslationsService } from "../translations";

////

const actionTypes = {
  WORDS_FETCH_START: "WORDS_FETCH_START",
  WORDS_FETCH_SUCCESS: "WORDS_FETCH_SUCCESS",
  WORDS_FETCH_FAIL: "WORDS_FETCH_FAIL",
  WORD_UPDATE_SUCCESS: "WORD_UPDATE_SUCCESS"
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

////

export { wordsFetch, wordUpdate, actionTypes };
