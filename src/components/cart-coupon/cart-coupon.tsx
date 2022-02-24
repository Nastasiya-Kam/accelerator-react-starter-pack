import { FormEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postCouponAction } from '../../store/api-actions';
import { getCurrentCoupon } from '../../store/cart-data/selectors';

function CartCoupon():JSX.Element {
  const dispatch = useDispatch();
  const currentCoupon = useSelector(getCurrentCoupon);

  const [userCoupon, setUserCoupon] = useState<string>(currentCoupon);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isSubmited, setIsSubmited] = useState<boolean>(false);

  const userCouponRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (userCouponRef.current !== null) {
      dispatch(postCouponAction(userCouponRef.current.value, setIsSuccess, setIsSubmited));
    }
  };

  return (
    <div className="cart__coupon coupon">
      <h2 className="title title--little coupon__title">Промокод на скидку</h2>
      <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
      <form onSubmit={handleSubmit} className="coupon__form" id="coupon-form" method="post" action="/">
        <div className="form-input coupon__input">
          <label className="visually-hidden" htmlFor="coupon">Промокод</label>
          <input
            onChange={(evt) => setUserCoupon(evt.currentTarget.value)}
            value={userCoupon}
            ref={userCouponRef}
            type="text" placeholder="Введите промокод" id="coupon" name="coupon"
          />
          {(isSuccess) && <p className="form-input__message form-input__message--success">Промокод принят</p>}
          {(!isSuccess && isSubmited) && <p className="form-input__message form-input__message--error">Неверный промокод</p>}
        </div>
        <button className="button button--big coupon__button">Применить</button>
      </form>
    </div>
  );
}

export default CartCoupon;
