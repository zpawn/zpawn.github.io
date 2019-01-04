import React from "react";
import PropTypes from "prop-types";

import NewTranslate from "./NewTranslate";

////

const newTranslates = ({ translates, disabled }) => {
  return !translates.length
    ? null
    : translates.map((t, index) => (
        <NewTranslate key={index} translate={t} disabled={disabled} />
      ));
};

newTranslates.defaultProps = {
  translates: [],
  disabled: false
};

newTranslates.propTypes = {
  translates: PropTypes.array,
  disabled: PropTypes.bool
};

export default newTranslates;
