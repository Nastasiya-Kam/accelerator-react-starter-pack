import { AppRoute, DEFAULT_PAGE, PaginationPage, priceFilter, ReplacedPart } from '../../const';
import { getFirstMaxPrice, getFirstMinPrice } from '../../store/guitars-data/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { FormEvent, useRef, useState } from 'react';
import { getFilter, getMaxPrice, getMinPrice } from '../../store/user-data/selectors';
import { setCurrentPage, setFilterMaxPrice, setFilterMinPrice, setFirstPage, setLastPage } from '../../store/action';
import { checkMaxPrice, checkMinPrice } from '../../utils/utils';
import browserHistory from '../../browser-history';
import { getCurrentItemsRange } from '../../utils/filter';

function FilterPrice():JSX.Element {
  const [priceMin, setPriceMin] = useState<string>('');
  const [priceMax, setPriceMax] = useState<string>('');

  const minPrice = useSelector(getFirstMinPrice);
  const maxPrice = useSelector(getFirstMaxPrice);
  const userMinPrice = useSelector(getMinPrice);
  const userMaxPrice = useSelector(getMaxPrice);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  const minPriceRef = useRef(null);
  const maxPriceRef = useRef(null);

  const handleInputBlur = (evt: FormEvent<HTMLInputElement>) => {
    if (evt.currentTarget.value === '') {
      dispatch(setFilterMinPrice(evt.currentTarget.value));
      dispatch(setFilterMaxPrice(evt.currentTarget.value));
      return;
    }

    const userPrice = Number(evt.currentTarget.value);

    switch (evt.currentTarget.id) {
      case priceFilter.priceMin.id: {
        const checkedMinPrice = checkMinPrice(userPrice, minPrice, maxPrice, userMaxPrice);

        setPriceMin(checkedMinPrice);
        dispatch(setFilterMinPrice(checkedMinPrice));
        break;
      }
      case priceFilter.priceMax.id: {
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

    browserHistory.push(AppRoute.CatalogPage.replace(ReplacedPart.Page, `page_${DEFAULT_PAGE}/?${getCurrentItemsRange(DEFAULT_PAGE)}${filter}`));
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
