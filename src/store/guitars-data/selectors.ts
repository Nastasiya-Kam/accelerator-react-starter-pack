import { Guitars } from '../../types/guitars';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

const getGuitars = (state: State): Guitars => state[NameSpace.Guitars].guitars;
const getFirstMinPrice = (state: State): number => state[NameSpace.Guitars].firstMinPrice;
const getFirstMaxPrice = (state: State): number => state[NameSpace.Guitars].firstMaxPrice;
const getPageCount = (state: State): number => state[NameSpace.Guitars].pageCount;
const getLoadingStatus = (state: State): boolean => state[NameSpace.Guitars].isLoading;
const getLoadingDataStatus = (state: State): boolean => state[NameSpace.Guitars].isDataLoaded;
const getStatusLoadingError = (state: State): boolean => state[NameSpace.Guitars].isLoadingError;

export {
  getGuitars,
  getFirstMinPrice,
  getFirstMaxPrice,
  getPageCount,
  getLoadingStatus,
  getLoadingDataStatus,
  getStatusLoadingError
};
