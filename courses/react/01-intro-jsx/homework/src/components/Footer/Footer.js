import React from 'react';
import Link from '../Link/Link';
import './Footer.css';

const Footer = () => (
    <footer className='footer'>
        <ul className='list-inline'>
            <li className='list-inline-item'>
                <Link href='#'>Про Google</Link>
            </li>
            <li className='list-inline-item'>
                <Link href='#'>Реклама</Link>
            </li>
            <li className='list-inline-item'>
                <Link href='#'>Для бізнесу</Link>
            </li>
            <li className='list-inline-item'>
                <Link href='#'>Як працює пошук</Link>
            </li>
        </ul>

        <ul>
            <li className='list-inline-item'>
                <Link href='#'>Конфіденційність</Link>
            </li>
            <li className='list-inline-item'>
                <Link href='#'>Умови</Link>
            </li>
            <li className='list-inline-item'>
                <Link href='#'>Налаштування</Link>
            </li>
        </ul>
    </footer>
);

export default Footer;
