import { DEFAULT_PAGE, PaginationPage, PriceFilter } from '../../const';
import { getFirstMaxPrice, getFirstMinPrice } from '../../store/guitars-data/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { FormEvent, useRef, useState } from 'react';
import { getMaxPrice, getMinPrice } from '../../store/user-data/selectors';
import { setCurrentPage, setFilterMaxPrice, setFilterMinPrice, setFirstPage, setLastPage } from '../../store/action';
import { checkMaxPrice, checkMinPrice } from '../../utils/utils';

function FilterPrice():JSX.Element {
  const [priceMin, setPriceMin] = useState<string>('');
  const [priceMax, setPriceMax] = useState<string>('');

  const minPrice = useSelector(getFirstMinPrice);
  const maxPrice = useSelector(getFirstMaxPrice);
  const userMinPrice = useSelector(getMinPrice);
  const userMaxPrice = useSelector(getMaxPrice);
  const dispatch = useDispatch();

  const minPriceRef = useRef(null);
  const maxPriceRef = useRef(null);

  const blurHandler = (evt: FormEvent<HTMLInputElement>) => {
    if (evt.currentTarget.value === '') {
      dispatch(setFilterMinPrice(evt.currentTarget.value));
      dispatch(setFilterMaxPrice(evt.currentTarget.value));
      return;
    }

    switch (evt.currentTarget.id) {
      case PriceFilter.PRICE_MIN.id: {
        const userPrice = Number(evt.currentTarget.value);
        const checkedMinPrice = checkMinPrice(userPrice, minPrice, maxPrice, userMaxPrice);

        setPriceMin(checkedMinPrice);
        dispatch(setFilterMinPrice(checkedMinPrice));
        break;
      }
      case PriceFilter.PRICE_MAX.id: {
        const userPrice = Number(evt.currentTarget.value);
        const checkedMaxPrice = checkMaxPrice(userPrice, minPrice, maxPrice, userMinPrice);

        setPriceMax(checkedMaxPrice);
        dispatch(setFilterMaxPrice(checkedMaxPrice));
        break;
      }
      default:
        break;
    }

    dispatch(setFirstPage(PaginationPage.First));
    dispatch(setLastPage(PaginationPage.Last));
    dispatch(setCurrentPage(DEFAULT_PAGE));
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
            id={PriceFilter.PRICE_MIN.id}
            name={PriceFilter.PRICE_MIN.name}
            ref={minPriceRef}
            onChange={(evt) => setPriceMin(evt.currentTarget.value)}
            onBlur={blurHandler}
            value={priceMin}
            data-testid="min-price"
          />
        </div>
        <div className="form-input">
          <label className="visually-hidden">Максимальная цена</label>
          <input
            type="number"
            placeholder={maxPrice.toString()}
            id={PriceFilter.PRICE_MAX.id}
            name={PriceFilter.PRICE_MAX.name}
            ref={maxPriceRef}
            onChange={(evt) => setPriceMax(evt.currentTarget.value)}
            onBlur={blurHandler}
            value={priceMax}
            data-testid="max-price"
          />
        </div>
      </div>
    </fieldset>
  );
}

export default FilterPrice;
