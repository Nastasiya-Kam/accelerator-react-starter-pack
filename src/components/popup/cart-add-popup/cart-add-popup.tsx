import FocusTrap from 'focus-trap-react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEscKeyDown } from '../../../hooks/use-esc-key-down';
import { useOutsideClicker } from '../../../hooks/use-outside-clicker';
import { addToCart, updateGuitar } from '../../../store/action';
import { getCurrentGuitarCount, getGuitarsInCart } from '../../../store/cart-data/selectors';
import { Guitar } from '../../../types/guitars';
import ButtonCross from '../../button-cross/button-cross';
import PopupInfo from '../../popup-info/popup-info';

type Props = {
  guitar: Guitar,
  onClick: (a: boolean) => void,
  isAdded: (a: boolean) => void,
}

function CartAddPopup({guitar, onClick, isAdded}: Props):JSX.Element {
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();
  const guitarsInCart = useSelector(getGuitarsInCart);
  const count = useSelector(getCurrentGuitarCount(guitar.id));

  useOutsideClicker(wrapperRef, onClick);
  useEscKeyDown(onClick);

  const handleAddToCardClick = () => {
    const guitarToAdd = {
      id: guitar.id,
      name: guitar.name,
      vendorCode: guitar.vendorCode,
      type: guitar.type,
      previewImg: guitar.previewImg,
      stringCount: guitar.stringCount,
      price: guitar.price,
      count: 1,
    };

    const isInCart = guitarsInCart.some((item) => item.id === guitarToAdd.id);

    if (isInCart) {
      dispatch(updateGuitar(guitarToAdd.id, (count + 1)));
    } else {
      dispatch(addToCart(guitarToAdd));
    }
    onClick(false);
    isAdded(true);
  };

  return (
    <FocusTrap>
      <div className="modal-cart--add">
        <div className="modal is-active">
          <div className="modal__wrapper">
            <div className="modal__overlay" data-close-modal></div>
            <div className="modal__content" ref={wrapperRef}>
              <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
              <PopupInfo guitar={guitar} />
              <div className="modal__button-container">
                <button onClick={() => handleAddToCardClick()} type="button" className="button button--red button--big modal__button modal__button--add">
                  Добавить в корзину
                </button>
              </div>
              <ButtonCross onClick={onClick} />
            </div>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default CartAddPopup;
