import React from 'react';
import { NavLink } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import DashboardIcon from '@material-ui/icons/Dashboard';

////

const navigationItems = () => (
    <List style={{ width: '250px' }}>
        <ListItem button component={NavLink} to='/'>
            <ListItemIcon><DashboardIcon/></ListItemIcon>
            <ListItemText primary='Dashboard'/>
        </ListItem>

        <ListItem button component={NavLink} to='/auth'>
            <ListItemIcon><AddIcon/></ListItemIcon>
            <ListItemText primary='Auth'/>
        </ListItem>
    </List>
);

export default navigationItems;
