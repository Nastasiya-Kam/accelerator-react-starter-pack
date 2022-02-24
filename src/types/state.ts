import { RootState } from '../store/root-reducer';
import { Guitar, Guitars, GuitarsCart } from './guitars';

type GuitarsData = {
  guitars: Guitars,
  firstMinPrice: number,
  firstMaxPrice: number,
  pageCount: number,
  isDataLoaded: boolean,
  isLoading: boolean,
  isLoadingError: boolean,
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
  searchingGuitars: Guitars,
};

type GuitarData = {
  guitar: Guitar | null,
  isDataLoaded: boolean,
  isGuitarLoading: boolean,
  isGuitarLoadingError: boolean,
}

type CartData = {
  guitarsInCart: GuitarsCart,
  discount: number,
}

type State = RootState;

export type { GuitarsData, UserData, GuitarData, CartData, State };
