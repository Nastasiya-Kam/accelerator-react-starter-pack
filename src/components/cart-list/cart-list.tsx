import { useDispatch, useSelector } from 'react-redux';
import { decreaseGuitar, updateGuitar } from '../../store/action';
import { getGuitarsInCart } from '../../store/cart-data/selectors';
import { GuitarCart } from '../../types/guitars';
import { getGuitarType, numberWithSpaces } from '../../utils/utils';

function CartList(): JSX.Element {
  const guitarsInCart = useSelector(getGuitarsInCart);
  const dispatch = useDispatch();

  const handleDecreaseClick = (item: GuitarCart) => {
    dispatch(decreaseGuitar(item));
  };

  const handleIncreaseClick = (item: GuitarCart) => {
    dispatch(updateGuitar(item));
  };

  return (
    <>
      {
        guitarsInCart.map((guitarInCart) => {
          const { id, name, vendorCode, type, previewImg, stringCount, price, count } = guitarInCart;
          const guitarsIdSumm = count * price;
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
                <button onClick={() => handleDecreaseClick(guitarInCart)} className="quantity__button" aria-label="Уменьшить количество">
                  <svg width="8" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-minus"></use>
                  </svg>
                </button>
                <input className="quantity__input" type="number" placeholder={String(count)} id="2-count" name="2-count" max="99" />
                <button onClick={() => handleIncreaseClick(guitarInCart)} className="quantity__button" aria-label="Увеличить количество">
                  <svg width="8" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-plus"></use>
                  </svg>
                </button>
              </div>
              <div className="cart-item__price-total">{numberWithSpaces(guitarsIdSumm)} ₽</div>
            </div>
          );
        })
      }
    </>
  );
}

export default CartList;
