const getUserFilter = (min: string, max: string, types: string[]): string => {
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


  return filter;
};

export {
  getUserFilter
};
