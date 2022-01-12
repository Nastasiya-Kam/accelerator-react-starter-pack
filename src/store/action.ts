import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../types/action';
import { Guitars } from '../types/guitars';

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

export {
  loadGuitarsData,
  setFirstMinPrice,
  setFirstMaxPrice,
  setPageCount,
  isLoading,
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
  loadSearchingGuitars
};
