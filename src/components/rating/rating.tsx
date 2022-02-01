import { RATING } from '../../const';

type Props = {
  width: number,
  height: number,
  count: number,
}

function Rating({width, height, count}: Props): JSX.Element {
  return (
    <>
      {
        RATING.map((item, indexRating) => {
          const keyRating = `${indexRating}-${item}`;

          return (
            <svg key={keyRating} width={width} height={height} aria-hidden="true">
              <use xlinkHref={item <= count ? '#icon-full-star' : '#icon-star'} />
            </svg>
          );
        })
      }
    </>
  );
}

export default Rating;
