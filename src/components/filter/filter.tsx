import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { STRINGS, STRINGS_COUNT, TYPES_COUNT, TYPE_GUITARS } from '../../const';
import { setFilterStrings, setFilterTypes } from '../../store/action';
import { fetchFilterAction } from '../../store/api-actions';
import { getMaxPrice, getMinPrice, getFilterTypes, getFilterStrings, getSorting, getOrder } from '../../store/user-data/selectors';
import { getSortingTemplate, getUserFilter } from '../../utils/filter';
import FilterPrice from '../filter-price/filter-price';

const collectItems = (currentItems: string[], item: string): string[] => {
  if (currentItems.includes(item)) {
    return currentItems.filter((currentType) => currentType !== item);
  }

  return [...currentItems, item];
};

function Filter():JSX.Element {
  const userMinPrice = useSelector(getMinPrice);
  const userMaxPrice = useSelector(getMaxPrice);
  const userTypes = useSelector(getFilterTypes);
  const userStrings = useSelector(getFilterStrings);
  const userSorting = useSelector(getSorting);
  const userOrder = useSelector(getOrder);

  const [types, setTypes] = useState<boolean[]>(new Array(TYPES_COUNT).fill(false));
  const [strings, setStrings] = useState<boolean[]>(new Array(STRINGS_COUNT).fill(false));
  const [availiableStrings, setAvailableStrings] = useState<number[]>(STRINGS);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFilterAction(getUserFilter(userMinPrice, userMaxPrice, userTypes, userStrings, getSortingTemplate(userSorting, userOrder))));
  }, [strings, dispatch, userMinPrice, userMaxPrice, userTypes, userStrings, userSorting, userOrder]);

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

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <FilterPrice />
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        {
          TYPE_GUITARS.map((guitar, index) => {
            const key = `${index}-${guitar.name}`;
            const{name, type} = guitar;
            // TODO: при обновлении сбрасывается?
            return (
              <div key={key} className="form-checkbox catalog-filter__block-item">
                <input
                  className="visually-hidden"
                  type="checkbox"
                  id={name}
                  name={name}
                  checked={types[index]}
                  onChange={({target}: ChangeEvent<HTMLInputElement>) => {
                    const value = target.checked;
                    setTypes([...types.slice(0, index), value, ...types.slice(index + 1)]);
                    dispatch(setFilterTypes(collectItems(userTypes, name)));
                  }}
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
            const key = `${index}-${stringCount}`;

            return (
              <div key={key} className="form-checkbox catalog-filter__block-item">
                <input
                  className="visually-hidden"
                  type="checkbox"
                  id={`${stringCount}-strings`}
                  name={`${stringCount}-strings`}
                  onChange={({target}: ChangeEvent<HTMLInputElement>) => {
                    const value = target.checked;
                    setStrings([...strings.slice(0, index), value, ...strings.slice(index + 1)]);
                    dispatch(setFilterStrings(collectItems(userStrings, String(stringCount))));
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
