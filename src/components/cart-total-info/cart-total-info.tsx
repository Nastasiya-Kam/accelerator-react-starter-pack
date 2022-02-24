import { useSelector } from 'react-redux';
import { DEFAULT_DISCOUNT } from '../../const';
import { getDiscountSumm, getSummOfGuitarsInCart } from '../../store/cart-data/selectors';
import { numberWithSpaces } from '../../utils/utils';

function CartTotalInfo():JSX.Element {
  const summ = useSelector(getSummOfGuitarsInCart);
  const discount = useSelector(getDiscountSumm);
  const discountSumm = summ - discount;

  return (
    <div className="cart__total-info">
      <p className="cart__total-item"><span className="cart__total-value-name">Всего:</span><span className="cart__total-value">{numberWithSpaces(summ)} ₽</span></p>
      <p className="cart__total-item">
        <span className="cart__total-value-name">Скидка:</span>
        {(discount === DEFAULT_DISCOUNT)
          ? <span className="cart__total-value">{`${discount} ₽`}</span>
          : <span className="cart__total-value cart__total-value--bonus">{`- ${discount} ₽`}</span>}
      </p>
      <p className="cart__total-item">
        <span className="cart__total-value-name">К оплате:</span>
        <span className="cart__total-value cart__total-value--payment">{numberWithSpaces(discountSumm)} ₽</span>
      </p>
      <button className="button button--red button--big cart__order-button">Оформить заказ</button>
    </div>
  );
}

export default CartTotalInfo;
