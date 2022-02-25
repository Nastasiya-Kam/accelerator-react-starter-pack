import { ChangeEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Count } from '../../const';
import { updateGuitar } from '../../store/action';
import { getGuitarById } from '../../store/cart-data/selectors';
import { GuitarCart, GuitarId } from '../../types/guitars';

type Props = {
  guitarId: GuitarId,
  count: number,
  onClick: (a: GuitarCart) => void,
  onDeleteClick: (a: boolean) => void,
}

function CartItemQuantity({guitarId, count, onClick, onDeleteClick}: Props):JSX.Element {
  const dispatch = useDispatch();
  const guitar = useSelector(getGuitarById(guitarId));
  const countRef = useRef(null);
  const [userCount, setUserCount] = useState<string>(String(count));

  const handleDecreaseClick = () => {
    if (count === Count.Min) {
      document.body.style.overflow = 'hidden';
      onDeleteClick(true);
      onClick(guitar);
      return;
    }

    setUserCount(String(count - 1));
    dispatch(updateGuitar(guitarId, count - 1));
  };

  const handleIncreaseClick = () => {
    if (count === Count.Max) {
      setUserCount(String(Count.Max));
      return;
    }

    setUserCount(String(count + 1));
    dispatch(updateGuitar(guitarId, count + 1));
  };

  const handleCountChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setUserCount(evt.currentTarget.value);
  };

  const handleInputBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    const pickedCount = Number(evt.currentTarget.value);
    if (pickedCount < Count.Min) {
      setUserCount(String(Count.Min));
      dispatch(updateGuitar(guitarId, Count.Min));
      return;
    }

    if (pickedCount > Count.Max) {
      setUserCount(String(Count.Max));
      dispatch(updateGuitar(guitarId, Count.Max));
      return;
    }

    setUserCount(String(pickedCount));
    dispatch(updateGuitar(guitarId, pickedCount));
  };

  return (
    <div className="quantity cart-item__quantity">
      <button onClick={handleDecreaseClick} className="quantity__button" aria-label="Уменьшить количество">
        <svg width="8" height="8" aria-hidden="true"><use xlinkHref="#icon-minus"></use></svg>
      </button>
      <input
        onChange={(evt) => handleCountChange(evt)}
        onBlur={handleInputBlur}
        ref={countRef}
        placeholder={String(count)}
        value={userCount}
        type="number"
        id="2-count"
        name="2-count"
        className="quantity__input"
        max="99"
      />
      <button onClick={handleIncreaseClick} className="quantity__button" aria-label="Увеличить количество">
        <svg width="8" height="8" aria-hidden="true"><use xlinkHref="#icon-plus"></use></svg>
      </button>
    </div>
  );
}

export default CartItemQuantity;
