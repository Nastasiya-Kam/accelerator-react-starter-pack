import { createReducer } from '@reduxjs/toolkit';
import { GuitarData } from '../../types/state';
import { loadGuitarData } from '../action';

const initialState: GuitarData = {
  guitar: null,
  isDataLoaded: false,
  isGuitarLoading: false,
};

const guitarData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitarData, (state, action) => {
      state.guitar = action.payload;
      state.isDataLoaded = true;
    });
});

export { guitarData };
