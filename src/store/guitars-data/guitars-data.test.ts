import { makeFakeGuitars } from '../../utils/mocks';
import { isLoading, isLoadingError, loadGuitarsData, setFirstMaxPrice, setFirstMinPrice, setPageCount } from '../action';
import { guitarsData } from './guitars-data';

const mockGuitars = makeFakeGuitars();

describe('Reducer: guitars-data', () => {
  const state = {
    guitars: [],
    firstMinPrice: 0,
    firstMaxPrice: 0,
    pageCount: 0,
    isDataLoaded: false,
    isLoading: false,
    isLoadingError: false,
  };

  it('should loaded guitars', () => {
    expect(guitarsData(state, loadGuitarsData(mockGuitars)))
      .toEqual({...state, guitars: mockGuitars, isDataLoaded: true, isLoading: false});
  });

  it('should set min price all guitars', () => {
    expect(guitarsData(state, setFirstMinPrice(10)))
      .toEqual({...state, firstMinPrice: 10});
  });

  it('should set max price all guitars', () => {
    expect(guitarsData(state, setFirstMaxPrice(100)))
      .toEqual({...state, firstMaxPrice: 100});
  });

  it('should set all page count', () => {
    expect(guitarsData(state, setPageCount(3)))
      .toEqual({...state, pageCount: 3});
  });

  it('should set isLoading', () => {
    expect(guitarsData(state, isLoading(true)))
      .toEqual({...state, isLoading: true});
  });

  it('should set isLoadingError', () => {
    expect(guitarsData(state, isLoadingError(true)))
      .toEqual({...state, isLoadingError: true});
  });
});
