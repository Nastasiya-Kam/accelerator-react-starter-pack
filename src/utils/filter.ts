const getUserFilter = (min: string, max: string, types: string[], strings: string[]): string => {
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

  return filter;
};

export {
  getUserFilter
};
