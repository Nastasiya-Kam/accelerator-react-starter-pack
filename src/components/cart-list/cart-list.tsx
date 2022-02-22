import { useSelector } from 'react-redux';
import { getGuitarsInCart } from '../../store/cart-data/selectors';
import { getGuitarType, numberWithSpaces } from '../../utils/utils';
import CartItemQuantity from '../cart-item-quantity/cart-item-quantity';

function CartList(): JSX.Element {
  const guitarsInCart = useSelector(getGuitarsInCart);

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
              <CartItemQuantity guitarId={id} count={count} />
              <div className="cart-item__price-total">{numberWithSpaces(guitarsIdSumm)} ₽</div>
            </div>
          );
        })
      }
    </>
  );
}

export default CartList;
