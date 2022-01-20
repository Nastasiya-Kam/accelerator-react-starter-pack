import { State } from '../../types/state';
import { getSortingTemplate, getUserFilter } from '../../utils/filter';
import { NameSpace } from '../root-reducer';

const getFilter = (state: State): string => getUserFilter(
  state[NameSpace.User].minPrice,
  state[NameSpace.User].maxPrice,
  state[NameSpace.User].types,
  state[NameSpace.User].strings,
  getSortingTemplate(state[NameSpace.User].sorting, state[NameSpace.User].order),
);

const checkIsFilter = (state: State): boolean => {
  if (state[NameSpace.User].minPrice === ''
    && state[NameSpace.User].maxPrice === ''
    && state[NameSpace.User].types.length === 0
    && state[NameSpace.User].strings.length === 0) {
    return false;
  }

  return true;
};

const getMinPrice = (state: State): string => state[NameSpace.User].minPrice;
const getMaxPrice = (state: State): string => state[NameSpace.User].maxPrice;
const getFilterTypes = (state: State): string[] => state[NameSpace.User].types;
const getFilterStrings = (state: State): string[] => state[NameSpace.User].strings;
const getSorting = (state: State): string => state[NameSpace.User].sorting;
const getOrder = (state: State): string => state[NameSpace.User].order;
const getCurrentPage = (state: State): number => state[NameSpace.User].currentPage;
const getCurrentPageCount = (state: State): number => state[NameSpace.User].currentPageCount;
const getFirstPage = (state: State): number => state[NameSpace.User].firstPage;
const getLastPage = (state: State): number => state[NameSpace.User].lastPage;
const getSearchingGuitars = (state: State) => state[NameSpace.User].searchingGuitars;

export {
  getFilter,
  getMinPrice,
  getMaxPrice,
  getFilterTypes,
  getFilterStrings,
  getSorting,
  getOrder,
  getCurrentPage,
  checkIsFilter,
  getCurrentPageCount,
  getFirstPage,
  getLastPage,
  getSearchingGuitars
};
