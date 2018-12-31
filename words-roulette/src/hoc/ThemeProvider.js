import React from "react";
import PropTypes from "prop-types";
import { MuiThemeProvider } from "@material-ui/core/styles";

import { lightTheme, darkTheme } from "../themes";

////

const ThemeProvider = ({ type, children }) => (
  <MuiThemeProvider theme={type === "dark" ? darkTheme : lightTheme}>
    {children}
  </MuiThemeProvider>
);

ThemeProvider.propTypes = {
  type: PropTypes.oneOf(["light", "dark"]).isRequired,
  children: PropTypes.element.isRequired
};

ThemeProvider.defaultProps = {
  type: "light"
};

export default ThemeProvider;
