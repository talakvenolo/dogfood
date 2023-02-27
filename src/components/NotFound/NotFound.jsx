import React from 'react';
import s from './NotFound.module.css';
import notFound from './img/ic-notfound.svg';
import Button from "../../components/Button/Button";


const NotFound = ({ title, children, buttonText = "На главную", buttonAction, href }) => {
  return (
      <div className={s.notFound}>
        <img src={notFound} className={s.image} alt="Ничего не найдено" />
        <h1 className={s.title}>{title}</h1>
        {children && children}
          <Button className={s.button} onClick={buttonAction} type="secondary" href={href}>{buttonText}</Button>
      </div>
  );
};

export default NotFound;
