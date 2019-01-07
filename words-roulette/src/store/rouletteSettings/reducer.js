import { actionTypes } from "./index";

const INIT_STATE = {
  count: 5
};

const rouletteSettingsChange = (state, { name, value }) => ({
  ...state,
  [name]: value
});

////

export const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case actionTypes.ROULETTE_SETTINGS_CHANGE:
      return rouletteSettingsChange(state, action);
    default:
      return state;
  }
};
