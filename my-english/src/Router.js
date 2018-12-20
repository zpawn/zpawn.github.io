import React from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Auth from './components/Auth';

////

const router = () => (
    <Switch>
        <Route path="/auth" component={Auth}/>
        <Route path="/" exact component={Dashboard}/>
        <Redirect to="/"/>
    </Switch>
);

export default router;
