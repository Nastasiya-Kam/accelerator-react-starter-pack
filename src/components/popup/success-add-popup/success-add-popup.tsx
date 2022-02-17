import FocusTrap from 'focus-trap-react';
import { useCallback, useEffect, useRef } from 'react';
import browserHistory from '../../../browser-history';
import { AppRoute, KeyCode, UserActivity } from '../../../const';
import { useOutsideClicker } from '../../../hooks/use-outside-clicker';
import ButtonCross from '../../button-cross/button-cross';

type Props = {
  onClick: (a: boolean) => void,
}

function SuccessAddPopup({onClick}: Props):JSX.Element {
  const wrapperRef = useRef(null);

  useOutsideClicker(wrapperRef, onClick);

  const handleCloseClick = () => {
    onClick(false);
  };

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

  return (
    <FocusTrap>
      <div className="modal-success--add">
        <div className="modal is-active modal--success">
          <div className="modal__wrapper">
            <div className="modal__overlay" data-close-modal></div>
            <div className="modal__content" ref={wrapperRef}>
              <svg className="modal__icon" width="26" height="20" aria-hidden="true">
                <use xlinkHref="#icon-success"></use>
              </svg>
              <p className="modal__message">Товар успешно добавлен в корзину</p>
              <div className="modal__button-container modal__button-container--add">
                <button className="button button--small modal__button" onClick={() => browserHistory.push(AppRoute.CartPage)}>Перейти в корзину</button>
                {/* //TODO Гитара: По клику `Продолжить покупки` пользователь перенаправляется в Каталог.
                                По клику на “Х” попап  “Товар успешно добавлен” закрывается и пользователь остается на странице Карточки товара
                        Каталог: По клику Продолжить покупки попап закрывается и пользователь остается в Каталоге*/}
                <button className="button button--black-border button--small modal__button modal__button--right">Продолжить покупки</button>
              </div>
              <ButtonCross onClick={handleCloseClick} />
            </div>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default SuccessAddPopup;
