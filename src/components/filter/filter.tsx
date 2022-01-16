import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import browserHistory from '../../browser-history';
import { AppRoute, DEFAULT_PAGE, PaginationPage, ReplacedPart, STRINGS, STRINGS_COUNT, TYPES_COUNT, TYPE_GUITARS } from '../../const';
import { setCurrentPage, setFilterStrings, setFilterTypes, setFirstPage, setLastPage } from '../../store/action';
import { getFilterTypes, getFilterStrings, getFilter } from '../../store/user-data/selectors';
import { getCurrentItemsRange } from '../../utils/filter';
import FilterPrice from '../filter-price/filter-price';

const collectItems = (currentItems: string[], item: string): string[] => {
  if (currentItems.includes(item)) {
    return currentItems.filter((currentType) => currentType !== item);
  }

  return [...currentItems, item];
};

function Filter():JSX.Element {
  const userTypes = useSelector(getFilterTypes);
  const userStrings = useSelector(getFilterStrings);
  const filter = useSelector(getFilter);

  const [types, setTypes] = useState<boolean[]>(new Array(TYPES_COUNT).fill(false));
  const [strings, setStrings] = useState<boolean[]>(new Array(STRINGS_COUNT).fill(false));
  const [availiableStrings, setAvailableStrings] = useState<number[]>(STRINGS);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!types.some((type) => type)) {
      setAvailableStrings(STRINGS);
      return;
    }

    const includingStrings: number[] = [];

    types.forEach((isAvailable, index): void => {
      if (isAvailable) {
        includingStrings.push(...TYPE_GUITARS[index].stringsCount);
      }
    });

    setAvailableStrings(includingStrings);
  }, [types]);

  const handleInputChange = () => {
    dispatch(setFirstPage(PaginationPage.First));
    dispatch(setLastPage(PaginationPage.Last));
    dispatch(setCurrentPage(DEFAULT_PAGE));
  };

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <FilterPrice />
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        {
          TYPE_GUITARS.map((guitar, index) => {
            const key = `type-${guitar.name}`;
            const{name, type} = guitar;
            const isChecked = userTypes.includes(name);

            return (
              <div key={key} className="form-checkbox catalog-filter__block-item">
                <input
                  className="visually-hidden"
                  type="checkbox"
                  id={name}
                  name={name}
                  data-testid={name}
                  onChange={({target}: ChangeEvent<HTMLInputElement>) => {
                    const value = target.checked;
                    handleInputChange();
                    setTypes([...types.slice(0, index), value, ...types.slice(index + 1)]);
                    dispatch(setFilterTypes(collectItems(userTypes, name)));
                    browserHistory.push(AppRoute.CatalogPage.replace(ReplacedPart.Page, `page_${DEFAULT_PAGE}/?${getCurrentItemsRange(DEFAULT_PAGE)}${filter}`));
                  }}
                  checked={isChecked}
                />
                <label htmlFor={name}>{type}</label>
              </div>
            );
          })
        }
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        {
          STRINGS.map((stringCount, index) => {
            const key = `string-${stringCount}`;

            return (
              <div key={key} className="form-checkbox catalog-filter__block-item">
                <input
                  className="visually-hidden"
                  type="checkbox"
                  id={`${stringCount}-strings`}
                  name={`${stringCount}-strings`}
                  data-testid={stringCount}
                  checked={userStrings.includes(String(stringCount))}
                  onChange={({target}: ChangeEvent<HTMLInputElement>) => {
                    const value = target.checked;
                    handleInputChange();
                    setStrings([...strings.slice(0, index), value, ...strings.slice(index + 1)]);
                    dispatch(setFilterStrings(collectItems(userStrings, String(stringCount))));
                    browserHistory.push(AppRoute.CatalogPage.replace(ReplacedPart.Page, `page_${DEFAULT_PAGE}/?${getCurrentItemsRange(DEFAULT_PAGE)}${filter}`));
                  }}
                  disabled={!availiableStrings.includes(stringCount)}
                />
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
