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

const rouletteInit = settings => dispatch => {
  dispatch(rouletteInitialized({}));
};

////

export { actionTypes, rouletteInit, rouletteChangeStep };
