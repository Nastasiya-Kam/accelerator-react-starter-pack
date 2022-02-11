import { createReducer } from '@reduxjs/toolkit';
import { GuitarData } from '../../types/state';
import { loadGuitarData, isGuitarLoading, isGuitarLoadingError } from '../action';

const initialState: GuitarData = {
  guitar: null,
  isDataLoaded: false,
  isGuitarLoading: false,
  isGuitarLoadingError: false,
};

const guitarData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitarData, (state, action) => {
      state.guitar = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(isGuitarLoading, (state, action) => {
      state.isGuitarLoading = action.payload;
    })
    .addCase(isGuitarLoadingError, (state, action) => {
      state.isGuitarLoadingError = action.payload;
    });
});

export { guitarData };
