import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../types/action';
import { Guitars } from '../types/guitars';

const loadGuitarsData = createAction(
  ActionType.LoadGuitarsData,
  (guitars: Guitars) => ({
    payload: guitars,
  }),
);

const setMinPrice = createAction(
  ActionType.SetMinPrice,
  (minPrice: string) => ({
    payload: minPrice,
  }),
);

const setMaxPrice = createAction(
  ActionType.SetMaxPrice,
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

export {
  loadGuitarsData,
  setMinPrice,
  setMaxPrice,
  setFilterTypes,
  setFilterStrings
};
