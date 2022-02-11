import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import { State } from '../types/state';
import { APIRoute, ReplacedPart } from '../const';
import { fetchGuitarAction, fetchPageAction, postCommentAction } from './api-actions';
import { isGuitarLoading, isGuitarLoadingError, isLoading, isLoadingError, loadCommentsData, loadGuitarData, loadGuitarsData } from './action';
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

  it('postCommentAction should dispatch loadCommentsData when POST /comments', async () => {
    const mockComments = makeFakeComments(10);
    const mockCommentBeforePost =   {
      id: 'sdfae154a5e6a2e31a2e3f',
      userName: 'Анастасия',
      advantage: 'очень хорошо',
      disadvantage: 'очень плохо',
      comment: 'длинный комментарий',
      rating: 4,
      guitarId: 1,
    };
    const mockCommentAfterPost = {
      id: 'sdfae154a5e6a2e31a2e3f',
      userName: 'Анастасия',
      advantage: 'очень хорошо',
      disadvantage: 'очень плохо',
      comment: 'длинный комментарий',
      rating: 4,
      guitarId: 1,
      createAt: '2022-02-06T10:24:16.934Z',
    };

    const guitarId = 1;
    const setIsSuccess = jest.fn();
    const apdatedMockComments = [...mockComments, mockCommentAfterPost];

    mockAPI
      .onPost(APIRoute.NewComment, mockCommentBeforePost)
      .reply(HttpCode.PostOk, apdatedMockComments);

    mockAPI
      .onGet(APIRoute.Comments.replace(ReplacedPart.GuitarId, String(guitarId)))
      .reply(HttpCode.Ok, apdatedMockComments);

    const store = mockStore();
    await store.dispatch(postCommentAction(mockCommentBeforePost, setIsSuccess));

    expect(store.getActions()).toEqual([
      loadCommentsData(apdatedMockComments),
    ]);
  });
});
