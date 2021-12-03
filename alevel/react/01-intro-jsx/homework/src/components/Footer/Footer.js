import React from 'react';
import Link from '../Link/Link';
import './Footer.css';

const Footer = () => (
    <footer className='footer'>
        <ul className='list-inline'>
            <li className='list-inline-item'>
                <Link href='#'>Всё о Google</Link>
            </li>
            <li className='list-inline-item'>
                <Link href='#'>Реклама</Link>
            </li>
            <li className='list-inline-item'>
                <Link href='#'>Для бизнеса</Link>
            </li>
            <li className='list-inline-item'>
                <Link href='#'>Как работает Google Поиск</Link>
            </li>
        </ul>

        <ul>
            <li className='list-inline-item'>
                <Link href='#'>Конфиденциальность</Link>
            </li>
            <li className='list-inline-item'>
                <Link href='#'>Условия</Link>
            </li>
            <li className='list-inline-item'>
                <Link href='#'>Настройки</Link>
            </li>
        </ul>
    </footer>
);

export default Footer;
