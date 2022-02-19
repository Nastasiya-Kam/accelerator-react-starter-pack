import { useSelector } from 'react-redux';
import { getCountOfGuitarsIdInCart, getUniqueGuitarsInCart } from '../../store/cart-data/selectors';
import { getGuitarType, numberWithSpaces } from '../../utils/utils';

function CartList(): JSX.Element {
  const uniqueGuitars = useSelector(getUniqueGuitarsInCart);
  const countOfGuitarsId = useSelector(getCountOfGuitarsIdInCart);

  return (
    <>
      {
        uniqueGuitars.map((guitarInCart) => {
          const { id, name, vendorCode, type, previewImg, stringCount, price } = guitarInCart;
          const key = `guitarInCart-${id}`;

          const countOfGuitarId = countOfGuitarsId.filter((item) => item.id === guitarInCart.id)[0];
          const guitarsIdSumm = countOfGuitarId.count * price;

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
                <input className="quantity__input" type="number" placeholder={String(countOfGuitarId.count)} id="2-count" name="2-count" max="99" />
                <button className="quantity__button" aria-label="Увеличить количество">
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
