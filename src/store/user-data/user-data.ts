import { createReducer } from '@reduxjs/toolkit';
import { PaginationPage, PAGINATION_STEP } from '../../const';
import { UserData } from '../../types/state';
import {
  setFilterMinPrice,
  setFilterMaxPrice,
  setFilterTypes,
  setFilterStrings,
  setSorting,
  setOrder,
  setCurrentPage,
  setCurrentPageCount,
  setFirstPage,
  setLastPage,
  prevFirstPage,
  prevLastPage,
  nextFirstPage,
  nextLastPage
} from '../action';

const initialState: UserData = {
  minPrice: '',
  maxPrice: '',
  types: [],
  strings: [],
  sorting: '',
  order: '',
  currentPage: 1,
  currentPageCount: 0,
  firstPage: PaginationPage.First,
  lastPage: PaginationPage.Last,
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
    })
    .addCase(setCurrentPage, (state, action) => {
      state.currentPage = action.payload;
    })
    .addCase(setCurrentPageCount, (state, action) => {
      state.currentPageCount = action.payload;
    })
    .addCase(setFirstPage, (state, action) => {
      state.firstPage = action.payload;
    })
    .addCase(setLastPage, (state, action) => {
      state.lastPage = action.payload;
    })
    .addCase(prevFirstPage, (state) => {
      state.firstPage = state.firstPage - PAGINATION_STEP;
    })
    .addCase(prevLastPage, (state) => {
      state.lastPage = state.lastPage - PAGINATION_STEP;
    })
    .addCase(nextFirstPage, (state) => {
      state.firstPage = state.firstPage + PAGINATION_STEP;
    })
    .addCase(nextLastPage, (state) => {
      state.lastPage = state.lastPage + PAGINATION_STEP;
    });
});

export { userData };
