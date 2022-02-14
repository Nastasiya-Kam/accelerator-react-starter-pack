import React, { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { KeyCode, RATINGS, UserActivity, UserForm } from '../../const';
import { useOutsideClicker } from '../../hooks/use-outside-clicker';
import { postCommentAction } from '../../store/api-actions';
import { getGuitarName } from '../../store/guitar-data/selectors';
import { CommentPost } from '../../types/comments';
import { GuitarId } from '../../types/guitars';
import ButtonCross from '../button-cross/button-cross';
import FocusTrap from 'focus-trap-react';
import { checkValidRating, checkValidText } from '../../utils/utils';

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
  const [isValidName, setValidName] = useState<boolean>(false);
  const [isValidComment, setValidComment] = useState<boolean>(false);
  const [isValidAdvantage, setValidAdvantage] = useState<boolean>(false);
  const [isValidDisadvantage, setValidDisadvantage] = useState<boolean>(false);
  const [isValidRating, setValidRating] = useState<boolean>(false);
  const [formValid, setFormValid] = useState<boolean>(false);

  const [dirtyAdvantage, setDirtyAdvantage] = useState<boolean>(false);
  const [dirtyDisadvantage, setDirtyDisadvantage] = useState<boolean>(false);
  const [dirtyComment, setDirtyComment] = useState<boolean>(false);
  const [dirtyName, setDirtyName] = useState<boolean>(false);

  const wrapperRef = useRef(null);

  const handleCloseClick = () => {
    document.body.style.overflow = UserActivity.Scroll;
    onClick(false);
  };

  const handleEscKeyDown = useCallback((evt) => {
    if(evt.keyCode === KeyCode.Escape) {
      document.body.style.overflow = UserActivity.Scroll;
      onClick(false);
    }
  }, [ onClick ]);

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const userRating = Number(evt.target.value);

    setValidRating(checkValidRating(userRating));
    setRating(userRating);
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const userText = evt.target.value;
    const currentInput = evt.target.id;

    switch (currentInput) {
      case UserForm.Advantage:
        setValidAdvantage(checkValidText(userText));
        setAdvantage(userText);
        break;
      case UserForm.Disadvantage:
        setValidDisadvantage(checkValidText(userText));
        setDisadvantage(userText);
        break;
      case UserForm.Comment:
        setValidComment(checkValidText(userText));
        setComment(userText);
        break;
      case UserForm.UserName:
        setValidName(checkValidText(userText));
        setUserName(userText);
        break;
    }
  };

  const handleInputBlur = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const currentInput = evt.target.id;

    switch (currentInput) {
      case UserForm.Advantage:
        setDirtyAdvantage(true);
        break;
      case UserForm.Disadvantage:
        setDirtyDisadvantage(true);
        break;
      case UserForm.Comment:
        setDirtyComment(true);
        break;
      case UserForm.UserName:
        setDirtyName(true);
        break;
    }
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) =>  {
    evt.preventDefault();

    if (formValid) {
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
    }
  };

  useEffect(() => {
    document.addEventListener(UserActivity.Keydown, handleEscKeyDown);
    return () => document.removeEventListener(UserActivity.Keydown, handleEscKeyDown);
  }, [ handleEscKeyDown ]);

  useEffect(() => {
    if (isValidName && isValidComment && isValidAdvantage && isValidDisadvantage && isValidRating) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [isValidName, isValidComment, isValidAdvantage, isValidDisadvantage, isValidRating]);

  useOutsideClicker(wrapperRef, onClick);

  return (
    <FocusTrap>
      <div className="modal is-active modal--review">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal></div>
          <div className="modal__content" ref={wrapperRef} data-testid="modal-content">
            <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
            <h3 className="modal__product-name title title--medium-20 title--uppercase">{name}</h3>
            <form className="form-review" onSubmit={(evt) => handleFormSubmit(evt)}>
              <div className="form-review__wrapper">
                <div className="form-review__name-wrapper">
                  <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
                  <input onChange={handleInputChange} onBlur={handleInputBlur} className="form-review__input form-review__input--name" id="user-name" type="text" autoComplete="off" />
                  <span className="form-review__warning" data-testid="name-error">{(!isValidName && dirtyName) ? 'Заполните поле' : ''}</span>
                </div>
                <div>
                  <span className="form-review__label form-review__label--required">Ваша Оценка</span>
                  <div className="rate rate--reverse">
                    {
                      RATINGS.map((item) => {
                        const key = `rating-${item.rate}`;

                        return (
                          <React.Fragment key={key}>
                            <input onChange={(evt) => handleRatingChange(evt)} className="visually-hidden" type="radio" id={`star-${item.rate}`} name="rate" value={item.rate} />
                            <label className="rate__label" htmlFor={`star-${item.rate}`} title={item.title} />
                          </React.Fragment>
                        );
                      })
                    }
                    <span className="rate__count"></span>
                    {(!isValidRating) && <span className="rate__message">Поставьте оценку</span>}
                  </div>
                </div>
              </div>
              <label className="form-review__label" htmlFor="advantage">Достоинства</label>
              <input onChange={handleInputChange} onBlur={handleInputBlur} className="form-review__input" id="advantage" type="text" autoComplete="off" />
              <span className="form-review__warning" data-testid="advantage-error">{(!isValidAdvantage && dirtyAdvantage) ? 'Заполните поле' : ''}</span>
              <label className="form-review__label" htmlFor="disadvantage">Недостатки</label>
              <input onChange={handleInputChange} onBlur={handleInputBlur} className="form-review__input" id="disadvantage" type="text" autoComplete="off"/>
              <span className="form-review__warning" data-testid="disadvantage-error">{(!isValidDisadvantage && dirtyDisadvantage) ? 'Заполните поле' : ''}</span>
              <label className="form-review__label" htmlFor="comment">Комментарий</label>
              <textarea onChange={handleInputChange} onBlur={handleInputBlur} className="form-review__input form-review__input--textarea" id="comment" rows={10} autoComplete="off"></textarea>
              <span className="form-review__warning" data-testid="comment-error">{(!isValidComment && dirtyComment) ? 'Заполните поле' : ''}</span>
              <button className="button button--medium-20 form-review__button" type="submit" disabled={!formValid}>Отправить отзыв</button>
            </form>
            <ButtonCross onClick={handleCloseClick} />
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default ReviewPopup;
