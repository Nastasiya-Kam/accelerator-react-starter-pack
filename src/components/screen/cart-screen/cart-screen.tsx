import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute, DEFAULT_PAGE, ReplacedPart } from '../../../const';
import { getSummOfGuitarsInCart } from '../../../store/cart-data/selectors';
import { GuitarCart } from '../../../types/guitars';
import { numberWithSpaces } from '../../../utils/utils';
import CartList from '../../cart-list/cart-list';
import Footer from '../../footer/footer';
import Header from '../../header/header';
import CartDeletePopup from '../../popup/cart-delete-popup/cart-delete-popup';

function CartScreen(): JSX.Element {
  const summ = useSelector(getSummOfGuitarsInCart);
  const [currentGuitar, setCurrentGuitar] = useState<GuitarCart | null>(null);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  // const discount = 0;
  // const discountSumm = summ - discount;

  const isMain = false;

  return (
    <div className="wrapper">
      <Header isMain={isMain} />
      <main className="page-content">
        <div className="container">
          <h1 className="title title--bigger page-content__title">Корзина</h1>
          <ul className="breadcrumbs page-content__breadcrumbs page-content__breadcrumbs--on-cart-page">
            <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Root}>Главная</Link></li>
            <li className="breadcrumbs__item"><Link className="link" to={AppRoute.CatalogPage.replace(ReplacedPart.Page, `page_${DEFAULT_PAGE}`)}>Каталог</Link></li>
            <li className="breadcrumbs__item"><a className="link">Корзина</a></li>
          </ul>
          <div className="cart">
            <CartList onGuitarClick={setCurrentGuitar} onDeleteClick={setIsOpened} />
            <div className="cart__footer">
              <div className="cart__coupon coupon">
                <h2 className="title title--little coupon__title">Промокод на скидку</h2>
                <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
                <form className="coupon__form" id="coupon-form" method="post" action="/">
                  <div className="form-input coupon__input">
                    <label className="visually-hidden">Промокод</label>
                    <input type="text" placeholder="Введите промокод" id="coupon" name="coupon" />
                    <p className="form-input__message form-input__message--success">Промокод принят</p>
                  </div>
                  <button className="button button--big coupon__button">Применить</button>
                </form>
              </div>
              <div className="cart__total-info">
                <p className="cart__total-item"><span className="cart__total-value-name">Всего:</span><span className="cart__total-value">{numberWithSpaces(summ)} ₽</span></p>
                {/* //TODO тянем купон с сервера (проверяем введённый купон и вставляем значение скидки (рассчитанное)) */}
                <p className="cart__total-item"><span className="cart__total-value-name">Скидка:</span><span className="cart__total-value cart__total-value--bonus">- 3000 ₽</span></p>
                {/* //TODO сумма товаров - скидка */}
                <p className="cart__total-item"><span className="cart__total-value-name">К оплате:</span><span className="cart__total-value cart__total-value--payment">49 000 ₽</span></p>
                <button className="button button--red button--big cart__order-button">Оформить заказ</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer isMain={isMain} />
      {(isOpened && currentGuitar !== null) && <CartDeletePopup guitar={currentGuitar} onClick={setIsOpened} />}
    </div>
  );
}

export default CartScreen;
