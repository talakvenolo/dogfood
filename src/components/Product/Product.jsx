import React from 'react';
import s from './Product.module.css';
import {calcDiscountPrice, createMarkup, isLiked} from "../../utils/products";
import cn from "classnames";
import {ReactComponent as Save } from "./image/save.svg";
import truck from './image/truck.svg'
import quality from './image/quality.svg'
import {useNavigate} from "react-router-dom";

const Product = ({currentUser, _id, onProductLike, available, description, discount, price, name, pictures, likes}) => {
    const navigate = useNavigate();

    const discountPrice = calcDiscountPrice(price, discount);
    const liked = isLiked(likes, currentUser?._id);
    const descriptionHtml = createMarkup(description);
  return (
      <>
        <div>
            <a className="button-back" href="#" onClick={() => navigate(-1)}>Назад</a>
            <h1 className={s.productTitle}>{name}</h1>
            <div>
                <span>Артикул: <b>2388907</b></span>
            </div>
        </div>

          <div className={s.product}>
              <div className={s.imgWrapper}>
                  <img src={pictures} alt={`Изображение - ${name}`}/>
              </div>
              <div className={s.desc}>
                  <span className={discount !== 0  ? s.oldPrice : s.price}>{price}&nbsp;₽</span>
                  {discount !== 0 && <span className={cn(s.price, 'card__price_type_discount')}>{discountPrice}&nbsp;₽</span>}

                  <div className={s.btnWrap}>
                      <div className={s.left}>
                        <button className={s.minus}>-</button>
                          <span className={s.num}>0</span>
                        <button className={s.plus}>+</button>
                      </div>
                      <a href="#" className={cn('btn',  'btn_type_primary', s.cart)}>В корзину</a>
                  </div>

                  <button className={cn(s.favorite, {
                      [s.favoriteActive]: liked
                  })} onClick={onProductLike}>
                      <Save />
                      <span>{liked ? 'В избранном': 'В избранное'}</span>
                  </button>

                  <div className={s.delivery}>
                      <img src={truck} alt="truck" />
                      <div className={s.right}>
                          <h3 className={s.name}>Доставка по всему Миру!</h3>
                          <p className={s.text}>
                              Доставка курьером — <span className={s.bold}> от 399 ₽</span>
                          </p>
                      </div>
                  </div>

                  <div className={s.delivery}>
                      <img src={quality} alt="quality" />
                      <div className={s.right}>
                          <h3 className={s.name}>Гарантия качества</h3>
                          <p className={s.text}>
                              Если Вам не понравилось качество нашей продукции,
                              мы вернем деньги, либо сделаем все возможное,
                              чтобы удовлетворить ваши нужды.
                          </p>
                      </div>
                  </div>


              </div>
          </div>

          <div className={s.box}>
              <h2 className={s.title}>Описание</h2>
              <p className={s.subtitle} dangerouslySetInnerHTML={descriptionHtml} />
              <h2 className={s.title}>Характеристики</h2>
              <div className={s.grid}>
                  <div className={s.naming}>Вес</div>
                  <div className={s.description}>1 шт 120-200 грамм</div>
                  <div className={s.naming}>Цена</div>
                  <div className={s.description}>490 ₽ за 100 грамм</div>
                  <div className={s.naming}>Польза</div>
                  <div className={s.description}>
                      <p>Большое содержание аминокислот и микроэлементов оказывает положительное воздействие на общий обмен веществ собаки.</p>
                      <p>Способствуют укреплению десен и жевательных мышц.</p>
                      <p>Развивают зубочелюстной аппарат, отвлекают собаку во время смены зубов.</p>
                      <p>Имеет цельную волокнистую структуру, при разжевывание получается эффект зубной щетки, лучше всего очищает клыки собак.</p>
                      <p>Следует учесть высокую калорийность продукта.</p>
                  </div>
              </div>
          </div>
      </>
  );
};

export default Product;
