import { makeFakeComments, makeFakeGuitar } from '../../utils/mocks';
import { loadCommentsData, loadGuitarData } from '../action';
import { guitarData } from './guitar-data';

const mockGuitar = makeFakeGuitar();
const mockComments = makeFakeComments();

describe('Reducer: guitars-data', () => {
  const state = {
    guitar: null,
    isDataLoaded: false,
    isGuitarLoading: false,
    isGuitarLoadingError: false,
    comments: [],
    isCommentsLoaded: false,
    isCommentsLoading: false,
  };

  it('should loaded guitar', () => {
    expect(guitarData(state, loadGuitarData(mockGuitar)))
      .toEqual({...state, guitar: mockGuitar, isDataLoaded: true, isGuitarLoading: false, isGuitarLoadingError: false});
  });

  it('should loaded comments', () => {
    expect(guitarData(state, loadCommentsData(mockComments)))
      .toEqual({...state, comments: mockComments, isCommentsLoaded: true, isCommentsLoading: false});
  });
});
