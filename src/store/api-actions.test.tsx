import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import { State } from '../types/state';
import { APIRoute } from '../const';
import { fetchGuitarsAction } from './api-actions';
import { loadGuitarsData, setFirstMaxPrice, setFirstMinPrice, setPageCount } from './action';
import { HttpCode, makeFakeGuitars } from '../utils/mocks';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch LoadGuitarsData, setFirstMinPrice, setFirstMaxPrice, setPageCount when GET /guitars', async () => {
    const mockGuitar = makeFakeGuitars();

    mockAPI
      .onGet(APIRoute.Guitars)
      .reply(HttpCode.Ok, mockGuitar);

    const store = mockStore();
    await store.dispatch(fetchGuitarsAction());

    expect(store.getActions()).toEqual([
      loadGuitarsData(mockGuitar),
      setFirstMinPrice(17500),
      setFirstMaxPrice(17500),
      setPageCount(1),
    ]);
  });
});
