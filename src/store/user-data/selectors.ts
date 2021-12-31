import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

const getMinPrice = (state: State): string => state[NameSpace.User].minPrice;
const getMaxPrice = (state: State): string => state[NameSpace.User].maxPrice;
const getFilterTypes = (state: State): string[] => state[NameSpace.User].types;
const getFilterStrings = (state: State): string[] => state[NameSpace.User].strings;
const getSorting = (state: State): string => state[NameSpace.User].sorting;
const getOrder = (state: State): string => state[NameSpace.User].order;
const getCurrentPage = (state: State): number => state[NameSpace.User].currentPage;

export {
  getMinPrice,
  getMaxPrice,
  getFilterTypes,
  getFilterStrings,
  getSorting,
  getOrder,
  getCurrentPage
};
