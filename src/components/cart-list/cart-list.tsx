import { useSelector } from 'react-redux';
import { getGuitarsInCart } from '../../store/cart-data/selectors';
import { GuitarCart } from '../../types/guitars';
import { getGuitarType, numberWithSpaces } from '../../utils/utils';
import CartItemQuantity from '../cart-item-quantity/cart-item-quantity';

type Props = {
  onGuitarClick: (a: GuitarCart) => void,
  onDeleteClick: (a: boolean) => void,
}

function CartList({onGuitarClick, onDeleteClick}: Props): JSX.Element {
  const guitarsInCart = useSelector(getGuitarsInCart);

  const handleDeleteClick = (guitar: GuitarCart) => {
    document.body.style.overflow = 'hidden';
    onGuitarClick(guitar);
    onDeleteClick(true);
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
              <button onClick={() => handleDeleteClick(guitarInCart)} className="cart-item__close-button button-cross" type="button" aria-label="Удалить">
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
              <CartItemQuantity guitarId={id} count={count} onClick={onGuitarClick} onDeleteClick={onDeleteClick} />
              <div className="cart-item__price-total">{numberWithSpaces(guitarsIdSumm)} ₽</div>
            </div>
          );
        })
      }
    </>
  );
}

export default CartList;
