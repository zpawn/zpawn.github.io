import _merge from "lodash/merge";

import { getSteps, getRandomWordIds } from "./index";
import { rouletteSettingsChange } from "../rouletteSettings";

////

const actionTypes = {
  ROULETTE_INIT: "ROULETTE_INIT",
  ROULETTE_CHANGE_STEP: "ROULETTE_CHANGE_STEP",
  ROULETTE_CHANGE_ANSWER: "ROULETTE_CHANGE_ANSWER"
};

const rouletteInitialized = ({ steps }) => ({
  type: actionTypes.ROULETTE_INIT,
  steps
});

const rouletteChangeStep = step => ({
  type: actionTypes.ROULETTE_CHANGE_STEP,
  step
});

const rouletteChangeAnswer = (key, answer) => ({
  type: actionTypes.ROULETTE_CHANGE_ANSWER,
  key,
  answer
});

////

const rouletteInit = newSettings => (dispatch, getState) => {
  const {
    words: { items },
    rouletteSettings: defaultSettings
  } = getState();

  const wordIds = Object.keys(items);
  const settings = _merge(defaultSettings, newSettings);
  const words = getRandomWordIds(wordIds, settings);

  if (words.length < settings.count) {
    dispatch(rouletteSettingsChange("count", words.length));
  }

  const steps = getSteps(words);

  dispatch(rouletteInitialized({ steps }));
};

////

export { actionTypes, rouletteInit, rouletteChangeStep, rouletteChangeAnswer };
