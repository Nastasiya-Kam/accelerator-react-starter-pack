import { useCallback, useEffect, useRef } from 'react';
import { ESC_KEY_CODE, UserActivity } from '../../const';
import { useOutsideClicker } from '../../hooks/use-outside-clicker';
import ButtonCross from '../button-cross/button-cross';
import FocusTrap from 'focus-trap-react';

type Props = {
  onClick: (a: boolean) => void,
}

function SuccessReviewPopup({onClick}: Props): JSX.Element {
  const wrapperRef = useRef(null);

  useOutsideClicker(wrapperRef, onClick);

  const handleCloseClick = () => {
    document.body.style.overflow = UserActivity.Scroll;
    onClick(false);
  };

  const handleEscKeyDown = useCallback((evt) => {
    if(evt.keyCode === ESC_KEY_CODE) {
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
      <div className="modal-success--review">
        <div className="modal is-active modal--success">
          <div className="modal__wrapper">
            <div className="modal__overlay" data-close-modal></div>
            <div className="modal__content" ref={wrapperRef}>
              <svg className="modal__icon" width="26" height="20" aria-hidden="true">
                <use xlinkHref="#icon-success"></use>
              </svg>
              <p className="modal__message">Спасибо за ваш отзыв!</p>
              <div className="modal__button-container modal__button-container--review">
                <button onClick={handleCloseClick} className="button button--small modal__button modal__button--review">К покупкам!</button>
              </div>
              <ButtonCross onClick={handleCloseClick} />
            </div>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default SuccessReviewPopup;
