import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import { State } from '../types/state';
import { APIRoute, ReplacedPart } from '../const';
import { fetchCommentsAction, fetchGuitarAction, fetchGuitarsAction } from './api-actions';
import { isCommentsLoading, isGuitarLoading, isGuitarLoadingError, isLoading, loadCommentsData, loadGuitarData, setFirstMaxPrice, setFirstMinPrice, setPageCount } from './action';
import { HttpCode, makeFakeComments, makeFakeGuitar, makeFakeGuitars } from '../utils/mocks';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch setFirstMinPrice, setFirstMaxPrice, setPageCount when GET /guitars', async () => {
    const mockGuitars = makeFakeGuitars();

    mockAPI
      .onGet(APIRoute.Guitars)
      .reply(HttpCode.Ok, mockGuitars);

    const store = mockStore();
    await store.dispatch(fetchGuitarsAction());

    expect(store.getActions()).toEqual([
      isLoading(true),
      setFirstMinPrice(17500),
      setFirstMaxPrice(17500),
      setPageCount(1),
      isLoading(false),
    ]);
  });

  it('should dispatch loadGuitarData, isGuitarLoadingError, isGuitarLoading when GET /guitar/:id', async () => {
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

  it('should dispatch loadGuitarData(null), isGuitarLoadingError, isGuitarLoading when GET /guitar/:id with 404', async () => {
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

  it('should dispatch isCommentsLoading, loadCommentsData when GET /guitar/:id/comments', async () => {
    const mockComments = makeFakeComments();
    const guitarId = 2;

    mockAPI
      .onGet(APIRoute.Comments.replace(ReplacedPart.GuitarId, String(guitarId)))
      .reply(HttpCode.Ok, mockComments);

    const store = mockStore();
    await store.dispatch(fetchCommentsAction(guitarId));

    expect(store.getActions()).toEqual([
      isCommentsLoading(true),
      loadCommentsData(mockComments),
      isCommentsLoading(false),
    ]);
  });
});
