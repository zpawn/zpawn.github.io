import React, { Component, Suspense } from 'react';
import { Router as BrowserRouter, NavLink } from 'react-router-dom';

import history from './history';
import Router from './Router';

////

class App extends Component {
    render() {
        return (
            <BrowserRouter history={history}>
                <Suspense fallback={<div>Loading...</div>}>
                    <ul>
                        <li>
                            <NavLink to='/'>Dashboard</NavLink>
                        </li>
                        <li>
                            <NavLink to='/auth'>Auth</NavLink>
                        </li>
                    </ul>
                    <Router/>
                </Suspense>
            </BrowserRouter>
        );
    }
}

export default App;
