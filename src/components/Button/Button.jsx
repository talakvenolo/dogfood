import s from './Button.module.css';
import cn from 'classnames';
import React from 'react';

const Button = ({type, children}) => {
  return (
      <button className={cn(s.button, {
          [s.primary]: type === 'primary',
          [s.secondary]: type === 'secondary',
      })}>
          {children}
      </button>
  )
};

export default Button;