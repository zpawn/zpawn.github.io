import React, { Component } from 'react';
import { Star } from '@material-ui/icons';

import ThemeProvider from './hoc/ThemeProvider';

////

class App extends Component {
    render() {
        return (
            <ThemeProvider>
                <header>
                    <h1>MyEnglish</h1>
                    <Star/>
                </header>
            </ThemeProvider>
        );
    }
}

export default App;
