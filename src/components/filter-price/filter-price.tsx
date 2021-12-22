import { PriceFilter } from '../../const';
import { getMaxGuitarPrice, getMinGuitarPrice } from '../../store/guitars-data/selectors';
import { useSelector } from 'react-redux';
import { FormEvent, useRef, useState } from 'react';

function FilterPrice():JSX.Element {
  const minPrice = useSelector(getMinGuitarPrice);
  const maxPrice = useSelector(getMaxGuitarPrice);

  const [userMinPrice, setUserMinPrice] = useState<string>('');
  const [userMaxPrice, setUserMaxPrice] = useState<string>('');

  const minPriceRef = useRef(null);
  const maxPriceRef = useRef(null);

  const minPriceHandler = (evt: FormEvent<HTMLInputElement>) => {
    const price = evt.currentTarget.value;
    setUserMinPrice(price);
  };

  const maxPriceHandler = (evt: FormEvent<HTMLInputElement>) => {
    const price = evt.currentTarget.value;
    setUserMaxPrice(price);
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
          setUserMinPrice(String(minPrice));
        }

        if (min > maxPrice) {
          setUserMinPrice(String(maxPrice));
        }

        // TODO: мин значение не должно быть больше макс
        // if (min > max) {
        //   setUserMinPrice(userMaxPrice);
        // }
        break;
      case PriceFilter.To:
        if (max > maxPrice) {
          setUserMaxPrice(String(maxPrice));
        }

        if (max < maxPrice) {
          setUserMaxPrice(String(minPrice));
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
