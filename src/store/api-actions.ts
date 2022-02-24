import { APIRoute, DEFAULT_DISCOUNT, ELEMENT_ON_PAGE_COUNT, ErrorMessage, ERROR_RESPONSE, Filter, HEADER_TOTAL_COUNT, ReplacedPart } from '../const';
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
  isGuitarLoadingError,
  setPageCount,
  loadDiscount,
  loadCoupon} from './action';
import { CommentPost } from '../types/comments';

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
      const minData = (await api.get<Guitars>(`${APIRoute.Guitars}?${APIRoute.MinPrice}`)).data;
      const maxData = (await api.get<Guitars>(`${APIRoute.Guitars}?${APIRoute.MaxPrice}`)).data;
      const minPrice = minData[0].price;
      const maxPrice = maxData[0].price;

      const response = await api.get<Guitars>(`${APIRoute.Guitars}?${range}${filter}`);
      const countItems = response.headers[HEADER_TOTAL_COUNT];
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

const postCommentAction = (comment: CommentPost, setIsSuccess: (a: boolean) => void): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      setIsSuccess(true);
      await api.post<CommentPost>(APIRoute.NewComment, comment);
      const {data} = await api.get<Guitar>(APIRoute.Guitar.replace(ReplacedPart.GuitarId, String(comment.guitarId)));

      dispatch(loadGuitarData(data));
    } catch {
      toast.info(ErrorMessage.PostComment);
      setIsSuccess(false);
    }
  };

const postCouponAction = (coupon: string, isSuccess: (a: boolean) => void, isSubmited: (a: boolean) => void): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.post<number>(APIRoute.Coupon, { 'coupon': coupon });

      isSuccess(true);
      dispatch(loadCoupon(coupon));
      dispatch(loadDiscount(data));
    } catch {
      toast.info(ErrorMessage.Coupon);
      isSuccess(false);
      dispatch(loadDiscount(DEFAULT_DISCOUNT));
    }

    isSubmited(true);
  };

export {
  fetchPageAction,
  fetchFilterAction,
  fetchSearchingAction,
  fetchGuitarAction,
  postCommentAction,
  postCouponAction
};
