import { makeFakeGuitar } from '../../utils/mocks';
import { loadGuitarData } from '../action';
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
});
