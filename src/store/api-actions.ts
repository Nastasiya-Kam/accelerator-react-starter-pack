import { APIRoute, ELEMENT_ON_PAGE_COUNT, ErrorMessage, ERROR_RESPONSE, Filter, ReplacedPart } from '../const';
import { ThunkActionResult } from '../types/action';
import { Guitar, GuitarId, Guitars } from '../types/guitars';
import { toast } from 'react-toastify';
import {
  loadGuitarsData,
  setFirstMinPrice,
  setFirstMaxPrice,
  setCurrentPageCount,
  isLoading,
  loadSearchingGuitars,
  isLoadingError,
  loadGuitarData,
  isGuitarLoading,
  isCommentsLoading,
  loadCommentsData,
  isGuitarLoadingError,
  setPageCount} from './action';
import { CommentPost, Comments } from '../types/comments';

const fetchPageAction = (range: string, filter: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(isLoading(true));
    try {
      const response = await api.get<Guitars>(`${APIRoute.Guitars}?${range}${filter}`);

      dispatch(loadGuitarsData(response.data));
      dispatch(isLoadingError(false));
    } catch {
      toast.info(ErrorMessage.LoadData);
      dispatch(isLoadingError(true));
    }
    dispatch(isLoading(false));
  };

const fetchFilterAction = (range: string, filter: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(isLoading(true));
    try {
      const response = await api.get<Guitars>(`${APIRoute.Guitars}?${range}${filter}`);
      const minData = (await api.get<Guitars>(`${APIRoute.Guitars}?_sort=price&_order=asc&_start=0&_limit=1`)).data;
      const maxData = (await api.get<Guitars>(`${APIRoute.Guitars}?_sort=price&_order=desc&_start=0&_limit=1`)).data;

      const countItems = response.headers['x-total-count'];
      const minPrice = minData[0].price;
      const maxPrice = maxData[0].price;

      const pageCount = Math.ceil(countItems / ELEMENT_ON_PAGE_COUNT);
      const currentPageCount = Math.ceil(countItems / ELEMENT_ON_PAGE_COUNT);

      dispatch(loadGuitarsData(response.data));
      dispatch(setFirstMinPrice(minPrice));
      dispatch(setFirstMaxPrice(maxPrice));
      dispatch(setPageCount(pageCount));
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

const fetchGuitarAction = (id: GuitarId): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(isGuitarLoading(true));
    try {
      const {data} = await api.get<Guitar>(APIRoute.Guitar.replace(ReplacedPart.GuitarId, String(id)));

      dispatch(loadGuitarData(data));
      dispatch(isGuitarLoadingError(false));
    } catch(error: any) {
      if (error?.response?.status === ERROR_RESPONSE) {
        dispatch(isGuitarLoadingError(false));
        dispatch(loadGuitarData(null));
      } else {
        toast.info(ErrorMessage.LoadData);
        dispatch(isGuitarLoadingError(true));
      }
    }
    dispatch(isGuitarLoading(false));
  };

const fetchCommentsAction = (id: GuitarId): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(isCommentsLoading(true));
    try {
      const {data} = await api.get<Comments>(APIRoute.Comments.replace(ReplacedPart.GuitarId, String(id)));

      dispatch(loadCommentsData(data));
    } catch {
      toast.info(ErrorMessage.LoadCommentsData);
    }
    dispatch(isCommentsLoading(false));
  };

const postCommentAction = (comment: CommentPost, setIsSuccess: (a: boolean) => void): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      setIsSuccess(true);
      await api.post<CommentPost>(APIRoute.NewComment, comment);
      const {data} = await api.get<Comments>(APIRoute.Comments.replace(ReplacedPart.GuitarId, String(comment.guitarId)));

      dispatch(loadCommentsData(data));
    } catch {
      toast.info(ErrorMessage.PostComment);
      setIsSuccess(false);
    }
  };

export {
  fetchPageAction,
  fetchFilterAction,
  fetchSearchingAction,
  fetchGuitarAction,
  fetchCommentsAction,
  postCommentAction
};
