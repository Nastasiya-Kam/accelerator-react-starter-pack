import FocusTrap from 'focus-trap-react';
import { Guitar } from '../../../types/guitars';
import ButtonCross from '../../button-cross/button-cross';
import PopupInfo from '../../popup-info/popup-info';

type Props = {
  guitar: Guitar,
}

function CartDeletePopup({guitar}: Props):JSX.Element {
  return (
    <FocusTrap>
      <div className="modal-cart--delete">
        <div className="modal is-active">
          <div className="modal__wrapper">
            <div className="modal__overlay" data-close-modal></div>
            <div className="modal__content">
              <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
              <PopupInfo guitar={guitar} />
              <div className="modal__button-container">
                <button className="button button--small modal__button">Удалить товар</button>
                <button className="button button--black-border button--small modal__button modal__button--right">Продолжить покупки</button>
              </div>
              <ButtonCross />
            </div>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default CartDeletePopup;
