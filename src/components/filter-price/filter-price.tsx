import { DEFAULT_PAGE, ErrorMessages, NOT_VALID_PRICE, PaginationPage, PriceFilter } from '../../const';
import { getFirstMaxPrice, getFirstMinPrice } from '../../store/guitars-data/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { getCurrentPage, getFilter, getMaxPrice, getMinPrice } from '../../store/user-data/selectors';
import { setCurrentPage, setFilterMaxPrice, setFilterMinPrice, setFirstPage, setLastPage } from '../../store/action';
import { fetchFilterAction } from '../../store/api-actions';
import { getCurrentItemsRange } from '../../utils/filter';
import { toast } from 'react-toastify';

function FilterPrice():JSX.Element {
  const [priceMin, setPriceMin] = useState<string>('');
  const [priceMax, setPriceMax] = useState<string>('');

  const minPrice = useSelector(getFirstMinPrice);
  const maxPrice = useSelector(getFirstMaxPrice);
  const filter = useSelector(getFilter);
  const range = getCurrentItemsRange(useSelector(getCurrentPage));
  const userMinPrice = useSelector(getMinPrice);
  const userMaxPrice = useSelector(getMaxPrice);
  const dispatch = useDispatch();

  const minPriceRef = useRef(null);
  const maxPriceRef = useRef(null);

  useEffect(() => {
    dispatch(fetchFilterAction(range, filter));
  }, [range, filter, dispatch]);

  const blurHandler = (evt: FormEvent<HTMLInputElement>) => {
    if (evt.currentTarget.value === '') {
      dispatch(setFilterMinPrice(evt.currentTarget.value));
      dispatch(setFilterMaxPrice(evt.currentTarget.value));
      return;
    }

    // TODO вынести в отдельные функции по обработке максимальной и минимальной цены?
    switch (evt.currentTarget.id) {
      case PriceFilter.PRICE_MIN.id: {
        let userPrice = Number(evt.currentTarget.value);

        if (userPrice < minPrice || userPrice === NOT_VALID_PRICE) {
          userPrice = minPrice;
          toast.info(ErrorMessages.MinPrice);
        }

        if (userPrice > maxPrice) {
          userPrice = maxPrice;
          toast.info(ErrorMessages.MaxPrice);
        }

        if (userMaxPrice !== '') {
          const max = Number(userMaxPrice);

          if (userPrice > max) {
            userPrice = max;
            toast.info(ErrorMessages.MaxPrice);
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
          toast.info(ErrorMessages.MaxPrice);
        }

        if (userPrice < minPrice || userPrice === NOT_VALID_PRICE) {
          userPrice = minPrice;
          toast.info(ErrorMessages.MinPrice);
        }

        if (userMinPrice !== '') {
          const min = Number(userMinPrice);

          if (userPrice < min) {
            userPrice = min;
            toast.info(ErrorMessages.MaxPrice);
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
