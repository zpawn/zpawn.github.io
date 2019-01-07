import { actionTypes } from "./index";

////

const INIT_STATE = {
  activeStep: null,
  steps: {}
};

const rouletteInitialized = (state, { steps }) => ({
  ...state,
  activeStep: 0,
  steps
});

const rouletteChangeStep = (state, { step }) => {
  return {
    ...step,
    activeStep: step
  };
};

////

export const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case actionTypes.ROULETTE_INIT:
      return rouletteInitialized(state, action);
    case actionTypes.ROULETTE_CHANGE_STEP:
      return rouletteChangeStep(state, action);
    default:
      return state;
  }
};
