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

const fetchFilterAction = (type: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Guitars>(`${APIRoute.Guitars}?price_gte=10000&price_lte=30000&_start=0&_end=5`);

      // GET /guitars?_start=10&_end=20
      // GET /guitars?_start=20&_end=30
      // GET /guitars?_start=20&_limit=10

      // Операторы
      // _gte или _lte для получения в диапазоне
      // GET /guitars?price_gte=20000&price_lte=30000

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
