import s from './Button.module.css';
import cn from 'classnames';
import React from 'react';
import {Link} from "react-router-dom";

const Button = ({type = 'primary', children, onClick, href, className, ...restProps}) => {
    if (href) {
        return (
            <Link to={href} className={cn(s.button, className, {
                [s.primary]: type === 'primary',
                [s.secondary]: type === 'secondary',
            })} {...restProps}>{children}</Link>
        )
    }
return (
<button className={cn(s.button, className, {
    [s.primary]: type === 'primary',
    [s.secondary]: type === 'secondary',
})} onClick={onClick} {...restProps}>
    {children}
</button>)
};

export default Button;
