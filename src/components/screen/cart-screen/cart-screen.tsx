import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute, DEFAULT_PAGE, ReplacedPart } from '../../../const';
import { getGuitarsInCart } from '../../../store/cart-data/selectors';
import { getGuitarType, numberWithSpaces } from '../../../utils/utils';
import Footer from '../../footer/footer';
import Header from '../../header/header';

function CartScreen(): JSX.Element {
  const guitarsInCart = useSelector(getGuitarsInCart);

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
            {
              guitarsInCart.map((guitarInCart) => {
                const { id, name, previewImg, price, vendorCode, stringCount, type } = guitarInCart;
                const key = `guitarInCart-${id}`;

                return (
                  <div key={key} className="cart-item">
                    <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить">
                      <span className="button-cross__icon"></span><span className="cart-item__close-button-interactive-area"></span>
                    </button>
                    <div className="cart-item__image">
                      <img src={previewImg.replace('img', 'img/content')} width="55" height="130" alt={name} />
                    </div>
                    <div className="product-info cart-item__info">
                      <p className="product-info__title">{name}</p>
                      <p className="product-info__info">Артикул: {vendorCode}</p>
                      <p className="product-info__info">{getGuitarType(type)}, {stringCount} струнная</p>
                    </div>
                    <div className="cart-item__price">{numberWithSpaces(price)} ₽</div>
                    <div className="quantity cart-item__quantity">
                      <button className="quantity__button" aria-label="Уменьшить количество">
                        <svg width="8" height="8" aria-hidden="true">
                          <use xlinkHref="#icon-minus"></use>
                        </svg>
                      </button>
                      <input className="quantity__input" type="number" placeholder="1" id="2-count" name="2-count" max="99" />
                      <button className="quantity__button" aria-label="Увеличить количество">
                        <svg width="8" height="8" aria-hidden="true">
                          <use xlinkHref="#icon-plus"></use>
                        </svg>
                      </button>
                    </div>
                    {/* //TODO Формула для подсчёта суммы ТИПА гитары, находящейся в корзине ТУТ */}
                    <div className="cart-item__price-total">17 500 ₽</div>
                  </div>
                );
              })
            }
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
                <p className="cart__total-item"><span className="cart__total-value-name">Всего:</span><span className="cart__total-value">52 000 ₽</span></p>
                <p className="cart__total-item"><span className="cart__total-value-name">Скидка:</span><span className="cart__total-value cart__total-value--bonus">- 3000 ₽</span></p>
                <p className="cart__total-item"><span className="cart__total-value-name">К оплате:</span><span className="cart__total-value cart__total-value--payment">49 000 ₽</span></p>
                <button className="button button--red button--big cart__order-button">Оформить заказ</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer isMain={isMain} />
      {/* {(isOpened && guitar?.id !== undefined) && <ReviewPopup onClick={setIsOpened} guitarId={guitar.id} isSuccess={setIsSuccess} />} */}
      {/* {(!isOpened && isSuccess) && <SuccessReviewPopup onClick={setIsSuccess} />} */}
    </div>
  );
}

export default CartScreen;
