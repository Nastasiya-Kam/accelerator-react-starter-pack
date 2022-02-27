import { createSelector } from 'reselect';
import { State } from '../../types/state';
import { getSortingTemplate, getUserFilter } from '../../utils/filter';
import { NameSpace } from '../root-reducer';

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

const getFilter = createSelector(
  [ getMinPrice, getMaxPrice, getFilterTypes, getFilterStrings, getSorting, getOrder ],
  (minPrice, maxPrice, types, strings, sorting, order): string => getUserFilter(minPrice, maxPrice, types, strings, getSortingTemplate(sorting, order)),
);

const checkIsFilter = createSelector(
  [ getMinPrice, getMaxPrice, getFilterTypes, getFilterStrings ],
  (minPrice, maxPrice, types, strings): boolean => {
    if (minPrice === '' && maxPrice === '' && types.length === 0 && strings.length === 0) {
      return false;
    }

    return true;
  },
);

export {
  getMinPrice,
  getMaxPrice,
  getFilterTypes,
  getFilterStrings,
  getSorting,
  getOrder,
  getCurrentPage,
  getCurrentPageCount,
  getFirstPage,
  getLastPage,
  getSearchingGuitars,
  getFilter,
  checkIsFilter
};
