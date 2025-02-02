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
  IsLoadingError = 'data/isLoadingError',
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
  LoadSearchingGuitars = 'user/loadSearchingGuitars',
  LoadGuitarData = 'guitar/loadGuitarData',
  IsGuitarLoading = 'guitar/isGuitarLoading',
  IsGuitarLoadingError = 'guitar/isGuitarLoadingError',
  LoadCommentsData = 'guitar/loadCommentsData',
  IsCommentsLoading = 'guitar/isCommentsLoading',
  LoadCartData = 'cart/loadCartData',
  AddToCart = 'cart/addToCart',
  UpdateGuitar = 'cart/updateGuitar',
  DeleteGuitar = 'cart/deleteGuitar',
  LoadDiscount = 'cart/loadDiscount',
  LoadCoupon = 'cart/loadCoupon',
}

type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;

export { ActionType };
export type {
  ThunkActionResult,
  ThunkAppDispatch
};
