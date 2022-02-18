import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../types/action';
import { Comments } from '../types/comments';
import { Guitar, GuitarCart, Guitars } from '../types/guitars';

// * GUITARS_DATA * //

const loadGuitarsData = createAction(
  ActionType.LoadGuitarsData,
  (guitars: Guitars) => ({
    payload: guitars,
  }),
);

const setFirstMinPrice = createAction(
  ActionType.SetFirstMinPrice,
  (min: number) => ({
    payload: min,
  }),
);

const setFirstMaxPrice = createAction(
  ActionType.SetFirstMaxPrice,
  (max: number) => ({
    payload: max,
  }),
);

const setPageCount = createAction(
  ActionType.SetPageCount,
  (count: number) => ({
    payload: count,
  }),
);

const isLoading = createAction(
  ActionType.IsLoading,
  (flag: boolean) => ({
    payload: flag,
  }),
);

const isLoadingError = createAction(
  ActionType.IsLoadingError,
  (flag: boolean) => ({
    payload: flag,
  }),
);

// * USER_DATA * //

const setFilterMinPrice = createAction(
  ActionType.SetFilterMinPrice,
  (minPrice: string) => ({
    payload: minPrice,
  }),
);

const setFilterMaxPrice = createAction(
  ActionType.SetFilterMaxPrice,
  (maxPrice: string) => ({
    payload: maxPrice,
  }),
);

const setFilterTypes = createAction(
  ActionType.SetFilterTypes,
  (types: string[]) => ({
    payload: types,
  }),
);

const setFilterStrings = createAction(
  ActionType.SetFilterStrings,
  (types: string[]) => ({
    payload: types,
  }),
);

const setSorting = createAction(
  ActionType.SetSorting,
  (sorting: string) => ({
    payload: sorting,
  }),
);

const setOrder = createAction(
  ActionType.SetOrder,
  (order: string) => ({
    payload: order,
  }),
);

const setCurrentPage = createAction(
  ActionType.SetCurrentPage,
  (currentPage: number) => ({
    payload: currentPage,
  }),
);

const setCurrentPageCount = createAction(
  ActionType.SetCurrentPageCount,
  (currentPageCount: number) => ({
    payload: currentPageCount,
  }),
);

const setFirstPage = createAction(
  ActionType.SetFirstPage,
  (firstPage: number) => ({
    payload: firstPage,
  }),
);

const setLastPage = createAction(
  ActionType.SetLastPage,
  (lastPage: number) => ({
    payload: lastPage,
  }),
);

const prevFirstPage = createAction(ActionType.PrevFirstPage);
const prevLastPage = createAction(ActionType.PrevLastPage);
const nextFirstPage = createAction(ActionType.NextFirstPage);
const nextLastPage = createAction(ActionType.NextLastPage);

const loadSearchingGuitars = createAction(
  ActionType.LoadSearchingGuitars,
  (guitars: Guitars) => ({
    payload: guitars,
  }),
);

// * GUITAR_DATA * //

const loadGuitarData = createAction(
  ActionType.LoadGuitarData,
  (guitar: Guitar | null) => ({
    payload: guitar,
  }),
);

const isGuitarLoading = createAction(
  ActionType.IsGuitarLoading,
  (flag: boolean) => ({
    payload: flag,
  }),
);

const isGuitarLoadingError = createAction(
  ActionType.IsGuitarLoadingError,
  (flag: boolean) => ({
    payload: flag,
  }),
);

const loadCommentsData = createAction(
  ActionType.LoadCommentsData,
  (comments: Comments) => ({
    payload: comments,
  }),
);

const isCommentsLoading = createAction(
  ActionType.IsCommentsLoading,
  (flag: boolean) => ({
    payload: flag,
  }),
);

// * CART_DATA * //

const loadCartData = createAction(
  ActionType.LoadCartData,
  (guitars: Guitars) => ({
    payload: guitars,
  }),
);

const addToCart = createAction(
  ActionType.AddToCart,
  (guitar: GuitarCart) => ({
    payload: guitar,
  }),
);

export {
  loadGuitarsData,
  setFirstMinPrice,
  setFirstMaxPrice,
  setPageCount,
  isLoading,
  isLoadingError,
  setFilterMinPrice,
  setFilterMaxPrice,
  setFilterTypes,
  setFilterStrings,
  setSorting,
  setOrder,
  setCurrentPage,
  setCurrentPageCount,
  setFirstPage,
  setLastPage,
  prevFirstPage,
  prevLastPage,
  nextFirstPage,
  nextLastPage,
  loadSearchingGuitars,
  loadGuitarData,
  isGuitarLoading,
  isGuitarLoadingError,
  loadCommentsData,
  isCommentsLoading,
  loadCartData,
  addToCart
};
