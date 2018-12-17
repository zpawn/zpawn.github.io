import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core/styles';

import { lightTheme } from '../themes';

////

const ThemeProvider = ({ children }) => (
    <MuiThemeProvider theme={lightTheme}>
        {children}
    </MuiThemeProvider>
);

ThemeProvider.propTypes = {
    children: PropTypes.element.isRequired
};

export default ThemeProvider;
