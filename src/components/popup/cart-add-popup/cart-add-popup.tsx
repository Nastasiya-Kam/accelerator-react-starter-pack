import FocusTrap from 'focus-trap-react';
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { KeyCode, UserActivity } from '../../../const';
import { useOutsideClicker } from '../../../hooks/use-outside-clicker';
import { addToCart } from '../../../store/action';
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

  const handleEscKeyDown = useCallback((evt) => {
    if(evt.keyCode === KeyCode.Escape) {
      document.body.style.overflow = UserActivity.Scroll;
      onClick(false);
    }
  }, [ onClick ]);

  useEffect(() => {
    document.addEventListener(UserActivity.Keydown, handleEscKeyDown);
    return () => document.removeEventListener(UserActivity.Keydown, handleEscKeyDown);
  }, [ handleEscKeyDown ]);

  const handleAddToCardClick = () => {
    dispatch(addToCart(guitar));
    onClick(false);
    isAdded(true);
  };

  useOutsideClicker(wrapperRef, onClick);

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
