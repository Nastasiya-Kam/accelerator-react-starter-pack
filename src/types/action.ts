import { AxiosInstance } from 'axios';
import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { State } from './state';

enum ActionType {
  LoadGuitarsData = 'data/loadGuitarsData',
  SetMinPrice ='user/setMinPrice',
  SetMaxPrice ='user/setMaxPrice',
  SetFilterTypes = 'user/setFilterTypes'
}

type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;

export { ActionType };
export type {
  ThunkActionResult,
  ThunkAppDispatch
};
