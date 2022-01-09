import { AxiosInstance } from 'axios';
import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { State } from './state';

enum ActionType {
  LoadGuitarsData = 'data/loadGuitarsData',
  SetFirstMinPrice = 'data/setFirstMinPrice',
  SetFirstMaxPrice = 'data/setFirstMaxPrice',
  SetPageCount = 'data/setPageCount',
  IsLoading = 'data/isLoading',
  SetFilterMinPrice ='user/setMinPrice',
  SetFilterMaxPrice ='user/setMaxPrice',
  SetFilterTypes = 'user/setFilterTypes',
  SetFilterStrings = 'user/setFilterStrings',
  SetSorting = 'user/setSorting',
  SetOrder = 'user/setOrder',
  SetCurrentPage = 'user/setCurrentPage',
  SetCurrentPageCount = 'user/setCurrentPageCount',
  SetFirstPage = 'user/setFirstPage',
  SetLastPage = 'user/setLastPage',
  PrevFirstPage = 'user/prevFirstPage',
  PrevLastPage = 'user/prevLastPage',
  NextFirstPage = 'user/nextFirstPage',
  NextLastPage = 'user/nextLastPage',
}

type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;

export { ActionType };
export type {
  ThunkActionResult,
  ThunkAppDispatch
};
