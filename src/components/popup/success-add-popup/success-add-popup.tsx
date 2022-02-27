import FocusTrap from 'focus-trap-react';
import { useRef } from 'react';
import browserHistory from '../../../browser-history';
import { AppRoute, DEFAULT_PAGE, ReplacedPart, UserActivity } from '../../../const';
import { useEscKeyDown } from '../../../hooks/use-esc-key-down';
import { useOutsideClicker } from '../../../hooks/use-outside-clicker';
import ButtonCross from '../../button-cross/button-cross';

type Props = {
  onClick: (a: boolean) => void,
  isCatalogPage: boolean,
}

function SuccessAddPopup({onClick, isCatalogPage}: Props):JSX.Element {
  const wrapperRef = useRef(null);

  useOutsideClicker(wrapperRef, onClick);
  useEscKeyDown(onClick);

  const handleCloseClick = () => {
    onClick(false);
  };

  const handleToCartClick = () => {
    browserHistory.push(AppRoute.CartPage);
    document.body.style.overflow = UserActivity.Scroll;
    onClick(false);
  };

  const handleContinueShoppingClick = () => {
    document.body.style.overflow = UserActivity.Scroll;
    onClick(false);

    if (!isCatalogPage) {
      browserHistory.push(AppRoute.CatalogPage.replace(ReplacedPart.Page, `page_${DEFAULT_PAGE}`));
    }
  };

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
                <button className="button button--small modal__button" onClick={handleToCartClick}>Перейти в корзину</button>
                <button className="button button--black-border button--small modal__button modal__button--right" onClick={handleContinueShoppingClick}>Продолжить покупки</button>
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
