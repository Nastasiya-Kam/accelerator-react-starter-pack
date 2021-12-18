import { createReducer } from '@reduxjs/toolkit';
import { GuitarsData } from '../../types/state';
import { loadGuitarsData } from '../action';

const initialState: GuitarsData = {
  guitars: [],
  isDataLoaded: false,
  errorMessage: false,
};

const guitarsData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitarsData, (state, action) => {
      state.guitars = action.payload;
      state.isDataLoaded = true;
    });
});

export { guitarsData };
