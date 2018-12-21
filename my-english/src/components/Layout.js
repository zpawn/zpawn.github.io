import React, { Component } from 'react';

import classes from './Layout.module.css';
import Router from './Router';
import Navigation from './Navigation';

////

class Layout extends Component {
    render () {
        return (
            <div className={classes.Layout}>
                <Navigation/>
                <main className={classes.Content}>
                    <Router/>
                </main>
            </div>
        )
    }
}

export default Layout;
