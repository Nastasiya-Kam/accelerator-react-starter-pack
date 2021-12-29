import { RootState } from '../store/root-reducer';
import { Guitars } from './guitars';

type GuitarsData = {
  guitars: Guitars,
  isDataLoaded: boolean,
  errorMessage: boolean,
};

type UserData = {
  minPrice: string,
  maxPrice: string,
  types: string[],
};

type State = RootState;

export type { GuitarsData, UserData, State };
