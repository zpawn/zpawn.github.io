import React from "react";
import PropTypes from "prop-types";

import Translation from "./Translation";

////

const translations = ({ translations, disabled }) => {
  return !translations.length
    ? null
    : translations.map((t, index) => (
        <Translation key={index} translation={t} disabled={disabled} />
      ));
};

translations.defaultProps = {
  translations: [],
  disabled: false
};

translations.propTypes = {
  translations: PropTypes.array,
  disabled: PropTypes.bool
};

export default translations;
