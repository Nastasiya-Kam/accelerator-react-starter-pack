import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { ESC_KEY_CODE, UserActivity } from '../../const';
import { useOutsideClicker } from '../../hooks/use-outside-alerter';
import { getGuitarName } from '../../store/guitar-data/selectors';

type Props = {
  onClick: (a: boolean) => void,
}

function ReviewPopup({onClick}: Props): JSX.Element {
  const name = useSelector(getGuitarName);

  const handleCloseClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
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

  const wrapperRef = useRef(null);
  useOutsideClicker(wrapperRef, onClick);

  return (
    <div className="modal is-active modal--review">
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal></div>
        <div className="modal__content" ref={wrapperRef}>
          <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
          <h3 className="modal__product-name title title--medium-20 title--uppercase">{name}</h3>
          <form className="form-review">
            <div className="form-review__wrapper">
              <div className="form-review__name-wrapper">
                <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
                <input className="form-review__input form-review__input--name" id="user-name" type="text" autoComplete="off" />
                <span className="form-review__warning">Заполните поле</span>
              </div>
              <div>
                <span className="form-review__label form-review__label--required">Ваша Оценка</span>
                <div className="rate rate--reverse">
                  {/* //TODO цикл по массиву [ {rate: 5, title: 'Отлично'}, {rate: 4, title: 'Хорошо'}, {rate: 3, title: 'Нормально'}, {rate: 2, title: 'Плохо'}, {rate: 1, title: 'Ужасно'} ] */}
                  <input className="visually-hidden" type="radio" id="star-5" name="rate" value="5" />
                  <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                  <input className="visually-hidden" type="radio" id="star-4" name="rate" value="4" />
                  <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                  <input className="visually-hidden" type="radio" id="star-3" name="rate" value="3" />
                  <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                  <input className="visually-hidden" type="radio" id="star-2" name="rate" value="2" />
                  <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                  <input className="visually-hidden" type="radio" id="star-1" name="rate" value="1" />
                  <label className="rate__label" htmlFor="star-1" title="Ужасно"></label><span className="rate__count"></span><span className="rate__message">Поставьте оценку</span>
                </div>
              </div>
            </div>
            <label className="form-review__label" htmlFor="user-name">Достоинства</label>
            <input className="form-review__input" id="pros" type="text" autoComplete="off" />
            <label className="form-review__label" htmlFor="user-name">Недостатки</label>
            <input className="form-review__input" id="user-name" type="text" autoComplete="off" />
            <label className="form-review__label" htmlFor="user-name">Комментарий</label>
            <textarea className="form-review__input form-review__input--textarea" id="user-name" rows={10} autoComplete="off"></textarea>
            <button className="button button--medium-20 form-review__button" type="submit">Отправить отзыв</button>
          </form>
          <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={(evt) => handleCloseClick(evt)}>
            <span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewPopup;
