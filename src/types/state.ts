import { RootState } from '../store/root-reducer';
import { Guitars } from './guitars';

type GuitarsData = {
  guitars: Guitars,
  firstMinPrice: number,
  firstMaxPrice: number,
  pageCount: number,
  isDataLoaded: boolean,
  errorMessage: boolean,
};

type UserData = {
  minPrice: string,
  maxPrice: string,
  types: string[],
  strings: string[],
  sorting: string,
  order: string,
  currentPage: number,
  currentPageCount: number,
  firstPage: number,
  lastPage: number,
};

type State = RootState;

export type { GuitarsData, UserData, State };
