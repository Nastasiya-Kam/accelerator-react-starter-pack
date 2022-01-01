import { DEFAULT_PAGE, NOT_VALID_PRICE, PaginationPage, PriceFilter } from '../../const';
import { getFirstMaxPrice, getFirstMinPrice } from '../../store/guitars-data/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { getMaxPrice, getMinPrice, getFilterTypes, getFilterStrings, getSorting, getOrder, getCurrentPage } from '../../store/user-data/selectors';
import { setCurrentPage, setFilterMaxPrice, setFilterMinPrice, setFirstPage, setLastPage } from '../../store/action';
import { fetchFilterAction } from '../../store/api-actions';
import { getCurrentItemsRange, getSortingTemplate, getUserFilter } from '../../utils/filter';

function FilterPrice():JSX.Element {
  const [priceMin, setPriceMin] = useState<string>('');
  const [priceMax, setPriceMax] = useState<string>('');

  const minPrice = useSelector(getFirstMinPrice);
  const maxPrice = useSelector(getFirstMaxPrice);
  const userMinPrice = useSelector(getMinPrice);
  const userMaxPrice = useSelector(getMaxPrice);
  const userTypes = useSelector(getFilterTypes);
  const userStrings = useSelector(getFilterStrings);
  const userSorting = useSelector(getSorting);
  const userOrder = useSelector(getOrder);
  const currentPage = useSelector(getCurrentPage);

  const dispatch = useDispatch();

  const minPriceRef = useRef(null);
  const maxPriceRef = useRef(null);

  // TODO перенести в основной фильтр filter.tsx
  useEffect(() => {
    dispatch(fetchFilterAction(getCurrentItemsRange(currentPage), getUserFilter(userMinPrice, userMaxPrice, userTypes, userStrings, getSortingTemplate(userSorting, userOrder))));
  }, [currentPage, userMinPrice, userMaxPrice, userTypes, userStrings, userSorting, userOrder, dispatch]);

  const blurHandler = (evt: FormEvent<HTMLInputElement>) => {
    if (evt.currentTarget.value === '') {
      dispatch(setFilterMinPrice(evt.currentTarget.value));
      dispatch(setFilterMaxPrice(evt.currentTarget.value));
      return;
    }
    // TODO добавить оповещение, что цена не может быть нулевой
    // TODO вынести в отдельные функции по обработке максимальной и минимальной цены?
    switch (evt.currentTarget.id) {
      case PriceFilter.PRICE_MIN.id: {
        let userPrice = Number(evt.currentTarget.value);

        if (userPrice < minPrice || userPrice === NOT_VALID_PRICE) {
          userPrice = minPrice;
        }

        if (userPrice > maxPrice) {
          userPrice = maxPrice;
        }

        if (userMaxPrice !== '') {
          const max = Number(userMaxPrice);

          if (userPrice > max) {
            userPrice = max;
          }
        }

        setPriceMin(String(userPrice));
        dispatch(setFilterMinPrice(String(userPrice)));
        break;
      }
      case PriceFilter.PRICE_MAX.id: {
        let userPrice = Number(evt.currentTarget.value);

        if (userPrice > maxPrice) {
          userPrice = maxPrice;
        }

        if (userPrice < minPrice || userPrice === NOT_VALID_PRICE) {
          userPrice = minPrice;
        }

        if (userMinPrice !== '') {
          const min = Number(userMinPrice);

          if (userPrice < min) {
            userPrice = min;
          }
        }

        setPriceMax(String(userPrice));
        dispatch(setFilterMaxPrice(String(userPrice)));
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
          />
        </div>
      </div>
    </fieldset>
  );
}

export default FilterPrice;
