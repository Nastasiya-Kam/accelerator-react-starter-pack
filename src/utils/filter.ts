import { Params } from '../const';

const getUserFilter = (min: string, max: string, types: string[], strings: string[], sorting: string): string => {
  let filter = '';

  if (min !== '') {
    filter += `price_gte=${min}`;
  }

  if (max !== '') {
    filter += `&price_lte=${max}`;
  }

  if (types.length !== 0) {
    // TODO как это отразится на сортировке списка?
    filter += `&type=${types.join('&type=')}`;
  }

  if (strings.length !== 0) {
    // TODO как это отразится на сортировке списка?
    filter += `&stringCount=${strings.join('&stringCount=')}`;
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
