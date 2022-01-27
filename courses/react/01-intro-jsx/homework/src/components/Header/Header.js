import React from 'react';
import Link from '../Link/Link';
import Button from '../Button/Button';
import './Header.css';

const Header = () => (
    <header className='header'>
        <nav>
            <ul className='list-inline'>
                <li className='list-inline-item'><Link href='#'>Почта</Link></li>
                <li className='list-inline-item'><Link href='#'>Картинки</Link></li>
                <li className='list-inline-item'><Button><i className='bi-three-dots-vertical'/></Button></li>
            </ul>
        </nav>
    </header>
)

export default Header;
