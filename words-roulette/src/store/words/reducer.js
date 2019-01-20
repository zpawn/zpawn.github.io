import _cloneDeep from "lodash/cloneDeep";
import _omit from "lodash/omit";

import { actionTypes } from "./index";

////

const INIT_STATE = {
  success: false,
  loading: false,
  items: {},
  isReady: false
};

const wordsFetchStart = state => ({
  ...state,
  loading: true,
  success: false
});

const wordsFetchSuccess = (state, { words }) => ({
  ...state,
  success: true,
  loading: false,
  items: words
});

const wordsFetchFail = state => ({
  ...state,
  loading: false,
  success: false
});

const wordUpdateSuccess = (state, { word }) => {
  const updated = _cloneDeep(state);
  updated.items[word.id] = word;
  return updated;
};

const wordSaveSuccess = (state, { word }) => {
  const updated = _cloneDeep(state);
  updated.items[word.id] = word;
  return updated;
};

const wordRemoveSuccess = (state, { wordId }) => {
  const updated = _cloneDeep(state);
  updated.items = _omit(updated.items, [wordId]);
  return updated;
};

////

export const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case actionTypes.WORDS_FETCH_START:
      return wordsFetchStart(state, action);
    case actionTypes.WORDS_FETCH_SUCCESS:
      return wordsFetchSuccess(state, action);
    case actionTypes.WORDS_FETCH_FAIL:
      return wordsFetchFail(state, action);
    case actionTypes.WORD_UPDATE_SUCCESS:
      return wordUpdateSuccess(state, action);
    case actionTypes.WORD_SAVE_SUCCESS:
      return wordSaveSuccess(state, action);
    case actionTypes.WORD_REMOVE_SUCCESS:
      return wordRemoveSuccess(state, action);
    default:
      return state;
  }
};
