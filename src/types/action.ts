import { AxiosInstance } from 'axios';
import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { State } from './state';

enum ActionType {
  LoadGuitarsData = 'data/loadGuitarsData',
  SetFirstMinPrice = 'data/setFirstMinPrice',
  SetFirstMaxPrice = 'data/setFirstMaxPrice',
  SetFilterMinPrice ='user/setMinPrice',
  SetFilterMaxPrice ='user/setMaxPrice',
  SetFilterTypes = 'user/setFilterTypes',
  SetFilterStrings = 'user/setFilterStrings',
}

type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;

export { ActionType };
export type {
  ThunkActionResult,
  ThunkAppDispatch
};
