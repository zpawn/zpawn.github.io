import _merge from "lodash/merge";

import { getRandomIds } from "./index";
import { rouletteSettingsChange } from "../rouletteSettings";

////

const actionTypes = {
  ROULETTE_INIT: "ROULETTE_INIT",
  ROULETTE_CHANGE_STEP: "ROULETTE_CHANGE_STEP"
};

const rouletteInitialized = ({ steps }) => ({
  type: actionTypes.ROULETTE_INIT,
  steps
});

const rouletteChangeStep = step => ({
  type: actionTypes.ROULETTE_CHANGE_STEP,
  step
});

////

const rouletteInit = newSettings => (dispatch, getState) => {
  const {
    words: { items },
    rouletteSettings: defaultSettings
  } = getState();

  const wordIds = Object.keys(items);
  const settings = _merge(defaultSettings, newSettings);
  const words = getRandomIds(wordIds, settings);

  if (words.length < settings.count) {
    dispatch(rouletteSettingsChange("count", words.length));
  }

  dispatch(rouletteInitialized({}));
};

////

export { actionTypes, rouletteInit, rouletteChangeStep };
