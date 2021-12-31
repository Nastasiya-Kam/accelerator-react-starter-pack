import { APIRoute, ELEMENT_ON_PAGE_COUNT } from '../const';
import { ThunkActionResult } from '../types/action';
import { Guitars } from '../types/guitars';
import { loadGuitarsData, setFirstMinPrice, setFirstMaxPrice, setPageCount } from './action';

const fetchGuitarsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Guitars>(APIRoute.Guitars);
      dispatch(loadGuitarsData(data));

      const min = Math.min(...data.map((guitar) => guitar.price));
      const max = Math.max(...data.map((guitar) => guitar.price));
      const pageCount = Math.ceil(data.length / ELEMENT_ON_PAGE_COUNT);

      dispatch(setFirstMinPrice(min));
      dispatch(setFirstMaxPrice(max));
      dispatch(setPageCount(pageCount));
    } catch {
      // TODO: в случае недоступности сервера отображается информационное сообщение
      // eslint-disable-next-line no-console
      console.log('не удалось загрузить данные');
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
  fetchFilterAction
};
