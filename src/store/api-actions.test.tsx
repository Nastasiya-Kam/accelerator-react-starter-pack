import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import { State } from '../types/state';
import { APIRoute, ReplacedPart } from '../const';
import { fetchGuitarAction, fetchPageAction } from './api-actions';
import { isGuitarLoading, isGuitarLoadingError, isLoading, isLoadingError, loadGuitarData, loadGuitarsData } from './action';
import { HttpCode, makeFakeGuitar, makeFakeGuitars } from '../utils/mocks';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('fetchPageAction should dispatch loadGuitarsData, isLoadingError when GET /guitars', async () => {
    const mockGuitars = makeFakeGuitars();
    const range = '';
    const filter = '';

    mockAPI
      .onGet(`${APIRoute.Guitars}?${range}${filter}`)
      .reply(HttpCode.Ok, mockGuitars);

    const store = mockStore();
    await store.dispatch(fetchPageAction(range, filter));

    expect(store.getActions()).toEqual([
      isLoading(true),
      loadGuitarsData(mockGuitars),
      isLoadingError(false),
      isLoading(false),
    ]);
  });

  it('fetchGuitarAction should dispatch loadGuitarData, isGuitarLoadingError, isGuitarLoading when GET /guitar/:id', async () => {
    const mockGuitar = makeFakeGuitar();
    const guitarId = 2;

    mockAPI
      .onGet(APIRoute.Guitar.replace(ReplacedPart.GuitarId, String(guitarId)))
      .reply(HttpCode.Ok, mockGuitar);

    const store = mockStore();
    await store.dispatch(fetchGuitarAction(guitarId));

    expect(store.getActions()).toEqual([
      isGuitarLoading(true),
      loadGuitarData(mockGuitar),
      isGuitarLoadingError(false),
      isGuitarLoading(false),
    ]);
  });

  it('fetchGuitarAction should dispatch loadGuitarData(null), isGuitarLoadingError, isGuitarLoading when GET /guitar/:id with 404', async () => {
    const mockGuitar = makeFakeGuitar();
    const guitarId = 25;

    mockAPI
      .onGet(APIRoute.Guitar.replace(ReplacedPart.GuitarId, String(guitarId)))
      .reply(HttpCode.NotFound, mockGuitar);

    const store = mockStore();
    await store.dispatch(fetchGuitarAction(guitarId));

    expect(store.getActions()).toEqual([
      isGuitarLoading(true),
      isGuitarLoadingError(false),
      loadGuitarData(null),
      isGuitarLoading(false),
    ]);
  });
});
