import { RENDER_COMMENTS_COUNT } from '../../const';

type Props = {
  renderedCommentsCount: number,
  onClick: (a: number) => void;
}

function ReviewMore({renderedCommentsCount, onClick}: Props): JSX.Element {
  return (

    <button
      className="button button--medium reviews__more-button"
      type="button"
      onClick={() => onClick(renderedCommentsCount + RENDER_COMMENTS_COUNT)}
    >
      Показать еще отзывы
    </button>
  );
}

export default ReviewMore;
