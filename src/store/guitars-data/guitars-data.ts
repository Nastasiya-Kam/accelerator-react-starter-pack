import { createReducer } from '@reduxjs/toolkit';
import { GuitarsData } from '../../types/state';
import { loadGuitarsData, setFirstMaxPrice, setFirstMinPrice, setPageCount, isLoading } from '../action';

const initialState: GuitarsData = {
  guitars: [],
  firstMinPrice: 0,
  firstMaxPrice: 0,
  pageCount: 0,
  isDataLoaded: false,
  isLoading: false,
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
    })
    .addCase(setPageCount, (state, action) => {
      state.pageCount = action.payload;
    })
    .addCase(isLoading, (state, action) => {
      state.isLoading = action.payload;
    });
});

export { guitarsData };
