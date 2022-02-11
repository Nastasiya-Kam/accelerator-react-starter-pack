import { AppRoute, DEFAULT_PAGE, Filter, PaginationPage, priceFilter, ReplacedPart } from '../../const';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { getFirstMaxPrice, getFirstMinPrice } from '../../store/guitars-data/selectors';
import { getMaxPrice, getMinPrice } from '../../store/user-data/selectors';
import { setCurrentPage, setFilterMaxPrice, setFilterMinPrice, setFirstPage, setLastPage } from '../../store/action';
import { checkMaxPrice, checkMinPrice, getIndex } from '../../utils/utils';
import browserHistory from '../../browser-history';

function FilterPrice():JSX.Element {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const minPrice = useSelector(getFirstMinPrice);
  const maxPrice = useSelector(getFirstMaxPrice);
  const userMinPrice = useSelector(getMinPrice);
  const userMaxPrice = useSelector(getMaxPrice);

  const [priceMin, setPriceMin] = useState<string>(userMinPrice);
  const [priceMax, setPriceMax] = useState<string>(userMaxPrice);

  const dispatch = useDispatch();

  const minPriceRef = useRef(null);
  const maxPriceRef = useRef(null);

  useEffect(() => {
    setPriceMin(userMinPrice);
    setPriceMax(userMaxPrice);
  }, [userMinPrice, userMaxPrice]);

  const handleInputBlur = (evt: FormEvent<HTMLInputElement>) => {
    switch (evt.currentTarget.id) {
      case priceFilter.priceMin.id: {
        if (evt.currentTarget.value === '') {
          setPriceMin(evt.currentTarget.value);
          dispatch(setFilterMinPrice(evt.currentTarget.value));
          searchParams.delete(Filter.PriceGte);
          break;
        }

        const userPrice = Number(evt.currentTarget.value);
        const checkedMinPrice = checkMinPrice(userPrice, minPrice, maxPrice, priceMax);

        setPriceMin(checkedMinPrice);
        dispatch(setFilterMinPrice(checkedMinPrice));
        searchParams.has(Filter.PriceGte)
          ? searchParams.set(Filter.PriceGte, checkedMinPrice)
          : searchParams.append(Filter.PriceGte, checkedMinPrice);
        break;
      }
      case priceFilter.priceMax.id: {
        if (evt.currentTarget.value === '') {
          setPriceMax(evt.currentTarget.value);
          dispatch(setFilterMaxPrice(evt.currentTarget.value));
          searchParams.delete(Filter.PriceLte);
          break;
        }

        const userPrice = Number(evt.currentTarget.value);
        const checkedMaxPrice = checkMaxPrice(userPrice, minPrice, maxPrice, priceMin);

        setPriceMax(checkedMaxPrice);
        dispatch(setFilterMaxPrice(checkedMaxPrice));
        searchParams.has(Filter.PriceLte)
          ? searchParams.set(Filter.PriceLte, checkedMaxPrice)
          : searchParams.append(Filter.PriceLte, checkedMaxPrice);
        break;
      }
      default:
        break;
    }

    dispatch(setFirstPage(PaginationPage.First));
    dispatch(setLastPage(PaginationPage.Last));
    dispatch(setCurrentPage(DEFAULT_PAGE));
    const currentIndexRange = getIndex(DEFAULT_PAGE);

    searchParams.has(Filter.Start)
      ? searchParams.set(Filter.Start, String(currentIndexRange.startIndex))
      : searchParams.append(Filter.Start, String(currentIndexRange.startIndex));
    searchParams.has(Filter.End)
      ? searchParams.set(Filter.End, String(currentIndexRange.lastIndex))
      : searchParams.append(Filter.End, String(currentIndexRange.lastIndex));

    browserHistory.push(AppRoute.CatalogPage.replace(ReplacedPart.Page, `page_${DEFAULT_PAGE}/?${searchParams.toString()}`));
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
            id={priceFilter.priceMin.id}
            name={priceFilter.priceMin.name}
            ref={minPriceRef}
            onChange={(evt) => setPriceMin(evt.currentTarget.value)}
            onBlur={handleInputBlur}
            value={priceMin}
            data-testid="min-price"
          />
        </div>
        <div className="form-input">
          <label className="visually-hidden">Максимальная цена</label>
          <input
            type="number"
            placeholder={maxPrice.toString()}
            id={priceFilter.priceMax.id}
            name={priceFilter.priceMax.name}
            ref={maxPriceRef}
            onChange={(evt) => setPriceMax(evt.currentTarget.value)}
            onBlur={handleInputBlur}
            value={priceMax}
            data-testid="max-price"
          />
        </div>
      </div>
    </fieldset>
  );
}

export default FilterPrice;
