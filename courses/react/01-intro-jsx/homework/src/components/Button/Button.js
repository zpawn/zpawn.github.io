import React from 'react';

/**
 * @param type {string} button|submit|reset
 * @param style {string} primary|secondary|success|danger|warning|info|light|dark|link
 * @param children {JSX.Element|string}
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const Button = ({ type = 'button', style = 'light', children, ...props }) => {
    let classNames = ['btn', `btn-${style}`];
    return (
        <button className={classNames.join(' ')} type={type} {...props}>{children}</button>
    )
};

export default Button;
