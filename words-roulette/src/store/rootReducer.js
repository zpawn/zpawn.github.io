import { combineReducers } from "redux";

import { wordsReducer } from "./words";
import { rouletteReducer } from "./roulette";

////

export default combineReducers({
  words: wordsReducer,
  roulette: rouletteReducer
});
