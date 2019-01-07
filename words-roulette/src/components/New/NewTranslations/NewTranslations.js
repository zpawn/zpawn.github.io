import React from "react";
import PropTypes from "prop-types";

import NewTranslation from "./NewTranslation";

////

const newTranslations = ({ translations, disabled }) => {
  return !translations.length
    ? null
    : translations.map((t, index) => (
        <NewTranslation key={index} translation={t} disabled={disabled} />
      ));
};

newTranslations.defaultProps = {
  translations: [],
  disabled: false
};

newTranslations.propTypes = {
  translations: PropTypes.array,
  disabled: PropTypes.bool
};

export default newTranslations;
