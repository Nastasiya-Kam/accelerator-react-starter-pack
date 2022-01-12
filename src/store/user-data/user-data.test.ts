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
import { userData } from './user-data';

describe('Reducer: user-data', () => {
  const state = {
    minPrice: '',
    maxPrice: '',
    types: [],
    strings: [],
    sorting: '',
    order: '',
    currentPage: 1,
    currentPageCount: 0,
    firstPage: 10,
    lastPage: 12,
    searchingGuitars: [],
  };

  it('should set filter min price', () => {
    expect(userData(state, setFilterMinPrice('5')))
      .toEqual({...state, minPrice: '5'});
  });

  it('should set filter max price', () => {
    expect(userData(state, setFilterMaxPrice('500')))
      .toEqual({...state, maxPrice: '500'});
  });

  it('should set filter types of guitars', () => {
    expect(userData(state, setFilterTypes(['type1', 'type2'])))
      .toEqual({...state, types: ['type1', 'type2']});
  });

  it('should set filter strings', () => {
    expect(userData(state, setFilterStrings(['4', '6', '10'])))
      .toEqual({...state, strings: ['4', '6', '10']});
  });

  it('should set type of sorting', () => {
    expect(userData(state, setSorting('asc')))
      .toEqual({...state, sorting: 'asc'});
  });

  it('should set type of order', () => {
    expect(userData(state, setOrder('price')))
      .toEqual({...state, order: 'price'});
  });

  it('should set current page of catalog', () => {
    expect(userData(state, setCurrentPage(5)))
      .toEqual({...state, currentPage: 5});
  });

  it('should set number of pages of current filter', () => {
    expect(userData(state, setCurrentPageCount(10)))
      .toEqual({...state, currentPageCount: 10});
  });

  it('should set the first current pagination page', () => {
    expect(userData(state, setFirstPage(4)))
      .toEqual({...state, firstPage: 4});
  });

  it('should set the last current pagination page', () => {
    expect(userData(state, setLastPage(6)))
      .toEqual({...state, lastPage: 6});
  });

  it('should set previous the first page', () => {
    expect(userData(state, prevFirstPage()))
      .toEqual({...state, firstPage: 7});
  });

  it('should set previous the last page', () => {
    expect(userData(state, prevLastPage()))
      .toEqual({...state, lastPage: 9});
  });

  it('should set next the first page', () => {
    expect(userData(state, nextFirstPage()))
      .toEqual({...state, firstPage: 13});
  });

  it('should set next the last page', () => {
    expect(userData(state, nextLastPage()))
      .toEqual({...state, lastPage: 15});
  });
});
