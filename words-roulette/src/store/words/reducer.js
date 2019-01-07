import { actionTypes } from "./index";

////

const INIT_STATE = {
  success: true,
  loading: false,
  items: {}
};

const wordsFetchStart = state => {
  return {
    ...state,
    loading: true
  };
};

const wordsFetchSuccess = (state, { words }) => {
  return {
    ...state,
    success: true,
    loading: false,
    items: words
  };
};

const wordsFetchFail = state => {
  return {
    ...state,
    loading: false,
    success: false
  };
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
    default:
      return state;
  }
};
