import { Filter, Param } from '../const';
import { getIndex } from './utils';

const getCurrentItemsRange = (page: number): string => {
  const indexPerPage = getIndex(page);

  return `_${Filter.Start}=${indexPerPage.startIndex}&_${Filter.End}=${indexPerPage.lastIndex}`;
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

export {
  getCurrentItemsRange,
  getUserFilter,
  getSortingTemplate
};
