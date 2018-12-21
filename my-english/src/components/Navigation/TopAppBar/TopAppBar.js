import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';

////

const topAppBar = ({ onClick }) => (
    <Toolbar>
        <IconButton color="inherit" aria-label="Menu" onClick={() => onClick(true)}>
            <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit">
            MyEnglish
        </Typography>
    </Toolbar>
);

topAppBar.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default topAppBar;
