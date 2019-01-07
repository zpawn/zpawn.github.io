const actionTypes = {
  ROULETTE_SETTINGS_CHANGE: "ROULETTE_SETTINGS_CHANGE"
};

const rouletteSettingsChange = (name, value) => ({
  type: actionTypes.ROULETTE_SETTINGS_CHANGE,
  name,
  value
});

////

export { actionTypes, rouletteSettingsChange };
