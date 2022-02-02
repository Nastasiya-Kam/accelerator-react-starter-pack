import { createReducer } from '@reduxjs/toolkit';
import { GuitarData } from '../../types/state';
import { loadGuitarData, loadCommentsData } from '../action';

const initialState: GuitarData = {
  guitar: null,
  isDataLoaded: false,
  isGuitarLoading: false,
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
    .addCase(loadCommentsData, (state, action) => {
      state.comments = action.payload;
      state.isCommentsLoaded = true;
    })
    .addCase(isCommentsLoading, (state, action) => {
      state.isCommentsLoading = action.payload;
    });
});

export { guitarData };
