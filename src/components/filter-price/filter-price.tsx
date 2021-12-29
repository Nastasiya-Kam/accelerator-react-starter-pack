import { PriceFilter } from '../../const';
import { getMaxGuitarPrice, getMinGuitarPrice } from '../../store/guitars-data/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { FormEvent, useEffect, useRef } from 'react';
import { getMaxPrice, getMinPrice, getFilterTypes } from '../../store/user-data/selectors';
import { setMaxPrice, setMinPrice } from '../../store/action';
import { fetchFilterAction } from '../../store/api-actions';
import { getUserFilter } from '../../utils/filter';

function FilterPrice():JSX.Element {
  const minPrice = useSelector(getMinGuitarPrice);
  const maxPrice = useSelector(getMaxGuitarPrice);
  const userMinPrice = useSelector(getMinPrice);
  const userMaxPrice = useSelector(getMaxPrice);
  const userTypes = useSelector(getFilterTypes);

  const dispatch = useDispatch();

  const minPriceRef = useRef(null);
  const maxPriceRef = useRef(null);

  useEffect(() => {
    dispatch(fetchFilterAction(getUserFilter(userMinPrice, userMaxPrice, userTypes)));
  }, [userMinPrice, userMaxPrice, userTypes, dispatch]);

  const minPriceHandler = (evt: FormEvent<HTMLInputElement>) => {
    const price = evt.currentTarget.value;
    dispatch(setMinPrice(price));
  };

  const maxPriceHandler = (evt: FormEvent<HTMLInputElement>) => {
    const price = evt.currentTarget.value;
    dispatch(setMaxPrice(price));
  };

  const blurHandler = (evt: FormEvent<HTMLInputElement>) => {
    if (evt.currentTarget.value === '') {
      return;
    }

    const min = Number(userMinPrice);
    const max = Number(userMaxPrice);

    switch (evt.currentTarget.name) {
      case PriceFilter.From:
        if (min < minPrice) {
          dispatch(setMinPrice(String(minPrice)));
        }

        if (min > maxPrice) {
          dispatch(setMinPrice(String(maxPrice)));
        }

        // TODO: мин значение не должно быть больше макс
        // if (min > max) {
        //   setUserMinPrice(userMaxPrice);
        // }
        break;
      case PriceFilter.To:
        if (max > maxPrice) {
          dispatch(setMaxPrice(String(maxPrice)));
        }

        if (max < minPrice) {
          dispatch(setMaxPrice(String(minPrice)));
        }

        // TODO: макс значение не должно быть меньше мин
        // if (max < min) {
        //   setUserMinPrice(userMinPrice);
        // }
        break;
      default:
        break;
    }
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="form-input">
          <label className="visually-hidden">Минимальная цена</label>
          <input
            type="number"
            placeholder={minPrice.toString()}
            id="priceMin"
            name={PriceFilter.From}
            ref={minPriceRef}
            onChange={minPriceHandler}
            onBlur={blurHandler}
            value={userMinPrice}
          />
        </div>
        <div className="form-input">
          <label className="visually-hidden">Максимальная цена</label>
          <input
            type="number"
            placeholder={maxPrice.toString()}
            id="priceMax"
            name={PriceFilter.To}
            ref={maxPriceRef}
            onChange={maxPriceHandler}
            onBlur={blurHandler}
            value={userMaxPrice}
          />
        </div>
      </div>
    </fieldset>
  );
}

export default FilterPrice;
