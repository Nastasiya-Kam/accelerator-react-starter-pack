import { createReducer } from '@reduxjs/toolkit';
import { GuitarData } from '../../types/state';
import { loadGuitarData, loadCommentsData, isCommentsLoading, isGuitarLoading, isGuitarLoadingError } from '../action';

const initialState: GuitarData = {
  guitar: null,
  isDataLoaded: false,
  isGuitarLoading: false,
  isGuitarLoadingError: false,
  comments: [],
  isCommentsLoaded: false,
  isCommentsLoading: false,
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
    })
    .addCase(loadCommentsData, (state, action) => {
      state.comments = action.payload;
      state.isCommentsLoaded = true;
    })
    .addCase(isCommentsLoading, (state, action) => {
      state.isCommentsLoading = action.payload;
    });
});

export { guitarData };
