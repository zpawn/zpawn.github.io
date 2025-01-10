import React from 'react';
import Search from '../Search/Search';
import logo from '../../images/google.png';
import './Content.css';

const Content = () => (
    <main className='content'>
        <div style={{ textAlign: 'center' }}>
            <img src={logo} alt="" style={{ width: '80%', height: 'auto' }}/>
            <Search/>
        </div>
    </main>
);

export default Content;
