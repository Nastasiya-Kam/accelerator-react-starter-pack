import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import browserHistory from '../../browser-history';
import { AppRoute, DEFAULT_PAGE, PaginationPage, ReplacedPart, STRINGS, TYPE_GUITARS, Filter as FilterParams, TYPE_GUITAR_NAMES } from '../../const';
import { setCurrentPage, setFilterStrings, setFilterTypes, setFirstPage, setLastPage } from '../../store/action';
import { getFilterTypes, getFilterStrings } from '../../store/user-data/selectors';
import { collectItems, getCurrentStrings, getCurrentTypes } from '../../utils/filter';
import FilterPrice from '../filter-price/filter-price';

function Filter():JSX.Element {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const userTypes = useSelector(getFilterTypes);
  const userStrings = useSelector(getFilterStrings);

  const [types, setTypes] = useState<boolean[]>(getCurrentTypes(userTypes));
  const [strings, setStrings] = useState<boolean[]>(getCurrentStrings(userStrings));
  const [availiableStrings, setAvailableStrings] = useState<number[]>(STRINGS);
  const [availiableTypes, setAvailableTypes] = useState<string[]>(TYPE_GUITAR_NAMES);

  const dispatch = useDispatch();

  //* ФИЛЬТР ТИПОВ *//

  useEffect(() => {
    setTypes(getCurrentTypes(userTypes));
  }, [ userTypes ]);

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

  const handleTypeChange = (items: string[]) => {
    searchParams.delete(FilterParams.Type);
    items.map((item: string) => searchParams.append(FilterParams.Type, item));

    browserHistory.push(AppRoute.CatalogPage.replace(ReplacedPart.Page, `page_${DEFAULT_PAGE}/?${searchParams.toString()}`));
  };

  //* ФИЛЬТР СТРУН *//

  useEffect(() => {
    setStrings(getCurrentStrings(userStrings));
  }, [ userStrings ]);

  useEffect(() => {
    if (!strings.some((string) => string)) {
      setAvailableTypes(TYPE_GUITAR_NAMES);
      return;
    }

    const includingTypes: string[] = [];

    strings.forEach((isAvailable, index): void => {
      if (isAvailable) {
        TYPE_GUITARS.forEach((guitar, guitarIndex): void => {
          if (guitar.stringsCount.includes(STRINGS[index])) {
            includingTypes.push(TYPE_GUITARS[guitarIndex].name);
          }
        });
      }
    });

    setAvailableTypes(includingTypes);
  }, [strings]);

  const handleStringCountChange = (items: string[]) => {
    searchParams.delete(FilterParams.StringCount);
    items.map((item: string) => searchParams.append(FilterParams.StringCount, item));

    browserHistory.push(AppRoute.CatalogPage.replace(ReplacedPart.Page, `page_${DEFAULT_PAGE}/?${searchParams.toString()}`));
  };

  //* ОБЩЕЕ *//

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
                    const items = collectItems(userTypes, name);

                    handleInputChange();
                    setTypes([...types.slice(0, index), value, ...types.slice(index + 1)]);
                    dispatch(setFilterTypes(items));
                    handleTypeChange(items);
                  }}
                  checked={isChecked}
                  disabled={!availiableTypes.includes(name)}
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
                    const items = collectItems(userStrings, String(stringCount));

                    handleInputChange();
                    setStrings([...strings.slice(0, index), value, ...strings.slice(index + 1)]);
                    dispatch(setFilterStrings(items));
                    handleStringCountChange(items);
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
