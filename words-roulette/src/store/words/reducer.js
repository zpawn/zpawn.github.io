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
