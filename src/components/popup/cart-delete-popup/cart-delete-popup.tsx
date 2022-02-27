import FocusTrap from 'focus-trap-react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { UserActivity } from '../../../const';
import { useEscKeyDown } from '../../../hooks/use-esc-key-down';
import { useOutsideClicker } from '../../../hooks/use-outside-clicker';
import { deleteGuitar } from '../../../store/action';
import { Guitar, GuitarCart } from '../../../types/guitars';
import ButtonCross from '../../button-cross/button-cross';
import PopupInfo from '../../popup-info/popup-info';

type Props = {
  guitar: Guitar | GuitarCart,
  onClick: (a: boolean) => void,
}

function CartDeletePopup({guitar, onClick}: Props):JSX.Element {
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();

  useOutsideClicker(wrapperRef, onClick);
  useEscKeyDown(onClick);

  const handleDeleteClick = () => {
    dispatch(deleteGuitar(guitar.id));
    document.body.style.overflow = UserActivity.Scroll;
    onClick(false);
  };

  const handleCloseClick = () => {
    document.body.style.overflow = UserActivity.Scroll;
    onClick(false);
  };

  return (
    <FocusTrap>
      <div className="modal-cart--delete">
        <div className="modal is-active">
          <div className="modal__wrapper">
            <div className="modal__overlay" data-close-modal></div>
            <div className="modal__content" ref={wrapperRef}>
              <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
              <PopupInfo guitar={guitar} />
              <div className="modal__button-container">
                <button onClick={handleDeleteClick} className="button button--small modal__button">Удалить товар</button>
                <button onClick={handleCloseClick} className="button button--black-border button--small modal__button modal__button--right">Продолжить покупки</button>
              </div>
              <ButtonCross onClick={onClick} />
            </div>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default CartDeletePopup;
