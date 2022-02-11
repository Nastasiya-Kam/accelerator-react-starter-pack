import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ratingSize, RENDER_COMMENTS_COUNT } from '../../const';
import { getCommentsSortedByDate } from '../../store/guitar-data/selectors';
import Rating from '../rating/rating';
import ReviewMore from '../review-more/review-more';

type Props = {
  onClick: (a: boolean) => void,
}

function Reviews({onClick}: Props): JSX.Element {
  const comments = useSelector(getCommentsSortedByDate);

  const [renderedCommentsCount, setRenderedCommentsCount] = useState<number>(RENDER_COMMENTS_COUNT);

  const handleButtonUpClick = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    evt.preventDefault();
    window.scrollTo(0, 0);
  };

  const handleLeaveReviewClick = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    evt.preventDefault();
    document.body.style.overflow = 'hidden';
    onClick(true);
  };

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <a className="button button--red-border button--big reviews__sumbit-button" onClick={(evt) => handleLeaveReviewClick(evt)} >
        Оставить отзыв
      </a>

      {
        (comments !== undefined && comments.length === 0)
          ? <p className="review__value">Комментарии ещё никто не оставил. Ваш будет первым</p>
          : comments?.slice(0, renderedCommentsCount).map((item) => {
            const { id, userName, advantage, disadvantage, comment, rating, createAt } = item;
            const keyComment = `comment-id-${id}`;

            const commentDate = new Intl.DateTimeFormat('ru', {
              month: 'long',
              day: 'numeric',
            }).format(new Date(createAt));

            return (
              <div key={keyComment} className="review">
                <div className="review__wrapper">
                  <h4 className="review__title review__title--author title title--lesser">{userName}</h4><span className="review__date">{commentDate}</span>
                </div>
                <div className="rate review__rating-panel" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
                  <Rating width={ratingSize.review.width} height={ratingSize.review.height} count={rating} />
                  <span className="rate__count"></span><span className="rate__message"></span>
                </div>
                <h4 className="review__title title title--lesser">Достоинства:</h4>
                <p className="review__value">{advantage}</p>
                <h4 className="review__title title title--lesser">Недостатки:</h4>
                <p className="review__value">{disadvantage}</p>
                <h4 className="review__title title title--lesser">Комментарий:</h4>
                <p className="review__value">{comment}</p>
              </div>
            );
          })
      }
      {(comments !== undefined && comments.length > renderedCommentsCount) && <ReviewMore renderedCommentsCount={renderedCommentsCount} onClick={setRenderedCommentsCount} />}
      <a className="button button--up button--red-border button--big reviews__up-button" href="#header" onClick={(evt) => handleButtonUpClick(evt)}>Наверх</a>
    </section>
  );
}

export default Reviews;
