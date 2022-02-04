/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ESC_KEY_CODE, RATINGS, UserActivity } from '../../const';
import { useOutsideClicker } from '../../hooks/use-outside-clicker';
import { postCommentAction } from '../../store/api-actions';
import { getGuitarId, getGuitarName } from '../../store/guitar-data/selectors';
import { CommentPost } from '../../types/comments';
import { GuitarId } from '../../types/guitars';

const enum UserForm {
  UserName = 'user-name',
  Advantage = 'advantage',
  Disadvantage = 'disadvantage',
  Comment = 'comment',
}

type Props = {
  guitarId: GuitarId,
  onClick: (a: boolean) => void,
  isSuccess: (a: boolean) => void,
}

function ReviewPopup({guitarId, onClick, isSuccess}: Props): JSX.Element {
  const name = useSelector(getGuitarName);
  const dispatch = useDispatch();

  const [userName, setUserName] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [advantage, setAdvantage] = useState<string>('');
  const [disadvantage, setDisadvantage] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  // TODO имя и рейтинг = обязательны к заполнению
  // const [isValidName, setValidName] = useState<boolean>(false);
  // const [isValidRating, setValidRating] = useState<boolean>(false);

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

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(evt.target.value));
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const userText = evt.target.value;
    const currentInput = evt.target.id;

    switch (currentInput) {
      case UserForm.Advantage:
        setAdvantage(userText);
        break;
      case UserForm.Disadvantage:
        setDisadvantage(userText);
        break;
      case UserForm.Comment:
        setComment(userText);
        break;
      case UserForm.UserName:
        setUserName(userText);
        break;
    }
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) =>  {
    evt.preventDefault();

    const review: CommentPost = {
      guitarId: guitarId,
      userName: userName,
      advantage: advantage,
      disadvantage: disadvantage,
      comment: comment,
      rating: rating,
    };

    dispatch(postCommentAction(review, isSuccess));
    onClick(false);
  };

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
          <form className="form-review" onSubmit={(evt) => handleFormSubmit(evt)}>
            <div className="form-review__wrapper">
              <div className="form-review__name-wrapper">
                <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
                <input onChange={handleInputChange} className="form-review__input form-review__input--name" id="user-name" type="text" autoComplete="off" />
                {/* //TODO появляется только если не заполнено поле имя */}
                <span className="form-review__warning">Заполните поле</span>
              </div>
              <div>
                <span className="form-review__label form-review__label--required">Ваша Оценка</span>
                <div className="rate rate--reverse">
                  {
                    RATINGS.map((item) => {
                      const key = `rating-${item.rate}`;

                      return (
                        <React.Fragment key={key}>
                          <input className="visually-hidden" type="radio" id={`star-${item.rate}`} name="rate" value={item.rate} onChange={(evt) => handleRatingChange(evt)} />
                          <label className="rate__label" htmlFor={`star-${item.rate}`} title={item.title} />
                        </React.Fragment>
                      );
                    })
                  }
                  <span className="rate__count"></span>
                  {/* //TODO появляется только если не проставлен рейтинг */}
                  <span className="rate__message">Поставьте оценку</span>
                </div>
              </div>
            </div>
            <label className="form-review__label" htmlFor="advantage">Достоинства</label>
            <input onChange={handleInputChange} className="form-review__input" id="advantage" type="text" autoComplete="off" />
            <label className="form-review__label" htmlFor="disadvantage">Недостатки</label>
            <input onChange={handleInputChange} className="form-review__input" id="disadvantage" type="text" autoComplete="off"/>
            <label className="form-review__label" htmlFor="comment">Комментарий</label>
            <textarea onChange={handleInputChange} className="form-review__input form-review__input--textarea" id="comment" rows={10} autoComplete="off"></textarea>
            <button className="button button--medium-20 form-review__button" type="submit">Отправить отзыв</button>
          </form>
          <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={handleCloseClick}>
            <span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewPopup;
