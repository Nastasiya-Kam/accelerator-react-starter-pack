import { createReducer } from '@reduxjs/toolkit';
import { GuitarsData } from '../../types/state';
import { loadGuitarsData, setFirstMaxPrice, setFirstMinPrice } from '../action';

const initialState: GuitarsData = {
  guitars: [],
  firstMinPrice: 0,
  firstMaxPrice: 0,
  isDataLoaded: false,
  errorMessage: false,
};

const guitarsData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitarsData, (state, action) => {
      state.guitars = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(setFirstMinPrice, (state, action) => {
      state.firstMinPrice = action.payload;
    })
    .addCase(setFirstMaxPrice, (state, action) => {
      state.firstMaxPrice = action.payload;
    });
});

export { guitarsData };
