import { createReducer } from '@reduxjs/toolkit';
import { UserData } from '../../types/state';
import { setFilterMinPrice, setFilterMaxPrice, setFilterTypes, setFilterStrings } from '../action';

const initialState: UserData = {
  minPrice: '',
  maxPrice: '',
  types: [],
  strings: [],
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
    });
});

export { userData };
