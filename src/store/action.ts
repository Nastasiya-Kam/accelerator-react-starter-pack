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

export {
  loadGuitarsData,
  setFirstMinPrice,
  setFirstMaxPrice,
  setFilterMinPrice,
  setFilterMaxPrice,
  setFilterTypes,
  setFilterStrings,
  setSorting,
  setOrder
};
