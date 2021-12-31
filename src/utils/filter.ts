import { Filter, Params } from '../const';


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
  getUserFilter,
  getSortingTemplate
};
