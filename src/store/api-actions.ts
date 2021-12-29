import { APIRoute } from '../const';
import { ThunkActionResult } from '../types/action';
import { Guitars } from '../types/guitars';
import { loadGuitarsData } from './action';

const fetchGuitarsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Guitars>(APIRoute.Guitars);
      dispatch(loadGuitarsData(data));
    } catch {
      // TODO: в случае недоступности сервера отображается информационное сообщение
      // eslint-disable-next-line no-console
      console.log('не удалось загрузить данные');
    }
  };

const fetchSortOrderAction = (type: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Guitars>(`${APIRoute.Guitars}${type}`);
      dispatch(loadGuitarsData(data));
    } catch {
      // TODO: в случае недоступности сервера отображается информационное сообщение
      // eslint-disable-next-line no-console
      console.log('не удалось загрузить отсортированные данные');
    }
  };

const fetchFilterAction = (filter: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Guitars>(`${APIRoute.Guitars}?${filter}`);
      dispatch(loadGuitarsData(data));
    } catch {
      // TODO: в случае недоступности сервера отображается информационное сообщение
      // eslint-disable-next-line no-console
      console.log('не удалось загрузить отфильтрованные данные');
    }
  };

export {
  fetchGuitarsAction,
  fetchSortOrderAction,
  fetchFilterAction
};
