import { Filter, Param, STRINGS, TYPE_GUITAR_NAMES } from '../const';
import { getIndex } from './utils';

const getCurrentItemsRange = (page: number): string => {
  const indexPerPage = getIndex(page);

  return `${Filter.Start}=${indexPerPage.startIndex}&${Filter.End}=${indexPerPage.lastIndex}`;
};

const getUserFilter = (min: string, max: string, types: string[], strings: string[], sorting: string): string => {
  let filter = '';

  if (min !== '') {
    filter += `&${Filter.PriceGte}=${min}`;
  }

  if (max !== '') {
    filter += `&${Filter.PriceLte}=${max}`;
  }

  if (types.length !== 0) {
    filter += `&${Filter.Type}=${types.join(`&${Filter.Type}=`)}`;
  }

  if (strings.length !== 0) {
    filter += `&${Filter.StringCount}=${strings.join(`&${Filter.StringCount}=`)}`;
  }

  if (sorting !== '') {
    filter += sorting;
  }

  return filter;
};

const getSortingTemplate = (sort: string, order: string): string => `${sort && `&_${Param.Sort}=${sort}`}${order && `&_${Param.Order}=${order}`}`;

const collectItems = (currentItems: string[], item: string): string[] => {
  if (currentItems.includes(item)) {
    return currentItems.filter((currentType) => currentType !== item);
  }

  return [...currentItems, item];
};

const getCurrentTypes = (types: string[]): boolean[] => TYPE_GUITAR_NAMES.map((name) => types.includes(name));
const getCurrentStrings = (strings: string[]): boolean[] => STRINGS.map((stringCount) => strings.includes(String(stringCount)));

export {
  getCurrentItemsRange,
  getUserFilter,
  getSortingTemplate,
  collectItems,
  getCurrentTypes,
  getCurrentStrings
};
