import _cloneDeep from "lodash/cloneDeep";

import { actionTypes } from "./index";

////

const INIT_STATE = {
  activeStep: null,
  steps: []
};

const rouletteInitialized = (state, { steps }) => ({
  ...state,
  activeStep: 0,
  steps
});

const rouletteChangeStep = (state, { step }) => ({
  ...state,
  activeStep: step
});

const rouletteChangeAnswer = (state, { key, answer }) => {
  const updatedSteps = _cloneDeep(state.steps);
  updatedSteps[key].answer = answer;

  return Object.assign({}, state, {
    steps: updatedSteps
  });
};

////

export const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case actionTypes.ROULETTE_INIT:
      return rouletteInitialized(state, action);
    case actionTypes.ROULETTE_CHANGE_STEP:
      return rouletteChangeStep(state, action);
    case actionTypes.ROULETTE_CHANGE_ANSWER:
      return rouletteChangeAnswer(state, action);
    default:
      return state;
  }
};
