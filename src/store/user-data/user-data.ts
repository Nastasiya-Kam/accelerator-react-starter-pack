import { createReducer } from '@reduxjs/toolkit';
import { UserData } from '../../types/state';
import { setFilterMinPrice, setFilterMaxPrice, setFilterTypes, setFilterStrings, setSorting, setOrder } from '../action';

const initialState: UserData = {
  minPrice: '',
  maxPrice: '',
  types: [],
  strings: [],
  sorting: '',
  order: '',
};

const userData = createReducer(initialState, (builder) => {
  builder
    .addCase(setFilterMinPrice, (state, action) => {
      state.minPrice = action.payload;
    })
    .addCase(setFilterMaxPrice, (state, action) => {
      state.maxPrice = action.payload;
    })
    .addCase(setFilterTypes, (state, action) => {
      state.types = action.payload;
    })
    .addCase(setFilterStrings, (state, action) => {
      state.strings = action.payload;
    })
    .addCase(setSorting, (state, action) => {
      state.sorting = action.payload;
    })
    .addCase(setOrder, (state, action) => {
      state.order = action.payload;
    });
});

export { userData };
