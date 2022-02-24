import CartTotalInfo from '../cart-total-info/cart-total-info';
import CartCoupon from '../cart-coupon/cart-coupon';

function CartFooter():JSX.Element {

  return (
    <div className="cart__footer">
      <CartCoupon />
      <CartTotalInfo />
    </div>
  );
}

export default CartFooter;
