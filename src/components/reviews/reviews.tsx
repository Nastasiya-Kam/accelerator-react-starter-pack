import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ratingSize } from '../../const';
import { fetchCommentsAction } from '../../store/api-actions';
import { getComments, getCommentsLoadingStatus } from '../../store/guitar-data/selectors';
import { GuitarId } from '../../types/guitars';
import Rating from '../rating/rating';

type Props = {
  guitarId: GuitarId,
}

function Reviews({guitarId}: Props): JSX.Element {
  const comments = useSelector(getComments);
  const isCommentsLoading = useSelector(getCommentsLoadingStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCommentsAction(guitarId));
  }, [ guitarId, dispatch ]);

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3><a className="button button--red-border button--big reviews__sumbit-button" href="#">Оставить отзыв</a>

      {
        (isCommentsLoading)
          ? <p className="review__title">Комментарии загружаются...</p>
          : comments?.map((item) => {
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
      <button className="button button--medium reviews__more-button">Показать еще отзывы</button><a className="button button--up button--red-border button--big reviews__up-button" href="#header">Наверх</a>
    </section>
  );
}

export default Reviews;
