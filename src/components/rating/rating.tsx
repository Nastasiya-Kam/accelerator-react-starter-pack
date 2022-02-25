import { RATINGS } from '../../const';

type Props = {
  width: number,
  height: number,
  count: number,
}

function Rating({width, height, count}: Props): JSX.Element {
  return (
    <>
      {
        RATINGS.map((item) => {
          const keyRating = `rating-star-${item}`;

          return (
            <svg key={keyRating} data-testid={`star-${item}`} width={width} height={height} aria-hidden="true">
              <use xlinkHref={item <= count ? '#icon-full-star' : '#icon-star'} />
            </svg>
          );
        })
      }
    </>
  );
}

export default Rating;
