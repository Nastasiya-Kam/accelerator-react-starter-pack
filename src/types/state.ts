import { RootState } from '../store/root-reducer';
import { Guitars } from './guitars';

type GuitarsData = {
  guitars: Guitars,
  isDataLoaded: boolean,
};

type State = RootState;

export type { GuitarsData, State };
