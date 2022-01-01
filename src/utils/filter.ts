import { ELEMENT_ON_PAGE_COUNT, Filter, Params } from '../const';

const getCurrentItemsRange = (page: number): string => {
  const firstItem = (page - 1) * ELEMENT_ON_PAGE_COUNT;
  const lastItem = (page) * ELEMENT_ON_PAGE_COUNT;

  return `_${Filter.Start}=${firstItem}&_${Filter.End}=${lastItem}`;
};

const getUserFilter = (min: string, max: string, types: string[], strings: string[], sorting: string): string => {
  let filter = '';

  if (min !== '') {
    filter += `${Filter.PriceGte}=${min}`;
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

const getSortingTemplate = (sort: string, order: string): string => `${sort && `&_${Params.Sort}=${sort}`}${order && `&_${Params.Order}=${order}`}`;

export {
  getCurrentItemsRange,
  getUserFilter,
  getSortingTemplate
};
