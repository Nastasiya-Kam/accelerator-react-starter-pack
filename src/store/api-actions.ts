import { APIRoute, ELEMENT_ON_PAGE_COUNT, ErrorMessage, Filter } from '../const';
import { ThunkActionResult } from '../types/action';
import { Guitars } from '../types/guitars';
import { toast } from 'react-toastify';
import { loadGuitarsData, setFirstMinPrice, setFirstMaxPrice, setPageCount, setCurrentPageCount, isLoading, loadSearchingGuitars, isLoadingError } from './action';

const fetchGuitarsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(isLoading(true));
    try {
      const {data} = await api.get<Guitars>(APIRoute.Guitars);

      const min = Math.min(...data.map((guitar) => guitar.price));
      const max = Math.max(...data.map((guitar) => guitar.price));
      const pageCount = Math.ceil(data.length / ELEMENT_ON_PAGE_COUNT);

      dispatch(setFirstMinPrice(min));
      dispatch(setFirstMaxPrice(max));
      dispatch(setPageCount(pageCount));
    } catch {
      toast.info(ErrorMessage.LoadData);
    }
    dispatch(isLoading(false));
  };

const fetchFilterAction = (range: string, filter: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(isLoading(true));
    try {
      const fullData = (await api.get<Guitars>(`${APIRoute.Guitars}?${filter}`)).data;
      const currentPageCount = Math.ceil(fullData.length / ELEMENT_ON_PAGE_COUNT);

      const {data} = await api.get<Guitars>(`${APIRoute.Guitars}?${range}${filter}`);

      dispatch(loadGuitarsData(data));
      dispatch(setCurrentPageCount(currentPageCount));
      dispatch(isLoadingError(false));
    } catch {
      toast.info(ErrorMessage.LoadData);
      dispatch(isLoadingError(true));
    }
    dispatch(isLoading(false));
  };

const fetchSearchingAction = (text: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Guitars>(`${APIRoute.Guitars}?${Filter.NameLike}=${text}`);
      dispatch(loadSearchingGuitars(data));
    } catch {
      toast.info(ErrorMessage.LoadData);
    }
  };

export {
  fetchGuitarsAction,
  fetchFilterAction,
  fetchSearchingAction
};
