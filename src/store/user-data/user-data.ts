import { createReducer } from '@reduxjs/toolkit';
import { UserData } from '../../types/state';
import { setMinPrice, setMaxPrice, setFilterTypes } from '../action';

const initialState: UserData = {
  minPrice: '',
  maxPrice: '',
  types: [],
};

const userData = createReducer(initialState, (builder) => {
  builder
    .addCase(setMinPrice, (state, action) => {
      state.minPrice = action.payload;
    })
    .addCase(setMaxPrice, (state, action) => {
      state.maxPrice = action.payload;
    })
    .addCase(setFilterTypes, (state, action) => {
      state.types = action.payload;
    });
});

export { userData };
