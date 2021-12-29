import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

const getMinPrice = (state: State): string => state[NameSpace.User].minPrice;
const getMaxPrice = (state: State): string => state[NameSpace.User].maxPrice;
const getFilterTypes = (state: State): string[] => state[NameSpace.User].types;
const getFilterStrings = (state: State): string[] => state[NameSpace.User].strings;

export {
  getMinPrice,
  getMaxPrice,
  getFilterTypes,
  getFilterStrings
};
