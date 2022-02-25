import { makeFakeGuitar } from '../../utils/mocks';
import { isGuitarLoading, isGuitarLoadingError, loadGuitarData } from '../action';
import { guitarData } from './guitar-data';

const mockGuitar = makeFakeGuitar();

describe('Reducer: guitars-data', () => {
  const state = {
    guitar: null,
    isDataLoaded: false,
    isGuitarLoading: false,
    isGuitarLoadingError: false,
  };

  it('should loaded guitar', () => {
    expect(guitarData(state, loadGuitarData(mockGuitar)))
      .toEqual({...state, guitar: mockGuitar, isDataLoaded: true, isGuitarLoading: false, isGuitarLoadingError: false});
  });

  it('should set isGuitarLoading', () => {
    expect(guitarData(state, isGuitarLoading(true)))
      .toEqual({...state, isGuitarLoading: true});
  });

  it('should set isGuitarLoadingError', () => {
    expect(guitarData(state, isGuitarLoadingError(true)))
      .toEqual({...state, isGuitarLoadingError: true});
  });
});
