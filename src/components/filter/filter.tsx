import { PriceFilter, STRINGS_COUNT, TYPE_GUITARS } from '../../const';
import { getMaxGuitarPrice, getMinGuitarPrice } from '../../store/guitars-data/selectors';
import { useSelector } from 'react-redux';
import { FormEvent, useRef, useState } from 'react';

function Filter():JSX.Element {
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
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
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
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>

        {
          TYPE_GUITARS.map((guitar, index) => {
            const key = `${index}-${guitar}`;
            // TODO: продумать checked. По умолчанию не расставлены.
            // TODO: при обновлении сбрасывается?
            return (
              <div key={key} className="form-checkbox catalog-filter__block-item">
                <input className="visually-hidden" type="checkbox" id="acoustic" name="acoustic" />
                <label htmlFor="acoustic">{guitar}</label>
              </div>
            );
          })
        }
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        {
          STRINGS_COUNT.map((stringCount, index) => {
            const key = `${index}-${stringCount}`;

            // TODO: каждый тип гитары отличается по количеству струн
            return (
              <div key={key} className="form-checkbox catalog-filter__block-item">
                <input className="visually-hidden" type="checkbox" id={`${stringCount}-strings`} name={`${stringCount}-strings`} />
                <label htmlFor={`${stringCount}-strings`}>{stringCount}</label>
              </div>
            );
          })
        }
      </fieldset>
    </form>
  );
}

export default Filter;
